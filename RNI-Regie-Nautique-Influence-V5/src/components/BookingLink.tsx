import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';
import { trackEvent } from '../lib/analytics';

export function BookingLink({ className, children, placement = 'unspecified' }: { className?: string; children: ReactNode; placement?: string }) {
  if (/^https?:\/\//i.test(brand.bookingUrl)) {
    return <a className={className} href={brand.bookingUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('booking_click', { placement, mode: 'external' })}>{children}</a>;
  }
  return <Link className={className} to={brand.bookingUrl} onClick={() => trackEvent('booking_click', { placement, mode: 'internal' })}>{children}</Link>;
}
