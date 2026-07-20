# Commencer ici — RNI V5

## 1. Installer avec l’environnement validé

```bash
nvm use
npm ci
npm run doctor
npm run dev
```

N’utilisez pas `npm install --force`, `--legacy-peer-deps` ou la suppression du lockfile comme première solution. Le projet a été validé avec Node 22.16.0, npm 10.9.2 et le `package-lock.json` livré.

## 2. Routes à inspecter en premier

- `/`
- `/creators`
- `/creators/meg-slmn`
- `/creators/best-boat-deals`
- `/selection`
- `/for-brands`
- `/campaign-builder`
- `/methodology`
- `/contact?intent=rendez-vous`

## 3. Contrôles fonctionnels

- `⌘/Ctrl + K` ouvre la recherche globale
- les filtres du roster sont reflétés dans l’URL
- ajouter trois profils puis ouvrir la sélection
- exporter la sélection en CSV
- poursuivre vers le campaign builder
- télécharger et copier le brief
- imprimer un profil créateur en media kit
- tester les dialogues au clavier et avec Échap
- tester `prefers-reduced-motion`

## 4. Ordre de personnalisation

1. `src/config/brand.ts`
2. `src/data/siteCopy.ts`
3. `src/data/founder.ts`
4. `src/data/creators.ts`
5. `src/data/editorialMedia.ts`
6. `public/assets/editorial/`
7. pages légales et coordonnées finales

## 5. Avant toute publication commerciale

- remplacer les visuels `placeholder` par des médias approuvés
- faire valider nom, bio, langues, territoires et formats par chaque créateur
- obtenir des Insights sur une fenêtre comparable de 30 ou 90 jours
- archiver les justificatifs des claims fondateur
- connecter les formulaires à un vrai canal de réception
- configurer l’URL de réservation
- compléter l’entité juridique et les mentions légales

## 6. Validation finale

```bash
npm run validate
```

Puis suivre `docs/QA-MATRIX.md` sur Chrome, Safari iOS et un appareil Android réel.

## Pour Claude Code, Gemini ou Antigravity

Lire dans cet ordre :

1. `AGENTS.md`
2. `README.md`
3. `docs/V5-QUALITY-REPORT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/DATA-UPDATE-RUNBOOK.md`
6. `docs/CREATOR-ASSET-INTAKE-FR.md`
7. `docs/CONTENT-AND-CLAIMS.md`
8. `docs/MASTER-PROMPT-ANTIGRAVITY.md`
