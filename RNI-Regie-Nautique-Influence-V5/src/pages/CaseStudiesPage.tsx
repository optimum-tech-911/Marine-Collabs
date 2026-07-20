import { ArrowRight, BarChart3, CheckCircle2, FileText, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { SectionHeader } from '../components/SectionHeader';

export function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="CAS CLIENTS"
        title="La preuve réelle, jamais des résultats inventés."
        description="La structure complète des cas clients est prête. Cette page doit être mise en avant uniquement lorsque les données de campagne, les autorisations et les témoignages sont validés."
        aside={<div className="page-hero-aside-copy"><LockKeyhole size={22} /><p>Une exigence simple : chaque résultat publié doit être sourcé, daté et autorisé.</p></div>}
      />

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="STRUCTURE D’UN CAS CLIENT"
            title="Chaque campagne doit répondre aux mêmes questions commerciales."
            description="Une structure constante rend les résultats comparables et évite de confondre portée, attention et impact réel."
          />
          <div className="case-blueprint-grid">
            {[
              { icon: FileText, title: 'Contexte et objectif', text: 'La marque, le public visé, le marché, le résultat attendu et les contraintes de la campagne.' },
              { icon: CheckCircle2, title: 'Stratégie créateurs', text: 'Pourquoi chaque profil a été retenu, comment le casting se complète et quels formats lui sont confiés.' },
              { icon: BarChart3, title: 'Exécution et résultats', text: 'Livrables, vues, portée, interactions, clics, demandes, droits d’utilisation et période exacte de mesure.' },
            ].map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon size={24} />
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container empty-case-study">
          <span>DES PREUVES, PAS DES PLACEHOLDERS</span>
          <h2>Aucun cas client n’a été fabriqué pour embellir cette version.</h2>
          <p>Ajoutez la première campagne lorsque la marque, les créateurs, les métriques, le témoignage et les droits d’affichage sont confirmés.</p>
          <Link className="button button--dark" to="/campaign-builder">Construire la première campagne <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}
