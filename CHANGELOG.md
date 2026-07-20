# Changelog

## 5.0.0 — 20 July 2026

### Infrastructure

- Suppression et régénération de `package-lock.json` car l'ancien fichier contenait des URLs de proxy internes inaccessibles (causant des erreurs ETIMEDOUT et des blocages lors de l'installation).

### Produit

- Ajout d’un espace de comparaison de sélection avec export CSV
- Ajout d’un casting guidé par objectif et territoire
- Ajout d’un cadrage commercial spécifique pour les 12 créateurs : forces, objectifs, livrables, disponibilité et profils associés
- Ajout d’une page Méthodologie et sources
- Ajout d’une impression media-kit pour les profils créateurs
- Ajout de filtres du roster partageables dans l’URL
- Enrichissement de la page Pour les marques avec études, fondateur et FAQ
- Ajout d’alias de routes françaises
- Amélioration du campaign builder : validation email, résumé de sélection, copie, téléchargement et email
- Migration des clés de stockage locales vers l’identité RNI

### Vérité des données

- Correction du nom public Mégane Salomon
- Suppression d’un prénom supposé pour Captain Redgi
- Ajout de `mediaApproval` pour distinguer médias approuvés et placeholders
- Centralisation des claims fondateur avec niveau de preuve
- Centralisation de quatre études sectorielles avec liens source
- Ajout d’une méthodologie publique et de règles d’agrégation

### Accessibilité et conversion

- Ajout d’un route announcer
- Ajout d’un live region pour la sélection
- Ajout d’un error boundary
- Amélioration des dialogues, focus traps et CTA mobiles
- Ajout d’un avertissement de prototype dismissible
- Ajout d’un consentement explicite aux formulaires
- Ajout d’un bridge analytics respectueux de la vie privée, sans tracker activé par défaut

### SEO et livraison statique

- Génération de 26 shells HTML statiques et d’une 404
- Contenu de secours lisible avant React
- Canonicals, hreflang, robots, Open Graph, Twitter et JSON-LD dédiés
- Sitemap généré à partir des routes indexables
- Vérification HTTP automatisée de 27 routes via Vite Preview
- Vérification statique exhaustive des 26 routes générées et de la 404

### Fiabilité

- Ajout de `npm run doctor`
- Versions Node/npm documentées et engines déclarés
- Ajout de vérifications de contenu, métriques, médias, claims et routes
- Validation complète via `npm run validate`
- Validation d’une installation fraîche via `npm ci`
- Contrôle des redirections françaises et du fallback Cloudflare

## 4.0.0 — 20 July 2026

- Refonte de l’accueil autour du positionnement français, de la preuve, du fondateur et du rendez-vous
- Recherche globale, nouvelles cartes, nouveaux profils media-kits et lightbox accessible
- Refonte des pages commerciales, des formulaires et du campaign builder
- Ajout de 27 visuels WebP et séparation des preuves Instagram du dossier public

## 3.0.0 — 20 July 2026

- Introduction de l’identité RNI et du positionnement commercial français
- Première architecture de preuves sectorielles et de crédibilité fondateur

## 1.0.0 — 15 July 2026

- Première plateforme statique du réseau de créateurs maritimes
- 12 profils, recherche, filtres, profils, sélection et générateur de brief
