'use client';

import { useState } from 'react';
import { REVIEW_SERVICES } from '@/lib/reviews';

const field =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition-colors focus:border-primary';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState<string>(REVIEW_SERVICES[0]);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setStatus('sending');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, email, service, rating, body, website }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'تعذّر إرسال التقييم.');
        setStatus('idle');
        return;
      }
      setStatus('done');
    } catch {
      setError('تعذّر الاتصال. تحقّق من الشبكة وحاول مرة أخرى.');
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl text-primary mb-3">شكراً لك</h2>
        <p className="text-gray-700 leading-relaxed">
          تم نشر تقييمك على الموقع. رأيك يساعد غيرك يختار بثقة.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 grid gap-4 sm:grid-cols-2" noValidate>
      <div>
        <label htmlFor="rv-name" className="block text-sm font-semibold text-gray-900 mb-2">الاسم</label>
        <input id="rv-name" className={field} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} required />
      </div>

      <div>
        <label htmlFor="rv-location" className="block text-sm font-semibold text-gray-900 mb-2">الحي / المدينة</label>
        <input id="rv-location" className={field} value={location} onChange={(e) => setLocation(e.target.value)} maxLength={60} placeholder="مثال: حي النرجس" required />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="rv-email" className="block text-sm font-semibold text-gray-900 mb-2">
          البريد الإلكتروني <span className="font-normal text-gray-500">(اختياري — لا يُنشر)</span>
        </label>
        <input
          id="rv-email"
          type="email"
          dir="ltr"
          autoComplete="email"
          className={field}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={120}
        />
        <p className="text-xs text-gray-500 mt-1.5">
          نستخدمه فقط للتحقق من أنك عميل لدينا، وبعد التحقق تظهر على تقييمك علامة «عميل موثّق».
        </p>
      </div>

      <div>
        <label htmlFor="rv-service" className="block text-sm font-semibold text-gray-900 mb-2">الخدمة</label>
        <select id="rv-service" className={field} value={service} onChange={(e) => setService(e.target.value)}>
          {REVIEW_SERVICES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <span className="block text-sm font-semibold text-gray-900 mb-2">التقييم</span>
        <div className="flex items-center gap-1.5" role="radiogroup" aria-label="التقييم">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} من 5`}
              onClick={() => setRating(n)}
              className={`text-3xl leading-none transition-colors ${n <= rating ? 'text-carpet-gold' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="rv-body" className="block text-sm font-semibold text-gray-900 mb-2">تجربتك</label>
        <textarea
          id="rv-body"
          className={`${field} resize-y min-h-[120px]`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={900}
          placeholder="ما الذي طلبته؟ كيف كان التنفيذ والالتزام بالموعد؟"
          required
        />
        <p className="text-xs text-gray-500 mt-1.5">{body.length} / 900</p>
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="rv-website">لا تملأ هذا الحقل</label>
        <input id="rv-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      {error && (
        <p role="alert" className="sm:col-span-2 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-primary hover:opacity-90 disabled:opacity-60 text-white font-bold rounded-lg px-8 py-4 transition-colors"
        >
          {status === 'sending' ? 'جارٍ الإرسال…' : 'أضف تقييمك'}
        </button>
        <p className="text-center text-sm text-gray-500 mt-3">
          يُنشر تقييمك على الموقع مباشرة. لا تكتب أرقام تواصل أو روابط.
        </p>
      </div>
    </form>
  );
}
