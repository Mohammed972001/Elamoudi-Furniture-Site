// What the chat assistant is allowed to know: built from the same data files the pages
// render, so a fact changed there reaches the assistant on the next deploy. Product prices
// in src/data/products.ts are left out on purpose: not confirmed as the shop's real figures.
import { BUSINESS } from "@/constants/business";
import { containerSections } from "@/data/containers";
import { productsDetails } from "@/data/products";
import type { ChatSite } from "./core";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || BUSINESS.url;

const lines: string[] = [
  `# ${BUSINESS.name}`,
  `الهاتف وواتساب: ${BUSINESS.phone.displayLocal}`,
  `العنوان: ${BUSINESS.address.full}`,
  `ساعات العمل: ${Object.values(BUSINESS.hours.display).join(" · ")}`,
  "",
  "## المنتجات",
];

for (const p of productsDetails) {
  lines.push(
    `### ${p.title} — ${SITE_URL}/products/${p.id}`,
    p.description,
    p.detailedDescription ?? "",
    ...(p.features ?? []).map((f) => `- ${f}`),
    "",
  );
}

lines.push("## الأقسام");
for (const s of containerSections) {
  lines.push(`### ${s.title}`, ...s.items.map((i) => `- ${i.name}${i.description ? `: ${i.description}` : ""}${i.href ? ` — ${SITE_URL}${i.href}` : ""}`));
}

lines.push(
  "",
  "## صفحات أخرى",
  `- كل المنتجات: ${SITE_URL}/products`,
  `- الموكيت والسجاد: ${SITE_URL}/carpets`,
  `- الديكور والستائر: ${SITE_URL}/decor`,
  `- تنسيق الحدائق: ${SITE_URL}/garden`,
  `- التواصل: ${SITE_URL}/contact`,
);

export const CHAT_SITE: ChatSite = {
  name: BUSINESS.name,
  niche: "مفروشات منزلية في الرياض: موكيت وسجاد وأرضيات وديكور وتنسيق حدائق",
  phone: BUSINESS.phone.displayLocal,
  whatsappUrl: BUSINESS.phone.whatsappLink,
  knowledge: lines.join("\n"),
};
