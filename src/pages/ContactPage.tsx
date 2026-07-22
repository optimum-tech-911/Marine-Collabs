import { ArrowRight, CheckCircle2, Mail, MessageCircle, MessageSquareText, UserRoundSearch } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SectionReveal } from '../components/SectionReveal';
import { brand } from '../config/brand';
import { creatorBySlug } from '../data/creators';
import { trackEvent } from '../lib/analytics';

const routes = [
  { id: 'marque', label: 'Partenariat de marque', icon: MessageSquareText },
  { id: 'adrien', label: 'Parler à Adrien', icon: MessageCircle },
  { id: 'createur', label: 'Candidature créateur', icon: UserRoundSearch },
];

export function ContactPage() {
  const [params] = useSearchParams();
  const initialIntent = params.get('intent') === 'rendez-vous' || params.get('intent') === 'adrien' ? 'adrien' : params.get('intent') === 'createur' ? 'createur' : 'marque';
  const creatorSlug = params.get('creator') ?? '';
  const creator = creatorBySlug.get(creatorSlug);
  const [submitted, setSubmitted] = useState(false);
  const [preparedMailto, setPreparedMailto] = useState(`mailto:${brand.email}`);
  const [path, setPath] = useState(initialIntent);

  const subject = useMemo(() => {
    const route = routes.find((item) => item.id === path)?.label ?? 'Demande';
    return `${route}${creator ? ` — ${creator.displayName}` : ''}`;
  }, [creator, path]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = Array.from(data.entries()).map(([key, value]) => `${key} : ${String(value)}`);
    const body = [
      `Parcours : ${routes.find((item) => item.id === path)?.label ?? path}`,
      creator ? `Créateur présélectionné : ${creator.displayName} (${creator.handle})` : '',
      '',
      ...fields,
      '',
      'Demande préparée depuis la plateforme Krew Media.',
    ].filter(Boolean).join('\n');
    setPreparedMailto(`mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    trackEvent('lead_prepare', { intent: path, creator_slug: creator?.slug, fields: fields.length });
    setSubmitted(true);
  };

  return (
    <>
      <section className="contact-v4-hero"><div className="contact-v4-hero__grid" aria-hidden="true"/><div className="container contact-v4-hero__inner"><div><p className="eyebrow eyebrow--light">CONTACT</p><h1>Commencez par la bonne conversation.</h1><p>Une campagne, un media kit ou un échange stratégique avec Adrien : choisissez le bon parcours et transmettez seulement les informations utiles.</p>{creator ? <div className="contact-v4-hero__creator"><img src={creator.image} alt=""/><span><strong>Profil présélectionné</strong><small>{creator.displayName} · {creator.handle}</small></span></div> : null}</div><div className="contact-v4-hero__actions"><a className="button button--primary button--hero" href={brand.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/>WhatsApp Business · {brand.phone}</a><a className="button button--ghost-light button--hero" href={`mailto:${brand.email}?subject=${encodeURIComponent(subject)}`}><Mail size={17}/>{brand.email}</a></div></div></section>

      <section className="section contact-v4"><div className="container contact-v4__grid"><SectionReveal className="contact-v4__routes"><p className="eyebrow">VOTRE PARCOURS</p><h2>Pourquoi contactez-vous Krew Media&nbsp;?</h2><div>{routes.map(({id,label,icon:Icon},index)=><button className={path===id?'active':''} type="button" key={id} onClick={()=>{setPath(id);setSubmitted(false);}}><span>{String(index+1).padStart(2,'0')}</span><Icon size={19}/><strong>{label}</strong><ArrowRight size={17}/></button>)}</div><aside><strong>Un vrai interlocuteur</strong><p>Pas de bot. Pas de script. Les demandes sont relues avant toute proposition.</p></aside></SectionReveal>

        <SectionReveal className="contact-v4__panel" delay={.06}>{submitted ? <div className="success-state"><CheckCircle2 size={42}/><h2>Votre demande est prête.</h2><p>Cette version statique ne transmet pas encore automatiquement le formulaire. Continuez par email pour envoyer les informations préparées.</p><a className="button button--dark" href={preparedMailto}>Continuer par email <ArrowRight size={17}/></a></div> : <form onSubmit={submit}><div className="form-heading"><p className="eyebrow">{routes.find((item)=>item.id===path)?.label.toUpperCase()}</p><h2>Transmettez les informations essentielles.</h2></div><div className="form-grid">
          <label><span>Nom</span><input required name="name" autoComplete="name"/></label>
          <label><span>Email professionnel</span><input required type="email" name="email" autoComplete="email"/></label>
          <label className="form-span-2"><span>Entreprise ou profil</span><input required name="company" /></label>
          {path==='marque'?<><label><span>Périmètre de campagne</span><input required name="scope" placeholder="Ex. lancement produit, destination, salon…"/></label><label><span>Calendrier visé</span><input required name="timing" placeholder="Ex. lancement en octobre 2026"/></label></>:null}
          {path==='adrien'?<label className="form-span-2"><span>Secteur ou sujet</span><input name="sector" placeholder="Ex. chantier naval, équipementier, partenariat…"/></label>:null}
          <label className="form-span-2"><span>Message</span><textarea required name="message" rows={7} defaultValue={creator ? `Je souhaite recevoir des informations sur ${creator.displayName}.` : ''}/></label>
          <label className="form-span-2 form-check consent-check"><input className="form-check-input" required type="checkbox" name="consent" value="Oui"/><span className="form-check-label">J’accepte que ces informations soient utilisées pour répondre à ma demande, conformément à la <a href="/privacy">politique de confidentialité</a>.</span></label>
        </div><button className="button button--primary button--block" type="submit">Préparer la demande <ArrowRight size={17}/></button><p className="form-disclaimer">Formulaire de démonstration : aucune donnée ne quitte le navigateur.</p></form>}</SectionReveal>
      </div></section>
    </>
  );
}
