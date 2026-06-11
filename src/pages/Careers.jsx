import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
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

const ROLES = [
  { title: 'Senior Full-Stack Engineer',    dept: 'Engineering',      type: 'Full-time', location: 'Lagos (Hybrid)',    color: 'from-brand-500 to-brand-700',   skills: ['Node.js', 'React', 'MongoDB', 'AWS'],               desc: "We're looking for a senior engineer to help scale our Node.js backend and React frontend. You'll own major features end-to-end and shape our engineering culture." },
  { title: 'Mobile Engineer (React Native)', dept: 'Engineering',     type: 'Full-time', location: 'Lagos (Hybrid)',    color: 'from-indigo-500 to-indigo-700', skills: ['React Native', 'Expo', 'TypeScript', 'iOS/Android'], desc: "Own the AreaMates and Guard mobile apps. You'll build features used by tens of thousands of residents daily and make them work beautifully on low-end Android." },
  { title: 'Product Designer',               dept: 'Design',          type: 'Full-time', location: 'Lagos or Remote',  color: 'from-violet-500 to-violet-700', skills: ['Figma', 'User research', 'Mobile UI', 'Design systems'], desc: "Design experiences that are so simple a 60-year-old estate manager can use them without training. Own the full design process from research to shipped pixels." },
  { title: 'Growth Manager',                 dept: 'Marketing',       type: 'Full-time', location: 'Lagos',            color: 'from-amber-500 to-amber-700',   skills: ['B2B growth', 'Content marketing', 'Partnerships', 'Analytics'], desc: "Drive estate acquisition across Nigeria. Build and run campaigns, manage partnerships with property management companies, and own our key growth metrics." },
  { title: 'Customer Success Manager',       dept: 'Customer Success',type: 'Full-time', location: 'Lagos',            color: 'from-blue-500 to-blue-700',     skills: ['Estate management', 'SaaS CS', 'Onboarding', 'Retention'], desc: "Be the trusted partner for our estate managers. Onboard new customers, run QBRs, gather product feedback, and ensure every estate gets maximum value from AreaConnect." },
  { title: 'DevOps / Infrastructure Engineer', dept: 'Engineering',   type: 'Full-time', location: 'Remote',           color: 'from-rose-500 to-rose-700',     skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],         desc: "Own our cloud infrastructure on AWS, CI/CD pipelines, monitoring, and reliability. Help us hit and maintain the 99.9% uptime SLA we promise our customers." },
];

const PERKS = [
  { emoji: '💰', title: 'Competitive salary',  desc: 'Market-rate pay benchmarked quarterly against Lagos tech salaries.',             bg: 'bg-brand-50' },
  { emoji: '🏠', title: 'Flexible work',       desc: 'Hybrid for Lagos roles. Fully remote for engineering positions.',               bg: 'bg-blue-50' },
  { emoji: '📚', title: 'Learning budget',     desc: '₦300,000/year for courses, conferences, and books — no approval needed.',       bg: 'bg-indigo-50' },
  { emoji: '🏥', title: 'Health insurance',    desc: 'Full HMO coverage for you and your family through a top-tier plan.',            bg: 'bg-rose-50' },
  { emoji: '🎯', title: 'Equity',              desc: 'Every full-time employee receives stock options in AreaConnect.',               bg: 'bg-amber-50' },
  { emoji: '🌍', title: 'Work that matters',   desc: 'Directly improve the daily lives of hundreds of thousands of Nigerians.',       bg: 'bg-violet-50' },
];

export default function Careers() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-slate-900 pt-32 pb-24 overflow-hidden noise">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
            Careers
          </span>
          <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            <span className="text-xs text-slate-400 font-medium">6 open roles</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
            Build the future of<br />
            <span className="gradient-text-brand">estate living.</span>
          </h1>
          <p className="hidden sm:block text-xl text-slate-400 leading-relaxed">
            We're a small team with big ambitions — building technology that makes life better for millions of people in Nigerian communities. Come work with us.
          </p>
          <p className="block sm:hidden text-base text-slate-400 leading-relaxed">
            Small team, big mission. Building tech that improves life in Nigerian communities.
          </p>
        </div>
      </section>

      {/* Culture strip */}
      <div className="bg-brand-600 py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Desktop */}
          <div className="hidden sm:grid grid-cols-3 gap-8 text-center">
            {[
              { num: '27',    label: 'Team members' },
              { num: '6',     label: 'Open roles' },
              { num: '100%',  label: "Would recommend working here" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-black text-white mb-1">{s.num}</div>
                <div className="text-brand-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Mobile horizontal scroll */}
          <div className="sm:hidden flex gap-6 overflow-x-auto hide-scrollbar pb-1">
            {[
              { num: '27',    label: 'Team members' },
              { num: '6',     label: 'Open roles' },
              { num: '100%',  label: "Recommend working here" },
            ].map(s => (
              <div key={s.label} className="flex-shrink-0 text-center min-w-[100px]">
                <div className="text-2xl font-black text-white mb-1">{s.num}</div>
                <div className="text-brand-100 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Perks */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Benefits</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why join AreaConnect?</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className={`${p.bg} rounded-2xl border border-slate-100 p-4 sm:p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}>
                  <div className="text-3xl mb-4">{p.emoji}</div>
                  <h3 className="font-black text-slate-900 mb-2 text-lg">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-16 sm:py-28 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Open positions</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Find your role</h2>
            </div>
          </Reveal>
          <div className="space-y-4">
            {ROLES.map((role, i) => (
              <Reveal key={role.title} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                        <span className="text-white text-xs font-black">{role.dept[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-base mb-1">{role.title}</h3>
                        <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><MapPin size={11} />{role.location}</span>
                          <span className="flex items-center gap-1"><Clock size={11} />{role.type}</span>
                          <span className="font-semibold text-slate-600">{role.dept}</span>
                        </div>
                      </div>
                    </div>
                    <a href="mailto:careers@areaconnect.pro" className="btn-primary flex-shrink-0">
                      Apply <ArrowRight size={14} />
                    </a>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 sm:pl-[60px]">{role.desc}</p>
                  <div className="flex flex-wrap gap-2 sm:pl-[60px]">
                    {role.skills.map(s => (
                      <span key={s} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="text-center mt-10 p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-slate-600 text-sm mb-3">Don't see a role that fits?</p>
              <a href="mailto:careers@areaconnect.pro" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors">
                Send your CV to careers@areaconnect.pro <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
