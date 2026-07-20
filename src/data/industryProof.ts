export type IndustryProof = {
  id: string;
  value: string;
  text: string;
  source: string;
  year: string;
  url: string;
  note?: string;
  featured?: boolean;
};

export const industryProof: IndustryProof[] = [
  {
    id: 'nielsen-word-of-mouth',
    value: '88 %',
    text: 'des personnes interrogées dans le monde font davantage confiance aux recommandations de personnes qu’elles connaissent qu’à n’importe quel autre canal publicitaire.',
    source: 'Nielsen — Trust in Advertising',
    year: '2021',
    url: 'https://www.nielsen.com/fr/insights/2021/beyond-martech-building-trust-with-consumers-and-engaging-where-sentiment-is-high/',
    note: 'Ce chiffre mesure la confiance dans les recommandations de personnes connues. Il illustre la force de la recommandation humaine, mais ne doit pas être présenté comme une mesure spécifique aux créateurs.',
    featured: true,
  },
  {
    id: 'edelman-creator-trust',
    value: '60 %',
    text: 'des consommateurs font davantage confiance à ce qu’un créateur dit d’une marque qu’à ce que la marque dit d’elle-même.',
    source: 'Edelman — Creators at the Helm',
    year: '2025',
    url: 'https://www.edelman.com/index.php/ja/node/16816',
  },
  {
    id: 'reech-purchase',
    value: '3 sur 4',
    text: 'Français ont déjà acheté un produit à la suite d’un partenariat réalisé par un créateur de contenu.',
    source: 'Reech — Les consommateurs et les créateurs de contenu',
    year: '2025',
    url: 'https://www.reech.com/marketing-influence-etude-reech-2025',
  },
  {
    id: 'arpp-investment',
    value: '587 M€',
    text: 'investis en marketing d’influence en France en 2025.',
    source: 'ARPP × France Pub',
    year: '2026',
    url: 'https://www.arpp.org/actualite/le-marketing-influence-confirme-sa-montee-en-puissance-arpp-publie-la-2eme-edition-etude-avec-france-pub/',
    note: 'La même étude indique que 65 % des annonceurs nationaux utilisant l’influence font appel à une agence ou à un intermédiaire.',
  },
];
