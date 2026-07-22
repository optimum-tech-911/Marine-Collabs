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
const pinSeparation = 62;

function mapPoint(longitude: number, latitude: number): PinPoint {
  return {
    x: 0.02 * mapWidth + ((longitude + 180) / 360) * 0.96 * mapWidth,
    y: 0.08 * mapHeight + ((90 - latitude) / 180) * 0.84 * mapHeight,
  };
}

function computePinShifts(items: typeof creators): Record<string, PinShift> {
  const anchors = items.map((creator) => mapPoint(creator.mapLocation.longitude, creator.mapLocation.latitude));
  const placed = anchors.map((point) => ({ ...point }));

  for (let pass = 0; pass < 120; pass += 1) {
    for (let first = 0; first < placed.length; first += 1) {
      for (let second = first + 1; second < placed.length; second += 1) {
        const firstPoint = placed[first];
        const secondPoint = placed[second];
        if (!firstPoint || !secondPoint) continue;

        let deltaX = secondPoint.x - firstPoint.x;
        let deltaY = secondPoint.y - firstPoint.y;
        let distance = Math.hypot(deltaX, deltaY);

        if (distance < 0.01) {
          const angle = ((first * 47 + second * 73) % 360) * (Math.PI / 180);
          deltaX = Math.cos(angle);
          deltaY = Math.sin(angle);
          distance = 1;
        }

        if (distance >= pinSeparation) continue;
        const push = (pinSeparation - distance) / 2;
        deltaX /= distance;
        deltaY /= distance;
        firstPoint.x -= deltaX * push;
        firstPoint.y -= deltaY * push;
        secondPoint.x += deltaX * push;
        secondPoint.y += deltaY * push;
      }
    }

    placed.forEach((point, index) => {
      const anchor = anchors[index];
      if (!anchor) return;
      // A soft pull keeps every portrait visually tied to its documented zone.
      point.x += (anchor.x - point.x) * 0.018;
      point.y += (anchor.y - point.y) * 0.018;
      point.x = Math.max(34, Math.min(mapWidth - 34, point.x));
      point.y = Math.max(38, Math.min(mapHeight - 38, point.y));
    });
  }

  return Object.fromEntries(items.map((creator, index) => {
    const anchor = anchors[index] ?? { x: 0, y: 0 };
    const point = placed[index] ?? anchor;
    return [creator.slug, [Math.round(point.x - anchor.x), Math.round(point.y - anchor.y)] as PinShift];
  }));
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

        <div className="marine-network-map__surface" aria-label={t('Carte des régions représentées dans le réseau')}>
          <div className="marine-network-map__grid" aria-hidden="true" />
          <img className="marine-network-map__world marine-network-map__world--true" src={worldMapUrl} alt="" aria-hidden="true" />
          <div className="marine-network-map__topline"><span>{t('Créateurs du réseau')}</span></div>
          <MarineRadar className="marine-network-map__radar" />
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
    </section>
  );
}
