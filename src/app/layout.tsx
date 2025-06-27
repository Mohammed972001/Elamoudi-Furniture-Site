import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import type { RootLayoutProps } from "@/types";

// Font configuration
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-cairo",
});

// Metadata configuration
export const metadata: Metadata = {
  title: "بيت السجاد - أفضل أنواع السجاد والموكيت",
  description: "متجر بيت السجاد للسجاد والموكيت والمفروشات المنزلية. أجود الأنواع وأفضل الأسعار",
  keywords: "سجاد، موكيت، مفروشات، ستائر، ركنيات، حديقة منزلية",
  authors: [{ name: "بيت السجاد" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "بيت السجاد - أفضل أنواع السجاد والموكيت",
    description: "متجر بيت السجاد للسجاد والموكيت والمفروشات المنزلية. أجود الأنواع وأفضل الأسعار",
    type: "website",
    locale: "ar_EG",
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
        </div>
      </body>
    </html>
  );
}
