import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import { useLocalizedPath, useLocale } from '../i18n/locale';

export function Logo({ inverse = false }: { inverse?: boolean }) {
  const path = useLocalizedPath();
  const { locale } = useLocale();
  return (
    <Link className={`brand-lockup${inverse ? ' brand-lockup--inverse' : ''}`} to={path('home')} aria-label={`${brand.name} — ${locale === 'fr' ? 'accueil' : 'home'}`}>
      <img className="brand-mark brand-mark--image" src="/icon-192.png" alt="" width="48" height="48" />
      <span>
        <strong>{brand.shortName}</strong>
        <small>{locale === 'fr' ? brand.descriptor : brand.descriptorEn}</small>
      </span>
    </Link>
  );
}
