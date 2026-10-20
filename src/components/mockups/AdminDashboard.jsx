import { useEffect, useState } from 'react';
import {
  LayoutDashboard, UserCheck, Users, Home, Megaphone, CreditCard, Shield, PhoneCall, Music, ShoppingBag,
  MessageSquare, Bell, Settings, UsersRound, LogIn, ChevronRight, Sparkles, MapPin, Package, UserRound,
} from 'lucide-react';

// Miniature of the real estatemanager Dashboard (src/pages/Dashboard.jsx + Sidebar.jsx).

const NAV = [
  ['MANAGEMENT', [[LayoutDashboard, 'Dashboard'], [UserCheck, 'Visitors'], [Users, 'Residents'], [Home, 'Units'], [Megaphone, 'Announcements'], [CreditCard, 'Payments'], [Shield, 'Guards'], [PhoneCall, 'Calls']]],
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
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#10B981] to-[#047857] text-[7px] font-bold text-white flex items-center justify-center">MO</div>
              <div className="text-[8px] font-semibold text-slate-700 truncate">Estate Manager</div>
            </div>
          </aside>

          {/* main */}
          <main className="flex-1 min-w-0 p-3 space-y-2.5 overflow-hidden">
            {/* hero */}
            <div className="relative rounded-[18px] p-3.5 overflow-hidden text-white shadow-lg shadow-emerald-700/25"
              style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
              <div className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-[#34D399]/40 blur-2xl" />
              <div className="absolute inset-0 dot-grid opacity-30" />
              <div className="relative flex items-center gap-1.5 mb-2">
                <span className="rounded-full bg-white/[0.18] border border-white/25 px-1.5 py-0.5 text-[7px] font-bold tracking-wider">● LIVE</span>
                <span className="rounded-full bg-white/[0.18] border border-white/25 px-1.5 py-0.5 text-[7px] font-semibold">Tue, Oct 20</span>
              </div>
              <div className="relative text-[7px] font-semibold tracking-wider text-white/70">GOOD EVENING</div>
              <div className="relative text-[20px] font-black tracking-tight leading-tight">Michael 👋</div>
              <div className="relative flex items-center gap-1 text-[8px] font-semibold text-white/90 mb-2.5"><Sparkles size={8} className="text-[#A7F3D0]" /> Sunrise Estate, Lekki</div>
              <div className="relative grid grid-cols-4 gap-1.5">
                {[[UsersRound, 248, 'Residents'], [UserCheck, f.today, 'Visitors Today'], [LogIn, f.inside, 'Inside Now'], [Bell, f.alerts, 'Open Alerts']].map(([I, v, l]) => {
                  const red = l === 'Open Alerts' && v > 0;
                  return (
                    <div key={l} className="rounded-xl border p-1.5 transition-colors duration-500"
                      style={{ background: red ? 'rgba(239,68,68,.32)' : 'rgba(255,255,255,.14)', borderColor: 'rgba(255,255,255,.22)' }}>
                      <div className="w-4 h-4 rounded-md bg-white/20 flex items-center justify-center mb-1"><I size={8} /></div>
                      <div key={`${l}${v}`} className="about-word-in text-[15px] font-black leading-none">{v}</div>
                      <div className="text-[6.5px] text-white/80 mt-0.5 truncate">{l}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-[1.4fr_1fr] gap-2.5">
              {/* recent visitors */}
              <div className="rounded-[12px] bg-white border border-slate-900/[0.08] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-900">
                    <span className="w-4 h-4 rounded-md bg-[#ECFDF5] text-[#059669] flex items-center justify-center"><UserCheck size={8} /></span> Recent Visitors
                  </div>
                  <span className="text-[7.5px] font-semibold text-[#059669]">View all →</span>
                </div>
                {f.visitors.map(([name, purpose, time, host, status], i) => {
                  const st = STATUS[status];
                  const [pc, PI] = PURPOSE[purpose];
                  return (
                    <div key={name} className={`flex items-center gap-2 px-2.5 py-1.5 ${i < 2 ? 'border-b border-slate-50' : ''}`}>
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <div className="w-6 h-6 rounded-full text-[7px] font-bold flex items-center justify-center transition-colors duration-500" style={{ background: st.bg, color: st.text }}>{initials(name)}</div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white flex items-center justify-center" style={{ background: pc }}><PI size={5} className="text-white" /></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[8.5px] font-semibold text-slate-900 truncate">{name}</div>
                        <div className="text-[7px] text-slate-500 truncate"><span style={{ color: pc }} className="font-semibold">{purpose}</span> · Today, {time} · For {host}</div>
                      </div>
                      <span key={status} className="about-feed-in rounded-full px-1.5 py-0.5 text-[6.5px] font-bold whitespace-nowrap" style={{ background: st.bg, color: st.text }}>{st.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* live alerts + notices */}
              <div className="space-y-2.5">
                {f.alerts > 0 ? (
                  <div key="alert" className="about-feed-in rounded-[12px] border border-[#FECACA] p-2" style={{ background: 'linear-gradient(135deg,#FEE2E2,#FEF2F2)' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="flex items-center gap-1 text-[8.5px] font-bold text-[#DC2626]"><Shield size={9} /> Live Alerts</span>
                      <span className="rounded-full bg-[#DC2626] text-white text-[6.5px] font-bold px-1.5">1</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-white/65 px-1.5 py-1">
                      <span className="relative flex w-1.5 h-1.5"><span className="absolute inset-0 rounded-full bg-red-500 animate-ping" /><span className="relative w-1.5 h-1.5 rounded-full bg-red-500" /></span>
                      <span className="text-[7.5px] font-semibold text-slate-800 flex-1 truncate">Panic · Femi K.</span>
                      <span className="text-[7px] text-slate-500">19:04</span>
                    </div>
                  </div>
                ) : (
                  <div key="quiet" className="about-feed-in rounded-[12px] border border-emerald-100 bg-[#ECFDF5] p-2">
                    <div className="flex items-center gap-1 text-[8.5px] font-bold text-[#047857] mb-1"><Shield size={9} /> Live Alerts</div>
                    <div className="text-[7.5px] text-[#047857]/80">All quiet. No open alerts right now.</div>
                  </div>
                )}
                <div className="rounded-[12px] bg-white border border-slate-900/[0.08] shadow-sm p-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1 text-[8.5px] font-bold text-slate-900"><Megaphone size={9} className="text-[#D97706]" /> Notices</span>
                    <span className="text-[7px] font-semibold text-[#D97706]">Post +</span>
                  </div>
                  {['Water supply update', 'Estate AGM — Saturday'].map(t => (
                    <div key={t} className="flex items-center gap-1 text-[7.5px] text-slate-600 py-0.5"><span className="w-1 h-1 rounded-full bg-amber-500" />{t}</div>
                  ))}
                </div>
                <div className="rounded-[12px] bg-white border border-slate-900/[0.08] shadow-sm p-2 flex items-center gap-1.5">
                  <MapPin size={9} className="text-pink-500" /><span className="text-[7.5px] font-semibold text-slate-700 flex-1 truncate">Estate map</span><ChevronRight size={9} className="text-slate-300" />
                </div>
              </div>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-4 gap-1.5">
              {[['Residents', 'from-[#6366F1] to-[#4F46E5]', Users], ['Units', 'from-[#A78BFA] to-[#8B5CF6]', Home], ['Post Notice', 'from-[#F59E0B] to-[#D97706]', Megaphone], ['Alerts', 'from-[#EF4444] to-[#DC2626]', Bell]].map(([l, g, I]) => (
                <div key={l} className="rounded-xl bg-white border border-slate-900/[0.06] p-1.5 flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${g} flex items-center justify-center`}><I size={9} className="text-white" /></div>
                  <span className="text-[7.5px] font-bold text-slate-800 truncate">{l}</span>
                </div>
              ))}
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
