import type { ReactNode } from 'react';
import { brand } from '../config/brand';
import { trackEvent } from '../lib/analytics';

export function ContactLink({ className, children, placement = 'unspecified' }: { className?: string; children: ReactNode; placement?: string }) {
  return (
    <a
      className={className}
      href={brand.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackEvent('contact_click', { placement, channel: 'whatsapp' })}
    >
      {children}
    </a>
  );
}
