import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const origin = 'https://regienautique.fr';
const sourceRoutes = [
  ['/', '/', '/'], ['creators', '/createurs', '/creators'], ['solutions', '/solutions', '/solutions'],
  ['for-brands', '/pour-les-marques', '/for-brands'], ['campaign-builder', '/creer-une-campagne', '/build-a-campaign'],
  ['case-studies', '/cas-clients', '/case-studies'], ['about', '/a-propos', '/about'],
  ['join-the-network', '/rejoindre-le-reseau', '/join-the-network'], ['contact', '/contact', '/contact'],
  ['selection', '/selection', '/selection'], ['methodology', '/methodologie', '/methodology'],
  ['privacy', '/confidentialite', '/privacy'], ['terms', '/conditions', '/terms'], ['legal', '/mentions-legales', '/legal-notice'],
];
const creatorSource = await readFile(path.join(root, 'src/data/creators.ts'), 'utf8');
const slugs = [...creatorSource.matchAll(/(?:^|\n)    slug: '([^']+)'/g)].map((match) => match[1]);
for (const slug of slugs) sourceRoutes.push([`creators/${slug}`, `/createurs/${slug}`, `/creators/${slug}`]);

const englishCopy = {
  '/': ['Maritime influence agency', 'The voices your customers already listen to.', 'Marine Collabs selects and coordinates maritime creators for credible, human and measurable campaigns.'],
  '/creators': ['Maritime creators', 'Creators who genuinely live the maritime world.', 'Explore a selected network of sailors, captains, divers, athletes and marine specialists.'],
  '/solutions': ['Campaign solutions', 'Start with the objective. We build the activation.', 'Awareness, launches, product trials, content, ambassadors, destinations and maritime events.'],
  '/for-brands': ['For brands', 'Put your brand in the conversations that matter.', 'A curated cast, clear scope and one accountable agency partner.'],
  '/build-a-campaign': ['Build a campaign', 'Turn an idea into a useful creator brief.', 'Structure your market, formats, rights and selected creators.'],
  '/case-studies': ['Case studies', 'Real, documented and authorised results.', 'A rigorous framework for presenting campaign evidence.'],
  '/about': ['About Marine Collabs', 'Built between maritime culture and creator work.', 'A maritime influence agency led by people who know the industry from within.'],
  '/join-the-network': ['Join the network', 'Join a network that understands the work behind maritime content.', 'Apply to work with a selective maritime creator agency.'],
  '/contact': ['Contact', 'Start with the right conversation.', 'Talk to Marine Collabs about your brand, campaign or creator application.'],
  '/selection': ['Creator shortlist', 'Compare your cast before building the brief.', 'Review the selected creator roles and territories.'],
  '/methodology': ['Methodology & sources', 'Every number should say what it measures and where it came from.', 'Understand the source, period and evidence level behind Marine Collabs metrics.'],
  '/privacy': ['Privacy policy', 'Privacy policy', 'Marine Collabs privacy framework.'],
  '/terms': ['Terms of use', 'Terms of use', 'Marine Collabs platform terms of use.'],
  '/legal-notice': ['Legal notice', 'Legal notice', 'Marine Collabs legal information.'],
};

function url(route) { return `${origin}${route === '/' ? '/' : `${route}/`}`; }
function sourceFile(source) { return source === '/' ? path.join(dist, 'index.html') : path.join(dist, source, 'index.html'); }
function targetFile(locale, target) { return path.join(dist, locale, target === '/' ? 'index.html' : path.join(target.slice(1), 'index.html')); }

function localizedHtml(html, locale, route, englishFallback) {
  const canonical = url(`/${locale}${route === '/' ? '/' : route}`.replace(/\/$/, '') || '/');
  const frRoute = route;
  const enRoute = englishFallback;
  const frUrl = url(`/fr${frRoute === '/' ? '/' : frRoute}`.replace(/\/$/, '') || '/');
  const enUrl = url(`/en${enRoute === '/' ? '/' : enRoute}`.replace(/\/$/, '') || '/');
  let output = html
    .replace('<html lang="fr">', `<html lang="${locale}">`)
    .replace(/<link rel="canonical" href="[^"]+" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="fr" href="[^"]+" \/>/, `<link rel="alternate" hreflang="fr" href="${frUrl}" />\n    <link rel="alternate" hreflang="en" href="${enUrl}" />\n    <link rel="alternate" hreflang="x-default" href="${origin}/" />`)
    .replace(/<meta property="og:url" content="[^"]+" \/>/, `<meta property="og:url" content="${canonical}" />`);
  if (locale === 'en') {
    const copy = englishCopy[englishFallback] ?? ['Maritime creator profile', 'A selected maritime creator.', 'Request the commercial profile and media kit from Marine Collabs.'];
    output = output.replace(/<title>.*?<\/title>/, `<title>${copy[0]} | Marine Collabs</title>`)
      .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${copy[2]}" />`)
      .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${copy[0]} | Marine Collabs" />`)
      .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${copy[2]}" />`)
      .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${copy[0]} | Marine Collabs" />`)
      .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${copy[2]}" />`)
      .replace(/<meta property="og:locale" content="fr_FR" \/>/, '<meta property="og:locale" content="en_GB" />')
      .replace(/<h1>.*?<\/h1>/, `<h1>${copy[1]}</h1>`)
      .replace(/<p class="static-route-shell__description">.*?<\/p>/, `<p class="static-route-shell__description">${copy[2]}</p>`)
      .replaceAll('Créateurs', 'Creators')
      .replaceAll('Navigation statique', 'Static navigation')
      .replaceAll('CRÉATEURS', 'CREATORS')
      .replaceAll('CRÉATEUR', 'CREATOR')
      .replaceAll('LE RÉSEAU', 'THE NETWORK')
      .replaceAll('POUR LES MARQUES', 'FOR BRANDS')
      .replaceAll('POUR LES CRÉATEURS', 'FOR CREATORS')
      .replaceAll('BRIEF DE CAMPAGNE', 'CAMPAIGN BRIEF')
      .replaceAll('TRANSPARENCE', 'TRANSPARENCY')
      .replaceAll('CAS CLIENTS', 'CASE STUDIES')
      .replaceAll('L’AGENCE', 'THE AGENCY')
      .replaceAll('Pour les marques', 'For brands')
      .replaceAll('À propos', 'About')
      .replaceAll('Découvrir les créateurs', 'Explore creators')
      .replaceAll('Explorer les créateurs', 'Explore creators')
      .replaceAll('Explorer le réseau', 'Explore the network')
      .replaceAll('Voir le réseau', 'View the network')
      .replaceAll('Voir les créateurs', 'View creators')
      .replaceAll('Voir les 12 profils', 'View all 12 profiles')
      .replaceAll('Construire un brief', 'Build the brief')
      .replaceAll('Construire le brief', 'Build the brief')
      .replaceAll('Créer une campagne', 'Build a campaign')
      .replaceAll('Choisir un créneau', 'Book a call')
      .replaceAll('Parler à l’agence', 'Talk to the agency')
      .replaceAll('Parler à l’équipe', 'Talk to the team')
      .replaceAll('Parler de votre campagne', 'Talk about your campaign')
      .replaceAll('Retour à l’accueil', 'Back to home')
      .replaceAll('L’interface interactive se charge automatiquement. Les données détaillées et les outils de sélection nécessitent JavaScript.', 'The interactive interface loads automatically. Detailed data and selection tools require JavaScript.')
      .replaceAll('abonnés visibles', 'visible followers')
      .replaceAll('publications visibles', 'visible posts')
      .replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, start, json, end) => {
        try {
          const schema = JSON.parse(json);
          if (schema && typeof schema === 'object') {
            if ('description' in schema) schema.description = copy[2];
            if (schema.mainEntity && typeof schema.mainEntity === 'object' && 'description' in schema.mainEntity) schema.mainEntity.description = copy[2];
          }
          return `${start}${JSON.stringify(schema)}${end}`;
        } catch {
          return `${start}${json}${end}`;
        }
      });
  }
  return output;
}

for (const [source, frRoute, enRoute] of sourceRoutes) {
  const html = await readFile(sourceFile(source), 'utf8');
  for (const [locale, route] of [['fr', frRoute], ['en', enRoute]]) {
    const destination = targetFile(locale, route);
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, localizedHtml(html, locale, route, enRoute));
  }
}

const sitemap = sourceRoutes.filter(([source]) => !['campaign-builder', 'selection', 'contact', 'privacy', 'terms', 'legal', 'case-studies'].includes(source)).map(([, frRoute, enRoute]) => {
  const frUrl = url(`/fr${frRoute === '/' ? '/' : frRoute}`.replace(/\/$/, '') || '/');
  const enUrl = url(`/en${enRoute === '/' ? '/' : enRoute}`.replace(/\/$/, '') || '/');
  return `  <url><loc>${frUrl}</loc><xhtml:link rel="alternate" hreflang="fr" href="${frUrl}"/><xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/><xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/></url>\n  <url><loc>${enUrl}</loc><xhtml:link rel="alternate" hreflang="fr" href="${frUrl}"/><xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/><xhtml:link rel="alternate" hreflang="x-default" href="${origin}/"/></url>`;
}).join('\n');
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemap}\n</urlset>\n`);
console.log(`Generated ${sourceRoutes.length * 2} localized static route shells and a bilingual sitemap.`);
