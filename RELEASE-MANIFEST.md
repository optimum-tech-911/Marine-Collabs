# Release manifest — RNI V5

Date de préparation : 20 juillet 2026

## Environnement validé

- Node.js 22.16.0
- npm 10.9.2
- installation propre avec `npm ci --no-audit --no-fund`
- build et validation exécutés depuis un dossier sans `node_modules` ni `dist` préexistants

## Contrôles réussis

- TypeScript strict
- build Vite de production
- 12 créateurs et leurs preuves internes
- 12 cadrages commerciaux spécifiques
- 434 623 abonnés Instagram cumulés
- 9 684 publications visibles
- provenance et statut des métriques
- 27 médias de galerie référencés
- absence des captures Instagram dans les assets publics
- 26 shells de routes statiques et `404.html`
- 27 réponses HTTP `200` sur Vite Preview
- aliases français et fallback Cloudflare
- canonicals, hreflang, robots, Open Graph et JSON-LD
- aucun asset public individuel supérieur à 2,5 Mo

## Limites de la passe automatisée

- L’audit npm n’a pas produit de résultat fiable dans l’environnement réseau disponible. Aucun chiffre de vulnérabilité n’est revendiqué.
- Chromium headless n’a pas produit de capture fiable dans le conteneur. Une inspection visuelle finale dans Chrome, Safari iPhone et Chrome Android reste obligatoire.
- Les formulaires préparent actuellement des emails et ne remplacent pas un backend ou CRM.
- Les visuels générés sont des placeholders et ne doivent pas être présentés comme les portraits officiels des créateurs.

## Commande de reproduction

```bash
nvm use
npm ci --no-audit --no-fund
npm run validate
```
