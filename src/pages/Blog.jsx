import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Mail, MapPin, TrendingUp, ExternalLink, Calendar } from 'lucide-react';
import { Reveal } from '../components/ui/Reveal';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const POSTS = [
  {
    slug:     'digitalising-estate-management-nigeria',
    tag:      'Guide',
    title:    'The complete guide to digitalising your estate management in Nigeria',
    excerpt:  'From paper log books to automated payment collection — a practical step-by-step guide for estate managers ready to modernise their community.',
    author:   'Michael Orizu',
    role:     'CEO, AreaConnect',
    date:     'June 3, 2025',
    readTime: '8 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    featured: true,
    image:    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern gated estate exterior',
  },
  {
    slug:     'visitor-management-best-practices',
    tag:      'Security',
    title:    '7 visitor management best practices for gated communities',
    excerpt:  'How top-performing estate managers use digital visitor passes, blacklists, and real-time entry logs to keep their communities safe.',
    author:   'Michael Orizu',
    role:     'CEO, AreaConnect',
    date:     'May 22, 2025',
    readTime: '6 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    image:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Security camera at estate gate',
  },
  {
    slug:     'collecting-estate-dues-paystack',
    tag:      'Payments',
    title:    'How to collect estate dues online with Paystack — without a developer',
    excerpt:  'A non-technical walkthrough of setting up automated estate levy collection, reminders, and reconciliation reports.',
    author:   'Michael Orizu',
    role:     'CEO, AreaConnect',
    date:     'May 10, 2025',
    readTime: '5 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    image:    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mobile payment and fintech',
  },
  {
    slug:     'building-community-in-your-estate',
    tag:      'Community',
    title:    'Building community in your estate — more than just paying dues',
    excerpt:  "The estates that thrive are the ones where residents feel genuinely connected. Here's how technology can help build that bond.",
    author:   'Michael Orizu',
    role:     'CEO, AreaConnect',
    date:     'April 28, 2025',
    readTime: '4 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    image:    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Diverse community gathering',
  },
  {
    slug:     'security-guard-technology-2025',
    tag:      'Security',
    title:    'What modern security guard technology looks like in 2025',
    excerpt:  'QR scanners, offline-capable apps, and real-time alert escalation — the tools transforming Nigerian estate security.',
    author:   'Tunde Adeyemi',
    role:     'Estate Management Consultant',
    date:     'April 14, 2025',
    readTime: '7 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    image:    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Modern office security technology',
  },
  {
    slug:     'areaconnect-2-launch',
    tag:      'Product',
    title:    'Introducing AreaConnect 2.0 — the full community platform',
    excerpt:  "We shipped the marketplace, polls, events board, resident lounge, and a redesigned mobile app all in one release. Here's the full story.",
    author:   'Michael Orizu',
    role:     'CEO, AreaConnect',
    date:     'April 1, 2025',
    readTime: '3 min read',
    initials: 'MO',
    avatarBg: 'bg-brand-500',
    image:    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Product launch presentation',
  },
];

const NIGERIA_EVENTS = [
  {
    id:       'lagos-housing-demand-2026',
    category: 'Real Estate',
    categoryColor: 'bg-brand-50 text-brand-700 border border-brand-100',
    title:    'Lagos housing demand surges in Lekki, Ibeju-Lekki corridor amid new infrastructure push',
    excerpt:  "The Lekki-Epe Expressway expansion and the upcoming Dangote Refinery township developments have triggered a fresh wave of gated estate demand across the Ibeju-Lekki axis, with average service charges rising 22% YoY.",
    date:     'June 12, 2026',
    source:   'BusinessDay NG',
    image:    'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Lagos aerial cityscape',
    location: 'Lagos, Nigeria',
  },
  {
    id:       'fha-proptech-partnership',
    category: 'PropTech',
    categoryColor: 'bg-blue-50 text-blue-700 border border-blue-100',
    title:    'Federal Housing Authority signs MOU with PropTech startups to digitise estate administration nationwide',
    excerpt:  "The FHA's new Digital Estate Management Initiative will require all FHA-managed estates to adopt digital gate management, dues collection, and resident communication platforms by Q1 2027.",
    date:     'June 8, 2026',
    source:   'Punch Newspaper',
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Modern government building Nigeria',
    location: 'Abuja, Nigeria',
  },
  {
    id:       'abuja-estate-security-upgrade',
    category: 'Security',
    categoryColor: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
    title:    "Abuja estate managers move to biometric and QR-based access after FCT's rising security concerns",
    excerpt:  "Following a series of security incidents in Maitama and Asokoro in early 2026, estate associations across the FCT are fast-tracking upgrades to digital visitor verification and real-time panic alert systems.",
    date:     'June 5, 2026',
    source:   'The Cable',
    image:    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Modern residential estate security gate',
    location: 'Abuja, Nigeria',
  },
  {
    id:       'paystack-estate-payments',
    category: 'Fintech',
    categoryColor: 'bg-amber-50 text-amber-700 border border-amber-100',
    title:    'Paystack reports 3× growth in estate management payment volumes as digital levy collection gains adoption',
    excerpt:  "Paystack's SMB report for Q1 2026 shows property management and estate levy collection among its fastest-growing merchant categories in Nigeria, with over ₦14B processed through community management platforms.",
    date:     'May 28, 2026',
    source:   'TechCabal',
    image:    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80',
    imageAlt: 'Mobile fintech payment Nigeria',
    location: 'Lagos, Nigeria',
  },
];

const TAG_COLORS = {
  Guide:     'bg-brand-50 text-brand-700 border border-brand-100',
  Security:  'bg-blue-50 text-blue-700 border border-blue-100',
  Payments:  'bg-indigo-50 text-indigo-700 border border-indigo-100',
  Community: 'bg-violet-50 text-violet-700 border border-violet-100',
  Product:   'bg-amber-50 text-amber-700 border border-amber-100',
};

const ALL_TAGS = ['All', ...Object.keys(TAG_COLORS)];

/* ── Component ───────────────────────────────────────────────────────────── */

export default function Blog() {
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeTag, setActiveTag]   = useState('All');

  const featured = POSTS[0];
  const filtered = POSTS.slice(1).filter(p => activeTag === 'All' || p.tag === activeTag);

  return (
    <div className="pt-16 bg-[#F8FAFC]">

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Modern estate Nigeria"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/60" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-20 sm:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 bg-brand-500/15 border border-brand-500/30 text-brand-400 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-5">
              Insights & News
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] mb-5 max-w-3xl">
              Estate management<br />
              <span className="text-brand-400">insights for Nigeria</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl max-w-xl leading-relaxed">
              Guides, product updates, and the latest in Nigerian real estate — from the AreaConnect team.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED POST ─────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">Featured article</p>
            <div className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <div className="flex flex-col lg:flex-row">

                {/* Photo */}
                <div className="lg:w-[520px] h-64 lg:h-auto flex-shrink-0 relative overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm ${TAG_COLORS[featured.tag]}`}>
                      {featured.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-7 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock size={11} />{featured.readTime}</span>
                    <span>·</span>
                    <span>{featured.date}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-7 max-w-lg">{featured.excerpt}</p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${featured.avatarBg} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                        {featured.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{featured.author}</div>
                        <div className="text-xs text-slate-400">{featured.role}</div>
                      </div>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/25">
                      Read article <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NIGERIA SPOTLIGHT ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
                  <TrendingUp size={15} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Nigeria Spotlight</h2>
                  <p className="text-xs text-slate-400">Latest real estate & PropTech news</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-100 rounded-full px-3 py-1 font-medium">
                June 2026
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {NIGERIA_EVENTS.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 60}>
                <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col h-full">

                  {/* Photo */}
                  <div className="h-40 overflow-hidden flex-shrink-0 relative">
                    <img
                      src={ev.image}
                      alt={ev.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="flex items-center gap-1 text-white/90 text-[10px] font-semibold">
                        <MapPin size={9} /> {ev.location}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ev.categoryColor}`}>
                        {ev.category}
                      </span>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar size={9} /> {ev.date}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900 leading-snug mb-2 flex-1">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-3">
                      {ev.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                      <span className="text-[10px] text-slate-400 font-medium">{ev.source}</span>
                      <a href="#" className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 hover:text-brand-500 transition-colors">
                        Read <ExternalLink size={9} />
                      </a>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-black text-slate-900">More articles</h2>

              {/* Category filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {ALL_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 border ${
                      activeTag === tag
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <Reveal>
              <div className="text-center py-16 text-slate-400">
                <p className="text-sm">No articles in this category yet.</p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70}>
                  <div className="group bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full cursor-pointer">

                    {/* Photo */}
                    <div className="h-48 overflow-hidden flex-shrink-0 relative">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${TAG_COLORS[post.tag]}`}>
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                        <span>·</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-black text-slate-900 leading-snug mb-2.5 text-[15px] flex-1">{post.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${post.avatarBg} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0`}>
                            {post.initials}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-700">{post.author}</div>
                            <div className="text-[10px] text-slate-400">{post.role}</div>
                          </div>
                        </div>
                        <a href="#" className="text-brand-600 hover:text-brand-500 transition-colors">
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>

                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1400&q=80"
            alt="Nigeria city"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-800" />
        </div>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={20} className="text-brand-400" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Stay in the loop</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Get new articles, Nigeria real estate news, and product updates delivered to your inbox — no spam, ever.
            </p>
          </Reveal>
          <Reveal delay={100}>
            {subscribed ? (
              <div className="flex items-center justify-center gap-3 text-brand-400 font-semibold">
                <div className="w-8 h-8 bg-brand-500/10 rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                You're subscribed! Thanks for joining.
              </div>
            ) : (
              <form
                className="flex flex-col sm:flex-row gap-3"
                onSubmit={e => { e.preventDefault(); setSubscribed(true); }}
              >
                <input
                  type="email"
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-500/30 flex-shrink-0 text-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-xs text-slate-600 mt-4">No spam. Unsubscribe at any time.</p>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
