/**
 * Tells the shop which Google ad a WhatsApp chat came from. The ads land with
 * utm_campaign set; the campaign is kept for the visit so a tap on any page
 * adds a short line to the WhatsApp message, and the owner can match each
 * closed order to a product without asking the customer.
 */
const KEY = 'ad_campaign';

const CAMPAIGN_LABEL: Record<string, string> = {
  parquet: 'الباركيه',
  vinyl: 'الفينيل',
  medical_vinyl: 'الفينيل الطبي',
  office_carpet: 'موكيت المكاتب',
  rubber: 'الربل',
};

/** Call once per page load; keeps the ad campaign of the landing URL. */
export function rememberAdSource() {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('utm_medium') === 'cpc' || params.has('gclid')) {
      sessionStorage.setItem(KEY, params.get('utm_campaign') ?? 'google');
    }
  } catch {
    // Storage blocked: the message just goes without the ad line.
  }
}

function adNote(): string {
  let campaign: string | null = null;
  try {
    campaign = sessionStorage.getItem(KEY);
  } catch {
    return '';
  }
  if (campaign === null) return '';
  const label = CAMPAIGN_LABEL[campaign];
  return label ? `\n(من إعلان جوجل - ${label})` : '\n(من إعلان جوجل)';
}

/** The WhatsApp text, with the ad line appended for visitors from an ad. */
export function withAdSource(message: string): string {
  if (message.includes('من إعلان جوجل')) return message;
  return message + adNote();
}
