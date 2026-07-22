import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { ScrollProgress } from './ScrollProgress';
import { ShortlistDrawer } from './ShortlistDrawer';
import { RouteMeta } from './RouteMeta';
import { RouteAnnouncer } from './RouteAnnouncer';
import { ShortlistLiveRegion } from './ShortlistLiveRegion';
import { WorkingPrototypeBanner } from './WorkingPrototypeBanner';
import { AnalyticsTracker } from './AnalyticsTracker';
import { DocumentLocalization } from './DocumentLocalization';
import { ScrollMotion } from './ScrollMotion';
import { GlobalContactDock } from './GlobalContactDock';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      <RouteMeta />
      <DocumentLocalization />
      <ScrollMotion />
      <AnalyticsTracker />
      <RouteAnnouncer />
      <ShortlistLiveRegion />
      <ScrollProgress />
      <a className="skip-link" href="#main-content">Aller au contenu</a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <GlobalContactDock />
      <WorkingPrototypeBanner />
      <ShortlistDrawer />
    </>
  );
}
