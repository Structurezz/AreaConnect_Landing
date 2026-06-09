import { useEffect, useState } from 'react';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('enter'); // enter → hold → exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('exit'), 1600);
    const t2 = setTimeout(() => onDone(), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: '#050d1a',
        transition: 'opacity 500ms ease',
        opacity: phase === 'exit' ? 0 : 1,
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/8 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo mark with pulse rings */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulse ring */}
          <div
            className="absolute w-28 h-28 rounded-full border border-brand-500/20"
            style={{
              animation: 'loader-ring 2s ease-in-out infinite',
            }}
          />
          {/* Middle pulse ring */}
          <div
            className="absolute w-20 h-20 rounded-full border border-brand-500/30"
            style={{
              animation: 'loader-ring 2s ease-in-out 0.3s infinite',
            }}
          />
          {/* Logo box */}
          <div
            className="relative w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center shadow-2xl"
            style={{
              boxShadow: '0 0 40px rgba(16,185,129,0.4), 0 0 80px rgba(16,185,129,0.15)',
              animation: 'loader-logo 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
              <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
              <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.15)" />
              <text x="20" y="25" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui,sans-serif">AC</text>
            </svg>
          </div>
        </div>

        {/* Wordmark */}
        <div
          className="text-2xl font-black tracking-tight text-white"
          style={{ animation: 'loader-text 0.6s ease 0.2s both' }}
        >
          Area<span className="text-brand-400">Connect</span>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-brand-300 rounded-full"
            style={{ animation: 'loader-bar 1.5s ease-in-out both' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-logo {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes loader-text {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-bar {
          from { width: 0%; opacity: 0; }
          10%  { opacity: 1; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes loader-ring {
          0%   { opacity: 0.8; transform: scale(0.9); }
          50%  { opacity: 0.3; transform: scale(1.05); }
          100% { opacity: 0.8; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
