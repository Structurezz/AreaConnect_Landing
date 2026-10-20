import { useState } from 'react';
import { MapPin, Clock, Plus, Mail, Code2, Smartphone, PenTool, TrendingUp, HeartHandshake, Server } from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill, SpotlightCard, GlowCTA } from '../components/ui/Modern';

const ROLES = [
  { title: 'Senior Full-Stack Engineer',       dept: 'Engineering',      icon: Code2,          accent: '#10b981', type: 'Full-time', location: 'Lagos (Hybrid)',  skills: ['Node.js', 'React', 'MongoDB', 'Socket.io'],     desc: "Help build our Node.js backend and React web apps. You'll own major features end-to-end and shape our engineering culture from the start." },
  { title: 'Mobile Engineer (React Native)',   dept: 'Engineering',      icon: Smartphone,     accent: '#6366f1', type: 'Full-time', location: 'Lagos (Hybrid)',  skills: ['React Native', 'Expo', 'iOS', 'Android'],       desc: "Own the AreaMates and Guard mobile apps. You'll build features residents and guards use every day and make them work beautifully on low-end Android." },
  { title: 'Product Designer',                 dept: 'Design',           icon: PenTool,        accent: '#8b5cf6', type: 'Full-time', location: 'Lagos or Remote', skills: ['Figma', 'User research', 'Mobile UI', 'Design systems'], desc: 'Design experiences so simple an estate manager can use them without training. Own the full process, from research to shipped pixels.' },
  { title: 'Growth Manager',                   dept: 'Marketing',        icon: TrendingUp,     accent: '#f59e0b', type: 'Full-time', location: 'Lagos',           skills: ['B2B growth', 'Content', 'Partnerships', 'Analytics'], desc: 'Bring estates onto AreaConnect across Nigeria. Run campaigns, build partnerships with property management companies, and own our growth numbers.' },
  { title: 'Customer Success Manager',         dept: 'Customer Success', icon: HeartHandshake, accent: '#0ea5e9', type: 'Full-time', location: 'Lagos',           skills: ['Estate management', 'Onboarding', 'Retention'],  desc: 'Be the trusted partner for our first estate managers. Onboard new estates, gather product feedback, and make sure every estate gets real value.' },
  { title: 'DevOps / Infrastructure Engineer', dept: 'Engineering',      icon: Server,         accent: '#f43f5e', type: 'Full-time', location: 'Remote',          skills: ['Railway', 'Docker', 'CI/CD', 'Monitoring'],      desc: 'Own our cloud infrastructure, deployment pipelines, monitoring and reliability as we grow from our first estates to many more.' },
];

const PERKS = [
  { emoji: '🚀', title: 'Join early',        desc: 'We started in August 2026. Your work shapes the product and the company from day one.' },
  { emoji: '🏠', title: 'Flexible work',     desc: 'Hybrid for Lagos roles, remote-friendly for engineering.' },
  { emoji: '⚡', title: 'Ship fast',         desc: 'Small team, short loops — what you build reaches real estates quickly.' },
  { emoji: '🧭', title: 'Real ownership',    desc: 'Own whole features and problems, not tickets.' },
  { emoji: '🇳🇬', title: 'Built for Nigeria', desc: 'Solve problems you see every day, for the communities you live in.' },
  { emoji: '🌍', title: 'Work that matters', desc: 'Make estates safer and better run for the people who live in them.' },
];

const DEPTS = ['All', ...new Set(ROLES.map(r => r.dept))];
const apply = (title) => `mailto:michael@areaconnect.pro?subject=${encodeURIComponent(`Application: ${title}`)}`;

function RoleCard({ role, open, onToggle }) {
  return (
    <div className={`rounded-2xl border bg-white transition-all duration-300 ${open ? 'border-slate-200 shadow-xl shadow-slate-900/5' : 'border-slate-200/80 hover:border-slate-300'}`}>
      <button type="button" onClick={onToggle} className="w-full flex items-center gap-4 p-4 sm:p-5 text-left">
        <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: role.accent }}>
          <role.icon size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[15px] font-semibold text-slate-900">{role.title}</div>
          <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400">
            <span>{role.dept}</span>
            <span className="inline-flex items-center gap-1"><MapPin size={11} />{role.location}</span>
            <span className="inline-flex items-center gap-1"><Clock size={11} />{role.type}</span>
          </div>
        </div>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${open ? 'bg-slate-900 text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
          <Plus size={15} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-4 sm:px-5 pb-5 sm:pl-[76px]">
            <p className="text-sm text-slate-500 leading-relaxed">{role.desc}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.skills.map(s => <span key={s} className="rounded-full bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1">{s}</span>)}
            </div>
            <a href={apply(role.title)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 transition-colors">
              <Mail size={13} /> Apply for this role
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Careers() {
  const [dept, setDept] = useState('All');
  const [open, setOpen] = useState(0);
  const roles = ROLES.filter(r => dept === 'All' || r.dept === dept);

  return (
    <div className="overflow-x-clip">
      <Seo
        title="Careers — Join the AreaConnect Team"
        description="Help build AreaConnect, the estate management platform made in Lagos. Roles for engineers, designers, growth and customer success in Lagos and remote."
        path="/careers"
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-14 sm:pt-32 sm:pb-20">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <Reveal><Pill badge="Hiring">{ROLES.length} roles in Lagos & remote</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Build the future of{' '}
                <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">estate living.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-md">
                We’re a small, early team with big ambitions — building technology that makes estate life better across Nigeria. Come build it with us.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a href="#roles" className="mt-8 group inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold pl-5 pr-2 py-2 transition-colors">
                See open roles
                <span className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">↓</span>
              </a>
            </Reveal>
          </div>

          {/* founder note */}
          <Reveal delay={200}>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-400/30 to-indigo-400/20 blur-3xl rounded-full" />
              <div className="relative rounded-[1.75rem] bg-white/85 backdrop-blur-xl border border-white shadow-2xl shadow-slate-900/10 p-5">
                <div className="flex items-center gap-3">
                  <img src="/team/michael-orizu.jpg" alt="Michael Orizu" className="w-12 h-12 rounded-2xl object-cover object-[50%_15%]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Michael Orizu</div>
                    <div className="text-xs text-slate-400">Founder, AreaConnect</div>
                  </div>
                </div>
                <p className="mt-4 text-[15px] text-slate-700 leading-relaxed">
                  “We’re building the platform every Nigerian estate should run on. If you want your work in the hands of real residents and guards from day one, let’s talk.”
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PERKS ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-xl mb-10">
            <Reveal><Eyebrow>Why join</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Early, ambitious, hands-on.</h2></Reveal>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PERKS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 3) * 70} className="h-full">
                <SpotlightCard className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                  <div className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{p.emoji}</div>
                  <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">{p.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ────────────────────────────────────────────────────── */}
      <section id="roles" className="py-16 sm:py-24 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <Reveal><Eyebrow>Open roles</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">Find your role.</h2></Reveal>
            </div>
            <Reveal delay={120}>
              <div className="flex flex-wrap gap-1.5">
                {DEPTS.map(d => (
                  <button key={d} type="button" onClick={() => { setDept(d); setOpen(0); }}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-all ${dept === d ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {d}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="space-y-2.5">
            {roles.map((r, i) => (
              <Reveal key={r.title} delay={i * 50}>
                <RoleCard role={r} open={open === i} onToggle={() => setOpen(o => (o === i ? -1 : i))} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlowCTA title="Don’t see a role that fits?" subtitle="We’re always keen to meet great people. Send your CV and tell us what you’d build.">
        <a href="mailto:michael@areaconnect.pro?subject=Open%20application"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-5 py-2.5 transition-colors">
          <Mail size={14} /> Send your CV
        </a>
      </GlowCTA>
    </div>
  );
}
