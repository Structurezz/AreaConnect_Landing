import { useState, useEffect, useRef } from 'react';

export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

export function PageHero({ tag, title, subtitle, children, dark = true }) {
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-slate-900' : 'bg-white'} pt-32 pb-20`}>
      {dark && (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </>
      )}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {tag && (
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5 ${
            dark
              ? 'bg-brand-500/10 border border-brand-500/20 text-brand-400'
              : 'bg-brand-50 text-brand-700 border border-brand-200'
          }`}>{tag}</span>
        )}
        <h1 className={`text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xl leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
