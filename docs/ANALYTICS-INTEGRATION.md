# Intégration analytics sans verrouillage fournisseur

La plateforme n’installe aucun tracker par défaut. `src/lib/analytics.ts` expose les événements à deux canaux :

1. `window.dataLayer` lorsqu’un tag manager est installé
2. l’événement DOM `rni:analytics`

Aucune donnée personnelle, email ou texte libre ne doit être envoyée.

## Événements disponibles

```text
rni_page_view
rni_booking_click
rni_shortlist_add
rni_shortlist_remove
rni_shortlist_clear
rni_shortlist_open
rni_matchmaker_run
rni_campaign_step_view
rni_campaign_brief_copy
rni_campaign_brief_download
rni_campaign_brief_email
rni_lead_prepare
rni_creator_application_prepare
rni_media_kit_print
rni_selection_export
```

## Exemple d’écoute locale

```js
window.addEventListener('rni:analytics', (event) => {
  console.debug(event.detail)
})
```

## Avant installation de GA4, GTM ou autre outil

- mettre à jour la politique de confidentialité
- déterminer si un consentement cookies est nécessaire
- bloquer le chargement avant consentement lorsque requis
- exclure les champs personnels
- documenter la durée de conservation
- tester les événements en environnement de préproduction
