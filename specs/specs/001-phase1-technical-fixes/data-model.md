# Data Model: Phase 1 — Critical Technical SEO Fixes

**Feature**: `001-phase1-technical-fixes`
**Date**: 2026-04-27

This feature introduces **one** new module-level entity: the `BUSINESS`
constant in `src/constants/business.ts`. No database, no runtime
state, no transitions. The entity is consumed exclusively at compile
time / SSR time by metadata exports and JSON-LD components.

---

## Entity: `BUSINESS`

**Path**: `src/constants/business.ts`
**Kind**: `as const` object literal exported by name.
**Visibility**: imported across `src/`, never imported by anything
under `public/` or build scripts.
**Mutability**: `as const` (deeply immutable).

### Fields

| Field | Type | Required | Source value | Used by |
|---|---|---|---|---|
| `name` | `string` | Yes | `'العمودي للمفروشات'` | OrganizationSchema, LocalBusinessSchema, WebSiteSchema (`name`), OG `siteName` |
| `legalName` | `string` | Yes | `'العمودي للأرضيات والمفروشات'` | reserved for `Organization.legalName` if we add it later |
| `description` | `string` | Yes | `'متجر متخصص في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد وأرضيات عالية الجودة بتوصيل وتركيب مجاني.'` | OrganizationSchema, LocalBusinessSchema |
| `url` | `string` (absolute) | Yes | `'https://www.elamoudifurniture.com'` | `OrganizationSchema.url`, contracts |
| `logo` | `string` (path) | Yes | `'/favicon.svg'` | OrganizationSchema, LocalBusinessSchema |
| `phone.primary` | `string` (E.164) | Yes | `'+966558352924'` | every `telephone` field |
| `phone.waMessage` | `string` | Yes | `'مرحباً، أريد الاستفسار عن منتجاتكم'` | default WhatsApp message |
| `phone.whatsappLink` | `string` (URL) | Yes (getter) | `https://wa.me/${primary.replace('+','')}?text=${encodeURIComponent(waMessage)}` | every WhatsApp CTA |
| `phone.telLink` | `string` (URL) | Yes (getter) | `tel:${primary}` | every phone CTA |
| `phone.displayIntl` | `string` (display) | Yes (getter) | `'+966 55 835 2924'` | visible phone text |
| `phone.displayLocal` | `string` (display) | Yes (getter) | `'0558352924'` | visible phone text |
| `address.streetAddress` | `string` | Yes | `'حي العزيزية، شارع عبدالله بن صالح'` | every `PostalAddress.streetAddress` |
| `address.addressLocality` | `string` | Yes | `'الرياض'` | every `PostalAddress.addressLocality` |
| `address.addressRegion` | `string` | Yes | `'منطقة الرياض'` | every `PostalAddress.addressRegion` |
| `address.postalCode` | `string` | Yes | `'12345'` | every `PostalAddress.postalCode` |
| `address.addressCountry` | `string` (ISO 3166-1 α-2) | Yes | `'SA'` | every `PostalAddress.addressCountry` |
| `address.addressCountryName` | `string` | Yes | `'المملكة العربية السعودية'` | visible address text |
| `address.full` | `string` | Yes | `'حي العزيزية، شارع عبدالله بن صالح، الرياض، المملكة العربية السعودية'` | visible address text |
| `geo.latitude` | `number` | Yes | `24.597427` | every `GeoCoordinates.latitude` |
| `geo.longitude` | `number` | Yes | `46.730596` | every `GeoCoordinates.longitude` |
| `geo.googleMapsUrl` | `string` (URL) | Yes | `'https://maps.google.com/?q=24.597427,46.730596'` | "View on Google Maps" CTA |
| `hours.schemaOrg` | `string[]` | Yes | `['Mo-Th 09:00-22:00', 'Fr 14:00-22:00', 'Sa-Su 09:00-22:00']` | `LocalBusinessSchema.openingHours` |
| `hours.display.sunThu` | `string` | Yes | `'الأحد - الخميس: 9:00 ص - 10:00 م'` | visible hours text |
| `hours.display.friday` | `string` | Yes | `'الجمعة: 2:00 م - 10:00 م'` | visible hours text |
| `hours.display.saturday` | `string` | Yes | `'السبت: 9:00 ص - 10:00 م'` | visible hours text |
| `social.tiktok` | `string` (URL) | Yes | `'https://www.tiktok.com/@elamoudi_furniture'` | OrganizationSchema `sameAs` |
| `social.instagram` | `string` (URL) | Yes | `'https://www.instagram.com/elamoudi_furniture'` | OrganizationSchema `sameAs` |
| `social.*` (more) | `string` (URL) | Optional, additive | as profiles are claimed (see SEO-SPEC-OFFPAGE §3) | OrganizationSchema `sameAs` |
| `areaServed` | `readonly ['الرياض', 'المملكة العربية السعودية']` | Yes | as listed | LocalBusinessSchema `areaServed` |
| `priceRange` | `string` | Yes | `'$$'` | LocalBusinessSchema `priceRange` |

### Validation rules

- **VR-1**: `phone.primary` MUST start with `+` and contain only digits after the `+`. Tested: starts with `'+9665'` (Saudi mobile prefix).
- **VR-2**: `geo.latitude` MUST be ∈ [16.0, 33.0] (Saudi bounding box), `geo.longitude` MUST be ∈ [34.0, 56.0].
- **VR-3**: `address.addressCountry` MUST be exactly `'SA'`.
- **VR-4**: `hours.schemaOrg` MUST be parsable by the existing logic in `src/components/seo/JsonLd.tsx` `LocalBusinessSchema` lines 90-105 (split on space, then on `-`, then dayMap lookup). The Implementation Agent MUST run V-RRT against the deployed page to confirm.
- **VR-5**: Every URL in `url`, `geo.googleMapsUrl`, `social.*` MUST be absolute (`https://`).
- **VR-6**: `phone.waMessage` MUST be plain text — no embedded `<` or `&` characters that would break URL encoding.

### Forbidden values

- The deprecated phone number `+966567746257` MUST NOT appear in
  `phone.primary` or anywhere else in the file.
- The deprecated address fragment `'طريق الملك فهد'` MUST NOT appear in
  any `address.*` field.

### State transitions

None. The constant is immutable per-deploy.

### Lifecycle

- **Created**: in this feature (US-1).
- **Consumed**: from this feature onward, by every page or component
  that needs NAP. New consumers added in features 002+ MUST import
  rather than hardcode.
- **Amended**: by Constitution amendment process if the address /
  phone changes (a real-world business event).

---

## Existing entities referenced (READ-ONLY in this feature)

The following types exist already and are **not** modified in this
feature; they are listed here so the Implementation Agent has the
complete picture.

### `ProductDetails` (in `src/data/products.ts`)

Fields used by Phase 1: `id`, `title`, `metaDescription`, `keywords`,
`images`, `price?`, `detailedDescription`. **No values changed in
Phase 1** — only the `detailedDescription` field is **audited** (US-5,
FR-502) for literal `\\n\\n` escape sequences which must be replaced
with real newline characters.

### `ContainerSection` (in `src/data/containers.ts`)

Used by `/carpets`, `/decor`, `/products`. **Not modified.**

---

## TypeScript signatures (informative — not the canonical implementation)

The canonical implementation is `SEO-SPEC-TECHNICAL.md §5.1`. Below
illustrates the type for clarity:

```ts
export const BUSINESS = {
  name: 'العمودي للمفروشات',
  legalName: 'العمودي للأرضيات والمفروشات',
  description: 'متجر متخصص في موكيت وأرضيات وباركيه وفينيل في الرياض. موكيت مساجد وأرضيات عالية الجودة بتوصيل وتركيب مجاني.',
  url: 'https://www.elamoudifurniture.com',
  logo: '/favicon.svg',

  phone: {
    primary: '+966558352924',
    waMessage: 'مرحباً، أريد الاستفسار عن منتجاتكم',
    get whatsappLink() {
      return `https://wa.me/${this.primary.replace('+', '')}?text=${encodeURIComponent(this.waMessage)}`;
    },
    get telLink() { return `tel:${this.primary}`; },
    get displayIntl() { return '+966 55 835 2924'; },
    get displayLocal() { return '0558352924'; },
  },

  address: {
    streetAddress: 'حي العزيزية، شارع عبدالله بن صالح',
    addressLocality: 'الرياض',
    addressRegion: 'منطقة الرياض',
    postalCode: '12345',
    addressCountry: 'SA',
    addressCountryName: 'المملكة العربية السعودية',
    full: 'حي العزيزية، شارع عبدالله بن صالح، الرياض، المملكة العربية السعودية',
  },

  geo: {
    latitude: 24.597427,
    longitude: 46.730596,
    googleMapsUrl: 'https://maps.google.com/?q=24.597427,46.730596',
  },

  hours: {
    schemaOrg: ['Mo-Th 09:00-22:00', 'Fr 14:00-22:00', 'Sa-Su 09:00-22:00'],
    display: {
      sunThu: 'الأحد - الخميس: 9:00 ص - 10:00 م',
      friday: 'الجمعة: 2:00 م - 10:00 م',
      saturday: 'السبت: 9:00 ص - 10:00 م',
    },
  },

  social: {
    tiktok: 'https://www.tiktok.com/@elamoudi_furniture',
    instagram: 'https://www.instagram.com/elamoudi_furniture',
  },

  areaServed: ['الرياض', 'المملكة العربية السعودية'],
  priceRange: '$$',
} as const;
```

> ⚠ The Implementation Agent MUST follow the canonical implementation
> in `SEO-SPEC-TECHNICAL.md §5.1` byte-for-byte. The block above is
> illustrative.
