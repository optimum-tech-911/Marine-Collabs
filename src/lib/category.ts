import type { CreatorCategory } from '../types';

const labels: Record<CreatorCategory, string> = {
  'Sailing & liveaboard': 'Voile & vie à bord',
  'Captains & delivery': 'Capitaines & convoyage',
  'Marine education': 'Pédagogie nautique',
  'Diving & underwater': 'Plongée & océan',
  'Surf & watersports': 'Surf & sports nautiques',
  'Boat buying & media': 'Achat bateau & média',
};
export const categoryFr = (category: CreatorCategory) => labels[category] ?? category;
