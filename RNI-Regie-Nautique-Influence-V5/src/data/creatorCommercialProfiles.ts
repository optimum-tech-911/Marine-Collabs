export type CampaignObjectiveId = 'awareness' | 'product-test' | 'destination' | 'education' | 'event';

export type CreatorStrength = {
  title: string;
  text: string;
};

export type CreatorCommercialProfile = {
  strengths: CreatorStrength[];
  recommendedObjectives: CampaignObjectiveId[];
  recommendedDeliverables: string[];
  relatedCreatorIds: string[];
  availabilityLabel: string;
  recommendationNote: string;
};

export const creatorCommercialProfiles: Record<string, CreatorCommercialProfile> = {
  'can-hicyilmaz': {
    strengths: [
      { title: 'Crédibilité hauturière', text: 'Un positionnement fondé sur la navigation longue distance et l’expérience réelle à bord.' },
      { title: 'Pédagogie technique', text: 'Un terrain naturel pour expliquer les équipements, les manœuvres et les usages en mer.' },
      { title: 'Récit de voyage', text: 'Une narration capable de relier un produit à une aventure suivie dans la durée.' },
      { title: 'Audience spécialisée', text: 'Une communauté déjà réunie autour de la voile, du bateau et de la vie au large.' },
    ],
    recommendedObjectives: ['awareness', 'product-test', 'education'],
    recommendedDeliverables: ['Reel d’intégration embarquée', 'Démonstration en conditions réelles', 'Série de stories pédagogiques', 'Récit de navigation sponsorisé'],
    relatedCreatorIds: ['sailing-nandji', 'sailing-magic-carpet', 'captain-redgi', 'les-topos-dun-boc'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Recommandation commerciale fondée sur le positionnement public du profil ; formats et disponibilité à confirmer avec le créateur.',
  },
  'sailing-nandji': {
    strengths: [
      { title: 'Vie à bord incarnée', text: 'Une présence humaine et familiale qui installe les produits dans un usage quotidien crédible.' },
      { title: 'Narration internationale', text: 'Un univers de circumnavigation adapté aux récits de destination et aux partenariats durables.' },
      { title: 'Contenu aspirationnel', text: 'Des images et histoires qui donnent envie de voyager sans perdre le lien avec la réalité du bateau.' },
      { title: 'Continuité éditoriale', text: 'Un contexte favorable aux campagnes en plusieurs épisodes plutôt qu’à une publication isolée.' },
    ],
    recommendedObjectives: ['awareness', 'destination'],
    recommendedDeliverables: ['Reel de destination', 'Journal de bord sponsorisé', 'Séquence stories en voyage', 'Intégration produit dans la vie à bord'],
    relatedCreatorIds: ['cyril-et-magalie', 'can-hicyilmaz', 'sailing-magic-carpet', 'meg-slmn'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Recommandation indicative fondée sur les contenus publics et la spécialisation affichée.',
  },
  'cyril-et-magalie': {
    strengths: [
      { title: 'Récit de couple', text: 'Une narration accessible qui permet d’intégrer naturellement une marque dans un changement de vie.' },
      { title: 'Univers catamaran', text: 'Un contexte particulièrement cohérent pour la croisière, le charter et l’équipement de vie à bord.' },
      { title: 'Expression francophone', text: 'Un profil utile pour adresser directement une audience française avec un ton personnel.' },
      { title: 'Contenu de destination', text: 'Des escales et paysages qui offrent une matière visuelle adaptée au tourisme maritime.' },
    ],
    recommendedObjectives: ['awareness', 'destination'],
    recommendedDeliverables: ['Reel de voyage', 'Carnet d’escale', 'Stories de vie à bord', 'Intégration équipement sur catamaran'],
    relatedCreatorIds: ['sailing-nandji', 'sailing-magic-carpet', 'la-liste-de-mathilde', 'antoine-fernandez'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Les livrables proposés sont des pistes de campagne, pas des engagements confirmés.',
  },
  'sailing-magic-carpet': {
    strengths: [
      { title: 'Qualité cinématographique', text: 'Un langage visuel fort pour les marques qui privilégient la valeur de production.' },
      { title: 'Savoir-faire artisanal', text: 'La construction et l’entretien du bateau donnent de la profondeur aux sujets techniques.' },
      { title: 'Duo créatif', text: 'Deux sensibilités complémentaires pour la narration, la musique, l’image et le geste.' },
      { title: 'Positionnement premium', text: 'Un univers adapté aux chantiers, équipements durables et campagnes de marque exigeantes.' },
    ],
    recommendedObjectives: ['awareness', 'product-test', 'education'],
    recommendedDeliverables: ['Film de marque court', 'Reportage photo', 'Intégration dans un projet de construction', 'Série documentaire sponsorisée'],
    relatedCreatorIds: ['can-hicyilmaz', 'sailing-nandji', 'les-topos-dun-boc', 'cyril-et-magalie'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'La production cinématographique et les droits doivent être cadrés précisément dans le brief.',
  },
  'meg-slmn': {
    strengths: [
      { title: 'Univers sous-marin distinctif', text: 'Une identité visuelle immédiatement reconnaissable autour de l’apnée et de la faune marine.' },
      { title: 'Ancrage polynésien', text: 'Un terrain naturel pour les destinations, la protection de l’océan et les expériences insulaires.' },
      { title: 'Immersion réelle', text: 'Des conditions de création qui donnent une crédibilité forte aux équipements et services liés à l’eau.' },
      { title: 'Sensibilité environnementale', text: 'Un contexte pertinent pour les messages de préservation, à condition de rester précis et documenté.' },
    ],
    recommendedObjectives: ['awareness', 'product-test', 'destination'],
    recommendedDeliverables: ['Reel sous-marin', 'Série photo en immersion', 'Contenu de destination', 'Test d’équipement aquatique'],
    relatedCreatorIds: ['antoine-fernandez', 'sailing-nandji', 'thomas-debierre', 'cyril-et-magalie'],
    availabilityLabel: 'Disponibilité et conditions de tournage à confirmer',
    recommendationNote: 'Les conditions météo, les autorisations locales et la sécurité doivent être intégrées au calendrier.',
  },
  'la-liste-de-mathilde': {
    strengths: [
      { title: 'Progression suivie', text: 'Un récit d’apprentissage qui rend les sujets techniques accessibles aux nouveaux pratiquants.' },
      { title: 'Proximité éditoriale', text: 'Un ton personnel adapté aux campagnes pédagogiques et aux retours d’expérience.' },
      { title: 'Public débutant', text: 'Un positionnement utile pour les écoles, formations, applications et équipements d’initiation.' },
      { title: 'Formats explicatifs', text: 'Une base cohérente pour les tutoriels, checklists et séquences de découverte.' },
    ],
    recommendedObjectives: ['education', 'product-test', 'awareness'],
    recommendedDeliverables: ['Tutoriel débutant', 'Journal d’apprentissage', 'Checklist sponsorisée', 'Test d’équipement d’initiation'],
    relatedCreatorIds: ['les-topos-dun-boc', 'antoine-fernandez', 'captain-redgi', 'cyril-et-magalie'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Le niveau technique et le scénario doivent rester cohérents avec l’expérience réelle du profil.',
  },
  'best-boat-deals': {
    strengths: [
      { title: 'Crédibilité transactionnelle', text: 'Un profil directement lié à la recherche, l’achat, la revente et la lecture du marché du bateau.' },
      { title: 'Performance documentée', text: 'Le dashboard fourni permet d’appuyer une partie de la visibilité récente sur une preuve datée.' },
      { title: 'Capacité d’explication', text: 'Un angle naturel pour décrypter une offre, un modèle, un équipement ou une tendance du marché.' },
      { title: 'Lien fondateur-agence', text: 'Le compte constitue une preuve de la capacité d’Adrien à créer de l’attention dans le nautisme.' },
    ],
    recommendedObjectives: ['awareness', 'product-test', 'education', 'event'],
    recommendedDeliverables: ['Présentation de bateau', 'Décryptage marché', 'Reel de visite', 'Couverture de salon nautique'],
    relatedCreatorIds: ['alessio-pandolfi-nautic', 'les-topos-dun-boc', 'can-hicyilmaz', 'captain-redgi'],
    availabilityLabel: 'Disponibilité coordonnée directement par l’agence',
    recommendationNote: 'Les données de vues documentées concernent une période précise et ne constituent pas une garantie future.',
  },
  'alessio-pandolfi-nautic': {
    strengths: [
      { title: 'Expertise locale', text: 'Un ancrage de proximité utile pour les acteurs du Bassin d’Arcachon et les sujets territoriaux.' },
      { title: 'Profil de niche', text: 'Une petite audience peut devenir pertinente lorsqu’elle correspond exactement au marché visé.' },
      { title: 'Transmission nautique', text: 'Un angle adapté aux contenus d’histoire locale, de découverte et d’explication.' },
      { title: 'Activation terrain', text: 'Un profil envisageable pour des événements, visites ou contenus produits sur place.' },
    ],
    recommendedObjectives: ['education', 'event', 'destination'],
    recommendedDeliverables: ['Visite locale', 'Capsule pédagogique', 'Couverture événementielle', 'Contenu patrimoine nautique'],
    relatedCreatorIds: ['best-boat-deals', 'les-topos-dun-boc', 'la-liste-de-mathilde', 'captain-redgi'],
    availabilityLabel: 'Disponibilité locale à confirmer',
    recommendationNote: 'La pertinence repose sur la précision géographique et éditoriale, pas sur le volume d’audience.',
  },
  'captain-redgi': {
    strengths: [
      { title: 'Capitaine en activité', text: 'Un terrain professionnel cohérent pour les services, la sécurité et les opérations à bord.' },
      { title: 'Convoyage et mobilité', text: 'Un contexte utile pour raconter la fiabilité, la préparation et le passage d’un bateau d’un port à l’autre.' },
      { title: 'Démonstration en situation', text: 'Une capacité naturelle à montrer un équipement dans son usage opérationnel.' },
      { title: 'Perspective de service', text: 'Un profil adapté aux entreprises qui vendent une expertise autant qu’un produit.' },
    ],
    recommendedObjectives: ['product-test', 'education', 'event'],
    recommendedDeliverables: ['Démonstration embarquée', 'Journal de convoyage', 'Tutoriel sécurité', 'Couverture de prise en main'],
    relatedCreatorIds: ['can-hicyilmaz', 'les-topos-dun-boc', 'best-boat-deals', 'la-liste-de-mathilde'],
    availabilityLabel: 'À coordonner selon les convoyages et missions',
    recommendationNote: 'Le calendrier doit tenir compte des missions réelles et des contraintes de navigation.',
  },
  'thomas-debierre': {
    strengths: [
      { title: 'Légitimité sportive', text: 'Un positionnement d’athlète qui donne du sens aux produits de performance et aux activations terrain.' },
      { title: 'Énergie visuelle', text: 'Le surf offre une matière forte pour les formats courts, l’action et les campagnes de destination.' },
      { title: 'Ancrage caribéen', text: 'Une présence pertinente pour les territoires, événements et marques actives dans les Caraïbes.' },
      { title: 'Audience de niche', text: 'Un profil à considérer pour sa cohérence sportive plutôt que pour la portée seule.' },
    ],
    recommendedObjectives: ['awareness', 'product-test', 'destination', 'event'],
    recommendedDeliverables: ['Reel d’action', 'Test produit sportif', 'Contenu de destination', 'Présence événementielle'],
    relatedCreatorIds: ['meg-slmn', 'antoine-fernandez', 'sailing-nandji', 'captain-redgi'],
    availabilityLabel: 'À confirmer selon entraînements et compétitions',
    recommendationNote: 'Le planning et les droits liés aux événements doivent être vérifiés avant engagement.',
  },
  'antoine-fernandez': {
    strengths: [
      { title: 'Polyvalence océanique', text: 'Un profil capable de relier voile, plongée, exploration et transmission.' },
      { title: 'Ton accessible', text: 'Une expression conversationnelle adaptée aux campagnes qui veulent expliquer sans surproduire.' },
      { title: 'Jeune communauté', text: 'Une piste pertinente pour les marques cherchant proximité, découverte et progression.' },
      { title: 'Formats hybrides', text: 'Un contexte favorable aux contenus mêlant expérience, tutoriel et récit personnel.' },
    ],
    recommendedObjectives: ['awareness', 'education', 'destination'],
    recommendedDeliverables: ['Reel d’exploration', 'Tutoriel accessible', 'Journal de bord', 'Contenu voile et plongée'],
    relatedCreatorIds: ['meg-slmn', 'la-liste-de-mathilde', 'cyril-et-magalie', 'thomas-debierre'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Les thématiques exactes doivent être choisies selon le terrain et l’expérience réellement disponibles.',
  },
  'les-topos-dun-boc': {
    strengths: [
      { title: 'Pédagogie structurée', text: 'Un positionnement naturel pour les sujets qui nécessitent méthode, explication et précision.' },
      { title: 'Culture du bateau', text: 'Un univers cohérent pour les équipements, l’entretien, la sécurité et les bonnes pratiques.' },
      { title: 'Formats utiles', text: 'Des contenus envisageables sous forme de tutoriels, guides, comparatifs ou démonstrations.' },
      { title: 'Crédibilité de niche', text: 'Une petite audience spécialisée peut soutenir des objectifs techniques ou de considération.' },
    ],
    recommendedObjectives: ['education', 'product-test'],
    recommendedDeliverables: ['Tutoriel nautique', 'Comparatif technique', 'Checklist pratique', 'Démonstration d’équipement'],
    relatedCreatorIds: ['la-liste-de-mathilde', 'can-hicyilmaz', 'captain-redgi', 'best-boat-deals'],
    availabilityLabel: 'Disponibilité à confirmer sur brief',
    recommendationNote: 'Les affirmations techniques doivent être relues et validées par la marque avant publication.',
  },
};

export function getCreatorCommercialProfile(slug: string) {
  return creatorCommercialProfiles[slug];
}
