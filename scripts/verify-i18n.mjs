import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
const read = (file) => readFileSync(join(root, file), 'utf8');
const routes = read('src/i18n/routes.ts');
const resolver = read('src/i18n/locale-resolution.ts');
const middleware = read('functions/_middleware.ts');
for (const route of ['/fr/', '/en/', '/fr/createurs', '/en/creators', '/fr/pour-les-marques', '/en/for-brands', '/fr/creer-une-campagne', '/en/build-a-campaign']) {
  if (!routes.includes(route.replace(/^\/(fr|en)/, ''))) errors.push(`Route mapping missing for ${route}`);
}
for (const token of ['savedLocale', 'acceptLanguage', 'country', 'frenchFirst']) if (!resolver.includes(token)) errors.push(`Locale resolver is missing ${token}.`);
if (!middleware.includes('Response.redirect') || !middleware.includes('302')) errors.push('Cloudflare root locale redirect must remain temporary.');
for (const file of ['dist/fr/index.html', 'dist/en/index.html', 'dist/fr/createurs/index.html', 'dist/en/creators/index.html']) {
  if (existsSync(join(root, file))) {
    const html = read(file);
    for (const requirement of ['rel="canonical"', 'hreflang="fr"', 'hreflang="en"', 'hreflang="x-default"']) if (!html.includes(requirement)) errors.push(`${file} missing ${requirement}.`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('Locale routing, priority, Cloudflare handler and bilingual static SEO checks passed.');
