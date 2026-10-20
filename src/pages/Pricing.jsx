import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight, Plus, Zap, Building2, Shield, Star, Users, LayoutDashboard, Smartphone, ShieldCheck } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, PrimaryButton, SpotlightCard, GlowCTA } from '../components/ui/Modern';
import Seo from '../components/Seo';

/* ─── Plan definitions ────────────────────────────────────────────────── */
const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Get your estate online fast.',
    price: { monthly: '₦20,000', annual: '₦192,000' },
    perMonth: { monthly: '₦20,000', annual: '₦16,000' },
    annualNote: 'Save ₦48,000 — 2 months free',
    period: '/month',
    residents: 'Up to 50',
    gates: '1 gate',
    support: 'Email support',
    featured: false,
    accent: '#64748B',
    icon: Zap,
    cta: 'Get started',
    ctaTo: 'https://area-connector.areaconnect.pro/register?plan=starter',
    features: [
      { label: 'Up to 50 residents',                yes: true  },
      { label: 'Visitor management & QR passes',    yes: true  },
      { label: 'Announcements & estate notices',    yes: true  },
      { label: 'Security alerts',                   yes: true  },
      { label: 'Guard mobile app (1 gate)',         yes: true  },
      { label: 'Basic analytics dashboard',         yes: true  },
      { label: 'Email support',                     yes: true  },
      { label: 'Payment collection',                yes: false },
      { label: 'Community chat',                    yes: false },
      { label: 'Resident marketplace',              yes: false },
      { label: 'Polls & voting',                    yes: false },
      { label: 'Events board',                      yes: false },
      { label: 'Resident lounge',                   yes: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'The full platform, most estates need this.',
    price: { monthly: '₦47,000', annual: '₦451,000' },
    perMonth: { monthly: '₦47,000', annual: '₦37,600' },
    annualNote: 'Save ₦113,000 — over 2 months free',
    period: '/month',
    residents: 'Up to 200',
    gates: 'Unlimited gates',
    support: 'Email & chat support',
    featured: true,
    accent: '#10B981',
    icon: Building2,
    cta: 'Get started',
    ctaTo: 'https://area-connector.areaconnect.pro/register?plan=growth',
    features: [
      { label: 'Up to 200 residents',               yes: true  },
      { label: 'Visitor management & QR passes',    yes: true  },
      { label: 'Announcements & estate notices',    yes: true  },
      { label: 'Security alerts',                   yes: true  },
      { label: 'Guard mobile app (unlimited gates)',yes: true  },
      { label: 'Full analytics dashboard',          yes: true  },
      { label: 'Payment collection via Paystack',   yes: true  },
      { label: 'Community chat',                    yes: true  },
      { label: 'Resident marketplace',              yes: true  },
      { label: 'Polls & voting',                    yes: true  },
      { label: 'Events board',                      yes: true  },
      { label: 'Bulk CSV resident import',          yes: true  },
      { label: 'Email & chat support',              yes: true  },
      { label: 'Resident lounge',                   yes: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Larger estates with more community features.',
    price: { monthly: '₦80,000', annual: '₦768,000' },
    perMonth: { monthly: '₦80,000', annual: '₦64,000' },
    annualNote: 'Save ₦192,000 — 2.5 months free',
    period: '/month',
    residents: 'Up to 500',
    gates: 'Unlimited gates',
    support: 'Priority email & phone',
    featured: false,
    accent: '#6366F1',
    icon: Star,
    cta: 'Get started',
    ctaTo: 'https://area-connector.areaconnect.pro/register?plan=premium',
    features: [
      { label: 'Up to 500 residents',               yes: true  },
      { label: 'Visitor management & QR passes',    yes: true  },
      { label: 'Announcements & estate notices',    yes: true  },
      { label: 'Security alerts',                   yes: true  },
      { label: 'Guard mobile app (unlimited gates)',yes: true  },
      { label: 'Full analytics dashboard',          yes: true  },
      { label: 'Payment collection via Paystack',   yes: true  },
      { label: 'Community chat',                    yes: true  },
      { label: 'Resident marketplace',              yes: true  },
      { label: 'Polls & voting',                    yes: true  },
      { label: 'Events board',                      yes: true  },
      { label: 'Resident lounge',                   yes: true  },
      { label: 'Bulk CSV resident import',          yes: true  },
      { label: 'Data export (CSV / PDF)',           yes: true  },
      { label: 'Custom estate profile page',        yes: true  },
      { label: 'Priority email & phone support',    yes: true  },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For gated cities, groups & property firms.',
    price: { monthly: 'Custom', annual: 'Custom' },
    perMonth: { monthly: 'Custom', annual: 'Custom' },
    annualNote: null,
    period: '',
    residents: 'Unlimited',
    gates: 'Unlimited gates',
    support: 'Dedicated account manager',
    featured: false,
    accent: '#0F172A',
    icon: Shield,
    cta: 'Contact sales',
    ctaTo: '/contact#book-demo',
    features: [
      { label: 'Unlimited residents',               yes: true  },
      { label: 'Visitor management & QR passes',    yes: true  },
      { label: 'Announcements & estate notices',    yes: true  },
      { label: 'Security alerts',                   yes: true  },
      { label: 'Guard mobile app (unlimited gates)',yes: true  },
      { label: 'Full analytics dashboard',          yes: true  },
      { label: 'Payment collection via Paystack',   yes: true  },
      { label: 'Community chat',                    yes: true  },
      { label: 'Resident marketplace',              yes: true  },
      { label: 'Polls & voting',                    yes: true  },
      { label: 'Events board',                      yes: true  },
      { label: 'Resident lounge',                   yes: true  },
      { label: 'Multiple estates under one account',yes: true  },
      { label: 'Custom branding & white-labelling', yes: true  },
      { label: 'API access',                        yes: true  },
      { label: 'SLA guarantee',                     yes: true  },
      { label: 'Dedicated account manager',         yes: true  },
      { label: 'Onboarding & data migration',       yes: true  },
    ],
  },
];

// Plans as schema.org Offers so Google can show pricing in rich results.
// Built from PLANS so the markup never drifts from what's on the page.
const toNumber = (s) => s && s.replace(/[^\d]/g, '');
const PRICING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': 'https://areaconnect.pro/#software',
  name: 'AreaConnect',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Android, iOS',
  url: 'https://areaconnect.pro/pricing',
  offers: PLANS.filter(p => toNumber(p.price?.monthly)).map(p => ({
    '@type': 'Offer',
    name: `${p.name} plan`,
    description: p.tagline,
    price: toNumber(p.price.monthly),
    priceCurrency: 'NGN',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: toNumber(p.price.monthly),
      priceCurrency: 'NGN',
      unitCode: 'MON',
      billingDuration: 'P1M',
    },
    url: 'https://areaconnect.pro/pricing',
  })),
};

/* ─── Comparison rows ─────────────────────────────────────────────────── */
const COMPARE_ROWS = [
  { label: 'Residents',                   vals: ['50', '200', '500', 'Unlimited'] },
  { label: 'Gates / Guard app',           vals: ['1', '∞', '∞', '∞'] },
  { label: 'Visitor management',          vals: [true, true, true, true] },
  { label: 'Announcements',               vals: [true, true, true, true] },
  { label: 'Security alerts',             vals: [true, true, true, true] },
  { label: 'Guard mobile app',            vals: [true, true, true, true] },
  { label: 'Analytics dashboard',         vals: ['Basic', 'Full', 'Full', 'Full'] },
  { label: 'Payment collection',          vals: [false, true, true, true] },
  { label: 'Community chat',              vals: [false, true, true, true] },
  { label: 'Resident marketplace',        vals: [false, true, true, true] },
  { label: 'Polls & voting',              vals: [false, true, true, true] },
  { label: 'Events board',               vals: [false, true, true, true] },
  { label: 'Resident lounge',             vals: [false, false, true, true] },
  { label: 'Bulk CSV import',             vals: [false, true, true, true] },
  { label: 'Data export',                 vals: [false, false, true, true] },
  { label: 'Multiple estates',            vals: [false, false, false, true] },
  { label: 'Custom branding',             vals: [false, false, false, true] },
  { label: 'API access',                  vals: [false, false, false, true] },
  { label: 'Dedicated account manager',   vals: [false, false, false, true] },
  { label: 'SLA guarantee',               vals: [false, false, false, true] },
  { label: 'Support',                     vals: ['Email', 'Email & chat', 'Priority', 'Dedicated'] },
];

/* ─── FAQs ────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What is included in every plan?',
    a: 'Every plan includes the AreaConnect Admin web portal, AreaMates resident app, and the Guard mobile app. Visitor management, QR passes, announcements, and security alerts are available on all tiers — including Starter.',
  },
  {
    q: 'What does the Starter plan (₦20,000/month) include?',
    a: 'The Starter plan covers estates with up to 50 residents and one entry gate. Visitors can be pre-registered and verified by QR code or access code. Managers can post announcements and broadcast security alerts. Payment collection, community chat, marketplace, and the lounge are not included — those come in from Growth onwards.',
  },
  {
    q: 'What does the Growth plan (₦47,000/month) add?',
    a: 'Growth unlocks the full community layer — payment collection via Paystack, community chat, resident marketplace, polls, and an events board. It also adds unlimited gate support (so a single estate with multiple access points is covered) and bulk CSV import for onboarding your existing resident list. Most active residential estates in Nigeria choose Growth.',
  },
  {
    q: 'What is the difference between Growth and Premium (₦80,000/month)?',
    a: 'Premium is designed for larger estates (up to 500 residents) that need the full social and engagement layer. It adds the Resident Lounge (community playlist, polls, events social feed), data export in CSV and PDF formats, a custom estate profile page, and priority phone support. If your estate runs active community events or needs richer analytics exports, Premium is the right fit.',
  },
  {
    q: 'Who is Enterprise for?',
    a: 'Enterprise is built for property management companies, gated cities, or estate developers running multiple estates under one umbrella. You get a single login to manage all your estates, custom branding / white-labelling so residents see your brand instead of AreaConnect, full API access for custom integrations, a dedicated account manager, and an SLA guarantee with a defined uptime commitment.',
  },
  {
    q: 'How does annual billing work?',
    a: 'You pay once upfront for 12 months and receive a 20% discount — equivalent to getting 2–2.5 months free. Starter drops from ₦240k to ₦192k/year. Growth goes from ₦564k to ₦451k/year. Premium drops from ₦960k to ₦768k/year. Annual billing is highly recommended for estates with a predictable resident base.',
  },
  {
    q: 'Can I upgrade or downgrade at any time?',
    a: 'Yes. Upgrades take effect immediately — you are billed a prorated amount for the remainder of your billing cycle. Downgrades take effect at the end of your current period. Moving from monthly to annual billing can be done at any time.',
  },
  {
    q: 'What if my estate grows beyond the plan resident limit?',
    a: 'We will never cut off your service because your estate grew. You will receive a notification when you approach your limit, and we will move you to the next tier with a prorated adjustment. If you are already on Premium and growing beyond 500 residents, contact us for an Enterprise quote.',
  },
  {
    q: 'Do you offer per-resident pricing?',
    a: 'Yes — if a flat monthly fee does not suit your estate, we offer ₦500 per resident per month (minimum ₦20,000). This is the same as the Starter feature set. For Growth or Premium features on per-resident pricing, contact us and we will tailor a quote.',
  },
  {
    q: 'Are there setup or onboarding fees?',
    a: 'No. There are no setup fees on Starter, Growth, or Premium. For Enterprise, optional white-glove onboarding and data migration from existing systems can be provided — pricing is agreed separately.',
  },
];

const APPS = [
  { name: 'AreaConnect Admin', icon: LayoutDashboard, color: 'text-brand-500',  glow: 'rgba(16,185,129,.12)', desc: 'The web dashboard for estate managers — residents, units, payments, visitors and analytics.', bullets: ['Resident & unit management', 'Visitor log & blacklist', 'Payment reconciliation', 'Analytics & reporting'] },
  { name: 'AreaMates',         icon: Smartphone,      color: 'text-indigo-500', glow: 'rgba(99,102,241,.12)', desc: 'The resident app — invite visitors, pay dues, read announcements and chat with neighbours.', bullets: ['Visitor pre-registration & QR', 'Pay dues with Paystack', 'Community chat & marketplace', 'Emergency panic button'] },
  { name: 'AreaConnect Guard', icon: ShieldCheck,     color: 'text-blue-500',   glow: 'rgba(59,130,246,.12)', desc: 'The gate app — verify visitors by 6-digit code, log entries and raise incidents, even offline.', bullets: ['6-digit code verification', 'Check-in / check-out logging', 'Offline mode with sync', 'Incident escalation'] },
];

// Resident count → recommended plan index.
const LIMITS = [50, 200, 500, Infinity];
const planFor = (n) => LIMITS.findIndex(l => n <= l);

/* ─── Pieces ──────────────────────────────────────────────────────────── */

function BillingToggle({ annual, setAnnual }) {
  return (
    <div className="relative inline-grid grid-cols-2 rounded-full bg-slate-100 border border-slate-200 p-1 text-sm font-semibold">
      <span className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${annual ? 'translate-x-full' : ''}`} />
      <button type="button" onClick={() => setAnnual(false)} className={`relative z-10 px-5 py-2 transition-colors ${annual ? 'text-slate-500' : 'text-slate-900'}`}>
        Monthly
      </button>
      <button type="button" onClick={() => setAnnual(true)} className={`relative z-10 px-5 py-2 transition-colors flex items-center gap-1.5 ${annual ? 'text-slate-900' : 'text-slate-500'}`}>
        Annual <span className="text-[10px] font-bold text-brand-600 bg-brand-50 rounded-full px-1.5 py-0.5">−20%</span>
      </button>
    </div>
  );
}

function SizeSlider({ residents, setResidents }) {
  const pct = ((residents - 10) / (1000 - 10)) * 100;
  const plan = PLANS[planFor(residents)];
  return (
    <div className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl bg-white/80 backdrop-blur border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="flex items-center gap-2 text-slate-500"><Users size={15} className="text-brand-500" /> Residents in your estate</span>
        <span className="font-semibold text-slate-900 tabular-nums">{residents >= 1000 ? '1,000+' : residents}</span>
      </div>
      <input type="range" min={10} max={1000} step={10} value={residents}
        onChange={e => setResidents(Number(e.target.value))}
        aria-label="Number of residents"
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-500"
        style={{ background: `linear-gradient(to right, #10b981 ${pct}%, #e2e8f0 ${pct}%)` }} />
      <div className="mt-3 text-xs text-slate-500">
        We'd recommend <span key={plan.id} className="about-word-in inline-block font-semibold text-slate-900">{plan.name}</span>
      </div>
    </div>
  );
}

function PlanCard({ plan, annual, recommended, i }) {
  const isCustom = plan.price.monthly === 'Custom';
  const dark = plan.featured;
  const included = plan.features.filter(f => f.yes);
  const Icon = plan.icon;
  const price = annual ? plan.perMonth.annual : plan.perMonth.monthly;

  const body = (
    <div className={`relative h-full flex flex-col rounded-[calc(1.75rem-1px)] p-6 ${dark ? 'bg-slate-950 text-white' : 'bg-white'}`}>
      {dark && <div className="absolute -top-20 -right-16 w-56 h-56 bg-brand-500/25 rounded-full blur-3xl pointer-events-none" />}
      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-slate-50 border border-slate-100'}`}>
            <Icon size={16} style={{ color: dark ? '#34d399' : plan.accent }} />
          </div>
          <span className={`text-[15px] font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</span>
        </div>
        {plan.featured && (
          <span className="text-[10px] font-semibold uppercase tracking-wider text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-2 py-0.5">Popular</span>
        )}
      </div>

      <div className="relative">
        {isCustom ? (
          <div className={`text-[2rem] font-bold tracking-tight leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>Custom</div>
        ) : (
          <div className="flex items-baseline gap-1 h-9 overflow-hidden">
            <span key={price} className={`about-word-in inline-block text-[2rem] font-bold tracking-tight leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>{price}</span>
            <span className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-400'}`}>/mo</span>
          </div>
        )}
        <div className={`mt-2 text-xs min-h-[16px] ${dark ? 'text-brand-300' : annual ? 'text-brand-600' : 'text-slate-400'}`}>
          {isCustom ? 'Tailored to your portfolio' : annual ? `${plan.price.annual}/yr · ${plan.annualNote}` : `or ${plan.price.annual}/yr — save 20%`}
        </div>
        <p className={`mt-4 text-[13px] leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{plan.tagline}</p>
      </div>

      <Link to={plan.ctaTo}
        className={`relative mt-5 inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-semibold py-2.5 transition-all ${
          dark ? 'bg-brand-500 hover:bg-brand-400 text-white'
               : 'border border-slate-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800'
        }`}>
        {plan.cta} <ArrowRight size={14} />
      </Link>

      <div className={`relative mt-6 pt-5 border-t flex-1 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
        <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] mb-3 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          {plan.residents} residents · {plan.gates}
        </div>
        <ul className="space-y-2">
          {included.slice(1).map(f => (
            <li key={f.label} className={`flex items-start gap-2 text-[13px] leading-snug ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${dark ? 'bg-brand-500/20 text-brand-300' : 'bg-brand-50 text-brand-600'}`}>
                <Check size={10} strokeWidth={3} />
              </span>
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <Reveal delay={i * 80} className="h-full">
      <div className={`relative h-full rounded-[1.75rem] p-px transition-all duration-500 ${
        recommended ? 'lg:-translate-y-2 shadow-2xl shadow-brand-500/15' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5'
      } ${dark ? 'overflow-hidden' : recommended ? 'bg-gradient-to-b from-brand-400 to-brand-200' : 'bg-slate-200/80'}`}>
        {dark && <div className="about-glow-border absolute inset-[-50%]" />}
        {recommended && (
          <div className="absolute -top-px left-1/2 -translate-x-1/2 z-20 about-feed-in rounded-b-xl bg-brand-500 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1">
            Best fit for you
          </div>
        )}
        {body}
      </div>
    </Reveal>
  );
}

function Cell({ val }) {
  if (val === true)  return <span className="inline-flex w-5 h-5 rounded-full bg-brand-50 text-brand-600 items-center justify-center"><Check size={12} strokeWidth={3} /></span>;
  if (val === false) return <span className="inline-block w-3 h-px bg-slate-200 align-middle" />;
  return <span className="text-slate-700">{val}</span>;
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
export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [residents, setResidents] = useState(150);
  const [openFaq, setOpenFaq] = useState(0);
  const recommended = planFor(residents);

  return (
    <div className="overflow-x-hidden">
      <Seo
        title="Pricing — Plans from ₦20,000/month"
        description="Simple, honest pricing for Nigerian estates. Plans from ₦20,000/month (Starter) up to Enterprise. All three AreaConnect apps included — no hidden fees, Paystack-native."
        path="/pricing"
        keywords="estate management pricing Nigeria, AreaConnect price, service charge software cost, estate app plans"
        jsonLd={PRICING_SCHEMA}
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-16">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-end">
          <div className="text-center lg:text-left">
            <Reveal><Pill badge="3 apps">Included on every plan</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Simple pricing that{' '}
                <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">grows with your estate.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                From ₦20,000/month for small estates to custom pricing for property firms. No setup fees, Paystack-native.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8"><BillingToggle annual={annual} setAnnual={setAnnual} /></div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <SizeSlider residents={residents} setResidents={setResidents} />
          </Reveal>
        </div>
      </section>

      {/* ── PLANS ────────────────────────────────────────────────────── */}
      <section className="relative bg-white pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 items-stretch">
            {PLANS.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} annual={annual} recommended={i === recommended} i={i} />
            ))}
          </div>
          <Reveal delay={120}>
            <p className="text-center text-xs sm:text-sm text-slate-400 mt-8">
              Prices exclude VAT. Need a tailored quote?{' '}
              <Link to="/contact#book-demo" className="text-brand-600 hover:underline font-medium">Book a call with the team.</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── APPS ─────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Every plan includes</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">The full three-app suite, always.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-500">You never pay extra to give residents or guards access.</p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {APPS.map((app, i) => (
              <Reveal key={app.name} delay={i * 80} className="h-full">
                <SpotlightCard glow={app.glow} className="h-full rounded-3xl bg-white border border-slate-200/80 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <app.icon size={18} className={app.color} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900">{app.name}</h3>
                  <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">{app.desc}</p>
                  <ul className="mt-5 space-y-2">
                    {app.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-[13px] text-slate-600">
                        <Check size={13} className={app.color} strokeWidth={3} /> {b}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Reveal><Eyebrow>Full comparison</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Compare plans side by side.</h2>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="rounded-3xl border border-slate-200/80 overflow-x-auto bg-white">
              <table className="w-full text-[13px] sm:text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-5 sm:px-6 py-4 font-medium text-slate-400 w-2/5">Feature</th>
                    {PLANS.map((p, i) => (
                      <th key={p.id} className={`px-3 py-4 text-center transition-colors duration-300 ${i === recommended ? 'bg-brand-50/70' : ''}`}>
                        <div className={`text-sm font-semibold ${i === recommended ? 'text-brand-700' : 'text-slate-900'}`}>{p.name}</div>
                        <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                          {p.id === 'enterprise' ? 'Custom' : `${annual ? p.perMonth.annual : p.perMonth.monthly}/mo`}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map(row => (
                    <tr key={row.label} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 sm:px-6 py-3 text-slate-600">{row.label}</td>
                      {row.vals.map((v, ci) => (
                        <td key={ci} className={`px-3 py-3 text-center font-medium transition-colors duration-300 ${ci === recommended ? 'bg-brand-50/40' : ''}`}>
                          <Cell val={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Per-resident option */}
          <Reveal delay={80}>
            <div className="mt-6 relative rounded-3xl bg-slate-900 overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="about-aurora absolute -top-20 -left-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
              <div className="relative flex-1">
                <div className="text-white text-[15px] font-semibold mb-1.5">Prefer per-resident billing?</div>
                <p className="text-slate-400 text-[13px] sm:text-sm leading-relaxed">
                  Pay <span className="text-brand-400 font-semibold">₦500 per resident per month</span> (minimum ₦20,000) with the Starter feature set — ideal for smaller or fast-growing estates.
                </p>
              </div>
              <Link to="/contact#book-demo"
                className="relative flex-shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
                Ask us about it <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>FAQ</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Pricing questions, answered.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-[15px] text-slate-500">
                  Still unsure? <Link to="/contact#book-demo" className="text-brand-600 font-medium hover:underline">Book a 30-minute call</Link> and we'll walk you through it.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 30}>
                <FaqItem q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(o => (o === i ? -1 : i))} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 sm:h-24 bg-white" />
      <GlowCTA title="Ready to get started?" subtitle="Plans from ₦20,000/month. No setup fees. All three apps included.">
        <PrimaryButton to="https://area-connector.areaconnect.pro/register" dark={false}>Get started</PrimaryButton>
        <Link to="/contact#book-demo" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
          Book a demo
        </Link>
      </GlowCTA>
    </div>
  );
}
