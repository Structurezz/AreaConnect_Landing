import { useState, useEffect, useRef, useLayoutEffect } from 'react';

// useLayoutEffect warns during pre-render; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, LayoutDashboard, Smartphone, ShieldCheck, ArrowRight, ArrowUpRight,
  Home, Zap, Tag, Info, Mail, Video, PhoneCall, Check,
} from 'lucide-react';
import { SECTOR_LINKS, SECTORS } from '../../lib/sectors';

const PRODUCTS = [
  { to: '/admin', label: 'AreaConnector Admin', desc: 'For managers & administrators', icon: LayoutDashboard, accent: '#10b981',
    tag: 'Web dashboard', features: ['Dues, levies & invoices', 'Residents & units', 'Dues enforcement', 'Reports & exports'] },
  { to: '/mates', label: 'AreaMates',         desc: 'For residents, students, guests & staff', icon: Smartphone,      accent: '#6366f1',
    tag: 'iOS & Android', features: ['Visitor QR passes', 'Pay with Paystack', 'Community lounge', 'In-app calls'] },
  { to: '/guard', label: 'AreaConnector Guard', desc: 'For security & front desk',     icon: ShieldCheck,     accent: '#0ea5e9',
    tag: 'Gate app', features: ['Scan QR & codes', 'Live gate log', 'Panic alerts', 'Call residents'] },
];

const NAV_ITEMS = [
  { to: '/',         label: 'Home',     icon: Home },
  { to: '/features', label: 'Features', icon: Zap },
  { to: '/pricing',  label: 'Pricing',  icon: Tag },
  { to: '/about',    label: 'About',    icon: Info },
  { to: '/contact',  label: 'Contact',  icon: Mail },
];

const REGISTER = '/get-started';

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
  const [menuOpen, setMenuOpen]         = useState(null); // 'products' | 'solutions' | null
  const [hovered, setHovered]           = useState(null);
  const [pill, setPill]                 = useState(null);
  const closeTimer = useRef(null);
  const linksRef = useRef({});
  const { pathname } = useLocation();

  const activeKey = NAV_ITEMS.slice(1).find(i => pathname.startsWith(i.to))?.to
    || (PRODUCTS.some(p => pathname.startsWith(p.to)) ? 'products' : null)
    || (SECTOR_LINKS.some(p => p.to !== '/' && pathname.startsWith(p.to)) ? 'solutions' : null);
  const pillKey = hovered ?? activeKey;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const openMenu = (key) => { clearTimeout(closeTimer.current); setMenuOpen(key); };
  const closeMenuSoon = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(null), 200);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => { setOpen(false); setMenuOpen(null); }, [pathname]);

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
            <span className="text-[17px] sm:text-[19px] font-bold tracking-tight text-slate-900">Area<span className="text-brand-500">Connector</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex relative items-center" onMouseLeave={() => setHovered(null)}>
            {pill && (
              <span className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-slate-100 transition-all duration-300 ease-out"
                style={{ left: pill.left, width: pill.width }} />
            )}

            {/* Products */}
            <div className="relative" onMouseEnter={() => openMenu('products')} onMouseLeave={closeMenuSoon}>
              <button ref={el => { linksRef.current.products = el; }}
                onMouseEnter={() => setHovered('products')}
                onClick={() => (menuOpen === 'products' ? setMenuOpen(null) : openMenu('products'))}
                className={`${linkCls('products')} flex items-center gap-1`}>
                Products <ChevronDown size={13} className={`transition-transform duration-200 ${menuOpen === 'products' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Solutions */}
            <div className="relative" onMouseEnter={() => openMenu('solutions')} onMouseLeave={closeMenuSoon}>
              <button ref={el => { linksRef.current.solutions = el; }}
                onMouseEnter={() => setHovered('solutions')}
                onClick={() => (menuOpen === 'solutions' ? setMenuOpen(null) : openMenu('solutions'))}
                className={`${linkCls('solutions')} flex items-center gap-1`}>
                Solutions <ChevronDown size={13} className={`transition-transform duration-200 ${menuOpen === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
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
            <Link to="/contact#book-demo" className="hidden lg:inline px-3.5 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors">
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

        {/* Desktop mega menu — spans the full nav width under the bar. pt-2 bridges the hover gap. */}
        {menuOpen && (
          <div className="hidden md:block max-w-6xl mx-auto relative">
            <div className="absolute inset-x-0 top-0 pt-2" onMouseEnter={() => openMenu(menuOpen)} onMouseLeave={closeMenuSoon}>
              <div key={menuOpen} className="rounded-[28px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl shadow-slate-900/10 p-3 about-feed-in">
                {menuOpen === 'products' ? (
                  <div className="grid grid-cols-[1fr_1fr_1fr_240px] gap-3">
                    {PRODUCTS.map(p => (
                      <Link key={p.to} to={p.to} onClick={() => setMenuOpen(null)}
                        className="group relative rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50/80 to-white p-5 overflow-hidden hover:border-slate-200 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                          style={{ background: `${p.accent}40` }} />
                        <div className="relative flex items-center justify-between">
                          <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{ background: `${p.accent}18` }}>
                            <p.icon size={20} style={{ color: p.accent }} />
                          </div>
                          <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{ background: `${p.accent}14`, color: p.accent }}>{p.tag}</span>
                        </div>
                        <div className="relative mt-4 text-[15px] font-semibold text-slate-900">{p.label}</div>
                        <div className="relative text-[12px] text-slate-500">{p.desc}</div>
                        <ul className="relative mt-4 space-y-1.5">
                          {p.features.map(f => (
                            <li key={f} className="flex items-center gap-2 text-[12px] text-slate-600">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${p.accent}18` }}>
                                <Check size={10} style={{ color: p.accent }} />
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                        <div className="relative mt-5 inline-flex items-center gap-1 text-[12px] font-semibold" style={{ color: p.accent }}>
                          Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}

                    <div className="flex flex-col gap-3">
                      <Link to="/features#calls" onClick={() => setMenuOpen(null)}
                        className="group relative flex-1 rounded-3xl bg-slate-900 p-5 overflow-hidden flex flex-col justify-between">
                        <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-500/40 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-500" />
                        <span className="relative inline-flex w-fit rounded-full bg-brand-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5">New</span>
                        <div className="relative">
                          <PhoneCall size={20} className="text-brand-400 mb-2" />
                          <div className="text-[14px] font-semibold text-white leading-snug">In-app calls & safety tools</div>
                          <div className="mt-1 text-[12px] text-slate-400 leading-snug">Call the gate, raise a panic alert and share live location.</div>
                          <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-brand-300 group-hover:text-white transition-colors">
                            See what’s new <ArrowUpRight size={12} />
                          </div>
                        </div>
                      </Link>
                      <Link to="/features" onClick={() => setMenuOpen(null)}
                        className="group rounded-3xl bg-slate-50 hover:bg-slate-100 px-5 py-4 transition-colors">
                        <div className="text-[13px] font-semibold text-slate-900 flex items-center gap-1">All features <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></div>
                        <div className="text-[11px] text-slate-500">Passes, payments, calls & more</div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      {SECTOR_LINKS.map(p => (
                        <Link key={p.to} to={p.to} onClick={() => setMenuOpen(null)}
                          className="group relative rounded-3xl border border-slate-100 bg-gradient-to-b from-slate-50/80 to-white p-4 overflow-hidden hover:border-slate-200 hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-0.5 transition-all duration-300">
                          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                            style={{ background: `${p.accent}40` }} />
                          <div className="relative flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                              style={{ background: `${p.accent}18` }}>
                              <p.icon size={18} style={{ color: p.accent }} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-[14px] font-semibold text-slate-900">{p.label}</div>
                              <div className="text-[11px] text-slate-500 truncate">{p.desc}</div>
                            </div>
                            <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                          </div>
                          <div className="relative mt-3 flex flex-wrap gap-1.5">
                            {(SECTORS[p.id]?.facts || []).map(f => (
                              <span key={f.value} className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200/80 px-2 py-0.5 text-[10.5px] font-medium text-slate-600">
                                <f.icon size={10} style={{ color: p.accent }} /> {f.value}
                              </span>
                            ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 rounded-3xl bg-slate-50 px-5 py-3.5 flex items-center gap-4">
                      <img src="/team/michael-orizu.jpg" alt="" className="w-10 h-10 rounded-xl object-cover object-[50%_15%]" />
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-slate-900">Not sure which fits your site?</div>
                        <div className="text-[12px] text-slate-500 flex items-center gap-1"><Video size={11} /> Book a 30-min Google Meet and we’ll set it up with you.</div>
                      </div>
                      <Link to="/contact#book-demo" onClick={() => setMenuOpen(null)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[12px] font-semibold px-4 py-2 transition-colors">
                        Book a demo <ArrowRight size={12} />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
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
                <div className="mt-2 text-[11px] font-semibold text-slate-900 leading-tight">{p.label.replace('AreaConnector ', '')}</div>
              </Link>
            ))}
          </div>

          <div className="px-3 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Solutions</div>
          <div className="grid grid-cols-3 gap-2 px-1">
            {SECTOR_LINKS.filter(p => p.to !== '/').map((p, i) => (
              <Link key={p.to} to={p.to} onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${430 + i * 50}ms` : '0ms' }}
                className={`rounded-2xl border border-slate-200/80 p-2.5 text-center transition-all duration-300 hover:bg-slate-50 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                <div className="w-9 h-9 mx-auto rounded-xl flex items-center justify-center" style={{ background: `${p.accent}18` }}>
                  <p.icon size={16} style={{ color: p.accent }} />
                </div>
                <div className="mt-2 text-[11px] font-semibold text-slate-900 leading-tight">{p.label}</div>
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
