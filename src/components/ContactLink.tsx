import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent } from '../lib/analytics';
import { useContactUrls } from '../hooks/useContactUrls';

type ContactLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> & {
  children: ReactNode;
  placement?: string;
};

export function ContactLink({ className, children, placement = 'unspecified', onClick, ...props }: ContactLinkProps) {
  const { whatsappUrl } = useContactUrls();
  return (
    <a
      className={className}
      href={whatsappUrl}
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
