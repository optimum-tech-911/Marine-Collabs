# Instructions agents — RNI V5

## Règles non négociables

1. `src/data/creators.ts` reste la source unique de vérité du roster.
2. Ne jamais inventer audience, vues, engagement, ventes, collaborations, langues, régions ou qualifications.
3. Une estimation conserve toujours le label `estimated` et son explication.
4. Les claims du fondateur restent dans `src/data/founder.ts` avec leur statut.
5. Un média `placeholder` ne doit jamais être présenté comme le portrait officiel d’un créateur.
6. Les screenshots et dashboards restent hors de `public/`.
7. Ne pas exposer prix, coordonnées privées ou démographie détaillée.
8. Préserver shortlist, comparaison, campaign builder et contexte des CTA.
9. Exécuter `npm run validate` après chaque modification importante.
10. Ne pas supprimer ou régénérer `package-lock.json` sans justification documentée.

## Direction produit

- Agence B2B spécialisée, pas marketplace ouverte
- Marque comme audience primaire
- Régie Nautique reste l’intermédiaire commercial
- L’objectif de campagne passe avant le nombre d’abonnés
- Le rôle du créateur doit être expliqué, pas seulement affiché

## Direction visuelle

Premium maritime éditorial : bleu nuit, blanc chaud, seafoam, images fortes, grilles précises et animations discrètes.

Éviter : SaaS générique, gradients violets, néon, glassmorphism excessif, particules, 3D gadget, chrome Instagram et blocs trop parfaits qui révèlent une génération automatique.

## Processus recommandé

1. Lire `docs/DATA-UPDATE-RUNBOOK.md`
2. Modifier le dataset avant les composants
3. Remplacer les assets via le manifeste
4. Contrôler Mégane, Best Boat Deals et un micro-créateur
5. Contrôler mobile, clavier, reduced-motion et impression
6. Lancer `npm run validate`
7. Documenter les claims ou limites restantes
