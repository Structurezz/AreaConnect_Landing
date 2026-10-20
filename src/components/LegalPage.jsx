import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Shield, FileText, Cookie, Lock } from 'lucide-react';
import Seo from './Seo';
import { Reveal } from './ui/Reveal';
import { HeroBackdrop, Pill } from './ui/Modern';

// Shared layout for Privacy, Terms and Cookies: light hero, sticky contents
// with scroll-spy and a reading progress bar, then numbered sections.

const DOCS = [
  { to: '/privacy',  label: 'Privacy Policy',   icon: Shield,   desc: 'How we handle personal data' },
  { to: '/terms',    label: 'Terms of Service', icon: FileText, desc: 'The rules for using AreaConnect' },
  { to: '/cookies',  label: 'Cookie Policy',    icon: Cookie,   desc: 'What we store in your browser' },
  { to: '/security', label: 'Security',         icon: Lock,     desc: 'How we protect estate data' },
];

export function DocSection({ num, title, children }) {
  return (
    <section id={`s-${num}`} className="scroll-mt-28 pb-10 mb-10 border-b border-slate-100 last:border-0">
      <Reveal>
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-[11px] font-semibold text-brand-600 tabular-nums">{String(num).padStart(2, '0')}</span>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">{title}</h2>
        </div>
        <div className="legal-prose text-[15px] text-slate-600 leading-relaxed space-y-3">{children}</div>
      </Reveal>
    </section>
  );
}

export default function LegalPage({ seo, eyebrow = 'Legal', title, highlight, updated, summary, highlights, toc, children, contactLabel, contactNote }) {
  const [active, setActive] = useState(1);
  const [progress, setProgress] = useState(0);
  const path = seo.path;

  useEffect(() => {
    const els = toc.map((_, i) => document.getElementById(`s-${i + 1}`)).filter(Boolean);
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(Number(e.target.id.slice(2))); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    els.forEach(el => obs.observe(el));

    const onScroll = () => {
      const doc = document.getElementById('legal-body');
      if (!doc) return;
      const r = doc.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (window.innerHeight * 0.3 - r.top) / (r.height - window.innerHeight * 0.5))));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [toc]);

  return (
    <div className="overflow-x-clip">
      <Seo {...seo} />

      {/* reading progress */}
      <div className="fixed top-0 inset-x-0 h-0.5 z-[60] pointer-events-none">
        <div className="h-full bg-brand-500 origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-16">
        <HeroBackdrop />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal><Pill badge={eyebrow}>Last updated {updated}</Pill></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
              {title}{' '}
              <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">{highlight}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-2xl">{summary}</p>
          </Reveal>
          {highlights && (
            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {highlights.map((h, i) => (
                <Reveal key={h.title} delay={220 + i * 70}>
                  <div className="h-full rounded-2xl bg-white/80 backdrop-blur border border-slate-200/80 p-4 flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0"><h.icon size={16} /></span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{h.title}</div>
                      <div className="text-[13px] text-slate-500 leading-snug mt-0.5">{h.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <section className="bg-white pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start">
          {/* contents */}
          <aside className="lg:sticky lg:top-28">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">Contents</div>
            <nav className="flex lg:flex-col gap-1 overflow-x-auto hide-scrollbar -mx-1 px-1 pb-1">
              {toc.map((t, i) => {
                const on = active === i + 1;
                return (
                  <a key={t} href={`#s-${i + 1}`}
                    className={`relative flex-shrink-0 flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] transition-all duration-200 ${
                      on ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}>
                    <span className={`tabular-nums text-[11px] ${on ? 'text-brand-300' : 'text-slate-300'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="whitespace-nowrap lg:whitespace-normal">{t}</span>
                  </a>
                );
              })}
            </nav>
          </aside>

          <div id="legal-body" className="min-w-0">
            {children}

            {/* contact */}
            <Reveal>
              <div className="relative mt-4 rounded-[1.75rem] bg-slate-900 overflow-hidden p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="about-aurora absolute -top-16 -right-10 w-56 h-56 bg-brand-500/25 rounded-full blur-3xl" />
                <div className="relative flex-1">
                  <div className="text-white text-[15px] font-semibold">{contactLabel}</div>
                  <p className="mt-1 text-sm text-slate-400">{contactNote}</p>
                </div>
                <a href="mailto:michael@areaconnect.pro"
                  className="relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-slate-900 text-sm font-semibold px-5 py-2.5 hover:bg-slate-100 transition-colors">
                  <Mail size={14} /> michael@areaconnect.pro
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-4">Related</div>
          <div className="grid sm:grid-cols-3 gap-3">
            {DOCS.filter(d => d.to !== path).map((d, i) => (
              <Reveal key={d.to} delay={i * 70}>
                <Link to={d.to} className="group flex items-center gap-3 rounded-2xl bg-white border border-slate-200/80 p-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors"><d.icon size={16} /></span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-900">{d.label}</div>
                    <div className="text-xs text-slate-400">{d.desc}</div>
                  </div>
                  <ArrowUpRight size={15} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
