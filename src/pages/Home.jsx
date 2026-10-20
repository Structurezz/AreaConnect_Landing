import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, Plus, QrCode, Wallet, ShoppingBag, Vote, PhoneCall,
  Siren, ShieldCheck, Smartphone, LayoutDashboard, ScanLine, WifiOff, Lock, Globe,
  Sparkles, MapPin, Music, CreditCard, Shield, Users, Package, UserRound, UserPlus, MessagesSquare, Bell,
  Home as HomeIcon, LayoutGrid, Phone, Signal, BatteryFull,
} from 'lucide-react';
import Seo from '../components/Seo';
import AreaMatesPhone from '../components/mockups/AreaMatesPhone';
import { Reveal, useReveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, PrimaryButton, SpotlightCard, GlowCTA } from '../components/ui/Modern';

/* ─── FAQ content — rendered on the page and mirrored into FAQPage schema ─ */
const FAQS = [
  { q: 'How much does AreaConnect cost?',
    a: 'Plans start at ₦20,000/month for up to 50 residents (Starter), ₦47,000/month for up to 200 residents (Growth), and ₦80,000/month for up to 500 residents (Premium). Annual billing saves 20%. Enterprise pricing is custom for large portfolios. Every new estate starts with a 14-day free trial.' },
  { q: 'How do residents get their login credentials?',
    a: "When an estate manager invites a resident — individually or via CSV — the system instantly creates an account and emails the resident a branded welcome message with their login email and a temporary password. They sign in and change it on first access." },
  { q: 'How does the visitor QR code system work?',
    a: "A resident pre-registers their guest from the AreaMates app in seconds. The system generates a unique QR code and 6-digit access code and emails the pass to the guest — they can also forward it via WhatsApp. At the gate, the security officer types the code into the Guard app to verify and check in the visitor." },
  { q: 'How are payments processed?',
    a: "AreaConnect uses Paystack — Nigeria's leading PCI-compliant payment gateway. Residents pay directly from within the AreaMates app by card or bank transfer, and get an invoice and receipt for every payment. Funds are settled to the estate's registered bank account." },
  { q: 'Is our estate data safe?',
    a: "Yes. Every estate's data is completely isolated from other estates on the platform. All traffic is encrypted in transit, passwords are hashed with bcrypt, and payment card data is never stored on our servers — it is handled exclusively by Paystack." },
  { q: 'Do I need any technical skills to get started?',
    a: 'None at all. The setup wizard walks you through creating your estate, adding units, and inviting residents step by step. If you would like a hand, book a call and we will walk you through it.' },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

/* ─── Content ─────────────────────────────────────────────────────────── */

const WORDS = ['one app.', 'connected.', 'secured.', 'sorted.'];

// Illustrative notifications that float around the hero phone.

const MARQUEE = ['Visitor QR passes', 'Instant passes', 'Panic alerts', 'In-app calls', 'Dues on autopilot', 'Invoices & receipts', 'Escrow marketplace', 'Live location sharing', 'Polls & events', 'Community DJ', 'Guard app', 'Offline gate mode'];

const APPS = [
  {
    id: 'admin', name: 'AreaConnect Admin', who: 'For estate managers', icon: LayoutDashboard, accent: '#10b981', to: '/admin',
    desc: 'Run the whole estate from any browser — residents, units, guards, dues and reports in one dashboard.',
    points: ['Resident onboarding & CSV bulk invites', 'Payment schedules & estate wallet', 'Guard management & audit logs', 'Live analytics & collection reports'],
  },
  {
    id: 'mates', name: 'AreaMates', who: 'For residents', icon: Smartphone, accent: '#6366f1', to: '/mates',
    desc: 'The resident app — invite visitors, pay dues, call the gate and join the community, all from one place.',
    points: ['Visitor passes in seconds', 'Pay dues with Paystack', 'In-app calls & messaging', 'Marketplace, lounge, polls & events'],
  },
  {
    id: 'guard', name: 'AreaConnect Guard', who: 'For security', icon: ShieldCheck, accent: '#0ea5e9', to: '/guard',
    desc: 'The gate app — verify guests by code, respond to panic alerts and keep working even offline.',
    points: ['6-digit code verification', 'Siren on panic alerts', 'Offline mode with auto-sync', 'Incident escalation'],
  },
];

const STEPS = [
  { title: 'Create your estate',    desc: 'Sign up, add your estate details and units.' },
  { title: 'Invite your residents', desc: 'Upload a CSV or invite one by one — everyone gets a welcome email.' },
  { title: 'Onboard your guards',   desc: 'Create gate officer accounts. They sign in to the Guard app and go.' },
  { title: 'Go live',               desc: 'Residents pay, register visitors and connect with neighbours.' },
];

const NIGERIA = [
  { icon: CreditCard, title: 'Paystack-native',      desc: 'Dues, marketplace checkout and payouts all run on Paystack.' },
  { icon: WifiOff,    title: 'Offline-first gate',   desc: 'The Guard app keeps working without signal and syncs later.' },
  { icon: Lock,       title: 'Total data isolation', desc: 'No estate can ever see another estate’s data.' },
  { icon: Globe,      title: 'Works on any device',  desc: 'Light enough for everyday Android phones; Admin runs in any browser.' },
];

const PLANS = [
  { name: 'Starter', price: '₦20,000', residents: 'Up to 50 residents',  note: 'Visitors, alerts & announcements' },
  { name: 'Growth',  price: '₦47,000', residents: 'Up to 200 residents', note: 'Adds payments, marketplace & community', featured: true },
  { name: 'Premium', price: '₦80,000', residents: 'Up to 500 residents', note: 'Adds the lounge, exports & priority support' },
];

/* ─── Hero visual ─────────────────────────────────────────────────────── */

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="block h-[1.2em] overflow-hidden">
      <span key={i} className="about-word-in inline-block bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
        {WORDS[i]}
      </span>
    </span>
  );
}

/* ─── Apps tabs ───────────────────────────────────────────────────────── */

function AppsTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive(a => (a + 1) % APPS.length), 6000);
    return () => clearTimeout(t);
  }, [active, paused]);
  const app = APPS[active];

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
        {APPS.map((a, i) => {
          const on = i === active;
          return (
            <button key={a.id} type="button" onClick={() => setActive(i)}
              className={`relative overflow-hidden text-left rounded-2xl border p-3 sm:p-4 transition-all duration-300 ${on ? 'bg-white border-slate-200 shadow-lg shadow-slate-900/5' : 'bg-white/50 border-slate-200/60 hover:bg-white'}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: on ? a.accent : '#f1f5f9' }}>
                  <a.icon size={16} style={{ color: on ? '#fff' : a.accent }} />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <div className="text-sm font-semibold text-slate-900 truncate">{a.name}</div>
                  <div className="text-[11px] text-slate-400">{a.who}</div>
                </div>
                <div className="sm:hidden text-[12px] font-semibold text-slate-900 leading-tight">{a.name.replace('AreaConnect ', '')}</div>
              </div>
              {on && (
                <span key={`${active}-${paused}`} className="absolute left-0 bottom-0 h-0.5 home-progress" style={{ background: a.accent, animationPlayState: paused ? 'paused' : 'running' }} />
              )}
            </button>
          );
        })}
      </div>

      <div key={app.id} className="about-feed-in grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-center rounded-[1.75rem] bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xl shadow-slate-900/5">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: app.accent }}>{app.who}</div>
          <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{app.name}</h3>
          <p className="mt-3 text-[15px] text-slate-500 leading-relaxed">{app.desc}</p>
          <Link to={app.to} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group" style={{ color: app.accent }}>
            Explore {app.name.replace('AreaConnect ', '')} <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <ul className="space-y-2.5">
          {app.points.map((p, i) => (
            <li key={p} className="about-feed-in flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-100 px-4 py-3 text-sm text-slate-700" style={{ animationDelay: `${120 + i * 90}ms` }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background: app.accent }}>
                <Check size={12} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Bento tiles ─────────────────────────────────────────────────────── */

function Bento() {
  const [ref, on] = useReveal(0.2);
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-6 gap-3 sm:gap-4">
      {/* Visitors — large */}
      <SpotlightCard glow="rgba(16,185,129,.14)" className="md:col-span-4 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
        <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
          <div className="flex-1">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5"><ScanLine size={18} /></div>
            <h3 className="text-lg font-semibold text-slate-900">Visitors in, in seconds.</h3>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-sm">QR passes, 6-digit codes, instant passes and early-arrival approvals — guards verify them in seconds.</p>
          </div>
          <div className="flex gap-2 sm:flex-col">
            {['Expected · 12', 'On-site · 5', 'Checked out · 31'].map((t, i) => (
              <span key={t} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-500 ${on ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'} ${
                i === 1 ? 'bg-brand-500 border-brand-500 text-white' : 'bg-white border-slate-200 text-slate-600'
              }`} style={{ transitionDelay: `${300 + i * 120}ms` }}>{t}</span>
            ))}
          </div>
        </div>
      </SpotlightCard>

      {/* Panic */}
      <SpotlightCard glow="rgba(244,63,94,.14)" className="md:col-span-2 rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-7 text-white">
        <div className="relative w-10 h-10 mb-5">
          <span className="absolute inset-0 rounded-xl bg-rose-500 animate-ping opacity-40" />
          <div className="relative w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center"><Siren size={18} /></div>
        </div>
        <h3 className="text-lg font-semibold">Panic alerts with a siren.</h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">One tap and every guard’s phone sounds the alarm.</p>
      </SpotlightCard>

      {/* Dues */}
      <SpotlightCard glow="rgba(245,158,11,.14)" className="md:col-span-2 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-5"><Wallet size={18} /></div>
        <h3 className="text-lg font-semibold text-slate-900">Dues on autopilot.</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Schedules, reminders, receipts and payouts.</p>
        <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-brand-500 transition-[width] duration-[1600ms] ease-out" style={{ width: on ? '82%' : '0%' }} />
        </div>
        <div className="mt-2 text-[11px] text-slate-400">82% collected · example</div>
      </SpotlightCard>

      {/* Calls */}
      <SpotlightCard glow="rgba(14,165,233,.14)" className="md:col-span-2 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
        <div className="relative w-10 h-10 mb-5">
          <span className="absolute -inset-1.5 rounded-2xl border-2 border-sky-300 home-ring" />
          <div className="relative w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><PhoneCall size={18} /></div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Call the gate in-app.</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Neighbours, security and managers — no numbers exposed.</p>
      </SpotlightCard>

      {/* Community */}
      <SpotlightCard glow="rgba(139,92,246,.14)" className="md:col-span-2 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
        <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-500 flex items-center justify-center mb-5"><Music size={18} /></div>
        <h3 className="text-lg font-semibold text-slate-900">A lounge for the estate.</h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">Feed, stories, events, polls and a shared DJ queue.</p>
        <div className="mt-5 flex items-end gap-1 h-6">
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <span key={i} className="w-1.5 rounded-full bg-violet-400 home-eq" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </SpotlightCard>

      {/* Marketplace — wide */}
      <SpotlightCard glow="rgba(249,115,22,.14)" className="md:col-span-6 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-800 p-6 sm:p-7 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center flex-shrink-0"><ShoppingBag size={18} /></div>
            <div>
              <h3 className="text-lg font-semibold">A marketplace your neighbours can trust.</h3>
              <p className="mt-1 text-sm text-slate-400">Escrow checkout holds the money until the buyer confirms delivery.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {['Paid', 'Held in escrow', 'Delivered', 'Released'].map((s, i) => (
              <span key={s} className={`flex items-center gap-2 transition-all duration-500 ${on ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${400 + i * 250}ms` }}>
                <span className={`rounded-full px-2.5 py-1 font-medium whitespace-nowrap ${i === 3 ? 'bg-brand-500 text-white' : 'bg-white/10 text-slate-300'}`}>{s}</span>
                {i < 3 && <span className="hidden sm:block w-4 h-px bg-white/20" />}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

/* ─── Steps ───────────────────────────────────────────────────────────── */

function Steps() {
  const [ref, on] = useReveal(0.3);
  return (
    <div ref={ref} className="relative grid md:grid-cols-4 gap-4 md:gap-6">
      <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px bg-slate-200" />
      <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px bg-gradient-to-r from-brand-400 to-brand-600 origin-left transition-transform duration-[1800ms] ease-out"
        style={{ transform: `scaleX(${on ? 1 : 0})` }} />
      {STEPS.map((s, i) => (
        <div key={s.title}
          className={`relative flex md:flex-col items-start md:items-center gap-4 md:text-center transition-all duration-700 ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${i * 300}ms` }}>
          <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-brand-500 text-brand-600 text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-[0_0_0_6px_white]">
            {i + 1}
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-[13px] text-slate-500 leading-relaxed md:max-w-[200px] md:mx-auto">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${open ? 'bg-white border-slate-200 shadow-lg shadow-slate-900/5' : 'bg-white/60 border-slate-200/70 hover:bg-white'}`}>
      <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm sm:text-[15px] font-semibold text-slate-900">{q}</span>
        <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? 'bg-brand-500 text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
          <Plus size={14} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      setShowStickyCta(y > h * 0.6 && y + h < docH - 400);
    };
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="overflow-x-clip">
      <Seo
        title="AreaConnect — Estate Management Platform Nigeria | Visitor Passes, Payments & Community"
        description="The estate management platform built in Nigeria. Issue visitor QR passes, collect service charges via Paystack, call the gate in-app and keep your community connected — all in one place."
        path="/"
        keywords="AreaConnect, estate management Nigeria, property management software Nigeria, visitor management system, estate manager app, resident portal Nigeria, service charge collection, Lagos estate management"
        jsonLd={FAQ_SCHEMA}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-24">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <Reveal><Pill badge="New">In-app calls & safety tools</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.2rem] sm:text-[2.9rem] lg:text-[3.4rem] font-extrabold tracking-[-0.03em] leading-[1.06] text-slate-900">
                Your whole estate,
                <RotatingWord />
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                Visitor passes, dues, security and community — one platform connecting estate managers, residents and guards.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <PrimaryButton to="https://area-connector.areaconnect.pro/register">Start 14-day free trial</PrimaryButton>
                <Link to="/contact#book-demo" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/70 hover:bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 transition-all">
                  Book a demo <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5"><Sparkles size={13} className="text-brand-500" /> 3 apps, one platform</span>
                <span className="inline-flex items-center gap-1.5"><CreditCard size={13} className="text-brand-500" /> Paystack-native</span>
                <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-brand-500" /> Built in Lagos</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <AreaMatesPhone />
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="relative bg-slate-900 py-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-6 px-3 text-sm font-medium text-slate-400 whitespace-nowrap">
              {m}<span className="w-1 h-1 rounded-full bg-brand-500" />
            </span>
          ))}
        </div>
      </div>

      {/* ── APPS ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Three apps · One platform</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Built for every role in your estate.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-500">Managers, residents and security — all connected in real time.</p>
            </Reveal>
          </div>
          <Reveal delay={100}><AppsTabs /></Reveal>
        </div>
      </section>

      {/* ── HIGHLIGHTS ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <Reveal><Eyebrow>Highlights</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Everything your estate runs on.</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link to="/features" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group">
                See all features <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <Bento />
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <Reveal><Eyebrow>Simple setup</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">From sign-up to live in four steps.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-500">No technical skills needed — the setup wizard guides you through.</p>
            </Reveal>
          </div>
          <Steps />
        </div>
      </section>

      {/* ── BUILT FOR NIGERIA ────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Reveal><Eyebrow>Built for Nigeria</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight leading-tight text-slate-900">
                Designed for the way Nigerian estates actually work.
              </h2>
            </Reveal>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {NIGERIA.map((w, i) => (
                <Reveal key={w.title} delay={i * 70} className="h-full">
                  <SpotlightCard className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <w.icon size={16} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-slate-900">{w.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">{w.desc}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <Link to="/about" className="group relative block mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-brand-400/40 via-transparent to-indigo-400/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[4/5] shadow-2xl shadow-slate-900/20">
                <img src="/team/michael-orizu.jpg" alt="Michael Orizu, founder of AreaConnect" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_20%] scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
                <div className="absolute left-6 right-6 bottom-6">
                  <p className="text-white text-[15px] sm:text-base font-medium leading-snug">
                    “Estates deserve better than WhatsApp groups and paper log books.”
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-semibold">Michael Orizu</div>
                      <div className="text-slate-400 text-xs">Founder, AreaConnect</div>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white flex items-center justify-center group-hover:bg-brand-500 group-hover:border-brand-500 transition-colors">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <Reveal><Eyebrow>Pricing</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Simple plans. All three apps included.</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link to="/pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group">
                Compare all plans <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="h-full">
                {p.featured ? (
                  <div className="relative h-full rounded-[1.75rem] p-px overflow-hidden">
                    <div className="about-glow-border absolute inset-[-50%]" />
                    <div className="relative h-full rounded-[calc(1.75rem-1px)] bg-slate-950 text-white p-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[15px] font-semibold">{p.name}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-2 py-0.5">Popular</span>
                      </div>
                      <div className="mt-5 text-[2rem] font-bold tracking-tight leading-none">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                      <div className="mt-2 text-xs text-brand-300">{p.residents}</div>
                      <p className="mt-4 text-[13px] text-slate-400">{p.note}</p>
                      <Link to="/pricing" className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold py-2.5 transition-colors">
                        See details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <SpotlightCard className="h-full rounded-[1.75rem] bg-white border border-slate-200/80 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <span className="text-[15px] font-semibold text-slate-900">{p.name}</span>
                    <div className="mt-5 text-[2rem] font-bold tracking-tight leading-none text-slate-900">{p.price}<span className="text-sm font-normal text-slate-400">/mo</span></div>
                    <div className="mt-2 text-xs text-slate-400">{p.residents}</div>
                    <p className="mt-4 text-[13px] text-slate-500">{p.note}</p>
                    <Link to="/pricing" className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 text-sm font-semibold py-2.5 transition-all">
                      See details <ArrowRight size={14} />
                    </Link>
                  </SpotlightCard>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center text-xs sm:text-sm text-slate-400 mt-6">Every new estate starts with a 14-day free trial. Enterprise pricing for portfolios.</p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Questions, answered.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-[15px] text-slate-500">
                  Anything else? <Link to="/contact#book-demo" className="text-brand-600 font-medium hover:underline">Book a 30-minute call</Link>.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <FaqItem q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(o => (o === i ? -1 : i))} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlowCTA title="Bring your estate onto AreaConnect." subtitle="Start with a 14-day free trial — residents, guards and managers on one platform.">
        <PrimaryButton to="https://area-connector.areaconnect.pro/register" dark={false}>Start free trial</PrimaryButton>
        <Link to="/contact#book-demo" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
          Book a demo
        </Link>
      </GlowCTA>

      {/* ── MOBILE: sticky launch bar ────────────────────────────────── */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 px-3 pt-6 transition-all duration-300 ${
          showStickyCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
      >
        <div className="relative flex items-center gap-2.5 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-full p-1.5 pl-2 shadow-2xl shadow-slate-900/20">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-900 leading-tight">AreaConnect</div>
            <div className="text-[11px] text-slate-500 leading-tight">14-day free trial</div>
          </div>
          <Link to="https://area-connector.areaconnect.pro/register"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[12px] px-4 py-2.5 rounded-full active:scale-95 transition-all flex-shrink-0">
            Get started <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
