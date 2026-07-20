# Rapport qualité — RNI V5

## Objectif de cette version

La V5 transforme la base V4 en produit frontend plus exploitable par une agence : données mieux gouvernées, parcours de sélection complet, contenu statique indexable, export des briefs et des castings, instrumentation future, documentation de maintenance et validation plus stricte.

## Changements vérifiés

### Produit

- 12 profils alimentés par un dataset central
- roster avec recherche, catégories, audience, tri et URL partageable
- casting guidé par objectif et territoire
- shortlist persistante
- comparaison de profils
- export CSV du casting
- campaign builder en cinq étapes
- exports texte, presse-papier et email
- profils media-kits imprimables
- cadrage commercial spécifique par créateur : forces, objectifs, livrables, disponibilité et profils complémentaires
- formulaires de marque, rendez-vous et candidature

### Données

- 434 623 abonnés Instagram cumulés
- 9 684 publications visibles
- 2,6 M de vues documentées sur 30 jours pour Best Boat Deals
- autres fourchettes marquées comme estimations ou échantillons visibles
- 12 preuves de profil conservées hors du dossier public
- provenance des images explicitée par `mediaApproval`
- claims fondateur centralisés avec statut

### SEO statique

Le build produit 26 shells HTML dédiés plus une page 404. Chaque route contrôlée contient :

- title
- description
- canonical
- hreflang français
- robots
- Open Graph
- Twitter Cards
- JSON-LD
- contenu de secours lisible avant le rendu React

### Accessibilité

- skip link
- route announcer
- live region de sélection
- focus trap dans les dialogues
- fermeture par Échap
- navigation clavier de la lightbox
- états `aria-pressed` des filtres et de la shortlist
- consentement explicite aux formulaires
- `prefers-reduced-motion`
- CTA mobile sticky sur les profils
- styles d’impression media-kit

## Commande de contrôle

```bash
npm run validate
```

Elle enchaîne :

```text
lint:types
build
verify:project
verify:content
verify:static
verify:routes
```

## Résultat de la dernière passe

- TypeScript : réussi
- Build : réussi
- 26 shells statiques : générés
- Contrôle dataset : réussi
- Contrôle contenu : réussi
- 11 routes statiques prioritaires : réussies
- 14 réponses HTTP preview : HTTP 200
- asset public maximal : inférieur à 2,5 Mo
- installation fraîche avec `npm ci` : réussie
- validation complète depuis un dossier sans `node_modules` ni `dist` : réussie

## Build observé

```text
CSS principal       ~145,1 Ko  / ~26,4 Ko gzip
JS principal        ~400,0 Ko  / ~128,2 Ko gzip
Creator detail      ~16,3 Ko
Campaign builder    ~16,3 Ko
Home                ~13,4 Ko
Cadrage commercial  ~12,5 Ko
```

Les tailles sont celles de la passe locale et peuvent changer après minification ou modification du contenu.

## Ce qui n’a pas été validé automatiquement

### Audit npm

L’endpoint de sécurité du registre disponible dans l’environnement a répondu `502 Bad Gateway`. La passe ne permet donc pas d’affirmer un nombre de vulnérabilités. Relancer `npm audit --omit=dev` depuis un réseau disposant d’un endpoint fonctionnel.

### Screenshots Chromium

Chromium headless a échoué dans le conteneur à cause de restrictions DBus, inotify et netlink. Cette limitation ne concerne pas le build lui-même, mais empêche de revendiquer un test visuel pixel-perfect automatisé.

## Inspection manuelle obligatoire

Tester au minimum :

- Chrome desktop 1440 px
- Safari iPhone
- Chrome Android
- largeur 768 px
- zoom navigateur 200 %
- clavier uniquement
- reduced motion
- impression d’un profil
- sélection de 1, 3 et 8 créateurs
- campaign builder restauré après rafraîchissement
- email préparé depuis les trois parcours de contact

## Verdict

La base est techniquement exploitable pour poursuivre avec Antigravity, Gemini ou Claude Code. Elle n’est pas prête à être publiée comme plateforme commerciale tant que les médias, les données créateurs, les claims fondateur, les formulaires et les mentions légales n’ont pas été finalisés.
