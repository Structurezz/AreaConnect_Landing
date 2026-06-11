import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building2, Users, Shield } from 'lucide-react';

const PRODUCTS = [
  { to: '/admin', label: 'AreaConnect Admin', desc: 'Estate manager web dashboard', color: 'text-brand-600', bg: 'bg-brand-50', icon: Building2 },
  { to: '/mates', label: 'AreaMates',          desc: 'Resident mobile & web app',    color: 'text-indigo-600', bg: 'bg-indigo-50', icon: Users },
  { to: '/guard', label: 'AreaConnect Guard',  desc: 'Security officer mobile app',  color: 'text-blue-600',   bg: 'bg-blue-50',   icon: Shield },
];

const LINKS = [
  { to: '/features', label: 'Features' },
  { to: '/pricing',  label: 'Pricing'  },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

const MOBILE_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/features', label: 'Features' },
  { to: '/pricing',  label: 'Pricing'  },
  { to: '/admin',    label: 'Admin'    },
  { to: '/mates',    label: 'AreaMates'},
  { to: '/guard',    label: 'Guard'    },
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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-8">

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
            {/* Products dropdown */}
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setProductsOpen(o => !o)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors duration-150 ${productsOpen ? activeCls : textCls}`}>
                Products <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>
              {productsOpen && (
                <div className="absolute top-9 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-fade-in">
                  {PRODUCTS.map(p => (
                    <Link
                      key={p.to} to={p.to}
                      onClick={() => setProductsOpen(false)}
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
              <NavLink
                key={l.to} to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-150 ${isActive ? activeCls : textCls}`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className={`text-sm font-semibold transition-colors ${textCls}`}>
              Sign in
            </a>
            <Link to="/pricing" className="btn-primary">Get started free</Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${transparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-16 px-6 pb-8 flex flex-col overflow-y-auto">
          <nav className="flex flex-col gap-1 mt-4">
            {MOBILE_LINKS.map(l => (
              <NavLink
                key={l.to} to={l.to} end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-xl text-base font-semibold transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'
                  }`
                }>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-slate-100">
            <a href="#" className="py-3 text-center rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm">
              Sign in
            </a>
            <Link to="/pricing" onClick={() => setOpen(false)} className="btn-primary-lg justify-center">
              Get started free
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
