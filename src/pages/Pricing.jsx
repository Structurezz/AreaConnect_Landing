import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

const PLANS = [
  {
    name: 'Growth',
    price: { monthly: '₦50,000', annual: '₦400,000' },
    annualNote: 'Billed annually · save ₦200,000/yr',
    period: { monthly: '/month', annual: '/year' },
    residents: '150',
    desc: 'The complete platform for estates ready to go fully digital.',
    cta: 'Get started',
    ctaTo: '/contact',
    featured: true,
    features: [
      { label: 'Up to 150 residents',             yes: true  },
      { label: 'Visitor management & QR passes',  yes: true  },
      { label: 'Announcements',                   yes: true  },
      { label: 'Community chat',                  yes: true  },
      { label: 'Security alerts',                 yes: true  },
      { label: 'Guard mobile app',                yes: true  },
      { label: 'Payment collection',              yes: true  },
      { label: 'Resident marketplace',            yes: true  },
      { label: 'Polls & voting',                  yes: true  },
      { label: 'Events board',                    yes: true  },
      { label: 'Analytics dashboard',             yes: true  },
      { label: 'Resident lounge',                 yes: true  },
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 'Custom', annual: 'Custom' },
    period: { monthly: '', annual: '' },
    residents: 'Unlimited',
    desc: 'For large estates, gated cities, and property management companies.',
    cta: 'Contact sales',
    ctaTo: '/contact',
    featured: false,
    features: [
      { label: 'Unlimited residents',             yes: true  },
      { label: 'Visitor management & QR passes',  yes: true  },
      { label: 'Announcements',                   yes: true  },
      { label: 'Community chat',                  yes: true  },
      { label: 'Security alerts',                 yes: true  },
      { label: 'Guard mobile app',                yes: true  },
      { label: 'Payment collection',              yes: true  },
      { label: 'Resident marketplace',            yes: true  },
      { label: 'Polls & voting',                  yes: true  },
      { label: 'Events board',                    yes: true  },
      { label: 'Analytics dashboard',             yes: true  },
      { label: 'Resident lounge',                 yes: true  },
    ],
    extras: ['Multiple estates', 'Dedicated support manager', 'Custom branding', 'SLA guarantee', 'API access', 'Onboarding assistance'],
  },
];

const FAQS = [
  { q: 'What does the ₦50,000/month plan include?', a: 'Everything — visitor management, QR passes, payment collection, community chat, announcements, marketplace, polls, events, analytics, the Guard app, and AreaMates for up to 150 residents. There are no feature limits on the Growth plan.' },
  { q: 'What is per-resident pricing?', a: 'If your estate prefers to pay based on the number of residents rather than a flat fee, we offer pricing at ₦2,000 per resident per month. This is identical in features to the flat Growth plan — just a different billing model. Contact us to set this up.' },
  { q: 'How much does annual billing save?', a: 'The annual flat fee is ₦400,000/year vs ₦600,000 if billed monthly — saving you ₦200,000 per year (equivalent to 4 months free).' },
  { q: 'Can I switch plans at any time?', a: 'Yes. You can upgrade to Enterprise or switch billing models at any time. Changes take effect immediately on upgrade, or at the end of your current billing period on downgrade.' },
  { q: 'How does pricing work for multiple estates?', a: 'Multiple estates are an Enterprise feature. Each estate is billed separately. We offer volume discounts for property management companies managing 5 or more estates — contact our sales team.' },
  { q: 'What if my estate grows beyond 150 residents?', a: 'Simply contact us and we will move you to a custom plan sized for your estate. We will never cut off your service because you grew.' },
];

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

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Pricing"
        title={
          <>
            Plans that grow with<br />
            <span className="gradient-text-brand">your estate.</span>
          </>
        }
        subtitle="Simple, flat-fee pricing — or pay per resident. All plans include the Admin portal, AreaMates app, and Guard app."
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
              20% off
            </span>
          </span>
        </div>
      </PageHero>

      {/* ── PLANS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          {/* Per-resident callout */}
          <Reveal>
            <div className="bg-slate-900 rounded-2xl p-5 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-white font-black text-sm mb-1">Prefer per-resident pricing?</div>
                <div className="text-slate-400 text-xs leading-relaxed">
                  Pay <span className="text-brand-400 font-bold">₦2,000 / resident / month</span> instead of the flat fee — same features, different billing model. Ideal for smaller or growing estates.
                </div>
              </div>
              <Link to="/contact"
                className="flex-shrink-0 inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
                Ask us about it <ArrowRight size={12} />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 80}>
                <div className={`relative rounded-2xl border p-8 flex flex-col h-full transition-all duration-200 ${
                  plan.featured
                    ? 'border-brand-500/30 bg-gradient-to-br from-brand-500/5 to-indigo-500/5 shadow-xl'
                    : 'border-slate-200 bg-white hover:shadow-md'
                }`}>
                  {plan.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm whitespace-nowrap">
                      Most popular
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{plan.name}</div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className={`text-4xl font-black tracking-tight ${plan.featured ? 'text-brand-600' : 'text-slate-900'}`}>
                        {annual ? plan.price.annual : plan.price.monthly}
                      </span>
                      {plan.period[annual ? 'annual' : 'monthly'] && (
                        <span className="text-slate-400 text-sm font-medium">{plan.period[annual ? 'annual' : 'monthly']}</span>
                      )}
                    </div>
                    {annual && plan.annualNote && (
                      <div className="text-xs text-brand-600 font-semibold mb-1">{plan.annualNote}</div>
                    )}
                    {!annual && plan.featured && (
                      <div className="text-xs text-slate-400 font-medium mb-1">or ₦400,000/year · save ₦200k</div>
                    )}
                    <div className="flex items-center gap-2 mt-2 mb-2">
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {plan.residents} residents
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{plan.desc}</p>
                  </div>

                  <div className="border-t border-slate-100 pt-6 mb-6 flex-1">
                    <ul className="space-y-3">
                      {plan.features.map(f => (
                        <li key={f.label} className={`flex items-center gap-3 text-sm ${f.yes ? 'text-slate-700' : 'text-slate-300'}`}>
                          {f.yes
                            ? <CheckCircle2 size={15} className="text-brand-500 flex-shrink-0" />
                            : <X size={15} className="text-slate-200 flex-shrink-0" />}
                          {f.label}
                        </li>
                      ))}
                      {plan.extras?.map(e => (
                        <li key={e} className="flex items-center gap-3 text-sm text-slate-700">
                          <CheckCircle2 size={15} className="text-indigo-500 flex-shrink-0" />{e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={plan.ctaTo}
                    className={`block text-center font-bold py-3.5 rounded-xl transition-all text-sm ${
                      plan.featured
                        ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                        : 'border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}>
                    {plan.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <p className="text-center text-sm text-slate-400 mt-8">
              All prices exclude VAT. Need a custom quote?{' '}
              <Link to="/contact" className="text-brand-600 hover:underline font-medium">Talk to us.</Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Full comparison</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Plan comparison</h2>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="text-left px-6 py-4 text-slate-500 font-semibold w-1/2">Feature</th>
                    {PLANS.map(p => (
                      <th key={p.name} className={`px-4 py-4 text-center font-bold ${p.featured ? 'text-brand-600' : 'text-slate-700'}`}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Residents',             '150',  'Unlimited'],
                    ['Visitor management',    '✓', '✓'],
                    ['Announcements',         '✓', '✓'],
                    ['Community chat',        '✓', '✓'],
                    ['Security alerts',       '✓', '✓'],
                    ['Guard mobile app',      '✓', '✓'],
                    ['Payment collection',    '✓', '✓'],
                    ['Resident marketplace',  '✓', '✓'],
                    ['Polls & voting',        '✓', '✓'],
                    ['Events board',          '✓', '✓'],
                    ['Analytics',             '✓', '✓'],
                    ['Resident lounge',       '✓', '✓'],
                    ['Multiple estates',      '—', '✓'],
                    ['Custom branding',       '—', '✓'],
                    ['API access',            '—', '✓'],
                    ['Dedicated support',     '—', '✓'],
                    ['Per-resident pricing',  '✓', '✓'],
                  ].map(([label, ...vals]) => (
                    <tr key={label} className="border-b border-slate-50 hover:bg-slate-50/50 last:border-0 transition-colors">
                      <td className="px-6 py-3.5 text-slate-700 font-medium">{label}</td>
                      {vals.map((v, i) => (
                        <td key={i} className={`px-4 py-3.5 text-center font-semibold ${
                          v === '✓' ? 'text-brand-500' : v === '—' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          {v === '✓' ? <CheckCircle2 size={16} className="text-brand-500 mx-auto" /> : v === '—' ? <X size={16} className="text-slate-200 mx-auto" /> : v}
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

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <span className="section-tag mb-4 inline-flex">FAQ</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Pricing questions</h2>
              <p className="text-slate-500">
                Still unsure?{' '}
                <Link to="/contact" className="text-brand-600 hover:underline font-medium">Our team is here to help.</Link>
              </p>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 40}>
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
            <h2 className="text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Ready to get started?
            </h2>
            <p className="text-brand-100 text-xl mb-10 leading-relaxed">
              Join 500+ estates already running on AreaConnect.<br className="hidden sm:block" />
              From ₦50,000/month — or ₦2,000/resident/month.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-[15px] shadow-xl shadow-black/20 hover:-translate-y-0.5">
                Get started <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px] hover:bg-white/8">
                Book a demo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> From ₦50,000/month flat</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Or ₦2,000/resident/month</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Setup in 10 minutes</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
