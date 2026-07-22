import type { CSSProperties } from 'react';
import { ArrowRight, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { creators } from '../data/creators';
import { useLocale, useLocalizedPath } from '../i18n/locale';
import { toEnglish } from '../i18n/english-copy';
import { MarineRadar } from './MarineRadar';

const worldMapUrl = new URL('../../world_map_true_transparent_2400x1200.png', import.meta.url).href;

type PinShift = [number, number];
type PinPoint = { x: number; y: number };

const mapWidth = 960;
const mapHeight = 550;
const pinSeparation = 44;
const pinCandidates: PinShift[] = [
  [0, 0],
  [0, -28], [28, -28], [40, 0], [28, 28], [0, 40], [-28, 28], [-40, 0], [-28, -28],
  [0, -52], [37, -37], [52, 0], [37, 37], [0, 52], [-37, 37], [-52, 0], [-37, -37],
];

// Ambient network signals only. They are intentionally not tied to creator
// records and never communicate an additional creator count or location.
const networkSignals = [
  [12, 31], [20, 48], [27, 25], [33, 67], [39, 42], [45, 18], [52, 72], [58, 36],
  [64, 22], [70, 61], [76, 34], [82, 74], [88, 48], [93, 27], [24, 78], [55, 86],
] as const;

function mapPoint(longitude: number, latitude: number): PinPoint {
  return {
    x: 0.02 * mapWidth + ((longitude + 180) / 360) * 0.96 * mapWidth,
    y: 0.08 * mapHeight + ((90 - latitude) / 180) * 0.84 * mapHeight,
  };
}

function computePinShifts(items: typeof creators): Record<string, PinShift> {
  const anchors = items.map((creator) => mapPoint(creator.mapLocation.longitude, creator.mapLocation.latitude));
  const placed: Array<{ point: PinPoint; shift: PinShift }> = [];
  const shiftsBySlug: Record<string, PinShift> = {};
  const placementOrder = items.map((creator, index) => ({ creator, index, anchor: anchors[index] ?? { x: 0, y: 0 } })).sort((first, second) => {
    const priority = (creator: typeof creators[number]) => {
      if (creator.slug === 'best-boat-deals') return -1;
      if (creator.mapLocation.precision === 'place') return 0;
      if (creator.mapLocation.precision === 'route') return 1;
      if (creator.mapLocation.precision === 'region') return 2;
      return 3;
    };
    return priority(first.creator) - priority(second.creator);
  });

  placementOrder.forEach(({ creator, anchor }) => {
    let bestShift: PinShift = [0, 0];
    let bestScore = Number.POSITIVE_INFINITY;

    pinCandidates.forEach((candidate) => {
      const point = {
        x: Math.max(34, Math.min(mapWidth - 34, anchor.x + candidate[0])),
        y: Math.max(38, Math.min(mapHeight - 38, anchor.y + candidate[1])),
      };
      let score = Math.hypot(candidate[0], candidate[1]) * 0.35;

      placed.forEach(({ point: otherPoint }) => {
        const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
        if (distance < pinSeparation) score += 10000 + (pinSeparation - distance) * 100;
      });

      if (score < bestScore) {
        bestScore = score;
        bestShift = candidate;
      }
    });

    placed.push({
      point: {
        x: Math.max(34, Math.min(mapWidth - 34, anchor.x + bestShift[0])),
        y: Math.max(38, Math.min(mapHeight - 38, anchor.y + bestShift[1])),
      },
      shift: bestShift,
    });
    shiftsBySlug[creator.slug] = bestShift;
  });

  return shiftsBySlug;
}

function projectedStyle(longitude: number, latitude: number, shift: PinShift = [0, 0]): CSSProperties {
  const [shiftX, shiftY] = shift;
  const distance = Math.hypot(shiftX, shiftY);
  const angle = Math.atan2(shiftY, shiftX) * (180 / Math.PI);
  return {
    '--pin-x': `${Math.max(2.5, Math.min(97.5, 2 + ((longitude + 180) / 360) * 96))}%`,
    '--pin-y': `${Math.max(5, Math.min(95, 8 + ((90 - latitude) / 180) * 84))}%`,
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
  const pinShifts = computePinShifts(creators);

  return (
    <section className="marine-network-map marine-network-map--simple" aria-labelledby="marine-network-map-title">
      <div className="container">
        <div className="marine-network-map__heading">
          <div>
            <p className="eyebrow"><Radio size={15}/> {t('RADAR DU RÉSEAU')}</p>
            <h2 id="marine-network-map-title">{t('Un réseau international de créateurs nautiques.')}</h2>
          </div>
          <div className="marine-network-map__intro">
            <p>{t('Des profils sélectionnés dans plusieurs régions et langues.')}</p>
            <Link to={path('creators')}>{t('Explorer le réseau')} <ArrowRight size={16}/></Link>
          </div>
        </div>

        <div className="marine-network-map__viewport" role="region" tabIndex={0} aria-label={t('Carte des régions représentées dans le réseau')}>
          <div className="marine-network-map__surface">
            <div className="marine-network-map__grid" aria-hidden="true" />
            <img className="marine-network-map__world marine-network-map__world--true" src={worldMapUrl} alt="" aria-hidden="true" />
            <div className="marine-network-map__topline"><span>{t('Créateurs du réseau')}</span></div>
            <MarineRadar className="marine-network-map__radar" />
            <div className="marine-network-map__signals" aria-hidden="true">
              {networkSignals.map(([x, y], index) => <i key={`${x}-${y}-${index}`} style={{ '--signal-x': `${x}%`, '--signal-y': `${y}%` } as CSSProperties} />)}
            </div>
            <svg className="marine-network-map__routes" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true"><path d="M80 350C220 140 360 130 485 260S730 350 935 150"/><path d="M70 410C270 460 440 385 560 290S735 160 930 300"/></svg>
            {creators.map((creator) => (
              <span className="marine-network-map__pin-group" key={creator.slug} aria-hidden="true">
                <span className="marine-network-map__anchor" style={projectedStyle(creator.mapLocation.longitude, creator.mapLocation.latitude)}><i /></span>
                <span className="marine-network-map__pin" style={projectedStyle(creator.mapLocation.longitude, creator.mapLocation.latitude, pinShifts[creator.slug])}>
                  <span className="marine-network-map__pin-pulse" />
                  <img src={creator.image} alt="" loading="lazy" />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
