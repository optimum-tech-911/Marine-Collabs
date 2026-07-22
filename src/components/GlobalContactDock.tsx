import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useLocale } from '../i18n/locale';
import { useContactUrls } from '../hooks/useContactUrls';
import { trackEvent } from '../lib/analytics';

export function GlobalContactDock() {
  const { locale } = useLocale();
  const { phoneUrl, whatsappUrl, emailUrl, selectionCount } = useContactUrls();
  const fr = locale === 'fr';
  const context = selectionCount
    ? fr ? `${selectionCount} créateur${selectionCount > 1 ? 's' : ''} sélectionné${selectionCount > 1 ? 's' : ''}` : `${selectionCount} creator${selectionCount > 1 ? 's' : ''} selected`
    : fr ? 'Contact direct avec l’agence' : 'Contact the agency directly';

  return (
    <aside className="global-contact-dock" aria-label={fr ? 'Contacter Krew Media' : 'Contact Krew Media'}>
      <span className="global-contact-dock__context">{context}</span>
      <div className="global-contact-dock__actions">
        <a href={phoneUrl} onClick={() => trackEvent('contact_click', { placement: 'global_dock', channel: 'phone' })} aria-label={fr ? 'Appeler Adrien' : 'Call Adrien'} title={fr ? 'Appeler' : 'Call'}><Phone size={17}/><span>{fr ? 'Appeler' : 'Call'}</span></a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackEvent('contact_click', { placement: 'global_dock', channel: 'whatsapp' })} aria-label="WhatsApp Business" title="WhatsApp Business"><MessageCircle size={17}/><span>WhatsApp Business</span></a>
        <a href={emailUrl} onClick={() => trackEvent('contact_click', { placement: 'global_dock', channel: 'email' })} aria-label={fr ? 'Envoyer un email' : 'Send an email'} title="Email"><Mail size={17}/><span>Email</span></a>
      </div>
    </aside>
  );
}
