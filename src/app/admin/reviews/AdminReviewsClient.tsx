'use client';

import { useState } from 'react';
import type { Review } from '@/lib/reviews';

type Item = Review & { hidden: boolean };

export default function AdminReviewsClient({
  initial,
  token,
}: {
  initial: Item[];
  token: string;
}) {
  const [items, setItems] = useState(initial);
  const [busy, setBusy] = useState<number | null>(null);

  const act = async (id: number, method: 'DELETE' | 'PATCH', hidden?: boolean) => {
    setBusy(id);
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: method === 'PATCH' ? JSON.stringify({ hidden }) : undefined,
      });
      if (!res.ok) throw new Error();
      setItems((list) =>
        method === 'DELETE'
          ? list.filter((r) => r.id !== id)
          : list.map((r) => (r.id === id ? { ...r, hidden: Boolean(hidden) } : r))
      );
    } catch {
      alert('تعذّر تنفيذ العملية.');
    } finally {
      setBusy(null);
    }
  };

  if (items.length === 0) {
    return <p className="text-gray-600">لا توجد تقييمات بعد.</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((r) => (
        <div
          key={r.id}
          className={`border rounded-xl p-5 ${r.hidden ? 'border-gray-200 bg-carpet-cream opacity-70' : 'border-gray-200 bg-white'}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <span className="font-bold text-gray-900">{r.name}</span>
              <span className="text-sm text-gray-500 mr-2">
                {r.location} · {r.service}
              </span>
              <span className="block text-carpet-gold mt-1">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => act(r.id, 'PATCH', !r.hidden)}
                disabled={busy === r.id}
                className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              >
                {r.hidden ? 'إظهار' : 'إخفاء'}
              </button>
              <button
                onClick={() => {
                  if (confirm(`حذف تقييم ${r.name} نهائياً؟`)) act(r.id, 'DELETE');
                }}
                disabled={busy === r.id}
                className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-red-700 text-white hover:opacity-90 disabled:opacity-50"
              >
                حذف
              </button>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{r.body}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(r.createdAt).toLocaleString('ar-SA')}
            {r.hidden && ' · مخفي'}
          </p>
        </div>
      ))}
    </div>
  );
}
