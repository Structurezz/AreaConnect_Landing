import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Zap, Shield, Globe } from 'lucide-react';
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

const MILESTONES = [
  { year: '2023 Q1',  event: 'AreaConnect founded in Lagos. Team of three, one idea, and a lot of estate managers to interview.', color: 'bg-brand-500' },
  { year: '2024 Q1',  event: 'Beta launch with 12 test estates in Lekki and Ikoyi. First real-world visitor QR scans.', color: 'bg-indigo-500' },
  { year: '2024 Q2',  event: 'Paystack integration live. First ₦10 million in estate dues collected on the platform.', color: 'bg-blue-500' },
  { year: '2024 Q3',  event: 'AreaMates mobile app launches on iOS and Android. Residents finally have the app they asked for.', color: 'bg-violet-500' },
  { year: '2024 Q4',  event: '100 estates milestone. Guard app and real-time security alerts shipped.', color: 'bg-amber-500' },
  { year: '2025',     event: '500+ estates. AreaConnect 2.0 ships with marketplace, polls, events, and resident lounge.', color: 'bg-brand-500' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            About AreaConnect
          </span>
          <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
            Building the digital backbone<br />of the{' '}
            <span className="gradient-text-brand">modern Nigerian estate.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            AreaConnect was founded on a simple observation: estate managers across Nigeria are still running on WhatsApp groups, paper log books, and manual bank transfers. We're here to change that.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-brand-600 py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '500+', label: 'Estates managed' },
              { num: '40k+', label: 'Residents onboarded' },
              { num: '₦2B+', label: 'Dues collected' },
              { num: '27',   label: 'Team members' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white mb-1">{s.num}</div>
                <div className="text-brand-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <Reveal>
                <span className="section-tag mb-4 inline-flex">Our story</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Why we built AreaConnect</h2>
              </Reveal>
              <div className="space-y-5 text-slate-600 leading-relaxed text-[15px]">
                {[
                  "It started when our co-founders — both of whom grew up in gated communities in Lagos — watched their parents deal with the same estate management frustrations year after year. Monthly dues chased via WhatsApp. Visitors calling to say security wouldn't let them in. Announcements lost in long group threads.",
                  "In 2023, we set out to build the solution we wished existed. We spent months visiting estate offices in Lekki, Abuja, and Port Harcourt — talking to managers, residents, and gate officers to understand the real workflow, not just the surface problem.",
                  "What we found was that the problem wasn't the technology. It was that existing solutions were either too expensive, too generic, or built for foreign markets. Nigerian estates needed something purpose-built — that understood the Paystack ecosystem, worked on low-end Android devices, and didn't require an IT team to maintain.",
                  "AreaConnect is that solution. We launched our first beta in early 2024 and today power over 500 estates across Nigeria.",
                ].map((p, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <p className="pl-4 border-l-2 border-slate-100">{p}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <Reveal>
                <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-brand-500 via-indigo-400 to-brand-300 opacity-30" />
              </Reveal>
              <div className="space-y-5">
                {MILESTONES.map((m, i) => (
                  <Reveal key={m.year} delay={i * 60}>
                    <div className="flex items-start gap-5">
                      <div className={`w-11 h-11 rounded-xl ${m.color} flex-shrink-0 flex items-center justify-center shadow-sm z-10`}>
                        <span className="text-white text-[8px] font-black leading-none text-center px-1">{m.year}</span>
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                        <p className="text-sm text-slate-700 leading-relaxed">{m.event}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-28 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-500/8 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <div className="text-6xl text-brand-500/30 font-serif mb-4 leading-none">"</div>
            <p className="text-2xl lg:text-3xl font-black text-white leading-relaxed mb-6 gradient-text-brand">
              To make every estate in Africa feel like a well-managed, connected community — regardless of size or budget.
            </p>
            <div className="text-slate-500 text-sm font-semibold uppercase tracking-widest">Our mission</div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">What we stand for</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our values</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart,  bg: 'bg-rose-50',    ic: 'text-rose-600',    title: 'Resident-first',    desc: "Every product decision starts with: does this make life better for the people living in the estate?" },
              { icon: Zap,    bg: 'bg-amber-50',   ic: 'text-amber-600',   title: 'Radically simple',  desc: "If an estate manager's 60-year-old parent can't use it in 5 minutes, we ship it again." },
              { icon: Shield, bg: 'bg-blue-50',    ic: 'text-blue-600',    title: 'Privacy by default',desc: "Every estate's data is completely isolated. We will never sell user data or allow cross-estate access." },
              { icon: Globe,  bg: 'bg-brand-50',   ic: 'text-brand-600',   title: 'Built for Nigeria', desc: "We don't adapt foreign tools for Nigeria. We build from scratch for the Nigerian network and estate context." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className={`w-12 h-12 ${v.bg} rounded-2xl flex items-center justify-center mb-5`}>
                    <v.icon size={22} className={v.ic} />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2 text-lg">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">The team</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Small team. Big mission.</h2>
              <p className="text-slate-500 text-lg">Focused on making Nigerian estates run better.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Tunde Adeyemi',   role: 'Co-founder & CEO',        initials: 'TA', color: 'from-brand-500 to-brand-700',     bio: 'Former estate manager turned software entrepreneur. 10 years in property management across Lagos.' },
              { name: 'Ngozi Okonkwo',  role: 'Co-founder & CTO',        initials: 'NO', color: 'from-indigo-500 to-indigo-700',   bio: 'Full-stack engineer. Previously at Paystack and Andela. Builds things that scale.' },
              { name: 'Emeka Obi',      role: 'Head of Product',          initials: 'EO', color: 'from-blue-500 to-blue-700',      bio: 'Product designer with a background in fintech UX. Designed for 2M+ users before AreaConnect.' },
              { name: 'Amina Suleiman', role: 'Head of Customer Success', initials: 'AS', color: 'from-violet-500 to-violet-700',   bio: 'Keeps 500+ estate managers happy. Former CS lead at a B2B SaaS company in Abuja.' },
            ].map((m, i) => (
              <Reveal key={m.name} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-center">
                  <div className={`w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xl font-black mx-auto mb-5 shadow-md`}>
                    {m.initials}
                  </div>
                  <h3 className="font-black text-slate-900 mb-0.5 text-base">{m.name}</h3>
                  <p className="text-xs text-brand-600 font-bold mb-3 uppercase tracking-wide">{m.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Press strip */}
      <section className="py-14 bg-slate-900 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em] mb-8">As featured in</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {['TechCabal', 'Nairametrics', 'The Cable', 'Techpoint Africa', 'Business Day'].map(n => (
              <span key={n} className="text-slate-500 font-black text-lg tracking-tight hover:text-slate-300 transition-colors cursor-default">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-xl mx-auto px-6 text-center z-10">
          <Reveal>
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Join us on the mission</h2>
            <p className="text-brand-100 mb-8 text-lg leading-relaxed">Bring AreaConnect to your estate, or help us build it.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-base shadow-xl hover:-translate-y-0.5">
                Get started free <ArrowRight size={18} />
              </Link>
              <Link to="/careers" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base hover:bg-white/8">
                View open roles
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
