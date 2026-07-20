# Rapport qualité V4

## Périmètre de la refonte

La V4 consolide l’identité RNI, la hiérarchie éditoriale, les textes français, le roster, les profils media-kits, les parcours de conversion et la documentation du projet.

## Contrôles automatisés

La commande suivante doit réussir avant livraison :

```bash
npm run validate
```

Elle vérifie :

- TypeScript strict
- Build Vite de production
- Présence des fichiers essentiels
- Absence de `example.com` dans les fichiers publics critiques
- Absence de l’ancienne identité NCN dans les métadonnées publiques
- Présence des 12 créateurs dans le dataset
- Absence des preuves Instagram dans le dossier public
- Absence d’assets publics individuels supérieurs à 2,5 Mo

## Installation propre

Une copie fraîche sans `node_modules` ni `dist` a été installée avec `npm ci`, puis validée avec `npm run validate`. L’audit des dépendances de production a retourné zéro vulnérabilité.

## Routes contrôlées

- `/`
- `/creators`
- `/creators/meg-slmn`
- `/creators/best-boat-deals`
- `/for-brands`
- `/solutions`
- `/about`
- `/campaign-builder`
- `/contact`
- `/join-the-network`

## Limitation de validation visuelle

Le build et les réponses HTTP ont été validés. La tentative d’automatisation Chromium dans l’environnement de travail n’a pas produit un passage visuel fiable en raison des limitations du navigateur conteneurisé. Une dernière inspection manuelle dans Chrome reste recommandée avant publication.

## Éléments encore nécessaires avant lancement commercial

- Médias réels et autorisés pour les 12 créateurs
- Vérification des noms publics et biographies
- Creator Insights standardisés
- URL de réservation définitive
- Formulaires reliés à un backend ou CRM
- Entité juridique et documents légaux finalisés
- Autorisation des logos, témoignages et cas clients
