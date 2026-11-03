import { BUSINESS } from '@/constants/business';
import { productsDetails } from '@/data/products';

export const dynamic = 'force-static';

// Stay out until the owner confirms he still sells them (owner-request.md, question 11).
const UNCONFIRMED = new Set(['shlal', 'planets']);

const firstSentence = (text: string) => text.split(/[.!؟]/)[0].trim();

export function GET() {
  const { phone, address, hours, facts, name, description, url } = BUSINESS;

  const products = productsDetails
    .filter((product) => !UNCONFIRMED.has(product.id))
    .map((product) => {
      const title = product.title.split('|')[0].trim();
      return `- [${title}](${url}/products/${product.id}): ${firstSentence(product.description)}`;
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
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
