import { ArrowRight, CheckCircle2, ShieldCheck, UsersRound } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { SectionReveal } from '../components/SectionReveal';
import { brand } from '../config/brand';
import { trackEvent } from '../lib/analytics';

export function JoinPage() {
  const [submitted, setSubmitted] = useState(false);
  const [preparedMailto, setPreparedMailto] = useState(`mailto:${brand.email}`);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = ['CANDIDATURE AU RÉSEAU KREW MEDIA', '', ...Array.from(data.entries()).map(([key, value]) => `${key} : ${String(value)}`)].join('\n');
    setPreparedMailto(`mailto:${brand.email}?subject=${encodeURIComponent('Candidature réseau créateur')}&body=${encodeURIComponent(body)}`);
    trackEvent('creator_application_prepare', { fields: Array.from(data.keys()).length });
    setSubmitted(true);
  };

  return (
    <>
      <section className="join-v4-hero"><div className="join-v4-hero__grid" aria-hidden="true"/><div className="container join-v4-hero__inner"><div><p className="eyebrow eyebrow--light">POUR LES CRÉATEURS</p><h1>Rejoignez un réseau qui comprend le travail derrière le contenu maritime.</h1><p>Krew Media représente des marins, capitaines, plongeurs, athlètes, pédagogues et conteurs du nautisme — sans transformer les créateurs en fiches anonymes de marketplace.</p></div><div className="join-v4-hero__badge"><UsersRound size={28}/><strong>Candidatures relues manuellement</strong><small>Aucune acceptation automatique.</small></div></div></section>

      <section className="section join-v4"><div className="container join-v4__grid"><SectionReveal className="join-v4__copy"><p className="eyebrow">CE QUE L’AGENCE PREND EN CHARGE</p><h2>Un soutien commercial sans effacer votre voix.</h2><ul>{['Qualification des demandes de marques','Négociation des livrables et des droits','Coordination commerciale et structure de paiement','Planning, validations et reporting','Profil public professionnel et media kit'].map((item)=><li key={item}><CheckCircle2 size={18}/>{item}</li>)}</ul><div className="join-v4__standard"><ShieldCheck size={22}/><div><strong>Ce que nous recherchons</strong><p>Une participation réelle à la culture maritime, un point de vue reconnaissable, une publication régulière, la confiance de l’audience et une communication professionnelle.</p></div></div></SectionReveal>

      <SectionReveal className="contact-v4__panel" delay={.06}>{submitted?<div className="success-state"><CheckCircle2 size={42}/><h2>Candidature préparée.</h2><p>Cette version statique ne transmet pas encore les données. Continuez par email pour envoyer votre candidature.</p><a className="button button--dark" href={preparedMailto}>Envoyer par email <ArrowRight size={17}/></a></div>:<form onSubmit={submit}><div className="form-heading"><p className="eyebrow">CANDIDATURE CRÉATEUR</p><h2>Présentez votre univers.</h2></div><div className="form-grid"><label><span>Nom</span><input required name="name" autoComplete="name"/></label><label><span>Email</span><input required type="email" name="email" autoComplete="email"/></label><label className="form-span-2"><span>Profil social principal</span><input required type="url" name="profile" placeholder="https://instagram.com/..."/></label><label><span>Catégorie principale</span><select required name="category" defaultValue=""><option value="" disabled>Sélectionner</option><option>Voile & vie à bord</option><option>Capitaines & convoyage</option><option>Pédagogie nautique</option><option>Plongée & univers sous-marin</option><option>Surf & sports nautiques</option><option>Achat bateau & média</option></select></label><label><span>Audience approximative</span><input required name="following" placeholder="Ex. 25 000"/></label><label className="form-span-2"><span>Qu’est-ce qui rend votre contenu distinctif ?</span><textarea required name="message" rows={6}/></label><label className="form-span-2 form-check consent-check"><input className="form-check-input" required type="checkbox" name="consent" value="Oui"/><span className="form-check-label">J’accepte que ces informations soient utilisées pour étudier ma candidature, conformément à la <a href="/privacy">politique de confidentialité</a>.</span></label></div><button className="button button--primary button--block" type="submit">Préparer la candidature <ArrowRight size={17}/></button><p className="form-disclaimer">Formulaire de démonstration : aucune donnée ne quitte le navigateur.</p></form>}</SectionReveal>
      </div></section>
    </>
  );
}
