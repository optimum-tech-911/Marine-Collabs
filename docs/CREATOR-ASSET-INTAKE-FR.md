# Demande standard de médias et données créateur

Ce document sert de modèle à envoyer à chacun des 12 créateurs avant publication commerciale.

## Message proposé

Bonjour,

Régie Nautique prépare votre profil professionnel destiné aux marques du secteur maritime. Pour représenter votre travail correctement et éviter l’utilisation de captures ou d’images provisoires, merci de nous transmettre les éléments suivants.

### Identité publique

- nom public à afficher
- handle exact par plateforme
- courte biographie validée, 300 à 500 caractères
- spécialités principales
- langues de création
- zones où vous opérez réellement
- lien de contact privé pour l’agence uniquement

### Médias approuvés

- 1 portrait principal vertical, minimum 2000 × 2500 px
- 2 images verticales, minimum 1600 × 2000 px
- 2 images horizontales, minimum 2400 × 1600 px
- 1 portrait carré, minimum 1200 × 1200 px
- 2 à 4 vidéos verticales courtes sans texte incrusté
- logo ou signature visuelle, facultatif

Pour chaque fichier, préciser :

- auteur ou photographe
- autorisation d’affichage sur le site RNI
- possibilité de recadrage
- durée et territoire d’autorisation
- crédit obligatoire
- restrictions éventuelles

### Statistiques comparables

Fournir des captures ou exports couvrant la même période :

- 30 derniers jours
- 90 derniers jours, si disponible
- abonnés actuels
- portée
- vues
- interactions
- moyenne et médiane des Reels ou vidéos
- portée moyenne des stories
- top pays
- tranches d’âge
- répartition par genre, uniquement si pertinente et disponible

Les captures doivent montrer la plateforme, le compte, la période et la date de consultation.

### Formats et collaborations

- formats que vous acceptez
- secteurs que vous connaissez réellement
- délais habituels
- présence événementielle possible
- voyage ou déplacement possible
- UGC sans publication possible ou non
- paid media possible ou non
- droits d’utilisation possibles
- catégories incompatibles ou exclusives
- collaborations antérieures publiables avec autorisation

## Nommage des fichiers

```text
slug-createur_portrait-principal_auteur_2026-07.jpg
slug-createur_vertical-01_auteur_2026-07.jpg
slug-createur_horizontal-01_auteur_2026-07.jpg
slug-createur_video-verticale-01_2026-07.mp4
slug-createur_insights-instagram_30j_2026-07.png
```

## Intégration dans le projet

1. stocker les originaux hors du dépôt public
2. archiver l’autorisation
3. générer AVIF et WebP
4. ajouter le média dans `public/assets/editorial/`
5. mettre `mediaApproval: 'approved'`
6. mettre à jour `src/data/editorialMedia.ts`
7. renseigner crédit et alt text
8. exécuter `npm run validate`
