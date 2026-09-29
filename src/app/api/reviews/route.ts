import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import {
  createReview,
  recentCountByIp,
  isReviewsConfigured,
  REVIEW_SERVICES,
} from '@/lib/reviews';

export const runtime = 'nodejs';

const LIMITS = { name: 60, location: 60, body: 900, email: 120 };
const EMAIL = /^[^s@]+@[^s@]+.[^s@]{2,}$/;
const MIN_BODY = 15;
/** Reviews publish immediately, so this cap is the main brake on a flood. */
const MAX_PER_HOUR = 2;

const hashIp = (ip: string) => createHash('sha256').update(`elamoudi:${ip}`).digest('hex').slice(0, 32);

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';

export async function POST(request: Request) {
  if (!isReviewsConfigured()) {
    return NextResponse.json(
      { error: 'نظام التقييمات غير مفعّل حالياً.' },
      { status: 503 }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'طلب غير صالح.' }, { status: 400 });
  }

  // Honeypot: a real person never fills a field they cannot see.
  if (clean(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, LIMITS.name);
  const location = clean(payload.location, LIMITS.location);
  const service = clean(payload.service, 60);
  const body = clean(payload.body, LIMITS.body);
  const email = clean(payload.email, LIMITS.email).toLowerCase();
  const rating = Number(payload.rating);

  if (name.length < 2) {
    return NextResponse.json({ error: 'من فضلك اكتب اسمك.' }, { status: 400 });
  }
  if (location.length < 2) {
    return NextResponse.json({ error: 'من فضلك اكتب الحي أو المدينة.' }, { status: 400 });
  }
  if (!REVIEW_SERVICES.includes(service as (typeof REVIEW_SERVICES)[number])) {
    return NextResponse.json({ error: 'من فضلك اختر الخدمة.' }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'من فضلك اختر تقييماً من 1 إلى 5.' }, { status: 400 });
  }
  if (email && !EMAIL.test(email)) {
    return NextResponse.json({ error: 'البريد الإلكتروني غير صحيح.' }, { status: 400 });
  }
  if (body.length < MIN_BODY) {
    return NextResponse.json(
      { error: 'اكتب تجربتك في جملة على الأقل حتى تفيد غيرك.' },
      { status: 400 }
    );
  }
  if (/https?:\/\/|www\.|<[a-z]/i.test(body)) {
    return NextResponse.json(
      { error: 'لا يمكن إضافة روابط داخل التقييم.' },
      { status: 400 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';
  const ipHash = hashIp(ip);

  try {
    if ((await recentCountByIp(ipHash)) >= MAX_PER_HOUR) {
      return NextResponse.json(
        { error: 'وصلت للحد المسموح من التقييمات. حاول لاحقاً.' },
        { status: 429 }
      );
    }

    await createReview({ name, location, service, rating, body, email, ipHash });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'تعذّر حفظ التقييم. حاول مرة أخرى.' },
      { status: 500 }
    );
  }
}
