import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const failures = [];
const notes = [];
const fail = (message) => failures.push(message);
const note = (message) => notes.push(message);
const read = (file) => readFileSync(join(root, file), 'utf8');

const required = [
  'src/config/brand.ts',
  'src/data/creators.ts',
  'src/data/siteCopy.ts',
  'src/data/industryProof.ts',
  'src/data/founder.ts',
  'src/data/creatorCommercialProfiles.ts',
  'src/lib/analytics.ts',
  'src/pages/HomePage.tsx',
  'src/pages/CreatorsPage.tsx',
  'src/pages/CreatorDetailPage.tsx',
  'src/pages/SelectionPage.tsx',
  'src/pages/MethodologyPage.tsx',
  'scripts/generate-static-routes.mjs',
  'public/sitemap.xml',
  'public/robots.txt',
  'public/llms.txt',
  'public/.well-known/security.txt',
  'public/_headers',
  'public/_redirects',
  'public/icon-192.png',
  'public/icon-512.png',
  'public/apple-touch-icon.png',
  'docs/V5-QUALITY-REPORT.md',
  'docs/CREATOR-ASSET-INTAKE-FR.md',
  'docs/DATA-UPDATE-RUNBOOK.md',
  'docs/QA-MATRIX.md',
  'docs/ARCHITECTURE.md',
  'docs/ROADMAP.md',
  'docs/LAUNCH-CHECKLIST.md',
  'docs/ASSET-MANIFEST.md',
  'evidence/source-proofs',
];
required.forEach((file) => { if (!existsSync(join(root, file))) fail(`Fichier requis manquant : ${file}`); });

for (const file of ['index.html', 'public/site.webmanifest', 'public/sitemap.xml', 'public/robots.txt', 'public/llms.txt']) {
  const content = read(file);
  if (content.includes('example.com')) fail(`${file} contient encore example.com`);
  if (content.includes('Nautic Creator Network')) fail(`${file} contient encore l’ancienne identité`);
}

if (existsSync(join(root, 'public/assets/source-proofs'))) {
  fail('Les preuves Instagram sont encore présentes dans public/assets/source-proofs.');
} else {
  note('Les preuves Instagram restent hors du dossier public.');
}

const creatorSource = read('src/data/creators.ts');
const blocks = creatorSource.split(/\n  \{\n/).slice(1);
if (blocks.length !== 12) fail(`Le dataset contient ${blocks.length} objets créateurs au lieu de 12.`);

const creators = blocks.map((block) => {
  const value = (pattern) => block.match(pattern)?.[1];
  return {
    id: value(/(?:^|\n)    id: '([^']+)'/),
    slug: value(/(?:^|\n)    slug: '([^']+)'/),
    displayName: value(/(?:^|\n)    displayName: '([^']+)'/),
    followers: Number(value(/(?:^|\n)    followers: (\d+)/) ?? 0),
    posts: Number(value(/(?:^|\n)    posts: (\d+)/) ?? 0),
    image: value(/(?:^|\n)    image: '([^']+)'/),
    sourceProof: value(/(?:^|\n)    sourceProof: '([^']+)'/),
    sourceCapturedAt: value(/(?:^|\n)    sourceCapturedAt: ([^,]+),/),
    mediaApproval: value(/(?:^|\n)    mediaApproval: '([^']+)'/),
    platformUrl: value(/url: '([^']+)'/),
    schemaType: value(/(?:^|\n)    schemaType: '([^']+)'/),
  };
});

const unique = (values) => new Set(values).size === values.length;
if (!unique(creators.map((item) => item.id))) fail('Des identifiants créateur sont dupliqués.');
if (!unique(creators.map((item) => item.slug))) fail('Des slugs créateur sont dupliqués.');
if (creators.some((item) => !item.displayName || !item.slug || !item.id)) fail('Un créateur ne possède pas tous ses champs d’identité obligatoires.');
if (creators.some((item) => !item.platformUrl?.startsWith('https://'))) fail('Un lien de plateforme créateur n’utilise pas HTTPS.');
if (creators.some((item) => !item.image?.startsWith('/assets/'))) fail('Un créateur référence une image hors de /assets/.');
if (creators.some((item) => !['approved', 'placeholder', 'pending'].includes(item.mediaApproval))) fail('Un créateur ne possède pas de statut média valide.');
if (creators.some((item) => !['Person', 'Organization'].includes(item.schemaType))) fail('Un créateur ne possède pas de type Schema.org valide.');

for (const creator of creators) {
  if (!creator.sourceProof || !existsSync(join(root, creator.sourceProof))) fail(`Preuve absente pour ${creator.slug ?? 'créateur inconnu'} : ${creator.sourceProof ?? 'champ vide'}`);
  if (creator.image && !existsSync(join(root, 'public', creator.image))) fail(`Image publique absente pour ${creator.slug}: public${creator.image}`);
}

const combinedFollowers = creators.reduce((sum, item) => sum + item.followers, 0);
const combinedPosts = creators.reduce((sum, item) => sum + item.posts, 0);
if (combinedFollowers !== 434623) fail(`Total abonnés inattendu : ${combinedFollowers} au lieu de 434623.`);
if (combinedPosts !== 9684) fail(`Total publications inattendu : ${combinedPosts} au lieu de 9684.`);
note(`${creators.length} créateurs, ${combinedFollowers} abonnés cumulés et ${combinedPosts} publications contrôlés.`);


const packageJson = JSON.parse(read('package.json'));
if (!packageJson.engines?.node?.includes('22')) fail('package.json ne documente pas Node 22.');
for (const [name, version] of Object.entries({ ...packageJson.dependencies, ...packageJson.devDependencies })) {
  if (typeof version === 'string' && /^[~^]/.test(version)) fail(`Dépendance non épinglée : ${name}@${version}`);
}
if (!read('README.md').includes('V5')) fail('README.md ne décrit pas la V5.');
if (!read('public/_headers').includes('Content-Security-Policy')) fail('La CSP Cloudflare est absente.');
if (read('src/components/Footer.tsx').includes('https://www.instagram.com/')) fail('Le footer contient encore un lien Instagram générique.');
note('Runtime, versions épinglées, CSP et documentation V5 contrôlés.');

const redirects = read('public/_redirects');
for (const alias of [
  '/createurs /creators 301',
  '/pour-les-marques /for-brands 301',
  '/creer-une-campagne /campaign-builder 301',
  '/cas-clients /case-studies 301',
  '/a-propos /about 301',
  '/rejoindre-le-reseau /join-the-network 301',
  '/methodologie /methodology 301',
]) {
  if (!redirects.includes(alias)) fail(`Redirection française absente : ${alias}`);
}
if (!redirects.trim().endsWith('/* /index.html 200')) fail('Le fallback SPA Cloudflare doit rester la dernière redirection.');
note('Aliases français et fallback Cloudflare contrôlés.');

const commercialSource = read('src/data/creatorCommercialProfiles.ts');
const commercialSlugs = [...commercialSource.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
if (commercialSlugs.length !== 12) fail(`Le cadrage commercial contient ${commercialSlugs.length} profils au lieu de 12.`);
if (!unique(commercialSlugs)) fail('Des profils commerciaux sont dupliqués.');
for (const creator of creators) {
  if (!commercialSlugs.includes(creator.slug)) fail(`Cadrage commercial absent pour ${creator.slug}.`);
}
note('Forces, objectifs, livrables et profils associés contrôlés pour les 12 créateurs.');

const industryProof = read('src/data/industryProof.ts');
for (const domain of ['nielsen.com', 'edelman.com', 'reech.com', 'arpp.org']) {
  if (!industryProof.includes(domain)) fail(`Source sectorielle absente : ${domain}`);
}
if (industryProof.includes('5,20 $') || industryProof.includes('$5.20')) fail('Le claim ROI 5,20 $ non validé est encore présent.');
note('Les quatre études sectorielles utilisent des sources identifiables.');

const publicFiles = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stats = statSync(full);
    if (stats.isDirectory()) walk(full);
    else publicFiles.push(full);
  }
}
walk(join(root, 'public'));
const oversized = publicFiles.filter((file) => statSync(file).size > 2_500_000);
if (oversized.length) fail(`Assets publics supérieurs à 2,5 Mo : ${oversized.map((file) => relative(root, file)).join(', ')}`);
else note('Aucun asset public individuel ne dépasse 2,5 Mo.');

const publicText = publicFiles
  .filter((file) => /\.(html|xml|txt|json|js|css|svg)$/i.test(file))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
if (publicText.includes('source-proofs/')) fail('Une référence aux preuves internes existe encore dans les fichiers publics.');

if (failures.length) {
  console.error('\nÉchec de la vérification projet :');
  failures.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log('\nVérification projet réussie :');
notes.forEach((message) => console.log(`- ${message}`));
