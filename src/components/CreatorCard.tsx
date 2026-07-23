import { ArrowRight, Bookmark, Check, Eye, Layers3, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShortlist } from '../context/ShortlistContext';
import { categoryFr } from '../lib/category';
import { formatCompact, formatRange } from '../lib/format';
import type { Creator } from '../types';
import { EvidenceBadge } from './EvidenceBadge';

export function CreatorCard({ creator, index = 0, compact = false }: { creator: Creator; index?: number; compact?: boolean }) {
  const { hasCreator, toggleCreator } = useShortlist();
  const selected = hasCreator(creator.slug);

  return (
    <article
      className={`creator-card-v4${compact ? ' creator-card-v4--compact' : ''}`}
    >
      <div className="creator-card-v4__media">
        <span className="creator-card-v4__avatar-ring">
          <img className="creator-card-v4__image creator-card-v4__image--primary" src={creator.image} alt="Visuel de présentation d’un créateur du réseau" loading="lazy" decoding="async" />
        </span>
        <span className="creator-card-v4__veil" aria-hidden="true" />
        <div className="creator-card-v4__media-top">
          <span className="creator-card-v4__index">{String(index + 1).padStart(2, '0')}</span>
          {creator.featured ? <span className="creator-card-v4__featured">À LA UNE</span> : null}
        </div>
        <span className="creator-card-v4__agency-filter"><ShieldCheck size={13}/> Sélection via Krew Media</span>
        <div className="creator-card-v4__media-bottom">
          <span><Layers3 size={15}/>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</span>
        </div>
      </div>

      <div className="creator-card-v4__body">
        <div className="creator-card-v4__identity">
          <div><h3 aria-label="Nom du créateur masqué"><span className="protected-name" aria-hidden="true">{creator.displayName}</span>{creator.verifiedProfile ? <span className="creator-card-v4__verified" title="Compte public vérifié au moment de la capture"><Check size={16} aria-label="Compte public vérifié"/></span> : null}</h3><p className="creator-card-v4__protected-label">Profil présenté par Krew Media</p></div>
          <button type="button" className={`creator-card-v4__save${selected ? ' is-selected' : ''}`} onClick={() => toggleCreator(creator.slug)} aria-pressed={selected} aria-label={selected ? 'Retirer ce profil' : 'Ajouter ce profil'}><Bookmark size={18} fill={selected ? 'currentColor' : 'none'}/></button>
        </div>
        <p className="creator-card-v4__headline">{creator.headline}</p>
        {compact ? <div className="creator-card-v4__compact-meta"><Users size={15}/><strong>{formatCompact(creator.followers)}</strong><span>abonnés</span></div> : <div className="creator-card-v4__metrics">
          <div><Users size={17}/><span><strong>{formatCompact(creator.followers)}</strong><small>abonnés</small></span></div>
          <div><Eye size={17}/><span><strong>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</strong><small>{creator.viewEstimate.evidence === 'verified' ? 'vues / 30 j' : 'vues estimées / 30 j'}</small></span></div>
        </div>}
        <div className={`creator-card-v4__footer${compact ? ' creator-card-v4__footer--compact' : ''}`}>
          {!compact ? <EvidenceBadge evidence={creator.viewEstimate.evidence}/> : null}
          <Link to="/creators" className="creator-card-v4__more">Voir plus <ArrowRight size={15}/></Link>
        </div>
      </div>
    </article>
  );
}
