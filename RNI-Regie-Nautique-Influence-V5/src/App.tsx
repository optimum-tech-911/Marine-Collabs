import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({ default: module.HomePage })));
const CreatorsPage = lazy(() => import('./pages/CreatorsPage').then((module) => ({ default: module.CreatorsPage })));
const CreatorDetailPage = lazy(() => import('./pages/CreatorDetailPage').then((module) => ({ default: module.CreatorDetailPage })));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((module) => ({ default: module.SolutionsPage })));
const ForBrandsPage = lazy(() => import('./pages/ForBrandsPage').then((module) => ({ default: module.ForBrandsPage })));
const CampaignBuilderPage = lazy(() => import('./pages/CampaignBuilderPage').then((module) => ({ default: module.CampaignBuilderPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then((module) => ({ default: module.CaseStudiesPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })));
const JoinPage = lazy(() => import('./pages/JoinPage').then((module) => ({ default: module.JoinPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then((module) => ({ default: module.LegalPage })));
const SelectionPage = lazy(() => import('./pages/SelectionPage').then((module) => ({ default: module.SelectionPage })));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage').then((module) => ({ default: module.MethodologyPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));


function LegacyCreatorRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? `/creators/${slug}` : '/creators'} replace />;
}

function RouteLoading() {
  return <div className="route-loading" aria-label="Chargement de la page"><span /></div>;
}

export function App() {
  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route path="creators/:slug" element={<CreatorDetailPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="for-brands" element={<ForBrandsPage />} />
          <Route path="campaign-builder" element={<CampaignBuilderPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="join-the-network" element={<JoinPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="selection" element={<SelectionPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="createurs" element={<Navigate to="/creators" replace />} />
          <Route path="createurs/:slug" element={<LegacyCreatorRedirect />} />
          <Route path="pour-les-marques" element={<Navigate to="/for-brands" replace />} />
          <Route path="creer-une-campagne" element={<Navigate to="/campaign-builder" replace />} />
          <Route path="cas-clients" element={<Navigate to="/case-studies" replace />} />
          <Route path="a-propos" element={<Navigate to="/about" replace />} />
          <Route path="rejoindre-le-reseau" element={<Navigate to="/join-the-network" replace />} />
          <Route path="methodologie" element={<Navigate to="/methodology" replace />} />
          <Route path="privacy" element={<LegalPage type="privacy" />} />
          <Route path="terms" element={<LegalPage type="terms" />} />
          <Route path="legal" element={<LegalPage type="legal" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
