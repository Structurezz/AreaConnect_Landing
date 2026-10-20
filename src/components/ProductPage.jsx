import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, LayoutDashboard, Smartphone, ShieldCheck } from 'lucide-react';
import Seo from './Seo';
import { Reveal, useReveal } from './ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, PrimaryButton, SpotlightCard, GlowCTA } from './ui/Modern';

// Shared layout for the /admin, /mates and /guard product pages.

export const APPS = {
  admin: { to: '/admin', name: 'AreaConnect Admin', who: 'For estate managers', icon: LayoutDashboard, accent: '#10b981', blurb: 'Run the whole estate from one dashboard.' },
  mates: { to: '/mates', name: 'AreaMates',         who: 'For residents',       icon: Smartphone,      accent: '#6366f1', blurb: 'Passes, payments, calls and community.' },
  guard: { to: '/guard', name: 'AreaConnect Guard', who: 'For security',        icon: ShieldCheck,     accent: '#0ea5e9', blurb: 'Verify guests by code, even offline.' },
};

function Workflow({ steps, accent }) {
  const [ref, on] = useReveal(0.3);
  return (
    <div ref={ref} className="relative grid md:grid-cols-4 gap-5 md:gap-6">
      <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px bg-slate-200" />
      <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-px origin-left transition-transform duration-[1800ms] ease-out"
        style={{ transform: `scaleX(${on ? 1 : 0})`, background: accent }} />
      {steps.map((s, i) => (
        <div key={s.title}
          className={`relative flex md:flex-col items-start md:items-center gap-4 md:text-center transition-all duration-700 ${on ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: `${i * 300}ms` }}>
          <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-[0_0_0_6px_#f8fafc]"
            style={{ borderColor: accent, color: accent }}>
            {i + 1}
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-[13px] text-slate-500 leading-relaxed md:max-w-[210px] md:mx-auto">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProductPage({ id, seo, pill, title, subtitle, mockup, facts, features, featuresTitle, workflowTitle, steps, ctaTitle, ctaSubtitle }) {
  const app = APPS[id];
  const others = Object.entries(APPS).filter(([k]) => k !== id).map(([, v]) => v);
  const glow = `${app.accent}22`;

  return (
    <div className="overflow-x-clip">
      <Seo {...seo} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-14 sm:pt-32 sm:pb-20">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-10 items-center">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm pl-1 pr-3 py-1 text-xs text-slate-600">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: app.accent }}>
                  <app.icon size={12} />
                </span>
                {app.name} · {app.who.replace('For ', 'for ')}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.1rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                {title}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">{subtitle}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <PrimaryButton to="https://area-connector.areaconnect.pro/register">Start 14-day free trial</PrimaryButton>
                <Link to="/contact#book-demo" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/70 hover:bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 transition-all">
                  Book a demo <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            {pill && <Reveal delay={320}><div className="mt-8"><Pill badge={pill.badge}>{pill.text}</Pill></div></Reveal>}
          </div>
          <Reveal delay={200}>{mockup}</Reveal>
        </div>

        {/* facts bar */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-14 sm:mt-20">
          <Reveal delay={120}>
            <div className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl bg-white/80 backdrop-blur border border-slate-200/80 shadow-sm overflow-hidden divide-x divide-y lg:divide-y-0 divide-slate-100">
              {facts.map(f => (
                <div key={f.label} className="flex items-center gap-3.5 p-4 sm:p-6">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center flex-shrink-0" style={{ background: glow }}>
                    <f.icon size={18} style={{ color: app.accent }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] sm:text-base font-semibold text-slate-900 leading-tight">{f.value}</div>
                    <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5">{f.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <Reveal><Eyebrow>What’s inside</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">{featuresTitle}</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link to="/features" className="inline-flex items-center gap-1.5 text-sm font-semibold group" style={{ color: app.accent }}>
                All platform features <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 70} className="h-full">
                <SpotlightCard glow={glow}
                  className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      <f.icon size={17} style={{ color: app.accent }} />
                    </div>
                    {f.isNew && <span className="text-[10px] font-semibold uppercase tracking-wider rounded-full px-2 py-0.5 bg-brand-50 text-brand-700 border border-brand-200">New</span>}
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFLOW ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">{workflowTitle}</h2>
            </Reveal>
          </div>
          <Workflow steps={steps} accent={app.accent} />
        </div>
      </section>

      {/* ── OTHER APPS ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-8">
            <Reveal><Eyebrow>Works together</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">One platform, three apps — all included.</h2>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {others.map((o, i) => (
              <Reveal key={o.to} delay={i * 80}>
                <Link to={o.to} className="block">
                  <SpotlightCard glow={`${o.accent}22`}
                    className="rounded-3xl bg-white border border-slate-200/80 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" style={{ background: o.accent }}>
                        <o.icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: o.accent }}>{o.who}</div>
                        <div className="text-base font-semibold text-slate-900">{o.name}</div>
                        <div className="text-[13px] text-slate-500">{o.blurb}</div>
                      </div>
                      <span className="w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors">
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlowCTA title={ctaTitle} subtitle={ctaSubtitle}>
        <PrimaryButton to="https://area-connector.areaconnect.pro/register" dark={false}>Start free trial</PrimaryButton>
        <Link to="/pricing" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
          See pricing
        </Link>
      </GlowCTA>
    </div>
  );
}
