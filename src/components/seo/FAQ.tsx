'use client';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    items: FAQItem[];
    title?: string;
}

/**
 * FAQ Component with Schema.org FAQPage structured data
 * 
 * This component provides:
 * 1. Visual FAQ accordion for users
 * 2. FAQPage Schema for Google rich results
 */
export default function FAQ({ items, title = 'الأسئلة الشائعة' }: FAQProps) {
    // Generate FAQPage Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return (
        <>
            {/* Schema.org structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Visual FAQ Section */}
            <section className="bg-white rounded-lg shadow-lg p-8" dir="rtl">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
                    {title}
                </h2>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {items.map((item, index) => (
                        <details
                            key={index}
                            className="group border border-gray-200 rounded-lg overflow-hidden"
                        >
                            <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <span className="font-semibold text-gray-800 text-right flex-1">
                                    {item.question}
                                </span>
                                <span className="text-primary text-xl mr-4 group-open:rotate-180 transition-transform duration-300">
                                    ▼
                                </span>
                            </summary>
                            <div className="p-4 bg-white border-t border-gray-200">
                                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </>
    );
}
