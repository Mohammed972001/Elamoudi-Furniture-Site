import { redirect } from 'next/navigation';

// Redirect /kitchens to /products (permanent 301)
// These pages were indexed by Google but no longer exist as standalone pages.
// Kitchen-related products can be found in the main products listing.
export default function KitchensPage() {
  redirect('/products');
}
