import { useState } from 'react';
import { ArrowRight, Clock, Mail } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

const POSTS = [
  {
    slug:    'digitalising-estate-management-nigeria',
    tag:     'Guide',
    title:   'The complete guide to digitalising your estate management in Nigeria',
    excerpt: 'From paper log books to automated payment collection — a practical step-by-step guide for estate managers ready to modernise.',
    author:  'Tunde Adeyemi',
    date:    'June 3, 2025',
    readTime:'8 min read',
    color:   'bg-brand-500',
    headerGradient: 'from-brand-500 to-brand-700',
    initials:'TA',
  },
  {
    slug:    'visitor-management-best-practices',
    tag:     'Security',
    title:   '7 visitor management best practices for gated communities',
    excerpt: 'How top-performing estate managers use digital visitor passes, blacklists, and entry logs to keep their communities safe.',
    author:  'Emeka Obi',
    date:    'May 22, 2025',
    readTime:'6 min read',
    color:   'bg-blue-500',
    headerGradient: 'from-blue-500 to-blue-700',
    initials:'EO',
  },
  {
    slug:    'collecting-estate-dues-paystack',
    tag:     'Payments',
    title:   'How to collect estate dues online with Paystack — without a developer',
    excerpt: 'A non-technical walkthrough of setting up automated estate levy collection, reminders, and reconciliation reports.',
    author:  'Ngozi Okonkwo',
    date:    'May 10, 2025',
    readTime:'5 min read',
    color:   'bg-indigo-500',
    headerGradient: 'from-indigo-500 to-indigo-700',
    initials:'NO',
  },
  {
    slug:    'building-community-in-your-estate',
    tag:     'Community',
    title:   'Building community in your estate — more than just paying dues',
    excerpt: "The estates that thrive are the ones where residents feel connected. Here's how technology can help build that bond.",
    author:  'Amina Suleiman',
    date:    'April 28, 2025',
    readTime:'4 min read',
    color:   'bg-violet-500',
    headerGradient: 'from-violet-500 to-violet-700',
    initials:'AS',
  },
  {
    slug:    'security-guard-technology-2025',
    tag:     'Security',
    title:   'What modern security guard technology looks like in 2025',
    excerpt: 'QR scanners, offline-capable apps, and real-time alert escalation — the tools transforming Nigerian estate security.',
    author:  'Tunde Adeyemi',
    date:    'April 14, 2025',
    readTime:'7 min read',
    color:   'bg-brand-500',
    headerGradient: 'from-brand-400 to-emerald-700',
    initials:'TA',
  },
  {
    slug:    'areaconnect-2-launch',
    tag:     'Product',
    title:   'Introducing AreaConnect 2.0 — the full community platform',
    excerpt: "We shipped the marketplace, polls, events board, resident lounge, and a redesigned mobile app all in one release. Here's the full story.",
    author:  'Ngozi Okonkwo',
    date:    'April 1, 2025',
    readTime:'3 min read',
    color:   'bg-indigo-500',
    headerGradient: 'from-indigo-400 to-blue-700',
    initials:'NO',
  },
];

const TAG_COLORS = {
  Guide:     'bg-brand-50 text-brand-700 border border-brand-100',
  Security:  'bg-blue-50 text-blue-700 border border-blue-100',
  Payments:  'bg-indigo-50 text-indigo-700 border border-indigo-100',
  Community: 'bg-violet-50 text-violet-700 border border-violet-100',
  Product:   'bg-amber-50 text-amber-700 border border-amber-100',
};

export default function Blog() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Blog"
        title={<>Insights for <span className="gradient-text-brand">estate managers</span></>}
        subtitle="Guides, product updates, and ideas from the AreaConnect team — all about making estate management better."
      />

      {/* ── FEATURED POST ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-0">

                {/* Gradient image placeholder */}
                <div className={`lg:w-80 h-56 lg:h-auto flex-shrink-0 bg-gradient-to-br ${featured.headerGradient} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 dot-grid opacity-20" />
                  <div className="relative text-center px-8">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <div className="text-white/70 text-xs font-bold uppercase tracking-widest">Featured</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${TAG_COLORS[featured.tag]}`}>{featured.tag}</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Clock size={11} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-snug mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6 max-w-xl">{featured.excerpt}</p>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${featured.color} flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
                        {featured.initials}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{featured.author}</div>
                        <div className="text-xs text-slate-400">{featured.date}</div>
                      </div>
                    </div>
                    <a href="#" className="btn-primary text-sm flex-shrink-0">
                      Read article <ArrowRight size={14} />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── POSTS GRID ───────────────────────────────────────────────────── */}
      <section className="pb-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex items-center justify-between mb-10 pt-8">
              <h2 className="text-2xl font-black text-slate-900">More articles</h2>
              <span className="text-sm text-slate-400">{rest.length} articles</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70}>
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden h-full">

                  {/* Gradient header */}
                  <div className={`h-40 bg-gradient-to-br ${post.headerGradient} flex items-center justify-center relative overflow-hidden flex-shrink-0`}>
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="relative w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                      </svg>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${TAG_COLORS[post.tag]}`}>{post.tag}</span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 leading-snug mb-3 flex-1 text-[15px]">{post.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-5">{post.excerpt}</p>

                    {/* Author footer */}
                    <div className="flex items-center gap-2.5 pt-4 border-t border-slate-50">
                      <div className={`w-7 h-7 rounded-full ${post.color} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0`}>
                        {post.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-700">{post.author}</div>
                        <div className="text-[10px] text-slate-400">{post.date}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail size={20} className="text-brand-400" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Stay in the loop</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Get new articles and product updates delivered to your inbox — no spam, ever.
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
