import { brand } from '../config/brand';
import { useShortlist } from '../context/ShortlistContext';

export function useContactUrls() {
  const { shortlist } = useShortlist();
  const names = shortlist.map((creator) => creator.displayName);
  const selection = names.length ? `\n\nCréateurs sélectionnés : ${names.join(', ')}.` : '';
  const body = `Bonjour Adrien,\n\nJe souhaite échanger au sujet d’une campagne nautique.${selection}\n`;

  return {
    phoneUrl: brand.phoneUrl,
    whatsappUrl: `${brand.whatsappUrl.split('?')[0]}?text=${encodeURIComponent(body)}`,
    emailUrl: `mailto:${brand.email}?subject=${encodeURIComponent(names.length ? 'Projet de campagne · sélection de créateurs' : 'Projet de campagne nautique')}&body=${encodeURIComponent(body)}`,
    selectionCount: names.length,
  };
}
