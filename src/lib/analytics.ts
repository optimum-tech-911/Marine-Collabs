export type AnalyticsEventName =
  | 'page_view'
  | 'contact_click'
  | 'shortlist_add'
  | 'shortlist_remove'
  | 'shortlist_clear'
  | 'shortlist_open'
  | 'creator_profile_open'
  | 'matchmaker_run'
  | 'campaign_step_view'
  | 'campaign_brief_copy'
  | 'campaign_brief_download'
  | 'campaign_brief_email'
  | 'lead_prepare'
  | 'creator_application_prepare'
  | 'media_kit_print'
  | 'selection_export';

export type AnalyticsParameters = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Privacy-conscious event bridge.
 *
 * The platform does not ship a tracker by default. Events are exposed through
 * `window.dataLayer` when a tag manager is installed and through a DOM event
 * for integrations added later. Never pass names, email addresses or free text.
 */
export function trackEvent(name: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === 'undefined') return;

  const clean = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined && value !== ''),
  );
  const payload = { event: `rni_${name}`, ...clean };

  if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('rni:analytics', { detail: payload }));
}
