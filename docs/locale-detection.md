# Locale detection

Priority is: locale in URL, explicit `rni_locale` cookie, browser language, conservative Cloudflare country fallback, English. Cloudflare only redirects the neutral `/` route with a temporary 302. It never rewrites an explicit French or English route.

French-first country fallback is intentionally limited to unambiguous French territories. Canada, Belgium, Switzerland, Luxembourg, Cameroon, Rwanda, Mauritius and Seychelles remain browser-language-led.
