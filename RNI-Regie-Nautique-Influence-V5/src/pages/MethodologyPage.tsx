import { ArrowUpRight, BarChart3, CalendarClock, Database, FileCheck2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { SectionReveal } from '../components/SectionReveal';
import { industryProof } from '../data/industryProof';
import { networkMetrics } from '../data/network';
import { humanDate } from '../lib/format';

export function MethodologyPage() {
  return (
    <>
      <section className="methodology-v5-hero">
        <div className="methodology-v5-hero__grid" aria-hidden="true"/>
        <div className="container methodology-v5-hero__inner">
          <div><p className="eyebrow eyebrow--light">MÉTHODOLOGIE & SOURCES</p><h1>Des chiffres utiles uniquement quand leur preuve est lisible.</h1><p>Régie Nautique distingue les données observées, fournies, vérifiées et estimées. Une estimation sert à préparer un casting ; elle ne devient jamais une promesse de performance.</p></div>
          <div className="methodology-v5-hero__stamp"><Database size={26}/><strong>Dernière capture du roster</strong><span>{humanDate(networkMetrics.capturedAt)}</span></div>
        </div>
      </section>

      <section className="section methodology-v5">
        <div className="container">
          <SectionReveal className="methodology-v5-intro"><div><p className="eyebrow">STATUTS DES MÉTRIQUES</p><h2>Le même chiffre ne vaut pas la même chose selon sa source.</h2></div><p>Les badges doivent rester visibles sur les cartes, les profils, les comparaisons, les briefs et les futurs exports.</p></SectionReveal>
          <div className="methodology-v5-statuses">
            <SectionReveal><EvidenceBadge evidence="verified"/><h3>Vérifié</h3><p>Une capture de tableau de bord, un export first-party ou une preuve datée couvre exactement la période affichée.</p></SectionReveal>
            <SectionReveal delay={.04}><EvidenceBadge evidence="visible-sample"/><h3>Échantillon visible</h3><p>Des performances ponctuelles sont visibles publiquement, mais elles ne constituent pas un total mensuel.</p></SectionReveal>
            <SectionReveal delay={.08}><EvidenceBadge evidence="estimated"/><h3>Estimation indicative</h3><p>Une fourchette de préparation fondée sur les éléments disponibles. Elle doit être remplacée par des données créateur avant engagement.</p></SectionReveal>
          </div>

          <SectionReveal className="methodology-v5-rules">
            <div><ShieldCheck size={24}/><h2>Règles de lecture du réseau</h2></div>
            <ul>
              <li><strong>Audience cumulée</strong><span>La somme des abonnés n’est pas une audience unique : une même personne peut suivre plusieurs créateurs.</span></li>
              <li><strong>Vues estimées</strong><span>Les fourchettes ne sont ni une garantie, ni un engagement contractuel, ni un résultat de campagne.</span></li>
              <li><strong>Période comparable</strong><span>Les données finales doivent couvrir la même fenêtre — idéalement 30 ou 90 jours — avec une date de vérification.</span></li>
              <li><strong>Données privées</strong><span>Tarifs, coordonnées, démographie détaillée et performances sensibles restent dans le media kit ou la proposition agence.</span></li>
            </ul>
          </SectionReveal>
        </div>
      </section>

      <section className="methodology-v5-proof">
        <div className="container">
          <SectionReveal className="methodology-v5-proof__heading"><div><p className="eyebrow eyebrow--light">ÉTUDES DU SECTEUR</p><h2>Les sources derrière les chiffres affichés.</h2></div><p>Les statistiques externes ne sont pas des résultats de Régie Nautique. Elles donnent du contexte au marché de l’influence.</p></SectionReveal>
          <div className="methodology-v5-proof__grid">
            {industryProof.map((proof, index) => (
              <SectionReveal className={`methodology-v5-proof__card${proof.featured ? ' is-featured' : ''}`} delay={index * .04} key={proof.id}>
                <strong>{proof.value}</strong>
                <p>{proof.text}</p>
                {proof.note ? <small>{proof.note}</small> : null}
                <a href={proof.url} target="_blank" rel="noreferrer">{proof.source} · {proof.year} <ArrowUpRight size={15}/></a>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section methodology-v5-request">
        <div className="container methodology-v5-request__grid">
          <SectionReveal><p className="eyebrow">AVANT UNE PROPOSITION</p><h2>Les données à demander directement au créateur.</h2><p>Un media kit réellement exploitable doit documenter la période, la plateforme et l’origine de chaque valeur.</p><Link className="button button--dark" to="/contact?intent=media-kit">Demander les données d’audience</Link></SectionReveal>
          <SectionReveal className="methodology-v5-request__list" delay={.06}>
            <div><CalendarClock size={19}/><span><strong>Insights sur 30 ou 90 jours</strong><small>Vues, portée, interactions et contenus les plus performants.</small></span></div>
            <div><BarChart3 size={19}/><span><strong>Moyennes par format</strong><small>Reels, stories, publications, vidéo longue et contenus sponsorisés.</small></span></div>
            <div><Database size={19}/><span><strong>Audience documentée</strong><small>Pays, âge, intérêts et concentration géographique lorsque disponible.</small></span></div>
            <div><FileCheck2 size={19}/><span><strong>Droits et collaborations</strong><small>Réutilisation, paid media, exclusivité, délais et conflits de catégorie.</small></span></div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
