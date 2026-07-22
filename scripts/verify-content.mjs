import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
const notes = [];
const fail = (message) => errors.push(message);
const note = (message) => notes.push(message);
const read = (file) => readFileSync(join(root, file), 'utf8');

const creatorSource = read('src/data/creators.ts');
const blocks = creatorSource.split(/\n  \{\n/).slice(1);
const extract = (block, pattern, fallback = '') => block.match(pattern)?.[1] ?? fallback;
const creators = blocks.map((block) => ({
  slug: extract(block, /(?:^|\n)    slug: '([^']+)'/),
  handle: extract(block, /(?:^|\n)    handle: '([^']+)'/),
  displayName: extract(block, /(?:^|\n)    displayName: '([^']+)'/),
  followers: Number(extract(block, /(?:^|\n)    followers: (\d+)/, '0')),
  posts: Number(extract(block, /(?:^|\n)    posts: (\d+)/, '0')),
  low: Number(extract(block, /viewEstimate:\s*\{[\s\S]*?low: (\d+)/, '0')),
  high: Number(extract(block, /viewEstimate:\s*\{[\s\S]*?high: (\d+)/, '0')),
  evidence: extract(block, /viewEstimate:\s*\{[\s\S]*?evidence: '([^']+)'/),
  mediaApproval: extract(block, /(?:^|\n)    mediaApproval: '([^']+)'/),
  image: extract(block, /(?:^|\n)    image: '([^']+)'/),
  formats: extract(block, /(?:^|\n)    contentFormats: \[([^\]]+)\]/),
  brandFit: extract(block, /(?:^|\n)    brandFit: \[([^\]]+)\]/),
  languages: extract(block, /(?:^|\n)    languages: \[([^\]]+)\]/),
  regions: extract(block, /(?:^|\n)    operatingRegions: \[([^\]]+)\]/),
  locationLabel: extract(block, /mapLocation:\s*\{[\s\S]*?label: '([^']+)'/),
  latitude: Number(extract(block, /mapLocation:\s*\{[\s\S]*?latitude: (-?\d+(?:\.\d+)?)/, '999')),
  longitude: Number(extract(block, /mapLocation:\s*\{[\s\S]*?longitude: (-?\d+(?:\.\d+)?)/, '999')),
  locationZone: extract(block, /mapLocation:\s*\{[\s\S]*?zone: '([^']+)'/),
  locationPrecision: extract(block, /mapLocation:\s*\{[\s\S]*?precision: '([^']+)'/),
  locationEvidence: extract(block, /mapLocation:\s*\{[\s\S]*?evidence: '([^']+)'/),
  locationNote: extract(block, /mapLocation:\s*\{[\s\S]*?note: '([^']+)'/),
})).filter((creator) => creator.slug);

if (creators.length !== 12) fail(`12 créateurs attendus, ${creators.length} détectés.`);
for (const creator of creators) {
  if (!creator.handle.startsWith('@')) fail(`${creator.slug}: handle invalide.`);
  if (creator.followers < 0 || creator.posts < 0) fail(`${creator.slug}: métrique négative.`);
  if (creator.low <= 0 || creator.high <= 0 || creator.low > creator.high) fail(`${creator.slug}: fourchette de vues invalide (${creator.low}–${creator.high}).`);
  if (!['verified', 'visible-sample', 'estimated'].includes(creator.evidence)) fail(`${creator.slug}: evidence inconnue.`);
  if (!['approved', 'placeholder', 'pending'].includes(creator.mediaApproval)) fail(`${creator.slug}: mediaApproval absent ou invalide.`);
  if (!creator.formats || !creator.brandFit || !creator.languages || !creator.regions) fail(`${creator.slug}: informations commerciales incomplètes.`);
  if (!creator.locationLabel || !creator.locationNote) fail(`${creator.slug}: localisation cartographique non documentée.`);
  if (creator.latitude < -90 || creator.latitude > 90 || creator.longitude < -180 || creator.longitude > 180) fail(`${creator.slug}: coordonnées cartographiques invalides.`);
  if (!['europe', 'caribbean', 'pacific', 'international'].includes(creator.locationZone)) fail(`${creator.slug}: zone cartographique invalide.`);
  if (!['place', 'region', 'route', 'global'].includes(creator.locationPrecision)) fail(`${creator.slug}: précision cartographique invalide.`);
  if (!['profile-explicit', 'content-visible', 'roster-region'].includes(creator.locationEvidence)) fail(`${creator.slug}: preuve de localisation invalide.`);
  if (!existsSync(join(root, 'public', creator.image))) fail(`${creator.slug}: image publique absente.`);
}
const unique = (values) => new Set(values).size === values.length;
if (!unique(creators.map((creator) => creator.slug))) fail('Slug créateur dupliqué.');
if (!unique(creators.map((creator) => creator.handle.toLowerCase()))) fail('Handle créateur dupliqué.');
note('Identités, métriques, provenance média et localisation graduée contrôlées pour 12 créateurs.');

if (existsSync(join(root, 'public/assets/editorial'))) fail('Le dossier historique de placeholders éditoriaux IA doit rester absent.');
const approvedFieldwork = ['network-at-marina.jpg', 'creator-filming-onboard.jpg', 'navigation-equipment.jpg', 'campaign-conversation.jpg'];
for (const asset of approvedFieldwork) {
  if (!existsSync(join(root, 'public/assets/brand/fieldwork', asset))) fail(`Visualisation fieldwork absente : ${asset}`);
}
note('Les quatre visualisations fieldwork fournies sont présentes et l’ancien dossier IA reste absent.');
if (!existsSync(join(root, 'world_map_true_transparent_2400x1200.png'))) fail('La carte mondiale équirectangulaire fournie est absente.');
if (read('src/pages/CreatorDetailPage.tsx').includes('creator.platforms[0]?.url')) fail('Une fiche créateur expose encore un CTA direct vers un réseau social.');
note('La vraie carte mondiale est intégrée et les fiches ne proposent aucun CTA sortant vers Instagram.');

const founder = read('src/data/founder.ts');
for (const status of ['founder-provided', 'publicly-visible', 'verified-evidence']) {
  if (!founder.includes(`status: '${status}'`)) fail(`Statut fondateur absent : ${status}`);
}
if (!founder.includes('2,6 M vues sur 30 jours')) fail('Preuve fondatrice 2,6 M absente.');
note('Claims fondateur séparés par niveau de preuve.');

const srcFiles = [
  'src/pages/HomePage.tsx', 'src/pages/CreatorsPage.tsx', 'src/pages/CreatorDetailPage.tsx',
  'src/pages/ForBrandsPage.tsx', 'src/pages/SolutionsPage.tsx', 'src/pages/AboutPage.tsx',
  'src/pages/ContactPage.tsx', 'src/pages/CampaignBuilderPage.tsx', 'src/components/Header.tsx',
  'src/components/Footer.tsx',
];
const joined = srcFiles.map(read).join('\n');
for (const token of ['TODO', 'FIXME', 'example.com', 'Nautic Creator Network']) {
  if (joined.includes(token)) fail(`Contenu interdit restant dans les sources critiques : ${token}`);
}
if (joined.includes('to="#"')) fail('Un lien React Router pointe encore vers #.');
if (joined.includes('console.log(')) fail('Un console.log reste dans les sources critiques.');
note('Sources critiques contrôlées contre les placeholders techniques et anciennes identités.');

if (errors.length) {
  console.error('\nÉchec de la vérification de contenu :');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log('\nVérification de contenu réussie :');
notes.forEach((item) => console.log(`- ${item}`));
