import { useLocale } from '../i18n/locale';

export function LanguageSwitcher() {
  const { locale, switchLocale } = useLocale();
  return <div className="language-switcher" aria-label="Language selection">
    <button type="button" className={locale === 'fr' ? 'active' : ''} onClick={() => switchLocale('fr')} aria-pressed={locale === 'fr'}>FR<span className="sr-only">ançais</span></button>
    <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => switchLocale('en')} aria-pressed={locale === 'en'}>EN<span className="sr-only">glish</span></button>
  </div>;
}
