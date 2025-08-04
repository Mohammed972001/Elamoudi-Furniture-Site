import type { Metadata } from "next";
import { Cairo } from "next/font/google";
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
  title: "العمودي للمفروشات - أفضل أنواع السجاد والموكيت",
  description: "متجر العمودي للمفروشات للسجاد والموكيت والمفروشات المنزلية. أجود الأنواع وأفضل الأسعار",
  keywords: "سجاد، موكيت، مفروشات، ستائر، ركنيات، حديقة منزلية",
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
