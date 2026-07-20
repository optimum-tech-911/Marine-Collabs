const gallery = (names: string[]) => names.map((name) => `/assets/editorial/gallery/${name}.webp`);

export const editorialMediaByCreator: Record<string, string[]> = {
  'can-hicyilmaz': gallery(['sunset-sailing','deck-rope','yacht-deck','sun-deck','sunset-portrait','windy-sailing']),
  'sailing-nandji': gallery(['deck-relax','catamaran-couple','helm-smile','life-aboard','turquoise-helm','couple-sunset']),
  'cyril-et-magalie': gallery(['catamaran-couple','couple-sunset','deck-relax','turquoise-helm','life-aboard','sailing-smile']),
  'sailing-magic-carpet': gallery(['wooden-boat-work','boat-work-duo','sunset-deck-work','marina-reflection','life-aboard','sun-deck']),
  'meg-slmn': gallery(['underwater-turtle','manta-dive','underwater-reef','turquoise-helm','sailing-smile','deck-relax']),
  'la-liste-de-mathilde': gallery(['sailing-smile','helm-smile','deck-rope','windy-sailing','sunset-sailing','marina-portrait']),
  'best-boat-deals': gallery(['yacht-deck','marina-reflection','harbor-man','marina-portrait','young-marina','sun-deck']),
  'alessio-pandolfi-nautic': gallery(['young-marina','marina-reflection','harbor-man','marina-portrait','sun-deck','life-aboard']),
  'captain-redgi': gallery(['windy-sailing','turquoise-helm','helm-smile','deck-rope','sunset-sailing','sunset-portrait']),
  'thomas-debierre': gallery(['surfer-beach','surfer-sunset','surf-coast','sunset-silhouette','underwater-reef','sunset-portrait']),
  'antoine-fernandez': gallery(['underwater-reef','sunset-silhouette','manta-dive','surf-coast','turquoise-helm','sunset-portrait']),
  'les-topos-dun-boc': gallery(['deck-rope','sun-deck','boat-work-duo','windy-sailing','marina-reflection','wooden-boat-work']),
};

export function getEditorialMedia(slug: string, hero: string) {
  return [hero, ...(editorialMediaByCreator[slug] ?? [])].filter((item, index, items) => items.indexOf(item) === index);
}
