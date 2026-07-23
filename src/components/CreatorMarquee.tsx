import { ArrowRight, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { creators } from '../data/creators';
import { categoryFr } from '../lib/category';
import { formatCompact, formatRange } from '../lib/format';

function MarqueeCard({ creator, duplicate = false }: { creator: (typeof creators)[number]; duplicate?: boolean }) {
  const viewLabel = creator.viewEstimate.evidence === 'verified' ? 'vues / 30 j' : 'vues estimées / 30 j';

  return (
    <article className="creator-marquee__card" aria-hidden={duplicate || undefined}>
      <img src={creator.image} alt="" loading="lazy" decoding="async" />
      <span className="creator-marquee__identity">
        <strong>Profil via Krew Media</strong>
        <small>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</small>
      </span>
      <span className="creator-marquee__metric"><Users size={14}/><b>{formatCompact(creator.followers)}</b><small>abonnés</small></span>
      <span className="creator-marquee__metric"><Eye size={14}/><b>{formatRange(creator.viewEstimate.low, creator.viewEstimate.high)}</b><small>{viewLabel}</small></span>
    </article>
  );
}

function MarqueeRail({ items, reverse = false }: { items: typeof creators; reverse?: boolean }) {
  return (
    <div className={`creator-marquee__viewport${reverse ? ' is-reverse' : ''}`}>
      <div className="creator-marquee__track">
        {[...items, ...items].map((creator, index) => <MarqueeCard creator={creator} duplicate={index >= items.length} key={`${creator.slug}-${index}`} />)}
      </div>
    </div>
  );
}

export function CreatorMarquee() {
  const first = creators.slice(0, 6);
  const second = creators.slice(6);

  return (
    <section className="creator-marquee" aria-labelledby="creator-marquee-title">
      <div className="container creator-marquee__heading">
        <div><p className="eyebrow">LE RÉSEAU, EN MOUVEMENT</p><h2 id="creator-marquee-title">Nos créateurs. Leurs audiences. Votre objectif.</h2></div>
      </div>
      <div className="creator-marquee__rails" aria-label="Profils créateurs défilants">
        <MarqueeRail items={first} />
        <MarqueeRail items={second} reverse />
      </div>
      <div className="container creator-marquee__footer">
        <p>Un casting se construit selon l’objectif de campagne, pas uniquement selon le nombre d’abonnés.</p>
        <Link to="/creators">Explorer le réseau <ArrowRight size={16}/></Link>
      </div>
    </section>
  );
}
