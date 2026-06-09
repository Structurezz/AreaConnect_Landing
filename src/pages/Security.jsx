import { Shield, Lock, Server, Eye, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
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

export default function Security() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Security
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
            Security at<br />
            <span className="gradient-text-brand">AreaConnect</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            We take the security of your estate's data seriously. Here's exactly what we do to protect it.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Security foundations</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Built secure by design</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Lock,        bg: 'bg-brand-50',   ic: 'text-brand-600',   title: 'Encryption in transit', desc: 'All data between clients and our servers is encrypted using TLS 1.3. No exceptions.' },
              { icon: Key,         bg: 'bg-indigo-50',  ic: 'text-indigo-600',  title: 'Password hashing',      desc: 'Passwords are hashed using bcrypt at cost factor 12. We never store plaintext passwords.' },
              { icon: Shield,      bg: 'bg-blue-50',    ic: 'text-blue-600',    title: 'Short-lived tokens',    desc: 'Auth tokens expire after 15 minutes. Refresh tokens rotate on every use.' },
              { icon: Server,      bg: 'bg-amber-50',   ic: 'text-amber-600',   title: 'Data isolation',        desc: "Every estate's data is completely isolated. No cross-estate data access is possible." },
              { icon: Eye,         bg: 'bg-rose-50',    ic: 'text-rose-600',    title: 'Staff access control',  desc: 'AreaConnect staff access to production systems requires MFA and is fully logged.' },
              { icon: AlertCircle, bg: 'bg-violet-50',  ic: 'text-violet-600',  title: 'Vulnerability reporting', desc: 'We operate a responsible disclosure programme. See below for how to report.' },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className={`w-12 h-12 rounded-2xl ${p.bg} flex items-center justify-center mb-5`}>
                    <p.icon size={22} className={p.ic} />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-slate-900 mb-8">Infrastructure</h2>
          </Reveal>
          <div className="space-y-4">
            {[
              { label: 'Cloud hosting',    color: 'border-l-brand-500',  ic: 'text-brand-500',  text: 'All AreaConnect infrastructure runs on Amazon Web Services (AWS) in the eu-west-1 (Ireland) region, with backups replicated to af-south-1 (Cape Town) for disaster recovery.' },
              { label: 'Database',         color: 'border-l-indigo-500', ic: 'text-indigo-500', text: 'Resident and estate data is stored in MongoDB Atlas (hosted on AWS). Automated backups are taken every 6 hours and retained for 30 days.' },
              { label: 'Payments',         color: 'border-l-blue-500',   ic: 'text-blue-500',   text: 'All payment card and bank account data is handled exclusively by Paystack, a PCI DSS Level 1 certified processor. We never see or store card numbers.' },
              { label: 'Email',            color: 'border-l-violet-500', ic: 'text-violet-500', text: 'Transactional emails (login credentials, visitor passes) are delivered via Resend, which uses DKIM and SPF authentication to prevent spoofing.' },
              { label: 'Uptime monitoring',color: 'border-l-amber-500',  ic: 'text-amber-500',  text: 'We monitor all services continuously with PagerDuty alerting. Our target uptime SLA is 99.9% for all paid plans. Status is published at status.areaconnect.ng.' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 50}>
                <div className={`bg-white rounded-2xl border border-slate-100 border-l-4 ${s.color} p-6 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 size={18} className={`${s.ic} flex-shrink-0 mt-0.5`} />
                    <div>
                      <div className="font-black text-slate-900 mb-1">{s.label}</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Responsible disclosure</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                If you believe you have found a security vulnerability in AreaConnect, we encourage you to report it to us responsibly. We commit to:
              </p>
              <ul className="space-y-3">
                {[
                  'Acknowledging your report within 24 hours',
                  'Investigating the issue promptly and thoroughly',
                  'Fixing confirmed vulnerabilities in a timely manner',
                  'Not taking legal action against researchers who act in good faith',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="font-black text-white text-lg mb-2">Report a vulnerability</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Please email details of the vulnerability, including steps to reproduce, to our security team.
                </p>
                <a href="mailto:security@areaconnect.ng" className="btn-primary w-full justify-center">
                  security@areaconnect.ng
                </a>
                <p className="text-xs text-slate-600 mt-4 text-center">
                  Please do not disclose publicly until we've had the opportunity to investigate and fix.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl font-black text-slate-900 mb-8">Compliance & certifications</h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'NDPC Compliant',         desc: 'We comply with the Nigerian Data Protection Act 2023 and the regulations of the NDPC.', color: 'text-brand-600', bg: 'bg-brand-50', border: 'border-brand-100' },
              { title: 'PCI DSS (via Paystack)',  desc: 'Payment processing is handled by Paystack, which is PCI DSS Level 1 certified.', color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
              { title: 'TLS 1.3',                desc: 'All traffic to and from AreaConnect is encrypted using modern TLS 1.3 protocols.', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className={`${c.bg} border ${c.border} rounded-2xl p-6 hover:shadow-md transition-shadow`}>
                  <div className={`${c.color} font-black text-sm uppercase tracking-widest mb-3`}>{c.title}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
