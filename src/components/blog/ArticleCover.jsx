import { useState } from 'react';
import { catMeta } from '../../lib/blog';

// Placeholder photo per article from Lorem Picsum, seeded by the slug so each
// article always gets the same image. Falls back to the category gradient.
const photo = (seed, w, h) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export default function ArticleCover({ category, seed, className = '', size = 'md' }) {
  const m = catMeta(category);
  const Icon = m.icon;
  const big = size === 'lg';
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}>
      {/* gradient art — shown while the photo loads, or if it fails */}
      <div className="absolute inset-0 opacity-25"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)', backgroundSize: big ? '40px 40px' : '28px 28px' }} />
      <Icon className="absolute right-[8%] bottom-[10%] text-white/25" size={big ? 180 : 96} strokeWidth={1.25} />

      {seed && !failed && (
        <img
          src={photo(seed, big ? 1600 : 800, big ? 900 : 450)}
          alt=""
          loading={big ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      {/* category tint keeps covers on-brand */}
      {seed && !failed && (
        <div className="absolute inset-0 mix-blend-multiply opacity-30" style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

      <div className={`absolute left-5 top-5 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur border border-white/25 text-white ${big ? 'w-12 h-12' : 'w-10 h-10'}`}>
        <Icon size={big ? 20 : 17} />
      </div>
    </div>
  );
}
