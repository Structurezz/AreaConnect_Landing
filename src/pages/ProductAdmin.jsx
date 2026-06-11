import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Users, CreditCard, UserCheck, BarChart2,
  Building2, Bell, Settings, Shield, TrendingUp, Megaphone,
} from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

export default function ProductAdmin() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] bg-[#050d1a] flex items-center overflow-hidden noise">
        {/* Orbs */}
        <div className="absolute pointer-events-none inset-0">
          <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-24 w-[360px] h-[360px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        <div className="relative max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left copy */}
            <div className="flex-1 max-w-xl text-center lg:text-left z-10">
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 bg-brand-500/10 border border-brand-500/20 text-brand-400">
                AreaConnect Admin
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-black leading-[1.03] tracking-tight mb-6 text-white">
                Your estate,<br />
                <span className="gradient-text-brand">fully in control.</span>
              </h1>
              <p className="hidden sm:block text-lg text-slate-400 leading-relaxed mb-8">
                AreaConnect Admin is the web dashboard for estate managers. Manage residents, collect dues, broadcast announcements, and see everything happening in your estate — from one place.
              </p>
              <p className="block sm:hidden text-sm text-slate-400 leading-relaxed mb-8">
                The web dashboard for estate managers — residents, dues, announcements, and analytics in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 text-[15px]"
                >
                  Start for free <ArrowRight size={16} />
                </Link>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/8 text-[15px]"
                >
                  Request a demo
                </Link>
              </div>
            </div>

            {/* Right — stat cards grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 w-full max-w-md mx-auto z-10">
              {[
                {
                  icon: Users,
                  iconBg: 'bg-brand-500/20',
                  iconColor: 'text-brand-400',
                  label: 'Residents',
                  value: '142 active',
                },
                {
                  icon: CreditCard,
                  iconBg: 'bg-indigo-500/20',
                  iconColor: 'text-indigo-400',
                  label: 'Dues',
                  value: '₦1.2M / month',
                },
                {
                  icon: UserCheck,
                  iconBg: 'bg-blue-500/20',
                  iconColor: 'text-blue-400',
                  label: 'Visitors',
                  value: '23 today',
                },
                {
                  icon: BarChart2,
                  iconBg: 'bg-amber-500/20',
                  iconColor: 'text-amber-400',
                  label: 'Analytics',
                  value: 'Live dashboard',
                },
              ].map((c) => (
                <div
                  key={c.label}
                  className="bg-white/5 border border-white/8 rounded-2xl p-5 hover:bg-white/8 transition-all duration-200"
                >
                  <div className={`w-10 h-10 ${c.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <c.icon size={18} className={c.iconColor} />
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{c.label}</div>
                  <div className="font-black text-white text-sm">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#050d1a] to-transparent pointer-events-none" />
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Built for managers</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Everything an estate manager needs
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  title: 'Resident management',
                  desc: 'Add residents directly, invite by email, or bulk-import hundreds via CSV. Assign to units, suspend, or reactivate with one click.',
                },
                {
                  title: 'Unit management',
                  desc: 'Create blocks and units, set occupancy limits, and track which units are vacant, occupied, or over-capacity.',
                },
                {
                  title: 'Payment collection',
                  desc: 'Create levy schedules (service charge, security, generator), set due dates, and collect via Paystack with full reconciliation reports.',
                },
                {
                  title: 'Announcements',
                  desc: 'Broadcast notices to all residents with images and attachments. Track who has seen and acknowledged each announcement.',
                },
                {
                  title: 'Visitor management',
                  desc: 'View all visitor pre-registrations and live entry logs. Resolve disputes, blacklist visitors, and export logs.',
                },
                {
                  title: 'Alert management',
                  desc: 'Broadcast security alerts to all residents and track acknowledgements. View the full alert history by date and severity.',
                },
                {
                  title: 'Community oversight',
                  desc: 'Monitor polls, events, and marketplace listings. Moderate content, close polls, and manage estate-wide community settings.',
                },
                {
                  title: 'Analytics dashboard',
                  desc: 'Live stats for visitor trends, payment collection rates, resident activity, and community engagement metrics.',
                },
                {
                  title: 'Settings & billing',
                  desc: 'Manage your subscription plan, update estate details, configure notification preferences, and set up the estate wallet.',
                },
              ].map((f, i) => (
                <Reveal key={f.title} delay={i * 40}>
                  <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                    <CheckCircle2 size={18} className="text-brand-500 mb-3" />
                    <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DASHBOARD SHOWCASE ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* Left: Dashboard mockup */}
            <Reveal className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-brand-50 to-emerald-50 rounded-3xl" />
                <div
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/8 w-full max-w-md mx-auto"
                  style={{ background: 'linear-gradient(145deg, #1a2235 0%, #0d1424 100%)' }}
                >
                  {/* Browser chrome */}
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
                    style={{ background: 'rgba(0,0,0,0.3)' }}
                  >
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex-1 mx-3">
                      <div
                        className="rounded-md px-3 py-1 text-[10px] text-slate-500 text-center font-mono"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        app.areaconnect.pro/dashboard
                      </div>
                    </div>
                  </div>

                  {/* Dashboard body */}
                  <div className="flex" style={{ height: 330 }}>
                    {/* Sidebar */}
                    <div
                      className="w-12 flex flex-col items-center py-4 gap-3 flex-shrink-0 border-r"
                      style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.05)' }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center mb-1 glow-sm-green">
                        <span className="text-white text-[7px] font-black">AC</span>
                      </div>
                      {[Building2, Users, UserCheck, CreditCard, Bell, BarChart2].map((Icon, i) => (
                        <div
                          key={i}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${i === 0 ? 'bg-brand-500/20' : 'hover:bg-white/5'}`}
                        >
                          <Icon size={12} className={i === 0 ? 'text-brand-400' : 'text-slate-600'} />
                        </div>
                      ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 overflow-hidden">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-[11px] font-bold text-slate-200">Sunrise Estate</div>
                          <div className="text-[9px] text-slate-500">Good morning, Adaeze 👋</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse-slow" />
                          <span className="text-[9px] text-brand-400 font-medium">Live</span>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { l: 'Residents',     v: '142',   c: 'text-brand-400', bg: 'rgba(16,185,129,0.08)' },
                          { l: "Today's visits", v: '23',   c: 'text-blue-400',  bg: 'rgba(59,130,246,0.08)' },
                          { l: 'Dues (Nov)',    v: '₦1.2M', c: 'text-amber-400', bg: 'rgba(245,158,11,0.08)' },
                        ].map((s) => (
                          <div
                            key={s.l}
                            className="rounded-xl p-2.5"
                            style={{ background: s.bg, border: '1px solid rgba(255,255,255,0.06)' }}
                          >
                            <div className={`text-[11px] font-black ${s.c}`}>{s.v}</div>
                            <div className="text-[8px] text-slate-500 mt-0.5">{s.l}</div>
                          </div>
                        ))}
                      </div>

                      {/* Payment progress */}
                      <div
                        className="rounded-xl p-3 mb-3"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Nov Collection</span>
                          <span className="text-[9px] font-bold text-brand-400">76%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full shimmer"
                            style={{ width: '76%' }}
                          />
                        </div>
                        <div className="text-[8px] text-slate-600 mt-1.5">₦2.35M of ₦3.1M · 18 pending</div>
                      </div>

                      {/* Visitor list */}
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <div
                          className="px-3 py-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider border-b"
                          style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                        >
                          Today's visitors
                        </div>
                        {[
                          { n: 'Chidi Okafor', u: 'Unit 4B', t: '10:23', s: 'IN',      c: 'bg-brand-500/15 text-brand-400' },
                          { n: 'Fatima Bello', u: 'Unit 2A', t: '11:05', s: 'PENDING', c: 'bg-amber-500/15 text-amber-400' },
                          { n: 'Emeka Nwosu',  u: 'Unit 7C', t: '09:44', s: 'OUT',     c: 'bg-slate-500/15 text-slate-400' },
                        ].map((v) => (
                          <div
                            key={v.n}
                            className="flex items-center justify-between px-3 py-1.5 border-b last:border-0"
                            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                          >
                            <div className="flex items-center gap-1.5">
                              <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center text-[7px] font-bold text-slate-400">
                                {v.n[0]}
                              </div>
                              <div>
                                <div className="text-[9px] font-semibold text-slate-300">{v.n}</div>
                                <div className="text-[8px] text-slate-600">{v.u} · {v.t}</div>
                              </div>
                            </div>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${v.c}`}>{v.s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right: feature list */}
            <div className="flex-1 max-w-lg">
              <Reveal>
                <span className="section-tag mb-4 inline-flex">Dashboard showcase</span>
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
                  Everything at a glance, nothing missed
                </h2>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8">
                  No more chasing residents on WhatsApp, paper visitor logs, or manual bank reconciliation. AreaConnect Admin puts you in full control from your browser.
                </p>
              </Reveal>

              <div className="space-y-4">
                {[
                  {
                    icon: Users,
                    title: 'Resident onboarding',
                    desc: 'Invite residents one-by-one or bulk-upload via CSV. Each gets a branded welcome email with login credentials.',
                  },
                  {
                    icon: CreditCard,
                    title: 'Automated dues collection',
                    desc: 'Schedule monthly levies, send reminders, and collect via Paystack. Full reconciliation and receipt generation.',
                  },
                  {
                    icon: BarChart2,
                    title: 'Live analytics',
                    desc: 'Real-time dashboard for visitor trends, payment rates, and community engagement metrics.',
                  },
                  {
                    icon: Bell,
                    title: 'Broadcast alerts',
                    desc: 'Send estate-wide security alerts with one click. Track who has acknowledged each broadcast.',
                  },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 60}>
                    <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200 cursor-default">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <f.icon size={18} className="text-brand-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{f.title}</div>
                        <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-2xl mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Get started today
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Set up your estate in minutes
            </h2>
            <p className="text-brand-100 text-base sm:text-lg mb-10 leading-relaxed">
              The Admin portal is free to start. No credit card, no commitment.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-base shadow-xl shadow-black/20 hover:-translate-y-0.5"
            >
              Get started free <ArrowRight size={18} />
            </Link>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Free forever plan</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> No credit card needed</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
