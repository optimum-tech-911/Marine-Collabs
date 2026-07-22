import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { brand } from '../config/brand';
import { trackEvent } from '../lib/analytics';

type ContactLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  children: ReactNode;
  placement?: string;
};

export function ContactLink({ className, children, placement = 'unspecified', onClick, ...props }: ContactLinkProps) {
  return (
    <a
      className={className}
      href={brand.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      onClick={(event) => {
        trackEvent('contact_click', { placement, channel: 'whatsapp' });
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
