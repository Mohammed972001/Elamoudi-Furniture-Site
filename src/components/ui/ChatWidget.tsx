"use client";

// Chat assistant widget (from the client-site-deploy skill template), in the site colours.
// Talks to POST /api/chat (src/app/api/chat/route.ts → src/lib/chat).
import { useEffect, useRef, useState } from "react";
import { BUSINESS } from "@/constants/business";

const WA_GENERAL = BUSINESS.phone.whatsappLink;

const TEXT = {
  title: "مساعد العمودي للمفروشات",
  greeting: "أهلًا بك في العمودي للمفروشات. اسألني عن الموكيت والسجاد والأرضيات، أو الديكور وتنسيق الحدائق.",
  suggestions: ["أي موكيت يناسب المجلس؟", "عندكم عشب صناعي؟", "كيف أطلب عرض سعر؟"],
};

const THEME = {
  launcher: "bg-primary text-white hover:bg-carpet-brown",
  header: "bg-primary text-white",
  panel: "border-carpet-gold/40 bg-white",
  body: "bg-custom-background",
  bot: "bg-white text-neutral-900",
  user: "bg-carpet-brown text-white",
  chip: "border-carpet-gold/60 bg-white text-neutral-900 hover:border-primary hover:text-primary",
  link: "text-carpet-brown",
  send: "bg-primary text-white hover:bg-carpet-brown",
  input: "border-carpet-gold/50 text-neutral-900 focus:border-primary",
  footer: "bg-carpet-cream text-neutral-600",
};

type Turn = { role: "user" | "assistant"; content: string };
const URL_RE = /(https?:\/\/[^\s)،]+)/g;
const IS_URL = /^https?:\/\//;

function Linkified({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_RE).map((part, i) =>
        IS_URL.test(part) ? (
          <a key={i} href={part} className={`break-all underline underline-offset-2 ${THEME.link}`}>
            {part.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </svg>
  );
}

export default function ChatWidget({ panelPosition = "bottom-24 end-5" }: { panelPosition?: string }) {
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;
    const next: Turn[] = [...turns, { role: "user", content: question }];
    setTurns(next);
    setInput("");
    setBusy(true);
    setFailed(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string };
      if (!res.ok || !data.reply) throw new Error(String(res.status));
      setTurns([...next, { role: "assistant", content: data.reply }]);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "إغلاق المساعد" : "اسأل المساعد"}
        aria-expanded={open}
        aria-controls="site-chat"
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-colors ${THEME.launcher}`}
      >
        <ChatIcon />
      </button>

      {open && (
        <section
          id="site-chat"
          aria-label={TEXT.title}
          className={`fixed z-[61] flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border shadow-2xl ${panelPosition} ${THEME.panel}`}
        >
          <header className={`flex items-center justify-between px-4 py-3 ${THEME.header}`}>
            <div>
              <p className="text-sm font-semibold">{TEXT.title}</p>
              <p className="text-xs opacity-75">ردود آلية من معلومات الموقع</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="إغلاق" className="rounded-full px-2 text-xl leading-none opacity-80 hover:opacity-100">
              ×
            </button>
          </header>

          <div ref={listRef} className={`flex-1 space-y-3 overflow-y-auto p-4 text-sm leading-relaxed ${THEME.body}`} aria-live="polite">
            <p className={`max-w-[85%] rounded-2xl rounded-ss-sm px-3 py-2 shadow-sm ${THEME.bot}`}>{TEXT.greeting}</p>
            {turns.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {TEXT.suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className={`rounded-full border px-3 py-1.5 text-xs ${THEME.chip}`}>
                    {s}
                  </button>
                ))}
              </div>
            )}
            {turns.map((t, i) =>
              t.role === "user" ? (
                <p key={i} className={`ms-auto max-w-[85%] whitespace-pre-line rounded-2xl rounded-se-sm px-3 py-2 ${THEME.user}`}>
                  {t.content}
                </p>
              ) : (
                <p key={i} className={`max-w-[85%] whitespace-pre-line rounded-2xl rounded-ss-sm px-3 py-2 shadow-sm ${THEME.bot}`}>
                  <Linkified text={t.content} />
                </p>
              ),
            )}
            {busy && <p className={`w-fit rounded-2xl px-3 py-2 opacity-70 shadow-sm ${THEME.bot}`}>يكتب…</p>}
            {failed && (
              <p className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${THEME.bot}`}>
                تعذّر الرد الآن.{" "}
                <a href={WA_GENERAL} target="_blank" rel="noopener" className={`underline underline-offset-2 ${THEME.link}`}>
                  كلّمنا على الواتساب
                </a>
              </p>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className={`flex items-center gap-2 border-t p-3 ${THEME.panel}`}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder="اكتب سؤالك…"
              aria-label="سؤالك"
              className={`min-w-0 flex-1 rounded-full border bg-transparent px-4 py-2 text-sm outline-none ${THEME.input}`}
            />
            <button type="submit" disabled={busy || !input.trim()} className={`rounded-full px-4 py-2 text-sm font-semibold disabled:opacity-40 ${THEME.send}`}>
              إرسال
            </button>
          </form>
          <a href={WA_GENERAL} target="_blank" rel="noopener" className={`py-2 text-center text-xs hover:underline ${THEME.footer}`}>
            لعرض سعر دقيق كلّمنا على الواتساب
          </a>
        </section>
      )}
    </>
  );
}
