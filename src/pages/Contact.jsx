import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', company: '', subject: '', message: '' });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Contact us"
        title={<>Let's <span className="gradient-text-brand">talk.</span></>}
        subtitle="Got a question, want a demo, or ready to sign up? We'd love to hear from you."
      />

      {/* ── FORM + INFO ──────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">

            {/* ── Left: Form ─────────────────────────────────────────────── */}
            <div className="lg:col-span-3">
              {sent ? (
                <Reveal>
                  <div className="flex flex-col items-center justify-center text-center py-24">
                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                      <CheckCircle2 size={40} className="text-brand-500" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3">Message received!</h2>
                    <p className="text-slate-500 max-w-sm leading-relaxed">
                      Thanks for reaching out. A member of our team will get back to you within 2 business hours on weekdays.
                    </p>
                  </div>
                </Reveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">Send us a message</h2>
                    <p className="text-sm text-slate-400">We typically reply within 2 business hours.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Full name <span className="text-red-400">*</span>
                      </label>
                      <input
                        className="input"
                        placeholder="Your full name"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Email address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        className="input"
                        placeholder="you@company.com"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Estate / Company name
                    </label>
                    <input
                      className="input"
                      placeholder="e.g. Sunrise Estate, Lekki"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="input"
                      required
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    >
                      <option value="">Select a topic…</option>
                      <option>Request a demo</option>
                      <option>Sales inquiry</option>
                      <option>Technical support</option>
                      <option>Billing question</option>
                      <option>Partnership</option>
                      <option>Press / media</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      className="input resize-none"
                      rows={5}
                      placeholder="Tell us about your estate and what you need…"
                      required
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-lg w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <><Send size={16} /> Send message</>
                    )}
                  </button>

                  <p className="text-xs text-slate-400 text-center">
                    By submitting you agree to our{' '}
                    <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>

            {/* ── Right: Info cards ──────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-black text-slate-900 mb-6">Get in touch</h2>

              {[
                {
                  icon: Mail,
                  label: 'Email us',
                  val: 'hello@areaconnect.pro',
                  sub: 'We respond within 2 business hours',
                  bg: 'bg-brand-50',
                  color: 'text-brand-600',
                },
                {
                  icon: Phone,
                  label: 'Call us',
                  val: '+234 (0) 800 272-3266',
                  sub: 'Mon – Fri, 9AM – 6PM WAT',
                  bg: 'bg-blue-50',
                  color: 'text-blue-600',
                },
                {
                  icon: MapPin,
                  label: 'Visit us',
                  val: '14 Admiralty Way, Lekki Phase 1',
                  sub: 'Lagos, Nigeria · By appointment only',
                  bg: 'bg-indigo-50',
                  color: 'text-indigo-600',
                },
                {
                  icon: Clock,
                  label: 'Support hours',
                  val: 'Monday – Friday',
                  sub: '9:00 AM – 6:00 PM (WAT)',
                  bg: 'bg-amber-50',
                  color: 'text-amber-600',
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 60}>
                  <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-4">
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <item.icon size={17} className={item.color} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      <div className="text-sm font-bold text-slate-800">{item.val}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Demo card */}
              <Reveal delay={260}>
                <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mt-2">
                  <h3 className="font-black text-slate-900 text-sm mb-2">Want a live demo?</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Book a 30-minute Zoom call. We'll walk through the full platform and answer any questions about your estate.
                  </p>
                  <a
                    href="mailto:demo@areaconnect.pro"
                    className="inline-flex items-center gap-2 text-brand-600 font-bold text-sm hover:text-brand-700 transition-colors"
                  >
                    Book a demo call <ArrowRight size={13} />
                  </a>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── RESPONSE TIME STRIP ──────────────────────────────────────────── */}
      <div className="bg-slate-900 py-5">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-3">
          <Clock size={15} className="text-brand-400 flex-shrink-0" />
          <p className="text-sm text-slate-400 text-center">
            <span className="text-white font-semibold">Response time: within 2 business hours</span>
            {' '}on weekdays (Mon – Fri, WAT)
          </p>
        </div>
      </div>

    </div>
  );
}
