import { useEffect, useState } from 'react';
import {
  Bell, Phone, Signal, BatteryFull, Home as HomeIcon, UserPlus, CreditCard, MessagesSquare, LayoutGrid,
  ChevronLeft, Check, MapPin, Eye, EyeOff, RefreshCw, Receipt, Clock, HelpCircle, Wallet, Lock,
  ShoppingBag, Search, Heart, ShieldCheck, Shield, Mic, PhoneOff, Plus, Images, Send, MessageCircle,
  MoreHorizontal, TrendingUp, LayoutDashboard, Users, UserCheck, Settings, UsersRound, LogIn, Sparkles,
  Megaphone, Siren, ChevronRight, Hand, Zap,
} from 'lucide-react';

// Phone mockups for each Features section, built from the real screens in
// residents-mobile (AreaMates) and estatemanager (Admin, mobile layout).

function useTick(ms = 2600) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN(x => x + 1), ms);
    return () => clearInterval(t);
  }, [ms]);
  return n;
}

const MATES_TABS = [[HomeIcon, 'Home'], [UserPlus, 'Visitors'], [CreditCard, 'Payments'], [MessagesSquare, 'Chat'], [LayoutGrid, 'Menu']];
const ADMIN_TABS = [[LayoutDashboard, 'Home'], [UserCheck, 'Visitors'], [Users, 'Residents'], [Bell, 'Alerts'], [Settings, 'Settings']];

// Device frame. `bar` is the app's top bar; `tab` (index) shows bottom tabs, omit for stack screens.
function Device({ children, bar, tab, admin = false, glow, statusDark = false, bg = '#F8FAFC' }) {
  const tabs = admin ? ADMIN_TABS : MATES_TABS;
  const accent = admin ? '#10B981' : '#6366F1';
  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute -inset-4 blur-3xl rounded-full opacity-80" style={{ background: glow || 'radial-gradient(circle, rgba(99,102,241,.35), rgba(16,185,129,.15))' }} />
      <div className="relative rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/25">
        <div className="relative rounded-[2.1rem] overflow-hidden h-[560px] flex flex-col" style={{ background: bg }}>
          <div className={`h-9 flex items-center justify-between px-6 text-[10px] font-semibold flex-shrink-0 relative z-10 ${statusDark ? 'text-white' : 'text-slate-900'}`}>
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>
          {bar}
          <div className="flex-1 overflow-hidden relative">{children}</div>
          {tab !== undefined && (
            <div className="h-14 bg-white border-t border-[#E2E8F0] grid grid-cols-5 flex-shrink-0">
              {tabs.map(([I, l], i) => (
                <div key={l} className="flex flex-col items-center justify-center gap-0.5">
                  <div className="relative">
                    <I size={16} style={{ color: i === tab ? accent : '#94A3B8' }} />
                    {i === tab && <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full" style={{ background: accent }} />}
                  </div>
                  <span className="text-[8px] font-semibold" style={{ color: i === tab ? accent : '#94A3B8' }}>{l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MatesTopBar() {
  return (
    <div className="h-12 bg-white border-b border-[#E2E8F0] flex items-center gap-2 px-3.5 flex-shrink-0">
      <img src="/apps/areamates.png" alt="AreaMates" className="w-7 h-7 rounded-lg" />
      <div className="flex-1 min-w-0 leading-tight">
        <div className="text-[13px] font-bold text-slate-900 tracking-tight">Area<span className="text-[#6366F1]">Mates</span></div>
        <div className="text-[9px] text-[#94A3B8] font-medium truncate">Sunrise Estate, Lekki</div>
      </div>
      <Phone size={15} className="text-[#64748B] mx-1" />
      <Bell size={15} className="text-[#64748B]" />
    </div>
  );
}

/* ── 1. Visitors — pass detail (app/visitor/[id].jsx) ──────────────────── */
const QR = Array.from({ length: 121 }, (_, i) => ((i * 37 + (i % 7) * 11) % 5) < 2);
const finder = (i) => { const r = Math.floor(i / 11), c = i % 11; return (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3); };

function VisitorsPhone() {
  const n = useTick(1000);
  const phase = n % 10;            // 0-5 counting down, 6-9 checked in
  const arrived = phase >= 6;
  const secs = 64 - phase * 7;
  return (
    <Device statusDark bg="#F8FAFC" glow="radial-gradient(circle, rgba(91,79,233,.4), rgba(124,58,237,.15))">
      <div className="absolute inset-x-0 -top-9 h-[180px] bg-[#5B4FE9] overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#7C3AED] opacity-55" />
      </div>
      <div className="relative px-3.5 pt-1">
        <div className="flex items-center justify-between text-white">
          <ChevronLeft size={18} />
          <span key={arrived ? 'in' : 'act'} className="about-feed-in inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[8px] font-bold tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: arrived ? '#6EE7B7' : '#FCD34D' }} />{arrived ? 'CHECKED IN' : 'ACTIVE'}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-white">
          <div className="relative w-12 h-12 rounded-[14px] bg-white/20 flex items-center justify-center text-[15px] font-extrabold">
            TA<span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#6366F1] border-2 border-[#5B4FE9]" />
          </div>
          <div className="min-w-0">
            <div className="text-[16px] font-extrabold leading-tight">Tunde Adeyemi</div>
            <div className="text-[9px] text-white/80">Friend · Tue 20 Oct, 6:30 PM</div>
            <span className="mt-1 inline-block rounded bg-[#FCD34D] text-[#78350F] text-[7px] font-extrabold px-1.5 py-0.5">⚡ INSTANT PASS</span>
          </div>
        </div>
      </div>

      <div className="relative mx-3 mt-3 rounded-[20px] bg-white shadow-xl shadow-indigo-900/10 overflow-hidden">
        <div className="pt-3 text-center">
          <div className="text-[8px] font-bold tracking-[0.16em] text-[#94A3B8]">SHOW THIS AT THE GATE</div>
          <div className="font-mono text-[26px] font-black tracking-[0.2em] text-[#6366F1] mt-0.5">482913</div>
        </div>
        <div className="relative my-2.5 border-t-2 border-dashed border-slate-200">
          <span className="absolute -left-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#F8FAFC]" />
          <span className="absolute -right-2.5 -top-2.5 w-5 h-5 rounded-full bg-[#F8FAFC]" />
        </div>
        <div className="relative mx-auto w-[108px] h-[108px] rounded-xl border border-slate-200 p-2">
          <div className="grid grid-cols-11 gap-[1.5px] w-full h-full">
            {QR.map((on, i) => <span key={i} className={`rounded-[1px] ${finder(i) || on ? 'bg-slate-900' : ''}`} />)}
          </div>
        </div>
        <div className="text-center text-[8px] text-[#94A3B8] mt-1.5 mb-3">Guards scan the QR or type the code</div>
      </div>

      <div className="mx-3 mt-2.5">
        {arrived ? (
          <div key="arr" className="about-feed-in rounded-[12px] bg-[#ECFDF5] border border-[#BBF7D0] px-3 py-2">
            <div className="text-[8px] font-bold tracking-wider text-[#047857]">ARRIVED</div>
            <div className="text-[12px] font-bold text-[#065F46]">Checked in at 6:28 PM</div>
          </div>
        ) : (
          <div key="cd" className="rounded-[12px] bg-[#6366F1]/[0.06] px-3 py-2">
            <div className="text-[8px] font-bold tracking-wider text-[#6366F1]">ARRIVES IN</div>
            <div className="text-[16px] font-extrabold text-slate-900 tabular-nums">0m {String(Math.max(secs, 0)).padStart(2, '0')}s</div>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#E2E8F0] p-2.5 space-y-1.5">
        <div className={`h-9 rounded-xl bg-[#1FAF5A] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 ${phase === 1 ? 'scale-95' : ''} transition-transform`}>
          <Send size={12} /> Share pass on WhatsApp
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="h-8 rounded-xl bg-[#FEF2F2] text-[#DC2626] text-[10px] font-bold flex items-center justify-center">Cancel pass</div>
          <div className="h-8 rounded-xl bg-white border border-[#E2E8F0] text-slate-700 text-[10px] font-bold flex items-center justify-center gap-1"><Phone size={10} /> Call visitor</div>
        </div>
      </div>
    </Device>
  );
}

/* ── 2. Safety (app/safety.jsx) ────────────────────────────────────────── */
function SafetyPhone() {
  const n = useTick(2600);
  const sharing = n % 3 !== 0;
  return (
    <Device glow="radial-gradient(circle, rgba(185,28,28,.35), rgba(99,102,241,.15))">
      <div className="px-3.5 pt-1">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-8 h-8 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center"><ChevronLeft size={15} className="text-slate-700" /></span>
          <span className="text-[17px] font-extrabold text-slate-900">Personal safety</span>
        </div>

        <div className="relative rounded-[20px] bg-[#B91C1C] p-3.5 overflow-hidden text-white">
          <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-[#7F1D1D]/60" />
          <div className="relative text-[9px] font-semibold text-[#FECACA]">⚠ Personal safety</div>
          <div className="relative text-[14px] font-extrabold leading-tight mt-1">Feeling unsafe or being followed?</div>
          <div className="relative text-[9px] text-white/80 mt-1 leading-snug">Security and your estate manager are alerted instantly with your location. Nobody else is told.</div>
          <div className={`relative mt-2.5 h-9 rounded-[14px] bg-white text-[#B91C1C] text-[11px] font-black flex items-center justify-center gap-1.5 ${n % 3 === 1 ? 'scale-95' : ''} transition-transform`}>
            <Siren size={13} /> I'm being followed
          </div>
        </div>

        <div className="mt-2.5 rounded-[18px] bg-white border border-[#E2E8F0] p-3">
          <div className="flex items-start gap-2.5">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500"
              style={sharing ? { background: '#FEF2F2', color: '#DC2626' } : { background: '#F1F5F9', color: '#64748B' }}>
              <MapPin size={15} />
            </span>
            <div className="min-w-0">
              <div className="text-[11px] font-bold text-slate-900">Share live location with security</div>
              <div key={sharing ? 's' : 'o'} className="about-feed-in text-[9px] text-[#64748B] leading-snug mt-0.5">
                {sharing ? 'Sharing since 9:41 PM · Stops automatically after 1 hour.' : 'Security can follow you home on the map.'}
              </div>
            </div>
          </div>
          <div className={`mt-2.5 h-8 rounded-xl text-[10px] font-bold flex items-center justify-center transition-colors duration-500 ${sharing ? 'bg-[#F1F5F9] text-[#334155]' : 'bg-[#6366F1] text-white'}`}>
            {sharing ? 'Stop sharing' : 'Start sharing my location'}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between px-0.5">
          <span className="text-[9px] font-extrabold tracking-wider text-[#94A3B8]">BLOCKED FOR MY SAFETY</span>
          <span className="text-[9px] font-bold text-[#DC2626]">Block someone</span>
        </div>
        <div className="mt-1.5 rounded-[16px] bg-white border border-[#E2E8F0] p-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-[9px] font-bold flex items-center justify-center">KB</div>
            <div className="flex-1 min-w-0"><div className="text-[10px] font-semibold text-slate-900">Kunle B.</div><div className="text-[8px] text-[#94A3B8]">B4 · blocked Oct 12</div></div>
            <span className="rounded-full bg-slate-100 text-slate-600 text-[8px] font-semibold px-2 py-0.5">Unblock</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-full bg-[#FFFBEB] text-[#B45309] text-[8px] font-semibold px-2 py-0.5">2 blocked contact attempts</span>
            <span className="rounded-full bg-[#EEF2FF] text-[#4338CA] text-[8px] font-semibold px-2 py-0.5">👁 Gate watch on</span>
          </div>
        </div>
      </div>
    </Device>
  );
}

/* ── 3. Calls (components/calls/CallOverlay.jsx) ───────────────────────── */
function CallsPhone() {
  const n = useTick(1000);
  const t = n % 10;              // 0-3 incoming, 4-9 in call
  const inCall = t >= 4;
  const secs = inCall ? t - 3 : 0;
  return (
    <Device statusDark bg="#312E81" glow="radial-gradient(circle, rgba(67,56,202,.45), rgba(14,165,233,.15))">
      <div className="absolute -top-20 -left-16 w-56 h-56 rounded-full bg-[#1E1B4B] blur-2xl" />
      <div className="absolute -bottom-20 -right-16 w-56 h-56 rounded-full bg-[#4338CA] blur-2xl" />
      <div className="relative h-full flex flex-col items-center pt-6 text-white">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/20 text-[#A7F3D0] text-[8px] font-bold tracking-wider px-2.5 py-1">
          <Shield size={9} /> FREE CALL
        </span>
        <div className="relative mt-10">
          {!inCall && <><span className="absolute -inset-3 rounded-full border-2 border-white/40 home-ring" /><span className="absolute -inset-7 rounded-full border border-white/15 home-ring" style={{ animationDelay: '.5s' }} /></>}
          <div className="relative w-24 h-24 rounded-full bg-[#F59E0B] border-4 border-white/80 flex items-center justify-center"><Shield size={34} /></div>
        </div>
        <div className="mt-5 text-[19px] font-bold">Main Gate</div>
        <div className="text-[10px] text-[#C7D2FE]">Security · Gate</div>
        <div key={inCall ? 'c' : 'r'} className="about-feed-in mt-2 text-[12px] font-semibold text-white/90 tabular-nums">
          {inCall ? `0:0${secs}` : 'Security calling'}
        </div>
        {inCall && <div className="about-feed-in text-[9px] text-white/50 mt-0.5">Direct connection</div>}

        <div className="mt-auto mb-10 flex items-start gap-14">
          {inCall ? (
            <>
              <div className="flex flex-col items-center gap-1.5"><span className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center"><Mic size={20} /></span><span className="text-[9px] text-white/70">Mute</span></div>
              <div className="flex flex-col items-center gap-1.5"><span className="w-14 h-14 rounded-full bg-[#EF4444] flex items-center justify-center shadow-lg shadow-red-500/40"><PhoneOff size={20} /></span><span className="text-[9px] text-white/70">End</span></div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-1.5"><span className="w-14 h-14 rounded-full bg-[#EF4444] flex items-center justify-center"><PhoneOff size={20} /></span><span className="text-[9px] text-white/70">Decline</span></div>
              <div className="flex flex-col items-center gap-1.5"><span className={`w-14 h-14 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg shadow-emerald-500/40 ${t === 3 ? 'scale-90' : 'animate-pulse'} transition-transform`}><Phone size={20} /></span><span className="text-[9px] text-white/70">Accept</span></div>
            </>
          )}
        </div>
      </div>
    </Device>
  );
}

/* ── 4. Payments tab (app/(tabs)/payments.jsx) ─────────────────────────── */
function PaymentsPhone() {
  const n = useTick(2600);
  const paid = n % 3 === 2;
  return (
    <Device bar={<MatesTopBar />} tab={2} glow="radial-gradient(circle, rgba(67,56,202,.35), rgba(245,158,11,.18))">
      <div className="px-3 pt-2.5">
        <div className="text-[15px] font-extrabold text-slate-900 mb-2">Payments</div>
        <div className="relative rounded-[20px] bg-[#4338CA] p-3.5 overflow-hidden text-white">
          <div className="absolute -top-12 -right-10 w-36 h-36 rounded-full bg-[#818CF8]/40" />
          <div className="relative flex items-center justify-between text-[9px] text-white/80">
            <span className="flex items-center gap-1">Amount due <Eye size={10} /></span>
            <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center"><RefreshCw size={9} /></span>
          </div>
          <div key={paid ? 'p' : 'd'} className="relative about-word-in text-[26px] font-black tracking-tight leading-tight">{paid ? '₦15,000' : '₦45,000'}</div>
          <div className="relative text-[9px] text-white/80">{paid ? '1 bill to pay' : '2 bills to pay'} · <span className="text-[#FECACA]">1 overdue · ₦15,000</span></div>
          {!paid && (
            <div className="relative mt-2.5 rounded-[14px] bg-white/[0.12] p-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center"><Shield size={11} /></span>
              <div className="flex-1 min-w-0"><div className="text-[9px] font-semibold truncate">Security Dues</div><div className="text-[8px] text-white/70">Due Oct 31 · ₦30,000</div></div>
              <span className={`rounded-full bg-white text-[#4338CA] text-[9px] font-bold px-2.5 py-1 ${n % 3 === 1 ? 'scale-90' : ''} transition-transform`}>Pay</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1.5 mt-2.5">
          {[[Wallet, 'Pay now', true], [Receipt, 'My bills'], [Clock, 'History'], [HelpCircle, 'Help']].map(([I, l, on]) => (
            <div key={l} className="flex flex-col items-center gap-1">
              <span className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${on ? 'bg-[#6366F1] text-white' : 'bg-white border border-[#E2E8F0] text-slate-600'}`}><I size={15} /></span>
              <span className="text-[8px] font-semibold text-slate-600">{l}</span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 rounded-[12px] bg-[#F1F5F9] p-0.5 grid grid-cols-2 text-[9px] font-semibold">
          <span className="rounded-[10px] bg-white text-slate-900 py-1 text-center shadow-sm">My bills <span className="ml-0.5 rounded-full bg-[#FEF2F2] text-[#DC2626] px-1">{paid ? 1 : 2}</span></span>
          <span className="text-[#64748B] py-1 text-center">History</span>
        </div>

        <div className="mt-2 space-y-2">
          {!paid && (
            <div key="sec" className="about-feed-in rounded-[16px] bg-white border border-[#E2E8F0] p-2.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center"><Shield size={13} /></span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-900">Security Dues</span><span className="text-[10px] font-bold text-slate-900">₦30,000</span></div>
                  <div className="text-[8px] text-[#64748B]">Due Oct 31, 2026 <span className="ml-1 rounded-full bg-[#FFFBEB] text-[#B45309] px-1.5 font-semibold">Due</span></div>
                </div>
              </div>
            </div>
          )}
          <div className="rounded-[16px] bg-white border border-[#FECACA] p-2.5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-[#FFFBEB] text-[#D97706] flex items-center justify-center"><Wallet size={13} /></span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between"><span className="text-[10px] font-bold text-slate-900">Maintenance</span><span className="text-[10px] font-bold text-slate-900">₦15,000</span></div>
                <div className="text-[8px] text-[#64748B]">Due Oct 15, 2026 <span className="ml-1 rounded-full bg-[#FEF2F2] text-[#DC2626] px-1.5 font-semibold">Overdue</span></div>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1.4fr] gap-1.5 mt-2">
              <span className="h-7 rounded-lg bg-[#F1F5F9] text-slate-600 text-[9px] font-semibold flex items-center justify-center">Invoice</span>
              <span className="h-7 rounded-lg bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center gap-1"><Lock size={9} /> Pay ₦15,000</span>
            </div>
          </div>
          {paid && (
            <div key="ok" className="about-feed-in rounded-[16px] bg-[#ECFDF5] border border-[#BBF7D0] p-2.5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center"><Check size={13} strokeWidth={3} /></span>
              <div className="flex-1"><div className="text-[10px] font-bold text-[#065F46]">Security Dues paid</div><div className="text-[8px] text-[#047857]">Receipt ready · Paystack</div></div>
              <Receipt size={13} className="text-[#047857]" />
            </div>
          )}
        </div>
      </div>
    </Device>
  );
}

/* ── 5. Marketplace tab (app/(tabs)/marketplace.jsx) ───────────────────── */
const LISTINGS = [
  ['₦8,500', 'Jollof rice party pot', 'Amaka', '🍛', '#FEF3C7', true],
  ['₦15,000', 'AC repair & servicing', 'Kelechi', '❄️', '#DBEAFE', false],
  ['₦35,000', 'Study desk, like new', 'Tunde', '🪑', '#DCFCE7', false],
  ['₦5,000', 'JAMB maths lessons', 'Hauwa', '📚', '#EDE9FE', false],
];

function MarketplacePhone() {
  const n = useTick(1800);
  const liked = n % 4 >= 2;
  return (
    <Device bar={null} tab={4} statusDark bg="#F8FAFC" glow="radial-gradient(circle, rgba(91,79,233,.35), rgba(249,115,22,.2))">
      <div className="absolute inset-x-0 -top-9 h-[170px] bg-[#5B4FE9] overflow-hidden">
        <div className="absolute -top-8 -right-10 w-36 h-36 rounded-full bg-[#7C3AED]" />
        <div className="absolute -bottom-12 -left-10 w-36 h-36 rounded-full bg-[#4F46E5]" />
      </div>
      <div className="relative px-3 pt-1 text-white">
        <div className="flex items-center gap-1.5"><ShoppingBag size={15} /><span className="text-[16px] font-extrabold">Marketplace</span></div>
        <div className="text-[8px] text-[#E0E7FF] mt-0.5">🛡 Neighbours only · protected by estate management</div>
        <div className="mt-2 h-8 rounded-[12px] bg-white flex items-center gap-1.5 px-2.5 text-[9px] text-[#94A3B8]"><Search size={11} /> Search food, services, items…</div>
        <div className="mt-2 rounded-[12px] bg-white/15 p-0.5 grid grid-cols-4 text-[8.5px] font-semibold">
          {['Browse', 'Orders', 'Selling', 'Saved'].map((t, i) => (
            <span key={t} className={`rounded-[10px] py-1 text-center ${i === 0 ? 'bg-white text-[#4338CA]' : 'text-white/85'}`}>{t}</span>
          ))}
        </div>
      </div>
      <div className="relative px-3 mt-3">
        <div className="flex gap-1.5 overflow-hidden">
          {['✨ All', '🍲 Food', '🔧 Services', '💡 Skills'].map((c, i) => (
            <span key={c} className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${i === 0 ? 'bg-[#0F172A] text-white' : 'bg-white border border-[#E2E8F0] text-slate-600'}`}>{c}</span>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-[#64748B] mt-2 mb-1.5"><span>24 listings</span><span>Newest</span></div>
        <div className="grid grid-cols-2 gap-2">
          {LISTINGS.map(([p, t, s, e, bg, drop], i) => (
            <div key={t}>
              <div className="relative aspect-square rounded-[14px] flex items-center justify-center text-3xl" style={{ background: bg }}>
                {e}
                <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Heart size={10} className={i === 0 && liked ? 'text-[#ED4956]' : 'text-slate-400'} fill={i === 0 && liked ? '#ED4956' : 'none'} />
                </span>
                {drop && <span className="absolute top-1.5 left-1.5 rounded-full bg-[#10B981] text-white text-[7px] font-bold px-1.5 py-0.5">Price drop</span>}
              </div>
              <div className="mt-1 text-[11px] font-extrabold text-slate-900">{p}</div>
              <div className="text-[9px] text-slate-600 leading-tight truncate">{t}</div>
              <div className="text-[8px] text-[#94A3B8]">{s}</div>
            </div>
          ))}
        </div>
      </div>
      <span className="absolute bottom-3 right-3 rounded-full bg-[#4F46E5] text-white text-[10px] font-bold px-3 py-1.5 shadow-lg shadow-indigo-500/40 flex items-center gap-1"><Plus size={11} strokeWidth={3} /> Sell</span>
      <div key={Math.floor(n / 4)} className="absolute left-3 right-3 bottom-12 home-banner rounded-[14px] bg-white border border-[#E2E8F0] shadow-xl p-2.5" style={{ animationDuration: '7.2s' }}>
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#F0F9FF] text-[#0369A1] text-[8px] font-semibold px-2 py-0.5">Delivered · confirm receipt</span>
          <span className="text-[10px] font-bold text-slate-900">₦8,500</span>
        </div>
        <div className="grid grid-cols-3 gap-1 mt-2">
          {['Paid', 'Delivered', 'Done'].map((s, i) => (
            <div key={s}><div className={`h-1 rounded-full ${i < 2 ? 'bg-[#6366F1]' : 'bg-[#E2E8F0]'}`} /><div className="text-[7px] text-[#64748B] mt-0.5">{s}</div></div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5">
          <span className="flex-1 h-6 rounded-lg bg-[#6366F1] text-white text-[9px] font-bold flex items-center justify-center">I got it</span>
          <span className="h-6 px-2.5 rounded-lg border border-[#FECACA] text-[#DC2626] text-[9px] font-bold flex items-center justify-center">Problem</span>
        </div>
      </div>
    </Device>
  );
}

/* ── 6. Lounge (app/lounge.jsx) ────────────────────────────────────────── */
function LoungePhone() {
  const n = useTick(1800);
  const liked = n % 4 >= 1;
  const likes = liked ? 13 : 12;
  const voted = n % 4 >= 2;
  return (
    <Device glow="radial-gradient(circle, rgba(99,102,241,.35), rgba(236,72,153,.2))" bg="#FFFFFF">
      <div className="bg-white px-3 pt-1 pb-2 flex items-center gap-1.5">
        <ChevronLeft size={16} className="text-slate-700" />
        <span className="text-[19px] font-black text-[#4F46E5] flex-1">Lounge</span>
        <span className="rounded-full bg-[#F1F5F9] text-slate-600 text-[8px] font-semibold px-2 py-1">🎉 Fri night in 2d 04:12</span>
      </div>
      <div className="flex gap-1.5 px-3 pb-2 overflow-hidden">
        {['Feed', 'Events', 'Activities', 'Polls', 'Music'].map((t, i) => (
          <span key={t} className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${i === 0 ? 'bg-[#6366F1] text-white' : 'bg-[#F1F5F9] text-slate-600'}`}>{t}</span>
        ))}
      </div>
      <div className="flex gap-2.5 px-3 pb-2 overflow-hidden border-b border-slate-100">
        {[['Your story', '#312E81', true], ['Amaka', '#EC4899'], ['Kelechi', '#F59E0B'], ['Hauwa', '#10B981'], ['Femi', '#3B82F6']].map(([name, c, me], i) => (
          <div key={name} className="flex flex-col items-center gap-0.5 flex-shrink-0">
            <div className={`relative w-11 h-11 rounded-full p-[2px] transition-transform duration-300 ${i === (n % 4) + 1 ? 'scale-110' : ''}`}
              style={{ background: me ? '#E2E8F0' : 'linear-gradient(45deg,#F59E0B,#EC4899,#8B5CF6)' }}>
              <div className="w-full h-full rounded-full bg-white p-[2px]"><div className="w-full h-full rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: me ? '#6366F1' : c }}>{name[0]}</div></div>
              {me && <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#312E81] border-2 border-white text-white flex items-center justify-center"><Plus size={8} strokeWidth={3} /></span>}
            </div>
            <span className="text-[7.5px] text-slate-500">{name}</span>
          </div>
        ))}
      </div>
      <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-100">
        <div className="w-6 h-6 rounded-full bg-[#6366F1] text-white text-[9px] font-bold flex items-center justify-center">A</div>
        <span className="flex-1 rounded-full bg-[#F1F5F9] text-[9px] text-[#94A3B8] px-2.5 py-1.5">What's happening, Ada?</span>
        <Images size={14} className="text-[#6366F1]" />
      </div>
      <div>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-7 h-7 rounded-full bg-[#EC4899] text-white text-[10px] font-bold flex items-center justify-center">A</div>
          <div className="flex-1"><div className="text-[10px] font-bold text-slate-900">Amaka E.</div><div className="text-[8px] text-[#94A3B8]">Resident · 2h</div></div>
          <MoreHorizontal size={13} className="text-slate-400" />
        </div>
        <div className="relative h-[120px] bg-[#4F46E5] overflow-hidden flex items-center justify-center px-5 text-center">
          <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#7C3AED]" />
          <span className="relative text-white text-[12px] font-bold leading-snug">Friday night FunTimes at the clubhouse 🎉 who’s coming?</span>
        </div>
        <div className="flex items-center gap-3 px-3 pt-2">
          <Heart size={15} className={liked ? 'text-[#ED4956]' : 'text-slate-800'} fill={liked ? '#ED4956' : 'none'} />
          <MessageCircle size={15} className="text-slate-800" /><Send size={14} className="text-slate-800" />
        </div>
        <div className="px-3 pt-1 text-[9px] font-bold text-slate-900"><span key={likes} className="about-word-in inline-block">{likes}</span> likes</div>
        <div className="px-3 text-[9px] text-[#94A3B8]">View all 3 comments</div>
      </div>
      <div className="mx-3 mt-2 rounded-[14px] border border-[#E2E8F0] p-2.5">
        <div className="text-[8px] font-extrabold tracking-wider text-[#94A3B8]">ACTIVE POLLS</div>
        <div className="text-[10px] font-bold text-slate-900 mt-0.5 mb-1.5">Extend generator hours?</div>
        {[['Yes', 71, true], ['No', 29, false]].map(([l, v, lead]) => (
          <div key={l} className="relative h-6 rounded-lg border mb-1 overflow-hidden" style={{ borderColor: voted && lead ? '#BBF7D0' : '#E2E8F0' }}>
            <div className="absolute inset-y-0 left-0 transition-[width] duration-700" style={{ width: voted ? `${v}%` : '0%', background: lead ? 'rgba(16,185,129,.12)' : 'rgba(99,102,241,.06)' }} />
            <div className="relative h-full flex items-center justify-between px-2 text-[9px] font-semibold">
              <span className="text-slate-800">{l}</span>
              {voted && <span className="flex items-center gap-0.5" style={{ color: lead ? '#10B981' : '#64748B' }}>{lead && <TrendingUp size={9} />}{v}%</span>}
            </div>
          </div>
        ))}
      </div>
    </Device>
  );
}

/* ── 7. Admin on mobile (estatemanager Dashboard) ──────────────────────── */
function AdminPhone() {
  const n = useTick(2600);
  const inside = 7 + (n % 3);
  const alert = n % 4 === 3;
  return (
    <Device admin tab={0} glow="radial-gradient(circle, rgba(16,185,129,.35), rgba(14,165,233,.15))"
      bar={
        <div className="h-12 bg-white border-b border-[#E2E8F0] flex items-center gap-2 px-3.5 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-[8px] font-extrabold text-white">AC</div>
          <div className="flex-1 min-w-0 leading-tight">
            <div className="text-[13px] font-semibold text-[#0F172A]">Area<span className="text-[#10B981]">Connect</span></div>
            <div className="text-[9px] text-[#94A3B8] truncate">Sunrise Estate ▾</div>
          </div>
          <Phone size={14} className="text-[#64748B]" /><Bell size={14} className="text-[#64748B] mx-1.5" /><LayoutGrid size={14} className="text-[#64748B]" />
        </div>
      }>
      <div className="px-3 pt-3">
        <div className="relative rounded-[18px] p-3.5 overflow-hidden text-white shadow-lg shadow-emerald-700/25" style={{ background: 'linear-gradient(135deg,#059669,#047857)' }}>
          <div className="absolute -top-10 -right-6 w-32 h-32 rounded-full bg-[#34D399]/40 blur-2xl" />
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative flex items-center gap-1.5 mb-2">
            <span className="rounded-full bg-white/[0.18] border border-white/25 px-1.5 py-0.5 text-[8px] font-bold tracking-wider">● LIVE</span>
            <span className="rounded-full bg-white/[0.18] border border-white/25 px-1.5 py-0.5 text-[8px] font-semibold">Tue, Oct 20</span>
          </div>
          <div className="relative text-[15px] font-black tracking-tight">Good evening, Michael 👋</div>
          <div className="relative flex items-center gap-1 text-[9px] font-semibold text-white/85 mb-2.5"><Sparkles size={9} className="text-[#A7F3D0]" /> Sunrise Estate</div>
          <div className="relative grid grid-cols-2 gap-1.5">
            {[[UsersRound, 248, 'Residents'], [UserCheck, 12, 'Visitors Today'], [LogIn, inside, 'Inside Now'], [Bell, alert ? 1 : 0, 'Open Alerts']].map(([I, v, l]) => {
              const red = l === 'Open Alerts' && v > 0;
              return (
                <div key={l} className="rounded-xl border px-2 py-1.5 flex items-center gap-1.5 transition-colors duration-500"
                  style={{ background: red ? 'rgba(239,68,68,.32)' : 'rgba(255,255,255,.14)', borderColor: 'rgba(255,255,255,.22)' }}>
                  <I size={11} />
                  <span key={`${l}${v}`} className="about-word-in text-[14px] font-black">{v}</span>
                  <span className="text-[8px] text-white/80 truncate">{l}</span>
                </div>
              );
            })}
          </div>
          <div className="relative mt-2.5 h-8 rounded-xl bg-white text-[#047857] text-[10px] font-bold flex items-center justify-center gap-1">
            <Bell size={11} /> Alerts {alert && <span className="rounded-full bg-[#EF4444] text-white text-[8px] px-1.5">1</span>} <ChevronRight size={11} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2.5">
          {[['Residents', 'Manage members', 'from-[#6366F1] to-[#4F46E5]', Users], ['Units', 'View estate', 'from-[#A78BFA] to-[#8B5CF6]', HomeIcon], ['Post Notice', 'Broadcast', 'from-[#F59E0B] to-[#D97706]', Megaphone], ['Alerts', 'Security feed', 'from-[#EF4444] to-[#DC2626]', Siren]].map(([l, d, g, I]) => (
            <div key={l} className="rounded-2xl bg-white border border-slate-900/[0.06] p-2.5 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${g} flex items-center justify-center flex-shrink-0`}><I size={14} className="text-white" /></div>
              <div className="min-w-0 flex-1"><div className="text-[10px] font-bold text-slate-900">{l}</div><div className="text-[8px] text-[#94A3B8]">{d}</div></div>
              <ChevronRight size={10} className="text-slate-300" />
            </div>
          ))}
        </div>
        <div className="mt-2.5 rounded-[14px] bg-white border border-slate-900/[0.08] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-900"><span className="w-4 h-4 rounded-md bg-[#ECFDF5] text-[#059669] flex items-center justify-center"><UserCheck size={8} /></span> Recent Visitors</span>
            <span className="text-[8px] font-semibold text-[#059669]">View all →</span>
          </div>
          {[['Tunde Adeyemi', 'INSIDE NOW', '#ECFDF5', '#047857'], ['Kola Bello', 'EXPECTED', '#EEF2FF', '#4338CA']].map(([nm, st, bg, c]) => (
            <div key={nm} className="flex items-center gap-2 px-3 py-1.5">
              <div className="w-6 h-6 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: bg, color: c }}>{nm.split(' ').map(w => w[0]).join('')}</div>
              <span className="flex-1 text-[9px] font-semibold text-slate-900 truncate">{nm}</span>
              <span className="rounded-full px-1.5 py-0.5 text-[7px] font-bold" style={{ background: bg, color: c }}>{st}</span>
            </div>
          ))}
        </div>
      </div>
    </Device>
  );
}

const PHONES = {
  visitors: VisitorsPhone,
  safety: SafetyPhone,
  calls: CallsPhone,
  payments: PaymentsPhone,
  marketplace: MarketplacePhone,
  community: LoungePhone,
  admin: AdminPhone,
};

export default function FeaturePhone({ id }) {
  const C = PHONES[id];
  return C ? <C /> : null;
}
