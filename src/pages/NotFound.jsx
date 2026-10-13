import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore AreaConnect's estate management platform for Nigerian communities."
        path="/404"
        noindex
      />
      <section className="relative bg-slate-900 pt-28 pb-24 sm:pt-40 sm:pb-32 overflow-hidden noise">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">404</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-5">Page not found</h1>
          <p className="text-slate-400 text-lg mb-10">
            The page you're looking for has moved or never existed.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Go to homepage
            </Link>
            <Link to="/features" className="bg-white/10 hover:bg-white/15 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              See features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
