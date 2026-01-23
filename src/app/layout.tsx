import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "../styles/fonts.css";
import Navbar from "@/components/navbar/Navbar";
import type { RootLayoutProps } from "@/types";
import Footer from "@/components/ui/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

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
    default: "العمودي للمفروشات | موكيت وسجاد وأرضيات في الرياض",
    template: "%s | العمودي للمفروشات",
  },
  description: "العمودي للمفروشات - متخصصون في موكيت وسجاد وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد، سجاد فاخر، أرضيات عالية الجودة. توصيل وتركيب مجاني.",
  keywords: [
    // الكلمات الرئيسية
    "العمودي للمفروشات",
    "موكيت",
    "سجاد",
    "مفروشات",
    "أرضيات",
    "الرياض",
    // تركيبات الكلمات
    "موكيت الرياض",
    "سجاد الرياض",
    "مفروشات الرياض",
    "أرضيات الرياض",
    "موكيت مساجد",
    "سجاد مساجد",
    "باركيه",
    "فينيل",
    "موكيت منازل",
    "سجاد فاخر",
    "أرضيات خشبية",
    "تركيب موكيت",
    "تركيب سجاد",
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
    title: "العمودي للمفروشات | موكيت وسجاد وأرضيات في الرياض",
    description: "متخصصون في موكيت وسجاد وأرضيات وباركيه في الرياض. موكيت مساجد، سجاد فاخر، توصيل وتركيب مجاني.",
    type: "website",
    locale: "ar_SA",
    url: siteUrl,
    siteName: "العمودي للمفروشات",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'العمودي للمفروشات - موكيت وسجاد وأرضيات',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "العمودي للمفروشات | موكيت وسجاد وأرضيات في الرياض",
    description: "متخصصون في موكيت وسجاد وأرضيات في الرياض. توصيل وتركيب مجاني.",
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
    icon: '/WhatsApp.jpeg',
    apple: '/WhatsApp.jpeg',
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
        {/* Google tag (gtag.js) */}
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
          `}
        </Script>
      </head>
      <body className="antialiased">
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
