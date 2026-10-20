import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Video, Zap, ShieldCheck, Copy, Check, Clock } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, SpotlightCard } from '../components/ui/Modern';
import Seo from '../components/Seo';
import BookDemo from '../components/BookDemo';

const CHANNELS = [
  { icon: Mail,   label: 'Email',  val: 'michael@areaconnect.pro', sub: 'Reply within 2 business hours', href: 'mailto:michael@areaconnect.pro', copy: 'michael@areaconnect.pro', color: 'text-brand-500',  glow: 'rgba(16,185,129,.12)' },
  { icon: Phone,  label: 'Phone',  val: '+234 708 922 4054',       sub: 'Mon – Fri, 9AM – 6PM WAT',      href: 'tel:+2347089224054',             copy: '+2347089224054',          color: 'text-indigo-500', glow: 'rgba(99,102,241,.12)' },
  { icon: MapPin, label: 'Office', val: 'Lagos, Nigeria',          sub: 'Serving estates nationwide',                                                                                color: 'text-amber-500',  glow: 'rgba(245,158,11,.14)' },
];

const TOPICS = ['Sales inquiry', 'Technical support', 'Billing question', 'Partnership', 'Press / media', 'Other'];

function ChannelCard({ c, i }) {
  const [copied, setCopied] = useState(false);
  const copy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(c.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked — the link still works */ }
  };
  const Tag = c.href ? 'a' : 'div';
  return (
    <Reveal delay={i * 80} className="h-full">
      <SpotlightCard glow={c.glow} className="h-full rounded-3xl bg-white border border-slate-200/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
        <Tag href={c.href} className="flex h-full items-center gap-4 p-5">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <c.icon size={18} className={c.color} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{c.label}</div>
            <div className="text-sm font-semibold text-slate-900 truncate">{c.val}</div>
            <div className="text-xs text-slate-400">{c.sub}</div>
          </div>
          {c.copy && (
            <button type="button" onClick={copy} aria-label={`Copy ${c.label.toLowerCase()}`}
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${copied ? 'bg-brand-500 text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </Tag>
      </SpotlightCard>
    </Reveal>
  );
}

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const API = import.meta.env.VITE_API_URL || 'https://areaconnectapi-production.up.railway.app/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const label = 'block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 mb-2';
  const input = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 transition-all';

  return (
    <div className="overflow-x-hidden">
      <Seo
        title="Contact Us — Book an AreaConnect Demo"
        description="Book a 30-minute Google Meet demo of AreaConnect, or reach the team by email or phone. We reply within a few hours on working days."
        path="/contact"
        keywords="AreaConnect contact, estate management demo Nigeria, book demo, estate software support"
      />

      {/* ── HERO + BOOKING ───────────────────────────────────────────── */}
      <section id="book-demo" className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 scroll-mt-16">
        <HeroBackdrop />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-end mb-10 sm:mb-12 px-1">
            <div className="text-center lg:text-left">
              <Reveal><Pill badge="Live">Demos running this week</Pill></Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                  See AreaConnect{' '}
                  <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">live.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                  Pick a slot for a 30-minute Google Meet. The invite lands in your inbox the moment you book.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5"><Video size={13} className="text-brand-500" /> Google Meet</span>
                  <span className="inline-flex items-center gap-1.5"><Zap size={13} className="text-brand-500" /> Instant confirmation</span>
                  <span className="inline-flex items-center gap-1.5"><ShieldCheck size={13} className="text-brand-500" /> No commitment</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="relative mx-auto lg:ml-auto w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-400/25 to-indigo-400/20 blur-2xl rounded-full" />
                <div className="relative flex items-center gap-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-xl shadow-slate-900/10 p-4">
                  <div className="relative flex-shrink-0">
                    <img src="/team/michael-orizu.jpg" alt="Michael Orizu"
                      className="w-16 h-16 rounded-2xl object-cover object-[50%_15%]" />
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-500 ring-2 ring-white" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">You'll meet</div>
                    <div className="text-sm font-semibold text-slate-900">Michael Orizu</div>
                    <div className="text-xs text-slate-500">Founder · walks you through every app</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <BookDemo />
          </Reveal>
        </div>
      </section>

      {/* ── CHANNELS ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <Reveal><Eyebrow>Rather talk directly?</Eyebrow></Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-3 sm:gap-4">
            {CHANNELS.map((c, i) => <ChannelCard key={c.label} c={c} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── MESSAGE ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-28">
            <Reveal><Eyebrow>Send a message</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight leading-tight text-slate-900">
                Questions about pricing, support or partnerships?
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-[15px] text-slate-500 leading-relaxed">
                Drop us a note and a real person will get back to you — usually within two business hours.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-slate-50 border border-slate-100 px-3.5 py-2 text-xs text-slate-500">
                <Clock size={13} className="text-brand-500" /> Mon – Fri · 9:00 AM – 6:00 PM WAT
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-brand-300/20 via-transparent to-indigo-300/20 blur-2xl" />
              <div className="relative rounded-[1.75rem] bg-white border border-slate-200/80 shadow-xl shadow-slate-900/5 p-5 sm:p-7">
                {sent ? (
                  <div className="flex flex-col items-center justify-center text-center py-14">
                    <div className="about-feed-in w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-5">
                      <CheckCircle2 size={30} className="text-brand-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Message received!</h3>
                    <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                      Thanks for reaching out — we'll be in touch within 2 business hours on weekdays.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={label}>Full name <span className="text-rose-400">*</span></label>
                        <input className={input} placeholder="Your full name" required value={form.name} onChange={set('name')} />
                      </div>
                      <div>
                        <label className={label}>Email <span className="text-rose-400">*</span></label>
                        <input type="email" className={input} placeholder="you@company.com" required value={form.email} onChange={set('email')} />
                      </div>
                    </div>
                    <div>
                      <label className={label}>Estate / company</label>
                      <input className={input} placeholder="e.g. Sunrise Estate, Lekki" value={form.company} onChange={set('company')} />
                    </div>
                    <div>
                      <label className={label}>Topic <span className="text-rose-400">*</span></label>
                      <div className="flex flex-wrap gap-2">
                        {TOPICS.map(t => (
                          <button key={t} type="button" onClick={() => setForm(f => ({ ...f, subject: t }))}
                            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all duration-200 ${
                              form.subject === t
                                ? 'bg-slate-900 border-slate-900 text-white scale-[1.03]'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                            }`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className={label}>Message <span className="text-rose-400">*</span></label>
                      <textarea className={`${input} resize-none`} rows={4} placeholder="Tell us about your estate and what you need…" required value={form.message} onChange={set('message')} />
                    </div>

                    {error && <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">{error}</p>}

                    <button type="submit" disabled={loading || !form.subject}
                      className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <><Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> {form.subject ? 'Send message' : 'Pick a topic to send'}</>
                      )}
                    </button>
                    <p className="text-xs text-slate-400 text-center">
                      By submitting you agree to our <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
