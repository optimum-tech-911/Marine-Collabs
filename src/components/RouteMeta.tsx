import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brand } from '../config/brand';
import { equivalentPath, parseLocalizedRoute, type Locale } from '../i18n/routes';

type Meta = {
  title: string;
  description: string;
  image?: string;
  type?: 'website';
  robots?: string;
};

const staticMeta: Record<string, Record<Locale, Meta>> = {
  home: { fr: {
    title: "Agence d’influence nautique",
    description: "Krew Media sélectionne et coordonne des créateurs maritimes pour des campagnes crédibles, humaines et mesurables.",
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'Maritime influence agency', description: 'Krew Media selects and coordinates maritime creators for credible, human and measurable campaigns.', image: '/assets/brand/hero-poster.jpg' } },
  creators: { fr: {
    title: 'Créateurs maritimes',
    description: 'Découvrez un réseau sélectionné de marins, capitaines, plongeurs, athlètes et spécialistes du nautisme.',
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'Maritime creators', description: 'Explore a selected network of sailors, captains, divers, athletes and marine specialists.', image: '/assets/brand/hero-poster.jpg' } },
  solutions: { fr: {
    title: 'Solutions de campagne',
    description: 'Notoriété, lancement, test produit, contenu, ambassade, destination et événement nautique.',
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'Campaign solutions', description: 'Awareness, launch, product trial, content, ambassador, destination and maritime events.', image: '/assets/brand/hero-poster.jpg' } },
  brands: { fr: {
    title: 'Pour les marques',
    description: 'Construisez une campagne maritime avec une sélection de créateurs, un cadrage clair et une coordination unique.',
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'For brands', description: 'Build a maritime campaign with a curated creator selection, clear scope and one accountable partner.', image: '/assets/brand/hero-poster.jpg' } },
  campaign: { fr: {
    title: 'Parler à Krew Media',
    description: 'Échangez directement avec Krew Media au sujet de votre marque et de votre projet nautique.',
    image: '/assets/brand/hero-poster.jpg',
    robots: 'noindex, follow',
  }, en: { title: 'Talk to Krew Media', description: 'Talk directly with Krew Media about your brand and maritime project.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow' } },
  cases: { fr: {
    title: 'Cas clients',
    description: 'Une structure rigoureuse pour présenter uniquement des résultats réels, autorisés et documentés.',
    robots: 'noindex, nofollow',
  }, en: { title: 'Case studies', description: 'A rigorous framework for presenting only real, authorised and documented results.', robots: 'noindex, nofollow' } },
  about: { fr: {
    title: 'À propos',
    description: 'Une agence spécialisée à la rencontre de la culture maritime, de la création de contenu et des enjeux de marque.',
    image: '/assets/brand/adrien-cazanave.jpg',
  }, en: { title: 'About Krew Media', description: 'An agency at the intersection of maritime culture, creator work and brand challenges.', image: '/assets/brand/adrien-cazanave.jpg' } },
  join: { fr: {
    title: 'Rejoindre le réseau',
    description: 'Présentez votre univers maritime à Krew Media par WhatsApp ou email.',
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'Join the network', description: 'Introduce your maritime world to Krew Media by WhatsApp or email.', image: '/assets/brand/hero-poster.jpg' } },
  contact: { fr: {
    title: 'Contact',
    description: 'Parlez directement à Krew Media par WhatsApp ou email.',
    image: '/assets/brand/hero-poster.jpg',
    robots: 'noindex, follow',
  }, en: { title: 'Contact', description: 'Talk directly to Krew Media by WhatsApp or email.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow' } },
  selection: { fr: {
    title: 'Sélection de créateurs',
    description: 'Comparez les créateurs présélectionnés avant de transformer le casting en brief de campagne.',
    image: '/assets/brand/hero-poster.jpg',
    robots: 'noindex, follow',
  }, en: { title: 'Creator shortlist', description: 'Compare selected creators before turning the cast into a campaign brief.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow' } },
  methodology: { fr: {
    title: 'Méthodologie et sources',
    description: 'Comprenez l’origine, la période et le niveau de preuve des métriques utilisées par Krew Media.',
    image: '/assets/brand/hero-poster.jpg',
  }, en: { title: 'Methodology & sources', description: 'Understand the source, period and level of evidence behind Krew Media metrics.', image: '/assets/brand/hero-poster.jpg' } },
  privacy: { fr: { title: 'Politique de confidentialité', description: 'Cadre de confidentialité de Krew Media.', robots: 'noindex, follow' }, en: { title: 'Privacy policy', description: 'Krew Media privacy framework.', robots: 'noindex, follow' } },
  terms: { fr: { title: "Conditions d’utilisation", description: "Conditions d’utilisation de la plateforme Krew Media.", robots: 'noindex, follow' }, en: { title: 'Terms of use', description: 'Krew Media platform terms of use.', robots: 'noindex, follow' } },
  legal: { fr: { title: 'Mentions légales', description: 'Informations légales de Krew Media.', robots: 'noindex, follow' }, en: { title: 'Legal notice', description: 'Krew Media legal information.', robots: 'noindex, follow' } },
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value));
    document.head.appendChild(element);
  }
  return element;
}

export function RouteMeta() {
  const location = useLocation();

  useEffect(() => {
    const origin = `https://${brand.domain}`;
    const parsed = parseLocalizedRoute(location.pathname);
    const locale = parsed.locale ?? 'en';
    let meta = parsed.key ? staticMeta[parsed.key]?.[locale] : undefined;
    let schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brand.name,
      alternateName: brand.shortName,
      url: origin,
      email: brand.email,
      description: locale === 'fr' ? brand.descriptor : brand.descriptorEn,
    };

    const resolved = meta ?? { title: brand.shortName, description: brand.descriptor };
    const canonicalUrl = `${origin}${location.pathname === '/' ? '/' : location.pathname}`;
    const imageUrl = resolved.image ? `${origin}${resolved.image}` : `${origin}/assets/brand/hero-poster.jpg`;
    const fullTitle = `${resolved.title} | ${brand.name}`;

    document.documentElement.lang = locale;
    document.title = fullTitle;

    ensureMeta('meta[name="description"]', { name: 'description' }).content = resolved.description;
    ensureMeta('meta[property="og:title"]', { property: 'og:title' }).content = fullTitle;
    ensureMeta('meta[property="og:description"]', { property: 'og:description' }).content = resolved.description;
    ensureMeta('meta[property="og:url"]', { property: 'og:url' }).content = canonicalUrl;
    ensureMeta('meta[property="og:type"]', { property: 'og:type' }).content = resolved.type ?? 'website';
    ensureMeta('meta[property="og:image"]', { property: 'og:image' }).content = imageUrl;
    ensureMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }).content = resolved.title;
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name' }).content = brand.name;
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale' }).content = locale === 'fr' ? 'fr_FR' : 'en_GB';
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card' }).content = 'summary_large_image';
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).content = fullTitle;
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).content = resolved.description;
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).content = imageUrl;
    ensureMeta('meta[name="robots"]', { name: 'robots' }).content = resolved.robots ?? 'index, follow';

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    (['fr', 'en', 'x-default'] as const).forEach((language) => {
      let alternate = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${language}"]`);
      if (!alternate) { alternate = document.createElement('link'); alternate.rel = 'alternate'; alternate.hreflang = language; document.head.appendChild(alternate); }
      alternate.href = language === 'x-default' ? `${origin}/` : `${origin}${equivalentPath(location.pathname, language)}`;
    });

    let structuredData = document.querySelector<HTMLScriptElement>('script[data-rni-schema]');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.type = 'application/ld+json';
      structuredData.dataset.rniSchema = 'true';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(schema);
  }, [location.pathname]);

  return null;
}
