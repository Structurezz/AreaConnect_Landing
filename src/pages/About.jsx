import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Heart, Zap, Shield, Globe, QrCode, Wallet, BellRing,
  ShoppingBag, Vote, Check, X, Sparkles, MapPin,
} from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal, useReveal } from '../components/ui/Reveal';

/* ── Content ──────────────────────────────────────────────────────────── */

const WORDS = ['connected.', 'secure.', 'organised.', 'effortless.'];

// Illustrative activity for the hero preview panel.
const FEED = [
  { icon: QrCode,      tone: 'bg-brand-500',  title: 'Visitor checked in',      meta: 'Gate 2 · Block C, Flat 4' },
  { icon: Wallet,      tone: 'bg-indigo-500', title: 'Service charge paid',     meta: 'Paystack · receipt sent' },
  { icon: BellRing,    tone: 'bg-rose-500',   title: 'Security alert resolved', meta: 'Guard on duty responded' },
  { icon: ShoppingBag, tone: 'bg-amber-500',  title: 'New marketplace listing', meta: 'Fresh bread · 3 mins away' },
  { icon: Vote,        tone: 'bg-violet-500', title: 'Poll closed',             meta: 'Generator hours · 82% voted' },
];

const MARQUEE = ['Visitor passes', 'Estate dues', 'Security alerts', 'Guard app', 'Announcements', 'Marketplace', 'Polls & events', 'Resident lounge', 'Paystack payments', 'Receipts'];

const BEFORE = ['Dues chased in WhatsApp groups', 'Paper log books at the gate', 'Manual bank transfer screenshots', 'Announcements lost in the noise'];
const AFTER  = ['Dues collected and receipted automatically', 'QR passes verified in seconds', 'Every payment tracked in one place', 'Updates that reach every resident'];

const MILESTONES = [
  { tag: 'Aug 2026', title: 'Founded in Lagos',   desc: 'One goal: get Nigerian estates off WhatsApp groups and paper log books.' },
  { tag: 'Live',     title: 'Visitor passes',     desc: 'QR passes residents send in seconds, verified at the gate by the Guard app.' },
  { tag: 'Live',     title: 'Dues & payments',    desc: 'Dues, levies and receipts collected through Paystack — no more chasing transfers.' },
  { tag: 'Live',     title: 'AreaMates app',      desc: 'The resident app on iOS and Android: passes, payments, alerts and the lounge.' },
  { tag: 'Live',     title: 'Community tools',    desc: 'Marketplace, polls, events and announcements that reach everyone.' },
  { tag: 'Next',     title: 'Estates nationwide', desc: 'Onboarding our first estates across Lagos, Abuja and beyond.' },
];

const MISSION = 'Make every estate in Africa feel like a well-managed, connected community — regardless of size or budget.';

const VALUES = [
  { icon: Heart,  title: 'Resident-first',     desc: 'Every decision starts with: does this make life better for the people living here?', color: 'text-rose-500',  glow: 'rgba(244,63,94,.12)' },
  { icon: Zap,    title: 'Radically simple',   desc: "If a manager's 60-year-old parent can't use it in 5 minutes, we ship it again.",     color: 'text-amber-500', glow: 'rgba(245,158,11,.14)' },
  { icon: Shield, title: 'Privacy by default', desc: "Each estate's data is isolated. We never sell data or allow cross-estate access.",   color: 'text-blue-500',  glow: 'rgba(59,130,246,.12)' },
  { icon: Globe,  title: 'Built for Nigeria',  desc: 'Made from scratch for Nigerian networks, devices and the way estates really run.',  color: 'text-brand-500', glow: 'rgba(16,185,129,.14)' },
];

const FOUNDER_PHOTO = '/team/michael-orizu.jpg';

const TEAM = [
  { name: 'Michael Orizu', role: 'Founder, CEO & CTO',       initials: 'MO', color: 'from-brand-400 to-emerald-700', photo: FOUNDER_PHOTO },
  { name: 'Angela Okorie', role: 'Head of Customer Success', initials: 'AO', color: 'from-violet-400 to-violet-700' },
  { name: 'Seun Adesanya', role: 'Head of Product',          initials: 'SA', color: 'from-teal-400 to-cyan-700' },
  { name: 'Aminu Danjuma', role: 'Head of Marketing',        initials: 'AD', color: 'from-orange-400 to-rose-600' },
];

/* ── Pieces ───────────────────────────────────────────────────────────── */

function Eyebrow({ children, dark }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-brand-400' : 'text-brand-600'}`}>
      <span className={`h-px w-6 ${dark ? 'bg-brand-400' : 'bg-brand-500'}`} />
      {children}
    </span>
  );
}

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

function LiveFeed() {
  const [items, setItems] = useState(() => FEED.slice(0, 3).map((f, i) => ({ ...f, key: i })));
  useEffect(() => {
    let n = 3;
    const t = setInterval(() => {
      setItems(prev => [{ ...FEED[n % FEED.length], key: n }, ...prev].slice(0, 4));
      n += 1;
    }, 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px]">
      {/* rotating ring + glow */}
      <div className="absolute -inset-8 sm:-inset-14 flex items-center justify-center pointer-events-none">
        <div className="about-spin w-full aspect-square rounded-full border border-dashed border-brand-300/60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-400/30 to-indigo-400/20 blur-3xl rounded-full" />

      {/* floating chips */}
      <div className="hidden sm:flex absolute -left-12 top-10 z-20 animate-float items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg px-3 py-1.5 text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-brand-500" /> Guard app
      </div>
      <div className="hidden sm:flex absolute -right-10 top-1/2 z-20 animate-float-delayed items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg px-3 py-1.5 text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-indigo-500" /> AreaMates
      </div>
      <div className="hidden sm:flex absolute -left-6 -bottom-5 z-20 animate-float-slow items-center gap-2 rounded-full bg-white/90 backdrop-blur border border-slate-200 shadow-lg px-3 py-1.5 text-xs font-semibold text-slate-700">
        <span className="w-2 h-2 rounded-full bg-amber-500" /> Admin
      </div>

      {/* panel */}
      <div className="relative z-10 rounded-[1.75rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-slate-900/10 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <div className="text-[13px] font-semibold text-slate-900">Sunrise Estate</div>
            <div className="text-[11px] text-slate-400">Live activity</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-semibold px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
            </span>
            Live
          </span>
        </div>
        <div className="space-y-2 h-[264px] overflow-hidden">
          {items.map(it => (
            <div key={it.key} className="about-feed-in flex items-center gap-3 rounded-2xl bg-slate-50/80 border border-slate-100 p-3">
              <div className={`w-9 h-9 rounded-xl ${it.tone} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                <it.icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold text-slate-800 truncate">{it.title}</div>
                <div className="text-[11px] text-slate-400 truncate">{it.meta}</div>
              </div>
              <span className="text-[10px] text-slate-300 font-medium">now</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfter() {
  const [ref, on] = useReveal(0.3);
  return (
    <div ref={ref} className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-3xl bg-white border border-slate-200/80 p-5 sm:p-6">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-500 mb-4">Before</div>
        <ul className="space-y-3">
          {BEFORE.map((b, i) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-slate-500">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0"><X size={12} /></span>
              <span className={`about-strike ${on ? 'is-on' : ''}`} style={{ '--d': `${300 + i * 180}ms` }}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative rounded-3xl bg-slate-900 p-5 sm:p-6 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-500/25 rounded-full blur-3xl" />
        <div className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400 mb-4">With AreaConnect</div>
        <ul className="relative space-y-3">
          {AFTER.map((a, i) => (
            <li key={a}
              className={`flex items-start gap-2.5 text-sm text-slate-200 transition-all duration-500 ${on ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}
              style={{ transitionDelay: `${1000 + i * 160}ms` }}>
              <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0"><Check size={12} /></span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Timeline() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.65 - r.top) / r.height;
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* track + fill */}
      <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-2 bottom-2 w-0.5 bg-slate-200 rounded-full" />
      <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-2 w-0.5 bg-gradient-to-b from-brand-400 to-brand-600 rounded-full transition-[height] duration-150"
        style={{ height: `max(0px, calc(${progress * 100}% - 16px))` }} />

      <div className="space-y-6 md:space-y-4">
        {MILESTONES.map((m, i) => {
          const reached = progress * MILESTONES.length > i + 0.2;
          const left = i % 2 === 0;
          return (
            <div key={m.title} className="relative md:grid md:grid-cols-2 md:gap-12 pl-11 md:pl-0">
              <div className={`absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-5 w-[18px] h-[18px] rounded-full border-[3px] transition-all duration-500 ${
                reached ? 'bg-brand-500 border-brand-100 scale-110 shadow-[0_0_0_6px_rgba(16,185,129,.12)]' : 'bg-white border-slate-200'
              }`} />
              <div className={left ? 'md:flex md:justify-end md:pr-4' : 'md:col-start-2 md:pl-4'}>
                <div className={`w-full md:max-w-sm rounded-2xl border bg-white p-4 sm:p-5 transition-all duration-700 ${
                  reached ? 'opacity-100 translate-y-0 border-slate-200 shadow-lg shadow-slate-900/5' : 'opacity-40 translate-y-3 border-slate-100'
                }`}>
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] mb-1 ${
                    m.tag === 'Next' ? 'text-indigo-500' : 'text-brand-600'
                  }`}>{m.tag}</div>
                  <div className="text-[15px] font-semibold text-slate-900 mb-1">{m.title}</div>
                  <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MissionWords() {
  const [ref, on] = useReveal(0.4);
  const words = MISSION.split(' ');
  const highlight = new Set(['well-managed,', 'connected', 'community']);
  return (
    <p ref={ref} className="text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] font-semibold leading-[1.2] tracking-tight text-white">
      {words.map((w, i) => (
        <span key={i}
          className={`inline-block mr-[0.25em] transition-all duration-700 ${on ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-sm translate-y-2'} ${
            highlight.has(w) ? 'text-brand-400' : ''
          }`}
          style={{ transitionDelay: `${i * 55}ms` }}>
          {w}
        </span>
      ))}
    </p>
  );
}

function ValueCard({ v, i }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={i * 80} className="h-full">
      <div ref={ref} onMouseMove={onMove}
        className="group relative h-full rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
        style={{ '--x': '50%', '--y': '0%' }}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(260px circle at var(--x) var(--y), ${v.glow}, transparent 70%)` }} />
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <v.icon size={18} className={v.color} />
            </div>
            <span className="text-[11px] font-semibold text-slate-300">0{i + 1}</span>
          </div>
          <h3 className="text-[15px] font-semibold text-slate-900 mb-1.5">{v.title}</h3>
          <p className="text-[13px] sm:text-sm text-slate-500 leading-relaxed">{v.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <div className="overflow-x-hidden">
      <Seo
        title="About AreaConnect — Built for Nigerian Estates"
        description="AreaConnect is the all-in-one estate management platform built in Nigeria, for Nigerian estates. Our story, mission and the team behind the platform."
        path="/about"
        keywords="about AreaConnect, Nigerian proptech, estate management company, AreaConnect Technologies"
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 about-grid pointer-events-none" />
        <div className="about-aurora absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-brand-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="about-aurora absolute top-40 right-0 w-[22rem] h-[22rem] bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '-7s' }} />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-10 items-center">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm pl-1.5 pr-3 py-1 text-xs text-slate-600 mb-6">
                <span className="rounded-full bg-brand-500 text-white text-[10px] font-semibold px-2 py-0.5">New</span>
                Building since August 2026
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Estate life, finally
                <RotatingWord />
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                AreaConnect brings managers, residents and security onto one platform — so visitors, dues and alerts stop living in WhatsApp groups and paper log books.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/contact#book-demo"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold pl-5 pr-2 py-2 transition-all">
                  Book a demo
                  <span className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight size={14} />
                  </span>
                </Link>
                <a href="#story" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/70 hover:bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 transition-all">
                  Our story <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-brand-500" /> Lagos, Nigeria</span>
                <span className="inline-flex items-center gap-1.5"><Sparkles size={13} className="text-brand-500" /> 3 apps, one platform</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <LiveFeed />
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

      {/* ── STORY ────────────────────────────────────────────────────── */}
      <section id="story" className="py-16 sm:py-24 bg-slate-50 scroll-mt-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Reveal><Eyebrow>Why we exist</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight leading-tight text-slate-900">
                We built the tool our parents needed.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 space-y-4 text-[15px] text-slate-500 leading-relaxed">
                <p>
                  Our founders grew up in gated communities in Lagos, watching the same frustrations year after year — dues chased on WhatsApp, visitors stuck at the gate, announcements buried in group chats.
                </p>
                <p>
                  Existing tools were too expensive, too generic or built for foreign markets. Nigerian estates needed something purpose-built: Paystack-native, light enough for any Android phone, and simple enough to run without an IT team.
                </p>
                <p className="text-slate-700 font-medium">
                  So in August 2026, we started building it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-7 flex items-center gap-3">
                <img src={FOUNDER_PHOTO} alt="Michael Orizu" className="w-10 h-10 rounded-full object-cover object-[50%_15%] ring-4 ring-white shadow" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Michael Orizu</div>
                  <div className="text-xs text-slate-400">Founder, CEO & CTO</div>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <div className="group relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-brand-400/40 via-transparent to-indigo-400/30 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-[2rem] overflow-hidden bg-slate-900 aspect-[4/5] shadow-2xl shadow-slate-900/20">
                <img src={FOUNDER_PHOTO} alt="Michael Orizu, founder of AreaConnect" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_20%] scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
                <div className="absolute left-5 right-5 bottom-5 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-white text-lg font-semibold">Michael Orizu</div>
                    <div className="text-slate-300 text-xs">Founder, CEO & CTO</div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 text-white text-[11px] font-medium px-2.5 py-1">
                    <MapPin size={11} /> Lagos
                  </span>
                </div>
              </div>
              <div className="absolute -right-3 top-8 sm:-right-8 animate-float rounded-2xl bg-white border border-slate-200 shadow-xl px-3.5 py-2.5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Founded</div>
                <div className="text-sm font-bold text-slate-900">August 2026</div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal><Eyebrow>From the founder</Eyebrow></Reveal>
            <Reveal delay={80}>
              <blockquote className="mt-5 text-xl sm:text-2xl lg:text-[1.75rem] font-semibold tracking-tight leading-snug text-slate-900">
                <span className="text-brand-500">“</span>Estates deserve better than WhatsApp groups and paper log books. I'm building the platform I wish my parents' estate had — simple enough for everyone, and made for how Nigerian estates actually run.<span className="text-brand-500">”</span>
              </blockquote>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-slate-300" />
                <span className="text-sm text-slate-500"><span className="font-semibold text-slate-900">Michael Orizu</span> · Founder, AreaConnect</span>
              </div>
            </Reveal>
            <Reveal delay={220}>
              <Link to="/contact#book-demo" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 group">
                Book a call with Michael <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Reveal><Eyebrow>The journey</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">
                Day one was August 2026.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-500 max-w-md mx-auto">Here's what we've shipped since — and what's next.</p>
            </Reveal>
          </div>
          <Timeline />
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6">
        <div className="relative max-w-6xl mx-auto rounded-[2rem] bg-slate-900 overflow-hidden px-6 py-16 sm:px-14 sm:py-24">
          <div className="about-aurora absolute -top-24 -left-10 w-80 h-80 bg-brand-500/25 rounded-full blur-3xl" />
          <div className="about-aurora absolute -bottom-24 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" style={{ animationDelay: '-6s' }} />
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative max-w-3xl">
            <Eyebrow dark>Our mission</Eyebrow>
            <div className="mt-6"><MissionWords /></div>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="mb-10">
            <Reveal><Eyebrow>What we stand for</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Four rules we don't bend.</h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {VALUES.map((v, i) => <ValueCard key={v.title} v={v} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="rounded-[2rem] bg-slate-50 border border-slate-100 p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
              <div className="lg:w-72 flex-shrink-0">
                <Reveal><Eyebrow>The team</Eyebrow></Reveal>
                <Reveal delay={60}>
                  <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Small team. Big mission.</h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">The people making Nigerian estates run better.</p>
                </Reveal>
              </div>
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {TEAM.map((m, i) => (
                  <Reveal key={m.name} delay={i * 70}>
                    <div className="group h-full rounded-2xl bg-white border border-slate-200/80 p-4 text-center hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-900/5 transition-all duration-300">
                      {m.photo ? (
                        <img src={m.photo} alt={m.name} loading="lazy"
                          className="w-14 h-14 mx-auto rounded-2xl object-cover object-[50%_15%] shadow-md group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${m.color} text-white text-sm font-bold flex items-center justify-center shadow-md group-hover:rotate-6 group-hover:scale-105 transition-transform duration-300`}>
                          {m.initials}
                        </div>
                      )}
                      <div className="mt-3 text-[13px] sm:text-sm font-semibold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{m.role}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6">
        <Reveal>
          <div className="relative max-w-4xl mx-auto rounded-[2rem] p-px overflow-hidden">
            <div className="about-glow-border absolute inset-[-50%]" />
            <div className="relative rounded-[calc(2rem-1px)] bg-slate-950 px-6 py-12 sm:px-12 sm:py-14 text-center overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Bring AreaConnect to your estate.
                </h2>
                <p className="mt-3 text-sm sm:text-[15px] text-slate-400 max-w-md mx-auto">
                  Your residents, guards and managers — finally on one platform.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="https://area-connector.areaconnect.pro/register"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold pl-5 pr-2 py-2 transition-all">
                    Get started free
                    <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                  <Link to="/careers" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
                    Join the team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
