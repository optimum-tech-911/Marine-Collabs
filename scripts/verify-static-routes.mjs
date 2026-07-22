import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const routes = [
  '/', '/creators', '/solutions', '/for-brands', '/methodology', '/selection',
  '/campaign-builder', '/case-studies', '/about', '/join-the-network', '/contact',
  '/privacy', '/terms', '/legal',
];
const errors = [];

for (const route of routes) {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  try {
    await access(file);
    const html = await readFile(file, 'utf8');
    if (!html.includes('<link rel="canonical"')) errors.push(`${route}: canonical absent`);
    if (!html.includes('property="og:url"')) errors.push(`${route}: og:url absent`);
    if (!html.includes('name="robots"')) errors.push(`${route}: robots absent`);
    if (!html.includes('type="application/ld+json"')) errors.push(`${route}: JSON-LD absent`);
    const hreflangCount = (html.match(/hreflang="fr"/g) ?? []).length;
    if (hreflangCount !== 1) errors.push(`${route}: ${hreflangCount} hreflang français détecté(s)`);
    const canonicalCount = (html.match(/rel="canonical"/g) ?? []).length;
    if (canonicalCount !== 1) errors.push(`${route}: ${canonicalCount} canonical détecté(s)`);
    if (!html.includes('data-static-shell')) errors.push(`${route}: contenu statique de secours absent`);
    if (html.includes('/src/main.tsx')) errors.push(`${route}: source Vite non compilée`);
    if (html.includes('example.com') || html.includes('Nautic Creator Network')) errors.push(`${route}: ancienne donnée publique détectée`);
  } catch {
    errors.push(`${route}: fichier statique absent`);
  }
}

const notFound = path.join(dist, '404.html');
try {
  const html = await readFile(notFound, 'utf8');
  if (!html.includes('noindex, nofollow')) errors.push('/404.html: robots incorrect');
  if (!html.includes('data-static-shell')) errors.push('/404.html: shell statique absent');
} catch {
  errors.push('/404.html: fichier absent');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Static route verification passed for ${routes.length} routes plus 404.html.`);
