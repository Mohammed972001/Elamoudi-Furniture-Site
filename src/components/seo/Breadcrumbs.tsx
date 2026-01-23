'use client';

import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

/**
 * Breadcrumbs Component with Schema.org structured data
 * 
 * This component provides both:
 * 1. Visual breadcrumb navigation for users
 * 2. BreadcrumbList Schema for SEO (Google rich results)
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

    // Generate BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.href ? `${baseUrl}${item.href}` : undefined,
        })),
    };

    return (
        <>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            {/* Visual Breadcrumb Navigation */}
            <nav
                aria-label="Breadcrumb"
                className="py-3 px-4 bg-gray-50 rounded-lg mb-6"
                dir="rtl"
            >
                <ol className="flex items-center gap-2 text-sm flex-wrap">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {index > 0 && (
                                <span className="text-gray-400" aria-hidden="true">
                                    ←
                                </span>
                            )}
                            {item.href && index < items.length - 1 ? (
                                <Link
                                    href={item.href}
                                    className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="text-gray-600 font-medium" aria-current="page">
                                    {item.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
