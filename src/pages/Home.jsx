import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, Users, Shield, Building2,
  CreditCard, Bell, BarChart2, ChevronDown, Star,
  Zap, Lock, Globe, MapPin, UserCheck, Play, Wifi,
} from 'lucide-react';

/* ─── Scroll-reveal hook ──────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Animated counter ────────────────────────────────────────────────── */
function Counter({ target, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const dur = 2000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

/* ─── FAQ item ────────────────────────────────────────────────────────── */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 bg-white ${open ? 'border-brand-200 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-start justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left">
        <span className="font-semibold text-slate-900 text-sm sm:text-[15px] leading-relaxed">{q}</span>
        <ChevronDown size={16} className={`text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180 text-brand-500' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 sm:px-6 sm:pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

/* ─── Hero Dashboard Mockup (desktop) ────────────────────────────────── */
function HeroDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-5 right-5 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/8 w-full max-w-md mx-auto"
           style={{ background: 'linear-gradient(145deg, #1a2235 0%, #0d1424 100%)' }}>
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
             style={{ background: 'rgba(0,0,0,0.3)' }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-3">
            <div className="rounded-md px-3 py-1 text-[10px] text-slate-500 text-center font-mono"
                 style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              app.areaconnect.pro/dashboard
            </div>
          </div>
        </div>
        {/* Dashboard body */}
        <div className="flex" style={{ height: 330 }}>
          {/* Sidebar */}
          <div className="w-12 flex flex-col items-center py-4 gap-3 flex-shrink-0 border-r"
               style={{ background: 'rgba(0,0,0,0.25)', borderColor: 'rgba(255,255,255,0.05)' }}>
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center mb-1 glow-sm-green">
              <span className="text-white text-[7px] font-black">AC</span>
            </div>
            {[Building2, Users, UserCheck, CreditCard, Bell, BarChart2].map((Icon, i) => (
              <div key={i} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${i === 0 ? 'bg-brand-500/20' : 'hover:bg-white/5'}`}>
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
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { l: 'Residents',    v: '142',   c: 'text-brand-400',  bg: 'rgba(16,185,129,0.08)'  },
                { l: "Today's visits", v: '23',  c: 'text-blue-400',   bg: 'rgba(59,130,246,0.08)'  },
                { l: 'Dues (Nov)',   v: '₦1.2M', c: 'text-amber-400',  bg: 'rgba(245,158,11,0.08)'  },
              ].map(s => (
                <div key={s.l} className="rounded-xl p-2.5"
                     style={{ background: s.bg, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className={`text-[11px] font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[8px] text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-3 mb-3"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Nov Collection</span>
                <span className="text-[9px] font-bold text-brand-400">76%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full shimmer" style={{ width: '76%' }} />
              </div>
              <div className="text-[8px] text-slate-600 mt-1.5">₦2.35M of ₦3.1M · 18 pending</div>
            </div>
            <div className="rounded-xl overflow-hidden"
                 style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-3 py-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-wider border-b"
                   style={{ borderColor: 'rgba(255,255,255,0.05)' }}>Today's visitors</div>
              {[
                { n: 'Chidi Okafor',  u: 'Unit 4B', t: '10:23', s: 'IN',      c: 'bg-brand-500/15 text-brand-400' },
                { n: 'Fatima Bello',  u: 'Unit 2A', t: '11:05', s: 'PENDING', c: 'bg-amber-500/15 text-amber-400' },
                { n: 'Emeka Nwosu',   u: 'Unit 7C', t: '09:44', s: 'OUT',     c: 'bg-slate-500/15 text-slate-400' },
              ].map(v => (
                <div key={v.n} className="flex items-center justify-between px-3 py-1.5 border-b last:border-0"
                     style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
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
      {/* Floating cards — desktop only */}
      <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-2xl p-3 w-44 animate-float border border-slate-100 hidden lg:block z-20">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={10} className="text-white" />
          </div>
          <span className="text-[9px] font-bold text-brand-700 uppercase tracking-wide">Visitor verified</span>
        </div>
        <div className="text-[11px] font-bold text-slate-800">Chidi Okafor</div>
        <div className="text-[9px] text-slate-400 mt-0.5">Gate 1 · just now</div>
      </div>
      <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-2xl p-3 w-48 animate-float-delayed border border-slate-100 hidden lg:block z-20">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CreditCard size={10} className="text-white" />
          </div>
          <span className="text-[9px] font-bold text-indigo-700 uppercase tracking-wide">Payment received</span>
        </div>
        <div className="text-[11px] font-bold text-slate-800">₦75,000 · Unit 4B</div>
        <div className="text-[9px] text-slate-400 mt-0.5">Service charge · Nov</div>
      </div>
      <div className="absolute top-1/3 -left-12 bg-white rounded-2xl shadow-xl p-3 w-40 animate-float-slow border border-slate-100 hidden xl:block z-20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <Users size={9} className="text-white" />
          </div>
          <span className="text-[9px] font-bold text-blue-700 uppercase tracking-wide">New resident</span>
        </div>
        <div className="text-[11px] font-bold text-slate-800">Ngozi Eze joined</div>
        <div className="text-[9px] text-slate-400 mt-0.5">Unit 1D · 2 min ago</div>
      </div>
      <div className="absolute top-3 right-1/4 bg-white rounded-2xl shadow-xl p-3 w-40 animate-float-delayed2 border border-slate-100 hidden xl:block z-20">
        <div className="flex items-center gap-1.5 mb-1">
          <Bell size={10} className="text-amber-500" />
          <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wide">Alert resolved</span>
        </div>
        <div className="text-[10px] text-slate-600">Gate 2 incident cleared</div>
        <div className="text-[9px] text-slate-400 mt-0.5">by Musa · 5 min ago</div>
      </div>
    </div>
  );
}

/* ─── Mobile Hero Visual ──────────────────────────────────────────────── */
function MobileHeroVisual() {
  return (
    <div className="relative mt-10 mx-auto" style={{ maxWidth: 300 }}>
      {/* Ambient glows */}
      <div className="absolute -inset-8 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-48 h-48 bg-brand-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-indigo-500/12 rounded-full blur-3xl" />
      </div>

      {/* Phone shell */}
      <div className="relative mx-auto w-[232px]">
        <div className="relative overflow-hidden shadow-2xl"
             style={{ background: '#0f1117', border: '7px solid #1a1f2e', borderRadius: 40, height: 470 }}>

          {/* Dynamic Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
               style={{ background: '#000', borderRadius: 20, padding: '4px 12px' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            <span className="text-[7px] text-white/50 font-semibold tracking-wide">LIVE</span>
          </div>

          {/* App header */}
          <div className="pt-9 pb-3.5 px-4" style={{ background: 'linear-gradient(160deg, #3730a3 0%, #1e1b4b 100%)' }}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] font-black text-white">AreaMates</div>
                <div className="text-[8px] text-indigo-300">Sunrise Estate, Lekki</div>
              </div>
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                  <Bell size={12} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[6px] text-white font-bold">3</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { e: '🔐', l: 'Visitor', v: '2 active' },
                { e: '💳', l: 'Pay dues', v: 'Nov due' },
                { e: '💬', l: 'Chat', v: '4 unread' },
              ].map(a => (
                <div key={a.l} className="bg-white/10 rounded-2xl p-2 text-center">
                  <div className="text-sm mb-0.5">{a.e}</div>
                  <div className="text-[7px] font-bold text-white">{a.l}</div>
                  <div className="text-[6px] text-white/50 mt-0.5">{a.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="p-3 space-y-2" style={{ background: '#f1f5f9' }}>
            {/* Live visitor card */}
            <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-800">Visitor verified</div>
                  <div className="text-[8px] text-slate-500">Chidi Okafor · Gate 1</div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
                  <span className="text-[7px] font-semibold text-brand-600">Live</span>
                </div>
              </div>
            </div>

            {/* Estate notice */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-2.5">
              <div className="flex items-start gap-1.5">
                <span className="text-sm">📢</span>
                <div>
                  <div className="text-[8px] font-bold text-amber-700 uppercase tracking-wide">Estate Notice</div>
                  <div className="text-[9px] font-semibold text-slate-800">Water off Saturday 8AM–2PM</div>
                  <div className="text-[7px] text-slate-400 mt-0.5">23 min ago</div>
                </div>
              </div>
            </div>

            {/* Payment progress */}
            <div className="bg-white border border-slate-100 rounded-2xl p-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">Nov Dues</span>
                <span className="text-[9px] font-black text-brand-600">76%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full shimmer" style={{ width: '76%' }} />
              </div>
              <div className="text-[7px] text-slate-400 mt-1">₦2.35M of ₦3.1M collected</div>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { v: '142', l: 'Residents', c: 'text-brand-600', bg: '#ecfdf5' },
                { v: '23',  l: 'Visitors',  c: 'text-blue-600',  bg: '#eff6ff' },
                { v: '₦1.2M', l: 'Month',  c: 'text-amber-600', bg: '#fffbeb' },
              ].map(s => (
                <div key={s.l} className="rounded-2xl p-2 text-center" style={{ background: s.bg }}>
                  <div className={`text-[11px] font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[6px] text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom nav */}
          <div className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 flex justify-around items-center px-4 py-2.5">
            {[Building2, Users, Bell, BarChart2].map((Icon, i) => (
              <div key={i} className={`flex flex-col items-center gap-0.5 ${i === 1 ? 'text-brand-500' : 'text-slate-400'}`}>
                <Icon size={14} />
                {i === 1 && <div className="w-1 h-1 rounded-full bg-brand-500" />}
              </div>
            ))}
          </div>
        </div>
        {/* Home indicator bar */}
        <div className="mx-auto mt-1.5 w-16 h-1 rounded-full bg-white/25" />
      </div>

      {/* Floating toast — top right */}
      <div className="absolute top-10 -right-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 animate-float z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 size={8} className="text-white" />
          </div>
          <span className="text-[9px] font-bold text-slate-700">Pass verified</span>
        </div>
        <div className="text-[7px] text-slate-400 mt-0.5 pl-[22px]">just now · Gate 1</div>
      </div>

      {/* Floating toast — bottom left */}
      <div className="absolute bottom-20 -left-10 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 animate-float-delayed z-10">
        <div className="flex items-center gap-1.5">
          <CreditCard size={11} className="text-indigo-500" />
          <span className="text-[9px] font-bold text-slate-700">₦75,000 received</span>
        </div>
        <div className="text-[7px] text-slate-400 mt-0.5">Unit 4B · Nov dues</div>
      </div>

      {/* Social proof pill */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-slate-100 px-4 py-1.5 flex items-center gap-2 whitespace-nowrap z-10">
        <div className="flex -space-x-1.5">
          {['bg-brand-500','bg-indigo-500','bg-blue-500'].map((c, i) => (
            <div key={i} className={`w-4 h-4 rounded-full ${c} border-2 border-white`} />
          ))}
        </div>
        <span className="text-[9px] font-bold text-slate-700">500+ estates live</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} size={7} className="text-amber-400 fill-amber-400" />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Resident App Phone Mockup ───────────────────────────────────────── */
function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      <div className="absolute -inset-8 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl" />
      </div>
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-56 sm:w-60 animate-float-slow"
           style={{ height: 480 }}>
        <div className="bg-indigo-600 px-5 pt-7 pb-5">
          <div className="text-white text-[11px] font-black mb-0.5">Good morning, Adaeze 👋</div>
          <div className="text-indigo-300 text-[9px]">Sunrise Estate, Lekki</div>
          <div className="grid grid-cols-3 gap-1.5 mt-4">
            {[
              { e: '🔐', l: 'Visitor', v: '2 active' },
              { e: '💳', l: 'Pay dues', v: '1 pending' },
              { e: '🔔', l: 'Alerts', v: 'All clear' },
            ].map(a => (
              <div key={a.l} className="bg-white/10 rounded-xl p-2 text-center">
                <div className="text-base mb-0.5">{a.e}</div>
                <div className="text-[8px] font-bold text-white/90">{a.l}</div>
                <div className="text-[7px] text-white/50">{a.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <span className="text-sm">📢</span>
              <div>
                <div className="text-[9px] font-bold text-amber-700">ESTATE NOTICE</div>
                <div className="text-[10px] font-semibold text-slate-800 mt-0.5">Water maintenance Saturday</div>
                <div className="text-[9px] text-slate-400 mt-0.5">8AM – 2PM · 23 min ago</div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-2">MY VISITORS</div>
            {[
              { n: 'Chidi Okafor', t: 'Today, 3PM', s: 'Active' },
              { n: 'Emeka Nwosu',  t: 'Tomorrow',   s: 'Pending' },
            ].map(v => (
              <div key={v.n} className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-0">
                <div>
                  <div className="text-[10px] font-semibold text-slate-700">{v.n}</div>
                  <div className="text-[8px] text-slate-400">{v.t}</div>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${v.s === 'Active' ? 'bg-brand-50 text-brand-600' : 'bg-slate-50 text-slate-500'}`}>
                  {v.s}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm">
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-2">ESTATE CHAT</div>
            {[
              { a: 'TM', msg: "Who knows a good plumber around here?", color: 'bg-violet-400' },
              { a: 'KB', msg: "The pool is open on Saturdays now 🎉",  color: 'bg-blue-400'   },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
                <div className={`w-4 h-4 ${c.color} rounded-full flex items-center justify-center text-[7px] text-white font-bold flex-shrink-0 mt-0.5`}>
                  {c.a}
                </div>
                <div className="text-[9px] text-slate-600 leading-snug">{c.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Guard App Mockup ────────────────────────────────────────────────── */
function GuardMockup() {
  return (
    <div className="relative flex justify-center">
      <div className="absolute -inset-8 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/12 rounded-full blur-3xl" />
      </div>
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden w-52 sm:w-56 animate-float"
           style={{ height: 400 }}>
        <div className="bg-blue-700 px-4 pt-6 pb-4">
          <div className="text-white text-[10px] font-black mb-0.5">AreaConnect Guard</div>
          <div className="text-blue-300 text-[8px]">Gate 1 · Sunrise Estate</div>
        </div>
        <div className="p-3 space-y-3">
          <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center">
            <div className="border-2 border-blue-400 rounded-xl w-20 h-20 flex items-center justify-center mb-2 relative overflow-hidden">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-5 h-5 rounded-sm ${i % 3 === 0 || i === 4 ? 'bg-blue-400' : 'bg-slate-700'}`} />
                ))}
              </div>
              <div className="absolute inset-x-0 h-0.5 bg-blue-400/60 animate-bounce" style={{ top: '40%' }} />
            </div>
            <div className="text-white text-[9px] font-bold">Scanning visitor pass…</div>
          </div>
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 size={12} className="text-brand-500" />
              <span className="text-[9px] font-bold text-brand-700">VERIFIED — ALLOW ENTRY</span>
            </div>
            <div className="text-[11px] font-bold text-slate-800">Chidi Okafor</div>
            <div className="text-[9px] text-slate-500">Visiting Unit 4B · Adaeze Okonkwo</div>
          </div>
          <div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Recent entries</div>
            {[
              { n: 'Fatima Bello', t: '11:05', s: 'IN' },
              { n: 'Emeka Nwosu',  t: '09:44', s: 'OUT' },
            ].map(e => (
              <div key={e.n} className="flex justify-between items-center py-1 border-b border-slate-50">
                <div>
                  <div className="text-[9px] font-semibold text-slate-700">{e.n}</div>
                  <div className="text-[8px] text-slate-400">{e.t}</div>
                </div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${e.s === 'IN' ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-500'}`}>
                  {e.s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Marquee ─────────────────────────────────────────────────────────── */
const ESTATES = [
  'Sunrise Estate, Lekki', 'Meadow Court, Abuja', 'Palm Grove, Port Harcourt',
  'Kings Court, Victoria Island', 'Emerald Gardens, Enugu', 'Royal Palms, Ikeja',
  'Diamond Estate, Warri', 'Green Park, Ibadan', 'Heritage Court, Uyo',
  'Lighthouse Estate, Calabar', 'Riviera Heights, Ikoyi', 'Crescent View, Maiduguri',
  'Oakwood Estate, Jos', 'Blue Ridge, Asaba', 'Hilltop Gardens, Benin City',
];
function Marquee() {
  const items = [...ESTATES, ...ESTATES];
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        {items.map((e, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 text-sm font-medium text-slate-400">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full flex-shrink-0" />
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Testimonial card ────────────────────────────────────────────────── */
function TestimonialCard({ quote, name, role, initials, color, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col h-full shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex gap-1 mb-4 sm:mb-5">
          {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
        </div>
        <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-5 sm:mb-6 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-slate-50">
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
            {initials}
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm">{name}</div>
            <div className="text-xs text-slate-400 mt-0.5">{role}</div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── City dot ────────────────────────────────────────────────────────── */
function City({ name, tag, color, active }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`relative flex-shrink-0 w-2.5 h-2.5 rounded-full ${color}`}>
        {active && <span className={`absolute inset-0 rounded-full ${color} animate-ping-slow opacity-75`} />}
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-800">{name}</div>
        <div className="text-xs text-slate-400">{tag}</div>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#050d1a] flex items-center overflow-hidden noise">
        <div className="absolute pointer-events-none inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] bg-indigo-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-500/5 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 dot-grid opacity-40" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-28 pb-16 lg:py-36 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left copy */}
            <div className="flex-1 max-w-xl text-center lg:text-left z-10 w-full">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 border border-brand-500/30 bg-brand-500/10 rounded-full px-4 py-1.5 mb-6 sm:mb-8 animate-fade-in">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
                <span className="text-brand-400 text-xs font-semibold tracking-wide">Now live across Nigeria</span>
              </div>

              <h1 className="text-[2.6rem] sm:text-5xl lg:text-[68px] font-black text-white leading-[1.05] tracking-tight mb-5 sm:mb-6 animate-fade-in-up">
                Nigeria&apos;s smartest<br />
                <span className="gradient-text-brand">estate platform.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-7 sm:mb-8 animate-fade-in-up max-w-md mx-auto lg:mx-0"
                 style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                One platform connecting estate managers, residents, and security staff. Visitor passes, dues collection, community tools — all out of the box.
              </p>

              {/* CTA buttons — full width on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-7 sm:mb-8 animate-fade-in-up"
                   style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <Link to="/pricing"
                  className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 text-[15px] w-full sm:w-auto">
                  Get started <ArrowRight size={16} />
                </Link>
                <Link to="/features"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/8 text-[15px] w-full sm:w-auto">
                  <Play size={13} className="fill-white/80" /> See how it works
                </Link>
              </div>

              {/* Social proof — wraps cleanly on mobile */}
              <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start animate-fade-in-up"
                   style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                <div className="flex -space-x-2">
                  {[['AO','bg-brand-500'],['BT','bg-indigo-500'],['NK','bg-blue-500'],['FN','bg-violet-500'],['EM','bg-amber-500']].map(([i, c]) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-[#050d1a] flex items-center justify-center text-white text-[9px] font-bold`}>{i}</div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-white font-semibold">500+ estates</span>
                  <span className="text-slate-400"> trust AreaConnect</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>
            </div>

            {/* Desktop dashboard */}
            <div className="flex-1 w-full hidden lg:flex justify-center z-10">
              <HeroDashboard />
            </div>

            {/* Mobile dashboard — compact version */}
            <div className="w-full lg:hidden z-10">
              <MobileHeroVisual />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050d1a] to-transparent pointer-events-none" />
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <div className="bg-[#050d1a] border-t border-white/5 py-5">
        <div className="text-center mb-3">
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Trusted by estates across Nigeria</span>
        </div>
        <Marquee />
      </div>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-16">
              <span className="section-tag mb-4 inline-flex">By the numbers</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Growing across Nigeria</h2>
            </div>
          </Reveal>
          {/* Mobile: horizontal scroll stat strip */}
          <div className="sm:hidden -mx-5 overflow-x-auto hide-scrollbar pb-3">
            <div className="flex gap-3 px-5 w-max">
              {[
                { target: 500,     suffix: '+',  label: 'Active estates',       icon: Building2,  color: 'text-brand-500',  bg: 'bg-brand-50'   },
                { target: 48000,   suffix: '+',  label: 'Residents onboarded',  icon: Users,      color: 'text-indigo-500', bg: 'bg-indigo-50'  },
                { target: 1200000, suffix: '+',  label: 'Visitor passes issued', icon: UserCheck,  color: 'text-blue-500',   bg: 'bg-blue-50'    },
                { target: 2, prefix: '₦', suffix: 'B+', label: 'In dues processed', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((s, i) => (
                <div key={s.label} className="flex-shrink-0 w-36 text-center p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mx-auto mb-2.5`}>
                    <s.icon size={16} className={s.color} />
                  </div>
                  <div className={`text-2xl font-black tracking-tight mb-1 ${s.color}`}>
                    <Counter target={s.target} prefix={s.prefix || ''} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 4-column grid */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { target: 500,     suffix: '+',           label: 'Active estates',       icon: Building2,  color: 'text-brand-500',  bg: 'bg-brand-50'   },
              { target: 48000,   suffix: '+',           label: 'Residents onboarded',  icon: Users,      color: 'text-indigo-500', bg: 'bg-indigo-50'  },
              { target: 1200000, suffix: '+',           label: 'Visitor passes issued', icon: UserCheck,  color: 'text-blue-500',   bg: 'bg-blue-50'    },
              { target: 2, prefix: '₦', suffix: 'B+ collected', label: 'In dues processed', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center p-4 sm:p-6 rounded-2xl border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${s.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <s.icon size={18} className={s.color} />
                  </div>
                  <div className={`text-2xl sm:text-4xl font-black tracking-tight mb-1 ${s.color}`}>
                    <Counter target={s.target} prefix={s.prefix || ''} suffix={s.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium leading-snug">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-tag mb-4 inline-flex">Three apps. One platform.</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">Built for every role in your estate</h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                Purpose-built tools for managers, residents, and security — all connected in real time.
              </p>
            </div>
          </Reveal>
          {/* Mobile: horizontal snap-scroll carousel */}
          <div className="sm:hidden -mx-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
            <div className="flex gap-4 px-5 w-max">
              {[
                {
                  gradient: 'from-brand-600 to-brand-500', shadow: 'shadow-brand-500/30', accent: 'brand',
                  icon: Building2, label: 'AreaConnect Admin', title: 'Estate Manager Portal', href: '/admin',
                  stat: { v: '76%', l: 'Avg dues collected', sub: '₦2.35M of ₦3.1M', bg: 'bg-brand-50', c: 'text-brand-600' },
                  features: ['Resident onboarding & bulk invites', 'Payment scheduling & Paystack wallet', 'Live analytics & collection reports'],
                },
                {
                  gradient: 'from-indigo-600 to-indigo-500', shadow: 'shadow-indigo-500/30', accent: 'indigo',
                  icon: Users, label: 'AreaMates', title: 'Resident App', href: '/mates',
                  stat: { v: '40k+', l: 'Active residents', sub: 'Across 500+ estates', bg: 'bg-indigo-50', c: 'text-indigo-600' },
                  features: ['QR visitor pass — shareable on WhatsApp', 'Pay estate dues via card or transfer', 'Community chat, polls & marketplace'],
                },
                {
                  gradient: 'from-blue-600 to-blue-500', shadow: 'shadow-blue-500/30', accent: 'blue',
                  icon: Shield, label: 'AreaConnect Guard', title: 'Security Staff App', href: '/guard',
                  stat: { v: '<1s', l: 'Avg scan time', sub: '1.2M+ passes scanned', bg: 'bg-blue-50', c: 'text-blue-600' },
                  features: ['QR scanner & 6-digit access code', 'One-tap check-in & check-out logging', 'Offline mode with auto-sync'],
                },
              ].map((p) => (
                <div key={p.label} className="snap-center flex-shrink-0 w-[280px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4 shadow-lg ${p.shadow}`}>
                    <p.icon size={22} className="text-white" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{p.label}</span>
                  <h3 className="text-lg font-black text-slate-900 mb-2">{p.title}</h3>
                  <div className={`${p.stat.bg} rounded-xl p-3 mb-4`}>
                    <div className={`text-xl font-black ${p.stat.c}`}>{p.stat.v}</div>
                    <div className="text-xs font-semibold text-slate-700 mt-0.5">{p.stat.l}</div>
                    <div className="text-[11px] text-slate-500">{p.stat.sub}</div>
                  </div>
                  <ul className="space-y-2 mb-5 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={13} className={`text-${p.accent}-500 flex-shrink-0 mt-0.5`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 group">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {[0,1,2].map(i => (
                <div key={i} className={`h-1.5 rounded-full bg-slate-300 ${i === 0 ? 'w-4' : 'w-1.5'}`} />
              ))}
            </div>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden sm:grid lg:grid-cols-3 gap-5">
            {[
              {
                gradient: 'from-brand-600 to-brand-500',   shadow: 'shadow-brand-500/20',   accent: 'brand',
                label: 'AreaConnect Admin', title: 'Estate Manager Portal', href: '/admin',
                icon: Building2,
                desc: 'The command centre for your estate. Manage residents, collect payments, broadcast notices, and monitor everything from one dashboard.',
                items: ['Resident onboarding & bulk invites', 'Payment scheduling & Paystack wallet', 'Announcements with media attachments', 'Full visitor log & pre-registration', 'Community polls, events & oversight', 'Live analytics & collection reports'],
                mobileHighlight: { v: '76%', l: 'Nov dues collected', sub: '₦2.35M of ₦3.1M', c: 'text-brand-600', bg: 'bg-brand-50' },
              },
              {
                gradient: 'from-indigo-600 to-indigo-500', shadow: 'shadow-indigo-500/20', accent: 'indigo',
                label: 'AreaMates', title: 'Resident App', href: '/mates',
                icon: Users,
                desc: 'Everything residents need. Pre-register visitors, pay dues, chat with neighbours, and stay updated with community life.',
                items: ['QR visitor pass — shareable via WhatsApp', 'Pay estate dues via card or bank transfer', 'Estate-wide & direct community chat', 'Resident marketplace for buying & selling', 'Polls, events, lounge & more', 'Security alert button — one tap'],
                mobileHighlight: { v: '40,000+', l: 'Active residents', sub: 'Across 500+ estates', c: 'text-indigo-600', bg: 'bg-indigo-50' },
              },
              {
                gradient: 'from-blue-600 to-blue-500',     shadow: 'shadow-blue-500/20',   accent: 'blue',
                label: 'AreaConnect Guard', title: 'Security Staff App', href: '/guard',
                icon: Shield,
                desc: 'Fast, focused, reliable. Verify visitors by QR or access code, log all entries, and escalate incidents with one tap.',
                items: ['QR scanner & 6-digit access code lookup', 'One-tap check-in & check-out logging', 'Full entry log — searchable by name, date', 'Blacklist lookup before granting entry', 'Security alert broadcast to all residents', 'Offline mode with auto-sync when back online'],
                mobileHighlight: { v: '<1s', l: 'Avg scan time', sub: '1.2M+ passes scanned', c: 'text-blue-600', bg: 'bg-blue-50' },
              },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-5 shadow-lg ${p.shadow}`}>
                    <p.icon size={22} className="text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{p.label}</span>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{p.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">{p.desc}</p>

                  {/* Mobile: compact stat highlight instead of full mockup */}
                  <div className={`${p.mobileHighlight.bg} rounded-xl p-4 mb-5 lg:hidden`}>
                    <div className={`text-2xl font-black ${p.mobileHighlight.c} mb-0.5`}>{p.mobileHighlight.v}</div>
                    <div className="text-sm font-bold text-slate-800">{p.mobileHighlight.l}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{p.mobileHighlight.sub}</div>
                  </div>

                  {/* Desktop: full inline mockup */}
                  <div className="hidden lg:block">
                    {i === 0 && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="bg-slate-800 px-3 py-2 flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-400/60" /><div className="w-2 h-2 rounded-full bg-amber-400/60" /><div className="w-2 h-2 rounded-full bg-green-400/60" />
                          <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-[8px] text-slate-500 font-mono mx-2">app.areaconnect.pro</div>
                        </div>
                        <div className="bg-slate-50 p-3">
                          <div className="flex gap-1.5 mb-2">
                            {[{ v: '142', l: 'Residents', c: 'text-brand-600 bg-brand-50' }, { v: '₦1.2M', l: 'Collected', c: 'text-amber-600 bg-amber-50' }, { v: '23', l: 'Visitors', c: 'text-blue-600 bg-blue-50' }].map(s => (
                              <div key={s.l} className={`flex-1 rounded-lg p-1.5 text-center ${s.c}`}>
                                <div className="text-[10px] font-black">{s.v}</div>
                                <div className="text-[7px]">{s.l}</div>
                              </div>
                            ))}
                          </div>
                          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-brand-500 rounded-full" style={{ width: '76%' }} /></div>
                          <div className="text-[8px] text-slate-400 mt-1">76% dues collected this month</div>
                        </div>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="bg-indigo-600 p-3">
                          <div className="text-[9px] font-bold text-white mb-0.5">Good morning, Adaeze 👋</div>
                          <div className="text-[8px] text-indigo-300">Sunrise Estate · 3 notifications</div>
                        </div>
                        <div className="bg-slate-50 p-3 space-y-1.5">
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 text-[9px] font-medium text-amber-800">📢 Water maintenance Saturday 8AM</div>
                          <div className="bg-white border border-slate-100 rounded-lg p-2">
                            <div className="text-[8px] text-slate-400 mb-1">MY VISITORS</div>
                            <div className="text-[9px] font-semibold text-slate-700">Chidi Okafor · Today, 3PM</div>
                            <div className="flex items-center gap-1 mt-0.5"><span className="w-1 h-1 bg-brand-500 rounded-full" /><span className="text-[8px] text-brand-600">Active pass</span></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="bg-blue-700 p-3">
                          <div className="text-[9px] font-bold text-white mb-0.5">AreaConnect Guard</div>
                          <div className="text-[8px] text-blue-300">Gate 1 · Sunrise Estate</div>
                        </div>
                        <div className="bg-slate-50 p-3">
                          <div className="bg-slate-900 rounded-lg p-2.5 flex items-center gap-2.5">
                            <div className="w-10 h-10 border border-blue-400 rounded-lg grid grid-cols-3 gap-0.5 p-1 flex-shrink-0">
                              {[...Array(9)].map((_, j) => (
                                <div key={j} className={`w-2 h-2 rounded-sm ${j % 3 === 0 || j === 4 ? 'bg-blue-400' : 'bg-slate-700'}`} />
                              ))}
                            </div>
                            <div>
                              <div className="text-[9px] font-bold text-white">Scanning…</div>
                              <div className="text-[8px] text-slate-500">Hold pass up to camera</div>
                            </div>
                          </div>
                          <div className="mt-2 bg-brand-50 border border-brand-100 rounded-lg p-2 flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-brand-500 flex-shrink-0" />
                            <div>
                              <div className="text-[9px] font-bold text-brand-700">VERIFIED</div>
                              <div className="text-[8px] text-slate-600">Chidi Okafor · Unit 4B</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2 sm:space-y-2.5 mt-5 mb-6">
                    {p.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 size={14} className={`text-${p.accent}-500 flex-shrink-0 mt-0.5`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link to={p.href} className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors group">
                    Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
          {/* end hidden sm:grid */}
        </div>
      </section>

      {/* ── FEATURE SHOWCASE: ADMIN ───────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <Reveal className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-brand-50 to-emerald-50 rounded-3xl" />
                <div className="relative">
                  <HeroDashboard />
                </div>
              </div>
            </Reveal>
            <div className="flex-1 max-w-lg w-full">
              <Reveal>
                <span className="section-tag mb-4 inline-flex">Estate Manager Dashboard</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
                  Everything you need to run your estate — in one place
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  No more chasing residents on WhatsApp, paper visitor logs, or manual bank reconciliation. AreaConnect Admin puts you in full control from your browser.
                </p>
              </Reveal>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Users,      title: 'Resident onboarding',       desc: 'Invite residents one-by-one or bulk-upload via CSV. Each gets a branded welcome email with login credentials.' },
                  { icon: CreditCard, title: 'Automated dues collection',  desc: 'Schedule monthly levies, send reminders, and collect via Paystack. Full reconciliation and receipt generation.' },
                  { icon: BarChart2,  title: 'Live analytics',             desc: 'Real-time dashboard for visitor trends, payment rates, and community engagement metrics.' },
                  { icon: Bell,       title: 'Broadcast alerts',           desc: 'Send estate-wide security alerts with one click. Track who has acknowledged each broadcast.' },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 60}>
                    <div className="flex gap-4 p-3 sm:p-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200 cursor-default">
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
              <Reveal delay={250}>
                <Link to="/admin" className="btn-primary mt-6 sm:mt-8 inline-flex">
                  Explore Admin features <ArrowRight size={15} />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE SHOWCASE: MOBILE APPS ─────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            {/* Phone mockups — single on mobile, both on desktop */}
            <Reveal className="flex-1 w-full">
              {/* Mobile: single phone centred */}
              <div className="flex justify-center lg:hidden">
                <PhoneMockup />
              </div>
              {/* Desktop: both phones */}
              <div className="hidden lg:flex justify-center items-end gap-10">
                <div className="lg:mb-12"><PhoneMockup /></div>
                <div className="lg:mt-12"><GuardMockup /></div>
              </div>
            </Reveal>

            <div className="flex-1 max-w-lg w-full">
              <Reveal>
                <span className="section-tag mb-4 inline-flex">Mobile Apps</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
                  Apps your residents and security staff will actually use
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  AreaMates is the resident app for everything estate-related. AreaConnect Guard gives security officers a fast, reliable tool for gate management — even offline.
                </p>
              </Reveal>
              <div className="space-y-4 sm:space-y-5">
                {[
                  { icon: '🔐', title: 'Visitor QR passes — shareable on WhatsApp', desc: 'Residents create a visitor pass in 30 seconds. A QR code and 6-digit access code are emailed to the guest automatically.' },
                  { icon: '📶', title: 'Guard app works offline', desc: "Nigerian networks are unreliable. The Guard app caches all visitor data locally and syncs automatically when connection returns." },
                  { icon: '💬', title: 'Community tools residents love', desc: 'Chat, polls, marketplace, events, and a communal music lounge — all scoped to your estate with no cross-estate mixing.' },
                  { icon: '📱', title: 'Works on any Android from version 8', desc: 'No expensive hardware required. Guards can use affordable Android phones — AreaConnect Guard is optimised for low-end devices.' },
                ].map((f, i) => (
                  <Reveal key={f.title} delay={i * 60}>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-100 text-xl">
                        {f.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{f.title}</div>
                        <div className="text-sm text-slate-500 leading-relaxed">{f.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={260}>
                <div className="flex flex-wrap gap-3 mt-6 sm:mt-8">
                  <Link to="/mates" className="btn-outline">AreaMates <ArrowRight size={14} /></Link>
                  <Link to="/guard" className="btn-outline">Guard app <ArrowRight size={14} /></Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-tag mb-4 inline-flex">Everything included</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Every tool your estate needs</h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-xl mx-auto">
                No integrations required. AreaConnect is a complete estate management platform out of the box.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {[
              { icon: '🔐', c: 'bg-brand-50',   title: 'Visitor Management',   desc: 'QR passes and access codes. Guards verify in under a second — no paperwork.' },
              { icon: '💳', c: 'bg-indigo-50',  title: 'Payment Collection',   desc: 'Schedule recurring dues, auto-reminders, and Paystack collection. Full reconciliation.' },
              { icon: '📢', c: 'bg-amber-50',   title: 'Announcements',        desc: 'Broadcast with images. Residents get push notifications and can acknowledge receipt.' },
              { icon: '🔔', c: 'bg-red-50',     title: 'Security Alerts',      desc: 'One-tap incident escalation to managers and all residents. Instantly.' },
              { icon: '💬', c: 'bg-violet-50',  title: 'Community Chat',       desc: 'Estate-wide group chat plus direct messaging — scoped to your estate only.' },
              { icon: '🛒', c: 'bg-blue-50',    title: 'Resident Marketplace', desc: 'Buy, sell, and trade within your estate — furniture, food, services.' },
              { icon: '📊', c: 'bg-teal-50',    title: 'Polls & Voting',       desc: 'Run transparent votes on estate decisions. Results tallied in real time.' },
              { icon: '🎉', c: 'bg-pink-50',    title: 'Events Board',         desc: 'Post community events with RSVP. Send automatic reminders to attendees.' },
              { icon: '📈', c: 'bg-slate-50',   title: 'Analytics Dashboard',  desc: 'Live visitor trends, payment rates, and community engagement metrics.' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 40}>
                <div className={`${f.c} rounded-2xl border border-slate-100/80 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                  <div className="text-xl sm:text-2xl mb-2 sm:mb-4">{f.icon}</div>
                  <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1.5 sm:mb-2">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="text-center mt-10 sm:mt-12">
              <Link to="/features" className="btn-outline inline-flex">
                See all features <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
                Simple setup
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">Live in under 10 minutes</h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-md mx-auto">No technical skills required. Just sign up and follow the guided setup.</p>
            </div>
          </Reveal>

          {/* Desktop: 4-column with horizontal connector */}
          <div className="hidden md:grid md:grid-cols-4 gap-6 relative">
            <div className="absolute top-[34px] left-[14%] right-[14%] h-px bg-gradient-to-r from-brand-500/50 via-indigo-500/50 to-blue-500/50" />
            {[
              { n: '01', title: 'Create your estate',    desc: 'Sign up, enter your estate details, and add your units. Takes under 3 minutes.',                         color: 'bg-gradient-to-br from-brand-500 to-brand-600',   shadow: 'shadow-brand-500/30'  },
              { n: '02', title: 'Invite your residents', desc: 'Upload a CSV or invite one by one. Everyone gets a branded welcome email automatically.',                 color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/30' },
              { n: '03', title: 'Onboard your guards',   desc: 'Create accounts for gate officers. They download the Guard app and are ready instantly.',                 color: 'bg-gradient-to-br from-blue-500 to-blue-600',    shadow: 'shadow-blue-500/30'   },
              { n: '04', title: 'Go live',               desc: 'Your estate is operational. Residents pay, register visitors, and the community is connected.',           color: 'bg-gradient-to-br from-amber-500 to-amber-600',  shadow: 'shadow-amber-500/30'  },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="flex flex-col items-center text-center">
                  <div className={`w-[68px] h-[68px] rounded-2xl ${s.color} flex items-center justify-center text-white text-lg font-black mb-5 shadow-lg ${s.shadow} relative z-10`}>
                    {s.n}
                  </div>
                  <h3 className="font-black text-white mb-2 text-lg">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile: step cards with connector */}
          <div className="md:hidden space-y-3">
            {[
              { n: '01', title: 'Create your estate',    desc: 'Sign up, enter your estate details, and add your units. Takes under 3 minutes.',              color: 'bg-gradient-to-br from-brand-500 to-brand-600',   border: 'border-brand-500/20',   badge: 'bg-brand-500/10 text-brand-300'   },
              { n: '02', title: 'Invite your residents', desc: 'Upload a CSV or invite one by one. Everyone gets a branded welcome email automatically.',      color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', border: 'border-indigo-500/20', badge: 'bg-indigo-500/10 text-indigo-300' },
              { n: '03', title: 'Onboard your guards',   desc: 'Create accounts for gate officers. They download the Guard app and are ready instantly.',      color: 'bg-gradient-to-br from-blue-500 to-blue-600',     border: 'border-blue-500/20',   badge: 'bg-blue-500/10 text-blue-300'     },
              { n: '04', title: 'Go live',               desc: "Your estate is operational. Residents pay, register visitors, and the community is connected.", color: 'bg-gradient-to-br from-amber-500 to-amber-600',   border: 'border-amber-500/20',  badge: 'bg-amber-500/10 text-amber-300'   },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className={`flex items-start gap-4 rounded-2xl border ${s.border} p-4`}
                     style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-white font-black text-base flex-shrink-0 shadow-lg`}>
                    {s.n}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <h3 className="font-black text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="section-tag mb-4 inline-flex">Loved by estate managers</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Don&apos;t just take our word for it</h2>
              <p className="text-slate-500 text-base sm:text-lg">Real managers. Real results. Across Nigeria.</p>
            </div>
          </Reveal>

          {/* Mobile: horizontal scroll carousel — all 5 testimonials */}
          <div className="sm:hidden -mx-5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
            <div className="flex gap-4 px-5 w-max">
              {[
                { quote: "Before AreaConnect I was managing visitors in a paper log book and chasing residents on WhatsApp for dues. Now everything runs automatically. I save at least 6 hours every week.", name: "Adaeze Okonkwo", role: "Estate Manager · Lekki Phase 1", initials: "AO", color: "bg-brand-500" },
                { quote: "The visitor QR code system is brilliant. Residents love sending a pass directly from the app — no more calling security every time a guest arrives. Gate officers picked it up in 5 minutes.", name: "Babatunde Oyelaran", role: "Estate Manager · Chevron Drive", initials: "BO", color: "bg-indigo-500" },
                { quote: "We collect over ₦4 million in estate dues every quarter with zero manual follow-up. The automated Paystack reminders are seamless. Best investment we've made for the estate.", name: "Ngozi Eze", role: "Property Manager · Abuja GRA", initials: "NE", color: "bg-blue-500" },
                { quote: "Setup was faster than I expected. I uploaded the CSV of residents on a Saturday afternoon and by Monday morning everyone had their login and started using AreaMates. Remarkable.", name: "Emeka Adeyemi", role: "Chairman · Heritage Court, Uyo", initials: "EA", color: "bg-violet-500" },
                { quote: "The offline mode for the Guard app is a lifesaver. Our estate has patchy network near Gate 2. Guards can still verify visitors without signal and it syncs automatically.", name: "Fatimah Suleiman", role: "Property Manager · Meadow Court", initials: "FS", color: "bg-amber-500" },
              ].map((t, i) => (
                <div key={t.name} className="snap-center flex-shrink-0 w-[284px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={12} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed flex-1 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <div className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {[0,1,2,3,4].map(i => (
                <div key={i} className={`h-1.5 rounded-full bg-slate-300 ${i === 0 ? 'w-4' : 'w-1.5'}`} />
              ))}
            </div>
          </div>

          {/* Desktop: grid layout */}
          {/* Top 3 */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-5 sm:mb-6">
            <TestimonialCard delay={0}
              quote="Before AreaConnect I was managing visitors in a paper log book and chasing residents on WhatsApp for dues. Now everything runs automatically. I save at least 6 hours every week."
              name="Adaeze Okonkwo" role="Estate Manager · Lekki Phase 1, Lagos" initials="AO" color="bg-brand-500" />
            <TestimonialCard delay={80}
              quote="The visitor QR code system is brilliant. Residents love sending a pass directly from the app — no more calling security every time a guest arrives. Gate officers picked it up in 5 minutes."
              name="Babatunde Oyelaran" role="Estate Manager · Chevron Drive, Lekki" initials="BO" color="bg-indigo-500" />
            {/* 3rd card hidden on tablet to keep section lean */}
            <div className="hidden lg:block">
              <TestimonialCard delay={160}
                quote="We collect over ₦4 million in estate dues every quarter with zero manual follow-up. The automated Paystack reminders are seamless. Best investment we've made for the estate."
                name="Ngozi Eze" role="Property Manager · Abuja GRA, FCT" initials="NE" color="bg-blue-500" />
            </div>
          </div>

          {/* Bottom 2 — desktop only */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {[
              { quote: "Setup was faster than I expected. I uploaded the CSV of residents on a Saturday afternoon and by Monday morning everyone had their login and had already started using AreaMates. Remarkable.", name: "Emeka Adeyemi",    role: "Chairman · Heritage Court, Uyo",        initials: "EA", color: "bg-violet-500" },
              { quote: "The offline mode for the Guard app is a lifesaver. Our estate has patchy network near Gate 2. Guards can still verify visitors without signal and it syncs when they walk closer to the office.", name: "Fatimah Suleiman", role: "Property Manager · Meadow Court, Abuja", initials: "FS", color: "bg-amber-500"  },
            ].map((t, i) => (
              <TestimonialCard key={t.name} delay={i * 80} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR NIGERIA ─────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Reveal>
                <span className="section-tag mb-4 inline-flex">Built for Nigeria</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-5">
                  Designed for the way Nigerian estates actually work
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8 sm:mb-10">
                  We didn&apos;t build a generic platform and adapt it for Nigeria. We built AreaConnect specifically for the Nigerian estate context — from Paystack-native payments to erratic mobile networks.
                </p>
              </Reveal>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Zap,   title: 'Paystack-native payments',  desc: "Dues collection and wallet payouts run entirely on Paystack — Nigeria's most trusted payment gateway." },
                  { icon: Wifi,  title: 'Offline-first Guard app',    desc: 'Caches all visitor data locally. Works without signal and syncs automatically when connected.' },
                  { icon: Lock,  title: 'Complete data isolation',    desc: 'Every estate is fully isolated. No resident can ever see data from another estate.' },
                  { icon: Globe, title: 'Works on any device',        desc: 'Guard app runs on Android 8+ phones. Admin portal works on any browser — no app download needed.' },
                ].map((w, i) => (
                  <Reveal key={w.title} delay={i * 60}>
                    <div className="flex gap-4 p-3 sm:p-4 rounded-2xl hover:bg-brand-50/50 transition-colors duration-200">
                      <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <w.icon size={18} className="text-brand-600" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm mb-1">{w.title}</div>
                        <div className="text-sm text-slate-500 leading-relaxed">{w.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={100}>
              <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5 sm:mb-6">
                  <MapPin size={16} className="text-brand-500" />
                  <span className="text-sm font-bold text-slate-900">Active across Nigeria</span>
                </div>
                <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-5 sm:mb-6">
                  {[
                    { name: 'Lagos',         tag: '230+ estates', color: 'bg-brand-500',  active: true  },
                    { name: 'Abuja (FCT)',   tag: '95+ estates',  color: 'bg-brand-500',  active: true  },
                    { name: 'Port Harcourt', tag: '48+ estates',  color: 'bg-brand-500',  active: true  },
                    { name: 'Enugu',         tag: '22+ estates',  color: 'bg-indigo-400', active: true  },
                    { name: 'Ibadan',        tag: '18+ estates',  color: 'bg-indigo-400', active: false },
                    { name: 'Warri',         tag: '14+ estates',  color: 'bg-blue-400',   active: false },
                    { name: 'Uyo',           tag: '11+ estates',  color: 'bg-blue-400',   active: false },
                    { name: 'Kano',          tag: 'Coming soon',  color: 'bg-amber-400',  active: false },
                  ].map(c => <City key={c.name} {...c} />)}
                </div>
                <div className="border-t border-slate-200 pt-4 sm:pt-5 space-y-2">
                  {[
                    { c: 'bg-brand-500',  l: 'Fully operational' },
                    { c: 'bg-indigo-400', l: 'Growing' },
                    { c: 'bg-amber-400',  l: 'Coming soon' },
                  ].map(l => (
                    <div key={l.l} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${l.c}`} />
                      <span className="text-xs text-slate-500">{l.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ──────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-slate-900">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4">
                Pricing
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">Simple, honest pricing</h2>
              <p className="text-slate-400 text-base sm:text-lg">From ₦50,000/month — or ₦2,000/resident/month. No hidden fees.</p>
            </div>
          </Reveal>

          {/* Mobile: stacked cards with featured first */}
          <div className="flex flex-col sm:hidden gap-4">
            {[
              {
                name: 'Growth', price: '₦50,000', sub: '/month',
                desc: 'The full platform for up to 150 residents.',
                badge: 'Most popular',
                items: ['Up to 150 residents', 'Visitor management (QR + codes)', 'Dues collection via Paystack', 'Resident marketplace', 'Polls, events & lounge', 'Analytics & reporting'],
                cta: 'Get started', ctaLink: '/pricing', featured: true,
              },
              {
                name: 'Per resident', price: '₦2,000', sub: '/resident/month',
                desc: 'Pay only for the residents you have.',
                badge: null,
                items: ['All Growth features', 'Scale with your estate', 'No resident limit', 'Same great platform'],
                cta: 'Contact us', ctaLink: '/contact', featured: false,
              },
              {
                name: 'Enterprise', price: 'Custom', sub: 'pricing',
                desc: 'For large estates and property portfolios.',
                badge: null,
                items: ['Multi-estate management', 'Dedicated onboarding support', 'Custom SLA & branding', 'API access & priority support'],
                cta: 'Talk to sales', ctaLink: '/contact', featured: false,
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className={`relative rounded-2xl p-6 ${p.featured ? 'border-brand-500/40 shadow-xl shadow-brand-500/10' : 'border-white/8'} border`}
                     style={{ background: p.featured ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,78,59,0.12) 100%)' : 'rgba(255,255,255,0.03)' }}>
                  {p.badge && (
                    <div className="absolute -top-3 left-5 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {p.badge}
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{p.name}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{p.price}</span>
                        <span className="text-slate-400 text-sm">{p.sub}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {p.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle2 size={13} className="text-brand-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.ctaLink}
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      p.featured ? 'bg-brand-500 hover:bg-brand-400 text-white' : 'border border-white/15 text-white hover:bg-white/8'
                    }`}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Desktop: original 3-column dark cards */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-5">
            {[
              {
                name: 'Growth',     price: '₦50,000', sub: '/month',
                desc: 'For estates up to 150 residents.',
                badge: 'Most popular',
                items: ['Up to 150 residents', 'Everything on the platform', 'Dues collection via Paystack', 'Resident marketplace', 'Polls, events & lounge', 'Analytics & reporting'],
                cta: 'Get started', ctaLink: '/pricing', ctaStyle: 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/30',
              },
              {
                name: 'Per resident', price: '₦2,000', sub: '/resident/month',
                desc: 'Pay per resident — ideal for growing estates.',
                badge: null,
                items: ['All Growth features', 'Scales with your estate', 'No fixed resident cap', 'Same full platform'],
                cta: 'Contact us', ctaLink: '/contact', ctaStyle: 'border border-white/15 text-white hover:bg-white/8',
              },
              {
                name: 'Enterprise', price: 'Custom', sub: 'pricing',
                desc: 'For large estates and property portfolios.',
                badge: null,
                items: ['Multi-estate management', 'Custom SLA & uptime guarantee', 'Dedicated onboarding support', 'White-label branding option', 'API access', 'Priority support'],
                cta: 'Talk to sales', ctaLink: '/contact', ctaStyle: 'border border-white/15 text-white hover:bg-white/8',
              },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div className={`relative rounded-2xl p-7 flex flex-col h-full ${p.badge ? 'border-brand-500/40 shadow-xl shadow-brand-500/10' : 'border-white/8'} border`}
                     style={{ background: p.badge ? 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,78,59,0.12) 100%)' : 'rgba(255,255,255,0.03)' }}>
                  {p.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {p.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{p.name}</div>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="text-4xl font-black text-white">{p.price}</span>
                      <span className="text-slate-400 text-sm">{p.sub}</span>
                    </div>
                    <div className="text-sm text-slate-400">{p.desc}</div>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-7">
                    {p.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={14} className="text-brand-500 flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.ctaLink} className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${p.ctaStyle}`}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="text-center mt-6 sm:mt-8">
              <Link to="/pricing" className="text-slate-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1.5">
                See full pricing comparison <ArrowRight size={13} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-12">
              <span className="section-tag mb-4 inline-flex">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Common questions</h2>
              <p className="text-slate-500">
                Still have questions?{' '}
                <Link to="/contact" className="text-brand-600 hover:underline font-semibold">Our team is here to help.</Link>
              </p>
            </div>
          </Reveal>
          <div className="space-y-3">
            {[
              { q: 'How much does AreaConnect cost?',
                a: 'Plans start at ₦50,000/month (flat fee) for up to 150 residents, or ₦400,000/year. If you prefer per-resident pricing, it\'s ₦2,000/resident/month. Enterprise pricing is custom for large portfolios. See the full pricing page for details.' },
              { q: 'How do residents get their login credentials?',
                a: "When an estate manager invites a resident — individually or via CSV — the system instantly creates an account and emails the resident a branded welcome message with their login email and a temporary password. They sign in and change it on first access." },
              { q: 'How does the visitor QR code system work?',
                a: "A resident pre-registers their guest from the AreaMates app in under 30 seconds. The system generates a unique QR code and 6-digit access code and emails the pass to the guest — they can also forward it via WhatsApp. At the gate, the security officer scans or types the code into the Guard app to verify and check in the visitor." },
              { q: 'How are payments processed?',
                a: "AreaConnect uses Paystack — Nigeria's leading PCI-compliant payment gateway. Residents pay directly from within the AreaMates app by card or bank transfer. Funds are settled to the estate's registered bank account." },
              { q: 'Is our estate data safe?',
                a: "Yes. Every estate's data is completely isolated from other estates on the platform. All traffic runs over TLS 1.3. Passwords are hashed with bcrypt. Auth tokens are short-lived and rotating. Payment card data is never stored on our servers — it is handled exclusively by Paystack." },
              { q: 'Do I need any technical skills to get started?',
                a: 'None at all. The setup wizard walks you through creating your estate, adding units, and inviting residents step by step. Most estate managers are fully operational in under 10 minutes. We also offer a free onboarding call for all customers.' },
            ].map((faq, i) => (
              <Reveal key={faq.q} delay={i * 50}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 text-center z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Get started today
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5">
              Ready to modernise<br />your estate?
            </h2>
            <p className="text-brand-100 text-base sm:text-xl mb-8 sm:mb-10 leading-relaxed">
              Join 500+ estates already running on AreaConnect.<br className="hidden sm:block" />
              Setup takes under 10 minutes.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-[15px] shadow-xl shadow-black/20 hover:-translate-y-0.5 w-full sm:w-auto">
                Get started <ArrowRight size={18} />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px] hover:bg-white/8 w-full sm:w-auto">
                Book a demo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> From ₦50k/month</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Or ₦2,000/resident</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Setup in 10 minutes</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
