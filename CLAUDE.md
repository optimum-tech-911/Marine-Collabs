# Claude Code — contexte RNI V5

Plateforme frontend française pour **RNI — Régie Nautique d’Influence**.

## Stack verrouillée

- React 19
- TypeScript
- Vite
- React Router
- Motion
- CSS global existant
- Build statique Cloudflare Pages

Ne migrez pas de framework et n’ajoutez pas de CMS ou backend sans demande explicite.

## Parcours à préserver

- roster, filtres URL et recherche globale
- profil media-kit et impression
- shortlist persistante
- page de comparaison et export CSV
- casting guidé
- campaign builder et exports
- contact et candidature avec email préparé
- méthodologie et niveaux de preuve

## Sources de vérité

- créateurs : `src/data/creators.ts`
- fondateur : `src/data/founder.ts`
- études : `src/data/industryProof.ts`
- marque : `src/config/brand.ts`
- copy principale : `src/data/siteCopy.ts`
- médias : `src/data/editorialMedia.ts`

## Validation obligatoire

```bash
npm ci
npm run doctor
npm run validate
```

Une modification n’est pas terminée lorsque le build échoue, qu’un chiffre n’a pas de statut ou qu’un visuel de démonstration est présenté comme une personne réelle.
