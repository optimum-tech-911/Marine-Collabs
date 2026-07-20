import type { Creator } from '../types';

interface CreatorImageProps {
  creator: Creator;
  priority?: boolean;
  compact?: boolean;
}

export function CreatorImage({ creator, priority = false, compact = false }: CreatorImageProps) {
  return (
    <div className={`creator-image${compact ? ' creator-image--compact' : ''}`}>
      <div className="creator-image__chrome">
        <span />
        <span />
        <span />
      </div>
      <img
        src={creator.image}
        alt={`Capture d’écran du profil Instagram de ${creator.displayName}`}
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className="creator-image__label">Preuve de profil · capture du 15 juil. 2026</div>
    </div>
  );
}
