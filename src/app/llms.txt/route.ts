import { BUSINESS } from '@/constants/business';
import { productsDetails } from '@/data/products';

export const dynamic = 'force-static';

const firstSentence = (text: string) => text.split(/[.!؟]/)[0].trim();

export function GET() {
  const { phone, address, hours, facts, name, description, url } = BUSINESS;

  const products = productsDetails.map((product) => {
    const title = product.title.split('|')[0].trim();
    const price = product.price !== undefined ? ` يبدأ من ${product.price} ريال للمتر المربع.` : '';
    return `- [${title}](${url}/products/${product.id}): ${firstSentence(product.answer ?? product.description)}.${price}`;
  });

  const body = [
    `# ${name} — ${address.addressLocality}`,
    `> ${description}`,
    '',
    '## التواصل',
    `- هاتف: ${phone.displayLocal}`,
    `- واتساب: https://wa.me/${phone.primary.replace('+', '')}`,
    `- العنوان: ${address.full}`,
    `- المواعيد: ${hours.display.sunThu}، ${hours.display.friday}، ${hours.display.saturday}`,
    '',
    '## معلومات مؤكدة من المحل',
    ...facts.map((fact) => `- ${fact.text}`),
    '',
    '## المنتجات',
    ...products,
    `- [كنب وغرف نوم وستائر](${url}/furniture): نبيع الكنب والمجالس وغرف النوم والستائر إلى جانب الأرضيات.`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
