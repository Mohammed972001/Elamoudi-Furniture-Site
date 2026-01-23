import { notFound } from "next/navigation";
import { getProductById, productsDetails } from "@/data/products";
import { Metadata } from "next";
import ProductView from "./ProductView";
import { ProductSchema } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate static params for all products (for SSG optimization)
export async function generateStaticParams() {
  return productsDetails.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

  if (!product) {
    return {
      title: "منتج غير موجود",
      description: "الصفحة المطلوبة غير موجودة"
    };
  }

  return {
    title: `${product.title} | العمودي للمفروشات`,
    description: product.metaDescription,
    keywords: product.keywords?.join(", "),
    alternates: {
      canonical: `/products/${id}`,
    },
    openGraph: {
      title: `${product.title} | العمودي للمفروشات`,
      description: product.metaDescription,
      type: 'website',
      url: `${baseUrl}/products/${id}`,
      images: product.images.slice(0, 4).map((img, index) => ({
        url: img,
        width: 800,
        height: 600,
        alt: `${product.title} - صورة ${index + 1}`,
      })),
      locale: 'ar_SA',
      siteName: 'العمودي للمفروشات',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.metaDescription,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Breadcrumb items
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات", href: "/products" },
    { name: product.title },
  ];

  return (
    <>
      {/* Product Schema with ImageObject for SEO */}
      <ProductSchema
        name={product.title}
        description={product.metaDescription}
        image={product.images}
        sku={product.id}
        brand="العمودي للمفروشات"
        offers={product.price ? {
          price: product.price,
          priceCurrency: 'SAR',
          availability: 'https://schema.org/InStock',
        } : undefined}
      />

      {/* Breadcrumbs with Schema */}
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Product View Component */}
      <ProductView product={product} />
    </>
  );
} 