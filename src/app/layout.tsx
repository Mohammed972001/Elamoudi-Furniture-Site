import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/fonts.css";
import Navbar from "@/components/navbar/Navbar";
import type { RootLayoutProps } from "@/types";
import Footer from "@/components/ui/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { LocalBusinessSchema, OrganizationSchema, WebSiteSchema } from "@/components/seo/JsonLd";
import { BUSINESS } from '@/constants/business';

// Font configuration
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

// Site URL for canonical and OpenGraph
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

// Metadata configuration - SEO Optimized
export const metadata: Metadata = {
  // Primary Meta Tags
  title: {
    default: "العمودي للمفروشات | موكيت وأرضيات في الرياض",
    template: "%s | العمودي للمفروشات",
  },
  description: "العمودي للمفروشات - متخصصون في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، أرضيات عالية الجودة. توصيل وتركيب مجاني.",
  keywords: [
    // الكلمات الرئيسية
    "العمودي للمفروشات",
    "موكيت",
    "مفروشات",
    "أرضيات",
    "الرياض",
    // تركيبات الكلمات
    "موكيت الرياض",
    "مفروشات الرياض",
    "أرضيات الرياض",
    "موكيت مساجد",
    "باركيه",
    "فينيل",
    "موكيت منازل",
    "أرضيات خشبية",
    "تركيب موكيت",
  ],
  authors: [{ name: "العمودي للمفروشات", url: siteUrl }],
  creator: "العمودي للمفروشات",
  publisher: "العمودي للمفروشات",

  // Canonical URL
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },

  // OpenGraph for Social Sharing
  openGraph: {
    title: "العمودي للمفروشات | موكيت وأرضيات في الرياض",
    description: "متخصصون في موكيت وأرضيات وباركيه في الرياض. موكيت مساجد، توصيل وتركيب مجاني.",
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "العمودي للمفروشات",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'العمودي للمفروشات - موكيت وأرضيات',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "العمودي للمفروشات | موكيت وأرضيات في الرياض",
    description: "متخصصون في موكيت وأرضيات في الرياض. توصيل وتركيب مجاني.",
    images: ['/og-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Icons
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },

  // Verification (add your codes)
  // verification: {
  //   google: 'your-google-verification-code',
  // },
};

// Main Layout Component
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        {/* Google tag (gtag.js) — Google Ads + GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17506948956"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17506948956');
            ${process.env.NEXT_PUBLIC_GA4_ID ? `gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');` : '// GA4: Set NEXT_PUBLIC_GA4_ID in .env to enable (e.g. G-XXXXXXXXXX)'}
          `}
        </Script>
      </head>
      <body className="antialiased">
        <WebSiteSchema />
        <OrganizationSchema
          name={BUSINESS.name}
          description={BUSINESS.description}
          url={BUSINESS.url}
          logo={BUSINESS.logo}
          telephone={BUSINESS.phone.primary}
          address={{
            addressLocality: BUSINESS.address.addressLocality,
            addressCountry: BUSINESS.address.addressCountry,
          }}
          sameAs={[
            `https://wa.me/${BUSINESS.phone.primary.replace('+', '')}`,
            BUSINESS.social.tiktok,
            BUSINESS.social.instagram,
          ]}
        />
        <LocalBusinessSchema
          name={BUSINESS.name}
          description={BUSINESS.description}
          telephone={BUSINESS.phone.primary}
          address={{
            streetAddress: BUSINESS.address.streetAddress,
            addressLocality: BUSINESS.address.addressLocality,
            addressRegion: BUSINESS.address.addressRegion,
            postalCode: BUSINESS.address.postalCode,
            addressCountry: BUSINESS.address.addressCountry,
          }}
          geo={{ latitude: BUSINESS.geo.latitude, longitude: BUSINESS.geo.longitude }}
          openingHours={[...BUSINESS.hours.schemaOrg]}
          priceRange={BUSINESS.priceRange}
          image={BUSINESS.logo}
          areaServed={[...BUSINESS.areaServed]}
        />
        <div className="min-h-screen bg-custom-background">
          <Navbar />
          <main className="relative">
            {children}
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </body>
    </html>
  );
}
