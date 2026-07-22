# Manifeste des assets V5

## Statuts média

Chaque média nominatif doit être classé selon une provenance claire :

- `creator_original` — fichier original fourni et autorisé par le créateur ;
- `licensed` — fichier licencié avec preuve de droit ;
- `generated_placeholder` — visuel généré destiné à la composition temporaire ;
- `public_evidence` — capture publique utilisée uniquement comme preuve ;
- `pending` — média non encore autorisé.

## `public/assets/brand/`

Assets communs Krew Media : deux sources vidéo du hero, leur poster et la photo réelle d’Adrien Cazanave fournie pour la page À propos.

`fieldwork/` contient quatre visualisations de campagne fournies et explicitement retenues par le propriétaire du projet le 22 juillet 2026 : réseau au port, tournage embarqué, équipement de navigation et cadrage de campagne. Elles sont utilisées ensemble dans une seule séquence éditoriale afin de conserver une présence IA limitée. Elles ne constituent ni une preuve de campagne réelle, ni le portrait officiel d’un créateur.

`world_map_true_transparent_2400x1200.png` est la carte mondiale équirectangulaire 2:1 fournie le 22 juillet 2026. Vite l’intègre comme asset versionné depuis la racine du projet. Elle sert uniquement de fond géographique au radar ; les repères, niveaux de précision et explications restent alimentés par `src/data/creators.ts`.

Le dossier historique `public/assets/editorial/` a été supprimé : aucun ancien décor généré par IA n’est expédié dans le site public.

## `public/assets/creators/`

- `pfp/*.png` : avatars publics fournis par le propriétaire du projet, utilisés pour les cartes, le radar, le ruban et les fiches créateur. Ils restent marqués `placeholder` dans le dataset tant que l'autorisation créateur n'est pas archivée.
- Les anciennes captures Instagram `.webp` ont été retirées du dossier public. Les preuves restent uniquement dans `evidence/`.
- Les fiches ne proposent aucun bouton vers le compte Instagram individuel ; l’agence conserve le contexte et le contact commercial.

Crops légers de transition. Ils permettent de reconnaître temporairement certains profils, mais doivent être remplacés par des fichiers HD originaux et autorisés avant lancement commercial.

## `evidence/source-proofs/`

Captures recadrées documentant handles, abonnés, publications et échantillons de vues. Ce dossier est interne et exclu de `dist`.

## `evidence/source-screenshots/`

Captures originales fournies au début du projet. Elles restent internes et ne doivent jamais être utilisées comme hero, carte publique ou social image.

## Paquet demandé à chaque créateur

- portrait carré HD, minimum 1 500 × 1 500 ;
- portrait vertical 4:5, minimum 2 000 × 2 500 ;
- deux visuels verticaux 9:16 ;
- deux visuels horizontaux 3:2 ou 16:9 ;
- une courte vidéo verticale sans texte incrusté ;
- bio publique validée ;
- statistiques récentes et période de mesure ;
- autorisation écrite d’utilisation par Krew Media.

## Traitement recommandé

- conserver les originaux hors du repo public ;
- exporter AVIF et WebP ;
- générer plusieurs largeurs responsives ;
- définir largeur, hauteur et point focal ;
- rédiger un alt descriptif ;
- conserver la preuve d’autorisation ;
- remplacer le placeholder sans modifier les composants.
