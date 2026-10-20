import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, Check, ArrowUpRight, Sparkles, Loader2 } from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop, Pill } from '../components/ui/Modern';
import ArticleCover from '../components/blog/ArticleCover';
import ArticleCard from '../components/blog/ArticleCard';
import { API, CATEGORIES, catMeta, fetchArticles, formatDate, preload } from '../lib/blog';

const TABS = ['All', ...Object.keys(CATEGORIES)];
const PAGE = 12;

export default function Blog() {
  const initial = preload('blog');
  const [tab, setTab] = useState('All');
  const [items, setItems] = useState(initial?.items?.slice(0, PAGE + 1) || []);
  const [pages, setPages] = useState(initial ? Math.ceil(initial.total / PAGE) : 1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [sub, setSub] = useState('idle');
  const first = useRef(true);

  // Load the first page on mount (refreshes the prerendered list) and whenever the tab changes.
  useEffect(() => {
    let live = true;
    if (!(first.current && initial)) setLoading(true);
    first.current = false;
    setError('');
    fetchArticles({ category: tab, page: 1, limit: PAGE + (tab === 'All' ? 1 : 0) })
      .then(d => { if (!live) return; setItems(d.items); setPages(d.pages); setPage(1); })
      .catch(() => live && !initial && setError('Could not load articles right now.'))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const d = await fetchArticles({ category: tab, page: page + 1, limit: PAGE });
      setItems(x => [...x, ...d.items.filter(n => !x.some(o => o.slug === n.slug))]);
      setPage(page + 1);
      setPages(d.pages);
    } catch {
      setError('Could not load more articles.');
    } finally {
      setLoading(false);
    }
  };

  const subscribe = async (e) => {
    e.preventDefault();
    setSub('sending');
    try {
      const res = await fetch(`${API}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Blog subscriber', email, subject: 'Newsletter sign-up', message: `Please add ${email} to the AreaConnect blog updates.` }),
      });
      if (!res.ok) throw new Error();
      setSub('done');
    } catch {
      setSub('error');
    }
  };

  const showFeatured = tab === 'All' && items.length > 0;
  const featured = showFeatured ? items[0] : null;
  const grid = showFeatured ? items.slice(1) : items;

  return (
    <div className="overflow-x-clip">
      <Seo
        title="Blog — Estate Management Insights for Nigeria"
        description="Practical guides on visitor management, estate dues, security and community for Nigerian estate managers and residents — new articles every day from AreaConnect."
        path="/blog"
        keywords="estate management blog Nigeria, visitor management guide, estate dues collection, gated community security, service charge Nigeria"
      />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-12 sm:pt-32 sm:pb-14">
        <HeroBackdrop />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div className="max-w-2xl">
            <Reveal><Pill badge="Daily">A new article every day</Pill></Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 text-[2.1rem] sm:text-[2.75rem] lg:text-[3.2rem] font-extrabold tracking-[-0.03em] leading-[1.08] text-slate-900">
                Insights for{' '}
                <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">smarter estates.</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15px] sm:text-base text-slate-500 leading-relaxed max-w-xl">
                Practical guides on visitors, dues, security and community for Nigerian estate managers and residents.
              </p>
            </Reveal>
          </div>

          {featured && (
            <Reveal delay={200}>
              <Link to={`/blog/${featured.slug}`} className="group mt-10 grid lg:grid-cols-[1.1fr_1fr] rounded-[1.75rem] overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/15">
                <ArticleCover category={featured.category} seed={featured.slug} size="lg" className="aspect-[16/9] lg:aspect-auto lg:min-h-[340px]" />
                <div className="relative p-6 sm:p-8 flex flex-col">
                  <div className="about-aurora absolute -top-16 -right-10 w-56 h-56 bg-brand-500/20 rounded-full blur-3xl" />
                  <div className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-300">
                    <Sparkles size={12} /> Latest · {featured.category}
                  </div>
                  <h2 className="relative mt-3 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug group-hover:text-brand-200 transition-colors">{featured.title}</h2>
                  <p className="relative mt-3 text-sm text-slate-400 leading-relaxed flex-1">{featured.excerpt}</p>
                  <div className="relative mt-6 flex items-center justify-between gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-3"><span>{formatDate(featured.publishedAt)}</span><span className="inline-flex items-center gap-1"><Clock size={12} />{featured.readMinutes} min read</span></span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-slate-900 font-semibold px-4 py-2 group-hover:bg-brand-400 transition-colors">
                      Read article <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── ARTICLES ─────────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
            <div>
              <Reveal><Eyebrow>All articles</Eyebrow></Reveal>
              <Reveal delay={60}><h2 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Browse by topic.</h2></Reveal>
            </div>
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap">
              {TABS.map(t => {
                const Icon = t === 'All' ? null : catMeta(t).icon;
                return (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className={`flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium transition-all ${tab === t ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}>
                    {Icon && <Icon size={13} />} {t}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">{error}</p>}

          {grid.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {grid.map(a => <ArticleCard key={a.slug} a={a} />)}
            </div>
          ) : !loading && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No articles here yet — check back tomorrow.
            </div>
          )}

          {loading && <div className="flex justify-center py-10 text-slate-400"><Loader2 className="animate-spin" size={20} /></div>}

          {!loading && page < pages && (
            <div className="mt-10 flex justify-center">
              <button type="button" onClick={loadMore}
                className="rounded-full border border-slate-300 bg-white hover:border-slate-900 hover:bg-slate-900 hover:text-white text-slate-800 text-sm font-semibold px-6 py-2.5 transition-all">
                Load more articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white px-4 sm:px-6">
        <Reveal>
          <div className="relative max-w-4xl mx-auto rounded-[2rem] p-px overflow-hidden">
            <div className="about-glow-border absolute inset-[-50%]" />
            <div className="relative rounded-[calc(2rem-1px)] bg-slate-950 px-6 py-12 sm:px-12 sm:py-14 overflow-hidden">
              <div className="absolute inset-0 dot-grid opacity-20" />
              <div className="relative max-w-lg mx-auto text-center">
                <span className="inline-flex w-11 h-11 rounded-2xl bg-white/10 border border-white/15 text-brand-300 items-center justify-center"><Mail size={18} /></span>
                <h2 className="mt-5 text-2xl sm:text-3xl font-bold tracking-tight text-white">Get new articles in your inbox.</h2>
                <p className="mt-3 text-sm sm:text-[15px] text-slate-400">Guides and product updates for estate managers. No spam, ever.</p>
                {sub === 'done' ? (
                  <div className="about-feed-in mt-7 inline-flex items-center gap-2 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-sm font-semibold px-4 py-2.5">
                    <Check size={15} strokeWidth={3} /> You’re on the list — thanks!
                  </div>
                ) : (
                  <form onSubmit={subscribe} className="mt-7 flex flex-col sm:flex-row gap-2 rounded-full sm:bg-white/5 sm:border sm:border-white/10 sm:p-1.5">
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                      className="flex-1 rounded-full bg-white/5 sm:bg-transparent border border-white/10 sm:border-0 px-4 py-3 sm:py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-brand-500/30" />
                    <button type="submit" disabled={sub === 'sending'}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-5 py-2.5 transition-colors disabled:opacity-60">
                      {sub === 'sending' ? 'Subscribing…' : <>Subscribe <ArrowUpRight size={14} /></>}
                    </button>
                  </form>
                )}
                {sub === 'error' && <p className="mt-3 text-xs text-rose-400">Couldn’t subscribe right now — please try again.</p>}
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
