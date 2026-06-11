import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

const CATEGORIES = [
  {
    tag:   'Visitor Management',
    title: 'Zero-friction guest access — from invite to gate',
    desc:  'Replace paper log books and phone calls with a seamless digital visitor flow. Residents control their own guests, security verifies in seconds.',
    color: 'bg-brand-500',
    light: 'bg-brand-50',
    accent:'text-brand-600',
    tagBg: 'bg-brand-500/10 border-brand-500/20 text-brand-400',
    dot:   'bg-brand-500',
    features: [
      { title: 'Visitor pre-registration',    desc: 'Residents register guests by name and expected arrival date directly from the AreaMates app in under 30 seconds.' },
      { title: 'QR code & access code pass',  desc: 'Every visitor receives a branded email with a unique QR code and 6-digit access code — shareable via WhatsApp or SMS.' },
      { title: 'Gate verification',           desc: 'Security officers scan the QR or enter the code in the Guard app. Verification takes one tap — no calls, no paper.' },
      { title: 'Check-in & check-out log',    desc: 'Every entry and exit is timestamped and logged. The estate manager has full real-time visibility of who is on-site.' },
      { title: 'Single-use & time-limited',   desc: 'Passes expire 24 hours after the expected arrival and cannot be reused after check-in, preventing code sharing.' },
      { title: 'Blacklist management',        desc: 'Managers and guards can blacklist visitors by name. Future entry attempts from blacklisted individuals are flagged automatically.' },
    ],
  },
  {
    tag:   'Payments',
    title: 'Collect dues on autopilot — no chasing required',
    desc:  'Schedule recurring levies, send automated reminders, and reconcile payments in real time. Powered by Paystack.',
    color: 'bg-indigo-500',
    light: 'bg-indigo-50',
    accent:'text-indigo-600',
    tagBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    dot:   'bg-indigo-500',
    features: [
      { title: 'Payment schedules',           desc: 'Create monthly, quarterly or one-off payment schedules for any levy — service charge, security fee, generator, water.' },
      { title: 'Automated reminders',         desc: 'Residents receive push notifications and email reminders before and after payment deadlines — zero manual follow-up.' },
      { title: 'Paystack integration',        desc: "Residents pay by card, bank transfer, or USSD from within the AreaMates app. Funds are settled to the estate's bank account." },
      { title: 'Manual & waive recording',    desc: 'Record cash payments manually for residents who pay at the office. Waive individual payments with an audit trail.' },
      { title: 'Estate wallet',               desc: 'Collected funds accumulate in a dedicated estate wallet. Withdraw to any registered bank account at any time.' },
      { title: 'Full reconciliation reports', desc: 'View who has paid, who is outstanding, and full payment history per resident. Exportable to CSV.' },
    ],
  },
  {
    tag:   'Community',
    title: 'Everything that makes an estate feel like a community',
    desc:  'From announcements to the resident lounge — AreaConnect brings your estate together.',
    color: 'bg-violet-500',
    light: 'bg-violet-50',
    accent:'text-violet-600',
    tagBg: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    dot:   'bg-violet-500',
    features: [
      { title: 'Announcements',               desc: 'Broadcast notices with images and attachments. Residents get push notifications and can acknowledge receipt.' },
      { title: 'Community chat',              desc: 'Estate-wide group messaging and direct messages between residents — all scoped to your estate, no cross-estate leakage.' },
      { title: 'Resident marketplace',        desc: 'Residents buy, sell and trade within the estate — furniture, appliances, food, services — without leaving the app.' },
      { title: 'Polls & voting',              desc: 'Collect community input on decisions. Transparent results, instant tallies, and participation logs.' },
      { title: 'Events board',                desc: 'Post community events with RSVP. Send automatic reminders to attendees as the date approaches.' },
      { title: 'Resident lounge & DJ queue',  desc: 'A community music experience backed by YouTube. Residents suggest tracks, vote for their favourites, and vibe together.' },
    ],
  },
  {
    tag:   'Security',
    title: 'Real-time incident management at the gate and beyond',
    desc:  'Give your security team the tools they need. Give your residents peace of mind.',
    color: 'bg-blue-500',
    light: 'bg-blue-50',
    accent:'text-blue-600',
    tagBg: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
    dot:   'bg-blue-500',
    features: [
      { title: 'Live alerts',                 desc: 'Guards escalate incidents to the estate manager and all residents with a single tap — and get acknowledgements back.' },
      { title: 'Alert broadcasting',          desc: 'Managers can broadcast urgent security notices to every resident simultaneously with push notification delivery.' },
      { title: 'Guard app (iOS & Android)',   desc: 'A dedicated native app for gate officers. Fast, focused, and works reliably on low-end Android devices.' },
      { title: 'Offline mode',                desc: 'The Guard app caches recent visitor data locally. It works even when the network is down and syncs when it returns.' },
      { title: 'Entry log',                   desc: 'A complete timestamped log of every visitor entry and exit, accessible to the estate manager at any time.' },
      { title: 'Resident alert button',       desc: 'Residents can raise a personal security alert to all security staff instantly from within AreaMates.' },
    ],
  },
  {
    tag:   'Management',
    title: 'Every admin task in one dashboard',
    desc:  'Run your entire estate from a single web app. No spreadsheets, no WhatsApp group chaos.',
    color: 'bg-amber-500',
    light: 'bg-amber-50',
    accent:'text-amber-600',
    tagBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    dot:   'bg-amber-500',
    features: [
      { title: 'Resident management',         desc: 'Add, invite, suspend, and activate residents. Bulk-invite hundreds at once with a simple CSV upload.' },
      { title: 'Unit management',             desc: 'Create and manage units, assign residents to units, and track occupancy across blocks.' },
      { title: 'Estate analytics',            desc: 'Live dashboard with visitor trends, payment collection rates, resident activity, and alert history.' },
      { title: 'Role-based access',           desc: 'Separate roles for estate manager, security staff, and residents. Each sees only what they need to see.' },
      { title: 'Multi-estate support',        desc: 'Manage multiple estates from a single login on the Enterprise plan — ideal for property management companies.' },
      { title: 'Settings & customisation',    desc: 'Configure estate name, subscription plan, billing, and notification preferences from the settings panel.' },
    ],
  },
];

export default function Features() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Platform Features"
        title={
          <>
            Everything you need.<br />
            <span className="gradient-text-brand">Nothing you don't.</span>
          </>
        }
        subtitle="AreaConnect ships a complete, production-ready estate management platform. Every feature below is included in the Growth plan — no extra modules, no surprise fees."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 text-[15px]">
            View pricing <ArrowRight size={16} />
          </Link>
          <a href="tel:+2347089224054" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/8 text-[15px]">
            Request a demo
          </a>
        </div>
      </PageHero>

      {/* ── FEATURE CATEGORIES ───────────────────────────────────────────── */}
      {CATEGORIES.map((cat, ci) => (
        <section key={cat.tag}>

          {/* Stats bar between categories 2 and 3 */}
          {ci === 2 && (
            <div className="bg-slate-900 py-10 border-y border-white/5">
              <div className="max-w-4xl mx-auto px-6">
                <Reveal>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
                    {[
                      { number: '30', label: 'features' },
                      { number: '3',  label: 'apps' },
                      { number: '1',  label: 'platform' },
                    ].map((s, i) => (
                      <div key={s.label} className="flex items-center gap-4">
                        {i > 0 && <span className="hidden sm:block text-slate-700 text-2xl font-light">·</span>}
                        <div>
                          <span className="text-5xl font-black gradient-text-brand">{s.number}</span>
                          <span className="text-slate-400 text-lg font-semibold ml-2">{s.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          )}

          <div className={`py-24 ${ci % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
            <div className="max-w-6xl mx-auto px-6">

              {/* Section header */}
              <Reveal>
                <div className="mb-14">
                  <span className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5 ${cat.tagBg}`}>
                    {cat.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mb-4 max-w-2xl leading-tight">
                    {cat.title}
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-500 max-w-2xl leading-relaxed">{cat.desc}</p>
                </div>
              </Reveal>

              {/* Feature grid */}
              <Reveal delay={80}>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {cat.features.map((f, fi) => (
                    <Reveal key={f.title} delay={fi * 40}>
                      <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-7 h-7 rounded-full ${cat.color} flex items-center justify-center flex-shrink-0`}>
                            <CheckCircle2 size={14} className="text-white" />
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm leading-snug">{f.title}</h3>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed pl-10">{f.desc}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Start today
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Start using every feature today
            </h2>
            <p className="text-brand-100 text-base sm:text-xl mb-10 leading-relaxed">
              The Starter plan is free forever. The Growth plan unlocks the full platform for ₦25,000/month.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-[15px] shadow-xl shadow-black/20 hover:-translate-y-0.5">
                View pricing <ArrowRight size={18} />
              </Link>
              <a href="tel:+2347089224054" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px] hover:bg-white/8">
                Book a demo
              </a>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Free forever plan</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> No credit card needed</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Full platform on Growth</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
