import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}`} to="/" aria-label={`${brand.name} — accueil`}>
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M7 29C13 21 18 13 24 5c6 8 11 16 17 24-6-3-11-5-17-5S13 26 7 29Z" />
        <path d="M8 36c6-4 11-6 16-6 6 0 11 2 16 6" />
      </svg>
      <span>
        <strong>{brand.shortName}</strong>
        <small>{brand.descriptor}</small>
      </span>
    </Link>
  );
}
