import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, ArrowRight, ChevronDown, Zap, Building2, Shield, Star } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

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
    ctaTo: '/contact',
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

/* ─── FAQ item ────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 bg-white ${open ? 'border-brand-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-slate-900 text-sm sm:text-[15px] leading-relaxed">{q}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180 text-brand-500' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Cell renderer for comparison table ────────────────────────────────── */
function Cell({ val }) {
  if (val === true)  return <CheckCircle2 size={16} className="text-brand-500 mx-auto" />;
  if (val === false) return <X size={15} className="text-slate-200 mx-auto" />;
  return <span>{val}</span>;
}

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Pricing"
        title={
          <>
            Simple pricing,<br />
            <span className="gradient-text-brand">four clear tiers.</span>
          </>
        }
        subtitle="From ₦20,000/month for small estates to custom pricing for property management companies. Every plan includes Admin, AreaMates, and Guard."
      >
        {/* Annual / Monthly toggle */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className={`text-sm font-semibold transition-colors ${!annual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(a => !a)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${annual ? 'bg-brand-500' : 'bg-slate-600'}`}
            aria-label="Toggle annual billing"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${annual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm font-semibold transition-colors flex items-center gap-2 ${annual ? 'text-white' : 'text-slate-500'}`}>
            Annual
            <span className="bg-brand-500/20 border border-brand-500/30 text-brand-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Save 20%
            </span>
          </span>
        </div>
      </PageHero>

      {/* ── PLAN CARDS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
            {PLANS.map((plan, i) => {
              const IconComp = plan.icon;
              const isCustom = plan.price.monthly === 'Custom';
              return (
                <Reveal key={plan.id} delay={i * 60}>
                  <div className={`relative rounded-2xl border p-7 flex flex-col h-full transition-all duration-200 ${
                    plan.featured
                      ? 'border-brand-400/40 shadow-xl shadow-brand-500/10 bg-gradient-to-b from-brand-500/5 to-white'
                      : plan.id === 'enterprise'
                      ? 'border-slate-800/20 bg-slate-950 text-white'
                      : 'border-slate-200 bg-white hover:shadow-lg hover:-translate-y-0.5'
                  }`}>

                    {plan.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap tracking-wide">
                        Most popular
                      </div>
                    )}

                    {/* Plan header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: plan.id === 'enterprise' ? 'rgba(255,255,255,0.08)' : `${plan.accent}18` }}>
                          <IconComp size={16} style={{ color: plan.id === 'enterprise' ? '#94A3B8' : plan.accent }} />
                        </div>
                        <span className={`text-sm font-black tracking-wide ${plan.id === 'enterprise' ? 'text-white' : 'text-slate-900'}`}>
                          {plan.name}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mb-2">
                        {isCustom ? (
                          <div className={`text-3xl font-black tracking-tight ${plan.id === 'enterprise' ? 'text-white' : 'text-slate-900'}`}>
                            Custom
                          </div>
                        ) : (
                          <>
                            <div className="flex items-baseline gap-1">
                              <span className={`text-3xl font-black tracking-tight ${plan.featured ? 'text-brand-600' : plan.id === 'enterprise' ? 'text-white' : 'text-slate-900'}`}>
                                {annual ? plan.perMonth.annual : plan.perMonth.monthly}
                              </span>
                              <span className={`text-sm font-medium ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-400'}`}>/mo</span>
                            </div>
                            {annual ? (
                              <div className="text-[11px] font-semibold mt-0.5" style={{ color: plan.featured ? '#059669' : '#6366F1' }}>
                                {plan.price.annual}/yr · {plan.annualNote}
                              </div>
                            ) : (
                              <div className={`text-[11px] mt-0.5 ${plan.id === 'enterprise' ? 'text-slate-500' : 'text-slate-400'}`}>
                                or {plan.price.annual}/yr — save 20%
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <p className={`text-xs leading-relaxed mb-3 ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {plan.tagline}
                      </p>

                      {/* Key specs pills */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          plan.id === 'enterprise' ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {plan.residents} residents
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          plan.id === 'enterprise' ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {plan.gates}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      to={plan.ctaTo}
                      className={`block text-center font-bold py-3 rounded-xl transition-all text-sm mb-6 ${
                        plan.featured
                          ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                          : plan.id === 'enterprise'
                          ? 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                          : 'border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}>
                      {plan.cta} <ArrowRight size={13} className="inline ml-1" />
                    </Link>

                    {/* Feature list */}
                    <div className={`border-t pt-5 flex-1 ${plan.id === 'enterprise' ? 'border-white/8' : 'border-slate-100'}`}>
                      <ul className="space-y-2.5">
                        {plan.features.map(f => (
                          <li key={f.label} className={`flex items-start gap-2.5 text-xs leading-snug ${
                            f.yes
                              ? plan.id === 'enterprise' ? 'text-slate-300' : 'text-slate-700'
                              : 'text-slate-300'
                          }`}>
                            {f.yes
                              ? <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: plan.id === 'enterprise' ? '#10B981' : plan.accent }} />
                              : <X size={13} className="flex-shrink-0 mt-0.5 text-slate-200" />}
                            {f.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <p className="text-center text-sm text-slate-400 mt-8">
              Prices exclude VAT. Need a tailored quote?{' '}
              <Link to="/contact" className="text-brand-600 hover:underline font-medium">Talk to our team.</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S IN EVERY PLAN ─────────────────────────────────────────── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <span className="section-tag mb-4 inline-flex">Every plan includes</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                The full three-app suite, always
              </h2>
              <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                No matter which tier you choose, every plan ships with all three apps. You never pay extra to give residents or guards access.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                name: 'AreaConnect Admin',
                color: '#10B981',
                bg: 'rgba(16,185,129,0.06)',
                border: 'rgba(16,185,129,0.18)',
                desc: 'The web dashboard for estate managers. Manage residents, units, payments, announcements, visitors, and analytics from any browser.',
                bullets: ['Resident & unit management', 'Visitor log & blacklist', 'Announcement broadcasts', 'Payment reconciliation', 'Analytics & reporting'],
              },
              {
                name: 'AreaMates',
                color: '#6366F1',
                bg: 'rgba(99,102,241,0.06)',
                border: 'rgba(99,102,241,0.18)',
                desc: 'The resident app. Invite visitors, pay dues, read announcements, chat with neighbours, and raise emergencies — from any device.',
                bullets: ['Visitor pre-registration & QR', 'Pay estate dues (Paystack)', 'Estate announcements', 'Community chat & marketplace', 'Emergency panic button'],
              },
              {
                name: 'AreaConnect Guard',
                color: '#3B82F6',
                bg: 'rgba(59,130,246,0.06)',
                border: 'rgba(59,130,246,0.18)',
                desc: 'The gate security app. Verify visitors by QR scan or 6-digit code, log entries and exits, and raise incidents — even offline.',
                bullets: ['QR scan & code verification', 'Check-in / check-out logging', 'Blacklist lookup', 'Offline mode with sync', 'Incident escalation button'],
              },
            ].map(app => (
              <Reveal key={app.name}>
                <div className="rounded-2xl p-6 h-full border" style={{ background: app.bg, borderColor: app.border }}>
                  <div className="text-sm font-black mb-1" style={{ color: app.color }}>{app.name}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{app.desc}</p>
                  <ul className="space-y-1.5">
                    {app.bullets.map(b => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: app.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Full comparison</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Compare plans side by side</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-slate-500 font-semibold w-2/5 bg-slate-50/60">Feature</th>
                    {PLANS.map(p => (
                      <th key={p.id} className={`px-4 py-4 text-center font-black text-xs uppercase tracking-widest ${
                        p.featured ? 'text-brand-600 bg-brand-50/50' : p.id === 'enterprise' ? 'text-slate-900 bg-slate-50' : 'text-slate-700 bg-slate-50/60'
                      }`}>
                        <div>{p.name}</div>
                        <div className={`text-[11px] font-bold mt-0.5 normal-case tracking-normal ${
                          p.featured ? 'text-brand-500' : 'text-slate-400'
                        }`}>
                          {p.id === 'enterprise' ? 'Custom' : p.perMonth.monthly + '/mo'}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, ri) => (
                    <tr key={row.label} className={`border-b border-slate-50 last:border-0 transition-colors hover:bg-slate-50/40 ${ri % 2 === 0 ? '' : 'bg-slate-50/20'}`}>
                      <td className="px-6 py-3 text-slate-700 font-medium text-sm">{row.label}</td>
                      {row.vals.map((v, ci) => (
                        <td key={ci} className={`px-4 py-3 text-center text-sm font-semibold ${
                          PLANS[ci].featured ? 'bg-brand-50/20' : ''
                        } ${v === true ? 'text-brand-500' : v === false ? 'text-slate-200' : 'text-slate-700'}`}>
                          <Cell val={v} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PER-RESIDENT CALLOUT ─────────────────────────────────────────── */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1">
                <div className="text-white font-black text-base mb-2">Prefer per-resident billing?</div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Pay <span className="text-brand-400 font-bold">₦500 per resident per month</span> (minimum ₦20,000) — ideal for smaller or fast-growing estates where a flat fee feels large. Same Starter-tier features. Contact us to set up per-resident billing.
                </p>
              </div>
              <Link to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors whitespace-nowrap">
                Ask us about it <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-tag mb-4 inline-flex">FAQ</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-3">
                Pricing questions answered
              </h2>
              <p className="text-slate-500 text-sm sm:text-base">
                Still unsure?{' '}
                <Link to="/contact" className="text-brand-600 hover:underline font-medium">Our team is happy to help.</Link>
              </p>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 30}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Setup in under 10 minutes
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Ready to get started?
            </h2>
            <p className="text-brand-100 text-base sm:text-xl mb-10 leading-relaxed">
              Join 500+ estates already running on AreaConnect.<br className="hidden sm:block" />
              Starting from just ₦20,000 per month.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="https://area-connector.areaconnect.pro/register" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-[15px] shadow-xl shadow-black/20 hover:-translate-y-0.5">
                Get started <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px] hover:bg-white/8">
                Book a demo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> From ₦20,000/month</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> No setup fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Cancel anytime</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> 3 apps included always</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
