# Internationalization

RNI uses permanent `/fr/` and `/en/` routes. `src/i18n/routes.ts` is the single route map and preserves a creator slug or page equivalent on language change. `rni_locale` is a one-year `SameSite=Lax` cookie, mirrored to local storage only for hydration.

Add a locale-aware route by adding the same route key in both maps, extending `LocalizedRoutes` once, then adding its metadata. Do not add a second router or translate at runtime through a third party.
