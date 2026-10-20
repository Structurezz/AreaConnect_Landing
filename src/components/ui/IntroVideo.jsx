import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export const INTRO_KEY = 'ac_intro_seen_v1';

// Full-screen brand intro shown once, on a visitor's first visit.
export default function IntroVideo({ onDone }) {
  const videoRef = useRef(null);
  const [src] = useState(() => (window.innerWidth < 768 ? '/intro/estate-540.mp4' : '/intro/estate-720.mp4'));
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [started, setStarted] = useState(false);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    try { localStorage.setItem(INTRO_KEY, '1'); } catch { /* private mode */ }
    setTimeout(onDone, 700);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // If the video can't start within 4s (slow network, autoplay blocked), get out of the way.
    const bail = setTimeout(() => { if (!videoRef.current || videoRef.current.currentTime === 0) finish(); }, 4000);
    const onKey = (e) => { if (e.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; clearTimeout(bail); window.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className={`fixed inset-0 z-[9999] bg-slate-950 overflow-hidden transition-opacity duration-700 ${leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <video
        ref={videoRef}
        src={src}
        poster="/intro/estate-poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlaying={() => setStarted(true)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 10))}
        onEnded={finish}
        onError={finish}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${started ? 'scale-110' : 'scale-100'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/50" />

      {/* top bar */}
      <div className="absolute top-0 inset-x-0 flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2.5 intro-in" style={{ animationDelay: '.2s' }}>
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" fill="none" />
              <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)" />
              <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
            </svg>
          </div>
          <span className="text-white text-[15px] font-bold tracking-tight">Area<span className="text-brand-400">Connect</span></span>
        </div>
        <button onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Mute'}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/15 text-white flex items-center justify-center transition-colors">
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* headline */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div className="intro-in text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300" style={{ animationDelay: '.6s' }}>
              Welcome to AreaConnect
            </div>
            <div role="presentation" className="mt-3 text-white font-extrabold tracking-[-0.03em] leading-[1.05] text-[2.2rem] sm:text-5xl lg:text-6xl">
              <span className="intro-in block" style={{ animationDelay: '1s' }}>Beautiful estates</span>
              <span className="intro-in block bg-gradient-to-r from-brand-300 via-emerald-200 to-teal-200 bg-clip-text text-transparent" style={{ animationDelay: '1.6s' }}>
                deserve smarter living.
              </span>
            </div>
            <p className="intro-in mt-4 text-sm sm:text-base text-white/70 max-w-md" style={{ animationDelay: '2.4s' }}>
              Visitors, dues, security and community — one platform for every estate in Nigeria.
            </p>
          </div>
          <button onClick={finish}
            className="intro-in self-start sm:self-auto group inline-flex items-center gap-2 rounded-full bg-white text-slate-900 text-sm font-semibold pl-5 pr-2 py-2 hover:bg-slate-100 transition-colors"
            style={{ animationDelay: '1.2s' }}>
            Enter site
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform"><ArrowRight size={14} /></span>
          </button>
        </div>
        <div className="max-w-6xl mx-auto mt-8 h-0.5 rounded-full bg-white/15 overflow-hidden">
          <div className="h-full bg-brand-400 transition-[width] duration-200 ease-linear" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
