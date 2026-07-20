# Architecture V5

## Source de vérité frontend

- `src/config/brand.ts` centralise le nom public, le domaine, l’adresse email, le lien de réservation et les réseaux sociaux optionnels.
- `src/data/creators.ts` est l’unique source de vérité du roster public.
- `src/data/network.ts` calcule les agrégats du réseau ; aucun total public ne doit être recopié manuellement.
- `src/data/founder.ts` sépare les affirmations d’Adrien selon leur niveau de preuve.
- `src/data/industryProof.ts` contient les études sectorielles et leurs sources officielles.
- `src/data/siteCopy.ts` contient les textes marketing réutilisables.
- `src/data/editorialMedia.ts` référence les médias éditoriaux de transition.

## Composition applicative

- `src/pages/` possède la composition au niveau des routes.
- `src/components/` contient les composants réutilisables, les interactions et les surfaces de conversion.
- `src/context/ShortlistContext.tsx` gère la sélection persistée dans le navigateur et migre l’ancienne clé locale.
- `src/lib/analytics.ts` fournit une couche d’événements neutre et respectueuse de la vie privée ; aucun fournisseur de suivi n’est installé par défaut.
- `src/hooks/useDialogA11y.ts` mutualise le comportement clavier des dialogues.
- `src/App.tsx` charge les pages à la demande et conserve des alias français vers les routes canoniques.

## Génération statique hybride

La plateforme reste une SPA React/Vite, complétée après le build par `scripts/generate-static-routes.mjs`.

Le script génère :

- un shell HTML statique utile avant l’hydratation ;
- les titres, descriptions, canonicals et directives robots par route ;
- Open Graph, Twitter Cards et JSON-LD ;
- les 12 routes créateur ;
- le sitemap de production ;
- une page `404.html` autonome.

Cette stratégie permet un hébergement Cloudflare Pages sans serveur applicatif tout en évitant un écran vide avant JavaScript.

## Parcours fonctionnels V5

### Visiteur de marque

```text
Accueil / Pour les marques
→ exploration du roster
→ matchmaker ou filtres
→ sélection persistée
→ comparaison
→ brief de campagne
→ export, copie ou préparation d’email
```

### Créateur

```text
Rejoindre le réseau
→ formulaire de candidature
→ préparation d’un email contextualisé
```

### Conversion directe

```text
CTA de réservation
→ route interne configurable ou URL de calendrier centralisée
→ événement analytics sans fournisseur imposé
```

## Stockage local

La V5 utilise uniquement le stockage du navigateur pour :

- la sélection de créateurs ;
- le brouillon du brief ;
- l’état de fermeture de l’avertissement prototype.

Aucune donnée n’est envoyée à un backend dans cette version.

## Frontières de sécurité

- Les captures Instagram et preuves détaillées restent sous `evidence/`, jamais dans `public/` ou `dist/`.
- Les coordonnées privées, prix et données d’audience détaillées ne sont pas exposés.
- Les médias générés sont marqués comme placeholders et ne doivent pas être présentés comme portraits officiels.
- La CSP et les en-têtes de sécurité sont définis dans `public/_headers`.

## Évolution Supabase recommandée

La migration vers Supabase devient pertinente lorsque l’équipe doit modifier régulièrement les profils, traiter des leads ou gérer des campagnes.

Domaines suggérés :

- `profiles`
- `organisations`
- `organisation_members`
- `creators`
- `creator_platforms`
- `creator_metrics`
- `creator_metric_evidence`
- `creator_media`
- `creator_availability`
- `brand_briefs`
- `brief_shortlists`
- `inquiries`
- `campaigns`
- `campaign_creators`
- `deliverables`
- `content_approvals`
- `usage_rights`
- `contracts`
- `reports`

Toutes les tables privées devront utiliser Row Level Security avant la mise en production.
