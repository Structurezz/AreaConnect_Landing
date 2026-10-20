import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Lightbulb, Share2, Link2, Check, Loader2, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal } from '../components/ui/Reveal';
import { PrimaryButton } from '../components/ui/Modern';
import ArticleCover from '../components/blog/ArticleCover';
import ArticleCard from '../components/blog/ArticleCard';
import { catMeta, fetchArticle, formatDate, preload } from '../lib/blog';

// **bold** → <strong>; everything else stays plain text (no HTML injection).
function Inline({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith('**') && p.endsWith('**')
    ? <strong key={i} className="font-semibold text-slate-900">{p.slice(2, -2)}</strong>
    : <Fragment key={i}>{p}</Fragment>));
}

const slugId = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function Block({ b }) {
  switch (b.type) {
    case 'h2': return <h2 id={slugId(b.text)} className="scroll-mt-28 mt-12 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-slate-900"><Inline text={b.text} /></h2>;
    case 'h3': return <h3 className="mt-8 mb-3 text-lg font-semibold text-slate-900"><Inline text={b.text} /></h3>;
    case 'ul':
    case 'ol': {
      const Tag = b.type;
      return (
        <Tag className="my-5 space-y-3">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              {b.type === 'ol'
                ? <span className="mt-0.5 w-6 h-6 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                : <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />}
              <span><Inline text={it} /></span>
            </li>
          ))}
        </Tag>
      );
    }
    case 'quote': return <blockquote className="my-6 border-l-4 border-brand-400 pl-5 text-lg text-slate-700 italic"><Inline text={b.text} /></blockquote>;
    case 'tip': return (
      <div className="my-8 rounded-2xl bg-brand-50 border border-brand-100 p-5 flex gap-3">
        <span className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center flex-shrink-0"><Lightbulb size={15} /></span>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-700 mb-1">Pro tip</div>
          <p className="text-[15px] text-brand-900 leading-relaxed"><Inline text={b.text} /></p>
        </div>
      </div>
    );
    default: return <p className="my-4"><Inline text={b.text} /></p>;
  }
}

export default function BlogArticle() {
  const { slug } = useParams();
  const pre = preload('article');
  const initial = pre?.article?.slug === slug ? pre : null;
  const [data, setData] = useState(initial);
  const [status, setStatus] = useState(initial ? 'ready' : 'loading');
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (data?.article?.slug === slug) return;
    let live = true;
    setStatus('loading');
    fetchArticle(slug)
      .then(d => { if (!live) return; if (!d) setStatus('missing'); else { setData(d); setStatus('ready'); } })
      .catch(() => live && setStatus('error'));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById('article-body');
      if (!el) return;
      const r = el.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, -r.top / (r.height - window.innerHeight * 0.6))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [status]);

  if (status === 'loading') {
    return <div className="min-h-[70vh] flex items-center justify-center text-slate-400"><Loader2 className="animate-spin" size={22} /></div>;
  }
  if (status !== 'ready') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-24">
        <Seo title="Article not found" description="This article could not be found." path={`/blog/${slug}`} noindex />
        <h1 className="text-2xl font-bold text-slate-900">{status === 'missing' ? 'Article not found' : 'Could not load this article'}</h1>
        <p className="mt-2 text-sm text-slate-500">It may have moved, or there was a network problem.</p>
        <Link to="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600"><ArrowLeft size={14} /> Back to the blog</Link>
      </div>
    );
  }

  const { article: a, related } = data;
  const m = catMeta(a.category);
  const toc = a.body.filter(b => b.type === 'h2');
  const url = `https://areaconnect.pro/blog/${a.slug}`;
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: a.title, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    } catch { /* dismissed */ }
  };

  return (
    <div className="overflow-x-clip">
      <Seo
        title={a.title}
        description={a.seoDescription || a.excerpt}
        path={`/blog/${a.slug}`}
        image={`https://picsum.photos/seed/${encodeURIComponent(a.slug)}/1200/630`}
        keywords={(a.keywords || []).join(', ')}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.seoDescription || a.excerpt,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt || a.publishedAt,
          author: { '@type': 'Organization', name: 'AreaConnect' },
          publisher: { '@type': 'Organization', name: 'AreaConnect', logo: { '@type': 'ImageObject', url: 'https://areaconnect.pro/logo-512.png' } },
          mainEntityOfPage: url,
          image: `https://picsum.photos/seed/${encodeURIComponent(a.slug)}/1200/630`,
          keywords: (a.keywords || []).join(', '),
        }}
      />

      <div className="fixed top-0 inset-x-0 h-0.5 z-[60] pointer-events-none">
        <div className="h-full origin-left transition-transform duration-150" style={{ transform: `scaleX(${progress})`, background: m.from }} />
      </div>

      {/* ── HEADER ───────────────────────────────────────────────────── */}
      <header className="relative pt-24 sm:pt-28">
        <div className="max-w-3xl mx-auto px-5 sm:px-6">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
              <ArrowLeft size={14} /> All articles
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className={`rounded-full px-2.5 py-1 font-semibold ${m.chip}`}>{a.category}</span>
              <span>{formatDate(a.publishedAt)}</span>
              <span className="inline-flex items-center gap-1"><Clock size={12} />{a.readMinutes} min read</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-4 text-[1.9rem] sm:text-[2.5rem] font-extrabold tracking-[-0.025em] leading-[1.12] text-slate-900">{a.title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">{a.excerpt}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-6 flex items-center justify-between gap-4 border-y border-slate-100 py-4">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 40 40" fill="none"><path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" /><text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text></svg>
                </span>
                <div className="leading-tight">
                  <div className="text-[13px] font-semibold text-slate-900">{a.author}</div>
                  <div className="text-[11px] text-slate-400">AreaConnect blog</div>
                </div>
              </div>
              <button type="button" onClick={share} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 hover:border-slate-900 text-slate-700 text-xs font-semibold px-3.5 py-2 transition-colors">
                {copied ? <><Check size={13} /> Link copied</> : <><Share2 size={13} /> Share</>}
              </button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={240}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
            <ArticleCover category={a.category} seed={a.slug} size="lg" className="aspect-[21/9] rounded-[1.75rem]" />
          </div>
        </Reveal>
      </header>

      {/* ── BODY ─────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 grid lg:grid-cols-[1fr_220px] gap-12">
          <article id="article-body" className="min-w-0 max-w-[680px] text-[16.5px] sm:text-[17px] text-slate-600 leading-[1.8]">
            {a.body.map((b, i) => <Block key={i} b={b} />)}

            <div className="mt-12 relative rounded-[1.75rem] bg-slate-900 overflow-hidden p-6 sm:p-8">
              <div className="about-aurora absolute -top-16 -right-10 w-56 h-56 bg-brand-500/25 rounded-full blur-3xl" />
              <div className="relative">
                <div className="text-white text-lg font-semibold leading-snug">Run your estate on AreaConnect.</div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">Visitor passes, dues, security and community in one platform — start with a 14-day free trial.</p>
                <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
                  <PrimaryButton to="https://area-connector.areaconnect.pro/register" dark={false}>Start free trial</PrimaryButton>
                  <Link to="/contact#book-demo" className="inline-flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 text-white text-sm font-semibold px-5 py-2.5 transition-colors">Book a demo</Link>
                </div>
              </div>
            </div>
          </article>

          {toc.length > 2 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 mb-3">In this article</div>
                <nav className="space-y-1 border-l border-slate-200">
                  {toc.map(h => (
                    <a key={h.text} href={`#${slugId(h.text)}`} className="block -ml-px border-l border-transparent hover:border-brand-500 pl-3 py-1 text-[13px] text-slate-500 hover:text-slate-900 transition-colors leading-snug">
                      {h.text.replace(/\*\*/g, '')}
                    </a>
                  ))}
                </nav>
                <button type="button" onClick={share} className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900">
                  <Link2 size={13} /> {copied ? 'Copied' : 'Copy link'}
                </button>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────────────────────── */}
      {related?.length > 0 && (
        <section className="py-14 sm:py-20 bg-slate-50">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">More on {a.category.toLowerCase()}</h2>
              <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">All articles <ArrowRight size={14} /></Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(r => <ArticleCard key={r.slug} a={r} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
