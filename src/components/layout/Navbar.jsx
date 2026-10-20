import { useState, useEffect, useRef, useLayoutEffect } from 'react';

// useLayoutEffect warns during pre-render; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, LayoutDashboard, Smartphone, ShieldCheck, X, ArrowRight, ArrowUpRight,
  Home, Zap, Tag, Info, Mail, PhoneCall, Video,
} from 'lucide-react';

const PRODUCTS = [
  { to: '/admin', label: 'AreaConnect Admin', desc: 'Dashboard for estate managers', icon: LayoutDashboard, accent: '#10b981' },
  { to: '/mates', label: 'AreaMates',         desc: 'The resident app',              icon: Smartphone,      accent: '#6366f1' },
  { to: '/guard', label: 'AreaConnect Guard', desc: 'The gate & security app',       icon: ShieldCheck,     accent: '#0ea5e9' },
];

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     icon: Home },
  { to: '/features', label: 'Features', icon: Zap },
  { to: '/pricing',  label: 'Pricing',  icon: Tag },
  { to: '/about',    label: 'About',    icon: Info },
  { to: '/contact',  label: 'Contact',  icon: Mail },
];

const REGISTER = 'https://area-connector.areaconnect.pro/register';

function Logo({ size = 36 }) {
  return (
    <div className="rounded-xl bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-500/30" style={{ width: size, height: size }}>
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 40 40" fill="none">
        <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
        <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)" />
        <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
      </svg>
    </div>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block w-4 h-3">
      <span className={`absolute left-0 right-0 h-[1.5px] rounded-full bg-slate-800 transition-all duration-300 ${open ? 'top-[5px] rotate-45' : 'top-0'}`} />
      <span className={`absolute right-0 h-[1.5px] rounded-full bg-slate-800 transition-all duration-300 top-[5px] ${open ? 'w-0 opacity-0' : 'w-2.5'}`} />
      <span className={`absolute left-0 right-0 h-[1.5px] rounded-full bg-slate-800 transition-all duration-300 ${open ? 'top-[5px] -rotate-45' : 'top-[10px]'}`} />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen]                 = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [hovered, setHovered]           = useState(null);
  const [pill, setPill]                 = useState(null);
  const dropRef  = useRef(null);
  const linksRef = useRef({});
  const { pathname } = useLocation();

  const activeKey = NAV_ITEMS.slice(1).find(i => pathname.startsWith(i.to))?.to
    || (PRODUCTS.some(p => pathname.startsWith(p.to)) ? 'products' : null);
  const pillKey = hovered ?? activeKey;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setProductsOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  useEffect(() => { setOpen(false); setProductsOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Sliding highlight behind the hovered / active link.
  useIsoLayoutEffect(() => {
    const el = pillKey && linksRef.current[pillKey];
    setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [pillKey, pathname]);

  const linkCls = (key) => `relative z-10 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${
    pillKey === key ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
  }`;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-4 pt-3">
        <div className={`max-w-6xl mx-auto h-14 rounded-full flex items-center justify-between gap-4 pl-2 pr-2 sm:pl-3 transition-all duration-300 border ${
          scrolled || open
            ? 'bg-white/85 backdrop-blur-xl border-slate-200/80 shadow-lg shadow-slate-900/[0.06]'
            : 'bg-white/60 backdrop-blur-md border-white/70 shadow-sm shadow-slate-900/[0.03]'
        }`}>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 pl-1">
            <Logo size={34} />
            <span className="text-[15px] font-bold tracking-tight text-slate-900">
              Area<span className="text-brand-500">Connect</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex relative items-center" onMouseLeave={() => setHovered(null)}>
            {pill && (
              <span className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-slate-100 transition-all duration-300 ease-out"
                style={{ left: pill.left, width: pill.width }} />
            )}

            <div ref={dropRef} className="relative">
              <button ref={el => { linksRef.current.products = el; }}
                onMouseEnter={() => setHovered('products')}
                onClick={() => setProductsOpen(o => !o)}
                className={`${linkCls('products')} flex items-center gap-1`}>
                Products <ChevronDown size={13} className={`transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
              </button>

              {productsOpen && (
                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[440px] rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/10 p-2 about-feed-in">
                  <div className="grid grid-cols-[1fr_150px] gap-2">
                    <div className="space-y-0.5">
                      {PRODUCTS.map(p => (
                        <Link key={p.to} to={p.to} onClick={() => setProductsOpen(false)}
                          className="group flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-slate-50 transition-colors">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ background: `${p.accent}18` }}>
                            <p.icon size={16} style={{ color: p.accent }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-semibold text-slate-900">{p.label}</div>
                            <div className="text-[11px] text-slate-400">{p.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link to="/features#calls" onClick={() => setProductsOpen(false)}
                      className="group relative rounded-2xl bg-slate-900 p-3.5 overflow-hidden flex flex-col justify-between">
                      <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-500/30 rounded-full blur-2xl" />
                      <span className="relative inline-flex w-fit rounded-full bg-brand-500 text-white text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5">New</span>
                      <div className="relative">
                        <PhoneCall size={16} className="text-brand-400 mb-2" />
                        <div className="text-[13px] font-semibold text-white leading-snug">In-app calls & safety tools</div>
                        <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-white transition-colors">
                          See what’s new <ArrowUpRight size={11} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {NAV_ITEMS.slice(1).map(l => (
              <NavLink key={l.to} to={l.to}
                ref={el => { linksRef.current[l.to] = el; }}
                onMouseEnter={() => setHovered(l.to)}
                className={() => linkCls(l.to)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/contact#book-demo" className="px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Book a demo
            </Link>
            <Link to={REGISTER}
              className="group inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-semibold pl-4 pr-1.5 py-1.5 transition-colors">
              Get started
              <span className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={12} />
              </span>
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-1.5">
            <Link to={REGISTER} className="rounded-full bg-slate-900 text-white text-[12px] font-semibold px-3.5 py-2">Get started</Link>
            <button onClick={() => setOpen(o => !o)} aria-label="Toggle navigation"
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${open ? 'visible' : 'invisible'}`}>
        <div onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute top-[4.5rem] inset-x-3 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/15 p-2 origin-top transition-all duration-300 ease-out ${
          open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-[0.97]'
        }`}>
          <div className="p-1">
            {NAV_ITEMS.map((item, i) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms' }}
                className={({ isActive }) => `flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 ${
                  open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${isActive ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
                {({ isActive }) => (
                  <>
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500'}`}>
                      <item.icon size={16} />
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-slate-900">{item.label}</span>
                    <ArrowRight size={14} className={isActive ? 'text-brand-500' : 'text-slate-300'} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mx-1 my-2 h-px bg-slate-100" />

          <div className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Products</div>
          <div className="grid grid-cols-3 gap-2 px-1">
            {PRODUCTS.map((p, i) => (
              <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${280 + i * 50}ms` : '0ms' }}
                className={`rounded-2xl border border-slate-200/80 p-3 text-center transition-all duration-300 hover:bg-slate-50 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="w-9 h-9 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${p.accent}18` }}>
                  <p.icon size={16} style={{ color: p.accent }} />
                </div>
                <div className="mt-2 text-[11px] font-semibold text-slate-900 leading-tight">{p.label.replace('AreaConnect ', '')}</div>
              </Link>
            ))}
          </div>

          <div className="mt-3 rounded-2xl bg-slate-50 p-3 flex items-center gap-3 mx-1">
            <img src="/team/michael-orizu.jpg" alt="" className="w-10 h-10 rounded-xl object-cover object-[50%_15%]" />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-900">Book a 30-min demo</div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1"><Video size={10} /> Google Meet with Michael</div>
            </div>
            <Link to="/contact#book-demo" onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center">
              <ArrowRight size={14} />
            </Link>
          </div>

          <Link to={REGISTER} onClick={() => setOpen(false)}
            className="mt-2 mx-1 mb-1 flex items-center justify-center gap-2 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold py-3.5 transition-colors">
            Start 14-day free trial <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </>
  );
}
