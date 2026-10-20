import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/layout/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import IntroVideo, { INTRO_KEY } from './components/ui/IntroVideo';
import UpdateBanner from './components/ui/UpdateBanner';
import Footer from './components/layout/Footer';
import { useVisitBeacon } from './hooks/useVisitBeacon';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';
import Security from './pages/Security';
import ProductAdmin from './pages/ProductAdmin';
import ProductMates from './pages/ProductMates';
import ProductGuard from './pages/ProductGuard';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    // Wait a tick so the target page has rendered before jumping to the anchor.
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

// Fires the GA4 pageview + our own /analytics/visit beacon on every route
// change. Mounted inside BrowserRouter so useLocation works.
function Analytics() {
  useVisitBeacon();
  return null;
}

// The router is supplied by the caller: BrowserRouter in main.jsx, and
// StaticRouter in entry-server.jsx when pages are prerendered at build time.
export default function App() {
  const [loading, setLoading] = useState(true);
  const [intro, setIntro] = useState(false);
  const handleDone = useCallback(() => setLoading(false), []);
  const introDone = useCallback(() => { setIntro(false); setLoading(false); }, []);

  // First-time visitors get the video intro instead of the loader. Decided on
  // the client so the prerendered HTML stays identical for everyone.
  useEffect(() => {
    let seen = true;
    try { seen = !!localStorage.getItem(INTRO_KEY); } catch { /* storage blocked */ }
    const conn = navigator.connection;
    const lowData = conn && (conn.saveData || /2g/.test(conn.effectiveType || ''));
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !lowData && !reduced) setIntro(true);
  }, []);

  return (
    <>
      {intro ? <IntroVideo onDone={introDone} /> : loading && <LoadingScreen onDone={handleDone} />}
      <ScrollToTop />
      <Analytics />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/features"    element={<Features />} />
          <Route path="/pricing"     element={<Pricing />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/blog/:slug"  element={<BlogArticle />} />
          <Route path="/careers"     element={<Careers />} />
          <Route path="/press"       element={<Press />} />
          <Route path="/privacy"     element={<Privacy />} />
          <Route path="/terms"       element={<Terms />} />
          <Route path="/cookies"     element={<Cookies />} />
          <Route path="/security"    element={<Security />} />
          <Route path="/admin"       element={<ProductAdmin />} />
          <Route path="/mates"       element={<ProductMates />} />
          <Route path="/guard"       element={<ProductGuard />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <UpdateBanner />
    </>
  );
}
