import { notFound } from "next/navigation";
import { getProductById } from "@/data/products";
import { Metadata } from "next";
import ProductView from "./ProductView";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    return {
      title: "منتج غير موجود",
      description: "الصفحة المطلوبة غير موجودة"
    };
  }

  return {
    title: product.title,
    description: product.metaDescription,
    keywords: product.keywords?.join(", "),
    openGraph: {
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

  return <ProductView product={product} />;
} 