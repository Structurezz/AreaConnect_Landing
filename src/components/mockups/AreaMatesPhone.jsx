import { useEffect, useState } from 'react';
import {
  Check, Plus, QrCode, Wallet, ShoppingBag, Vote, PhoneCall, CreditCard, Shield, Users, Package, UserRound,
  UserPlus, MessagesSquare, Bell, Home as HomeIcon, LayoutGrid, Phone, Signal, BatteryFull,
} from 'lucide-react';

// Illustrative notifications for the floating cards around the phone.
const TOASTS = [
  { icon: QrCode,      tone: 'bg-brand-500',  title: 'Visitor checked in',   meta: 'Gate 2 · just now' },
  { icon: Wallet,      tone: 'bg-indigo-500', title: 'Service charge paid',  meta: 'Receipt sent' },
  { icon: PhoneCall,   tone: 'bg-sky-500',    title: 'Gate is calling…',     meta: 'Security · Main gate' },
  { icon: ShoppingBag, tone: 'bg-amber-500',  title: 'New order',            meta: 'Marketplace · escrow' },
  { icon: Vote,        tone: 'bg-violet-500', title: 'Poll closing soon',    meta: 'Generator hours' },
];

// Mirrors the real AreaMates home screen (residents-mobile/app/(tabs)/index.jsx).
const STATUS = {
  active:       { label: 'Expected',   dot: '#6366F1', bg: '#EEF2FF', text: '#4338CA' },
  'checked-in': { label: 'Inside now', dot: '#10B981', bg: '#ECFDF5', text: '#047857' },
  'checked-out':{ label: 'Left',       dot: '#94A3B8', bg: '#F1F5F9', text: '#475569' },
};
const PURPOSE = {
  Family:   { color: '#EC4899', icon: Users },
  Delivery: { color: '#F59E0B', icon: Package },
  Friend:   { color: '#6366F1', icon: UserRound },
};
// Each tick moves the story on: a pass is created, the guest arrives, then leaves.
const PASS_STATES = [
  [{ name: 'Tunde Adeyemi', purpose: 'Friend',   time: 'Today, 6:30 PM', code: '482913', status: 'active' },
   { name: 'Chioma Obi',    purpose: 'Family',   time: 'Today, 4:00 PM', code: '715204', status: 'checked-in' },
   { name: 'Jumia Rider',   purpose: 'Delivery', time: 'Today, 1:15 PM', code: '390561', status: 'checked-out' }],
  [{ name: 'Tunde Adeyemi', purpose: 'Friend',   time: 'Today, 6:30 PM', code: '482913', status: 'checked-in' },
   { name: 'Chioma Obi',    purpose: 'Family',   time: 'Today, 4:00 PM', code: '715204', status: 'checked-in' },
   { name: 'Jumia Rider',   purpose: 'Delivery', time: 'Today, 1:15 PM', code: '390561', status: 'checked-out' }],
  [{ name: 'Tunde Adeyemi', purpose: 'Friend',   time: 'Today, 6:30 PM', code: '482913', status: 'checked-in' },
   { name: 'Chioma Obi',    purpose: 'Family',   time: 'Today, 4:00 PM', code: '715204', status: 'checked-out' },
   { name: 'Jumia Rider',   purpose: 'Delivery', time: 'Today, 1:15 PM', code: '390561', status: 'checked-out' }],
];
const BANNERS = [
  { title: 'Tunde Adeyemi has arrived', meta: 'Checked in at Main Gate' },
  { title: 'Service charge paid',       meta: '₦25,000 · receipt sent' },
  { title: 'New estate notice',         meta: 'Water supply update' },
];
const QUICK = [
  { icon: UserPlus,      label: 'Invite', bg: 'rgba(99,102,241,0.10)', color: '#4F46E5' },
  { icon: ShoppingBag,   label: 'Market', bg: 'rgba(245,158,11,0.10)', color: '#D97706' },
  { icon: MessagesSquare,label: 'Chat',   bg: 'rgba(59,130,246,0.10)', color: '#2563EB' },
  { icon: Bell,          label: 'Alerts', bg: 'rgba(239,68,68,0.10)',  color: '#DC2626' },
];
const TABS = [[HomeIcon, 'Home'], [UserPlus, 'Visitors'], [CreditCard, 'Payments'], [MessagesSquare, 'Chat'], [LayoutGrid, 'Menu']];
const initials = (n) => n.split(' ').map(w => w[0]).slice(0, 2).join('');

export default function AreaMatesPhone() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(x => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const passes = PASS_STATES[n % PASS_STATES.length];
  const banner = BANNERS[n % BANNERS.length];
  const inside = passes.filter(p => p.status === 'checked-in').length;
  const side = TOASTS[(n + 2) % TOASTS.length];

  return (
    <div className="relative mx-auto w-[270px] sm:w-[300px]">
      <div className="absolute -inset-16 flex items-center justify-center pointer-events-none">
        <div className="about-spin w-full aspect-square rounded-full border border-dashed border-indigo-300/60" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/35 to-brand-400/25 blur-3xl rounded-full" />

      {/* phone */}
      <div className="relative z-10 rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-indigo-900/30">
        <div className="relative rounded-[2.1rem] bg-[#F8FAFC] overflow-hidden h-[560px] sm:h-[600px] flex flex-col">
          {/* status bar + notch */}
          <div className="h-9 bg-white flex items-center justify-between px-6 text-[10px] font-semibold text-slate-900 flex-shrink-0">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>

          {/* push banner */}
          <div className="absolute top-10 left-2.5 right-2.5 z-30 pointer-events-none">
            <div key={n} className="home-banner flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-xl p-2.5">
              <img src="/apps/areamates.png" alt="" className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">AreaMates</span>
                  <span className="text-[9px] text-slate-400">now</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-900 truncate">{banner.title}</div>
                <div className="text-[10px] text-slate-500 truncate">{banner.meta}</div>
              </div>
            </div>
          </div>

          {/* top bar */}
          <div className="h-12 bg-white border-b border-slate-200 flex items-center gap-2 px-3.5 flex-shrink-0">
            <img src="/apps/areamates.png" alt="AreaMates" className="w-7 h-7 rounded-lg" />
            <div className="flex-1 min-w-0 leading-tight">
              <div className="text-[13px] font-bold text-slate-900 tracking-tight">Area<span className="text-indigo-500">Mates</span></div>
              <div className="text-[9px] text-slate-400 font-medium truncate">Sunrise Estate, Lekki</div>
            </div>
            <Phone size={15} className="text-slate-500 mx-1" />
            <div className="relative">
              <Bell size={15} className="text-slate-500" />
              <span className="absolute -top-1.5 -right-1.5 min-w-[13px] h-[13px] px-0.5 rounded-full bg-indigo-500 border-2 border-white text-[7px] font-bold text-white flex items-center justify-center">3</span>
            </div>
          </div>

          {/* scroll content */}
          <div className="flex-1 overflow-hidden px-3 pt-3">
            {/* hero card */}
            <div className="relative rounded-[18px] bg-[#4F46E5] p-3.5 overflow-hidden shadow-lg shadow-indigo-700/30">
              <div className="absolute -top-12 -right-8 w-36 h-36 rounded-full bg-violet-300/35" />
              <div className="absolute -bottom-14 -left-8 w-36 h-36 rounded-full bg-indigo-900/50" />
              <div className="relative flex items-center gap-1.5 mb-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/25 px-2 py-0.5 text-[8px] font-extrabold tracking-wider text-white">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> LIVE
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 border border-white/20 px-2 py-0.5 text-[9px] font-semibold text-white/95">
                  <HomeIcon size={8} /> Unit 4 · Block C
                </span>
              </div>
              <div className="relative flex items-start gap-2 mb-3.5">
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] font-semibold text-white/75">Good evening,</div>
                  <div className="text-[19px] font-extrabold text-white tracking-tight leading-tight">Ada <span className="text-amber-200">✦</span></div>
                  <div className="text-[9px] text-white/65 mt-0.5">Tue, Oct 20 · Lekki Phase 1</div>
                </div>
                <div className="relative w-[52px] h-[52px]">
                  <span className="absolute inset-0 rounded-[14px] bg-red-500 animate-ping opacity-30" />
                  <div className="relative w-[52px] h-[52px] rounded-[14px] bg-red-500 border-2 border-white/30 flex flex-col items-center justify-center shadow-lg shadow-red-500/40">
                    <Shield size={15} className="text-white" fill="white" />
                    <span className="text-[8px] font-extrabold text-white mt-0.5">SOS</span>
                  </div>
                </div>
              </div>
              <div className="relative grid grid-cols-3 gap-1.5">
                {[['Active', inside], ['Visitors', passes.length], ['Notices', 2]].map(([l, v]) => (
                  <div key={l} className="rounded-[10px] py-1.5 text-center bg-white/15 border border-white/15">
                    <div key={`${l}-${v}`} className="about-word-in text-[15px] font-extrabold text-white leading-none">{v}</div>
                    <div className="text-[8px] font-medium text-white/70 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-4 gap-1.5 mt-2.5">
              {QUICK.map(q => (
                <div key={q.label} className="rounded-[13px] bg-white border border-slate-200 py-2 flex flex-col items-center gap-1.5">
                  <div className="w-7 h-7 rounded-[9px] flex items-center justify-center" style={{ background: q.bg }}>
                    <q.icon size={14} style={{ color: q.color }} />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-700">{q.label}</span>
                </div>
              ))}
            </div>

            {/* visitor passes */}
            <div className="mt-2.5 rounded-[16px] bg-white border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-900/[0.06]">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-md bg-indigo-500/10 flex items-center justify-center"><UserPlus size={10} className="text-indigo-600" /></span>
                  <span className="text-[11px] font-semibold text-slate-900">My Visitor Passes</span>
                </div>
                <span className="inline-flex items-center gap-0.5 rounded-lg bg-indigo-500 px-2 py-1 text-[9px] font-bold text-white"><Plus size={9} strokeWidth={3} /> New</span>
              </div>
              {passes.map((p, i) => {
                const st = STATUS[p.status];
                const pu = PURPOSE[p.purpose];
                return (
                  <div key={p.name} className={`flex items-center gap-2.5 px-3 py-2 ${i < passes.length - 1 ? 'border-b border-slate-900/[0.05]' : ''}`}>
                    <div className="relative w-8 h-8 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500" style={{ background: st.bg, color: st.text }}>{initials(p.name)}</div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 border-white" style={{ background: pu.color }}>
                        <pu.icon size={7} className="text-white" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-slate-900 truncate">{p.name}</div>
                      <div className="text-[9px] text-slate-500 truncate"><span className="font-bold" style={{ color: pu.color }}>{p.purpose}</span> · {p.time}</div>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span key={p.status} className="about-feed-in inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: st.bg, color: st.text }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: st.dot }} />{st.label}
                      </span>
                      <span className="text-[8px] font-mono text-slate-400 tracking-wider">{p.code}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* bottom tabs */}
          <div className="h-14 bg-white border-t border-slate-200 grid grid-cols-5 flex-shrink-0">
            {TABS.map(([I, l], i) => (
              <div key={l} className="flex flex-col items-center justify-center gap-0.5">
                <div className="relative">
                  <I size={16} className={i === 0 ? 'text-indigo-500' : 'text-slate-400'} fill={i === 0 ? 'currentColor' : 'none'} />
                  {i === 0 && <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                </div>
                <span className={`text-[8px] font-semibold ${i === 0 ? 'text-indigo-500' : 'text-slate-400'}`}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="hidden sm:block absolute -left-28 top-36 z-20 animate-float">
        <div className="rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl px-3.5 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Guard app · Gate 2</div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-600"><Check size={14} strokeWidth={3} /> Access granted</div>
        </div>
      </div>
      <div className="hidden sm:block absolute -right-24 top-1/2 z-20 animate-float-delayed">
        <div key={n} className="about-feed-in flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl px-3 py-2.5">
          <div className={`w-7 h-7 rounded-lg ${side.tone} text-white flex items-center justify-center`}><side.icon size={13} /></div>
          <div className="text-[12px] font-semibold text-slate-800 whitespace-nowrap">{side.title}</div>
        </div>
      </div>
      <div className="hidden sm:block absolute -left-20 bottom-20 z-20 animate-float-slow">
        <div className="rounded-2xl bg-slate-900 text-white shadow-xl px-3.5 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Admin · this month</div>
          <div className="text-sm font-semibold">₦2.4M collected <span className="text-brand-400 text-xs">· 82%</span></div>
        </div>
      </div>
    </div>
  );
}
