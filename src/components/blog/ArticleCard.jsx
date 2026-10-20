import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';
import ArticleCover from './ArticleCover';
import { catMeta, formatDate } from '../../lib/blog';

export default function ArticleCard({ a }) {
  return (
    <Link to={`/blog/${a.slug}`} className="group h-full flex flex-col rounded-[1.5rem] bg-white border border-slate-200/80 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
      <ArticleCover category={a.category} seed={a.slug} className="aspect-[16/9]" />
      <div className="flex-1 flex flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
          <span className={`rounded-full px-2 py-0.5 font-semibold ${catMeta(a.category).chip}`}>{a.category}</span>
          <span className="inline-flex items-center gap-1"><Clock size={11} /> {a.readMinutes} min</span>
        </div>
        <h3 className="text-[15px] font-semibold text-slate-900 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">{a.title}</h3>
        <p className="mt-2 text-[13px] text-slate-500 leading-relaxed line-clamp-3 flex-1">{a.excerpt}</p>
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>{formatDate(a.publishedAt)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">Read <ArrowUpRight size={13} /></span>
        </div>
      </div>
    </Link>
  );
}
