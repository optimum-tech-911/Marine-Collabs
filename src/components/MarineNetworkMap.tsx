import type { CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Compass, Radio, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MarineRadar } from './MarineRadar';
import { creators } from '../data/creators';
import { useLocalizedPath } from '../i18n/locale';
import { categoryFr } from '../lib/category';

const nodes = creators.filter((creator) => creator.featured).slice(0, 6);
const positions = [[18, 30], [41, 20], [68, 30], [79, 58], [50, 72], [24, 66]];

export function MarineNetworkMap() {
  const path = useLocalizedPath();

  return (
    <section className="marine-network-map" aria-labelledby="marine-network-map-title">
      <div className="container">
        <div className="marine-network-map__heading">
          <div>
            <p className="eyebrow"><Radio size={15}/> RADAR DU RÉSEAU</p>
            <h2 id="marine-network-map-title">Un réseau qui s’active autour de votre objectif.</h2>
          </div>
          <div className="marine-network-map__intro"><p>Repérez en un regard les profils les plus pertinents, puis entrez dans leur univers pour construire votre casting.</p><Link to={path('creators')}>Explorer le réseau <ArrowRight size={16}/></Link></div>
        </div>
        <div className="marine-network-map__surface">
          <div className="marine-network-map__grid" aria-hidden="true" />
          <div className="marine-network-map__topline"><span><ScanLine size={15}/> Balayage en cours</span><span>12 profils sélectionnés</span></div>
          <div className="marine-network-map__compass" aria-hidden="true"><Compass size={18}/><span>N</span></div>
          <MarineRadar className="marine-network-map__radar" />
          <svg className="marine-network-map__routes" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M80 350C220 140 360 130 485 260S730 350 935 150"/><path d="M70 410C270 460 440 385 560 290S735 160 930 300"/></svg>
          {nodes.map((creator, index) => {
            const [x, y] = positions[index] ?? [50, 50];
            return <Link
              key={creator.slug}
              className="marine-network-map__node"
              to={path('creator', creator.slug)}
              style={{ '--node-x': `${x}%`, '--node-y': `${y}%` } as CSSProperties}
            >
              <span className="marine-network-map__node-dot" aria-hidden="true" />
              <img src={creator.image} alt="" loading="lazy" />
              <span><strong>{creator.displayName}</strong><small>{creator.categories[0] ? categoryFr(creator.categories[0]) : 'Créateur maritime'}</small></span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>;
          })}
          <div className="marine-network-map__legend"><span><i /> Radar actif</span><span>Des profils sélectionnés selon le brief, pas un annuaire ouvert.</span></div>
        </div>
      </div>
    </section>
  );
}
