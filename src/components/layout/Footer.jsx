import { Link } from 'react-router-dom';
import { Mail, Twitter, Linkedin, Instagram } from 'lucide-react';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features',          to: '/features' },
      { label: 'Pricing',           to: '/pricing'  },
      { label: 'AreaConnect Admin', to: '/admin'    },
      { label: 'AreaMates',         to: '/mates'    },
      { label: 'AreaConnect Guard', to: '/guard'    },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us',  to: '/about'   },
      { label: 'Blog',      to: '/blog'    },
      { label: 'Careers',   to: '/careers' },
      { label: 'Contact',   to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy',  to: '/privacy'  },
      { label: 'Terms of service',to: '/terms'    },
      { label: 'Cookie policy',   to: '/cookies'  },
      { label: 'Security',        to: '/security' },
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
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
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
                    <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} AreaConnect Technologies Ltd. All rights reserved.</p>
          <p className="text-sm text-slate-500">Made with ♥ for Nigerian estates</p>
        </div>
      </div>
    </footer>
  );
}
