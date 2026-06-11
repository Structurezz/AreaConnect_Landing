import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Users, Smartphone } from 'lucide-react';
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

function PhoneMockup() {
  return (
    <div className="relative flex justify-center">
      {/* Glow */}
      <div className="absolute -inset-8 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      {/* Phone body */}
      <div className="relative bg-slate-900 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden w-[240px]" style={{ height: 500 }}>
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-full z-10" />
        {/* Screen */}
        <div className="absolute inset-0 flex flex-col">
          {/* Status bar */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 pt-9 pb-5">
            <div className="text-white text-[11px] font-bold mb-0.5">Good morning, Adaeze 👋</div>
            <div className="text-indigo-200 text-[9px]">Sunrise Estate · Lekki</div>
            <div className="mt-3 flex gap-2">
              {[{ e: '🔐', l: 'Visitor' }, { e: '💳', l: 'Pay' }, { e: '🔔', l: 'Alerts' }, { e: '💬', l: 'Chat' }].map(a => (
                <div key={a.l} className="flex-1 bg-white/10 rounded-xl py-2 flex flex-col items-center gap-0.5">
                  <span className="text-sm">{a.e}</span>
                  <span className="text-[8px] text-indigo-100 font-semibold">{a.l}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 bg-slate-50 p-3 space-y-2.5 overflow-hidden">
            {/* Announcement */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
              <div className="text-[8px] font-bold text-amber-700 mb-1">📢 ANNOUNCEMENT</div>
              <div className="text-[9px] text-slate-800 font-semibold leading-snug">Water maintenance this Saturday 8am–2pm</div>
              <div className="text-[8px] text-slate-400 mt-1">Estate Management · 15 min ago</div>
            </div>
            {/* Visitor */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
              <div className="text-[8px] font-bold text-slate-400 mb-2 uppercase tracking-wide">Upcoming visitors</div>
              {[
                { name: 'Chidi Okafor', when: 'Today · 3:00 PM', dot: 'bg-brand-400' },
                { name: 'Fatima Bello', when: 'Tomorrow · 10:00 AM', dot: 'bg-indigo-400' },
              ].map(v => (
                <div key={v.name} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                  <div className={`w-2 h-2 rounded-full ${v.dot} flex-shrink-0`} />
                  <div>
                    <div className="text-[9px] font-bold text-slate-800">{v.name}</div>
                    <div className="text-[8px] text-slate-400">{v.when}</div>
                  </div>
                  <div className="ml-auto text-[8px] bg-brand-50 text-brand-700 font-bold px-1.5 py-0.5 rounded-full">QR ✓</div>
                </div>
              ))}
            </div>
            {/* Dues */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="text-[8px] font-bold text-slate-400 uppercase">Service charge</div>
                <div className="text-[8px] text-rose-600 font-bold">Due 30 Jun</div>
              </div>
              <div className="text-[13px] font-black text-slate-900 mb-2">₦45,000</div>
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[8px] font-bold text-center py-1.5 rounded-lg">
                Pay now with Paystack
              </div>
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full" />
      </div>
      {/* Floating notification */}
      <div className="absolute -right-4 top-20 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 w-36 animate-float">
        <div className="text-[9px] font-bold text-slate-800 mb-0.5">✅ Visitor arrived</div>
        <div className="text-[8px] text-slate-500">Chidi Okafor · Gate 1</div>
      </div>
      <div className="absolute -left-4 bottom-28 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 py-2 w-32 animate-float-slow">
        <div className="text-[9px] font-bold text-brand-600 mb-0.5">₦45,000 paid</div>
        <div className="text-[8px] text-slate-500">June service charge</div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: '🔐', title: 'Visitor pre-registration', desc: 'Register guests in 30 seconds. They receive a QR pass via email — shareable on WhatsApp.' },
  { icon: '💳', title: 'Pay estate dues', desc: 'View outstanding levies and pay by card or bank transfer via Paystack. Download receipts instantly.' },
  { icon: '📢', title: 'Announcements', desc: 'Never miss an estate notice. Browse all announcements with images and mark them as read.' },
  { icon: '💬', title: 'Community chat', desc: 'Chat with the whole estate or message neighbours directly. No cross-estate mixing.' },
  { icon: '🛒', title: 'Resident marketplace', desc: 'Buy and sell within your estate — furniture, food, appliances, services, and more.' },
  { icon: '📊', title: 'Polls & voting', desc: 'Vote on estate decisions and see results in real time. Every vote is anonymous and transparent.' },
  { icon: '🎉', title: 'Events board', desc: 'Browse community events, RSVP with one tap, and get automatic reminders before they start.' },
  { icon: '🎵', title: 'Resident lounge', desc: 'Suggest tracks for the community playlist, vote for your favourites, and share the vibe together.' },
  { icon: '🔔', title: 'Security alerts', desc: 'Raise an alert to all security staff with one tap. Receive real-time broadcast alerts from the estate.' },
];

export default function ProductMates() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: '#050d1a' }}>
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Users size={22} className="text-white" />
                </div>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">AreaMates</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-6">
                Your estate life,<br />
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">in one app.</span>
              </h1>
              <p className="hidden sm:block text-lg text-slate-400 leading-relaxed mb-8">
                Pre-register visitors, pay estate dues, chat with neighbours, and stay updated with everything happening in your community — all from your phone.
              </p>
              <p className="block sm:hidden text-sm text-slate-400 leading-relaxed mb-8">
                Visitors, dues, chat, and community — all in one place on your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-indigo-500/30">
                  <Smartphone size={16} /> App Store
                </a>
                <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 bg-white/5 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
                  <Smartphone size={16} /> Google Play
                </a>
              </div>
              <p className="text-sm text-slate-500">
                Also at{' '}
                <span className="text-indigo-400 font-semibold">app.areaconnect.pro</span>
                {' '}on any browser
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="bg-indigo-600 py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Desktop */}
          <div className="hidden sm:grid grid-cols-3 gap-8 text-center">
            {[
              { num: '40,000+', label: 'Active residents' },
              { num: '1.2M+',   label: 'Visitor passes issued' },
              { num: '₦2B+',    label: 'Dues collected' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-black text-white mb-1">{s.num}</div>
                <div className="text-indigo-100 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
          {/* Mobile horizontal scroll */}
          <div className="sm:hidden flex gap-6 overflow-x-auto hide-scrollbar pb-1 justify-center">
            {[
              { num: '40k+', label: 'Active residents' },
              { num: '1.2M+', label: 'Visitor passes' },
              { num: '₦2B+', label: 'Dues collected' },
            ].map(s => (
              <div key={s.label} className="flex-shrink-0 text-center min-w-[90px]">
                <div className="text-2xl font-black text-white mb-1">{s.num}</div>
                <div className="text-indigo-100 text-xs font-medium">{s.label}</div>
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
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Everything residents need</h2>
              <p className="text-slate-500 mt-3 text-sm sm:text-lg">One app that replaces five WhatsApp group chats.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 50}>
                <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase — visitor flow */}
      <section className="py-16 sm:py-28 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="section-tag mb-4 inline-flex">Visitor management</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-6">
                Register a visitor in<br />under 30 seconds
              </h2>
              <div className="space-y-5">
                {[
                  { num: '01', title: 'Resident adds visitor', desc: 'Name, phone, and expected arrival date. Optional vehicle plate number.' },
                  { num: '02', title: 'QR pass sent instantly', desc: "The visitor receives an email with a QR code and 6-digit access code — shareable on WhatsApp." },
                  { num: '03', title: 'Guard scans at the gate', desc: 'One-second scan confirms identity, host, and validity. Gate opens. Entry logged.' },
                ].map(s => (
                  <div key={s.num} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      {s.num}
                    </div>
                    <div>
                      <div className="font-black text-slate-900 mb-1">{s.title}</div>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-slate-900 rounded-2xl p-8 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Visitor pass preview</div>
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-3">VISITOR PASS</div>
                  <div className="text-2xl font-black text-slate-900 mb-1">Chidi Okafor</div>
                  <div className="text-sm text-slate-500 mb-4">Visiting Unit 4B · Sunrise Estate</div>
                  <div className="inline-grid grid-cols-5 gap-1 mb-4">
                    {[...Array(25)].map((_, i) => (
                      <div key={i} className={`w-5 h-5 rounded-sm ${[0,2,4,10,12,14,20,22,24].includes(i) ? 'bg-slate-900' : i % 7 === 0 ? 'bg-slate-700' : 'bg-slate-200'}`} />
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 mb-2">Or enter access code</div>
                  <div className="text-3xl font-black tracking-[0.3em] text-indigo-600">847 291</div>
                  <div className="mt-4 text-[10px] text-slate-400">Valid: Today · 3:00 PM – 11:59 PM</div>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <CheckCircle2 size={14} className="text-brand-400" />
                  Passes expire automatically after the expected date
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <CheckCircle2 size={14} className="text-brand-400" />
                  Resident can revoke any pass instantly
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span className="section-tag mb-4 inline-flex">Residents love it</span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">What residents say</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { name: 'Adaeze Okonkwo', estate: 'Sunrise Estate, Lekki', quote: "I used to call my husband every time I had a visitor because I forgot the gate officer's number. Now I just send the QR and forget about it.", stars: 5 },
              { name: 'Babatunde Adeyemi', estate: 'Royal Gardens, Abuja', quote: "Paying service charge used to mean driving to the estate office on a Saturday. Now I do it from bed while watching football.", stars: 5 },
              { name: 'Chioma Nwachukwu', estate: 'Harbour View, Port Harcourt', quote: "The community chat was unexpected. I found a plumber, sold my old AC, and made two new friends — all from the app.", stars: 5 },
            ].map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(t.stars)].map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div>
                    <div className="font-black text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.estate}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-700 to-indigo-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative max-w-lg mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users size={28} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">AreaMates is available now</h2>
            <p className="text-indigo-100 mb-8 text-base sm:text-lg leading-relaxed">
              Ask your estate manager to set up AreaConnect, or get started for your estate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all duration-200 hover:-translate-y-0.5 shadow-xl text-base">
                Get started <ArrowRight size={18} />
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
