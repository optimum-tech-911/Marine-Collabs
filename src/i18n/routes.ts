export type Locale = 'fr' | 'en';

export type RouteKey =
  | 'home' | 'creators' | 'solutions' | 'brands' | 'campaign'
  | 'cases' | 'about' | 'join' | 'contact' | 'selection' | 'methodology'
  | 'privacy' | 'terms' | 'legal';

const paths: Record<Locale, Record<RouteKey, string>> = {
  fr: {
    home: '/', creators: '/createurs', solutions: '/solutions',
    brands: '/pour-les-marques', campaign: '/creer-une-campagne', cases: '/cas-clients',
    about: '/a-propos', join: '/rejoindre-le-reseau', contact: '/contact', selection: '/selection',
    methodology: '/methodologie', privacy: '/confidentialite', terms: '/conditions', legal: '/mentions-legales',
  },
  en: {
    home: '/', creators: '/creators', solutions: '/solutions',
    brands: '/for-brands', campaign: '/build-a-campaign', cases: '/case-studies',
    about: '/about', join: '/join-the-network', contact: '/contact', selection: '/selection',
    methodology: '/methodology', privacy: '/privacy', terms: '/terms', legal: '/legal-notice',
  },
};

const aliases: Record<string, RouteKey> = {
  '': 'home', creators: 'creators', createurs: 'creators', solutions: 'solutions',
  'for-brands': 'brands', 'pour-les-marques': 'brands', 'campaign-builder': 'campaign',
  'build-a-campaign': 'campaign', 'creer-une-campagne': 'campaign', 'case-studies': 'cases',
  'cas-clients': 'cases', about: 'about', 'a-propos': 'about', 'join-the-network': 'join',
  'rejoindre-le-reseau': 'join', contact: 'contact', selection: 'selection', methodology: 'methodology',
  methodologie: 'methodology', privacy: 'privacy', confidentialite: 'privacy', terms: 'terms',
  conditions: 'terms', legal: 'legal', 'legal-notice': 'legal', 'mentions-legales': 'legal',
};

export function localeFromPathname(pathname: string): Locale | null {
  const locale = pathname.split('/').filter(Boolean)[0];
  return locale === 'fr' || locale === 'en' ? locale : null;
}

export function stripLocale(pathname: string) {
  const chunks = pathname.split('/').filter(Boolean);
  if (chunks[0] === 'fr' || chunks[0] === 'en') chunks.shift();
  return `/${chunks.join('/')}`.replace(/\/$/, '') || '/';
}

export function routeKeyFromPath(pathname: string): RouteKey | null {
  const chunks = stripLocale(pathname).split('/').filter(Boolean);
  if (!chunks.length) return 'home';
  return aliases[chunks[0] ?? ''] ?? null;
}

export function localizedPath(locale: Locale, key: RouteKey) {
  const base = paths[locale][key];
  return `/${locale}${base}/`.replace(/\/$/, '/');
}

export function equivalentPath(pathname: string, target: Locale) {
  const key = routeKeyFromPath(pathname);
  return localizedPath(target, key ?? 'home');
}

export function parseLocalizedRoute(pathname: string) {
  const locale = localeFromPathname(pathname);
  const key = routeKeyFromPath(pathname);
  return { locale, key };
}

export const LOCALIZED_ROUTE_KEYS = Object.keys(paths.fr) as RouteKey[];
