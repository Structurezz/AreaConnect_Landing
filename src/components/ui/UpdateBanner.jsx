import { useEffect, useRef, useState } from 'react';
import { RefreshCw, X } from 'lucide-react';

const POLL_INTERVAL_MS = 2 * 60 * 1000;
const AUTO_RELOAD_MS = 20 * 1000;

/* eslint-disable no-undef */
const CURRENT_VERSION =
  typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : null;
/* eslint-enable no-undef */

export default function UpdateBanner() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const checkingRef = useRef(false);
  const latestVersionRef = useRef(CURRENT_VERSION);

  useEffect(() => {
    if (!CURRENT_VERSION || import.meta.env.DEV) return;

    const check = async () => {
      if (checkingRef.current) return;
      checkingRef.current = true;
      try {
        const res = await fetch('/version.json?t=' + Date.now(), {
          cache: 'no-store',
          credentials: 'omit',
        });
        if (!res.ok) return;
        const data = await res.json();
        if (
          data &&
          data.version &&
          data.version !== CURRENT_VERSION &&
          data.version !== latestVersionRef.current
        ) {
          latestVersionRef.current = data.version;
          setUpdateAvailable(true);
          setDismissed(false);
        }
      } catch (_) {
        /* network hiccup — ignore */
      } finally {
        checkingRef.current = false;
      }
    };

    check();
    const interval = setInterval(check, POLL_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') check();
    };
    window.addEventListener('focus', check);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', check);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  useEffect(() => {
    if (!updateAvailable || dismissed) return;
    const t = setTimeout(() => {
      window.location.reload();
    }, AUTO_RELOAD_MS);
    return () => clearTimeout(t);
  }, [updateAvailable, dismissed]);

  if (!updateAvailable || dismissed) return null;

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 bottom-4 sm:bottom-6 z-[60] px-3 w-full sm:w-auto max-w-md pointer-events-none"
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-auto flex items-center gap-2.5 bg-slate-900 text-white rounded-2xl shadow-2xl shadow-slate-900/40 border border-white/10 pl-3 pr-2 py-2 animate-fade-in-up">
        <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center flex-shrink-0">
          <RefreshCw size={14} className="text-brand-300 animate-spin-slow" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold leading-tight">New version available</div>
          <div className="text-[10.5px] text-white/60 leading-tight mt-0.5">
            Refreshing automatically…
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-1 bg-brand-500 hover:bg-brand-400 text-white font-bold text-[12px] px-3 py-2 rounded-xl active:scale-95 transition-all flex-shrink-0"
        >
          Refresh
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="w-8 h-8 rounded-xl text-white/50 hover:text-white hover:bg-white/5 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
