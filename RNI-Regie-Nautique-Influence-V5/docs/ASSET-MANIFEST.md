# Manifeste des assets V5

## Statuts média

Chaque média nominatif doit être classé selon une provenance claire :

- `creator_original` — fichier original fourni et autorisé par le créateur ;
- `licensed` — fichier licencié avec preuve de droit ;
- `generated_placeholder` — visuel généré destiné à la composition temporaire ;
- `public_evidence` — capture publique utilisée uniquement comme preuve ;
- `pending` — média non encore autorisé.

## `public/assets/editorial/`

Images générées et optimisées servant de placeholders éditoriaux, de décors de catégories et de supports de mise en page. Elles ne représentent pas officiellement les créateurs.

Le sous-dossier `gallery/` contient les variantes utilisées dans les galeries, arrière-plans et médias secondaires.

## `public/assets/creators/`

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
- autorisation écrite d’utilisation par Régie Nautique.

## Traitement recommandé

- conserver les originaux hors du repo public ;
- exporter AVIF et WebP ;
- générer plusieurs largeurs responsives ;
- définir largeur, hauteur et point focal ;
- rédiger un alt descriptif ;
- conserver la preuve d’autorisation ;
- remplacer le placeholder sans modifier les composants.
