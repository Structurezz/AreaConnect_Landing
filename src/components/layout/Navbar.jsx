import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Building2, Users, Shield, X, LayoutGrid, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  { to: '/admin', label: 'AreaConnect Admin', desc: 'Estate manager web dashboard', color: 'text-brand-600', bg: 'bg-brand-50',   icon: Building2 },
  { to: '/mates', label: 'AreaMates',          desc: 'Resident mobile & web app',    color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Users },
  { to: '/guard', label: 'AreaConnect Guard',  desc: 'Security officer mobile app',  color: 'text-blue-600',   bg: 'bg-blue-50',   icon: Shield },
];

const LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/pricing',  label: 'Pricing'  },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

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

  // Lock body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const transparent = isHome && !scrolled;

  const headerBg = scrolled
    ? 'bg-white/95 backdrop-blur-md shadow-md'
    : isHome
      ? 'bg-transparent'
      : 'bg-white border-b border-slate-100';

  const textCls = transparent
    ? 'text-white/75 hover:text-white'
    : 'text-slate-600 hover:text-slate-900';

  const activeCls = transparent ? 'text-brand-400' : 'text-brand-600';
  const brandMain = transparent ? 'text-white'     : 'text-slate-900';
  const brandSpan = transparent ? 'text-brand-400' : 'text-brand-500';

  return (
    <>
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
              <button
                onClick={() => setProductsOpen(o => !o)}
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
            {LINKS.map(l => (
              <NavLink key={l.to} to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 ${isActive ? activeCls : textCls}`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className={`text-sm font-semibold transition-colors ${textCls}`}>Sign in</a>
            <Link to="/pricing" className="btn-primary">Get started free</Link>
          </div>

          {/* ── Mobile right side ── */}
          <div className="md:hidden flex items-center gap-2">
            {/* Inline CTA */}
            <Link to="/pricing"
              className="text-xs font-bold px-3.5 py-2 rounded-full text-white transition-all"
              style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 2px 8px rgba(16,185,129,0.35)' }}>
              Get started
            </Link>
            {/* Menu pill */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                open
                  ? 'bg-slate-900 text-white'
                  : transparent
                    ? 'bg-white/15 text-white border border-white/25 backdrop-blur-sm'
                    : 'bg-slate-100 text-slate-800'
              }`}>
              {open ? <X size={14} /> : <LayoutGrid size={14} />}
              <span>{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile bottom sheet ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div className="md:hidden fixed bottom-0 inset-x-0 z-50 animate-slide-up"
            style={{ borderRadius: '28px 28px 0 0', background: '#fff', maxHeight: '88vh', overflowY: 'auto' }}>

            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-slate-200" />
            </div>

            {/* Sheet header */}
            <div className="flex items-center justify-between px-5 py-3">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                    <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                  </svg>
                </div>
                <span className="font-black text-slate-900">Area<span className="text-brand-500">Connect</span></span>
              </Link>
              <button onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>

            <div className="px-4 pb-8 space-y-5 mt-1">

              {/* Products */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 mb-2">Products</p>
                <div className="space-y-1.5">
                  {PRODUCTS.map(p => (
                    <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl transition-colors"
                      style={{ background: '#F8FAFC' }}
                      onTouchStart={e => e.currentTarget.style.background = '#F1F5F9'}
                      onTouchEnd={e => e.currentTarget.style.background = '#F8FAFC'}>
                      <div className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center flex-shrink-0`}>
                        <p.icon size={20} className={p.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900">{p.label}</div>
                        <div className="text-xs text-slate-400 truncate">{p.desc}</div>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Nav grid */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1 mb-2">Explore</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {[{ to: '/', label: 'Home' }, ...LINKS].map(l => (
                    <NavLink key={l.to} to={l.to} end={l.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `py-3.5 px-4 rounded-2xl text-sm font-bold text-center transition-colors ${
                          isActive
                            ? 'bg-brand-50 text-brand-600'
                            : 'bg-slate-50 text-slate-700'
                        }`
                      }>
                      {l.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-1">
                <Link to="/pricing" onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-sm text-white"
                  style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 4px 16px rgba(16,185,129,0.3)' }}>
                  Get started free <ArrowRight size={15} />
                </Link>
                <a href="#"
                  className="flex items-center justify-center w-full py-3.5 rounded-2xl font-bold text-sm text-slate-700"
                  style={{ background: '#F1F5F9' }}>
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
