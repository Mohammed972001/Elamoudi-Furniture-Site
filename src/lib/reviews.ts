import { neon } from '@neondatabase/serverless';

export interface Review {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  body: string;
  /** Set by the owner after confirming the reviewer is a real customer. */
  verified: boolean;
  createdAt: string;
}

/** Admin-only view of a review: the reviewer's email is never shown publicly. */
export type AdminReview = Review & { hidden: boolean; email: string | null };

/** Product/service options a reviewer can pick — kept in sync with the catalogue. */
export const REVIEW_SERVICES = [
  'موكيت مساجد',
  'فينيل مساجد',
  'موكيت مكاتب',
  'موكيت منازل',
  'موكيت تركي مشجر',
  'فينيل رول',
  'باركيه',
  'باركيه ضد الماء',
  'أرضيات مستشفيات',
  'عشب صناعي',
  'تنسيق حدائق',
  'ستائر',
  'ديكور',
  'خدمة أخرى',
] as const;

export const isReviewsConfigured = () => Boolean(process.env.DATABASE_URL);

const sql = () => {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return neon(url);
};

let ensured = false;

/**
 * Creates the table on first use. Cheap enough at this scale to run lazily
 * rather than carry a migration toolchain for one table.
 */
async function ensureTable() {
  if (ensured) return;
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      name        TEXT        NOT NULL,
      location    TEXT        NOT NULL,
      service     TEXT        NOT NULL,
      rating      SMALLINT    NOT NULL CHECK (rating BETWEEN 1 AND 5),
      body        TEXT        NOT NULL,
      hidden      BOOLEAN     NOT NULL DEFAULT FALSE,
      ip_hash     TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Added after launch — ADD COLUMN IF NOT EXISTS keeps existing tables working.
  await db`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS email TEXT`;
  await db`ALTER TABLE reviews ADD COLUMN IF NOT EXISTS verified BOOLEAN NOT NULL DEFAULT FALSE`;
  ensured = true;
}

type Row = {
  id: number;
  name: string;
  location: string;
  service: string;
  rating: number;
  body: string;
  verified: boolean;
  created_at: string | Date;
};

const toReview = (r: Row): Review => ({
  id: r.id,
  name: r.name,
  location: r.location,
  service: r.service,
  rating: r.rating,
  body: r.body,
  verified: r.verified,
  createdAt: new Date(r.created_at).toISOString(),
});

/** Visible reviews, newest first. Returns [] when the DB is not configured yet. */
export async function listReviews(limit = 24): Promise<Review[]> {
  if (!isReviewsConfigured()) return [];
  try {
    await ensureTable();
    const db = sql();
    const rows = (await db`
      SELECT id, name, location, service, rating, body, verified, created_at
      FROM reviews
      WHERE hidden = FALSE
      ORDER BY created_at DESC
      LIMIT ${limit}
    `) as Row[];
    return rows.map(toReview);
  } catch {
    // A reviews outage must never take the page down with it.
    return [];
  }
}

/** Everything, including hidden — for the admin view. */
export async function listAllReviews(): Promise<AdminReview[]> {
  await ensureTable();
  const db = sql();
  const rows = (await db`
    SELECT id, name, location, service, rating, body, verified, hidden, email, created_at
    FROM reviews
    ORDER BY created_at DESC
  `) as (Row & { hidden: boolean; email: string | null })[];
  return rows.map((r) => ({ ...toReview(r), hidden: r.hidden, email: r.email }));
}

export async function createReview(input: {
  name: string;
  location: string;
  service: string;
  rating: number;
  body: string;
  email?: string;
  ipHash?: string;
}) {
  await ensureTable();
  const db = sql();
  await db`
    INSERT INTO reviews (name, location, service, rating, body, email, ip_hash)
    VALUES (${input.name}, ${input.location}, ${input.service}, ${input.rating}, ${input.body}, ${input.email || null}, ${input.ipHash ?? null})
  `;
}

export async function deleteReview(id: number) {
  await ensureTable();
  const db = sql();
  await db`DELETE FROM reviews WHERE id = ${id}`;
}

export async function setReviewHidden(id: number, hidden: boolean) {
  await ensureTable();
  const db = sql();
  await db`UPDATE reviews SET hidden = ${hidden} WHERE id = ${id}`;
}

export async function setReviewVerified(id: number, verified: boolean) {
  await ensureTable();
  const db = sql();
  await db`UPDATE reviews SET verified = ${verified} WHERE id = ${id}`;
}

/** Review date for display, e.g. «٢٩ سبتمبر ٢٠٢٦». */
export const formatReviewDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ar-SA-u-ca-gregory', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

/** How many reviews the same submitter left in the last hour. */
export async function recentCountByIp(ipHash: string): Promise<number> {
  await ensureTable();
  const db = sql();
  const rows = (await db`
    SELECT COUNT(*)::int AS n FROM reviews
    WHERE ip_hash = ${ipHash} AND created_at > NOW() - INTERVAL '1 hour'
  `) as { n: number }[];
  return rows[0]?.n ?? 0;
}

export function aggregate(reviews: Review[]) {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return {
    ratingValue: Math.round((total / reviews.length) * 10) / 10,
    reviewCount: reviews.length,
  };
}
