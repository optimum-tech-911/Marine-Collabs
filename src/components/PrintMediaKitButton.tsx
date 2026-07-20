import { Printer } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

export function PrintMediaKitButton({ creatorSlug }: { creatorSlug: string }) {
  const print = () => {
    trackEvent('media_kit_print', { creator_slug: creatorSlug });
    window.print();
  };

  return (
    <button className="button button--ghost-light profile-print-button" type="button" onClick={print}>
      <Printer size={17}/> Imprimer le media kit
    </button>
  );
}
