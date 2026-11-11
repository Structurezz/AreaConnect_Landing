import { Link } from 'react-router-dom';
import {
  Mail, Twitter, Linkedin, Instagram, ArrowRight,
  Zap, CreditCard, LayoutDashboard, Users, Shield,
  Info, BookOpen, Briefcase, MessageCircle,
  Building2, GraduationCap, School, Hotel, Factory, Hospital,
} from 'lucide-react';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features',          to: '/features', icon: Zap            },
      { label: 'Pricing',           to: '/pricing',  icon: CreditCard     },
      { label: 'AreaConnector Admin', to: '/admin',    icon: LayoutDashboard },
      { label: 'AreaMates',         to: '/mates',    icon: Users          },
      { label: 'AreaConnector Guard', to: '/guard',    icon: Shield         },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Estates',    to: '/estates',    icon: Building2     },
      { label: 'Universities', to: '/universities', icon: GraduationCap },
      { label: 'Schools',    to: '/schools',    icon: School        },
      { label: 'Hotels',     to: '/hotels',     icon: Hotel         },
      { label: 'Industries', to: '/industries', icon: Factory       },
      { label: 'Hospitals',  to: '/hospitals',  icon: Hospital      },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us',  to: '/about',    icon: Info          },
      { label: 'Blog',      to: '/blog',     icon: BookOpen      },
      { label: 'Careers',   to: '/careers',  icon: Briefcase     },
      { label: 'Contact',   to: '/contact',  icon: MessageCircle },
    ],
  },
];

const LEGAL = [
  { label: 'Privacy',  to: '/privacy'  },
  { label: 'Terms',    to: '/terms'    },
  { label: 'Cookies',  to: '/cookies'  },
  { label: 'Security', to: '/security' },
];

const SOCIALS = [
  { href: '#', label: 'X (Twitter)', icon: Twitter },
  { href: '#', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.instagram.com/areaconnect.pro/', label: 'AreaConnector on Instagram', icon: Instagram, ext: true },
  { href: 'mailto:michael@area-connector.com', label: 'Email us', icon: Mail },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="w-full px-6 sm:px-10 lg:px-16">

        {/* CTA strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 py-10 border-b border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight">Bring your site onto AreaConnector.</h3>
            <p className="mt-1 text-sm text-slate-400">14-day free trial · No card required · Set up in a day</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Link to="/contact#book-demo" className="rounded-full border border-slate-700 hover:border-slate-500 px-4 py-2 text-[13px] font-medium text-slate-200 transition-colors">
              Book a demo
            </Link>
            <Link to="/get-started" className="group inline-flex items-center gap-1.5 rounded-full bg-brand-500 hover:bg-brand-400 px-4 py-2 text-[13px] font-semibold transition-colors">
              Get started <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 py-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <svg width="19" height="19" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                </svg>
              </div>
              <span className="text-[16px] font-bold tracking-tight text-white">Area<span className="text-brand-400">Connector</span></span>
            </Link>
            <p className="text-slate-400 text-[13px] leading-relaxed max-w-[260px]">
              Smart site management for estates, universities, schools, hotels, industries and hospitals across Nigeria and Africa. Connecting managers, members and security staff in one place.
            </p>
            <div className="flex items-center gap-2 mt-5">
              {SOCIALS.map(({ href, label, icon: Icon, ext }) => (
                <a key={label} href={href} aria-label={label} {...(ext ? { target: '_blank', rel: 'noopener me' } : {})}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <Icon size={14} className="text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.16em] mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-[13px] text-slate-400 hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-[0.16em] mb-4">Get in touch</h4>
            <ul className="space-y-2.5 text-[13px] text-slate-400">
              <li><a href="mailto:michael@area-connector.com" className="group inline-flex items-center gap-2 hover:text-white transition-colors"><Mail size={13} className="text-slate-500 group-hover:text-brand-400 transition-colors" /> michael@area-connector.com</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact form</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 py-6 border-t border-slate-800 text-[12px] text-slate-500">
          <p>© {new Date().getFullYear()} Area Connector Technologies · RC&nbsp;9607864</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {LEGAL.map(l => (
              <Link key={l.to} to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
          <p>Made with ♥ for Nigerian communities</p>
        </div>
      </div>
    </footer>
  );
}
