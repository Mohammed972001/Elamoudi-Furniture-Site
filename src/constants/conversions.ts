/**
 * Google Ads conversion tracking for account 468-892-4462.
 * A contact click (WhatsApp or phone) is the only lead this site produces,
 * so each one is reported as a conversion.
 */
export const ADS_ID = 'AW-18321266531';

const SEND_TO = {
  whatsapp: 'AW-18321266531/tEzoCJfT44kdEOOuoaBE',
  call: 'AW-18321266531/q1nxCJrT44kdEOOuoaBE',
} as const;

export type ContactKind = keyof typeof SEND_TO;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// GA4 gets the same tap as its own event, so Ads' conversion count can be
// checked against Analytics (page, city, device). The buttons open WhatsApp
// and the dialer from JS, which GA4's automatic outbound-click tracking
// never sees.
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export function reportContact(kind: ContactKind) {
  window.gtag?.('event', 'conversion', { send_to: SEND_TO[kind] });
  if (GA4_ID) {
    window.gtag?.('event', 'contact_click', { send_to: GA4_ID, method: kind });
  }
}

export function contactKindOf(href: string): ContactKind | null {
  if (href.startsWith('tel:')) return 'call';
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp';
  return null;
}
