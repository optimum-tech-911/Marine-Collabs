import { resolveInitialLocale } from '../src/i18n/locale-resolution';

type Context = { request: Request; next: () => Promise<Response> };
type PagesFunction = (context: Context) => Response | Promise<Response>;

export const onRequest: PagesFunction = async ({ request, next }: Context) => {
  const url = new URL(request.url);
  if (url.pathname !== '/') return next();
  const cookie = request.headers.get('Cookie')?.match(/(?:^|;\s*)rni_locale=(fr|en)(?:;|$)/)?.[1] as 'fr' | 'en' | undefined;
  const locale = resolveInitialLocale({ pathname: url.pathname, savedLocale: cookie, acceptLanguage: request.headers.get('Accept-Language') ?? '', country: request.headers.get('CF-IPCountry') ?? undefined });
  url.pathname = `/${locale}/`;
  return Response.redirect(url, 302);
};
