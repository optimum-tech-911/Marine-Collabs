import { ArrowUpRight, Bookmark, Check, Eye, Layers3, Users } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { getEditorialMedia } from '../data/editorialMedia';
import { categoryFr } from '../lib/category';
import { formatCompact, formatRange } from '../lib/format';
import type { Creator } from '../types';
import { EvidenceBadge } from './EvidenceBadge';

export function CreatorCard({ creator, index = 0 }: { creator: Creator; index?: number }) {
  const { hasCreator, toggleCreator } = useShortlist();
  const selected = hasCreator(creator.slug);
  const reduced = useReducedMotion();
  const secondaryImage = getEditorialMedia(creator.slug, creator.image)[1] ?? creator.image;

  return (
    <motion.article
      className="creator-card-v4"
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: .55, delay: Math.min(index * .045, .22), ease: [0.22, 1, 0.36, 1] }}
    >
      <Link className="creator-card-v4__media" to={`/creators/${creator.slug}`}>
        <img className="creator-card-v4__image creator-card-v4__image--primary" src={creator.image} alt={`Visuel éditorial maritime pour ${creator.displayName}`} loading="lazy" />
        <img className="creator-card-v4__image creator-card-v4__image--secondary" src={secondaryImage} alt="" loading="lazy" />
        <span className="creator-card-v4__veil" aria-hidden="true" />
        <div className="creator-card-v4__media-top">
          <span className="creator-card-v4__index">{String(index + 1).padStart(2, '0')}</span>
          {creator.featured ? <span className="creator-card-v4__featured">À LA UNE</span> : null}
        </div>
        <div className="creator-card-v4__media-bottom">
          <span><Layers3 size={15}/>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</span>
          <span>Voir le profil <ArrowUpRight size={15}/></span>
        </div>
      </Link>

      <div className="creator-card-v4__body">
        <div className="creator-card-v4__identity">
          <Link to={`/creators/${creator.slug}`}><h3>{creator.displayName}{creator.verifiedProfile ? <span className="creator-card-v4__verified" title="Compte public vérifié au moment de la capture"><Check size={16} aria-label="Compte public vérifié"/></span> : null}</h3><p>{creator.handle}</p></Link>
          <button type="button" className={`creator-card-v4__save${selected ? ' is-selected' : ''}`} onClick={() => toggleCreator(creator.slug)} aria-pressed={selected} aria-label={selected ? `Retirer ${creator.displayName}` : `Ajouter ${creator.displayName}`}><Bookmark size={18} fill={selected ? 'currentColor' : 'none'}/></button>
        </div>
        <p className="creator-card-v4__headline">{creator.headline}</p>
        <div className="creator-card-v4__metrics">
          <div><Users size={17}/><span><strong>{formatCompact(creator.followers)}</strong><small>abonnés</small></span></div>
          <div><Eye size={17}/><span><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><small>{creator.viewEstimate.evidence === 'verified' ? 'vues / 30 j' : 'vues estimées / 30 j'}</small></span></div>
        </div>
        <div className="creator-card-v4__footer"><EvidenceBadge evidence={creator.viewEstimate.evidence}/><Link to={`/creators/${creator.slug}`}>Découvrir <ArrowUpRight size={15}/></Link></div>
      </div>
    </motion.article>
  );
}
