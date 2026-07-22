# Matrice QA — RNI V5

## Navigateurs et dimensions

| Environnement | Largeur indicative | Contrôles principaux |
|---|---:|---|
| Chrome desktop | 1440 px | hero, grilles, sticky sidebar, hover |
| Laptop | 1280 px | navigation, densité, sélection |
| Tablette paysage | 1024 px | passage sidebar, galeries |
| Tablette portrait | 768 px | menus, formulaires, tableaux |
| Safari iPhone | 390 px | CTA sticky, safe area, swipe |
| Chrome Android | 360 px | touch targets, overflow, formulaires |
| Zoom navigateur | 200 % | reflow, textes et focus |

## Parcours accueil

- [ ] hero lisible sans chevauchement
- [ ] CTA réservation ouvre le bon parcours
- [ ] chiffres cumulés correctement libellés
- [ ] sources externes ouvrent dans un nouvel onglet
- [ ] claims fondateur cohérents avec `src/data/founder.ts`
- [ ] rail de secteurs ne gêne pas reduced-motion

## Roster

- [ ] recherche sans résultat
- [ ] filtres de catégories
- [ ] filtres d’audience
- [ ] tri par audience
- [ ] tri par métriques vérifiées
- [ ] URL restaurée après rafraîchissement
- [ ] casting guidé sur plusieurs objectifs
- [ ] ajout/retrait avec clavier

## Présentation des créateurs

- [ ] aucune carte ne mène vers une fiche individuelle
- [ ] les visuels `placeholder` ne sont pas présentés comme portraits officiels
- [ ] ajout et retrait de la shortlist au clavier
- [ ] le radar reste animé, lisible et sans panneau de détails
- [ ] les anciennes URL individuelles redirigent vers la page Créateurs

## Sélection

- [ ] état vide
- [ ] 1 créateur
- [ ] 3 créateurs
- [ ] 8 créateurs
- [ ] tableau horizontal utilisable sur mobile
- [ ] retrait d’un profil
- [ ] vider la sélection
- [ ] export CSV encodé correctement
- [ ] reprise dans le campaign builder

## Campaign builder

- [ ] étape 1 bloque sans objectif
- [ ] étape 2 bloque sans marché, audience et catégorie
- [ ] étape 3 bloque sans plateformes, formats, budget et timing
- [ ] étape 4 refuse un email invalide
- [ ] brouillon restauré après rafraîchissement
- [ ] sélection synchronisée
- [ ] copie du brief
- [ ] export texte
- [ ] email prérempli
- [ ] reset complet

## Contact et candidature

- [ ] intent marque
- [ ] intent rendez-vous
- [ ] intent créateur
- [ ] sélection de créateurs reprise dans la demande
- [ ] consentement obligatoire
- [ ] aucun envoi automatique non annoncé
- [ ] email contient les champs attendus

## Accessibilité

- [ ] skip link visible au focus
- [ ] navigation complète au clavier
- [ ] focus visible
- [ ] dialogs avec focus trap
- [ ] fermeture Échap
- [ ] live region de shortlist
- [ ] headings logiques
- [ ] alt text pertinent
- [ ] contraste suffisant
- [ ] reduced-motion

## Performance

- [ ] hero chargé en priorité
- [ ] galeries lazy-loadées
- [ ] aucune image > 2,5 Mo
- [ ] aucune variation de layout perceptible
- [ ] pas d’erreur console
- [ ] pas de requête vers les preuves internes

## Commandes finales

```bash
npm ci
npm run doctor
npm run validate
npm audit --omit=dev
```

La dernière commande nécessite un endpoint npm audit fonctionnel.
