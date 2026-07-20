# Déploiement Cloudflare Pages

## Paramètres

```text
Framework preset : Vite
Build command    : npm run build
Output directory : dist
Node version     : 22
```

## Avant le premier déploiement

- [ ] domaine final confirmé
- [ ] `brand.domain` mis à jour
- [ ] email final configuré
- [ ] URL de réservation configurée
- [ ] mentions légales complétées
- [ ] visuels approuvés
- [ ] claims vérifiés
- [ ] formulaires connectés ou statut statique assumé

## Fichiers Cloudflare

- `public/_redirects` : fallback SPA et alias français
- `public/_headers` : sécurité et cache
- `dist/` : sortie générée

## Contrôle post-déploiement

Tester directement :

```text
/
/creators
/creators/meg-slmn
/creators/best-boat-deals
/selection
/campaign-builder
/methodology
/404
```

Vérifier :

- HTTP 200 ou 404 attendue
- canonical absolue
- social preview
- rechargement d’une route profonde
- CSP et chargement des assets
- formulaires
- stockage local
- impression media kit
- sitemap.xml
- robots.txt
- llms.txt
- security.txt
