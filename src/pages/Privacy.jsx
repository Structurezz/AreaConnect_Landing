import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Shield, ArrowRight } from 'lucide-react';

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
      <div className="flex items-start gap-5 mb-10">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
          <span className="text-brand-400 text-xs font-black">{num}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-black text-slate-900 mb-3">{title}</h2>
          <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

const TOC = [
  'Introduction', 'Information we collect', 'How we use your information',
  'Data isolation and security', 'Data sharing', 'Data retention',
  'Your rights', 'Cookies', "Children's privacy", 'Changes to this policy', 'Contact',
];

export default function Privacy() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-20 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Legal
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-4">
            Privacy <span className="gradient-text-brand">Policy</span>
          </h1>
          <p className="text-slate-400 text-sm">Last updated: 1 June 2025</p>
        </div>
      </section>

      {/* Table of contents strip */}
      <div className="bg-white border-b border-slate-100 sticky top-[64px] z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide text-xs font-semibold text-slate-500">
            {TOC.map((t, i) => (
              <a key={t} href={`#section-${i + 1}`}
                className="whitespace-nowrap hover:text-brand-600 transition-colors flex-shrink-0">
                {i + 1}. {t}
              </a>
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
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-12 flex items-start gap-4">
                <Shield size={20} className="text-brand-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-brand-800 leading-relaxed">
                  AreaConnect is committed to the Nigerian Data Protection Act 2023 and the regulations of the NDPC. Your data belongs to you — we are only custodians of it.
                </p>
              </div>
            </Reveal>

            <div id="section-1">
              <DocSection num={1} title="Introduction">
                <p>AreaConnect Technologies Ltd (&ldquo;AreaConnect&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the AreaConnect platform, including the AreaConnect Admin web portal, the AreaMates mobile and web application, and the AreaConnect Guard mobile application (collectively, the &ldquo;Services&rdquo;).</p>
                <p>By using our Services, you agree to the collection and use of information in accordance with this policy.</p>
              </DocSection>
            </div>

            <div id="section-2">
              <DocSection num={2} title="Information we collect">
                <p><strong className="text-slate-800">Account information:</strong> When an estate manager registers or invites a resident, we collect name, email address, phone number, and password (hashed — we never store plaintext passwords).</p>
                <p><strong className="text-slate-800">Estate information:</strong> Estate name, address, unit layout, and any other information you provide when setting up your estate on the platform.</p>
                <p><strong className="text-slate-800">Visitor information:</strong> Names, expected arrival dates, and contact details for visitors pre-registered by residents.</p>
                <p><strong className="text-slate-800">Payment information:</strong> Payment transactions are processed by Paystack. We store payment records (amounts, dates, status) but never store card numbers, bank account details, or PINs.</p>
                <p><strong className="text-slate-800">Usage data:</strong> Log data including IP address, device type, browser type, pages visited, and timestamps.</p>
                <p><strong className="text-slate-800">Communications:</strong> Messages sent through the community chat feature, announcements, and support enquiries.</p>
              </DocSection>
            </div>

            <div id="section-3">
              <DocSection num={3} title="How we use your information">
                <p>We use collected information to: provide and operate the Services; send transactional emails (login credentials, visitor passes, payment receipts); send service notifications (security alerts, announcements); process payment collections; provide customer support; improve and develop the Services; comply with legal obligations.</p>
                <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
              </DocSection>
            </div>

            <div id="section-4">
              <DocSection num={4} title="Data isolation and security">
                <p>Every estate&apos;s data is completely isolated. Residents, managers, and security staff from one estate cannot access data from any other estate on the platform.</p>
                <p>We implement industry-standard security measures: all data is encrypted in transit using TLS 1.3; passwords are hashed using bcrypt with a cost factor of 12; authentication uses short-lived access tokens (15 minutes) with rotating refresh tokens; our servers are hosted on AWS with access logging and MFA enforced for all staff.</p>
              </DocSection>
            </div>

            <div id="section-5">
              <DocSection num={5} title="Data sharing">
                <p>We share data only with:</p>
                <ul className="space-y-2 mt-2">
                  {[
                    ['Paystack', 'For payment processing (subject to their Privacy Policy)'],
                    ['Resend', 'For transactional email delivery'],
                    ['AWS', 'For cloud hosting and storage'],
                    ['Legal authorities', 'If required by law, court order, or to protect our rights or the safety of others'],
                  ].map(([name, desc]) => (
                    <li key={name} className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />
                      <span><strong className="text-slate-800">{name}</strong> — {desc}</span>
                    </li>
                  ))}
                </ul>
              </DocSection>
            </div>

            <div id="section-6">
              <DocSection num={6} title="Data retention">
                <p>We retain your personal data for as long as your account is active or as needed to provide the Services. Estate managers may request deletion of their estate data at any time by contacting us. Payment records are retained for 7 years to comply with Nigerian financial regulations.</p>
              </DocSection>
            </div>

            <div id="section-7">
              <DocSection num={7} title="Your rights">
                <p>Under the Nigerian Data Protection Act 2023, you have the right to:</p>
                <ul className="space-y-2 mt-2">
                  {[
                    'Access the personal data we hold about you',
                    'Correct inaccurate data',
                    'Request deletion of your data',
                    'Withdraw consent at any time',
                    'Lodge a complaint with the Nigerian Data Protection Commission (NDPC)',
                  ].map(r => (
                    <li key={r} className="flex items-start gap-3">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />
                      {r}
                    </li>
                  ))}
                </ul>
                <p className="mt-3">To exercise these rights, contact: <a href="mailto:privacy@areaconnect.pro" className="text-brand-600 hover:underline font-medium">privacy@areaconnect.pro</a></p>
              </DocSection>
            </div>

            <div id="section-8">
              <DocSection num={8} title="Cookies">
                <p>We use essential cookies to maintain login sessions. We do not use advertising or tracking cookies. See our <Link to="/cookies" className="text-brand-600 hover:underline font-medium">Cookie Policy</Link> for full details.</p>
              </DocSection>
            </div>

            <div id="section-9">
              <DocSection num={9} title="Children's privacy">
                <p>Our Services are not directed to children under the age of 18. We do not knowingly collect personal data from minors.</p>
              </DocSection>
            </div>

            <div id="section-10">
              <DocSection num={10} title="Changes to this policy">
                <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice in the platform. Continued use of the Services after changes constitutes acceptance.</p>
              </DocSection>
            </div>

            <div id="section-11">
              <DocSection num={11} title="Contact">
                <p>AreaConnect Technologies Ltd<br />14 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
                <p>Email: <a href="mailto:privacy@areaconnect.pro" className="text-brand-600 hover:underline font-medium">privacy@areaconnect.pro</a></p>
              </DocSection>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block sticky top-32 space-y-4">
            <Reveal delay={200}>
              <div className="bg-slate-900 rounded-2xl p-6">
                <h3 className="font-black text-white text-sm mb-1">Questions about your data?</h3>
                <p className="text-slate-400 text-xs mb-4 leading-relaxed">Our privacy team responds to all data requests within 3 business days.</p>
                <a href="mailto:privacy@areaconnect.pro"
                  className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors w-full">
                  Contact privacy team <ArrowRight size={12} />
                </a>
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-slate-700 mb-3">Related documents</p>
                <div className="space-y-2">
                  <Link to="/terms" className="flex items-center gap-2 text-xs text-slate-500 hover:text-brand-600 transition-colors font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Terms of Service
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
