# Notes de livraison — RNI V5

## Installation validée

```bash
nvm use
npm ci
npm run doctor
npm run validate
```

Environnement utilisé : Node 22.16.0 et npm 10.9.2.

## Contrôles réussis

- TypeScript strict
- Build Vite de production
- Génération de 26 shells de routes et d’une 404
- Vérification métier des 12 créateurs
- Totaux : 434 623 abonnés cumulés et 9 684 publications visibles
- Contrôle des niveaux de preuve et de la provenance média
- Contrôle de 27 références de galerie
- Contrôle des études sectorielles
- Vérification statique de 26 routes plus `404.html`
- Vérification HTTP de 27 routes sur un serveur preview
- Aucun asset public individuel supérieur à 2,5 Mo
- Cadrage commercial spécifique contrôlé pour les 12 créateurs
- Installation fraîche et validation complète réussies depuis un dossier sans dépendances préinstallées

## Taille du dernier build observé

- CSS principal : environ 145 Ko, 26,4 Ko gzip
- JS principal : environ 400 Ko, 128,2 Ko gzip
- pages métier chargées dans des chunks séparés

## Limites honnêtes de validation

- L’endpoint `npm audit` de l’environnement a répondu `502 Bad Gateway`; aucun résultat de vulnérabilité ne doit donc être revendiqué pour cette passe.
- Chromium headless n’a pas produit de capture fiable dans le conteneur en raison de restrictions DBus, inotify et réseau système.
- Le build, les fichiers statiques et les réponses HTTP ont été validés ; une inspection visuelle finale sur appareils réels reste obligatoire.

## Blocages avant publication commerciale

1. Médias originaux et autorisés pour les 12 créateurs
2. Validation écrite des bios et informations publiques
3. Creator Insights standardisés
4. Preuves archivées des claims fondateur
5. URL de réservation définitive
6. Formulaires reliés à un backend ou CRM
7. Mentions légales et politique de confidentialité finalisées
8. Consentement analytics/cookies selon les outils réellement installés
