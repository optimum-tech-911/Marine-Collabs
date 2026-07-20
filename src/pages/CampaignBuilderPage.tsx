import { ArrowLeft, ArrowRight, Check, CheckCircle2, Clipboard, Columns3, Download, Mail, RotateCcw, Save, ShipWheel } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { brand } from '../config/brand';
import { useShortlist } from '../context/ShortlistContext';
import { creators } from '../data/creators';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatCompact } from '../lib/format';
import { trackEvent } from '../lib/analytics';
import type { CampaignBrief } from '../types';

const defaultBrief: CampaignBrief = {
  objective: '', market: '', audience: '', category: '', platforms: [], formats: [], budget: '', timing: '', usageRights: '', exclusivity: '', notes: '', contactName: '', company: '', email: '', selectedCreatorSlugs: [],
};

const objectives = ['Faire connaître une marque','Lancer un produit','Produire du contenu','Générer des demandes','Activer un événement','Développer une ambassade','Tester un équipement'];
const platforms = ['Instagram','YouTube','TikTok','Canaux de la marque'];
const formats = ['Vidéo courte','Vidéo longue','Photographie','Stories','Couverture événementielle','Test technique','Assets UGC'];

export function CampaignBuilderPage() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [brief, setBrief] = useLocalStorage<CampaignBrief>('rni-campaign-brief-v5', defaultBrief);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const { shortlistSlugs, toggleCreator, hasCreator } = useShortlist();

  useEffect(() => {
    const creatorSlug = params.get('creator');
    const objective = params.get('objective');
    if (creatorSlug && creators.some((creator) => creator.slug === creatorSlug) && !hasCreator(creatorSlug)) toggleCreator(creatorSlug);
    if (objective && !brief.objective) setBrief((current) => ({ ...current, objective }));
  }, []); // Initial route context only.

  useEffect(() => {
    if (!brief.selectedCreatorSlugs.length && shortlistSlugs.length) setBrief((current) => ({ ...current, selectedCreatorSlugs: shortlistSlugs }));
  }, [brief.selectedCreatorSlugs.length, setBrief, shortlistSlugs]);

  useEffect(() => {
    setBrief((current) => ({ ...current, selectedCreatorSlugs: shortlistSlugs }));
  }, [setBrief, shortlistSlugs]);

  useEffect(() => {
    trackEvent('campaign_step_view', { step });
  }, [step]);

  const selectedCreators = useMemo(() => brief.selectedCreatorSlugs.map((slug) => creators.find((creator) => creator.slug === slug)).filter(Boolean), [brief.selectedCreatorSlugs]);
  const update = <K extends keyof CampaignBrief>(key: K, value: CampaignBrief[K]) => setBrief((current) => ({ ...current, [key]: value }));
  const toggleArrayValue = (key: 'platforms' | 'formats', value: string) => {
    const values = brief[key];
    update(key, values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
  };

  const isStepValid = useMemo(() => {
    if (step === 1) return Boolean(brief.objective);
    if (step === 2) return Boolean(brief.market && brief.audience && brief.category);
    if (step === 3) return Boolean(brief.platforms.length && brief.formats.length && brief.budget && brief.timing);
    if (step === 4) return Boolean(brief.contactName && brief.company && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email));
    return true;
  }, [brief, step]);

  const summary = useMemo(() => {
    const creatorNames = selectedCreators.length ? selectedCreators.map((creator) => creator?.displayName).filter(Boolean).join(', ') : 'Recommandation de l’agence demandée';
    return [
      'MARINE COLLABS — BRIEF DE CAMPAGNE','',
      `Objectif : ${brief.objective || 'Non renseigné'}`,
      `Marché : ${brief.market || 'Non renseigné'}`,
      `Audience cible : ${brief.audience || 'Non renseignée'}`,
      `Catégorie nautique : ${brief.category || 'Non renseignée'}`,
      `Plateformes : ${brief.platforms.join(', ') || 'Non renseignées'}`,
      `Formats : ${brief.formats.join(', ') || 'Non renseignés'}`,
      `Budget : ${brief.budget || 'Non renseigné'}`,
      `Calendrier : ${brief.timing || 'Non renseigné'}`,
      `Droits d’utilisation : ${brief.usageRights || 'À définir'}`,
      `Exclusivité : ${brief.exclusivity || 'À définir'}`,
      `Créateurs présélectionnés : ${creatorNames}`,'',
      `Entreprise : ${brief.company || 'Non renseignée'}`,
      `Contact : ${brief.contactName || 'Non renseigné'}`,
      `Email : ${brief.email || 'Non renseigné'}`,'',
      `Contexte supplémentaire : ${brief.notes || 'Aucun'}`,'',
      'Brief généré par la version statique de la plateforme. Les métriques, disponibilités et conditions doivent être confirmées par Marine Collabs.',
    ].join('\n');
  }, [brief, selectedCreators]);

  const copySummary = async () => {
    try { await navigator.clipboard.writeText(summary); setCopyState('copied'); trackEvent('campaign_brief_copy', { selected_creators: selectedCreators.length }); window.setTimeout(() => setCopyState('idle'), 2000); }
    catch { setCopyState('error'); }
  };


  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `brief-rni-${(brief.company || 'campagne').toLowerCase().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'campagne'}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    trackEvent('campaign_brief_download', { selected_creators: selectedCreators.length });
  };

  const reset = () => {
    setBrief(defaultBrief);
    shortlistSlugs.forEach((slug) => { if (hasCreator(slug)) toggleCreator(slug); });
    setStep(1);
  };

  return (
    <>
      <section className="builder-v4-hero"><div className="builder-v4-hero__grid" aria-hidden="true"/><div className="container builder-v4-hero__inner"><div><p className="eyebrow eyebrow--light">CAMPAIGN BUILDER</p><h1>Transformez une idée en brief créateur exploitable.</h1><p>Le brouillon est enregistré dans votre navigateur, les créateurs présélectionnés sont intégrés et un résumé structuré est généré pour l’agence.</p></div><div className="builder-v4-hero__save"><Save size={24}/><strong>Brouillon local</strong><small>Aucune information n’est transmise dans cette version.</small></div></div></section>

      <section className="section builder-section builder-v4"><div className="container builder-shell"><aside className="builder-progress"><div className="builder-progress__heading"><ShipWheel size={24}/><div><strong>Brief de campagne</strong><span>Étape {step} sur 5</span></div></div><ol>{['Objectif','Audience & marché','Périmètre & budget','Créateurs & contact','Validation'].map((label,index)=>{const number=index+1;return <li className={number===step?'active':number<step?'complete':''} key={label}><button type="button" onClick={()=>number<=step&&setStep(number)} disabled={number>step}><span>{number<step?<Check size={15}/>:number}</span><strong>{label}</strong></button></li>})}</ol><div className="builder-progress__save"><Save size={15}/>Enregistré dans ce navigateur</div></aside>

        <div className="builder-panel">
          {step===1?<div className="builder-step"><div className="builder-step__heading"><p className="eyebrow">01 · OBJECTIF</p><h2>Que doit accomplir cette campagne ?</h2><p>Sélectionnez l’objectif principal. Les résultats secondaires peuvent être ajoutés dans les notes.</p></div><div className="choice-grid choice-grid--objectives">{objectives.map((objective,index)=><button className={brief.objective===objective?'selected':''} type="button" key={objective} onClick={()=>update('objective',objective)}><span>{String(index+1).padStart(2,'0')}</span><strong>{objective}</strong>{brief.objective===objective?<CheckCircle2 size={19}/>:null}</button>)}</div></div>:null}

          {step===2?<div className="builder-step"><div className="builder-step__heading"><p className="eyebrow">02 · AUDIENCE & MARCHÉ</p><h2>Où la campagne doit-elle produire son effet ?</h2><p>Donnez assez de contexte pour distinguer la pertinence d’audience du simple volume d’abonnés.</p></div><div className="form-grid form-grid--builder"><label><span>Marché ou pays visés</span><input value={brief.market} onChange={(event)=>update('market',event.target.value)} placeholder="Ex. France, Espagne et Italie"/></label><label><span>Catégorie nautique</span><select value={brief.category} onChange={(event)=>update('category',event.target.value)}><option value="">Sélectionner</option><option>Construction navale</option><option>Électronique marine</option><option>Équipement & sécurité</option><option>Marina & location</option><option>Destination touristique</option><option>Plongée & sports nautiques</option><option>Assurance & financement</option><option>Outdoor & textile</option><option>Autre</option></select></label><label className="form-span-2"><span>Audience cible</span><textarea value={brief.audience} onChange={(event)=>update('audience',event.target.value)} rows={5} placeholder="Qui doit voir la campagne, que recherche cette audience et quelle action souhaitez-vous provoquer ?"/></label></div></div>:null}

          {step===3?<div className="builder-step"><div className="builder-step__heading"><p className="eyebrow">03 · PÉRIMÈTRE & INVESTISSEMENT</p><h2>Définissez les limites concrètes de la campagne.</h2><p>Ces informations évitent que la proposition se transforme en vague liste de publications.</p></div><div className="builder-subsection"><h3>Plateformes prioritaires</h3><div className="pill-choices">{platforms.map((platform)=><button className={brief.platforms.includes(platform)?'selected':''} type="button" key={platform} onClick={()=>toggleArrayValue('platforms',platform)}>{brief.platforms.includes(platform)?<Check size={15}/>:null}{platform}</button>)}</div></div><div className="builder-subsection"><h3>Formats de contenu</h3><div className="pill-choices">{formats.map((format)=><button className={brief.formats.includes(format)?'selected':''} type="button" key={format} onClick={()=>toggleArrayValue('formats',format)}>{brief.formats.includes(format)?<Check size={15}/>:null}{format}</button>)}</div></div><div className="form-grid form-grid--builder"><label><span>Fourchette d’investissement</span><select value={brief.budget} onChange={(event)=>update('budget',event.target.value)}><option value="">Sélectionner</option><option>Moins de 5 000 €</option><option>5 000 €–15 000 €</option><option>15 000 €–50 000 €</option><option>50 000 €–100 000 €</option><option>100 000 €+</option></select></label><label><span>Calendrier</span><input value={brief.timing} onChange={(event)=>update('timing',event.target.value)} placeholder="Ex. lancement en octobre 2026"/></label><label><span>Droits d’utilisation</span><select value={brief.usageRights} onChange={(event)=>update('usageRights',event.target.value)}><option value="">À définir</option><option>Repartage organique uniquement</option><option>Canaux de la marque pendant 3 mois</option><option>Canaux de la marque pendant 12 mois</option><option>Paid media requis</option><option>Droits sur mesure</option></select></label><label><span>Exclusivité de catégorie</span><select value={brief.exclusivity} onChange={(event)=>update('exclusivity',event.target.value)}><option value="">À définir</option><option>Aucune</option><option>30 jours</option><option>90 jours</option><option>6 mois</option><option>Sur mesure</option></select></label></div></div>:null}

          {step===4?<div className="builder-step"><div className="builder-step__heading"><p className="eyebrow">04 · CRÉATEURS & CONTACT</p><h2>Ajoutez des créateurs ou demandez une recommandation.</h2><p>Vous pouvez continuer sans profil sélectionné. L’agence validera toujours la pertinence, la disponibilité et les conditions commerciales.</p></div>{shortlistSlugs.length ? <div className="builder-selection-summary"><div><Columns3 size={18}/><span><strong>{shortlistSlugs.length} profil{shortlistSlugs.length > 1 ? 's' : ''} dans votre sélection</strong><small>Comparez les rôles et les territoires avant validation.</small></span></div><Link className="text-link" to="/selection">Comparer <ArrowRight size={15}/></Link></div> : null}<div className="builder-creator-grid">{creators.map((creator)=>{const selected=hasCreator(creator.slug);return <button className={selected?'selected':''} type="button" key={creator.slug} onClick={()=>toggleCreator(creator.slug)}><img src={creator.image} alt=""/><span><strong>{creator.displayName}</strong><small>{formatCompact(creator.followers)} abonnés</small></span><i>{selected?<Check size={15}/>:'+'}</i></button>})}</div><div className="form-grid form-grid--builder builder-contact-fields"><label><span>Votre nom</span><input value={brief.contactName} onChange={(event)=>update('contactName',event.target.value)} autoComplete="name"/></label><label><span>Entreprise</span><input value={brief.company} onChange={(event)=>update('company',event.target.value)} autoComplete="organization"/></label><label className="form-span-2"><span>Email professionnel</span><input type="email" value={brief.email} onChange={(event)=>update('email',event.target.value)} autoComplete="email"/></label><label className="form-span-2"><span>Contexte supplémentaire</span><textarea rows={5} value={brief.notes} onChange={(event)=>update('notes',event.target.value)} placeholder="Produit, date de lancement, messages obligatoires, campagnes précédentes ou toute information utile."/></label></div></div>:null}

          {step===5?<div className="builder-step builder-review"><div className="builder-step__heading"><p className="eyebrow">05 · VALIDATION</p><h2>Votre brief est prêt à être transmis.</h2><p>Copiez-le, ouvrez un email prérempli ou revenez le modifier. Rien n’a été transmis automatiquement.</p></div><div className="review-layout"><pre>{summary}</pre><div className="review-actions"><button className="button button--primary button--block" type="button" onClick={copySummary}><Clipboard size={17}/>{copyState==='copied'?'Copié':copyState==='error'?'Échec de la copie':'Copier le brief'}</button><button className="button button--ghost button--block" type="button" onClick={downloadSummary}><Download size={17}/>Télécharger le brief</button><a className="button button--dark button--block" href={`mailto:${brand.email}?subject=${encodeURIComponent(`Brief campagne — ${brief.company||'nouvelle demande'}`)}&body=${encodeURIComponent(summary)}`} onClick={() => trackEvent('campaign_brief_email', { selected_creators: selectedCreators.length })}><Mail size={17}/>Ouvrir dans l’email</a><button className="text-button" type="button" onClick={()=>setStep(1)}><ArrowLeft size={15}/>Reprendre depuis le début</button><button className="text-button danger" type="button" onClick={reset}><RotateCcw size={15}/>Effacer ce brouillon</button></div></div></div>:null}

          <div className="builder-navigation"><button className="button button--ghost" type="button" onClick={()=>setStep((current)=>Math.max(1,current-1))} disabled={step===1}><ArrowLeft size={17}/>Retour</button>{step<5?<button className="button button--dark" type="button" onClick={()=>setStep((current)=>Math.min(5,current+1))} disabled={!isStepValid}>Continuer <ArrowRight size={17}/></button>:<Link className="button button--ghost" to="/creators">Retour au réseau</Link>}</div>
        </div>
      </div></section>
    </>
  );
}
