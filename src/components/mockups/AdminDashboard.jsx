import { useEffect, useState } from 'react';
import {
  LayoutDashboard, UserCheck, Users, Home, Megaphone, CreditCard, Shield, PhoneCall, Music, ShoppingBag,
  MessageSquare, Bell, Settings, UsersRound, LogIn, ChevronRight, Sparkles, MapPin, Package, UserRound,
  UserPlus, Activity, ShieldAlert,
} from 'lucide-react';

// Miniature of the real estatemanager desktop Dashboard (components/dashboard/DesktopDashboard.jsx + Sidebar.jsx).

const NAV = [
  ['MANAGEMENT', [[LayoutDashboard, 'Dashboard'], [UserCheck, 'Visitors'], [Users, 'Residents'], [Home, 'Units'], [Megaphone, 'Announcements'], [CreditCard, 'Payments'], [Shield, 'Guards'], [PhoneCall, 'Calls'], [UsersRound, 'Team']]],
  ['COMMUNITY',  [[Music, 'Lounge & Events'], [ShoppingBag, 'Marketplace'], [MessageSquare, 'Community Chat'], [Bell, 'Alerts']]],
];

const STATUS = {
  active:       { label: 'EXPECTED',   bg: '#EEF2FF', text: '#4338CA' },
  'checked-in': { label: 'INSIDE NOW', bg: '#ECFDF5', text: '#047857' },
  'checked-out':{ label: 'LEFT',       bg: '#F1F5F9', text: '#475569' },
};
const PURPOSE = { Friend: ['#6366F1', UserRound], Family: ['#EC4899', Users], Delivery: ['#F59E0B', Package] };

// Each tick advances the estate's evening.
const FRAMES = [
  { inside: 7,  today: 12, alerts: 0, visitors: [['Tunde Adeyemi', 'Friend', '6:30 PM', 'Ada O.', 'active'], ['Chioma Obi', 'Family', '4:00 PM', 'Emeka N.', 'checked-in'], ['Jumia Rider', 'Delivery', '1:15 PM', 'Bisi A.', 'checked-out']] },
  { inside: 8,  today: 12, alerts: 0, visitors: [['Tunde Adeyemi', 'Friend', '6:30 PM', 'Ada O.', 'checked-in'], ['Chioma Obi', 'Family', '4:00 PM', 'Emeka N.', 'checked-in'], ['Jumia Rider', 'Delivery', '1:15 PM', 'Bisi A.', 'checked-out']] },
  { inside: 8,  today: 13, alerts: 1, visitors: [['Kola Bello', 'Friend', '7:10 PM', 'Femi K.', 'active'], ['Tunde Adeyemi', 'Friend', '6:30 PM', 'Ada O.', 'checked-in'], ['Chioma Obi', 'Family', '4:00 PM', 'Emeka N.', 'checked-in']] },
  { inside: 7,  today: 13, alerts: 0, visitors: [['Kola Bello', 'Friend', '7:10 PM', 'Femi K.', 'active'], ['Tunde Adeyemi', 'Friend', '6:30 PM', 'Ada O.', 'checked-in'], ['Chioma Obi', 'Family', '4:00 PM', 'Emeka N.', 'checked-out']] },
];

const initials = (n) => n.split(' ').map(w => w[0]).slice(0, 2).join('');

export default function AdminDashboard() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(x => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const f = FRAMES[n % FRAMES.length];

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      <div className="absolute -inset-6 bg-gradient-to-br from-brand-400/30 to-indigo-400/20 blur-3xl rounded-full" />

      {/* browser frame */}
      <div className="relative rounded-2xl bg-white border border-slate-200 shadow-2xl shadow-slate-900/15 overflow-hidden">
        <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 px-3">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div className="ml-3 flex-1 max-w-[220px] h-5 rounded-md bg-white border border-slate-200 text-[9px] text-slate-400 flex items-center px-2">area-connector.areaconnect.pro</div>
        </div>

        <div className="flex h-[400px] sm:h-[430px] bg-[#F8FAFC]">
          {/* sidebar */}
          <aside className="hidden sm:flex w-[150px] flex-shrink-0 flex-col bg-white border-r border-[#E2E8F0] p-2.5">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-[7px] font-extrabold text-white">AC</div>
              <div className="leading-tight">
                <div className="text-[9px] font-semibold text-[#0F172A]">Area<span className="text-[#10B981]">Connect</span></div>
                <div className="text-[7px] text-[#94A3B8]">Sunrise Estate</div>
              </div>
            </div>
            {NAV.map(([section, items]) => (
              <div key={section} className="mb-2">
                <div className="text-[7px] font-semibold tracking-wider text-[#94A3B8] px-1.5 mb-1">{section}</div>
                {items.map(([I, l], i) => {
                  const on = section === 'MANAGEMENT' && i === 0;
                  return (
                    <div key={l} className={`flex items-center gap-1.5 px-1.5 py-[3px] rounded-md text-[8.5px] ${on ? 'bg-[rgba(16,185,129,0.08)] text-[#059669] font-semibold shadow-[inset_2px_0_0_#10B981]' : 'text-[#475569] font-medium'}`}>
                      <I size={9} /> {l}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="mt-auto flex items-center gap-1.5 pt-2 border-t border-slate-100">
              <img src="/team/michael-orizu.jpg" alt="" className="w-5 h-5 rounded-full object-cover object-[50%_15%] ring-2 ring-emerald-200" />
              <div className="leading-tight min-w-0">
                <div className="text-[8px] font-semibold text-slate-700 truncate">Michael Orizu</div>
                <div className="text-[6.5px] text-slate-400 truncate">Estate manager</div>
              </div>
            </div>
          </aside>

          {/* main — mirrors the new estatemanager DesktopDashboard */}
          <main className="flex-1 min-w-0 p-3 space-y-2 overflow-hidden">
            {/* welcome banner */}
            <div className="relative rounded-[14px] px-3.5 py-3 overflow-hidden text-white"
              style={{ background: 'linear-gradient(120deg,#022C22 0%,#064E3B 50%,#047857 100%)', boxShadow: '0 10px 22px -14px rgba(4,120,87,0.8)' }}>
              <div className="absolute -top-10 right-16 w-28 h-28 rounded-full blur-2xl bg-[#34D399]/25" />
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[7px] text-white/75">
                    <span className="inline-flex items-center gap-1 font-semibold text-white px-1.5 py-px rounded-full bg-white/15 border border-white/20">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> Live
                    </span>
                    Tuesday, 20 October · 19:04
                  </div>
                  <div className="mt-1 text-[13px] font-semibold tracking-tight">Good evening, Michael 👋</div>
                  <div className="text-[7.5px] text-white/75 flex items-center gap-1 truncate"><MapPin size={7} /> <span className="text-white font-medium">Sunrise Estate</span> · Lekki Phase 1</div>
                </div>
                <div className="hidden md:flex items-center gap-1 flex-shrink-0">
                  <span className="inline-flex items-center gap-1 text-[7px] font-medium px-1.5 py-1 rounded-lg bg-white/10 border border-white/25">
                    <Bell size={7} /> Alerts {f.alerts > 0 && <span className="min-w-[10px] h-[10px] rounded-full bg-red-500 text-[6px] leading-[10px] text-center animate-pulse">{f.alerts}</span>}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[7px] font-medium px-1.5 py-1 rounded-lg bg-white/10 border border-white/25"><Megaphone size={7} /> Post notice</span>
                  <span className="inline-flex items-center gap-1 text-[7px] font-semibold px-1.5 py-1 rounded-lg bg-white text-emerald-700"><UserPlus size={7} /> Register visitor</span>
                </div>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-5 gap-1.5">
              {[
                ['Residents', 248, UsersRound, '#6366F1'],
                ['Units', 96, Home, '#8B5CF6'],
                ['Visitors today', f.today, UserCheck, '#10B981', true],
                ['Inside now', f.inside, LogIn, '#0EA5E9', false, true],
                ['Open alerts', f.alerts, Bell, f.alerts ? '#EF4444' : '#F59E0B', false, f.alerts > 0],
              ].map(([l, v, I, c, spark, live]) => (
                <div key={l} className="relative rounded-[10px] p-1.5 border overflow-hidden transition-colors duration-500"
                  style={{ background: `linear-gradient(140deg, ${c}1C 0%, #FFFFFF 60%)`, borderColor: `${c}33` }}>
                  <div className="flex items-center justify-between">
                    <span className="w-4 h-4 rounded-md flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${c}, ${c}CC)` }}><I size={8} className="text-white" /></span>
                    {live && <span className="relative flex w-1 h-1"><span className="absolute inset-0 rounded-full animate-ping" style={{ background: c }} /><span className="relative w-1 h-1 rounded-full" style={{ background: c }} /></span>}
                  </div>
                  <div className="mt-1 flex items-end justify-between">
                    <div key={`${l}${v}`} className="about-word-in text-[13px] font-semibold leading-none text-slate-900 tabular-nums">{v}</div>
                    {spark && (
                      <svg width="22" height="9" viewBox="0 0 22 9"><path d="M0 7 L4 6 L8 7.5 L12 4 L16 5 L22 1.5" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </div>
                  <div className="text-[6.5px] font-medium text-slate-500 truncate mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            {/* traffic + security */}
            <div className="grid grid-cols-[1.6fr_1fr] gap-2">
              <div className="rounded-[12px] bg-white border border-slate-200/70 p-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[8px] font-semibold text-slate-900"><span className="w-3.5 h-3.5 rounded-md bg-[#10B981] flex items-center justify-center"><Activity size={7} className="text-white" /></span> Visitor traffic</span>
                  <span className="text-[6.5px] text-slate-400">Last 7 days</span>
                </div>
                <div className="mt-1 text-[11px] font-semibold text-slate-900 tabular-nums">{58 + f.today} <span className="text-[6.5px] font-normal text-slate-400">visitors · {((58 + f.today) / 7).toFixed(1)} a day</span></div>
                <div className="mt-1.5 h-[46px] flex items-end gap-1">
                  {[6, 9, 7, 12, 8, 10, f.today].map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                      <div className="w-full rounded-t-[3px] transition-all duration-700" style={{ height: `${(v / 13) * 40}px`, background: i === 6 ? 'linear-gradient(180deg,#34D399,#059669)' : '#D1FAE5' }} />
                      <span className="text-[5.5px] text-slate-400">{['W', 'T', 'F', 'S', 'S', 'M', 'T'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              {f.alerts > 0 ? (
                <div key="alert" className="about-feed-in rounded-[12px] p-2 text-white overflow-hidden relative" style={{ background: 'linear-gradient(150deg,#2A0606,#7F1D1D 55%,#DC2626 130%)' }}>
                  <div className="flex items-center gap-1 text-[8px] font-semibold"><ShieldAlert size={8} /> Security</div>
                  <div className="mt-1.5 text-[10px] font-semibold leading-tight">1 open alert</div>
                  <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-white/10 border border-white/15 px-1.5 py-1">
                    <span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-red-300 animate-ping" /><span className="relative w-1.5 h-1.5 rounded-full bg-red-300" /></span>
                    <span className="text-[7px] font-semibold flex-1 truncate">Panic · Femi K.</span>
                    <span className="text-[6.5px] text-white/60">19:04</span>
                  </div>
                </div>
              ) : (
                <div key="quiet" className="about-feed-in rounded-[12px] p-2 text-white overflow-hidden relative" style={{ background: 'linear-gradient(150deg,#022C22,#064E3B 55%,#047857 120%)' }}>
                  <div className="flex items-center gap-1 text-[8px] font-semibold"><Shield size={8} /> Security</div>
                  <div className="mt-1.5 text-[10px] font-semibold leading-tight">All secure</div>
                  <div className="text-[7px] text-white/65 mt-0.5">No open alerts right now</div>
                  <div className="mt-1.5 grid grid-cols-2 gap-1">
                    {[['Guards on duty', 4], ['Gates', 2]].map(([l, v]) => (
                      <div key={l} className="rounded-md bg-white/10 px-1 py-0.5"><div className="text-[9px] font-semibold">{v}</div><div className="text-[5.5px] text-white/60">{l}</div></div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* recent visitors */}
            <div className="rounded-[12px] bg-white border border-slate-200/70 overflow-hidden">
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100">
                <span className="flex items-center gap-1 text-[8px] font-semibold text-slate-900"><span className="w-3.5 h-3.5 rounded-md bg-[#10B981] flex items-center justify-center"><UserCheck size={7} className="text-white" /></span> Recent visitors</span>
                <span className="text-[7px] font-medium text-slate-500">View all →</span>
              </div>
              {f.visitors.map(([name, purpose, time, host, status], i) => {
                const st = STATUS[status];
                const [pc, PI] = PURPOSE[purpose];
                return (
                  <div key={name} className={`flex items-center gap-2 px-2.5 py-1 ${i < 2 ? 'border-b border-slate-50' : ''}`}>
                    <div className="relative w-5 h-5 flex-shrink-0">
                      <div className="w-5 h-5 rounded-lg text-[6.5px] font-bold flex items-center justify-center transition-colors duration-500" style={{ background: st.bg, color: st.text }}>{initials(name)}</div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white flex items-center justify-center" style={{ background: pc }}><PI size={4} className="text-white" /></span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[8px] font-semibold text-slate-900 truncate">{name}</div>
                      <div className="text-[6.5px] text-slate-500 truncate"><span style={{ color: pc }} className="font-semibold">{purpose}</span> · Today, {time} · For {host}</div>
                    </div>
                    <span key={status} className="about-feed-in rounded-full px-1.5 py-0.5 text-[6px] font-bold whitespace-nowrap" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* floating chip */}
      <div className="hidden sm:block absolute -right-6 -bottom-6 z-20 animate-float">
        <div className="rounded-2xl bg-slate-900 text-white shadow-xl px-3.5 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Payments · October</div>
          <div className="text-sm font-semibold">82% collected <span className="text-brand-400 text-xs">· via Paystack</span></div>
        </div>
      </div>
    </div>
  );
}
