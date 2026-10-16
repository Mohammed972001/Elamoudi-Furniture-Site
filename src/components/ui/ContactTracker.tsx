"use client";

import { useEffect } from 'react';
import { contactKindOf, reportContact } from '@/constants/conversions';
import { rememberAdSource, withAdSource } from '@/constants/adSource';

/**
 * Reports every tel: and WhatsApp link click on the site, wherever the link
 * lives. Buttons that open these URLs with window.open report themselves.
 * It also keeps the ad campaign of the visit and adds it to WhatsApp links.
 */
export default function ContactTracker() {
  useEffect(() => {
    rememberAdSource();
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      const kind = link && contactKindOf(link.getAttribute('href') ?? '');
      if (kind) reportContact(kind);
      // Runs in the capture phase, before the browser follows the link.
      if (kind === 'whatsapp' && link instanceof HTMLAnchorElement) {
        const [base, query = ''] = link.href.split('?');
        const text = new URLSearchParams(query).get('text') ?? '';
        link.href = `${base}?text=${encodeURIComponent(withAdSource(text))}`;
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
