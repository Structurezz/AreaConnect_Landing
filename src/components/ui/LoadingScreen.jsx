import Wordmark from './Wordmark';
import { useEffect, useState } from 'react';

// Branded loading: the app logo breathing inside a progress ring, with phrases
// that describe what's loading on the current page. Matches the loaders in the
// estate manager, residents and security apps.
const BRAND = {
  logo: '/icon-192.png',
  mark: 'AC',
  color: '#10B981',
  dark: '#047857',
  name: ['Area', 'Connector'],
  tagline: 'Estate management, connected',
  fallback: ['Getting things ready', 'Opening AreaConnector'],
};

// [path prefix, phrases] — first match wins
const PAGE_PHRASES = [
  ['/features', ['Loading features', 'Setting up the tour']],
  ['/pricing', ['Loading plans', 'Tallying prices']],
  ['/about', ['Loading our story', 'Meeting the team']],
  ['/contact', ['Opening contact', 'Finding a free slot']],
  ['/blog', ['Loading articles', 'Fetching the latest reads']],
  ['/careers', ['Loading open roles']],
  ['/press', ['Loading press kit']],
  ['/security', ['Loading security details']],
  ['/privacy', ['Loading policy']],
  ['/terms', ['Loading terms']],
  ['/cookies', ['Loading policy']],
  ['/admin', ['Opening the admin console']],
  ['/mates', ['Opening AreaMates', 'Gathering your neighbours']],
  ['/guard', ['Opening the guard app', 'Checking the gate']],
];

const HOME_PHRASES = ['Opening AreaConnector', 'Connecting your estate', 'Checking the gate', 'Almost there'];

function phrasesForPath() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  if (path === '/') return HOME_PHRASES;
  const hit = PAGE_PHRASES.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`));
  return hit ? hit[1] : BRAND.fallback;
}

const CSS = `
@keyframes acl-spin { to { transform: rotate(360deg); } }
@keyframes acl-breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes acl-glow { 0%,100% { opacity: .18; transform: scale(.85); } 50% { opacity: .38; transform: scale(1.05); } }
@keyframes acl-phrase { 0% { opacity: 0; transform: translateY(4px); } 12%,88% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(-4px); } }
@keyframes acl-dots { 0%,20% { opacity: .2; } 50% { opacity: 1; } 100% { opacity: .2; } }
@keyframes acl-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
`;

function Logo({ size }) {
  const [broken, setBroken] = useState(!BRAND.logo);
  if (broken) {
    return (
      <span style={{ width: size, height: size, borderRadius: size * 0.28, background: `linear-gradient(135deg, ${BRAND.color}, ${BRAND.dark})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: size * 0.34, letterSpacing: '-0.02em' }}>
        {BRAND.mark}
      </span>
    );
  }
  return <img src={BRAND.logo} alt="" onError={() => setBroken(true)} style={{ width: size, height: size, borderRadius: size * 0.28, display: 'block' }} />;
}

function LogoLoader({ size = 72 }) {
  const [list] = useState(phrasesForPath);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (list.length < 2) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % list.length), 1900);
    return () => clearInterval(t);
  }, [list]);
  const ring = size + 36;
  const r = ring / 2 - 2.5;
  const c = 2 * Math.PI * r;
  return (
    <div role="status" aria-live="polite"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, padding: '8px 0' }}>
      <div style={{ position: 'relative', width: ring, height: ring }}>
        <span style={{ position: 'absolute', inset: 16, borderRadius: '50%', background: BRAND.color, filter: 'blur(16px)', opacity: .5, animation: 'acl-glow 2.2s ease-in-out infinite' }} />
        <svg width={ring} height={ring} style={{ position: 'absolute', inset: 0, animation: 'acl-spin 1.1s linear infinite' }}>
          <circle cx={ring / 2} cy={ring / 2} r={r} fill="none" stroke="#EEF2F6" strokeWidth="3" />
          <circle cx={ring / 2} cy={ring / 2} r={r} fill="none" stroke={BRAND.color} strokeWidth="3" strokeLinecap="round"
            strokeDasharray={`${c * 0.28} ${c}`} />
        </svg>
        <span style={{ position: 'absolute', inset: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'acl-breathe 2.2s ease-in-out infinite' }}>
          <span style={{ borderRadius: size * 0.28, boxShadow: `0 10px 24px -10px ${BRAND.color}`, background: '#fff' }}><Logo size={size} /></span>
        </span>
      </div>
      <p key={i} style={{ margin: 0, minHeight: 18, fontSize: 13, fontWeight: 500, color: '#475569', textAlign: 'center', animation: list.length > 1 ? 'acl-phrase 1.9s ease-in-out both' : undefined }}>
        {list[i % list.length]}
        <span style={{ animation: 'acl-dots 1.2s infinite' }}>.</span>
        <span style={{ animation: 'acl-dots 1.2s .2s infinite' }}>.</span>
        <span style={{ animation: 'acl-dots 1.2s .4s infinite' }}>.</span>
      </p>
    </div>
  );
}

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 1600);
    const t2 = setTimeout(() => onDone(), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#FFFFFF',
        padding: 24,
        transition: 'opacity 500ms ease',
        opacity: phase === 'exit' ? 0 : 1,
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      <style>{CSS}</style>
      <LogoLoader size={72} />
      <div style={{ marginTop: 18, textAlign: 'center', animation: 'acl-rise 0.6s ease 0.15s both' }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', color: '#0F172A', lineHeight: 1 }}>
          <Wordmark height={44} ink="#0F172A" accent={BRAND.color} />
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94A3B8', marginTop: 6 }}>{BRAND.tagline}</div>
      </div>
      <p style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: '#94A3B8', letterSpacing: '0.03em', margin: 0, padding: '0 16px' }}>
        Powered by <span style={{ fontWeight: 600, color: '#64748B' }}>AREA CONNECTOR TECHNOLOGIES</span> · RC&nbsp;9607864
      </p>
    </div>
  );
}
