import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Camera,
  Eye,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Play,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ContactLink } from '../components/ContactLink';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { SectionReveal } from '../components/SectionReveal';
import { brand } from '../config/brand';
import { useShortlist } from '../context/ShortlistContext';
import { getCreatorCommercialProfile } from '../data/creatorCommercialProfiles';
import { creatorBySlug, creators } from '../data/creators';
import { trackEvent } from '../lib/analytics';
import { categoryFr } from '../lib/category';
import { formatCompact, formatFull, formatRange, humanDate } from '../lib/format';

export function CreatorDetailPage() {
  const { slug } = useParams();
  const creator = slug ? creatorBySlug.get(slug) : undefined;
  const { hasCreator, toggleCreator } = useShortlist();

  useEffect(() => {
    if (creator) trackEvent('creator_profile_open', { creator_slug: creator.slug });
  }, [creator]);

  if (!creator) return <Navigate to="/creators" replace />;

  const selected = hasCreator(creator.slug);
  const commercial = getCreatorCommercialProfile(creator.slug);
  const related = (commercial?.relatedCreatorIds ?? [])
    .map((id) => creators.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is (typeof creators)[number] => Boolean(candidate))
    .slice(0, 3);
  const mediaKitEmailUrl = `mailto:${brand.email}?subject=${encodeURIComponent(`Media kit · ${creator.displayName}`)}&body=${encodeURIComponent(`Bonjour Adrien,\n\nJe souhaite recevoir les données disponibles et échanger au sujet du profil ${creator.displayName} (${creator.handle}).\n`)}`;
  const viewsLabel = creator.viewEstimate.evidence === 'verified' ? 'vues vérifiées / 30 j' : creator.viewEstimate.evidence === 'visible-sample' ? 'fourchette issue d’un échantillon visible' : 'vues estimées / 30 j';

  return (
    <>
      <main className="profile-lite">
        <div className="container">
          <div className="profile-lite__topline">
            <Link to="/creators"><ArrowLeft size={16}/> Retour au réseau</Link>
            <span>Profil {String(creators.findIndex((item) => item.slug === creator.slug) + 1).padStart(2, '0')} / {String(creators.length).padStart(2, '0')}</span>
          </div>

          <div className="profile-lite__layout">
            <article className="profile-lite__social" aria-label={`Aperçu du profil Instagram de ${creator.displayName}`}>
              <header><span><Camera size={17}/> Instagram</span><small>Profil public</small></header>
              <div className="profile-lite__social-identity">
                <img src={creator.image} alt={`Photo de profil publique de ${creator.displayName}`} fetchPriority="high" />
                <div><strong>{creator.handle}</strong><span>{creator.displayName}</span></div>
              </div>
              <div className="profile-lite__social-stats">
                <div><strong>{formatFull(creator.posts)}</strong><span>publications</span></div>
                <div><strong>{formatCompact(creator.followers)}</strong><span>abonnés</span></div>
                <div><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><span>{viewsLabel}</span></div>
              </div>
              <p>{creator.profileLabel} · {creator.headline}</p>
              <div className="profile-lite__social-tags">{creator.categories.map((category) => <span key={category}>{categoryFr(category)}</span>)}</div>
              <div className="profile-lite__social-proof"><EvidenceBadge evidence={creator.viewEstimate.evidence}/><small>Capture des données : {humanDate(creator.sourceCapturedAt)}</small></div>
              <small className="profile-lite__social-disclosure">Aperçu synthétique construit depuis les données publiques documentées. La capture de preuve interne n’est pas publiée.</small>
            </article>

            <section className="profile-lite__content">
              <div className="creator-profile-kicker">
                <span>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</span>
                <span><ShieldCheck size={15}/> {creator.verifiedProfile ? 'Compte public vérifié' : 'Profil documenté'}</span>
              </div>
              <p className="profile-lite__handle">{creator.handle}</p>
              <h1>{creator.displayName}</h1>
              <h2>{creator.headline}</h2>
              <p className="profile-lite__bio">{creator.shortBio}</p>

              <div className="profile-lite__facts">
                <div><Users size={18}/><span><strong>{formatCompact(creator.followers)}</strong><small>abonnés Instagram</small></span></div>
                <div><Eye size={18}/><span><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><small>{viewsLabel}</small></span></div>
                <div><Play size={18}/><span><strong>{formatFull(creator.posts)}</strong><small>publications visibles</small></span></div>
              </div>

              <dl className="profile-lite__details">
                <div><dt><Languages size={16}/> Langues</dt><dd>{creator.languages.join(' · ')}</dd></div>
                <div><dt><MapPin size={16}/> Zones documentées</dt><dd>{creator.operatingRegions.join(' · ')}</dd></div>
              </dl>

              <p className="profile-lite__note"><ShieldCheck size={17}/><span><strong>À lire avant le casting.</strong> {creator.viewEstimate.note}</span></p>

              <div className="profile-lite__actions">
                <button className={`button button--primary${selected ? ' button--selected' : ''}`} type="button" onClick={() => toggleCreator(creator.slug)} aria-pressed={selected}>
                  <Bookmark size={17} fill={selected ? 'currentColor' : 'none'}/>{selected ? 'Ajouté à la sélection' : 'Ajouter à la sélection'}
                </button>
                <ContactLink className="button button--dark" placement="creator_profile"><MessageCircle size={17}/> Parler à Adrien</ContactLink>
                <a className="profile-lite__email" href={mediaKitEmailUrl}><Mail size={16}/> Media kit par email</a>
              </div>
              <Link className="profile-lite__brief-link" to={`/campaign-builder?creator=${creator.slug}`}>Préparer un brief avec ce profil <ArrowRight size={16}/></Link>
            </section>
          </div>

          <SectionReveal className="profile-lite__fit">
            <div><p className="eyebrow">TERRAINS DE CAMPAGNE</p><h2>Où ce profil peut être pertinent.</h2></div>
            <div>{creator.brandFit.slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>
          </SectionReveal>
        </div>
      </main>

      {related.length ? <section className="profile-lite__related">
        <div className="container">
          <div className="profile-lite__related-heading"><div><p className="eyebrow">À VOIR AUSSI</p><h2>Trois profils complémentaires.</h2></div><Link to="/creators">Voir tout le réseau <ArrowRight size={16}/></Link></div>
          <div className="profile-lite__related-grid">{related.map((item) => <Link to={`/creators/${item.slug}`} key={item.slug}><img src={item.image} alt="" loading="lazy"/><span><strong>{item.displayName}</strong><small>{item.handle} · {formatCompact(item.followers)} abonnés</small></span><ArrowRight size={17}/></Link>)}</div>
        </div>
      </section> : null}
    </>
  );
}
