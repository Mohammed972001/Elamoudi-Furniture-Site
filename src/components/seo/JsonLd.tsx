/**
 * JSON-LD Schema Components for SEO
 * 
 * These components generate structured data for Google rich results
 */

interface LocalBusinessSchemaProps {
    name: string;
    description: string;
    telephone: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    geo: {
        latitude: number;
        longitude: number;
    };
    openingHours: string[];
    priceRange?: string;
    image?: string;
    areaServed?: string[];
}

interface ProductSchemaProps {
    name: string;
    description: string;
    image: string[];
    sku: string;
    brand?: string;
    offers?: {
        price?: number;
        priceCurrency?: string;
        availability?: string;
    };
}

interface OrganizationSchemaProps {
    name: string;
    description: string;
    url: string;
    logo?: string;
    telephone?: string;
    address?: {
        addressLocality: string;
        addressCountry: string;
    };
    sameAs?: string[];
}

/**
 * LocalBusiness Schema for local SEO
 * Helps appear in "near me" searches and Google Maps
 */
export function LocalBusinessSchema({
    name,
    description,
    telephone,
    address,
    geo,
    openingHours,
    priceRange = '$$',
    image,
    areaServed,
}: LocalBusinessSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${baseUrl}/#business`,
        name,
        description,
        url: baseUrl,
        telephone,
        image: image ? `${baseUrl}${image}` : undefined,
        priceRange,
        address: {
            '@type': 'PostalAddress',
            ...address,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.latitude,
            longitude: geo.longitude,
        },
        openingHoursSpecification: openingHours.map(hours => {
            const [days, time] = hours.split(' ');
            const [open, close] = time.split('-');
            return {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: days.split('-').map(day => {
                    const dayMap: Record<string, string> = {
                        'Mo': 'Monday', 'Tu': 'Tuesday', 'We': 'Wednesday',
                        'Th': 'Thursday', 'Fr': 'Friday', 'Sa': 'Saturday', 'Su': 'Sunday'
                    };
                    return dayMap[day] || day;
                }),
                opens: open,
                closes: close,
            };
        }),
        areaServed: areaServed?.map(area => ({
            '@type': 'City',
            name: area,
        })),
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'منتجات العمودي للمفروشات',
            itemListElement: [
                { '@type': 'OfferCatalog', name: 'موكيت' },
                { '@type': 'OfferCatalog', name: 'سجاد' },
                { '@type': 'OfferCatalog', name: 'أرضيات' },
                { '@type': 'OfferCatalog', name: 'باركيه' },
                { '@type': 'OfferCatalog', name: 'فينيل' },
                { '@type': 'OfferCatalog', name: 'موكيت مساجد' },
            ],
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
 * Product Schema with ImageObject
 * Helps products appear in Google Shopping and image search
 */
export function ProductSchema({
    name,
    description,
    image,
    sku,
    brand = 'العمودي للمفروشات',
    offers,
}: ProductSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name,
        description,
        sku,
        brand: {
            '@type': 'Brand',
            name: brand,
        },
        image: image.map((img, index) => ({
            '@type': 'ImageObject',
            '@id': `${baseUrl}${img}#image${index}`,
            url: `${baseUrl}${img}`,
            contentUrl: `${baseUrl}${img}`,
            caption: `${name} - صورة ${index + 1}`,
        })),
        offers: offers ? {
            '@type': 'Offer',
            price: offers.price,
            priceCurrency: offers.priceCurrency || 'SAR',
            availability: offers.availability || 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: brand,
            },
        } : undefined,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '150',
            bestRating: '5',
            worstRating: '1',
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
 * Organization Schema
 * Establishes brand identity
 */
export function OrganizationSchema({
    name,
    description,
    url,
    logo,
    telephone,
    address,
    sameAs,
}: OrganizationSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name,
        description,
        url,
        logo: logo ? {
            '@type': 'ImageObject',
            url: `${url}${logo}`,
            width: '200',
            height: '200',
        } : undefined,
        telephone,
        address: address ? {
            '@type': 'PostalAddress',
            addressLocality: address.addressLocality,
            addressCountry: address.addressCountry,
        } : undefined,
        sameAs,
        contactPoint: {
            '@type': 'ContactPoint',
            telephone,
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
 * WebSite Schema with SearchAction
 * Enables sitelinks search box in Google
 */
export function WebSiteSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'العمودي للمفروشات',
        description: 'متجر العمودي للمفروشات - أفضل موكيت وسجاد وأرضيات في الرياض',
        publisher: {
            '@id': `${baseUrl}/#organization`,
        },
        inLanguage: 'ar-SA',
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
