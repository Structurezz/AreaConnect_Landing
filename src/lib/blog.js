import { BookOpen, Shield, Wallet, Users, LayoutDashboard, Sparkles } from 'lucide-react';

export const API = import.meta.env.VITE_API_URL || 'https://areaconnectapi-production.up.railway.app/api';

export const CATEGORIES = {
  Guide:      { icon: BookOpen,        chip: 'bg-brand-50 text-brand-700',   from: '#059669', to: '#0d9488' },
  Security:   { icon: Shield,          chip: 'bg-sky-50 text-sky-700',       from: '#0284c7', to: '#4f46e5' },
  Payments:   { icon: Wallet,          chip: 'bg-amber-50 text-amber-700',   from: '#d97706', to: '#ea580c' },
  Community:  { icon: Users,           chip: 'bg-violet-50 text-violet-700', from: '#7c3aed', to: '#db2777' },
  Management: { icon: LayoutDashboard, chip: 'bg-slate-100 text-slate-700',  from: '#334155', to: '#0f172a' },
  Product:    { icon: Sparkles,        chip: 'bg-indigo-50 text-indigo-700', from: '#4f46e5', to: '#10b981' },
};
export const catMeta = (c) => CATEGORIES[c] || CATEGORIES.Guide;

// Articles are fetched from the API at build time and injected for the
// prerendered pages (see scripts/prerender.mjs); in the browser they arrive via
// window.__PRELOAD__ so the first paint already has content.
export function preload(key) {
  const src = typeof window === 'undefined' ? globalThis.__PRELOAD__ : window.__PRELOAD__;
  return src?.[key];
}

export const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export async function fetchArticles({ category, page = 1, limit = 12 } = {}) {
  const q = new URLSearchParams({ page, limit });
  if (category && category !== 'All') q.set('category', category);
  const res = await fetch(`${API}/blog?${q}`);
  if (!res.ok) throw new Error('Could not load articles');
  return res.json();
}

export async function fetchArticle(slug) {
  const res = await fetch(`${API}/blog/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Could not load article');
  return res.json();
}
