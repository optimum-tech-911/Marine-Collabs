export type FounderClaimStatus = 'founder-provided' | 'publicly-visible' | 'verified-evidence';

export type FounderClaim = {
  label: string;
  value: string;
  status: FounderClaimStatus;
  note: string;
};

export const founderProfile = {
  name: 'Adrien Cazanave',
  role: 'Marin professionnel et fondateur',
  handle: '@best_boat_deals',
  eyebrow: 'LE FONDATEUR',
  title: 'Adrien, marin professionnel et fondateur.',
  biography: 'Douze ans dans le nautisme. Yachtmaster Ocean. Plusieurs transatlantiques. Vingt-huit bateaux achetés et revendus. Adrien ne parle pas du nautisme de l’extérieur : il en vit.',
  proofTitle: 'La preuve par son propre compte.',
  proofText: 'En documentant ses aventures et son expertise sur @best_boat_deals, Adrien a réuni près de 40 000 abonnés en quatre mois et dépassé 2,5 millions de vues sur 30 jours.',
  salesLine: 'Ce qu’il a fait pour ses propres bateaux, Marine Collabs le fait pour votre marque.',
  claims: [
    { label: 'Expérience', value: '12 ans dans le nautisme', status: 'founder-provided', note: 'Déclaration du fondateur à documenter dans le dossier commercial.' },
    { label: 'Qualification', value: 'Yachtmaster Ocean', status: 'founder-provided', note: 'Qualification déclarée par le fondateur ; conserver le justificatif avant publication définitive.' },
    { label: 'Navigation', value: 'Plusieurs transatlantiques', status: 'founder-provided', note: 'Expérience déclarée par le fondateur.' },
    { label: 'Transactions', value: '28 bateaux achetés et revendus', status: 'founder-provided', note: 'Chiffre fourni par le fondateur.' },
    { label: 'Audience', value: '39,1 K abonnés visibles', status: 'publicly-visible', note: 'Valeur visible sur la capture Instagram du 15 juillet 2026.' },
    { label: 'Visibilité', value: '2,6 M vues sur 30 jours', status: 'verified-evidence', note: 'Valeur visible sur le tableau de bord professionnel fourni.' },
  ] satisfies FounderClaim[],
} as const;
