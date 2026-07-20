# Checklist de lancement

## Identité et entreprise

- [ ] Nom commercial et dénomination légale confirmés
- [ ] Domaine `regienautique.fr` détenu ou remplacé dans `brand.ts`
- [ ] Logo, favicon et social image approuvés
- [ ] Adresse email de contact opérationnelle
- [ ] Adresse, SIREN/SIRET, directeur de publication et hébergeur ajoutés aux mentions légales
- [ ] URL réelle de réservation configurée dans `brand.ts`

## Permissions et données créateurs

- [ ] Chaque créateur approuve son nom public, sa bio et ses médias
- [ ] Handles, abonnés et publications revérifiés avant lancement
- [ ] Creator Insights reçus avec période et capture datée
- [ ] Données démographiques vérifiées avant affichage
- [ ] Collaborations antérieures autorisées par écrit
- [ ] Disponibilité et formats confirmés
- [ ] Placeholders générés remplacés sur les profils nominatifs

## Claims et preuves

- [ ] Qualifications et expérience d’Adrien documentées
- [ ] Claim « 28 bateaux achetés et revendus » approuvé
- [ ] Preuve des vues Best Boat Deals conservée dans l’espace privé
- [ ] Toute affirmation de ventes attribuées est documentée ou reformulée
- [ ] Sources sectorielles revérifiées et datées
- [ ] Chaque estimation conserve son badge visible

## Commercial

- [ ] Objectifs de campagne et livrables validés
- [ ] Politique de budget minimum définie en interne
- [ ] Droits organiques, paid media et whitelisting cadrés
- [ ] Exclusivité, territoire et durée documentés
- [ ] Workflow de contrat et de transparence commerciale validé
- [ ] Cas clients basés uniquement sur des résultats réels et autorisés

## Technique

- [ ] `npm ci` réussit avec Node 22 et npm 10
- [ ] `npm run validate` réussit sans erreur
- [ ] Formulaires connectés et testés de bout en bout
- [ ] Protection antispam ajoutée
- [x] Couche d’événements analytics ajoutée
- [ ] Fournisseur analytics configuré et vérifié
- [x] Metadata, canonicals, Open Graph et sitemap générés
- [ ] Domaine final vérifié dans les fichiers générés
- [ ] Routes directes testées sur Cloudflare Pages
- [ ] Inspection visuelle Chrome desktop, tablette et mobile terminée
- [ ] Test clavier et lecteur d’écran terminé
- [ ] Test de performance mobile terminé
- [ ] Vérification des emails `mailto:` sur appareils réels

## Légal et vie privée

- [ ] Politique de confidentialité adaptée au traitement réel
- [ ] Conditions et mentions légales relues par un professionnel
- [ ] Consentement cookies ajouté uniquement si les outils installés l’exigent
- [ ] Obligations de transparence de l’influence commerciale intégrées au workflow
- [ ] Durée de conservation des leads définie
- [ ] Procédure d’exercice des droits RGPD documentée

## Déploiement

- [ ] Variables et domaine configurés dans Cloudflare Pages
- [ ] En-têtes CSP testés avec les services réellement installés
- [ ] Redirections françaises vérifiées
- [ ] `404.html` vérifiée en production
- [ ] Sauvegarde du zip livré et du commit de lancement
- [ ] Plan de retour arrière documenté
