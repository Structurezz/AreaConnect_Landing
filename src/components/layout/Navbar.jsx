import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ChevronDown, Building2, Users, Shield, X, ArrowRight } from 'lucide-react';

const PRODUCTS = [
  { to: '/admin', label: 'AreaConnect Admin', desc: 'Estate manager dashboard', color: 'text-brand-600',  bg: 'bg-brand-50',   icon: Building2 },
  { to: '/mates', label: 'AreaMates',          desc: 'Resident app',            color: 'text-indigo-600', bg: 'bg-indigo-50',  icon: Users },
  { to: '/guard', label: 'AreaConnect Guard',  desc: 'Security officer app',    color: 'text-blue-600',   bg: 'bg-blue-50',    icon: Shield },
];

const LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/pricing',  label: 'Pricing'  },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

/* Custom icon: two offset lines — minimal, not a hamburger */
function NavIcon({ open, light }) {
  const base = `block h-[1.5px] rounded-full transition-all duration-300 ${light ? 'bg-white' : 'bg-slate-800'}`;
  return (
    <span className="flex flex-col gap-[5px] w-5">
      <span className={`${base} ${open ? 'w-5 translate-y-[6.5px] rotate-45' : 'w-5'}`} />
      <span className={`${base} ${open ? 'opacity-0 w-4' : 'w-3'}`} style={{ marginLeft: 'auto' }} />
      <span className={`${base} ${open ? 'w-5 -translate-y-[6.5px] -rotate-45' : 'w-5'}`} />
    </span>
  );
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
    : isHome
      ? 'bg-transparent'
      : 'bg-white border-b border-slate-100';

  const textCls  = transparent ? 'text-white/75 hover:text-white'  : 'text-slate-600 hover:text-slate-900';
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

      {/* ── Mobile drawer ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 z-40"
            style={{ background: 'rgba(2,6,23,0.45)', backdropFilter: 'blur(10px)' }}
            onClick={() => setOpen(false)}
          />

          {/* Drawer panel */}
          <div
            className="md:hidden fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-white animate-drawer-in"
            style={{ width: 'min(88vw, 340px)', boxShadow: '-8px 0 40px rgba(2,6,23,0.18)' }}>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
              <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                    <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                    <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                    <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                  </svg>
                </div>
                <span className="font-black text-slate-900 text-sm">
                  Area<span className="text-brand-500">Connect</span>
                </span>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X size={15} className="text-slate-500" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1">

              {/* Navigation links */}
              <NavLink to="/" end onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }>
                {({ isActive }) => (
                  <>Home <ArrowRight size={14} className={isActive ? 'text-brand-400' : 'text-slate-300'} /></>
                )}
              </NavLink>

              {LINKS.map(l => (
                <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-3 rounded-xl text-[15px] font-semibold transition-colors ${
                      isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      <ArrowRight size={14} className={isActive ? 'text-brand-400' : 'text-slate-300'} />
                    </>
                  )}
                </NavLink>
              ))}

              {/* Divider */}
              <div className="pt-3 pb-1">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 px-3">
                  Products
                </p>
              </div>

              {/* Products */}
              {PRODUCTS.map(p => (
                <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className={`w-9 h-9 rounded-lg ${p.bg} flex items-center justify-center flex-shrink-0`}>
                    <p.icon size={16} className={p.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-900 leading-tight">{p.label}</div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">{p.desc}</div>
                  </div>
                  <ArrowRight size={13} className="text-slate-300 group-hover:text-slate-400 flex-shrink-0 transition-colors" />
                </Link>
              ))}
            </div>

            {/* CTA footer */}
            <div className="px-4 pb-8 pt-4 border-t border-slate-100 space-y-2.5 flex-shrink-0">
              <Link to="/pricing" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>
                Get started free <ArrowRight size={14} />
              </Link>
              <a href="#"
                className="flex items-center justify-center w-full py-3 rounded-xl font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors border border-slate-200">
                Sign in
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
