import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { resolveInitialLocale } from './i18n/locale';
import { equivalentPath, localizedPath, parseLocalizedRoute, type Locale } from './i18n/routes';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const CreatorsPage = lazy(() => import('./pages/CreatorsPage').then((module) => ({ default: module.CreatorsPage })));
const CreatorDetailPage = lazy(() => import('./pages/CreatorDetailPage').then((module) => ({ default: module.CreatorDetailPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((module) => ({ default: module.SolutionsPage })));
const ForBrandsPage = lazy(() => import('./pages/ForBrandsPage').then((module) => ({ default: module.ForBrandsPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then((module) => ({ default: module.CaseStudiesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const JoinPage = lazy(() => import('./pages/JoinPage').then((module) => ({ default: module.JoinPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.LegalPage })));
const SelectionPage = lazy(() => import('./pages/SelectionPage').then((module) => ({ default: module.SelectionPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then((module) => ({ default: module.MethodologyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

function RouteLoading() {
  const french = window.location.pathname.startsWith('/fr');
  return <div className="route-loading" aria-label={french ? 'Chargement de la page' : 'Loading page'}><span /></div>;
}

function savedLocale() {
  const value = document.cookie.match(/(?:^|;\s*)rni_locale=(fr|en)(?:;|$)/)?.[1] ?? window.localStorage.getItem('rni_locale');
  return value === 'fr' || value === 'en' ? value : undefined;
}

function LocaleEntry() {
  const location = useLocation();
  const locale = resolveInitialLocale({ pathname: location.pathname, savedLocale: savedLocale(), acceptLanguage: navigator.languages?.join(',') ?? navigator.language });
  return <Navigate to={`${localizedPath(locale, 'home')}${location.search}`} replace />;
}

function LegacyRedirect() {
  const location = useLocation();
  const locale = resolveInitialLocale({ savedLocale: savedLocale(), acceptLanguage: navigator.language });
  return <Navigate to={`${equivalentPath(location.pathname, locale)}${location.search}${location.hash}`} replace />;
}

function LocaleGuard({ locale, children }: { locale: Locale; children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (parseLocalizedRoute(location.pathname).locale !== locale) navigate(localizedPath(locale, 'home'), { replace: true });
  }, [locale, location.pathname, navigate]);
  return <>{children}</>;
}

function localizedRoutes(locale: Locale) {
  const creatorPath = locale === 'fr' ? 'createurs' : 'creators';
  // DocumentLocalization intentionally mutates English text for the legacy copy layer.
  // A keyed layout guarantees that changing back to French creates a fresh French DOM,
  // rather than reusing text nodes previously translated outside React.
  return <Route path={locale} element={<LocaleGuard locale={locale}><Layout key={locale} /></LocaleGuard>}>
    <Route index element={<HomePage />} />
    <Route path={creatorPath} element={<CreatorsPage />} />
    <Route path={`${creatorPath}/:slug`} element={<CreatorDetailPage />} />
    <Route path="solutions" element={<SolutionsPage />} />
    <Route path={locale === 'fr' ? 'pour-les-marques' : 'for-brands'} element={<ForBrandsPage />} />
    <Route path={locale === 'fr' ? 'creer-une-campagne' : 'build-a-campaign'} element={<ContactPage />} />
    <Route path={locale === 'fr' ? 'cas-clients' : 'case-studies'} element={<CaseStudiesPage />} />
    <Route path={locale === 'fr' ? 'a-propos' : 'about'} element={<AboutPage />} />
    <Route path={locale === 'fr' ? 'rejoindre-le-reseau' : 'join-the-network'} element={<JoinPage />} />
    <Route path="contact" element={<ContactPage />} />
    <Route path="selection" element={<SelectionPage />} />
    <Route path={locale === 'fr' ? 'methodologie' : 'methodology'} element={<MethodologyPage />} />
    <Route path={locale === 'fr' ? 'confidentialite' : 'privacy'} element={<LegalPage type="privacy" />} />
    <Route path={locale === 'fr' ? 'conditions' : 'terms'} element={<LegalPage type="terms" />} />
    <Route path={locale === 'fr' ? 'mentions-legales' : 'legal-notice'} element={<LegalPage type="legal" />} />
    <Route path="*" element={<NotFoundPage />} />
  </Route>;
}

export function App() {
  return <Suspense fallback={<RouteLoading />}><Routes>
    <Route path="/" element={<LocaleEntry />} />
    {localizedRoutes('fr')}
    {localizedRoutes('en')}
    <Route path="*" element={<LegacyRedirect />} />
  </Routes></Suspense>;
}
