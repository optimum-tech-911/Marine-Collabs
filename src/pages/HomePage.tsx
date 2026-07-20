import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Compass,
  Eye,
  Layers3,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookingLink } from '../components/BookingLink';
import { CreatorCard } from '../components/CreatorCard';
import { MarineNetworkMap } from '../components/MarineNetworkMap';
import { SectionReveal } from '../components/SectionReveal';
import { creators } from '../data/creators';
import { industryProof } from '../data/industryProof';
import { founderProfile } from '../data/founder';
import { networkMetrics } from '../data/network';
import { siteCopy } from '../data/siteCopy';
import { categoryFr } from '../lib/category';
import { formatCompact, formatFull } from '../lib/format';

const featured = creators.filter((creator) => creator.featured).slice(0, 4);
const adrien = creators.find((creator) => creator.slug === 'best-boat-deals');



const sectors = ['Chantiers navals','Équipementiers','Électronique marine','Tourisme','Ports & marinas','Assurances','Plongée','Sports nautiques','Salons & événements'];

export function HomePage() {
  const reduced = useReducedMotion();

  return (
    <>
      <section className="home-v4-hero">
        <div className="home-v4-hero__grid" aria-hidden="true" />
        <div className="home-v4-hero__orb" aria-hidden="true" />
        <div className="container home-v4-hero__inner">
          <motion.div className="home-v4-hero__copy" initial={reduced ? false : { opacity: 0, y: 20 }} animate={reduced ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.22, 1, 0.36, 1] }}>
            <p className="eyebrow eyebrow--light">{siteCopy.hero.eyebrow}</p>
            <h1>La meilleure pub, <em>c’est celle qui n’en est pas une.</em></h1>
            <p className="home-v4-hero__lead">{siteCopy.hero.lead}</p>
            <p className="home-v4-hero__support">{siteCopy.hero.support}</p>
            <div className="home-v4-hero__actions">
              <BookingLink className="button button--primary button--hero" placement="home_hero">Choisir un créneau <ArrowRight size={18}/></BookingLink>
              <Link className="button button--ghost-light button--hero" to="/creators">Découvrir les créateurs</Link>
            </div>
            <div className="home-v4-hero__trust">
              <span><ShieldCheck size={17}/> Sélection exigeante</span>
              <span><Compass size={17}/> Partenariats pilotés par l’agence</span>
              <span><BarChart3 size={17}/> Lecture claire des performances</span>
            </div>
          </motion.div>

          <div className="home-v4-hero__visual" aria-label="Créateurs maritimes à la une">
            {featured.slice(0, 4).map((creator, index) => (
              <motion.div
                key={creator.slug}
                className={`home-v4-feature home-v4-feature--${index + 1}`}
                initial={reduced ? false : { opacity: 0, scale: .96, y: 20 }}
                animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: .65, delay: .18 + index * .08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={`/creators/${creator.slug}`}>
                  <img src={creator.image} alt={`Univers maritime de ${creator.displayName}`} fetchPriority={index === 0 ? 'high' : 'auto'} />
                  <span className="home-v4-feature__shade" aria-hidden="true" />
                  <span className="home-v4-feature__category"><Layers3 size={14}/>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</span>
                  <span className="home-v4-feature__copy"><strong>{creator.displayName}</strong><small>{formatCompact(creator.followers)} abonnés</small></span>
                </Link>
              </motion.div>
            ))}
            <div className="home-v4-hero__signal"><span className="home-v4-hero__pulse"/><div><strong>Réseau actif</strong><small>12 profils maritimes sélectionnés</small></div></div>
          </div>
        </div>

        <div className="container home-v4-metrics">
          <div><strong>{networkMetrics.creatorCount}</strong><span>créateurs sélectionnés</span></div>
          <div><strong>{formatCompact(networkMetrics.combinedFollowers)}+</strong><span>abonnés Instagram cumulés</span></div>
          <div><strong>{formatFull(networkMetrics.combinedPosts)}</strong><span>publications visibles</span></div>
          <div><strong>2,6 M</strong><span>vues vérifiées sur 30 jours*</span></div>
        </div>
      </section>

      <MarineNetworkMap />

      <section className="home-v4-sector-rail" aria-label="Secteurs accompagnés">
        <div>{[...sectors, ...sectors].map((sector, index) => <span key={`${sector}-${index}`}><Sparkles size={13}/>{sector}</span>)}</div>
      </section>

      <section className="section home-v4-problem">
        <div className="container">
          <SectionReveal className="home-v4-problem__intro">
            <div><p className="eyebrow">LE DÉCALAGE</p><h2>La plupart des marques nautiques sont invisibles en ligne.</h2></div>
            <div><p>Des posts que personne ne regarde, zéro viralité. Pas par manque de budget — par manque de méthode. Pendant ce temps, vos clients suivent des créateurs. Autant que ce soit pour parler de vous.</p></div>
          </SectionReveal>
          <div className="home-v4-problem__grid">
            <SectionReveal className="home-v4-problem__card" delay={.02}>
              <span className="home-v4-problem__label">Sans orchestration</span>
              <strong>Des contenus isolés qui disparaissent vite.</strong>
              <ul><li>Audience mal ciblée</li><li>Message trop publicitaire</li><li>Livrables dispersés</li><li>Résultats difficiles à exploiter</li></ul>
            </SectionReveal>
            <SectionReveal className="home-v4-problem__card home-v4-problem__card--positive" delay={.08}>
              <span className="home-v4-problem__label">Avec Marine Collabs</span>
              <strong>Un casting précis et une campagne pilotée.</strong>
              <ul><li>Créateurs cohérents</li><li>Brief et droits cadrés</li><li>Diffusion coordonnée</li><li>Bilan clair pour la marque</li></ul>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section className="home-v4-manifesto">
        <div className="home-v4-manifesto__media" aria-hidden="true"><img src="/assets/editorial/gallery/sunset-sailing.webp" alt="" loading="lazy"/></div>
        <div className="container home-v4-manifesto__inner">
          <SectionReveal>
            <p className="eyebrow eyebrow--light">NOTRE CONVICTION</p>
            <h2>« La meilleure pub, c’est celle qui n’en est pas une. »</h2>
            <p>Des créateurs parlent de votre marque à leur communauté. Marine Collabs sélectionne les bonnes voix, encadre les contenus et orchestre leur diffusion — sans limite de créateurs ni de frontières.</p>
            <Link className="text-link text-link--light" to="/for-brands">Voir comment une campagne est construite <ArrowRight size={17}/></Link>
          </SectionReveal>
        </div>
      </section>

      <section className="section home-v4-method">
        <div className="container">
          <SectionReveal className="section-header home-v4-section-header">
            <div><p className="eyebrow">NOTRE MÉTHODE</p><h2>Vous nous donnez un objectif. On orchestre le reste.</h2></div>
            <p>On choisit les bons créateurs, on cadre les contenus et on orchestre une diffusion naturelle — celle qui convertit. Vous recevez un bilan clair.</p>
          </SectionReveal>
          <div className="home-v4-method__grid">
            {[
              [Compass, 'Votre objectif', 'Notoriété, lancement, contenu, trafic, événement ou ambassade.'],
              [Users, 'La sélection', 'Les profils cohérents avec votre audience, votre secteur et votre message.'],
              [Radio, 'L’orchestration', 'Contenus, validations, droits, calendrier et diffusion coordonnés.'],
              [BarChart3, 'Le bilan', 'Une lecture claire des publications et des performances disponibles.'],
            ].map(([Icon, title, text], index) => {
              const C = Icon as typeof Compass;
              return <SectionReveal className="home-v4-method__step" delay={index * .05} key={String(title)}><span className="home-v4-method__index">{String(index + 1).padStart(2, '0')}</span><C size={23}/><h3>{String(title)}</h3><p>{String(text)}</p>{index < 3 ? <span className="home-v4-method__connector" aria-hidden="true"/> : null}</SectionReveal>;
            })}
          </div>
        </div>
      </section>

      <section className="section home-v4-roster">
        <div className="container">
          <SectionReveal className="section-header home-v4-section-header">
            <div><p className="eyebrow eyebrow--light">LE RÉSEAU</p><h2>Les créateurs qui vivent réellement le nautisme.</h2></div>
            <div><p>Forte audience, expertise précise ou crédibilité terrain : chaque profil est sélectionné pour une raison exploitable par les marques.</p><Link className="text-link text-link--light" to="/creators">Voir les 12 profils <ArrowRight size={17}/></Link></div>
          </SectionReveal>
          <div className="creator-grid creator-grid--three home-v4-roster__grid">{featured.slice(0, 3).map((creator, index) => <CreatorCard creator={creator} index={index} key={creator.slug}/>)}</div>
        </div>
      </section>

      <section className="section home-v4-proof">
        <div className="container">
          <SectionReveal className="home-v4-proof__heading"><p className="eyebrow">LES PREUVES</p><h2>Pourquoi l’influence, et pourquoi maintenant.</h2><p>Les chiffres du secteur, pas les nôtres.</p></SectionReveal>
          <div className="home-v4-proof__grid">
            {industryProof.map((stat, index) => <SectionReveal className={`home-v4-proof__card${stat.featured ? ' is-main' : ''}`} delay={index * .04} key={stat.id}><strong>{stat.value}</strong><p>{stat.text}</p><a href={stat.url} target="_blank" rel="noreferrer">{stat.source} · {stat.year} <ArrowUpRight size={14}/></a></SectionReveal>)}
          </div>
          <div className="home-v4-proof__note"><p>Le chiffre Nielsen concerne les recommandations de personnes connues et illustre la puissance de la recommandation humaine. Il ne constitue pas une mesure spécifique de l’influence commerciale.</p><Link className="text-link" to="/methodology">Consulter la méthodologie et les sources <ArrowRight size={15}/></Link></div>
        </div>
      </section>

      {adrien ? (
        <section className="section home-v4-founder">
          <div className="container home-v4-founder__grid">
            <SectionReveal className="home-v4-founder__media">
              <img src={adrien.image} alt="Univers nautique illustrant l’expérience et le terrain du fondateur" loading="lazy"/>
              <div className="home-v4-founder__media-proof"><span><Eye size={17}/><strong>2,6 M</strong><small>vues sur 30 jours</small></span><span><Users size={17}/><strong>39,1 K</strong><small>abonnés visibles</small></span></div>
            </SectionReveal>
            <SectionReveal className="home-v4-founder__copy" delay={.06}>
              <p className="eyebrow eyebrow--light">{founderProfile.eyebrow}</p>
              <h2>{founderProfile.title}</h2>
              <p className="home-v4-founder__lead">{founderProfile.biography}</p>
              <h3>{founderProfile.proofTitle}</h3>
              <p>{founderProfile.proofText}</p>
              <blockquote>{founderProfile.salesLine}</blockquote>
              <div className="home-v4-founder__facts">{founderProfile.claims.slice(0, 4).map((claim) => <span key={claim.label} title={claim.note}>{claim.value}</span>)}</div>
            </SectionReveal>
          </div>
        </section>
      ) : null}

      <section className="home-v4-booking">
        <div className="home-v4-booking__visual" aria-hidden="true"><img src="/assets/editorial/gallery/marina-reflection.webp" alt="" loading="lazy"/></div>
        <div className="container home-v4-booking__inner">
          <SectionReveal>
            <p className="eyebrow eyebrow--light">{siteCopy.booking.eyebrow}</p>
            <h2>{siteCopy.booking.title}</h2>
            <p>{siteCopy.booking.body}</p>
            <div className="home-v4-booking__meta"><span><CalendarDays size={17}/> 30 minutes</span><span><CheckCircle2 size={17}/> Sans engagement</span><span><ShieldCheck size={17}/> Réponse honnête</span></div>
            <div className="home-v4-booking__actions"><BookingLink className="button button--primary button--hero" placement="home_booking"><CalendarDays size={18}/> Choisir un créneau <ArrowRight size={18}/></BookingLink><small>{siteCopy.booking.reassurance}</small></div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
