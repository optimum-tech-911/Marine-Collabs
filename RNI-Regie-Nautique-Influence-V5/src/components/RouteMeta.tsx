import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brand } from '../config/brand';
import { creatorBySlug } from '../data/creators';

type Meta = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'profile';
  robots?: string;
};

const staticMeta: Record<string, Meta> = {
  '/': {
    title: "Agence d’influence nautique",
    description: "Régie Nautique d’Influence sélectionne et coordonne des créateurs maritimes pour des campagnes crédibles, humaines et mesurables.",
    image: '/assets/editorial/adrien-hero.webp',
  },
  '/creators': {
    title: 'Créateurs maritimes',
    description: 'Découvrez un réseau sélectionné de marins, capitaines, plongeurs, athlètes et spécialistes du nautisme.',
    image: '/assets/editorial/can-hero.webp',
  },
  '/solutions': {
    title: 'Solutions de campagne',
    description: 'Notoriété, lancement, test produit, contenu, ambassade, destination et événement nautique.',
    image: '/assets/editorial/gallery/sunset-sailing.webp',
  },
  '/for-brands': {
    title: 'Pour les marques',
    description: 'Construisez une campagne maritime avec une sélection de créateurs, un cadrage clair et une coordination unique.',
    image: '/assets/editorial/gallery/boat-work-duo.webp',
  },
  '/campaign-builder': {
    title: 'Créer une campagne',
    description: 'Transformez votre objectif en brief structuré avec marchés, formats, droits et créateurs sélectionnés.',
    image: '/assets/editorial/gallery/yacht-deck.webp',
    robots: 'noindex, follow',
  },
  '/case-studies': {
    title: 'Cas clients',
    description: 'Une structure rigoureuse pour présenter uniquement des résultats réels, autorisés et documentés.',
    robots: 'noindex, nofollow',
  },
  '/about': {
    title: 'À propos',
    description: 'Une agence spécialisée à la rencontre de la culture maritime, de la création de contenu et des enjeux de marque.',
    image: '/assets/editorial/adrien-hero.webp',
  },
  '/join-the-network': {
    title: 'Rejoindre le réseau',
    description: 'Candidatez pour rejoindre un réseau sélectionné de créateurs maritimes.',
    image: '/assets/editorial/gallery/windy-sailing.webp',
  },
  '/contact': {
    title: 'Contact',
    description: 'Parlez à Régie Nautique d’Influence de votre marque, de votre campagne ou de votre candidature.',
    image: '/assets/editorial/gallery/marina-reflection.webp',
    robots: 'noindex, follow',
  },
  '/selection': {
    title: 'Sélection de créateurs',
    description: 'Comparez les créateurs présélectionnés avant de transformer le casting en brief de campagne.',
    image: '/assets/editorial/gallery/yacht-deck.webp',
    robots: 'noindex, follow',
  },
  '/methodology': {
    title: 'Méthodologie et sources',
    description: 'Comprenez l’origine, la période et le niveau de preuve des métriques utilisées par Régie Nautique.',
    image: '/assets/editorial/gallery/windy-sailing.webp',
  },
  '/privacy': { title: 'Politique de confidentialité', description: 'Cadre de confidentialité de Régie Nautique d’Influence.', robots: 'noindex, follow' },
  '/terms': { title: "Conditions d’utilisation", description: "Conditions d’utilisation de la plateforme Régie Nautique d’Influence.", robots: 'noindex, follow' },
  '/legal': { title: 'Mentions légales', description: 'Informations légales de Régie Nautique d’Influence.', robots: 'noindex, follow' },
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
    let meta = staticMeta[location.pathname];
    let schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: brand.name,
      alternateName: brand.shortName,
      url: origin,
      email: brand.email,
      description: brand.descriptor,
    };

    if (location.pathname.startsWith('/creators/')) {
      const slug = location.pathname.split('/').filter(Boolean)[1];
      const creator = slug ? creatorBySlug.get(slug) : undefined;
      if (creator) {
        meta = {
          title: `${creator.displayName} · ${creator.handle}`,
          description: `${creator.headline}. ${creator.shortBio}`,
          image: creator.image,
          type: 'profile',
        };
        schema = {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: `${origin}${location.pathname}`,
          mainEntity: {
            '@type': creator.schemaType,
            name: creator.displayName,
            description: creator.headline,
            image: `${origin}${creator.image}`,
            sameAs: creator.platforms[0]?.url ? [creator.platforms[0].url] : undefined,
          },
        };
      }
    }

    const resolved = meta ?? { title: brand.shortName, description: brand.descriptor };
    const canonicalUrl = `${origin}${location.pathname === '/' ? '/' : location.pathname}`;
    const imageUrl = resolved.image ? `${origin}${resolved.image}` : `${origin}/assets/editorial/adrien-hero.webp`;
    const fullTitle = `${resolved.title} | ${brand.name}`;

    document.documentElement.lang = 'fr';
    document.title = fullTitle;

    ensureMeta('meta[name="description"]', { name: 'description' }).content = resolved.description;
    ensureMeta('meta[property="og:title"]', { property: 'og:title' }).content = fullTitle;
    ensureMeta('meta[property="og:description"]', { property: 'og:description' }).content = resolved.description;
    ensureMeta('meta[property="og:url"]', { property: 'og:url' }).content = canonicalUrl;
    ensureMeta('meta[property="og:type"]', { property: 'og:type' }).content = resolved.type ?? 'website';
    ensureMeta('meta[property="og:image"]', { property: 'og:image' }).content = imageUrl;
    ensureMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }).content = resolved.title;
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name' }).content = brand.name;
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale' }).content = 'fr_FR';
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

    let alternate = document.querySelector<HTMLLinkElement>('link[rel="alternate"][hreflang="fr"]');
    if (!alternate) {
      alternate = document.createElement('link');
      alternate.rel = 'alternate';
      alternate.hreflang = 'fr';
      document.head.appendChild(alternate);
    }
    alternate.href = canonicalUrl;

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
