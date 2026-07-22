import { PageHero } from '../components/PageHero';
import { brand } from '../config/brand';

const content = {
  privacy: {
    eyebrow: 'CONFIDENTIALITÉ',
    title: 'Politique de confidentialité — version à finaliser',
    description: 'La structure est prête, mais le document doit être adapté aux traitements réellement activés avant la mise en production.',
  },
  terms: {
    eyebrow: 'CONDITIONS',
    title: "Conditions d’utilisation — version à finaliser",
    description: 'Cette page présente les informations applicables au site vitrine Krew Media et à ses échanges directs.',
  },
  legal: {
    eyebrow: 'MENTIONS LÉGALES',
    title: 'Mentions légales — informations à compléter',
    description: 'Remplacez les champs ci-dessous par l’entité juridique, le directeur de publication et les informations d’hébergement confirmés.',
  },
} as const;

export function LegalPage({ type }: { type: keyof typeof content }) {
  const page = content[type];
  return (
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} description={page.description} />
      <section className="section legal-content">
        <div className="container prose">
          <h2>Avant la mise en production</h2>
          <p>Cette version vitrine ne collecte ni ne transmet de données via le site. Les échanges se font directement par WhatsApp ou email avec Krew Media.</p>
          <h2>Identité de travail</h2>
          <p><strong>Plateforme :</strong> {brand.name}<br /><strong>Domaine :</strong> {brand.domain}<br /><strong>Contact :</strong> {brand.email}</p>
          <h2>Informations à remplacer</h2>
          <p>Entité juridique, adresse du siège, numéro d’immatriculation, directeur de publication, hébergeur, durées de conservation, finalités, bases légales, destinataires, droits des personnes et procédure de réclamation.</p>
          <h2>Contenus commerciaux</h2>
          <p>Le futur parcours de campagne devra documenter l’annonceur, l’agence, les créateurs, les livrables, la rémunération, les périodes de publication, le territoire, les droits d’utilisation, l’exclusivité et les obligations de transparence commerciale. Cette page de travail ne constitue pas un avis juridique.</p>
        </div>
      </section>
    </>
  );
}
