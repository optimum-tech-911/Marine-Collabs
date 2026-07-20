# Runbook de mise à jour des créateurs et métriques

## Principe

Aucun chiffre ne doit être modifié directement dans un composant. Le roster, les profils, la sélection, le campaign builder et les agrégats utilisent `src/data/creators.ts`.

## Mise à jour d’un profil

1. ouvrir la preuve interne dans `evidence/source-proofs/`
2. confirmer le handle et la date de capture
3. obtenir la validation du créateur pour les champs non publics
4. modifier l’objet correspondant dans `src/data/creators.ts`
5. mettre à jour `sourceCapturedAt`
6. vérifier `viewEstimate.evidence`
7. ajouter une note expliquant la méthode
8. lancer `npm run validate`

## Choisir le statut de vues

### `verified`

Utiliser uniquement lorsqu’une preuve couvre exactement la période affichée. Exemple : dashboard 30 jours.

### `visible-sample`

Utiliser lorsque quelques contenus affichent publiquement leurs vues, sans total sur la période.

### `estimated`

Utiliser pour une fourchette de préparation. Ne jamais convertir une estimation en valeur unique ou en garantie.

## Mise à jour des abonnés et publications

- transcrire la valeur visible
- conserver la capture et la date
- ne pas arrondir dans le dataset
- arrondir uniquement dans l’interface via `formatCompact`
- ne jamais parler d’audience unique lors de l’agrégation

## Mise à jour des médias

- média approuvé : `mediaApproval: 'approved'`
- média généré ou générique : `mediaApproval: 'placeholder'`
- média attendu : `mediaApproval: 'pending'`

Le changement de statut doit être accompagné d’une autorisation archivée.

## Mise à jour d’une étude sectorielle

1. privilégier une source officielle ou primaire
2. vérifier l’année et le périmètre
3. résumer sans modifier le sens
4. ajouter le lien dans `src/data/industryProof.ts`
5. ajouter une note lorsqu’une interprétation est nécessaire
6. vérifier que la statistique n’est pas présentée comme un résultat RNI

## Claims fondateur

Modifier uniquement `src/data/founder.ts`.

Statuts :

- `founder-provided`
- `publicly-visible`
- `verified-evidence`

Un claim reste `founder-provided` jusqu’à archivage du justificatif adapté.

## Contrôles après mise à jour

```bash
npm run doctor
npm run validate
```

Puis vérifier manuellement :

- carte du créateur
- profil
- sélection
- campaign builder
- métadonnées de la route
- impression du media kit
