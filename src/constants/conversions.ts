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

export function reportContact(kind: ContactKind) {
  window.gtag?.('event', 'conversion', { send_to: SEND_TO[kind] });
}

export function contactKindOf(href: string): ContactKind | null {
  if (href.startsWith('tel:')) return 'call';
  if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) return 'whatsapp';
  return null;
}
