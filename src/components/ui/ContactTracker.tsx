"use client";

import { useEffect } from 'react';
import { contactKindOf, reportContact } from '@/constants/conversions';

/**
 * Reports every tel: and WhatsApp link click on the site, wherever the link
 * lives. Buttons that open these URLs with window.open report themselves.
 */
export default function ContactTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href]');
      const kind = link && contactKindOf(link.getAttribute('href') ?? '');
      if (kind) reportContact(kind);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
