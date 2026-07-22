import { ArrowRight, Mail, MessageCircle, ShieldCheck, UsersRound } from 'lucide-react';
import { ContactLink } from '../components/ContactLink';
import { SectionReveal } from '../components/SectionReveal';
import { brand } from '../config/brand';

export function JoinPage() {
  return (
    <>
      <section className="join-v4-hero"><div className="join-v4-hero__grid" aria-hidden="true" /><div className="container join-v4-hero__inner"><div><p className="eyebrow eyebrow--light">POUR LES CRÉATEURS</p><h1>Parlons de votre univers maritime.</h1><p>Krew Media travaille avec des marins, capitaines, plongeurs, athlètes, pédagogues et conteurs du nautisme. Si votre travail peut aider une marque à parler juste, envoyez-nous un message.</p></div><div className="join-v4-hero__badge"><UsersRound size={28} /><strong>Un premier échange humain</strong><small>Chaque profil est étudié avec son contexte.</small></div></div></section>

      <section className="section join-v4"><div className="container join-v4__grid"><SectionReveal className="join-v4__copy"><p className="eyebrow">CE QUE L’AGENCE PREND EN CHARGE</p><h2>Un soutien commercial sans effacer votre voix.</h2><ul>{['Qualification des demandes de marques','Négociation des livrables et des droits','Coordination commerciale et structure de paiement','Planning, validations et reporting','Profil public professionnel et media kit'].map((item)=><li key={item}><ShieldCheck size={18} />{item}</li>)}</ul><div className="join-v4__standard"><ShieldCheck size={22} /><div><strong>Ce que nous recherchons</strong><p>Une participation réelle à la culture maritime, un point de vue reconnaissable, une publication régulière, la confiance de l’audience et une communication professionnelle.</p></div></div></SectionReveal>

        <SectionReveal className="contact-v4__panel" delay={.06}><p className="eyebrow">PREMIER CONTACT</p><h2>Présentez votre univers, simplement.</h2><p>Pas de candidature automatisée ni de formulaire à compléter. Écrivez à Adrien avec votre nom, votre activité et le lien vers votre présence publique. La suite se construit directement.</p><div className="contact-v4__panel-actions"><ContactLink className="button button--primary" placement="join_whatsapp"><MessageCircle size={17} />Écrire sur WhatsApp <ArrowRight size={17} /></ContactLink><a className="button button--dark" href={brand.emailUrl}><Mail size={17} />Envoyer un email <ArrowRight size={17} /></a></div></SectionReveal>
      </div></section>
    </>
  );
}
