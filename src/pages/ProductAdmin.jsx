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

                  {/* Dashboard body — light theme matching real admin */}
                  <div className="flex" style={{ height: 330, background: '#F8FAFC' }}>
                    {/* Sidebar */}
                    <div
                      className="w-12 flex flex-col items-center py-3 gap-2 flex-shrink-0 border-r"
                      style={{ background: '#FFFFFF', borderColor: '#E2E8F0' }}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1" style={{ background: '#10B981' }}>
                        <span className="text-white text-[7px] font-black">AC</span>
                      </div>
                      {[Building2, Users, UserCheck, CreditCard, Bell, BarChart2].map((Icon, i) => (
                        <div
                          key={i}
                          className="w-7 h-6 rounded-lg flex items-center justify-center"
                          style={{
                            background: i === 0 ? 'rgba(16,185,129,0.10)' : 'transparent',
                            boxShadow: i === 0 ? 'inset 3px 0 0 #10B981' : 'none',
                          }}
                        >
                          <Icon size={12} style={{ color: i === 0 ? '#10B981' : '#94A3B8' }} />
                        </div>
                      ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                      {/* Emerald hero strip */}
                      <div className="px-3 pt-3 pb-3.5" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 60%, #047857 100%)' }}>
                        <div className="text-[10px] font-black text-white mb-0.5">Good morning, Adaeze 👋</div>
                        <div className="text-[8px] mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>Sunrise Estate — here's today at a glance</div>
                        <div className="flex gap-1">
                          {[
                            { l: 'Residents',     v: '142' },
                            { l: 'Visitors Today', v: '23' },
                            { l: 'Inside Now',    v: '8' },
                            { l: 'Open Alerts',   v: '2', alert: true },
                          ].map((s) => (
                            <div
                              key={s.l}
                              className="flex-1 rounded-lg px-1 py-1 text-center"
                              style={{ background: s.alert ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                            >
                              <div className="text-[10px] font-black text-white">{s.v}</div>
                              <div className="text-[7px]" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.l}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
                        {/* Quick Actions 2×2 */}
                        <div>
                          <div className="text-[7px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>Quick Actions</div>
                          <div className="grid grid-cols-2 gap-1.5">
                            {[
                              { label: 'Manage Residents', iconBg: 'rgba(99,102,241,0.10)',  iconColor: '#6366F1' },
                              { label: 'Estate Units',     iconBg: 'rgba(167,139,250,0.10)', iconColor: '#8B5CF6' },
                              { label: 'Post Notice',      iconBg: 'rgba(217,119,6,0.10)',   iconColor: '#D97706' },
                              { label: 'View Alerts',      iconBg: 'rgba(239,68,68,0.10)',   iconColor: '#EF4444' },
                            ].map((a) => (
                              <div
                                key={a.label}
                                className="flex items-center gap-1.5 p-1.5 rounded-xl border"
                                style={{ background: '#FFFFFF', borderColor: 'rgba(15,23,42,0.08)' }}
                              >
                                <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.iconBg }}>
                                  <div className="w-2 h-2 rounded-sm" style={{ background: a.iconColor }} />
                                </div>
                                <div className="text-[7px] font-semibold leading-tight" style={{ color: '#0F172A' }}>{a.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recent Visitors */}
                        <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
                          <div className="px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-wider border-b" style={{ color: '#94A3B8', borderColor: 'rgba(15,23,42,0.06)', background: '#FFFFFF' }}>
                            Recent Visitors
                          </div>
                          {[
                            { n: 'Chidi Okafor', u: 'Unit 4B', s: 'checked-in',  sc: '#059669', sb: 'rgba(16,185,129,0.10)',  se: 'rgba(16,185,129,0.18)' },
                            { n: 'Fatima Bello', u: 'Unit 2A', s: 'active',      sc: '#D97706', sb: 'rgba(245,158,11,0.10)',  se: 'rgba(245,158,11,0.18)' },
                            { n: 'Emeka Nwosu',  u: 'Unit 7C', s: 'checked-out', sc: '#94A3B8', sb: 'rgba(148,163,184,0.10)', se: 'rgba(148,163,184,0.18)' },
                          ].map((v) => (
                            <div key={v.n} className="flex items-center gap-1.5 px-2.5 py-1.5 border-b last:border-0 bg-white" style={{ borderColor: 'rgba(15,23,42,0.04)' }}>
                              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold flex-shrink-0"
                                style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.18)' }}>
                                {v.n[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[8px] font-medium truncate" style={{ color: '#0F172A' }}>{v.n}</div>
                                <div className="text-[7px]" style={{ color: '#94A3B8' }}>{v.u}</div>
                              </div>
                              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full"
                                style={{ background: v.sb, color: v.sc, border: `1px solid ${v.se}` }}>
                                {v.s}
                              </span>
                            </div>
                          ))}
                        </div>
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
              to="https://area-connector.areaconnect.pro/register"
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
