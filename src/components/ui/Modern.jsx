import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './Reveal';

// Shared building blocks for the refreshed About / Pricing / Contact pages.

export function Eyebrow({ children, dark, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? 'text-brand-400' : 'text-brand-600'} ${className}`}>
      <span className={`h-px w-6 ${dark ? 'bg-brand-400' : 'bg-brand-500'}`} />
      {children}
    </span>
  );
}

export function HeroBackdrop() {
  return (
    <>
      <div className="absolute inset-0 about-grid pointer-events-none" />
      <div className="about-aurora absolute -top-24 -left-24 w-[26rem] h-[26rem] bg-brand-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="about-aurora absolute top-40 right-0 w-[22rem] h-[22rem] bg-indigo-300/25 rounded-full blur-3xl pointer-events-none" style={{ animationDelay: '-7s' }} />
    </>
  );
}

export function Pill({ badge, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur border border-slate-200 shadow-sm pl-1.5 pr-3 py-1 text-xs text-slate-600">
      <span className="rounded-full bg-brand-500 text-white text-[10px] font-semibold px-2 py-0.5">{badge}</span>
      {children}
    </span>
  );
}

export function PrimaryButton({ to, children, dark = true, className = '' }) {
  return (
    <Link to={to}
      className={`group inline-flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold pl-5 pr-2 py-2 transition-all ${
        dark ? 'bg-slate-900 hover:bg-slate-800' : 'bg-brand-500 hover:bg-brand-400'
      } ${className}`}>
      {children}
      <span className={`w-7 h-7 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform ${dark ? 'bg-brand-500' : 'bg-white/20'}`}>
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}

// Card with a radial glow that follows the cursor.
export function SpotlightCard({ glow = 'rgba(16,185,129,.12)', className = '', children, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} style={{ '--x': '50%', '--y': '0%' }}
      className={`group relative overflow-hidden ${className}`} {...rest}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(260px circle at var(--x) var(--y), ${glow}, transparent 70%)` }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function GlowCTA({ title, subtitle, children }) {
  return (
    <section className="pb-16 sm:pb-24 px-4 sm:px-6">
      <Reveal>
        <div className="relative max-w-4xl mx-auto rounded-[2rem] p-px overflow-hidden">
          <div className="about-glow-border absolute inset-[-50%]" />
          <div className="relative rounded-[calc(2rem-1px)] bg-slate-950 px-6 py-12 sm:px-12 sm:py-14 text-center overflow-hidden">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h2>
              {subtitle && <p className="mt-3 text-sm sm:text-[15px] text-slate-400 max-w-md mx-auto">{subtitle}</p>}
              <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">{children}</div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
