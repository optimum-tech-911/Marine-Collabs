import { useState, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Compass, MapPin, MoveHorizontal, Radio, ScanLine, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { creators } from '../data/creators';
import type { CreatorMapZone, CreatorLocationEvidence } from '../types';
import { useLocale, useLocalizedPath } from '../i18n/locale';
import { toEnglish } from '../i18n/english-copy';
import { MarineRadar } from './MarineRadar';

const worldMapUrl = new URL('../../world_map_true_transparent_2400x1200.png', import.meta.url).href;

type ZoneFilter = 'all' | CreatorMapZone;

const filters: { id: ZoneFilter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'europe', label: 'Europe & Méditerranée' },
  { id: 'caribbean', label: 'Caraïbes' },
  { id: 'pacific', label: 'Pacifique' },
  { id: 'international', label: 'Grand voyage' },
];

const evidenceLabels: Record<CreatorLocationEvidence, string> = {
  'profile-explicit': 'Lieu écrit sur le profil',
  'content-visible': 'Zone visible dans les contenus',
  'roster-region': 'Région indicative du roster',
};

type PinShift = [number, number];
type PinPoint = { x: number; y: number };

const mapPinSeparation = 54;

function mapPoint(longitude: number, latitude: number): PinPoint {
  return {
    x: 0.02 * 960 + ((longitude + 180) / 360) * 0.96 * 960,
    y: 0.08 * 550 + ((90 - latitude) / 180) * 0.84 * 550,
  };
}

function computePinShifts(visibleCreators: typeof creators): Record<string, PinShift> {
  // Work in the fixed 960 × 550 desktop surface. On smaller screens the map
  // remains that width and can be swiped; on larger screens the extra space
  // only makes this separation more generous.
  const placed = visibleCreators.map((creator) => mapPoint(creator.mapLocation.longitude, creator.mapLocation.latitude));
  const shifts: Record<string, PinShift> = {};

  // A few passes of a tiny, deterministic force layout keep close regional
  // points readable while the anchor dot remains at the documented location.
  for (let pass = 0; pass < 96; pass += 1) {
    for (let first = 0; first < placed.length; first += 1) {
      for (let second = first + 1; second < placed.length; second += 1) {
        const firstPoint = placed[first];
        const secondPoint = placed[second];
        if (!firstPoint || !secondPoint) continue;
        let deltaX = secondPoint.x - firstPoint.x;
        let deltaY = secondPoint.y - firstPoint.y;
        let distance = Math.hypot(deltaX, deltaY);
        if (distance < 0.01) {
          const angle = ((first * 37 + second * 61) % 360) * (Math.PI / 180);
          deltaX = Math.cos(angle);
          deltaY = Math.sin(angle);
          distance = 1;
        }
        if (distance >= mapPinSeparation) continue;
        const push = (mapPinSeparation - distance) / 2;
        deltaX /= distance;
        deltaY /= distance;
        firstPoint.x -= deltaX * push;
        firstPoint.y -= deltaY * push;
        secondPoint.x += deltaX * push;
        secondPoint.y += deltaY * push;
      }
    }
  }

  visibleCreators.forEach((creator, index) => {
    const anchor = mapPoint(creator.mapLocation.longitude, creator.mapLocation.latitude);
    const point = placed[index] ?? anchor;
    shifts[creator.slug] = [Math.round(point.x - anchor.x), Math.round(point.y - anchor.y)];
  });

  return shifts;
}

function projectedStyle(longitude: number, latitude: number, shift: PinShift = [0, 0]): CSSProperties {
  const [shiftX, shiftY] = shift;
  const x = 2 + ((longitude + 180) / 360) * 96;
  const y = 8 + ((90 - latitude) / 180) * 84;
  const distance = Math.hypot(shiftX, shiftY);
  const angle = Math.atan2(shiftY, shiftX) * (180 / Math.PI);
  return {
    '--pin-x': `${Math.max(2.5, Math.min(97.5, x))}%`,
    '--pin-y': `${Math.max(5, Math.min(95, y))}%`,
    '--pin-shift-x': `${shiftX}px`,
    '--pin-shift-y': `${shiftY}px`,
    '--pin-distance': `${distance}px`,
    '--pin-angle': `${angle}deg`,
  } as CSSProperties;
}

export function MarineNetworkMap() {
  const path = useLocalizedPath();
  const { locale } = useLocale();
  const t = (value: string) => locale === 'en' ? toEnglish(value) : value;
  const [zone, setZone] = useState<ZoneFilter>('all');
  const [selectedSlug, setSelectedSlug] = useState('meg-slmn');
  const visibleCreators = zone === 'all' ? creators : creators.filter((creator) => creator.mapLocation.zone === zone);
  const pinShifts = computePinShifts(visibleCreators);
  const selected = visibleCreators.find((creator) => creator.slug === selectedSlug) ?? visibleCreators[0] ?? creators[0];

  return (
    <section className="marine-network-map marine-network-map--interactive" aria-labelledby="marine-network-map-title">
      <div className="container">
        <div className="marine-network-map__heading">
          <div>
            <p className="eyebrow"><Radio size={15}/> {t('RADAR DU RÉSEAU')}</p>
            <h2 id="marine-network-map-title">{t('Un réseau situé avec le bon niveau de précision.')}</h2>
          </div>
          <div className="marine-network-map__intro"><p>{t('Les points utilisent les lieux écrits sur les profils, les zones visibles dans les contenus ou, à défaut, une région indicative clairement signalée.')}</p><Link to={path('creators')}>{t('Explorer le réseau')} <ArrowRight size={16}/></Link></div>
        </div>

        <div className="marine-network-map__filters" aria-label={t('Filtrer le radar par zone')}>
          {filters.map((filter) => <button className={zone === filter.id ? 'is-active' : ''} type="button" aria-pressed={zone === filter.id} onClick={() => { setZone(filter.id); const first = filter.id === 'all' ? creators[0] : creators.find((creator) => creator.mapLocation.zone === filter.id); if (first) setSelectedSlug(first.slug); }} key={filter.id}>{t(filter.label)}</button>)}
        </div>

        <p className="marine-network-map__swipe-hint"><MoveHorizontal size={16}/> {t('Glissez horizontalement pour parcourir la carte sur mobile.')}</p>

        <div className="marine-network-map__viewport" tabIndex={0} aria-label={t('Carte mondiale interactive des zones créateurs')}>
          <div className="marine-network-map__surface">
            <div className="marine-network-map__grid" aria-hidden="true" />
            <img className="marine-network-map__world marine-network-map__world--true" src={worldMapUrl} alt="" aria-hidden="true" />
            <div className="marine-network-map__topline"><span><ScanLine size={15}/> {visibleCreators.length} {locale === 'en' ? `profile${visibleCreators.length > 1 ? 's' : ''} in this region` : `profil${visibleCreators.length > 1 ? 's' : ''} dans la zone`}</span><span>{t('Coordonnées représentatives · jamais en temps réel')}</span></div>
            <div className="marine-network-map__compass" aria-hidden="true"><Compass size={18}/><span>N</span></div>
            <MarineRadar className="marine-network-map__radar" />
            <svg className="marine-network-map__routes" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M80 350C220 140 360 130 485 260S730 350 935 150"/><path d="M70 410C270 460 440 385 560 290S735 160 930 300"/></svg>

            {visibleCreators.map((creator) => <span className="marine-network-map__pin-group" key={creator.slug}>
              <span className="marine-network-map__anchor" style={projectedStyle(creator.mapLocation.longitude, creator.mapLocation.latitude)} aria-hidden="true"><i /></span>
              <button
              className={`marine-network-map__pin${selected?.slug === creator.slug ? ' is-active' : ''}`}
              type="button"
              style={projectedStyle(creator.mapLocation.longitude, creator.mapLocation.latitude, pinShifts[creator.slug])}
              onClick={() => setSelectedSlug(creator.slug)}
              aria-label={`${creator.displayName}, ${t(creator.mapLocation.label)}`}
              aria-pressed={selected?.slug === creator.slug}
            ><span className="marine-network-map__pin-pulse" aria-hidden="true"/><img src={creator.image} alt="" loading="lazy"/><small>{creator.displayName}</small></button>
            </span>)}

            <div className="marine-network-map__legend"><span><i /> {t('Radar actif')}</span><span>{t('Point = repère public ou centroid régional · pas une géolocalisation live.')}</span></div>
          </div>
        </div>

        {selected ? <div className="marine-network-map__selection" aria-live="polite">
          <img src={selected.image} alt="" />
          <div className="marine-network-map__selection-copy"><span><MapPin size={15}/>{t(selected.mapLocation.label)}</span><h3>{selected.displayName}</h3><p>{t(selected.mapLocation.note)}</p></div>
          <div className="marine-network-map__selection-proof"><ShieldCheck size={16}/><span><strong>{t(evidenceLabels[selected.mapLocation.evidence])}</strong><small>{t('Précision')} : {t(selected.mapLocation.precision === 'place' ? 'lieu public' : selected.mapLocation.precision === 'route' ? 'parcours' : selected.mapLocation.precision === 'global' ? 'grand voyage' : 'région')}</small></span></div>
          <Link to={path('creator', selected.slug)}>{t('Voir la fiche')} <ArrowUpRight size={16}/></Link>
        </div> : null}

        <div className="marine-network-map__profile-rail" aria-label={t('Sélectionner un créateur sur la carte')}>
          {visibleCreators.map((creator) => <button className={selected?.slug === creator.slug ? 'is-active' : ''} type="button" onClick={() => setSelectedSlug(creator.slug)} key={creator.slug}><img src={creator.image} alt=""/><span><strong>{creator.displayName}</strong><small>{t(creator.mapLocation.label)}</small></span></button>)}
        </div>
      </div>
    </section>
  );
}
