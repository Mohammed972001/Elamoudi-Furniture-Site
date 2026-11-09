import React from 'react';
import { FaRulerCombined, FaTruck, FaTools, FaWhatsapp } from 'react-icons/fa';

/**
 * The strip under the hero. It used to be a template SVG promising easy returns, «genuine materials»
 * and guaranteed fast delivery; the owner offers no returns (2026-11-04). These are his own facts
 * from BUSINESS.facts.
 */
const ITEMS = [
  { icon: FaRulerCombined, title: 'معاينة وقياس مجانًا', text: 'داخل الرياض' },
  { icon: FaTruck, title: 'تسليم خلال 1 إلى 3 أيام', text: 'وتكلفة التوصيل حسب المكان' },
  { icon: FaTools, title: 'تركيب بالمتر', text: 'مع ضمان على التركيب' },
  { icon: FaWhatsapp, title: 'عرض سعر على الواتساب', text: 'أرسل صورة المكان' },
];

export default function iconcomponanet() {
  return (
    <div className="w-full border-y border-stone-200 bg-[#efe9df]">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-5 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex flex-col items-center text-center">
            <Icon className="mb-2 h-6 w-6 text-gray-700" aria-hidden />
            <span className="font-semibold text-gray-900">{title}</span>
            <span className="text-sm text-gray-600">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
