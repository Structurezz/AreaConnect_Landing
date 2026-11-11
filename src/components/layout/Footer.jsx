import { Link } from 'react-router-dom';
import Wordmark from '../ui/Wordmark';
import {
  Mail, Twitter, Linkedin, Instagram,
  Zap, CreditCard, LayoutDashboard, Users, Shield,
  Info, BookOpen, Briefcase, MessageCircle,
  Lock, FileText, Cookie, ShieldCheck,
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
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-brand-500 flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none"/>
                  <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)"/>
                  <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
                </svg>
              </div>
              <span className="sm:hidden text-[19px] font-bold tracking-tight text-white">Area<span className="text-brand-400">Connector</span></span>
              <Wordmark height={48} ink="#FFFFFF" accent="#34D399" className="hidden sm:block" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Smart site management for estates, universities, schools, hotels, industries and hospitals across Nigeria and Africa. Connecting managers, members and security staff in one place.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Twitter size={15} className="text-slate-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Linkedin size={15} className="text-slate-400" />
              </a>
              <a href="https://www.instagram.com/areaconnect.pro/" target="_blank" rel="noopener me" aria-label="AreaConnector on Instagram" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                <Instagram size={15} className="text-slate-400" />
              </a>
              <a href="mailto:michael@area-connector.com" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
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
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} Area Connector Technologies. All rights reserved.</p>
            <p className="text-sm text-slate-500">Made with ♥ for Nigerian communities</p>
          </div>
          <p className="text-xs text-slate-600 text-center sm:text-left">
            Powered by{' '}
            <span className="text-slate-500 font-medium">Area Connector Technologies</span>
            {' '}· RC&nbsp;9607864
          </p>
        </div>
      </div>
    </footer>
  );
}
