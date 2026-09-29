import { NextResponse } from 'next/server';
import { deleteReview, setReviewHidden, isReviewsConfigured } from '@/lib/reviews';

export const runtime = 'nodejs';

/**
 * Owner-only. Guarded by a shared secret in ADMIN_TOKEN rather than a login
 * system — one owner, one device, and a password flow would be more surface
 * than this needs. Compared in constant-ish time via length check first.
 */
function authorised(request: Request) {
  const expected = process.env.ADMIN_TOKEN;
  if (!expected) return false;
  const provided =
    request.headers.get('x-admin-token') ??
    new URL(request.url).searchParams.get('token') ??
    '';
  return provided.length === expected.length && provided === expected;
}

export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isReviewsConfigured()) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }
  if (!authorised(request)) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }

  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'bad id' }, { status: 400 });
  }

  await deleteReview(id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isReviewsConfigured()) {
    return NextResponse.json({ error: 'not configured' }, { status: 503 });
  }
  if (!authorised(request)) {
    return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  }

  const id = Number((await ctx.params).id);
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: 'bad id' }, { status: 400 });
  }

  const { hidden } = await request.json();
  await setReviewHidden(id, Boolean(hidden));
  return NextResponse.json({ ok: true });
}
