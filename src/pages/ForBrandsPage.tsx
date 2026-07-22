import { ArrowRight, ArrowUpRight, BarChart3, CalendarDays, CheckCircle2, ClipboardCheck, Eye, Handshake, Layers3, ShieldCheck, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactLink } from '../components/ContactLink';
import { SectionReveal } from '../components/SectionReveal';
import { creators } from '../data/creators';
import { networkMetrics } from '../data/network';
import { industryProof } from '../data/industryProof';
import { founderProfile } from '../data/founder';
import { formatCompact } from '../lib/format';

export function ForBrandsPage() {
  return (
    <>
      <section className="brands-v4-hero">
        <div className="brands-v4-hero__grid" aria-hidden="true"/>
        <div className="container brands-v4-hero__inner">
          <div>
            <p className="eyebrow eyebrow--light">POUR LES MARQUES</p>
            <h1>Faites parler de votre marque par ceux que le nautisme écoute déjà.</h1>
            <p>Krew Media construit et coordonne des campagnes avec des créateurs spécialisés dans la voile, la plongée, le surf, les bateaux et la vie en mer.</p>
            <div className="brands-v4-hero__actions"><ContactLink className="button button--primary button--hero" placement="brands_hero">Parler à Adrien <ArrowRight size={18}/></ContactLink><Link className="button button--ghost-light button--hero" to="/creators">Explorer le réseau</Link></div>
            <div className="brands-v4-hero__proof"><span><Users size={17}/>{creators.length} créateurs</span><span><Eye size={17}/>{formatCompact(networkMetrics.combinedFollowers)}+ abonnés cumulés</span><span><ShieldCheck size={17}/>Casting piloté par l’agence</span></div>
          </div>
          <div className="brands-v4-hero__media"><img src="/assets/brand/fieldwork/campaign-conversation.jpg" alt="Deux professionnels préparant une campagne autour d’une carte marine"/><div><span>01</span><strong>Un seul brief</strong><small>Un casting, des contenus et une coordination centralisés.</small></div></div>
        </div>
      </section>

      <section className="section brands-v4-problem">
        <div className="container">
          <SectionReveal className="brands-v4-split"><div><p className="eyebrow">LE PROBLÈME</p><h2>Publier ne suffit plus. Il faut une voix que l’audience croit.</h2></div><div><p>Les marques nautiques ont souvent de beaux produits, mais peu de méthode pour les faire vivre dans les usages réels. Un créateur crédible peut transformer une caractéristique technique en histoire comprise, observée et mémorisée.</p><p>Notre rôle est d’éviter le mauvais casting, le contenu forcé et les campagnes dispersées.</p></div></SectionReveal>
          <div className="brands-v4-value-grid">
            {[
              [Target,'Un casting pertinent','Des profils sélectionnés selon l’objectif, le marché, le territoire et le niveau de technicité attendu.'],
              [Handshake,'Une seule relation agence','Krew Media coordonne les créateurs, le brief, les validations, les droits et le calendrier.'],
              [Layers3,'Une combinaison flexible','Associez portée, expertise et proximité grâce à des castings multi-créateurs.'],
              [ShieldCheck,'Une exécution cadrée','Livrables, disclosure, exclusivité, droits d’utilisation et preuves de publication définis en amont.'],
            ].map(([Icon,title,text],index)=>{const C=Icon as typeof Target;return <SectionReveal className="brands-v4-value-card" delay={index*.04} key={String(title)}><span>{String(index+1).padStart(2,'0')}</span><C size={22}/><h3>{String(title)}</h3><p>{String(text)}</p></SectionReveal>})}
          </div>
        </div>
      </section>

      <section className="section brands-v4-journey">
        <div className="container">
          <SectionReveal className="brands-v4-journey__heading"><div><p className="eyebrow eyebrow--light">LE PARCOURS MARQUE</p><h2>Une campagne conçue pour être décidée, produite et mesurée.</h2></div><p>Vous gardez la vision. Nous rendons l’exécution lisible.</p></SectionReveal>
          <div className="brands-v4-journey__steps">
            {[
              [ClipboardCheck,'Le brief','Objectif, audience, marché, timing, budget, livrables et droits.'],
              [Users,'Le casting','Une sélection argumentée, avec rôle et pertinence de chaque créateur.'],
              [BarChart3,'La production','Coordination, validations, publication et suivi des livrables.'],
              [CheckCircle2,'Le bilan','Une synthèse claire des contenus et des performances disponibles.'],
            ].map(([Icon,title,text],index)=>{const C=Icon as typeof Target;return <SectionReveal className="brands-v4-journey__step" delay={index*.05} key={String(title)}><span>{String(index+1).padStart(2,'0')}</span><C size={22}/><h3>{String(title)}</h3><p>{String(text)}</p></SectionReveal>})}
          </div>
        </div>
      </section>

      <section className="section brands-v4-objectives">
        <div className="container">
          <SectionReveal className="brands-v4-objectives__heading"><p className="eyebrow">OBJECTIFS ACTIVABLES</p><h2>La solution dépend de ce que vous voulez réellement obtenir.</h2></SectionReveal>
          <div className="brands-v4-objectives__grid">
            {['Faire connaître une marque','Lancer un produit','Tester un équipement','Produire du contenu UGC','Promouvoir une destination','Développer une ambassade','Couvrir un salon ou un événement','Construire une campagne multi-créateurs'].map((item,index)=><SectionReveal className="brands-v4-objective" delay={index*.025} key={item}><span>{String(index+1).padStart(2,'0')}</span><strong>{item}</strong><ArrowRight size={17}/></SectionReveal>)}
          </div>
        </div>
      </section>

      <section className="brands-v4-qualification">
        <div className="container brands-v4-qualification__inner">
          <SectionReveal><p className="eyebrow eyebrow--light">UN BON BRIEF ACCÉLÈRE TOUT</p><h2>Ce qui nous aide à construire une proposition juste.</h2></SectionReveal>
          <ul>{['Un objectif commercial clair','Le marché et l’audience visés','Une fourchette d’investissement','Les formats et canaux prioritaires','Les dates clés','Les besoins de droits, paid media et exclusivité'].map((item)=><li key={item}><CheckCircle2 size={17}/>{item}</li>)}</ul>
        </div>
      </section>

      <section className="section brands-v5-proof">
        <div className="container">
          <SectionReveal className="brands-v5-proof__heading"><div><p className="eyebrow">LES PREUVES</p><h2>La confiance se construit mieux par des voix humaines.</h2></div><p>Des sources identifiées, affichées avec leur contexte plutôt que transformées en promesses commerciales.</p></SectionReveal>
          <div className="brands-v5-proof__grid">{industryProof.slice(0, 3).map((item, index) => <SectionReveal className={index === 0 ? 'is-featured' : ''} delay={index * .04} key={item.id}><strong>{item.value}</strong><p>{item.text}</p><a href={item.url} target="_blank" rel="noreferrer">{item.source} · {item.year} <ArrowUpRight size={14}/></a></SectionReveal>)}</div>
          <Link className="text-link" to="/methodology">Comprendre les sources et les niveaux de preuve <ArrowRight size={15}/></Link>
        </div>
      </section>

      <section className="brands-v5-founder">
        <div className="container brands-v5-founder__grid">
          <SectionReveal className="brands-v5-founder__media"><img src="/assets/brand/adrien-cazanave.jpg" alt="Adrien Cazanave à bord d’un voilier" loading="lazy" decoding="async"/><div><strong>2,6 M</strong><span>vues documentées sur 30 jours</span></div></SectionReveal>
          <SectionReveal className="brands-v5-founder__copy" delay={.05}><p className="eyebrow eyebrow--light">{founderProfile.eyebrow}</p><h2>{founderProfile.title}</h2><p>{founderProfile.biography}</p><h3>{founderProfile.proofTitle}</h3><p>{founderProfile.proofText}</p><blockquote>{founderProfile.salesLine}</blockquote><div>{founderProfile.claims.slice(0, 4).map((claim) => <span title={claim.note} key={claim.label}>{claim.value}</span>)}</div></SectionReveal>
        </div>
      </section>

      <section className="section brands-v5-faq">
        <div className="container brands-v5-faq__grid">
          <SectionReveal><p className="eyebrow">QUESTIONS FRÉQUENTES</p><h2>Ce qu’une marque doit clarifier avant de lancer une campagne.</h2><p>Les réponses restent volontairement précises : le budget, le casting et les droits dépendent toujours du brief.</p></SectionReveal>
          <div className="brands-v5-faq__items">
            {[
              ['Quel budget faut-il prévoir ?', 'La proposition dépend du nombre de créateurs, des formats, de la durée, des droits d’utilisation, du paid media et de l’exclusivité. Une fourchette de budget permet d’éviter un casting irréaliste.'],
              ['Peut-on choisir directement un créateur ?', 'Oui, la sélection sert à exprimer une préférence. Krew Media confirme ensuite la pertinence, la disponibilité et les conditions commerciales avant toute validation.'],
              ['Les performances sont-elles garanties ?', 'Non. Les métriques historiques et les estimations servent à préparer la campagne, jamais à garantir un résultat futur. Chaque chiffre affiche son niveau de preuve.'],
              ['Qui gère les droits et les validations ?', 'Krew Media cadre les livrables, les dates, le processus de validation, les droits organiques ou publicitaires et l’exclusivité avec la marque et les créateurs.'],
              ['La marque contacte-t-elle les créateurs directement ?', 'L’agence reste le point de coordination afin de centraliser le brief, les échanges, les validations et le reporting.'],
            ].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="brands-v4-booking">
        <div className="container brands-v4-booking__inner">
          <div><p className="eyebrow">PARLONS DE VOTRE MARQUE</p><h2>Un échange, pas un pitch commercial.</h2><p>Écrivez ou appelez Adrien pour lui présenter votre marque et comprendre concrètement ce que l’influence nautique peut vous apporter. Un vrai marin au bout du fil. Pas de bot, pas de script.</p><small>Sans engagement. Si ce n’est pas pertinent pour vous, on vous le dira.</small></div>
          <ContactLink className="button button--dark button--hero" placement="brands_contact"><CalendarDays size={18}/> Parler à Adrien <ArrowRight size={18}/></ContactLink>
        </div>
      </section>
    </>
  );
}
