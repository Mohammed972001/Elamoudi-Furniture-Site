import { notFound } from "next/navigation";
import { getProductById, productsDetails } from "@/data/products";
import { getContainerById } from "@/data/containers";
import { Metadata } from "next";
import { pageOpenGraph } from "@/constants/openGraph";
import ProductView from "./ProductView";
import { ProductSchema } from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ContainerSection from "@/components/ui/ContainerSection";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CARPET_IDS = new Set(["mokite", "turky-mshager", "mosque-carpets", "office-flooring", "vinyl-mosque"]);
const FURNITURE_IDS = new Set(["modern-sofas", "classic-majlis", "curtains"]);

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
    title: product.title,
    description: product.metaDescription,
    alternates: {
      canonical: `/products/${id}`,
    },
    // A product without photos keeps the site-wide share image.
    openGraph: pageOpenGraph(
      `/products/${id}`,
      product.title,
      product.metaDescription,
      product.images.length > 0
        ? product.images.slice(0, 4).map((img, index) => ({
            url: img,
            width: 800,
            height: 600,
            alt: `${product.title} - صورة ${index + 1}`,
          }))
        : undefined,
    ),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // Carpet and furniture products sit under their hub pages, so the trail (and its
  // BreadcrumbList) points Google at /carpets and /furniture. The last item is the short name:
  // titles carry an SEO tail after " | ".
  const parent = CARPET_IDS.has(product.id)
    ? { name: "السجاد والموكيت", href: "/carpets" }
    : FURNITURE_IDS.has(product.id)
      ? { name: "كنب ومجالس وستائر", href: "/furniture" }
      : { name: "المنتجات", href: "/products" };
  const breadcrumbItems = [
    { name: "الرئيسية", href: "/" },
    parent,
    { name: product.title.split("|")[0].trim() },
  ];

  const categorysMain = getContainerById(product.related ?? "categorys-main");

  return (
    <>
      {/* Product Schema with ImageObject for SEO */}
      <ProductSchema
        id={product.id}
        price={product.price}
        name={product.title}
        description={product.metaDescription}
        image={product.images}
      />

      {/* Breadcrumbs with Schema */}
      {/* The navbar is fixed only from md up; on phones it is in the flow,
          so the 80px clearance there was just an empty band. */}
      <div className="pt-2 md:pt-20 px-4 max-w-7xl mx-auto">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Product View Component */}
      <ProductView product={product} />

      {/* Categories Section */}
      {categorysMain && (
        <div className="py-12">
          <ContainerSection
            section={categorysMain}
            className=""
            mobileCols="grid-cols-2"
          />
        </div>
      )}
    </>
  );
} 