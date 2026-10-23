import { useEffect, useState } from 'react';
import {
  Check, Plus, QrCode, Wallet, ShoppingBag, Vote, PhoneCall, CreditCard, Shield, Users, Package, UserRound,
  UserPlus, MessagesSquare, Bell, Home as HomeIcon, LayoutGrid, Phone, Signal, BatteryFull,
  Siren, Megaphone, LogIn, LogOut, CalendarClock,
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
const RING = 2 * Math.PI * 34;
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
  const livePasses = passes.filter(p => p.status !== 'checked-out').length;
  const headline = inside ? `${inside} of your guests ${inside === 1 ? 'is' : 'are'} inside` : `${livePasses} guests on the way`;
  const VERB = { active: ['is expected', CalendarClock, '#6366F1'], 'checked-in': ['arrived', LogIn, '#10B981'], 'checked-out': ['left', LogOut, '#94A3B8'] };
  const activity = [
    { key: 'notice', urgent: true, icon: Megaphone, color: '#EF4444', title: 'Water off tomorrow 10am–2pm', sub: 'Notice from management', when: '3h' },
    ...passes.map((p) => {
      const [verb, icon, color] = VERB[p.status];
      return { key: `${p.name}-${p.status}`, icon, color, title: `${p.name} ${verb}`, sub: `${p.purpose}${p.status === 'active' ? ` · code ${p.code}` : ''}`, when: p.status === 'checked-in' ? 'now' : p.time.replace('Today, ', '') };
    }),
  ];

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

          {/* scroll content — mirrors the new AreaMates home (residents MobileDashboard) */}
          <div className="flex-1 overflow-hidden px-3 pt-2.5 pb-2 flex flex-col gap-2.5">
            {/* greeting */}
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0 leading-tight">
                <div className="text-[8.5px] font-medium text-slate-400 flex items-center gap-1 truncate">Tuesday, 20 October <span className="text-slate-300">·</span> <HomeIcon size={7} /> Unit 4 · Block C</div>
                <div className="text-[15px] font-semibold text-slate-900 tracking-tight">Good evening, Michael</div>
              </div>
              <div className="relative flex-shrink-0">
                <span className="absolute -inset-[2px] rounded-full" style={{ background: 'conic-gradient(from 180deg, #818CF8, #6366F1, #EC4899, #818CF8)' }} />
                <img src="/team/michael-orizu.jpg" alt="" className="relative w-8 h-8 rounded-full object-cover object-[50%_15%] border-2 border-white" />
              </div>
            </div>

            {/* home status card */}
            <div className="relative rounded-[18px] p-3 overflow-hidden text-white shadow-lg shadow-indigo-900/30"
              style={{ background: 'linear-gradient(150deg, #1E1B4B 0%, #312E81 50%, #4F46E5 115%)' }}>
              <div className="absolute -top-12 -right-10 w-32 h-32 rounded-full blur-2xl bg-indigo-400/45" />
              <div className="absolute -bottom-14 -left-8 w-28 h-28 rounded-full blur-2xl bg-pink-500/25" />
              <div className="relative inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-2 py-0.5 text-[8px] font-semibold">
                <span className="w-1 h-1 rounded-full bg-indigo-200 animate-pulse" /> Live · Sunrise Estate
              </div>
              <div className="relative mt-2.5 flex items-center gap-2.5">
                <div className="relative w-[58px] h-[58px] flex-shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="8" />
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#A5B4FC" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={RING} style={{ strokeDashoffset: RING * (1 - livePasses / passes.length), transition: 'stroke-dashoffset 0.8s cubic-bezier(.22,1,.36,1)' }} />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span key={livePasses} className="about-word-in text-[16px] font-semibold leading-none">{livePasses}</span>
                    <span className="text-[6px] font-semibold uppercase tracking-wider text-indigo-200/80 mt-0.5">live passes</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div key={headline} className="about-feed-in text-[11px] font-semibold leading-snug text-indigo-100">{headline}</div>
                  <div className="text-[8.5px] text-white/60 mt-0.5">Passes stay live until your guest leaves</div>
                </div>
              </div>
              <div className="relative mt-2.5 pt-2 border-t border-white/10 grid grid-cols-3 gap-1">
                {[['Live passes', livePasses], ['Recent guests', passes.length], ['Notices', 2]].map(([l, v]) => (
                  <div key={l}>
                    <div key={`${l}-${v}`} className="about-word-in text-[14px] font-semibold leading-none">{v}</div>
                    <div className="text-[7.5px] text-white/55 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
              <div className="relative mt-2.5 flex items-center gap-2 rounded-xl px-2 py-1.5 bg-red-500/20 border border-red-400/35">
                <span className="relative w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="absolute inset-0 rounded-lg bg-red-500 animate-ping opacity-40" />
                  <Siren size={11} className="relative text-white" />
                </span>
                <div className="flex-1 min-w-0 leading-tight">
                  <div className="text-[9.5px] font-semibold">Emergency SOS</div>
                  <div className="text-[7.5px] text-red-100/75 truncate">Alerts security and management</div>
                </div>
                <span className="text-[7.5px] font-bold tracking-wider bg-red-500 rounded-md px-1.5 py-0.5">SOS</span>
              </div>
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-4 gap-1.5">
              {QUICK.map(q => (
                <div key={q.label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-[14px] flex items-center justify-center border" style={{ background: `linear-gradient(145deg, ${q.color}1A, ${q.color}08)`, borderColor: `${q.color}2E` }}>
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${q.color}, ${q.color}D9)` }}>
                      <q.icon size={12} className="text-white" />
                    </div>
                  </div>
                  <span className="text-[8.5px] font-medium text-slate-600">{q.label}</span>
                </div>
              ))}
            </div>

            {/* live activity */}
            <div className="min-h-0">
              <div className="flex items-end justify-between mb-1.5">
                <div className="text-[11px] font-semibold text-slate-900 tracking-tight">Live activity</div>
                <span className="text-[8.5px] font-semibold text-indigo-600">My passes ↗</span>
              </div>
              <div className="relative rounded-[14px] bg-white border border-slate-200/70 p-1">
                <span className="absolute left-[19px] top-4 bottom-4 w-px bg-slate-200" />
                {activity.map((f) => (
                  <div key={f.key} className="about-feed-in relative flex items-center gap-2 px-1.5 py-1.5 rounded-xl" style={f.urgent ? { background: 'rgba(239,68,68,0.06)' } : undefined}>
                    <span className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ring-[3px] ring-white" style={{ background: `${f.color}1F` }}>
                      <f.icon size={11} style={{ color: f.color }} />
                    </span>
                    <div className="flex-1 min-w-0 leading-tight">
                      <div className={`text-[10px] font-semibold truncate ${f.urgent ? 'text-red-700' : 'text-slate-900'}`}>{f.title}</div>
                      <div className="text-[8.5px] text-slate-500 truncate">{f.sub}</div>
                    </div>
                    <span className="text-[8px] text-slate-400 flex-shrink-0">{f.when}</span>
                  </div>
                ))}
              </div>
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
