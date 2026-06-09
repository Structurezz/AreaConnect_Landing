import { Download, FileText, Image, Link2, Mail, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

export default function Press() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Press & Media
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Press <span className="gradient-text-brand">kit</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Everything you need to write about AreaConnect. Press inquiries:{' '}
            <a href="mailto:press@areaconnect.ng" className="text-brand-400 hover:text-brand-300 transition-colors font-medium">press@areaconnect.ng</a>
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

        {/* Overview */}
        <Reveal>
          <h2 className="text-2xl font-black text-slate-900 mb-5">Company overview</h2>
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 space-y-4 text-sm text-slate-700 leading-relaxed">
            <p><strong className="text-slate-900">AreaConnect</strong> is a Nigerian estate management technology company founded in 2023 and headquartered in Lekki, Lagos. The company builds software that connects estate managers, residents, and security staff on a single digital platform.</p>
            <p>The platform includes three apps: <strong className="text-slate-900">AreaConnect Admin</strong> (estate managers), <strong className="text-slate-900">AreaMates</strong> (residents, on iOS, Android, and web), and <strong className="text-slate-900">AreaConnect Guard</strong> (security staff). All three connect to a shared real-time backend.</p>
            <p>As of 2025, AreaConnect serves over 500 estates across Nigeria, with more than 40,000 residents onboarded and over 1.2 million visitor passes issued. More than ₦2 billion in estate dues has been collected through the platform.</p>
          </div>
        </Reveal>

        {/* Quick facts */}
        <div>
          <Reveal><h2 className="text-2xl font-black text-slate-900 mb-5">Quick facts</h2></Reveal>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['Founded',             '2023, Lagos, Nigeria'],
              ['Headquarters',        'Lekki Phase 1, Lagos'],
              ['Employees',           '27 full-time'],
              ['Funding stage',       'Bootstrapped / seed stage'],
              ['Estates served',      '500+'],
              ['Residents onboarded', '40,000+'],
              ['Visitor passes',      '1.2 million+'],
              ['Dues collected',      '₦2 billion+'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 40}>
                <div className="flex justify-between items-center bg-white rounded-2xl border border-slate-100 px-5 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-sm text-slate-500 font-medium">{k}</span>
                  <span className="text-sm font-black text-slate-900">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Logo & assets */}
        <div>
          <Reveal>
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl font-black text-slate-900">Logo & assets</h2>
              <p className="text-xs text-slate-400">Available for editorial use with attribution</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Logo — green on white', icon: Image,    desc: 'PNG, SVG' },
              { label: 'Logo — white on dark',  icon: Image,    desc: 'PNG, SVG' },
              { label: 'Brand guidelines',      icon: FileText, desc: 'PDF' },
              { label: 'Product screenshots',   icon: Image,    desc: 'ZIP — 12 images' },
              { label: 'Press release',         icon: FileText, desc: 'DOCX, PDF' },
              { label: 'Media mentions pack',   icon: Link2,    desc: 'PDF' },
            ].map((a, i) => (
              <Reveal key={a.label} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                    <a.icon size={18} className="text-slate-500" />
                  </div>
                  <div className="mb-3">
                    <div className="font-bold text-slate-900 text-sm mb-0.5">{a.label}</div>
                    <div className="text-xs text-slate-400">{a.desc}</div>
                  </div>
                  <button className="btn-outline text-xs py-2 w-full justify-center">
                    <Download size={12} /> Download
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Recent coverage */}
        <div>
          <Reveal><h2 className="text-2xl font-black text-slate-900 mb-5">Recent coverage</h2></Reveal>
          <div className="space-y-3">
            {[
              { pub: 'TechCabal',        date: 'May 2025',     headline: '"AreaConnect raises seed round to expand estate management platform across West Africa"' },
              { pub: 'Techpoint Africa', date: 'March 2025',   headline: '"How AreaConnect is replacing WhatsApp groups for 500 Nigerian estate managers"' },
              { pub: 'Nairametrics',     date: 'January 2025', headline: '"Nigerian proptech startup AreaConnect crosses ₦2B in estate dues collected"' },
              { pub: 'The Cable',        date: 'October 2024', headline: '"The app making Nigerian estate security more efficient — one QR code at a time"' },
            ].map((c, i) => (
              <Reveal key={c.headline} delay={i * 50}>
                <div className="flex items-start gap-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <span className="text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-full flex-shrink-0 whitespace-nowrap">{c.pub}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{c.headline}</p>
                    <p className="text-xs text-slate-400 mt-1.5">{c.date}</p>
                  </div>
                  <ArrowRight size={14} className="text-slate-300 flex-shrink-0 mt-0.5" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>

      {/* Contact CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-lg mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={28} className="text-white" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight mb-3">Press inquiries</h3>
            <p className="text-brand-100 text-sm mb-6 leading-relaxed">
              For interviews, quotes, background information, or additional assets, contact our communications team.
            </p>
            <a href="mailto:press@areaconnect.ng" className="btn-primary-lg bg-white text-brand-700 hover:bg-brand-50 shadow-xl">
              press@areaconnect.ng
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
