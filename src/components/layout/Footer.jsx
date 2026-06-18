import { Link } from 'react-router-dom';
import {
  Mail, Twitter, Linkedin, Instagram,
  Zap, CreditCard, LayoutDashboard, Users, Shield,
  Info, BookOpen, Briefcase, MessageCircle,
  Lock, FileText, Cookie, ShieldCheck,
} from 'lucide-react';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features',          to: '/features', icon: Zap            },
      { label: 'Pricing',           to: '/pricing',  icon: CreditCard     },
      { label: 'AreaConnect Admin', to: '/admin',    icon: LayoutDashboard },
      { label: 'AreaMates',         to: '/mates',    icon: Users          },
      { label: 'AreaConnect Guard', to: '/guard',    icon: Shield         },
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
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy',   to: '/privacy',  icon: Lock       },
      { label: 'Terms of service', to: '/terms',    icon: FileText   },
      { label: 'Cookie policy',    to: '/cookies',  icon: Cookie     },
      { label: 'Security',         to: '/security', icon: ShieldCheck },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-0">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-brand-500 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                </svg>
              </div>
              <span className="text-base font-black tracking-tight">
                Area<span className="text-brand-400">Connect</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Smart estate management for modern communities across Nigeria and Africa. Connecting managers, residents, and security staff in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Twitter size={15} className="text-slate-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Linkedin size={15} className="text-slate-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Instagram size={15} className="text-slate-400" />
              </a>
              <a href="mailto:hello@areaconnect.pro" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Mail size={15} className="text-slate-400" />
              </a>
            </div>
          </div>

          {/* Columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.to} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group">
                      <l.icon size={13} className="flex-shrink-0 text-slate-600 group-hover:text-brand-400 transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} AreaConnect Technologies. All rights reserved.</p>
            <p className="text-sm text-slate-500">Made with ♥ for Nigerian estates</p>
          </div>
          <p className="text-xs text-slate-600 text-center sm:text-left">
            AreaConnect is a product of{' '}
            <span className="text-slate-500 font-medium">Area Connector Technologies</span>
            {' '}· RC&nbsp;9607864 · Registered in Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
}
