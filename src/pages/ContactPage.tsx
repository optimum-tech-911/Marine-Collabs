import { ArrowRight, Mail, MessageCircle, ShieldCheck } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { ContactLink } from '../components/ContactLink';
import { SectionReveal } from '../components/SectionReveal';
import { brand } from '../config/brand';
import { creatorBySlug } from '../data/creators';

export function ContactPage() {
  const [params] = useSearchParams();
  const creator = creatorBySlug.get(params.get('creator') ?? '');

  return (
    <>
      <section className="contact-v4-hero">
        <div className="contact-v4-hero__grid" aria-hidden="true" />
        <div className="container contact-v4-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light">CONTACT DIRECT</p>
            <h1>Parlons directement.</h1>
            <p>Un projet de marque, un créateur en tête ou simplement envie de comprendre notre réseau&nbsp;? Adrien vous répond directement, sans formulaire ni parcours automatisé.</p>
            {creator ? <div className="contact-v4-hero__creator"><img src={creator.image} alt="" /><span><strong>Profil évoqué</strong><small>{creator.displayName} · {creator.handle}</small></span></div> : null}
          </div>
          <div className="contact-v4-hero__actions">
            <ContactLink className="button button--primary button--hero" placement="contact_hero_whatsapp"><MessageCircle size={17} />WhatsApp Business · {brand.phone}</ContactLink>
            <a className="button button--ghost-light button--hero" href={brand.emailUrl}><Mail size={17} />{brand.email}</a>
          </div>
        </div>
      </section>

      <section className="section contact-v4">
        <div className="container contact-v4__grid">
          <SectionReveal className="contact-v4__routes">
            <p className="eyebrow">UN ÉCHANGE SIMPLE</p>
            <h2>Votre contexte, vos mots, notre réponse.</h2>
            <div className="contact-direct-list">
              <ContactLink className="contact-direct-card" placement="contact_whatsapp"><span className="contact-direct-card__icon"><MessageCircle size={21} /></span><span><strong>WhatsApp Business</strong><small>Échange rapide avec Adrien</small></span><ArrowRight size={17} /></ContactLink>
              <a className="contact-direct-card" href={brand.emailUrl}><span className="contact-direct-card__icon"><Mail size={21} /></span><span><strong>Email</strong><small>{brand.email}</small></span><ArrowRight size={17} /></a>
            </div>
            <aside><ShieldCheck size={19} /><div><strong>Un vrai interlocuteur</strong><p>Le site présente le réseau. La relation commerciale reste humaine et coordonnée par Krew Media.</p></div></aside>
          </SectionReveal>

          <SectionReveal className="contact-v4__panel" delay={.06}>
            <p className="eyebrow">MODE D’EMPLOI</p>
            <h2>Pas de compte à créer. Pas de formulaire à remplir.</h2>
            <p>Expliquez simplement votre objectif, votre calendrier ou le profil qui vous intéresse par WhatsApp ou par email. Nous revenons vers vous avec le contexte et les prochaines étapes adaptés.</p>
            <div className="contact-v4__panel-actions">
              <ContactLink className="button button--primary" placement="contact_panel_whatsapp">Écrire sur WhatsApp <ArrowRight size={17} /></ContactLink>
              <a className="button button--dark" href={brand.emailUrl}>Envoyer un email <ArrowRight size={17} /></a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
