import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FileText, ArrowRight } from 'lucide-react';

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
    <div ref={ref} style={{ transitionDelay: `${num * 40}ms` }}
      className={`transition-all duration-700 ease-out ${v ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <div className="flex items-start gap-4 sm:gap-5 mb-8 sm:mb-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
          <span className="text-indigo-400 text-xs font-black">{num}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3">{title}</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

const TOC = [
  'Agreement to terms', 'Account responsibilities', 'Acceptable use',
  'Payment terms', 'Estate data', 'Availability and support',
  'Termination', 'Intellectual property', 'Limitation of liability',
  'Governing law', 'Contact',
];

export default function Terms() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Legal
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4">
            Terms of <span className="gradient-text-brand">Service</span>
          </h1>
          <p className="text-slate-400 text-sm">Last updated: 1 June 2025</p>
        </div>
      </section>

      {/* Table of contents strip */}
      <div className="bg-white border-b border-slate-100 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto py-3 text-xs font-semibold text-slate-500">
            {TOC.map((t, i) => (
              <a key={t} href={`#section-${i + 1}`}
                className="whitespace-nowrap hover:text-indigo-600 transition-colors flex-shrink-0">
                {i + 1}. {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
          {/* Main content */}
          <div>
            <Reveal>
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-12 flex items-start gap-4">
                <FileText size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-indigo-800 leading-relaxed">
                  These Terms govern your use of all AreaConnect products: the Admin portal, AreaMates app, and AreaConnect Guard. By using any of these Services you agree to be bound by these Terms.
                </p>
              </div>
            </Reveal>

            <div id="section-1">
              <DocSection num={1} title="Agreement to terms">
                <p>By accessing or using any part of the AreaConnect platform — including the AreaConnect Admin portal, AreaMates, and AreaConnect Guard (collectively, the &ldquo;Services&rdquo;) — you agree to be bound by these Terms of Service. If you do not agree, do not use the Services.</p>
              </DocSection>
            </div>

            <div id="section-2">
              <DocSection num={2} title="Account responsibilities">
                <p>You are responsible for maintaining the security of your account credentials. You must notify us immediately at <a href="mailto:security@areaconnect.pro" className="text-brand-600 hover:underline font-medium">security@areaconnect.pro</a> if you suspect unauthorised access.</p>
                <p>Estate managers are responsible for the accuracy of resident and visitor data they enter. You agree not to register other estates&apos; residents or create fraudulent accounts.</p>
              </DocSection>
            </div>

            <div id="section-3">
              <DocSection num={3} title="Acceptable use">
                <p>You agree not to:</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'Use the Services for any unlawful purpose',
                    'Attempt to gain unauthorised access to any part of the platform',
                    'Use the Services to harass, abuse, or harm any person',
                    'Scrape, crawl, or extract data from the platform using automated means',
                    'Reverse-engineer or attempt to extract source code',
                  ].map(r => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </DocSection>
            </div>

            <div id="section-4">
              <DocSection num={4} title="Payment terms">
                <p>Paid plans are billed monthly or annually in advance. All payments are processed by Paystack in Nigerian Naira (&#8358;). Prices are exclusive of VAT unless stated otherwise.</p>
                <p>We reserve the right to update pricing with 30 days&apos; notice. Existing customers on annual plans are not affected until their renewal date.</p>
                <p>Refunds are not provided except where required by Nigerian law. If you believe you have been charged in error, contact <a href="mailto:billing@areaconnect.pro" className="text-brand-600 hover:underline font-medium">billing@areaconnect.pro</a> within 14 days.</p>
              </DocSection>
            </div>

            <div id="section-5">
              <DocSection num={5} title="Estate data">
                <p>You retain ownership of all data you upload to the Services — resident lists, announcements, visitor records, etc. You grant AreaConnect a limited licence to store and process this data solely to provide the Services.</p>
                <p>We do not access, view, or share your estate&apos;s data except as required to provide the Services or as required by law.</p>
              </DocSection>
            </div>

            <div id="section-6">
              <DocSection num={6} title="Availability and support">
                <p>We target 99.9% monthly uptime for all paid plans and publish status updates at status.areaconnect.pro. Scheduled maintenance is announced with at least 48 hours&apos; notice.</p>
                <p>Support is provided by email for all plans. Growth and Enterprise plans receive priority response within 2 business hours. Enterprise plans include a dedicated Customer Success Manager.</p>
              </DocSection>
            </div>

            <div id="section-7">
              <DocSection num={7} title="Termination">
                <p>You may terminate your account at any time from the settings panel. We reserve the right to suspend or terminate accounts that violate these Terms, without prior notice for serious violations.</p>
                <p>Upon termination, we will retain your data for 30 days, after which it will be permanently deleted unless required for legal compliance.</p>
              </DocSection>
            </div>

            <div id="section-8">
              <DocSection num={8} title="Intellectual property">
                <p>The AreaConnect name, logo, and all platform software are the exclusive intellectual property of AreaConnect Technologies Ltd. You may not use our trademarks without prior written consent.</p>
              </DocSection>
            </div>

            <div id="section-9">
              <DocSection num={9} title="Limitation of liability">
                <p>To the maximum extent permitted by Nigerian law, AreaConnect shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
              </DocSection>
            </div>

            <div id="section-10">
              <DocSection num={10} title="Governing law">
                <p>These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lagos State.</p>
              </DocSection>
            </div>

            <div id="section-11">
              <DocSection num={11} title="Contact">
                <p>AreaConnect Technologies Ltd<br />14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
                <p>Email: <a href="mailto:legal@areaconnect.pro" className="text-brand-600 hover:underline font-medium">legal@areaconnect.pro</a></p>
              </DocSection>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block sticky top-32 space-y-4">
            <Reveal delay={200}>
              <div className="bg-slate-900 rounded-2xl p-6">
                <h3 className="font-black text-white text-sm mb-1">Legal questions?</h3>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">Our team is happy to clarify any part of these Terms before you commit.</p>
                <a href="mailto:legal@areaconnect.pro"
                  className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors w-full">
                  Contact legal <ArrowRight size={12} />
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
                  <Link to="/cookies" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Cookie Policy
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
