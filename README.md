# Marine Collabs · V5

Base frontend française premium pour Marine Collabs, une agence d’influence spécialisée dans le nautisme et les univers maritimes.

La V5 est une base produit complète, pas une simple landing page : réseau de 12 créateurs, profils media-kits, comparaison de casting, recommandation guidée, brief de campagne persistant, formulaires préparant des emails, méthodologie des métriques, preuves sectorielles sourcées, pages commerciales et sortie statique adaptée à Cloudflare Pages.

## Environnement validé

- Node.js `22.16.0`
- npm `10.9.2`
- React `19.2.7`
- TypeScript `7.0.2`
- Vite `8.1.4`

Les versions sont épinglées dans `package.json` et `package-lock.json`.

```bash
nvm use
npm ci
npm run doctor
npm run dev
```

Validation complète avant livraison :

```bash
npm run validate
```

Cette commande exécute :

1. TypeScript strict
2. Build de production
3. Génération de 26 shells statiques avec métadonnées dédiées
4. Contrôle du dataset et des preuves
5. Contrôle des assets et des claims
6. Vérification des routes statiques
7. Démarrage d’un serveur preview et contrôle HTTP des 27 routes livrées

## Expériences incluses

### Acquisition et conversion

- Accueil français orienté décision : problème, manifeste, méthode, réseau, études, fondateur et rendez-vous
- Page Pour les marques avec preuves, fondateur, FAQ et qualification du brief
- Page Solutions organisée par objectif de campagne
- Prise de rendez-vous configurable depuis `src/config/brand.ts`
- Formulaires statiques préparant un email contextualisé
- Événements de conversion exposés à un futur `dataLayer`, sans tracker installé par défaut

### Réseau et media-kits

- Roster de 12 créateurs
- Recherche textuelle et filtres partageables dans l’URL
- Tri par pertinence, audience, nom ou métriques vérifiées
- Casting guidé par objectif et territoire
- Cartes éditoriales avec média secondaire et statut de preuve
- Profils B2B avec hero, arguments, galerie, performances, données gated et livrables
- Cadrage commercial spécifique par créateur : forces, objectifs, livrables recommandés, disponibilité et profils complémentaires
- Lightbox accessible au clavier
- Impression / sauvegarde PDF d’un media kit depuis le navigateur
- CTA mobile sticky

### Sélection et campagne

- Shortlist persistante avec migration de l’ancienne clé locale
- Drawer accessible et annonces vocales des modifications
- Page de comparaison dédiée
- Export CSV de la sélection
- Campaign builder en cinq étapes
- Validation par étape et email professionnel
- Brouillon enregistré localement
- Export texte, copie et email prérempli

### Qualité technique

- Routes chargées à la demande
- Métadonnées dynamiques côté client
- Shell HTML statique lisible avant l’exécution de React
- Canonicals, Open Graph, Twitter Cards, robots et JSON-LD par route
- Sitemap généré automatiquement
- Alias français redirigés vers les routes canoniques
- Error boundary, route announcer, skip link et reduced-motion
- Headers Cloudflare et configuration de cache
- `llms.txt` et `security.txt`

## Données et transparence

Les abonnés et publications proviennent des captures fournies en juillet 2026. La somme des abonnés est une **audience cumulée**, jamais une audience unique.

- `@best_boat_deals` : 2,6 M de vues sur 30 jours documentées par un dashboard fourni
- `@alessiopdlf.nautic` : échantillons de vues visibles sur plusieurs contenus
- autres vues : fourchettes indicatives en attente de Creator Insights standardisés

Les images générées sont déclarées avec `mediaApproval: "placeholder"`. Elles servent uniquement à développer la direction éditoriale et ne doivent pas être présentées comme les vraies personnes derrière les comptes.

Les captures et preuves restent hors du build public :

```text
evidence/source-screenshots/
evidence/source-proofs/
```

## Fichiers à modifier en priorité

- Identité et réservation : `src/config/brand.ts`
- Textes principaux : `src/data/siteCopy.ts`
- Fondateur et niveau de preuve : `src/data/founder.ts`
- Créateurs et métriques : `src/data/creators.ts`
- Médias de galerie : `src/data/editorialMedia.ts`
- Cadrage commercial des profils : `src/data/creatorCommercialProfiles.ts`
- Études sectorielles : `src/data/industryProof.ts`
- Design global : `src/styles.css`

## Routes principales

```text
/
/creators
/creators/:slug
/selection
/solutions
/for-brands
/campaign-builder
/methodology
/case-studies
/about
/join-the-network
/contact
/privacy
/terms
/legal
```

Alias français pris en charge : `/createurs`, `/pour-les-marques`, `/creer-une-campagne`, `/cas-clients`, `/a-propos`, `/rejoindre-le-reseau` et `/methodologie`.

## Déploiement Cloudflare Pages

- Build command : `npm run build`
- Output directory : `dist`
- Version Node : `22`

Le build génère un `index.html` dédié pour chaque route publique et profil. Les formulaires restent locaux jusqu’à la connexion d’un backend, CRM ou service email.

## Documentation

Commencez par :

1. `START-HERE.md`
2. `docs/V5-QUALITY-REPORT.md`
3. `docs/CREATOR-ASSET-INTAKE-FR.md`
4. `docs/DATA-UPDATE-RUNBOOK.md`
5. `docs/QA-MATRIX.md`
6. `docs/CONTENT-AND-CLAIMS.md`
7. `AGENTS.md`
