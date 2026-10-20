import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QrCode, Zap, ScanLine, Timer, Ban, ClipboardList, Search, Clock, KeyRound, Ticket,
  Siren, ShieldAlert, Footprints, Navigation, EyeOff, Eye, WifiOff, Megaphone, Flag, ScrollText,
  PhoneCall, PhoneMissed, BellRing, MessagesSquare, MessageCircle, Bell, Coins, Users,
  CalendarClock, Receipt, CreditCard, History, HandCoins, Wallet, BarChart3,
  Store, Camera, ShieldCheck, Banknote, Heart, Lock,
  Image, Sparkles, CalendarDays, Vote, Music, Radio,
  Building2, UserCog, FileText, LayoutDashboard, Layers, Bot,
  Gavel, Mic, Smartphone, Shield, ShoppingBag,
} from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, PrimaryButton, SpotlightCard, GlowCTA } from '../components/ui/Modern';
import FeaturePhone from '../components/mockups/FeaturePhones';

/* ── Feature catalogue ────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: 'visitors', name: 'Visitors & gate', icon: QrCode, accent: '#10b981', glow: 'rgba(16,185,129,.12)',
    title: 'Zero-friction guest access, from invite to gate.',
    desc: 'Residents invite guests in seconds, guards verify in seconds, and managers see who is on-site in real time.',
    apps: ['AreaMates', 'Guard', 'Admin'],
    features: [
      { icon: Ticket,        title: 'Visitor pre-registration', desc: 'Register guests by name and expected arrival from AreaMates — no calls to the gate.' },
      { icon: QrCode,        title: 'QR code & 6-digit pass',   desc: 'Every visitor gets a unique QR code and access code, shareable on WhatsApp or SMS.' },
      { icon: Zap,           title: 'Instant passes',           desc: 'Guest already at the gate? Issue a pass on the spot and they are in.', isNew: true },
      { icon: ScanLine,      title: 'Fast gate verification',   desc: 'Guards type the 6-digit code in the Guard app and the pass details appear instantly.' },
      { icon: KeyRound,      title: 'Approve early arrivals',   desc: 'Guest turned up ahead of schedule? The host approves them from their phone.', isNew: true },
      { icon: Timer,         title: 'Single-use & time-limited', desc: 'Passes expire automatically and cannot be reused after check-in.' },
      { icon: Ban,           title: 'Cancel any pass',          desc: 'Revoke a pass with one tap — the gate refuses it immediately.' },
      { icon: ClipboardList, title: 'Check-in & check-out log', desc: 'Every entry and exit is timestamped and synced to the cloud.' },
      { icon: Search,        title: 'Search & live status',     desc: 'Find any visitor fast, with counts for expected, on-site and checked-out guests.', isNew: true },
      { icon: Shield,        title: 'Blacklist auto-block',     desc: 'Blacklisted visitors get an instant ACCESS DENIED at every gate.' },
    ],
  },
  {
    id: 'safety', name: 'Security & safety', icon: Siren, accent: '#f43f5e', glow: 'rgba(244,63,94,.12)',
    title: 'Security that makes noise — and safety that stays quiet.',
    desc: 'Panic alerts with a real siren, plus a private safety toolkit that protects residents without drama.',
    apps: ['AreaMates', 'Guard', 'Admin'],
    features: [
      { icon: Siren,        title: 'Panic button',            desc: 'One tap alerts every guard — Security, Fire or Medical — with a siren on their phones.' },
      { icon: Footprints,   title: '“I’m being followed”',    desc: 'A silent alarm that goes straight to security and the estate manager — never estate-wide.', isNew: true },
      { icon: Navigation,   title: 'Live location sharing',   desc: 'Share your live location with estate staff for up to an hour while you get home.', isNew: true },
      { icon: EyeOff,       title: 'Silent safety blocks',    desc: 'Block someone without them ever knowing. Contact attempts are logged and escalated.', isNew: true },
      { icon: Eye,          title: 'Gate watch',              desc: 'Get alerted when a guest of someone you’ve blocked checks in at the gate.', isNew: true },
      { icon: WifiOff,      title: 'Offline gate mode',       desc: 'Guards keep verifying during outages — everything syncs when the network returns.' },
      { icon: Megaphone,    title: 'Manager broadcasts',      desc: 'Push security-level alerts to every resident at once for incidents or evacuations.' },
      { icon: Flag,         title: 'Incident escalation',     desc: 'Gate officers raise incidents to the manager with a description attached.' },
      { icon: ScrollText,   title: 'Full audit log',          desc: 'Every check-in and check-out with timestamps, hosts and officer IDs — exportable.' },
    ],
  },
  {
    id: 'calls', name: 'Calls & messaging', icon: PhoneCall, accent: '#6366f1', glow: 'rgba(99,102,241,.12)',
    title: 'Call the gate, a neighbour or the manager — in-app.',
    desc: 'No more hunting for phone numbers. Everyone in the estate is one tap away, and nobody’s number is exposed.',
    apps: ['AreaMates', 'Guard', 'Admin'],
    features: [
      { icon: PhoneCall,      title: 'In-app voice calls',       desc: 'Call neighbours, security or the estate manager straight from the estate directory.', isNew: true },
      { icon: BellRing,       title: 'Rings when the app is closed', desc: 'Calls ring through push notifications, so you never miss the gate.', isNew: true },
      { icon: PhoneMissed,    title: 'Missed-call alerts',       desc: 'Missed a call? You get a notification and can call straight back.', isNew: true },
      { icon: Siren,          title: 'Emergency & staff calls',  desc: 'Security and managers can always reach any resident — free of charge.', isNew: true },
      { icon: Bell,           title: 'Buzz a neighbour',         desc: 'Send a quick nudge with a note — perfect for “your car lights are on”.', isNew: true },
      { icon: Coins,          title: 'Call credits',             desc: 'Top up call credits with Paystack and get a receipt for every top-up.', isNew: true },
      { icon: MessageCircle,  title: 'Direct messages',          desc: 'Real-time one-to-one chat for deals, carpools or just saying hello.' },
      { icon: MessagesSquare, title: 'Estate group chat',        desc: 'A community thread strictly scoped to your estate.' },
      { icon: Users,          title: 'Push everywhere',          desc: 'Visitors, payments, notices and alerts all arrive as push notifications.' },
    ],
  },
  {
    id: 'payments', name: 'Payments & dues', icon: CreditCard, accent: '#f59e0b', glow: 'rgba(245,158,11,.14)',
    title: 'Collect dues on autopilot — no chasing required.',
    desc: 'Set up levies once. Residents pay in the app, receipts go out automatically, and money lands in your account.',
    apps: ['AreaMates', 'Admin'],
    features: [
      { icon: CalendarClock, title: 'Payment schedules',        desc: 'Monthly, quarterly or one-off levies — service charge, security, generator, water.' },
      { icon: Bell,          title: 'Automated reminders',      desc: 'Push and email reminders before and after deadlines.' },
      { icon: CreditCard,    title: 'Pay with Paystack',        desc: 'Card, bank transfer or USSD, right inside AreaMates.' },
      { icon: Receipt,       title: 'Invoices & receipts',      desc: 'Every payment comes with a downloadable invoice and receipt.', isNew: true },
      { icon: History,       title: 'Payment history',          desc: 'Residents see everything they have paid; managers see every resident.', isNew: true },
      { icon: HandCoins,     title: 'Manual & waived payments', desc: 'Record cash payments or waive one with a reason for a clean audit trail.' },
      { icon: Wallet,        title: 'Estate wallet & payouts',  desc: 'Funds collect in an estate wallet — withdraw to any Nigerian bank account.' },
      { icon: BarChart3,     title: 'Reconciliation',           desc: 'Who has paid, who owes, and automatic matching of Paystack transfers.' },
    ],
  },
  {
    id: 'marketplace', name: 'Marketplace', icon: Store, accent: '#f97316', glow: 'rgba(249,115,22,.12)',
    title: 'Buy, sell and hire — safely, inside your estate.',
    desc: 'A neighbourhood marketplace with real checkout, so buyers are protected and sellers get paid.',
    apps: ['AreaMates', 'Admin'],
    features: [
      { icon: ShoppingBag, title: 'Five categories',        desc: 'Food, services, skills, items for sale and rentals.' },
      { icon: Camera,      title: 'Photo listings',         desc: 'Every listing comes with photos so buyers know what they are getting.' },
      { icon: ShieldCheck, title: 'Escrow checkout',        desc: 'Pay with Paystack — funds are held until the buyer confirms delivery.', isNew: true },
      { icon: Banknote,    title: 'Seller wallets',         desc: 'Sellers track earnings and withdraw straight to their bank.', isNew: true },
      { icon: MessageCircle, title: 'Message the seller',   desc: 'Ask questions and arrange delivery in a real-time chat.' },
      { icon: Heart,       title: 'Like & save',            desc: 'Save listings for later — popular ones rise naturally.' },
      { icon: Flag,        title: 'Reports & moderation',   desc: 'Residents report bad listings; moderators approve, remove or suspend sellers.', isNew: true },
      { icon: Lock,        title: 'Estate-only',            desc: 'Only verified residents of your estate can see, buy or sell.' },
    ],
  },
  {
    id: 'community', name: 'Community lounge', icon: Sparkles, accent: '#8b5cf6', glow: 'rgba(139,92,246,.12)',
    title: 'Your estate’s social hub.',
    desc: 'A feed, stories, events, polls and a shared soundtrack — the community life that used to happen in the car park.',
    apps: ['AreaMates', 'Admin'],
    features: [
      { icon: Image,        title: 'Social feed',           desc: 'Post updates with up to 4 photos. Like, comment and share.' },
      { icon: Sparkles,     title: 'Stories',               desc: 'Quick 24-hour stories from around the estate.', isNew: true },
      { icon: CalendarDays, title: 'Events & RSVP',         desc: 'RSVP in one tap and get reminders before it starts.' },
      { icon: Clock,        title: 'Activities calendar',   desc: 'Morning jogs, yoga, book club and more — pin, hide or add your own.' },
      { icon: Vote,         title: 'Live polls',            desc: 'Vote on estate decisions with real-time results.' },
      { icon: Music,        title: 'Community DJ queue',    desc: 'Suggest tracks and upvote favourites — Auto DJ plays the top pick.' },
      { icon: Radio,        title: 'Live radio stations',   desc: 'Chill, jazz, dance, Afrobeats and more — auto-plays on Friday nights.' },
      { icon: Megaphone,    title: 'Announcements',         desc: 'Rich notices with images and read receipts so managers know who saw them.' },
    ],
  },
  {
    id: 'admin', name: 'Estate management', icon: LayoutDashboard, accent: '#0ea5e9', glow: 'rgba(14,165,233,.12)',
    title: 'Every admin task, one dashboard.',
    desc: 'Residents, units, guards, rules and reports — managed from any browser, with an AI assistant on hand.',
    apps: ['Admin'],
    features: [
      { icon: Users,       title: 'Resident management',  desc: 'Invite, suspend and reactivate residents — or bulk-invite with a CSV.' },
      { icon: Building2,   title: 'Units & blocks',       desc: 'Track occupancy and assign residents to units in seconds.' },
      { icon: UserCog,     title: 'Guard management',     desc: 'Invite security staff, suspend or reactivate them, and see who is on duty.', isNew: true },
      { icon: FileText,    title: 'Estate constitution',  desc: 'Upload your estate rules once — residents and the AI assistant can reference them.', isNew: true },
      { icon: BarChart3,   title: 'Live analytics',       desc: 'Visitor volume, collection rates and open alerts, in real time.' },
      { icon: Layers,      title: 'Role-based access',    desc: 'Managers, guards and residents each see exactly what they need.' },
      { icon: Building2,   title: 'Multi-estate',         desc: 'Run a whole portfolio from one login on Enterprise.' },
      { icon: Bot,         title: 'Nkechi, the AI assistant', desc: 'Answers common estate questions and keeps the group chat constructive.' },
      { icon: Lock,        title: 'Total data isolation', desc: 'Nothing from one estate is ever visible to another.' },
    ],
  },
];

const SECRETS = [
  { icon: Gavel, hint: 'Neighbour disputes, settled fairly — without a single meeting.', code: 'Project C' },
  { icon: Mic,   hint: 'Your estate gets its own voice. Tune in from anywhere.',          code: 'Project A' },
  { icon: Sparkles, hint: 'One more thing. You’ll only see it in a live demo.',           code: 'Project ?' },
];

const TOTAL = CATEGORIES.reduce((n, c) => n + c.features.length, 0);
const NEW_COUNT = CATEGORIES.reduce((n, c) => n + c.features.filter(f => f.isNew).length, 0);
const APP_ICON = { AreaMates: Smartphone, Guard: ShieldCheck, Admin: LayoutDashboard };

/* ── Pieces ───────────────────────────────────────────────────────────── */

const WORDS = ['in one place.', 'in your pocket.', 'at the gate.', 'on autopilot.'];

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

// Category icons orbiting the platform core.
function Orbit() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(n => (n + 1) % CATEGORIES.length), 1800);
    return () => clearInterval(t);
  }, []);
  const cat = CATEGORIES[active];
  return (
    <div className="relative mx-auto w-[300px] h-[300px] sm:w-[380px] sm:h-[380px]">
      <div className="absolute inset-6 bg-gradient-to-br from-brand-400/25 to-indigo-400/20 blur-3xl rounded-full" />
      <div className="absolute inset-0 rounded-full border border-dashed border-slate-300/70" />
      <div className="absolute inset-[18%] rounded-full border border-slate-200/80" />

      <div className="about-spin absolute inset-0">
        {CATEGORIES.map((c, i) => {
          const a = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
          const on = i === active;
          return (
            <div key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + Math.cos(a) * 46}%`, top: `${50 + Math.sin(a) * 46}%` }}>
              <div className="about-spin" style={{ animationDirection: 'reverse' }}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border shadow-lg transition-all duration-500 ${
                  on ? 'scale-125 bg-white border-white' : 'bg-white/85 border-slate-200'
                }`} style={{ boxShadow: on ? `0 10px 30px -6px ${c.accent}88` : undefined }}>
                  <c.icon size={18} style={{ color: c.accent }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* core */}
      <div className="absolute inset-[30%] rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-2xl shadow-slate-900/10 flex flex-col items-center justify-center text-center px-3">
        <div key={cat.id} className="about-word-in">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: cat.accent }}>{cat.features.length} features</div>
          <div className="text-[13px] sm:text-sm font-semibold text-slate-900 leading-tight mt-0.5">{cat.name}</div>
        </div>
      </div>
    </div>
  );
}

function CategoryNav({ active }) {
  return (
    <div className="sticky top-[4.5rem] z-30 bg-white/80 backdrop-blur-xl border-y border-slate-200/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex gap-1.5 overflow-x-auto hide-scrollbar py-2.5">
          {CATEGORIES.map(c => {
            const on = active === c.id;
            return (
              <a key={c.id} href={`#${c.id}`}
                className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ${
                  on ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}>
                <c.icon size={14} style={{ color: on ? '#fff' : c.accent }} />
                {c.name}
              </a>
            );
          })}
          <a href="#secret"
            className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 ${
              active === 'secret' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}>
            <Lock size={14} /> Secret
          </a>
        </nav>
      </div>
    </div>
  );
}

function CategorySection({ cat, index }) {
  const alt = index % 2 === 1;
  return (
    <section id={cat.id} className={`py-16 sm:py-24 scroll-mt-32 ${alt ? 'bg-slate-50' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11">
                  <div className="absolute inset-0 rounded-xl blur-lg opacity-50" style={{ background: cat.accent }} />
                  <div className="relative w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent}cc)` }}>
                    <cat.icon size={20} />
                  </div>
                </div>
                <Eyebrow>{`0${index + 1} · ${cat.name}`}</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight leading-tight text-slate-900">{cat.title}</h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-3 text-[15px] text-slate-500 leading-relaxed">{cat.desc}</p>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <div className="flex flex-wrap gap-2">
              {cat.apps.map(a => {
                const Icon = APP_ICON[a];
                return (
                  <span key={a} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                    <Icon size={12} className="text-slate-400" /> {a}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[340px_1fr] gap-10 lg:gap-12 items-start">
          <div className={`lg:sticky lg:top-36 ${alt ? 'lg:order-2' : ''}`}>
            <Reveal delay={100}>
              <FeaturePhone id={cat.id} />
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {cat.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 4) * 60} className="h-full">
                <SpotlightCard glow={cat.glow}
                  className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <f.icon size={16} style={{ color: cat.accent }} />
                    </div>
                    {f.isNew && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200">New</span>
                    )}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SecretCard({ s, i }) {
  return (
    <Reveal delay={i * 100} className="h-full">
      <div className="group relative h-full rounded-3xl p-px overflow-hidden">
        <div className="about-glow-border absolute inset-[-50%] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-slate-900/95 p-6 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="relative">
            <div className="flex items-center justify-between mb-10">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <s.icon size={18} className="text-slate-500 blur-[2px] group-hover:blur-0 group-hover:text-brand-400 transition-all duration-500" />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <Lock size={10} /> Classified
              </span>
            </div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-400 mb-2">{s.code}</div>
            <div className="h-4 w-3/4 rounded bg-white/10 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
            <div className="h-4 w-1/2 rounded bg-white/10 mb-5 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{s.hint}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function Features() {
  const [active, setActive] = useState(CATEGORIES[0].id);

  // Highlight the category currently in view.
  useEffect(() => {
    const ids = [...CATEGORIES.map(c => c.id), 'secret'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="overflow-x-clip">
      <Seo
        title="Features — Visitor QR Passes, Dues Collection, Calls, Safety & Community"
        description="Every feature your estate needs: visitor QR passes, Paystack dues collection, in-app calls, anti-stalking safety tools, an escrow marketplace and a community lounge. Built for Nigeria."
        path="/features"
        keywords="estate features Nigeria, visitor management, QR passes, service charge collection, estate security alerts, in-app calls, estate marketplace"
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-14 sm:pt-32 sm:pb-20">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <Reveal><Pill badge={`${NEW_COUNT} new`}>{TOTAL}+ features across 3 apps</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Everything your estate needs,
                <RotatingWord />
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                Visitors, security, calls, dues, a marketplace and a whole community lounge — connected across the Admin, AreaMates and Guard apps.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <PrimaryButton to="/contact#book-demo">Book a demo</PrimaryButton>
                <Link to="/pricing" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/70 hover:bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 transition-all">
                  View pricing
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <Orbit />
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="relative bg-slate-900 py-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {[0, 1].flatMap(k => CATEGORIES.flatMap(c => c.features.slice(0, 3).map(f => (
            <span key={`${k}-${c.id}-${f.title}`} className="flex items-center gap-6 px-3 text-sm font-medium text-slate-400 whitespace-nowrap">
              {f.title}<span className="w-1 h-1 rounded-full" style={{ background: c.accent }} />
            </span>
          ))))}
        </div>
      </div>

      <CategoryNav active={active} />

      {CATEGORIES.map((c, i) => <CategorySection key={c.id} cat={c} index={i} />)}

      {/* ── SECRET ───────────────────────────────────────────────────── */}
      <section id="secret" className="relative py-16 sm:py-24 bg-slate-950 overflow-hidden scroll-mt-32">
        <div className="about-aurora absolute -top-32 -left-20 w-[28rem] h-[28rem] bg-brand-500/15 rounded-full blur-3xl" />
        <div className="about-aurora absolute -bottom-32 right-0 w-[26rem] h-[26rem] bg-indigo-500/15 rounded-full blur-3xl" style={{ animationDelay: '-7s' }} />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <Reveal><Eyebrow dark>Classified</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-white">
                A few things we’re keeping secret.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-400">
                They’re built, they’re live — and they’re unlike anything else in estate software. See them in a demo.
              </p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {SECRETS.map((s, i) => <SecretCard key={s.code} s={s} i={i} />)}
          </div>
          <Reveal delay={200}>
            <div className="mt-10 text-center">
              <PrimaryButton to="/contact#book-demo" dark={false}>Unlock them in a demo</PrimaryButton>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-16 sm:h-24 bg-white" />
      <GlowCTA title="All of this, one platform." subtitle="Every plan includes the Admin, AreaMates and Guard apps. Plans from ₦20,000/month.">
        <PrimaryButton to="https://area-connector.areaconnect.pro/register" dark={false}>Get started</PrimaryButton>
        <Link to="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
          Compare plans
        </Link>
      </GlowCTA>
    </div>
  );
}
