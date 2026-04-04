import { NextResponse } from 'next/server';
import { productsDetails } from '@/data/products';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elamoudifurniture.com';

  const xmlStr = `<?xml version="1.0"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>العمودي للمفروشات</title>
    <link>${baseUrl}</link>
    <description>متجر متخصص في موكيت وأرضيات وباركيه في الرياض.</description>
    ${productsDetails
      .map((product) => {
        const productLink = `${baseUrl}/products/${product.id}`;
        const imageLink = product.images?.[0]
          ? `${baseUrl}${product.images[0]}`
          : `${baseUrl}/WhatsApp.jpeg`;
        
        return `
    <item>
      <g:id>${product.id}</g:id>
      <g:title><![CDATA[${product.title}]]></g:title>
      <g:description><![CDATA[${product.description}]]></g:description>
      <g:link>${productLink}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${product.price} SAR</g:price>
      <g:brand>العمودي للمفروشات</g:brand>
      <g:condition>new</g:condition>
      <g:shipping>
        <g:country>SA</g:country>
        <g:service>Standard</g:service>
        <g:price>0 SAR</g:price>
      </g:shipping>
    </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(xmlStr, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      // Add caching if desired
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
