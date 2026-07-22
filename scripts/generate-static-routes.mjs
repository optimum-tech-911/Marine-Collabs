import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const brandSource = await readFile(path.join(root, 'src/config/brand.ts'), 'utf8');
const brandValue = (pattern, fallback = '') => brandSource.match(pattern)?.[1] ?? fallback;
const brand = {
  name: brandValue(/name: [\"']([^\"']+)[\"']/, 'Krew Media'),
  shortName: brandValue(/shortName: [\"']([^\"']+)[\"']/, 'Krew Media'),
  descriptor: brandValue(/descriptor: [\"']([^\"']+)[\"']/, 'Agence d’influence maritime'),
  email: brandValue(/email: [\"']([^\"']+)[\"']/, 'adrien.cazanave@gmail.com'),
  domain: brandValue(/domain: [\"']([^\"']+)[\"']/, 'regienautique.fr'),
};
const origin = `https://${brand.domain}`;
const whatsappUrl = 'https://wa.me/33605518610?text=Bonjour%20Adrien%2C%20je%20souhaite%20%C3%A9changer%20au%20sujet%20d%E2%80%99une%20campagne%20nautique.';
const emailUrl = `mailto:${brand.email}`;
const baseHtml = await readFile(path.join(distDir, 'index.html'), 'utf8');
const creatorsSource = await readFile(path.join(root, 'src/data/creators.ts'), 'utf8');

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const extract = (block, pattern, fallback = '') => block.match(pattern)?.[1] ?? fallback;
const creatorBlocks = creatorsSource.split(/\n  \{\n/).slice(1);
const creators = creatorBlocks.map((block) => ({
  slug: extract(block, /(?:^|\n)    slug: '([^']+)'/),
  displayName: extract(block, /(?:^|\n)    displayName: '([^']+)'/),
  handle: extract(block, /(?:^|\n)    handle: '([^']+)'/),
  schemaType: extract(block, /(?:^|\n)    schemaType: '([^']+)'/, 'Person'),
  platformUrl: extract(block, /url: '([^']+)'/),
  headline: extract(block, /(?:^|\n)    headline: '([^']+)'/),
  shortBio: extract(block, /(?:^|\n)    shortBio: '([^']+)'/),
  followers: Number(extract(block, /(?:^|\n)    followers: (\d+)/, '0')),
  posts: Number(extract(block, /(?:^|\n)    posts: (\d+)/, '0')),
  image: extract(block, /(?:^|\n)    image: '([^']+)'/),
})).filter((creator) => creator.slug && creator.displayName);

const routes = [
  { route: '/', title: 'Agence d’influence nautique', eyebrow: 'KREW MEDIA', heading: 'Les voix que vos clients écoutent déjà.', description: 'Krew Media sélectionne et coordonne des créateurs maritimes pour des campagnes crédibles, humaines et mesurables.', image: '/assets/brand/hero-poster.jpg', links: [['Découvrir les créateurs', '/creators'], ['Construire un brief', '/campaign-builder']] },
  { route: '/creators', title: 'Créateurs maritimes', eyebrow: 'LE RÉSEAU', heading: 'Des créateurs qui vivent réellement le nautisme.', description: 'Découvrez un réseau sélectionné de marins, capitaines, plongeurs, athlètes et spécialistes du nautisme.', image: '/assets/brand/hero-poster.jpg', links: [['Créer une campagne', '/campaign-builder'], ['Comparer une sélection', '/selection']] },
  { route: '/solutions', title: 'Solutions de campagne', eyebrow: 'SOLUTIONS', heading: 'Commencez par l’objectif. Nous construisons le dispositif.', description: 'Notoriété, lancement, test produit, contenu, ambassade, destination et événement nautique.', image: '/assets/brand/hero-poster.jpg', links: [['Construire le brief', '/campaign-builder'], ['Parler à Adrien sur WhatsApp', whatsappUrl]] },
  { route: '/for-brands', title: 'Pour les marques', eyebrow: 'POUR LES MARQUES', heading: 'Faites parler de votre marque par ceux que le nautisme écoute déjà.', description: 'Construisez une campagne maritime avec une sélection de créateurs, un cadrage clair et une coordination unique.', image: '/assets/brand/hero-poster.jpg', links: [['Parler à Adrien sur WhatsApp', whatsappUrl], ['Explorer le réseau', '/creators']] },
  { route: '/campaign-builder', title: 'Créer une campagne', eyebrow: 'BRIEF DE CAMPAGNE', heading: 'Transformez une idée en brief créateur exploitable.', description: 'Structurez vos marchés, formats, droits et créateurs présélectionnés dans un brouillon enregistré localement.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow', links: [['Voir les créateurs', '/creators']] },
  { route: '/selection', title: 'Sélection de créateurs', eyebrow: 'CASTING', heading: 'Comparez les profils avant de valider votre brief.', description: 'Comparez les créateurs présélectionnés avant de transformer le casting en brief de campagne.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow', links: [['Explorer le réseau', '/creators'], ['Construire le brief', '/campaign-builder']] },
  { route: '/methodology', title: 'Méthodologie et sources', eyebrow: 'TRANSPARENCE', heading: 'Chaque chiffre doit indiquer ce qu’il mesure et d’où il vient.', description: 'Comprenez l’origine, la période et le niveau de preuve des métriques utilisées par Krew Media.', image: '/assets/brand/hero-poster.jpg', links: [['Voir le réseau', '/creators']] },
  { route: '/case-studies', title: 'Cas clients', eyebrow: 'CAS CLIENTS', heading: 'Des résultats réels, documentés et autorisés.', description: 'Une structure rigoureuse pour présenter uniquement des résultats réels, autorisés et documentés.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, nofollow', links: [['Parler de votre campagne sur WhatsApp', whatsappUrl]] },
  { route: '/about', title: 'À propos', eyebrow: 'L’AGENCE', heading: 'Une agence construite entre culture maritime et économie des créateurs.', description: 'Une agence spécialisée à la rencontre de la culture maritime, de la création de contenu et des enjeux de marque.', image: '/assets/brand/adrien-cazanave.jpg', links: [['Parler à Adrien sur WhatsApp', whatsappUrl]] },
  { route: '/join-the-network', title: 'Rejoindre le réseau', eyebrow: 'POUR LES CRÉATEURS', heading: 'Rejoignez un réseau qui comprend le travail derrière le contenu maritime.', description: 'Candidatez pour rejoindre un réseau sélectionné de créateurs maritimes.', image: '/assets/brand/hero-poster.jpg', links: [['Présenter votre profil par email', emailUrl]] },
  { route: '/contact', title: 'Contact', eyebrow: 'CONTACT', heading: 'Commencez par la bonne conversation.', description: 'Parlez à Krew Media de votre marque, de votre campagne ou de votre candidature.', image: '/assets/brand/hero-poster.jpg', robots: 'noindex, follow', links: [['Voir les créateurs', '/creators']] },
  { route: '/privacy', title: 'Politique de confidentialité', heading: 'Politique de confidentialité', description: 'Cadre de confidentialité de Krew Media.', robots: 'noindex, follow' },
  { route: '/terms', title: 'Conditions d’utilisation', heading: 'Conditions d’utilisation', description: 'Conditions d’utilisation de la plateforme Krew Media.', robots: 'noindex, follow' },
  { route: '/legal', title: 'Mentions légales', heading: 'Mentions légales', description: 'Informations légales de Krew Media.', robots: 'noindex, follow' },
];

const staticStyle = `<style data-static-shell-style>
.static-route-shell{min-height:100vh;padding:32px clamp(20px,6vw,84px);background:linear-gradient(145deg,#084766 0%,#0d788d 100%);color:#f4ffff;font-family:Inter,ui-sans-serif,system-ui,sans-serif}.static-route-shell a{color:inherit}.static-route-shell__nav{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:28px;border-bottom:1px solid rgba(220,250,250,.28)}.static-route-shell__brand{font-weight:800;letter-spacing:.05em;text-decoration:none}.static-route-shell__nav nav{display:flex;flex-wrap:wrap;gap:18px;font-size:14px}.static-route-shell__main{max-width:900px;padding:clamp(72px,12vw,150px) 0}.static-route-shell__eyebrow{color:#92e7d7;font-size:12px;font-weight:800;letter-spacing:.16em}.static-route-shell h1{max-width:850px;margin:18px 0;font-size:clamp(42px,8vw,88px);line-height:.95;letter-spacing:-.055em}.static-route-shell__description{max-width:720px;color:#d5eff0;font-size:clamp(17px,2vw,22px);line-height:1.55}.static-route-shell__facts{display:flex;flex-wrap:wrap;gap:12px;margin:30px 0 0;padding:0;list-style:none}.static-route-shell__facts li{padding:11px 14px;border:1px solid rgba(220,250,250,.3);border-radius:999px;font-size:14px}.static-route-shell__actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}.static-route-shell__actions a{padding:13px 18px;border-radius:999px;background:#92e7d7;color:#073b57;font-weight:800;text-decoration:none}.static-route-shell__actions a+ a{background:transparent;color:#f4ffff;border:1px solid rgba(220,250,250,.42)}.static-route-shell__note{margin-top:28px;color:#b5d9dd;font-size:13px}@media(max-width:680px){.static-route-shell__nav nav{display:none}}
</style>`;

function buildStaticShell(meta) {
  const links = (meta.links ?? [['Retour à l’accueil', '/']])
    .map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)}</a>`)
    .join('');
  return `<div id="root"><div class="static-route-shell" data-static-shell>
    <header class="static-route-shell__nav"><a class="static-route-shell__brand" href="/">${escapeHtml(brand.shortName)}</a><nav aria-label="Navigation statique"><a href="/creators">Créateurs</a><a href="/solutions">Solutions</a><a href="/for-brands">Pour les marques</a><a href="/about">À propos</a></nav></header>
    <main class="static-route-shell__main"><p class="static-route-shell__eyebrow">${escapeHtml(meta.eyebrow ?? 'KREW MEDIA')}</p><h1>${escapeHtml(meta.heading ?? meta.title)}</h1><p class="static-route-shell__description">${escapeHtml(meta.description)}</p><div class="static-route-shell__actions">${links}</div><p class="static-route-shell__note">L’interface interactive se charge automatiquement. Les outils de sélection nécessitent JavaScript.</p></main>
  </div></div>`;
}

function setMeta(html, meta) {
  const { route, title, description, image = '/assets/brand/hero-poster.jpg', robots = 'index, follow', type = 'website' } = meta;
  const fullTitle = `${title} | ${brand.name}`;
  const canonical = `${origin}${route === '/' ? '/' : route}`;
  const absoluteImage = `${origin}${image}`;
  let output = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(fullTitle)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${absoluteImage}" />`)
    .replace('<div id="root"></div>', buildStaticShell(meta));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand.name,
    alternateName: brand.shortName,
    url: origin,
    email: brand.email,
    description: brand.descriptor,
  };
  const injected = [
    staticStyle,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="fr" href="${canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${absoluteImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`,
  ].join('\n    ');
  output = output.replace('</head>', `    ${injected}\n  </head>`);
  return output;
}

for (const meta of routes) {
  const target = meta.route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, meta.route.slice(1), 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, setMeta(baseHtml, meta), 'utf8');
}

const notFound = setMeta(baseHtml, {
  route: '/404',
  title: 'Page introuvable',
  heading: 'Cette page a quitté le port.',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  robots: 'noindex, nofollow',
  links: [['Retour à l’accueil', '/'], ['Explorer les créateurs', '/creators']],
});
await writeFile(path.join(distDir, '404.html'), notFound, 'utf8');

const sitemapUrls = routes
  .filter((item) => !item.robots?.startsWith('noindex'))
  .map((item) => `  <url><loc>${origin}${item.route === '/' ? '/' : item.route}</loc></url>`)
  .join('\n');
await writeFile(path.join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`, 'utf8');

console.log(`Generated ${routes.length} static route shells and 404.html.`);
