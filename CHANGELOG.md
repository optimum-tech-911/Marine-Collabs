# Changelog

## 5.1.0 — 22 July 2026

### Identité et direction

- Passage de l’identité publique à Krew Media dans l’application, les métadonnées, les routes statiques et le manifeste.
- Intégration du hero vidéo approuvé, avec poster et source mobile, scrim lisible et désactivation sous `prefers-reduced-motion`.
- Remplacement des 12 captures Instagram publiques par les photos de profil fournies, puis retrait des anciennes captures du build public.
- Refonte des cartes et fiches créateurs avec avatars distincts des preuves, métriques lisibles au-dessus de la ligne de flottaison et notes méthodologiques explicites.
- Ajout d’un ruban automatique à deux lignes contenant les 12 profils réels, avec pause au survol/focus et fallback `prefers-reduced-motion`.
- Ajout d’une carte du monde vectorielle sous le radar, sans nouvel asset généré.
- Transformation du radar en carte interactive des 12 créateurs : filtres territoriaux, repères issus du roster, niveaux de preuve, sélection détaillée et défilement tactile sur mobile.
- Remplacement des côtes approximatives par la carte équirectangulaire 2400×1200 fournie et séparation visuelle des groupes de repères Pacifique et Caraïbes.
- Intégration des quatre visualisations fieldwork fournies dans une grande séquence éditoriale unique, après optimisation de 8,7 Mo à environ 1,6 Mo.
- Réemploi des scènes fieldwork dans les heroes Créateurs, Solutions et Pour les marques, avec un visuel différent selon la page.
- Allègement des 12 fiches créateur autour d’un aperçu de profil public, des trois statistiques essentielles, de deux informations terrain et d’actions directes.
- Ajout d’un avertissement explicite sur le radar : les positions restent éditoriales tant que les coordonnées ne sont pas documentées.
- Remplacement des visuels générés du fondateur par la photo réelle d’Adrien Cazanave.
- Remplacement des décors IA visibles par le poster vidéo, les portraits de transition ou des compositions CSS.

### Contact et produit

- Remplacement des entrées de réservation et des redirections vers `/contact` par WhatsApp Business et email directs vers Adrien.
- Correction du chevauchement des compteurs du hero en séparant strictement le style des nombres animés et celui de leurs libellés.
- Conservation de la shortlist, de la comparaison, du campaign builder et du contexte des CTA.
- Suppression des CTA sortants vers les comptes Instagram individuels.
- Extension de la traduction anglaise aux composants récents, aux formulaires, au radar, aux fiches et aux données de présentation, avec formats de nombres et de dates localisés.
- Renforcement des animations d’entrée au scroll au niveau des sections et des cartes, avec fallback accessible sous `prefers-reduced-motion`.
- Conservation de `mediaApproval: 'placeholder'` pour les portraits de transition non encore autorisés comme médias officiels.

### Poids et performance

- Suppression de la copie imbriquée `RNI-Regie-Nautique-Influence-V5/` (environ 181 Mo).
- Suppression de 68 Mo d’images IA brutes et du dossier public de placeholders éditoriaux IA.
- Suppression de `motion` et remplacement par `IntersectionObserver`, `requestAnimationFrame` et CSS natifs.
- Mise à jour justifiée de `package-lock.json` pour retirer les cinq paquets transitifs liés à `motion`; le lockfile n’a pas été régénéré.
- Bundle initial passé d’environ 148 Ko à 108 Ko gzip; hero vidéo limitée à 2,3 Mo desktop et 1,4 Mo mobile.

### Validation

- `npm run validate` passe, y compris 67 réponses de routes, 26 shells statiques et la 404.
- Lighthouse mobile non mesuré : aucun navigateur contrôlable n’était disponible dans la session de livraison.

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
