import { createContext, useContext, useEffect, type PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { equivalentPath, localeFromPathname, localizedPath, type Locale } from './routes';
export { resolveInitialLocale } from './locale-resolution';
import { resolveInitialLocale } from './locale-resolution';

const COOKIE_NAME = 'rni_locale';

function readCookie() {
  return document.cookie.split('; ').find((item) => item.startsWith(`${COOKIE_NAME}=`))?.split('=')[1] as Locale | undefined;
}

function saveLocale(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; Max-Age=31536000; Path=/; SameSite=Lax`;
  window.localStorage.setItem(COOKIE_NAME, locale);
}

const LocaleContext = createContext<{ locale: Locale; switchLocale: (locale: Locale) => void } | null>(null);

export function LocaleProvider({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathLocale = localeFromPathname(location.pathname);
  const locale = pathLocale ?? resolveInitialLocale({ savedLocale: readCookie(), acceptLanguage: navigator.language });

  useEffect(() => {
    document.documentElement.lang = locale;
    if (pathLocale) saveLocale(pathLocale);
  }, [locale, pathLocale]);
  const switchLocale = (target: Locale) => {
    saveLocale(target);
    navigate(`${equivalentPath(location.pathname, target)}${location.search}${location.hash}`);
  };
  return <LocaleContext.Provider value={{ locale, switchLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error('useLocale must be used inside LocaleProvider');
  return context;
}

export function useLocalizedPath() {
  const { locale } = useLocale();
  return (key: Parameters<typeof localizedPath>[1]) => localizedPath(locale, key);
}
