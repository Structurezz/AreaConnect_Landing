import { Link } from 'react-router-dom';
import {
  Lock, Key, Shield, Server, Users, AlertCircle, Database, CreditCard, Mail, Activity, WifiOff, Check,
  ArrowUpRight, ShieldCheck,
} from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal, useReveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, SpotlightCard } from '../components/ui/Modern';

const PILLARS = [
  { icon: Lock,        title: 'Encryption in transit', desc: 'All traffic between the apps and our servers runs over HTTPS (TLS), so data is encrypted in transit.' },
  { icon: Key,         title: 'Password hashing',      desc: 'Passwords are hashed with bcrypt at cost factor 12. We never store plaintext passwords.' },
  { icon: Shield,      title: 'Short-lived tokens',    desc: 'Access tokens expire after 15 minutes. Refresh tokens are checked server-side and revoked on sign-out or password change.' },
  { icon: Server,      title: 'Estate isolation',      desc: 'Every record is scoped to a single estate. No cross-estate access is possible.' },
  { icon: Users,       title: 'Role-based access',     desc: 'Managers, guards and residents only see what their role needs — enforced on the server, not just in the app.' },
  { icon: AlertCircle, title: 'Responsible disclosure', desc: 'Found a vulnerability? Report it privately and we’ll work with you to fix it.' },
];

const STACK = [
  { icon: Server,     label: 'Hosting',     text: 'The AreaConnect API runs on Railway, and our web apps are served over HTTPS from a global CDN. Security headers are applied to every API response.' },
  { icon: Database,   label: 'Database',    text: 'Resident and estate data is stored in MongoDB Atlas, a managed cloud database with encrypted connections.' },
  { icon: CreditCard, label: 'Payments',    text: 'Card and bank details are handled exclusively by Paystack, a PCI DSS Level 1 certified processor. We never see or store card numbers.' },
  { icon: Mail,       label: 'Email',       text: 'Transactional emails are delivered via Resend with DKIM and SPF authentication to prevent spoofing.' },
  { icon: Activity,   label: 'Reliability', text: 'Services are health-checked and restart automatically on failure.' },
  { icon: WifiOff,    label: 'At the gate', text: 'The Guard app keeps verifying visitors offline and syncs once the connection returns.' },
];

const COMPLIANCE = [
  { title: 'NDPA 2023',              desc: 'We handle personal data in line with the Nigerian Data Protection Act 2023 — only what each feature needs, never sold.' },
  { title: 'PCI DSS via Paystack',   desc: 'Payment processing is handled by Paystack, which is PCI DSS Level 1 certified.' },
  { title: 'HTTPS everywhere',       desc: 'All traffic to and from AreaConnect is encrypted in transit.' },
];

// Animated "request path" diagram: device → HTTPS → API → estate-scoped data.
function DataPath() {
  const [ref, on] = useReveal(0.3);
  const nodes = [
    { icon: ShieldCheck, label: 'Your device', sub: 'Admin · AreaMates · Guard' },
    { icon: Lock,        label: 'HTTPS',       sub: 'Encrypted in transit' },
    { icon: Key,         label: 'API',         sub: 'Token + role checked' },
    { icon: Database,    label: 'Your estate', sub: 'Isolated records' },
  ];
  return (
    <div ref={ref} className="relative rounded-[1.75rem] bg-slate-900 overflow-hidden p-6 sm:p-8">
      <div className="about-aurora absolute -top-20 -left-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
        <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-white/10" />
        <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-px bg-brand-400 origin-left transition-transform duration-[1600ms] ease-out" style={{ transform: `scaleX(${on ? 1 : 0})` }} />
        {nodes.map((n, i) => (
          <div key={n.label} className={`relative flex flex-col items-center text-center transition-all duration-700 ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: `${i * 350}ms` }}>
            <span className="relative z-10 w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-brand-300 flex items-center justify-center"><n.icon size={18} /></span>
            <div className="mt-3 text-sm font-semibold text-white">{n.label}</div>
            <div className="text-[12px] text-slate-400">{n.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Security() {
  return (
    <div className="overflow-x-clip">
      <Seo
        title="Security — How We Protect Your Estate Data"
        description="Data isolation per estate, HTTPS encryption in transit, bcrypt password hashing, short-lived auth tokens and Paystack-handled payment data — on every plan."
        path="/security"
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-14 sm:pt-32 sm:pb-20">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl">
            <Reveal><Pill badge="Security">On every plan</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Your estate’s data,{' '}
                <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">locked down.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-xl">
                Residents trust their estate with their homes, visitors and payments. Here is exactly how we protect that data.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}><div className="mt-10"><DataPath /></div></Reveal>
        </div>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Security foundations</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Built secure by design.</h2></Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70} className="h-full">
                <SpotlightCard className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <p.icon size={17} className="text-brand-500" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{p.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFRASTRUCTURE ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal><Eyebrow>Infrastructure</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Trusted providers, end to end.</h2></Reveal>
              <Reveal delay={120}><p className="mt-3 text-[15px] text-slate-500">The services that run AreaConnect — and what each one is responsible for.</p></Reveal>
            </div>
          </div>
          <div className="space-y-2.5">
            {STACK.map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-0.5 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors"><s.icon size={16} /></span>
                  <div>
                    <div className="text-[15px] font-semibold text-slate-900">{s.label}</div>
                    <p className="mt-0.5 text-[13px] sm:text-sm text-slate-500 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Compliance</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Standards we work to.</h2></Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {COMPLIANCE.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="h-full">
                <div className="h-full rounded-2xl bg-white border border-slate-200/80 p-6">
                  <span className="inline-flex w-8 h-8 rounded-full bg-brand-500 text-white items-center justify-center mb-4"><Check size={14} strokeWidth={3} /></span>
                  <div className="text-[15px] font-semibold text-slate-900">{c.title}</div>
                  <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLOSURE ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white px-4 sm:px-6">
        <Reveal>
          <div className="relative max-w-5xl mx-auto rounded-[2rem] p-px overflow-hidden">
            <div className="about-glow-border absolute inset-[-50%]" />
            <div className="relative rounded-[calc(2rem-1px)] bg-slate-950 p-6 sm:p-10 overflow-hidden grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative">
                <Eyebrow dark>Responsible disclosure</Eyebrow>
                <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-white">Found a vulnerability?</h2>
                <ul className="mt-5 space-y-2.5">
                  {['We acknowledge reports as quickly as we can', 'We investigate promptly and thoroughly', 'We fix confirmed issues in a timely manner', 'No legal action against good-faith researchers'].map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-brand-500/20 text-brand-300 flex items-center justify-center flex-shrink-0"><Check size={11} strokeWidth={3} /></span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6">
                <p className="text-sm text-slate-400 leading-relaxed">Email the details, including steps to reproduce. Please don’t disclose publicly until we’ve had a chance to fix it.</p>
                <a href="mailto:michael@areaconnect.pro?subject=Security%20report"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold py-2.5 transition-colors">
                  <Mail size={14} /> Report a vulnerability
                </a>
                <Link to="/privacy" className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">
                  Read our Privacy Policy <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
