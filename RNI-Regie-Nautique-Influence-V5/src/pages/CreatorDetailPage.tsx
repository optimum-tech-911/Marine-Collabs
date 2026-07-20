import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Camera,
  CheckCircle2,
  Eye,
  FileText,
  Globe2,
  Languages,
  MapPin,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BookingLink } from '../components/BookingLink';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { MediaLightbox } from '../components/MediaLightbox';
import { SectionReveal } from '../components/SectionReveal';
import { PrintMediaKitButton } from '../components/PrintMediaKitButton';
import { useShortlist } from '../context/ShortlistContext';
import { creatorBySlug, creators } from '../data/creators';
import { getCreatorCommercialProfile } from '../data/creatorCommercialProfiles';
import { getEditorialMedia } from '../data/editorialMedia';
import { siteCopy } from '../data/siteCopy';
import { categoryFr } from '../lib/category';
import { formatCompact, formatFull, formatRange, humanDate } from '../lib/format';
import { trackEvent } from '../lib/analytics';

export function CreatorDetailPage() {
  const { slug } = useParams();
  const creator = slug ? creatorBySlug.get(slug) : undefined;
  const { hasCreator, toggleCreator } = useShortlist();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (creator) trackEvent('creator_profile_open', { creator_slug: creator.slug });
  }, [creator]);

  if (!creator) return <Navigate to="/creators" replace />;

  const selected = hasCreator(creator.slug);
  const media = getEditorialMedia(creator.slug, creator.image);
  const gallery = media.slice(1, 7);
  const commercial = getCreatorCommercialProfile(creator.slug);
  const related = (commercial?.relatedCreatorIds ?? [])
    .map((id) => creators.find((candidate) => candidate.id === id))
    .filter((candidate): candidate is (typeof creators)[number] => Boolean(candidate))
    .slice(0, 4);
  const strengthIcons = [ShieldCheck, Camera, Sparkles, MapPin];

  return (
    <>
      <section className="profile-v4">
        <div className="profile-v4__ambient" aria-hidden="true" />
        <div className="container profile-v4__shell">
          <div className="profile-v4__main">
            <div className="profile-v4__topline">
              <Link className="back-link back-link--dark" to="/creators"><ArrowLeft size={16}/> Retour au réseau</Link>
              <span className="profile-v4__position">Profil {String(creators.findIndex((item) => item.slug === creator.slug) + 1).padStart(2, '0')} / {String(creators.length).padStart(2, '0')}</span>
            </div>

            <article className="profile-v4__hero">
              <img className="profile-v4__hero-image" src={creator.image} alt={`Univers maritime éditorial associé à ${creator.displayName}`} fetchPriority="high" />
              <div className="profile-v4__hero-overlay" aria-hidden="true" />
              <div className="profile-v4__hero-copy">
                <div className="creator-profile-kicker creator-profile-kicker--floating">
                  <span>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</span>
                  {creator.verifiedProfile ? <span><CheckCircle2 size={15}/> Compte public vérifié</span> : <span><ShieldCheck size={15}/> Profil documenté</span>}
                </div>
                <p className="profile-v4__handle">{creator.handle}</p>
                <h1>{creator.displayName}</h1>
                <h2>{creator.headline}</h2>
                <p className="profile-v4__bio">{creator.fullBio}</p>

                <div className="profile-v4__metrics">
                  <div><Users size={20}/><span><strong>{formatCompact(creator.followers)}</strong><small>abonnés Instagram</small></span></div>
                  <div><Eye size={20}/><span><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><small>{creator.viewEstimate.evidence === 'verified' ? 'vues / 30 jours' : 'vues estimées / 30 jours'}</small></span></div>
                  <div><Play size={20}/><span><strong>{formatFull(creator.posts)}</strong><small>publications visibles</small></span></div>
                </div>

                <div className="profile-v4__actions">
                  <button className={`button button--primary${selected ? ' button--selected' : ''}`} type="button" onClick={() => toggleCreator(creator.slug)} aria-pressed={selected}>
                    <Bookmark size={17} fill={selected ? 'currentColor' : 'none'}/>{selected ? 'Ajouté à la sélection' : 'Ajouter à la sélection'}
                  </button>
                  <Link className="button button--ghost-light" to={`/contact?intent=media-kit&creator=${creator.slug}`}><FileText size={17}/> Demander le media kit</Link>
                  <PrintMediaKitButton creatorSlug={creator.slug}/>
                </div>
              </div>
              <div className="profile-v4__proof"><EvidenceBadge evidence={creator.viewEstimate.evidence}/></div>
            </article>

            <SectionReveal className="profile-v4__decision-strip">
              <div><span>Catégories</span><strong>{creator.categories.map(categoryFr).join(' · ')}</strong></div>
              <div><span>Langues</span><strong>{creator.languages.join(' · ')}</strong></div>
              <div><span>Zones</span><strong>{creator.operatingRegions.join(' · ')}</strong></div>
              <div><span>Données capturées</span><strong>{humanDate(creator.sourceCapturedAt)}</strong></div>
            </SectionReveal>

            <div className="profile-v4__content-grid">
              <SectionReveal className="profile-v4__panel profile-v4__strengths">
                <div className="profile-v4__section-heading"><div><p className="eyebrow eyebrow--light">POURQUOI CE CRÉATEUR ?</p><h2>Ce que ce profil peut apporter à une campagne.</h2></div></div>
                <div className="profile-v4__strength-grid">
                  {(commercial?.strengths ?? []).map(({ title, text }, index) => {
                    const Icon = strengthIcons[index % strengthIcons.length] ?? ShieldCheck;
                    return <article key={title}><Icon size={20}/><div><h3>{title}</h3><p>{text}</p></div></article>;
                  })}
                </div>
              </SectionReveal>

              <SectionReveal className="profile-v4__panel profile-v4__campaign-fit" delay={.04}>
                <p className="eyebrow eyebrow--light">COMPATIBILITÉ CAMPAGNE</p>
                <h2>Des activations construites autour de son terrain.</h2>
                <div className="profile-v4__tag-cloud">
                  {creator.brandFit.map((item) => <span key={item}>{item}</span>)}
                  {commercial?.recommendedObjectives.map((item) => <span key={item}>Objectif : {item === 'awareness' ? 'notoriété' : item === 'product-test' ? 'test produit' : item === 'destination' ? 'destination' : item === 'education' ? 'pédagogie' : 'événement'}</span>)}
                </div>
                <p className="profile-v4__panel-note">{commercial?.recommendationNote ?? 'Le casting, les livrables, les droits et le calendrier sont cadrés par Régie Nautique après validation du brief.'}</p>
              </SectionReveal>
            </div>

            <SectionReveal className="profile-v4__panel profile-v4__gallery-panel">
              <div className="profile-v4__section-heading profile-v4__section-heading--row">
                <div><p className="eyebrow eyebrow--light">UNIVERS ÉDITORIAL</p><h2>Des formats pensés pour retenir l’attention.</h2></div>
                <span>Cliquer pour agrandir</span>
              </div>
              <div className="profile-v4__gallery">
                {gallery.map((image, index) => (
                  <button type="button" key={image} onClick={() => setLightboxIndex(index)} aria-label={`Ouvrir le média ${index + 1}`}>
                    <img src={image} alt={`Aperçu éditorial ${index + 1} pour ${creator.displayName}`} loading="lazy" />
                    <span>{index === 1 || index === 4 ? <Play size={18}/> : <Camera size={18}/>} {String(index + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal className="profile-v4__panel profile-v4__performance">
              <div className="profile-v4__section-heading"><div><p className="eyebrow eyebrow--light">LECTURE DES PERFORMANCES</p><h2>Des chiffres utiles, avec leur niveau de preuve.</h2></div></div>
              <div className="profile-v4__performance-grid">
                <article><strong>{formatCompact(creator.followers)}</strong><span>Abonnés visibles</span><small>Capture publique du {humanDate(creator.sourceCapturedAt)}</small></article>
                <article><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><span>Potentiel sur 30 jours</span><small>{creator.viewEstimate.note}</small></article>
                <article><strong>{formatFull(creator.posts)}</strong><span>Publications visibles</span><small>Volume observé au moment de la capture</small></article>
              </div>
              <div className="profile-v4__methodology"><ShieldCheck size={18}/><div><p>{siteCopy.metricDisclaimer}</p><Link to="/methodology">Consulter la méthodologie complète <ArrowRight size={15}/></Link></div></div>
            </SectionReveal>
          </div>

          <aside className="profile-v4__sidebar">
            <section className="profile-v4__cta-card">
              <p className="eyebrow eyebrow--light">POUR LES MARQUES</p>
              <h2>Activez {creator.displayName} dans votre prochain casting.</h2>
              <p>Transmettez votre objectif. Nous revenons avec le format, les conditions et le calendrier les plus cohérents.</p>
              <ul>
                <li><CheckCircle2 size={16}/> Casting et brief cadrés</li>
                <li><CheckCircle2 size={16}/> Contenus et validations coordonnés</li>
                <li><CheckCircle2 size={16}/> Reporting centralisé</li>
              </ul>
              <Link className="button button--primary button--block" to={`/campaign-builder?creator=${creator.slug}`}>Créer une campagne <ArrowRight size={17}/></Link>
              <small>Demande relue par un interlocuteur de l’agence.</small>
            </section>

            <section className="profile-v4__side-card">
              <p className="eyebrow eyebrow--light">INFORMATIONS CLÉS</p>
              <dl>
                <div><dt><Languages size={16}/> Langues</dt><dd>{creator.languages.join(', ')}</dd></div>
                <div><dt><MapPin size={16}/> Zones</dt><dd>{creator.operatingRegions.join(', ')}</dd></div>
                <div><dt><Globe2 size={16}/> Plateforme</dt><dd>{creator.platforms.map((platform) => platform.platform).join(', ')}</dd></div>
                <div><dt><ShieldCheck size={16}/> Statut</dt><dd>{creator.verifiedProfile ? 'Compte public vérifié' : 'Profil documenté par l’agence'}</dd></div>
                <div><dt><CalendarDays size={16}/> Disponibilité</dt><dd>{commercial?.availabilityLabel ?? 'À confirmer sur brief'}</dd></div>
              </dl>
              <a className="profile-v4__external" href={creator.platforms[0]?.url} target="_blank" rel="noreferrer"><Camera size={17}/> Voir le compte public <ArrowRight size={15}/></a>
            </section>

            <section className="profile-v4__side-card profile-v4__audience-gated">
              <p className="eyebrow eyebrow--light">AUDIENCE DÉTAILLÉE</p>
              <h3>Disponible dans le media kit.</h3>
              <p>Pays, âges, portée par format et performances récentes sont transmis uniquement lorsqu’ils sont fournis ou vérifiés par le créateur.</p>
              <Link className="text-link text-link--light" to={`/contact?intent=media-kit&creator=${creator.slug}`}>Demander les données d’audience <ArrowRight size={15}/></Link>
            </section>

            <section className="profile-v4__side-card">
              <p className="eyebrow eyebrow--light">FORMATS & LIVRABLES</p>
              <ul className="profile-v4__deliverables">
                {(commercial?.recommendedDeliverables ?? creator.contentFormats).map((format) => <li key={format}><CheckCircle2 size={16}/>{format}</li>)}
                <li><CheckCircle2 size={16}/>Droits d’utilisation sur brief</li>
                <li><CheckCircle2 size={16}/>Activation multi-créateurs possible</li>
              </ul>
              <p className="profile-v4__price-note">Tarification disponible sur brief.</p>
            </section>

            <BookingLink className="profile-v4__booking" placement="creator_sidebar">
              <CalendarDays size={21}/><span><strong>Parler à Adrien</strong><small>30 minutes, sans engagement.</small></span><ArrowRight size={17}/>
            </BookingLink>
          </aside>
        </div>
      </section>

      <section className="profile-v4__related">
        <div className="container">
          <div className="profile-v4__related-heading"><div><p className="eyebrow">PROFILS COMPLÉMENTAIRES</p><h2>Construisez un casting plus large.</h2></div><Link to="/creators">Voir tout le réseau <ArrowRight size={17}/></Link></div>
          <div className="profile-v4__related-grid">
            {related.map((item) => (
              <Link key={item.slug} to={`/creators/${item.slug}`}>
                <img src={item.image} alt="" loading="lazy"/>
                <span><strong>{item.displayName}</strong><small>{formatCompact(item.followers)} abonnés · {item.categories[0] ? categoryFr(item.categories[0]) : 'Créateur maritime'}</small></span>
                <ArrowRight size={17}/>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="profile-v4__mobile-cta">
        <button type="button" onClick={() => toggleCreator(creator.slug)}><Bookmark size={17} fill={selected ? 'currentColor' : 'none'}/>{selected ? 'Sélectionné' : 'Ajouter'}</button>
        <Link to={`/campaign-builder?creator=${creator.slug}`}>Créer une campagne <ArrowRight size={16}/></Link>
      </div>

      <MediaLightbox items={gallery} index={lightboxIndex} onIndexChange={setLightboxIndex} onClose={() => setLightboxIndex(null)} creatorName={creator.displayName}/>
    </>
  );
}
