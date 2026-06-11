import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, Building2, Users, Shield, X, ArrowRight,
  Home, Zap, Tag, Info, Mail, MapPin, Phone, Globe,
} from 'lucide-react';

const PRODUCTS = [
  {
    to: '/admin', label: 'AreaConnect Admin', desc: 'Full estate management dashboard',
    color: 'text-brand-600', bg: 'bg-brand-50', icon: Building2,
    detail: 'Manage residents, payments, visitors and more',
  },
  {
    to: '/mates', label: 'AreaMates', desc: 'Resident community app',
    color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Users,
    detail: 'Chat, events, marketplace & visitor passes',
  },
  {
    to: '/guard', label: 'AreaConnect Guard', desc: 'Security officer app',
    color: 'text-blue-600', bg: 'bg-blue-50', icon: Shield,
    detail: 'Gate management, visitor verification & alerts',
  },
];

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     icon: Home,     desc: 'Back to the homepage' },
  { to: '/features', label: 'Features', icon: Zap,      desc: 'Everything AreaConnect can do' },
  { to: '/pricing',  label: 'Pricing',  icon: Tag,      desc: 'Plans for every estate size' },
  { to: '/about',    label: 'About',    icon: Info,     desc: 'Our story and the team' },
  { to: '/contact',  label: 'Contact',  icon: Mail,     desc: 'Get in touch with us' },
];

const STATS = [
  { value: '500+',  label: 'Estates' },
  { value: '50k+',  label: 'Residents' },
  { value: '99.9%', label: 'Uptime SLA' },
];

/* Animated icon — asymmetric lines, not a hamburger */
function NavIcon({ open, light }) {
  const col = light ? 'bg-white' : 'bg-slate-800';
  return (
    <span className="flex flex-col gap-[5px] w-[18px]">
      <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${col} ${open ? 'w-[18px] translate-y-[6.5px] rotate-45' : 'w-[18px]'}`} />
      <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${col} ${open ? 'opacity-0' : 'w-[11px]'}`} style={{ marginLeft: 'auto' }} />
      <span className={`block h-[1.5px] rounded-full transition-all duration-300 ${col} ${open ? 'w-[18px] -translate-y-[6.5px] -rotate-45' : 'w-[18px]'}`} />
    </span>
  );
}

function stagger(i, base = 60, delay = 80) {
  return { animation: 'navItemIn 0.42s cubic-bezier(0.22,1,0.36,1) forwards', animationDelay: `${delay + i * base}ms`, opacity: 0 };
}

export default function Navbar() {
  const [open,         setOpen]         = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropRef  = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProductsOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => { setOpen(false); setProductsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const transparent = isHome && !scrolled && !open;
  const headerBg = scrolled || open
    ? 'bg-white/95 backdrop-blur-md shadow-sm'
    : isHome ? 'bg-transparent' : 'bg-white border-b border-slate-100';

  const textCls   = transparent ? 'text-white/75 hover:text-white'  : 'text-slate-600 hover:text-slate-900';
  const activeCls = transparent ? 'text-brand-400' : 'text-brand-600';
  const brandMain = transparent ? 'text-white'     : 'text-slate-900';
  const brandSpan = transparent ? 'text-brand-400' : 'text-brand-500';

  return (
    <>
      {/* ── Top bar ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm glow-sm-green">
              <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
              </svg>
            </div>
            <span className={`text-base font-black tracking-tight transition-colors ${brandMain}`}>
              Area<span className={`transition-colors ${brandSpan}`}>Connect</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <div ref={dropRef} className="relative">
              <button onClick={() => setProductsOpen(o => !o)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-150 ${productsOpen ? activeCls : textCls}`}>
                Products <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              {productsOpen && (
                <div className="absolute top-9 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-fade-in">
                  {PRODUCTS.map(p => (
                    <Link key={p.to} to={p.to} onClick={() => setProductsOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <p.icon size={15} className={p.color} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{p.label}</div>
                        <div className="text-xs text-slate-400">{p.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {NAV_ITEMS.slice(1).map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) => `text-sm font-medium transition-colors duration-150 ${isActive ? activeCls : textCls}`}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
          
            <Link to="https://area-connector.areaconnect.pro/register" className="btn-primary">Get started </Link>
          </div>

          {/* Mobile icon button */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              transparent
                ? 'border border-white/25 hover:bg-white/10'
                : 'border border-slate-200 bg-white hover:bg-slate-50'
            }`}>
            <NavIcon open={open} light={transparent} />
          </button>
        </div>
      </header>

      {/* ── Full-screen mobile menu ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col overflow-y-auto"
          style={{ background: '#020617', animation: 'menuFadeIn 0.2s ease forwards' }}>

          {/* Menu header — same height as navbar */}
          <div className="flex items-center justify-between px-5 h-16 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                </svg>
              </div>
              <span className="font-black text-white text-sm">Area<span className="text-brand-400">Connect</span></span>
            </Link>
            <button onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
              <X size={16} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 px-4 py-6 space-y-8">

            {/* Nav links */}
            <div className="space-y-1">
              {NAV_ITEMS.map((item, i) => (
                <NavLink key={item.to} to={item.to} end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  style={stagger(i, 55, 50)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                      isActive
                        ? 'bg-brand-500/15 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive ? 'bg-brand-500' : 'bg-white/8 group-hover:bg-white/12'
                      }`}>
                        <item.icon size={19} className={isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-base font-bold leading-tight ${isActive ? 'text-white' : ''}`}>{item.label}</div>
                        <div className="text-xs mt-0.5 text-white/35">{item.desc}</div>
                      </div>
                      <ArrowRight size={15} className={`flex-shrink-0 transition-all ${
                        isActive ? 'text-brand-400' : 'text-white/15 group-hover:text-white/35 group-hover:translate-x-0.5'
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Products */}
            <div style={stagger(5, 55, 50)}>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] px-1 mb-3"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                Our Products
              </p>
              <div className="space-y-2">
                {PRODUCTS.map((p, i) => (
                  <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                    style={stagger(i, 55, 360)}
                    className="flex items-center gap-3.5 p-4 rounded-2xl transition-all group"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    css-border="1px solid rgba(255,255,255,0.08)">
                    <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '2px' }}>
                      <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center`}>
                        <p.icon size={19} className={p.color} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white leading-tight">{p.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{p.detail}</div>
                    </div>
                    <ArrowRight size={14} className="flex-shrink-0 transition-all group-hover:translate-x-0.5"
                      style={{ color: 'rgba(255,255,255,0.2)' }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2" style={stagger(0, 0, 560)}>
              {STATS.map(s => (
                <div key={s.label} className="text-center py-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-xl font-black" style={{ color: '#10B981' }}>{s.value}</div>
                  <div className="text-[10px] mt-0.5 font-semibold uppercase tracking-wide"
                    style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2" style={stagger(0, 0, 620)}>
              {[
                { icon: MapPin,  text: 'Lagos, Nigeria' },
                { icon: Mail,    text: 'hello@areaconnect.pro' },
                { icon: Globe,   text: 'areaconnect.pro' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  <Icon size={14} style={{ flexShrink: 0 }} />
                  <span className="text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA footer */}
          <div className="px-4 pb-10 pt-5 space-y-2.5 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', ...stagger(0, 0, 680) }}>
            <Link to="/pricing" onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-sm text-white transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 4px 20px rgba(16,185,129,0.35)' }}>
              Get started free <ArrowRight size={15} />
            </Link>
            <a href="#"
              className="flex items-center justify-center w-full py-3.5 rounded-2xl font-semibold text-sm transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
              Sign in to your account
            </a>
          </div>
        </div>
      )}
    </>
  );
}
