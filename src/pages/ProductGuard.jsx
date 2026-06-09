import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Smartphone, Wifi, WifiOff, Zap } from 'lucide-react';
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
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 pt-9 pb-4">
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="text-white text-[10px] font-black">AreaConnect Guard</div>
                <div className="text-blue-200 text-[8px]">Gate 1 · Sunrise Estate</div>
              </div>
              <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                <span className="text-[8px] text-white font-bold">Online</span>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 bg-slate-900 p-3 space-y-2.5 overflow-hidden">
            {/* QR Scanner area */}
            <div className="relative bg-slate-800 rounded-2xl p-4 flex flex-col items-center">
              {/* Scanner frame */}
              <div className="relative w-28 h-28 mb-2">
                <div className="absolute inset-0 border-2 border-blue-500/40 rounded-xl" />
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-400 rounded-br-lg" />
                {/* Scan line */}
                <div className="absolute inset-x-2 top-1/2 h-0.5 bg-blue-400/60 rounded-full" style={{ boxShadow: '0 0 8px #60a5fa' }} />
                {/* QR pattern */}
                <div className="absolute inset-4 grid grid-cols-4 gap-0.5">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`rounded-sm ${[0,1,3,4,6,8,9,11,12,15].includes(i) ? 'bg-blue-300/60' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <div className="text-blue-300 text-[9px] font-bold">Scanning visitor QR code…</div>
            </div>
            {/* Verified result */}
            <div className="bg-brand-900/40 border border-brand-500/30 rounded-xl p-2.5">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
                <div className="text-[9px] font-black text-brand-400 uppercase tracking-wide">Verified · Access granted</div>
              </div>
              <div className="text-[11px] font-black text-white">Chidi Okafor</div>
              <div className="text-[8px] text-slate-400">Visiting Unit 4B · Adaeze Okonkwo</div>
              <div className="text-[8px] text-slate-500 mt-1">Expected today · Valid pass</div>
            </div>
            {/* Recent entries */}
            <div>
              <div className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recent entries</div>
              {[
                { name: 'Fatima Bello', time: '2:34 PM', status: 'In', color: 'text-brand-400' },
                { name: 'Emeka Nwosu',  time: '1:51 PM', status: 'Out', color: 'text-slate-400' },
                { name: 'Kemi Adeyemi', time: '1:12 PM', status: 'In', color: 'text-brand-400' },
              ].map(e => (
                <div key={e.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-[9px] font-bold text-slate-300">{e.name}</div>
                    <div className="text-[8px] text-slate-600">{e.time}</div>
                  </div>
                  <span className={`text-[8px] font-black ${e.color}`}>{e.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/10 rounded-full" />
      </div>
      {/* Floating badges */}
      <div className="absolute -left-6 top-16 bg-brand-500 text-white rounded-2xl shadow-xl px-3 py-2 animate-float">
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
              <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
                Gate security,<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">modernised.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Give your security officers a fast, reliable mobile tool for verifying visitors, logging entries, and escalating incidents — even when the network is down.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <a href="#" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-blue-500/30">
                  <Smartphone size={16} /> App Store
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
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
          <div className="grid grid-cols-3 gap-8 text-center">
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
        </div>
      </div>

      {/* Features grid */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-tag mb-4 inline-flex">Features</span>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Built for gate officers</h2>
              <p className="text-slate-500 mt-3 text-lg">Everything they need. Nothing they don&apos;t.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
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
      <section className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-64 bg-blue-500/8 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
                Offline-first design
              </span>
              <h2 className="text-4xl font-black text-white tracking-tight mb-6">
                Works when the<br />network doesn&apos;t.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6 text-lg">
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
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Upgrade your gate security</h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              The Guard app is included in all AreaConnect plans at no extra cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl text-base">
                See pricing <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base">
                Talk to sales
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
