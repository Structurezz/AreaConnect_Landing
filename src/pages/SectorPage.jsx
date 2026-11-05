import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Plus, X, Check, ShieldCheck, AlertTriangle, ClipboardCheck, MapPin, Navigation, Timer } from 'lucide-react';
import Seo from '../components/Seo';
import { APPS, Workflow } from '../components/ProductPage';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, PrimaryButton, SpotlightCard, GlowCTA } from '../components/ui/Modern';
import { SECTORS, SECTOR_LINKS, SECTOR_TERMS, REGISTER } from '../lib/sectors';

// One data-driven page for /schools, /hotels, /industries and /hospitals.
// Content lives in src/lib/sectors.js.

const SITE_URL = 'https://areaconnect.pro';

function schemas(s) {
  const url = `${SITE_URL}${s.path}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `AreaConnect for ${s.name}`,
      serviceType: s.seo.serviceType,
      description: s.seo.description,
      url,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: { '@type': 'Country', name: 'Nigeria' },
      audience: { '@type': 'BusinessAudience', name: s.name },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: `AreaConnect for ${s.name} features`,
        itemListElement: s.features.map(f => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: f.title, description: f.desc },
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
  ];
}

/* ─── Hero visual: what the gate / front desk sees ──────────────────────── */

function GateMock({ s }) {
  const g = s.gate;
  const tone = g.warn ? '#f59e0b' : s.accent;
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 rounded-[2.5rem] blur-3xl opacity-60 pointer-events-none" style={{ background: `${s.accent}26` }} />
      <div className="relative rounded-[1.75rem] bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-slate-700">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white" style={{ background: s.accent }}>
              <s.icon size={14} />
            </span>
            {g.app}
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" /> Live
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 text-[12px] font-semibold"
            style={{ background: `${tone}14`, color: tone }}>
            {g.warn ? <AlertTriangle size={14} /> : <ShieldCheck size={14} />}
            {g.status}
          </div>

          {g.hours && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <Timer size={12} /> {g.hours}
            </div>
          )}

          {g.board && (
            <div className="mt-4 grid grid-cols-5 gap-1.5">
              {g.board.map(b => (
                <div key={b.label} className="rounded-xl bg-slate-50 border border-slate-100 px-1 py-2.5 text-center">
                  <div className="text-lg font-bold leading-none" style={{ color: b.c }}>{b.n}</div>
                  <div className="mt-1 text-[9px] font-medium text-slate-400 uppercase tracking-wide">{b.label}</div>
                </div>
              ))}
            </div>
          )}

          <dl className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
            {g.rows.map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-[12px]">
                <dt className="text-slate-400">{k}</dt>
                <dd className="font-semibold text-slate-800 text-right">{v}</dd>
              </div>
            ))}
          </dl>

          {g.place && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border p-3" style={{ borderColor: `${s.accent}33`, background: `${s.accent}0d` }}>
              <span className="w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0" style={{ background: s.accent }}><MapPin size={16} /></span>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Going to</div>
                <div className="text-[13px] font-semibold text-slate-900 leading-tight">{g.place.name}</div>
                <div className="text-[11px] text-slate-500 truncate">{g.place.sub}</div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-semibold" style={{ color: s.accent }}>
                <Navigation size={11} /> Directions
              </span>
            </div>
          )}

          {g.induction && (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700"><ClipboardCheck size={12} /> Site safety induction</div>
              <p className="mt-1 text-[11px] text-amber-800/80 leading-relaxed">{g.induction}</p>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                <span className="w-4 h-4 rounded flex items-center justify-center text-white" style={{ background: s.accent }}><Check size={10} strokeWidth={3} /></span>
                Visitor has read and accepted
              </div>
            </div>
          )}

          {g.override && (
            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600 leading-relaxed">{g.override}</div>
          )}

          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-full text-white text-[13px] font-semibold py-2.5" style={{ background: s.accent }}>
            {g.action} <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {g.chip && (
        <div className="absolute -bottom-6 -left-2 sm:-left-8 animate-float flex items-center gap-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/10 px-3.5 py-2.5">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}18` }}>
            <g.chip.icon size={15} style={{ color: s.accent }} />
          </span>
          <div>
            <div className="text-[12px] font-semibold text-slate-900 leading-tight">{g.chip.title}</div>
            <div className="text-[11px] text-slate-400 leading-tight">{g.chip.text}</div>
          </div>
        </div>
      )}
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

export default function SectorPage({ id }) {
  const s = SECTORS[id];
  const t = SECTOR_TERMS[id];
  const [openFaq, setOpenFaq] = useState(0);
  const glow = `${s.accent}22`;
  const others = SECTOR_LINKS.filter(l => l.id !== id);

  return (
    <div className="overflow-x-clip">
      <Seo title={s.seo.title} description={s.seo.description} path={s.path} keywords={s.seo.keywords} jsonLd={schemas(s)} />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-14 sm:pt-32 sm:pb-20">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-10 items-center">
          <div className="text-center lg:text-left">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm pl-1 pr-3 py-1 text-xs text-slate-600">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: s.accent }}>
                  <s.icon size={12} />
                </span>
                {s.pill}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.1rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                {s.title}{' '}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${s.accent}, #10b981)` }}>{s.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md mx-auto lg:mx-0">{s.subtitle}</p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <PrimaryButton to={REGISTER}>Start 14-day free trial</PrimaryButton>
                <Link to="/contact#book-demo" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white/70 hover:bg-white text-slate-700 text-sm font-semibold px-5 py-2.5 transition-all">
                  Book a demo <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={320}><div className="mt-8"><Pill badge="3 apps">Admin, member & guard apps included</Pill></div></Reveal>
            {s.crossLink && (
              <Reveal delay={360}>
                <Link to={s.crossLink.to} className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-600 hover:text-slate-900 group">
                  {s.crossLink.text} <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Reveal>
            )}
          </div>
          <Reveal delay={200}><GateMock s={s} /></Reveal>
        </div>

        {/* facts bar */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24">
          <Reveal delay={120}>
            <div className="grid grid-cols-2 lg:grid-cols-4 rounded-3xl bg-white/80 backdrop-blur border border-slate-200/80 shadow-sm overflow-hidden divide-x divide-y lg:divide-y-0 divide-slate-100">
              {s.facts.map(f => (
                <div key={f.value} className="flex items-center gap-3.5 p-4 sm:p-6">
                  <div className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center flex-shrink-0" style={{ background: glow }}>
                    <f.icon size={18} style={{ color: s.accent }} />
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

      {/* ── PROBLEMS ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>The problem</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">What goes wrong without it.</h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {s.problems.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 70} className="h-full">
                <div className="h-full flex items-start gap-4 rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6">
                  <span className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0"><X size={15} strokeWidth={2.5} /></span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div className="max-w-xl">
              <Reveal><Eyebrow>What’s inside</Eyebrow></Reveal>
              <Reveal delay={60}>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">{s.featuresTitle}</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <Link to="/features" className="inline-flex items-center gap-1.5 text-sm font-semibold group" style={{ color: s.accent }}>
                All platform features <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {s.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 70} className="h-full">
                <SpotlightCard glow={glow}
                  className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    <f.icon size={17} style={{ color: s.accent }} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{f.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE APPS ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Three apps · One platform</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">How the three apps work for {s.name.toLowerCase()}.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-3 text-[15px] text-slate-500">The apps speak your language — {t.members} and {t.units}, not residents and units.</p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {['admin', 'mates', 'guard'].map((key, i) => {
              const app = APPS[key];
              const a = s.apps[key];
              return (
                <Reveal key={key} delay={i * 80} className="h-full">
                  <SpotlightCard glow={`${app.accent}22`}
                    className="h-full rounded-3xl bg-white border border-slate-200/80 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" style={{ background: app.accent }}>
                      <app.icon size={19} />
                    </div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: app.accent }}>{a.who}</div>
                    <h3 className="mt-1 text-base font-semibold text-slate-900">{app.name}</h3>
                    <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">{a.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {a.points.map(p => (
                        <li key={p} className="flex items-center gap-2 text-[13px] text-slate-600">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-white" style={{ background: app.accent }}>
                            <Check size={10} strokeWidth={3} />
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                    <Link to={app.to} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group/link" style={{ color: app.accent }}>
                      Explore {app.name.replace('AreaConnect ', '')} <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <Reveal><Eyebrow>Simple setup</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Live in four steps.</h2>
            </Reveal>
          </div>
          <Workflow steps={s.steps} accent={s.accent} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
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
            {s.faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 40}>
                <FaqItem q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(o => (o === i ? -1 : i))} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER SECTORS ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-8">
            <Reveal><Eyebrow>One platform</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Also built for.</h2>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {others.map((o, i) => (
              <Reveal key={o.to} delay={i * 60}>
                <Link to={o.to} className="block">
                  <SpotlightCard glow={`${o.accent}22`}
                    className="rounded-2xl bg-white border border-slate-200/80 p-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" style={{ background: `${o.accent}18` }}>
                        <o.icon size={17} style={{ color: o.accent }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-semibold text-slate-900">{o.label}</div>
                        <div className="text-[12px] text-slate-400 truncate">{o.desc}</div>
                      </div>
                      <ArrowUpRight size={15} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlowCTA title={s.ctaTitle} subtitle={s.ctaSubtitle}>
        <PrimaryButton to={REGISTER} dark={false}>Start free trial</PrimaryButton>
        <Link to="/contact#book-demo" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 text-white text-sm font-semibold px-5 py-2.5 transition-all">
          Book a demo
        </Link>
      </GlowCTA>
    </div>
  );
}
