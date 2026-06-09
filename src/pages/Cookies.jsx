import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Cookie, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>
      {children}
    </div>
  );
}

function DocSection({ num, title, children }) {
  const [ref, v] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${num * 50}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="flex items-start gap-5 mb-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
          <span className="text-violet-400 text-xs font-black">{num}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-black text-slate-900 mb-3">{title}</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Cookies() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden noise">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Legal
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4">
            Cookie <span className="gradient-text-brand">Policy</span>
          </h1>
          <p className="text-slate-400 text-sm">Last updated: 1 June 2025</p>
        </div>
      </section>

      {/* TL;DR strip */}
      <div className="bg-brand-600 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: CheckCircle2, label: 'Essential only', desc: '3 cookies total', color: 'text-white' },
              { icon: XCircle,      label: 'No tracking',    desc: 'Zero analytics or ad cookies', color: 'text-white' },
              { icon: XCircle,      label: 'No third-party', desc: 'We never track you elsewhere', color: 'text-white' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <item.icon size={22} className={item.color} />
                <div className="text-white font-black text-sm">{item.label}</div>
                <div className="text-brand-100 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Main content */}
          <div>
            <Reveal>
              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5 mb-12 flex items-start gap-4">
                <Cookie size={20} className="text-violet-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-violet-800 leading-relaxed">
                  We keep cookie use to an absolute minimum. We use only the cookies that are strictly necessary to log you in and keep you secure. Nothing more.
                </p>
              </div>
            </Reveal>

            <DocSection num={1} title="What are cookies?">
              <p>Cookies are small text files placed on your device when you visit a website. They allow the site to remember information about your visit, such as your login session.</p>
            </DocSection>

            <DocSection num={2} title="Cookies we use">
              <p>AreaConnect uses a minimal set of cookies necessary to operate the platform:</p>
              <Reveal delay={100}>
                <div className="mt-4 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="bg-slate-900 px-5 py-3 flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                    <span className="ml-3 text-xs font-mono text-slate-400">areaconnect.ng — cookies</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                          <th className="text-left px-5 py-3 font-bold text-slate-700">Cookie</th>
                          <th className="text-left px-5 py-3 font-bold text-slate-700">Purpose</th>
                          <th className="text-left px-5 py-3 font-bold text-slate-700">Duration</th>
                          <th className="text-left px-5 py-3 font-bold text-slate-700">Type</th>
                        </tr>
                      </thead>
                      <tbody className="text-slate-600 divide-y divide-slate-50">
                        {[
                          ['ac_refresh_token', 'Keeps you logged in between sessions', '7 days', 'Essential'],
                          ['ac_session',       'Maintains your active session',        'Session', 'Essential'],
                          ['ac_csrf',          'Protects against cross-site request forgery', 'Session', 'Essential'],
                        ].map(([name, purpose, duration, type]) => (
                          <tr key={name} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4 font-mono text-slate-800 font-medium">{name}</td>
                            <td className="px-5 py-4">{purpose}</td>
                            <td className="px-5 py-4 text-slate-500">{duration}</td>
                            <td className="px-5 py-4">
                              <span className="bg-brand-50 text-brand-700 font-bold px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wide">{type}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Reveal>
            </DocSection>

            <DocSection num={3} title="What we don't use">
              <p>We do not use:</p>
              <ul className="space-y-2 mt-2">
                {[
                  'Advertising or retargeting cookies',
                  'Social media tracking pixels (Facebook, Twitter, etc.)',
                  'Analytics cookies (e.g. Google Analytics, Mixpanel)',
                  'Any third-party tracking technology',
                ].map(r => (
                  <li key={r} className="flex items-start gap-3">
                    <XCircle size={13} className="text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">We are not in the business of tracking you across the internet.</p>
            </DocSection>

            <DocSection num={4} title="Managing cookies">
              <p>All cookies we set are essential to the functioning of the platform. If you disable cookies in your browser, you will not be able to log in to the Services.</p>
              <p>To delete cookies, use your browser&apos;s settings:</p>
              <ul className="space-y-1.5 mt-2">
                {[
                  'Chrome: Settings → Privacy and security → Clear browsing data → Cookies',
                  'Firefox: Settings → Privacy & Security → Cookies and Site Data → Clear Data',
                  'Safari: Preferences → Privacy → Manage Website Data',
                  'Edge: Settings → Privacy, search, and services → Clear browsing data',
                ].map(r => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-1.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </DocSection>

            <DocSection num={5} title="Changes to this policy">
              <p>We may update this Cookie Policy if our use of cookies changes. We will post updates on this page with a revised date.</p>
            </DocSection>

            <DocSection num={6} title="Contact">
              <p>Questions about our cookie use? Email us at <a href="mailto:privacy@areaconnect.ng" className="text-brand-600 hover:underline font-medium">privacy@areaconnect.ng</a></p>
            </DocSection>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block sticky top-32 space-y-4">
            <Reveal delay={200}>
              <div className="bg-slate-900 rounded-2xl p-6">
                <h3 className="font-black text-white text-sm mb-1">Privacy questions?</h3>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">We believe in radical transparency about how we handle your data.</p>
                <a href="mailto:privacy@areaconnect.ng"
                  className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors w-full">
                  Contact privacy team <ArrowRight size={12} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-700 mb-3">Related documents</p>
                <div className="space-y-2">
                  <Link to="/privacy" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Privacy Policy
                  </Link>
                  <Link to="/terms" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Terms of Service
                  </Link>
                  <Link to="/security" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Security
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
    </div>
  );
}
