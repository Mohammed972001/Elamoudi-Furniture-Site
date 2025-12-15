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

// Metadata configuration
export const metadata: Metadata = {
  title: "العمودي للمفروشات الرياض - سجاد وموكيت ومفروشات منزلية",
  description:
    "العمودي للمفروشات في الرياض متخصص في سجاد الرياض، موكيت الرياض، موكيت مساجد، سجاد مساجد في الرياض، ومفروشات منزلية عالية الجودة بأسعار تنافسية.",
  keywords:
    "سجاد الرياض, سجاد في الرياض, موكيت الرياض, موكيت في الرياض, موكيت ومفروشات في الرياض, مفروشات الرياض, موكيت مساجد, سجاد مساجد في الرياض, سجاد مساجد الرياض, أرضيات الرياض, مفروشات ومساجد",
  authors: [{ name: "العمودي للمفروشات" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "العمودي للمفروشات - أفضل أنواع السجاد والموكيت",
    description: "متجر العمودي للمفروشات للسجاد والموكيت والمفروشات المنزلية. أجود الأنواع وأفضل الأسعار",
    type: "website",
    locale: "ar_SA",
  },
  icons: {
    icon: '/NavBar/NavbarIcone.svg',
  },
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
          <Footer/>
          <FloatingButtons />
        </div>
      </body>
    </html>
  );
}
