import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import { trackEvent } from '../lib/analytics';
import { useLocalizedPath } from '../i18n/locale';

export function BookingLink({ className, children, placement = 'unspecified' }: { className?: string; children: ReactNode; placement?: string }) {
  const path = useLocalizedPath();
  if (/^https?:\/\//i.test(brand.bookingUrl)) {
    return <a className={className} href={brand.bookingUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('booking_click', { placement, mode: 'external' })}>{children}</a>;
  }
  return <Link className={className} to={brand.bookingUrl.startsWith('/') ? `${path('contact')}?intent=rendez-vous` : brand.bookingUrl} onClick={() => trackEvent('booking_click', { placement, mode: 'internal' })}>{children}</Link>;
}
