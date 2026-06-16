import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Smartphone, Wifi, WifiOff, Zap, QrCode, LogOut } from 'lucide-react';
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

function GuardPhoneMockup() {
  return (
    <div className="relative flex justify-center">
      {/* Glow */}
      <div className="absolute -inset-8 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      {/* Phone body */}
      <div className="relative bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden w-[240px]" style={{ height: 500 }}>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-full z-10" />
        <div className="absolute inset-0 flex flex-col">
          {/* Hero strip — exact gradient from real security Dashboard */}
          <div
            className="px-4 pt-9 pb-4 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 60%, #1D4ED8 100%)' }}
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.07)' }} />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.05)' }} />
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-2"
                style={{ background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.30)' }}>
                <Shield size={20} className="text-white" />
              </div>
              <div className="text-white text-[12px] font-bold mb-0.5">Gate Security</div>
              <div className="text-[8px] mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>Visitor access verification terminal</div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-semibold"
                style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                Monday · 14:32
              </div>
            </div>
          </div>

          {/* Content — white bg matching real security app */}
          <div className="flex-1 p-3 space-y-2.5 overflow-hidden" style={{ background: '#F8FAFC' }}>
            {/* Code input card */}
            <div className="bg-white rounded-2xl p-3 border" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
              <div className="text-[8px] font-medium text-center mb-2" style={{ color: '#475569' }}>
                Visitor Access Code
              </div>
              <div className="relative mb-2">
                <QrCode size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#94A3B8' }} />
                <div className="w-full rounded-xl py-2 px-3 pl-8 text-center text-[14px] font-black tracking-[0.4em]"
                  style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#0F172A', fontFamily: '"Courier New", monospace', letterSpacing: '0.3em' }}>
                  AB7C1F
                </div>
              </div>
              {/* Progress dots */}
              <div className="flex justify-center gap-1.5 mb-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-1.5 rounded-full transition-all"
                    style={{ background: i < 6 ? '#3B82F6' : '#E2E8F0' }} />
                ))}
              </div>
              <div className="w-full py-1.5 rounded-xl text-[8px] font-bold text-white text-center"
                style={{ background: '#3B82F6' }}>
                Verify Code
              </div>
            </div>

            {/* Verified visitor result card */}
            <div className="bg-white rounded-2xl p-3 border"
              style={{ border: '1px solid rgba(16,185,129,0.18)', background: 'rgba(16,185,129,0.06)' }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.10)', border: '2px solid rgba(59,130,246,0.20)', color: '#2563EB' }}>
                  C
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-black" style={{ color: '#0F172A' }}>Chidi Okafor</div>
                  <div className="text-[8px] flex items-center gap-1" style={{ color: '#059669' }}>
                    <CheckCircle2 size={8} /> Verified · Access granted
                  </div>
                </div>
              </div>
              {/* 2×2 info grid */}
              <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                {[
                  { l: 'Purpose',    v: 'Personal visit' },
                  { l: 'Host Unit',  v: 'Unit 4B' },
                  { l: 'Expected',   v: 'Today' },
                  { l: 'Invited by', v: 'Adaeze O.' },
                ].map(info => (
                  <div key={info.l} className="rounded-xl p-2" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                    <div className="text-[7px] mb-0.5" style={{ color: '#94A3B8' }}>{info.l}</div>
                    <div className="text-[8px] font-medium" style={{ color: '#0F172A' }}>{info.v}</div>
                  </div>
                ))}
              </div>
              {/* Check In time cell + Check Out button */}
              <div className="rounded-xl p-2 mb-2" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.18)' }}>
                <div className="text-[7px] mb-0.5" style={{ color: '#059669' }}>Checked In</div>
                <div className="text-[9px] font-medium" style={{ color: '#0F172A' }}>2:28 PM</div>
              </div>
              <div className="w-full py-2 rounded-xl text-[8px] font-bold text-center flex items-center justify-center gap-1"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}>
                <LogOut size={10} style={{ color: '#3B82F6' }} /> Check Out Visitor
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/10 rounded-full" />
      </div>
      {/* Floating badges */}
      <div className="absolute -left-6 top-16 bg-green-500 text-white rounded-2xl shadow-xl px-3 py-2 animate-float">
        <div className="text-[9px] font-black">✓ Verified in 0.8s</div>
      </div>
      <div className="absolute -right-6 bottom-24 bg-slate-800 border border-white/10 rounded-2xl shadow-xl px-3 py-2 animate-float-slow">
        <div className="text-[9px] font-bold text-white flex items-center gap-1">
          <WifiOff size={9} className="text-amber-400" /> Offline mode active
        </div>
        <div className="text-[8px] text-slate-400 mt-0.5">Syncing when back online</div>
      </div>
    </div>
  );
}

const FEATURES = [
  { title: 'QR code scanner', desc: 'Scan visitor QR passes in under a second with the phone camera. Works with any pass generated by AreaMates.' },
  { title: 'Access code verification', desc: 'Guards can also type the 6-digit access code to verify a visitor — useful when QR scanning is not possible.' },
  { title: 'Check-in & check-out', desc: 'One-tap check-in and check-out with automatic timestamps. All entries sync to the estate manager dashboard.' },
  { title: 'Full entry log', desc: 'Browse a chronological log of every visitor who has entered or exited. Searchable by name, date, or unit.' },
  { title: 'Security alert button', desc: 'Escalate an incident to the estate manager and all residents with a single tap. Includes free-text description.' },
  { title: 'Blacklist lookup', desc: 'Check if a visitor has been flagged in the estate blacklist before allowing entry.' },
  { title: 'Offline mode', desc: 'The Guard app caches visitor data locally. Works during outages and syncs automatically when signal returns.' },
  { title: 'Works on low-end Android', desc: 'Optimised for Android 8 and above. No need for expensive smartphones for your gate officers.' },
  { title: 'Simple, focused UI', desc: 'Designed so any gate officer can learn the app in under 5 minutes. Zero training programme required.' },
];

export default function ProductGuard() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: '#050d1a' }}>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Shield size={22} className="text-white" />
                </div>
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">AreaConnect Guard</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
                Gate security,<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">modernised.</span>
              </h1>
              <p className="hidden sm:block text-lg text-slate-400 leading-relaxed mb-8">
                Give your security officers a fast, reliable mobile tool for verifying visitors, logging entries, and escalating incidents — even when the network is down.
              </p>
              <p className="block sm:hidden text-sm text-slate-400 leading-relaxed mb-8">
                Fast, reliable visitor verification for gate officers — even offline.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30">
                  <Smartphone size={16} /> App Store
                </a>
                <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                  <Smartphone size={16} /> Google Play
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2 size={15} className="text-brand-400" />
                Included in all plans at no extra cost
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <GuardPhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-blue-700 py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Desktop */}
          <div className="hidden sm:grid grid-cols-3 gap-8 text-center">
            {[
              { num: '1.2M+', label: 'QR scans processed' },
              { num: '<1s',   label: 'Average scan time' },
              { num: '500+',  label: 'Estates protected' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white mb-1">{s.num}</div>
                <div className="text-blue-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Mobile horizontal scroll */}
          <div className="sm:hidden flex gap-6 overflow-x-auto hide-scrollbar pb-1 justify-center">
            {[
              { num: '1.2M+', label: 'QR scans processed' },
              { num: '<1s',   label: 'Avg scan time' },
              { num: '500+',  label: 'Estates protected' },
            ].map(s => (
              <div key={s.label} className="flex-shrink-0 text-center min-w-[90px]">
                <div className="text-2xl font-black text-white mb-1">{s.num}</div>
                <div className="text-blue-100 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features grid */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="section-tag mb-4 inline-flex">Features</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Built for gate officers</h2>
              <p className="text-slate-500 mt-3 text-sm sm:text-lg">Everything they need. Nothing they don&apos;t.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 size={16} className="text-blue-600" />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Offline highlight */}
      <section className="py-16 sm:py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-64 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
                Offline-first design
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-6">
                Works when the<br />network doesn&apos;t.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm sm:text-lg">
                Nigerian mobile network coverage is unpredictable. The Guard app caches all visitor pre-registrations locally every time it connects — so your gate officers can still verify visitors during outages.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                When the connection returns, all check-in/check-out records sync automatically to the server and the estate manager dashboard.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Wifi,    title: 'Online',  desc: 'Real-time sync with server. New visitor passes appear instantly.' },
                  { icon: WifiOff, title: 'Offline', desc: 'Uses locally cached data. All features still work. Queues sync events.' },
                  { icon: Zap,     title: 'Reconnect', desc: 'All queued entries sync automatically within seconds of reconnection.' },
                ].map(s => (
                  <div key={s.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <s.icon size={16} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="font-black text-white text-sm mb-0.5">{s.title}</div>
                      <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-2xl border border-white/5 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <WifiOff size={18} className="text-amber-400" />
                    <div className="font-black text-white text-sm">Network unavailable</div>
                    <div className="ml-auto text-[10px] bg-amber-400/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-400/20">Offline mode</div>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Visitor database', status: 'Cached · 847 passes', ok: true },
                      { label: 'QR scanner', status: 'Fully operational', ok: true },
                      { label: 'Entry log', status: 'Local — 3 unsynced', ok: true },
                      { label: 'Real-time alerts', status: 'Queued for sync', ok: false },
                    ].map(r => (
                      <div key={r.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="text-xs text-slate-400">{r.label}</div>
                        <div className={`flex items-center gap-1.5 text-xs font-semibold ${r.ok ? 'text-brand-400' : 'text-amber-400'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${r.ok ? 'bg-brand-400' : 'bg-amber-400'}`} />
                          {r.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-brand-900/30 border border-brand-500/20 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Wifi size={16} className="text-brand-400" />
                    <div className="font-black text-white text-sm">Connection restored</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-300">
                    <div className="w-2 h-2 rounded-full bg-brand-400 animate-ping" style={{ animationDuration: '1.5s' }} />
                    Syncing 3 entry records to server…
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-lg mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">Upgrade your gate security</h2>
            <p className="text-blue-100 mb-8 text-base sm:text-lg leading-relaxed">
              The Guard app is included in all AreaConnect plans at no extra cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl text-base">
                See pricing <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base">
                Talk to sales
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
