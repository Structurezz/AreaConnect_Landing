import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/* eslint-disable no-undef */
const API_URL = typeof __ANALYTICS_API_URL__ !== 'undefined'
  ? __ANALYTICS_API_URL__
  : (import.meta.env.VITE_API_URL || '');
const GA_ID = typeof __GA_MEASUREMENT_ID__ !== 'undefined' ? __GA_MEASUREMENT_ID__ : '';
/* eslint-enable no-undef */

// Session id — short-lived, lives in sessionStorage so a reload keeps it
// but a new tab/visit starts fresh.
function getSessionId() {
  const KEY = 'ac_s';
  try {
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

function readUtm() {
  try {
    const q = new URLSearchParams(window.location.search);
    return {
      source:   q.get('utm_source')   || '',
      medium:   q.get('utm_medium')   || '',
      campaign: q.get('utm_campaign') || '',
      term:     q.get('utm_term')     || '',
      content:  q.get('utm_content')  || '',
    };
  } catch {
    return { source: '', medium: '', campaign: '', term: '', content: '' };
  }
}

function sendVisit(path) {
  if (!API_URL) return;

  const payload = {
    path,
    referrer:  document.referrer || '',
    utm:       readUtm(),
    language:  navigator.language || '',
    timezone:  (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { return ''; } })(),
    screen:    `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    sessionId: getSessionId(),
  };

  const url = `${API_URL}/analytics/visit`;
  const body = JSON.stringify(payload);

  // Prefer sendBeacon so the request survives a navigation. Fall back to
  // fetch keepalive for browsers that forbid non-CORS beacons on JSON type.
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: 'application/json' });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch { /* fall through */ }
  try {
    fetch(url, {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      credentials: 'omit',
      mode: 'cors',
    }).catch(() => {});
  } catch { /* best-effort */ }
}

function trackGa(path) {
  if (!GA_ID) return;
  const g = window.gtag;
  if (typeof g === 'function') {
    g('config', GA_ID, { page_path: path, anonymize_ip: true });
  }
}

/**
 * Fires an analytics pageview beacon on every route change.
 * Also pings GA4 if a measurement ID is configured.
 */
export function useVisitBeacon() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (import.meta.env.DEV) return; // don't pollute analytics from dev
    const full = pathname + (search || '');
    sendVisit(full);
    trackGa(full);
  }, [pathname, search]);
}
