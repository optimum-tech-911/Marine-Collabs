import { localeFromPathname, type Locale } from './routes';

export function resolveInitialLocale({ pathname, savedLocale, acceptLanguage, country }: { pathname?: string; savedLocale?: Locale; acceptLanguage?: string; country?: string }): Locale {
  const urlLocale = pathname ? localeFromPathname(pathname) : null;
  if (urlLocale) return urlLocale;
  if (savedLocale === 'fr' || savedLocale === 'en') return savedLocale;
  // Cloudflare's country signal is the authoritative first-visit fallback.
  // Browser language is only used when the edge cannot provide a country.
  const frenchFirst = new Set(['FR', 'BE', 'CH', 'LU', 'MC', 'RE', 'GP', 'MQ', 'GF', 'PF', 'NC']);
  if (country) return frenchFirst.has(country.toUpperCase()) ? 'fr' : 'en';
  if (/\bfr(?:[-_]|\b)/i.test(acceptLanguage ?? '')) return 'fr';
  return 'en';
}
