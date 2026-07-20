import { creators } from './creators';

export const networkMetrics = {
  creatorCount: creators.length,
  combinedFollowers: creators.reduce((sum, creator) => sum + creator.followers, 0),
  combinedPosts: creators.reduce((sum, creator) => sum + creator.posts, 0),
  estimatedMonthlyViewsLow: creators.reduce((sum, creator) => sum + creator.viewEstimate.low, 0),
  estimatedMonthlyViewsHigh: creators.reduce((sum, creator) => sum + creator.viewEstimate.high, 0),
  verifiedMonthlyViews: creators
    .filter((creator) => creator.viewEstimate.evidence === 'verified')
    .reduce((sum, creator) => sum + creator.viewEstimate.low, 0),
  categoryCount: new Set(creators.flatMap((creator) => creator.categories)).size,
  capturedAt: '2026-07-15',
} as const;

export const campaignFormats = [
  { title: 'Notoriété de marque', description: 'Un récit multi-créateurs qui inscrit la marque dans un contexte maritime crédible.' },
  { title: 'Lancement de produit', description: 'Un lancement coordonné entre créateurs, marchés et formats de contenu sélectionnés.' },
  { title: 'Test technique', description: 'Des démonstrations en conditions réelles par des capitaines, moniteurs, marins et utilisateurs spécialistes.' },
  { title: 'Production de contenu', description: 'Photographies et vidéos produites par les créateurs avec des droits adaptés aux canaux de la marque.' },
  { title: 'Programme ambassadeur', description: 'Des partenariats durables fondés sur la confiance, la répétition et la légitimité dans la catégorie.' },
  { title: 'Activation événementielle', description: 'Salons nautiques, marinas, courses, lancements de destination et couverture en conditions réelles.' },
] as const;

export const brandSectors = [
  'Constructeurs de bateaux',
  'Électronique marine',
  'Équipement et sécurité',
  'Marinas et location',
  'Destinations touristiques',
  'Plongée et sports nautiques',
  'Assurance et financement',
  'Outdoor et textile',
] as const;
