/**
 * JSON-LD Schema Components for SEO
 * 
 * These components generate structured data for Google rich results
 */

import { BUSINESS } from '@/constants/business';

interface ProductSchemaProps {
    name: string;
    description: string;
    image: string[];
    /**
     * REAL aggregate rating only. Pass undefined unless populated from a verified
     * reviews source (Google Business Profile API, on-site review collection, etc.).
     * NEVER hardcode fabricated ratings — Google's structured data policy explicitly
     * prohibits this and the site already saw review snippet count drop from 13 → 4
     * in April 2026 (knowledge base §4.11). When real reviews exist, plumb them
     * through this prop from the product data layer.
     */
    aggregateRating?: {
        ratingValue: number;
        reviewCount: number;
        bestRating?: number;
        worstRating?: number;
    };
}

const WEEK = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const DAY_NAMES: Record<string, string> = {
    Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
};

/** 'Mo-Th' means every day from Monday to Thursday, not just those two. */
function expandDays(range: string) {
    const [from, to = from] = range.split('-');
    return WEEK.slice(WEEK.indexOf(from), WEEK.indexOf(to) + 1).map(day => DAY_NAMES[day]);
}

/**
 * The shop's one entity, rendered once by the root layout from BUSINESS.
 * Other JSON-LD blocks reference it through BUSINESS.id.
 */
export function LocalBusinessSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        '@id': BUSINESS.id,
        name: BUSINESS.name,
        description: BUSINESS.description,
        url: BUSINESS.url,
        telephone: BUSINESS.phone.primary,
        logo: {
            '@type': 'ImageObject',
            url: `${BUSINESS.url}${BUSINESS.logo}`,
            width: '512',
            height: '512',
        },
        image: `${BUSINESS.url}${BUSINESS.logo}`,
        priceRange: BUSINESS.priceRange,
        address: {
            '@type': 'PostalAddress',
            streetAddress: BUSINESS.address.streetAddress,
            addressLocality: BUSINESS.address.addressLocality,
            addressRegion: BUSINESS.address.addressRegion,
            addressCountry: BUSINESS.address.addressCountry,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: BUSINESS.geo.latitude,
            longitude: BUSINESS.geo.longitude,
        },
        openingHoursSpecification: BUSINESS.hours.schemaOrg.map(hours => {
            const [days, time] = hours.split(' ');
            const [opens, closes] = time.split('-');
            return { '@type': 'OpeningHoursSpecification', dayOfWeek: expandDays(days), opens, closes };
        }),
        areaServed: BUSINESS.areaServed.map(area => ({
            '@type': area === BUSINESS.address.addressCountryName ? 'Country' : 'City',
            name: area,
        })),
        knowsAbout: BUSINESS.knowsAbout,
        sameAs: BUSINESS.sameAs.length > 0 ? BUSINESS.sameAs : undefined,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: BUSINESS.phone.primary,
            contactType: 'customer service',
            availableLanguage: ['Arabic'],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * Product page schema with ImageObject.
 * A Service, not a Product: Google marks a Product with no offer, review or rating as
 * invalid, and the owner has confirmed no prices. Go back to Product with an Offer only
 * when he gives real ones.
 */
export function ProductSchema({
    name,
    description,
    image,
    aggregateRating,
}: ProductSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: { '@id': BUSINESS.id },
        image: image.length > 0 ? image.map((img, index) => ({
            '@type': 'ImageObject',
            '@id': `${baseUrl}${img}#image${index}`,
            url: `${baseUrl}${img}`,
            contentUrl: `${baseUrl}${img}`,
            caption: `${name} - صورة ${index + 1}`,
        })) : undefined,
        aggregateRating: aggregateRating ? {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue,
            reviewCount: aggregateRating.reviewCount,
            bestRating: aggregateRating.bestRating ?? 5,
            worstRating: aggregateRating.worstRating ?? 1,
        } : undefined,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

/**
 * WebSite Schema (basic).
 * Identifies the site to Google. SearchAction is intentionally NOT included
 * because the site does not yet expose a public /search?q= endpoint.
 * To enable the sitelinks search box, build the /search route then add a
 * potentialAction: SearchAction to this schema.
 */
export function WebSiteSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: BUSINESS.name,
        alternateName: ['مفروشات العمودي', 'Al-Amoudi Furniture'],
        description: 'موكيت وأرضيات وباركيه وفينيل في الرياض',
        publisher: { '@id': BUSINESS.id },
        inLanguage: 'ar-SA',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
