import { permanentRedirect } from 'next/navigation';

// Redirect /curtains to /decor (permanent 301)
// These pages were indexed by Google but no longer exist as standalone pages.
// The curtains content now lives under /decor which shows the curtains collection.
export default function CurtainsPage() {
  permanentRedirect('/decor');
}
