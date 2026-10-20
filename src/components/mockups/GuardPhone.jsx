import { useEffect, useState } from 'react';
import { Shield, AlertCircle, List, UserCircle2, QrCode, Search, LogIn, Signal, BatteryFull, Check } from 'lucide-react';

// Miniature of the real security-mobile Gate screen (app/(tabs)/index.jsx), dark theme.

const CODE = '482913';
// Timeline in ticks: type 6 chars → verify → visitor found → checked in → panic popup → reset.
const LOOP = 20;

export default function GuardPhone() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT(x => (x + 1) % LOOP), 650);
    return () => clearInterval(id);
  }, []);

  const typed = CODE.slice(0, Math.min(t, 6));
  const found = t >= 8;
  const checkedIn = t >= 12;
  const panic = t >= 15 && t < 19;
  const session = checkedIn
    ? [['Tunde Adeyemi', 'Check In', '#10B981', '19:02'], ['Jumia Rider', 'Check Out', '#3B82F6', '18:41']]
    : [['Jumia Rider', 'Check Out', '#3B82F6', '18:41'], ['Chioma Obi', 'Check In', '#10B981', '16:03']];

  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute -inset-16 flex items-center justify-center pointer-events-none">
        <div className="about-spin w-full aspect-square rounded-full border border-dashed border-amber-300/50" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-sky-400/25 blur-3xl rounded-full" />

      <div className="relative z-10 rounded-[2.6rem] bg-slate-800 p-2.5 shadow-2xl shadow-slate-900/40">
        <div className="relative rounded-[2.1rem] bg-[#060C18] overflow-hidden h-[560px] sm:h-[590px] flex flex-col text-white">
          {/* status bar */}
          <div className="h-9 flex items-center justify-between px-6 text-[10px] font-semibold flex-shrink-0">
            <span>19:02</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>

          <div className="flex-1 overflow-hidden px-3.5 pt-2">
            {/* header */}
            <div className="flex flex-col items-center text-center mb-3">
              <div className="w-11 h-11 rounded-[12px] bg-[#F59E0B]/[0.12] border border-[#F59E0B]/25 flex items-center justify-center mb-2">
                <Shield size={20} className="text-[#F59E0B]" fill="#F59E0B" fillOpacity={0.15} />
              </div>
              <div className="text-[17px] font-extrabold tracking-tight">Gate Security</div>
              <div className="text-[10px] text-white/55">Enter visitor access code to verify</div>
            </div>

            {!found ? (
              <div key="entry" className="about-feed-in rounded-[14px] bg-[#0F1A2E] border border-white/[0.07] p-3">
                <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-2">Visitor access code</div>
                <div className="relative rounded-[10px] bg-[#0D172A] border border-[#F59E0B]/40 h-12 flex items-center justify-center">
                  <QrCode size={14} className="absolute left-3 text-white/30" />
                  <span className="font-extrabold text-[20px] tracking-[0.3em] text-[#F59E0B]">
                    {typed || <span className="text-white/15">ABC123</span>}
                    {t < 6 && <span className="inline-block w-px h-5 bg-[#F59E0B] ml-0.5 align-middle animate-pulse" />}
                  </span>
                </div>
                <div className="flex justify-center gap-1.5 mt-2.5">
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <span key={i} className={`w-4 h-1 rounded-full transition-colors duration-200 ${i < typed.length ? 'bg-[#F59E0B]' : 'bg-white/[0.12]'}`} />
                  ))}
                </div>
                <div className={`mt-3 h-10 rounded-[10px] bg-[#F59E0B] text-black text-[12px] font-bold flex items-center justify-center gap-1.5 transition-transform duration-150 ${t === 7 ? 'scale-95' : ''}`}>
                  <Search size={13} /> Verify Code
                </div>
              </div>
            ) : (
              <div key="found" className="about-feed-in rounded-[14px] bg-[#0F1A2E] border border-[#F59E0B]/25 p-3">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-black text-[14px] font-extrabold flex items-center justify-center">T</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold truncate">Tunde Adeyemi</div>
                    <div className="text-[9px] text-white/55">0803 *** 4471</div>
                  </div>
                  <span key={checkedIn ? 'in' : 'act'} className="about-feed-in rounded-full px-2 py-0.5 text-[9px] font-semibold"
                    style={checkedIn ? { background: 'rgba(16,185,129,.15)', color: '#10B981' } : { background: 'rgba(245,158,11,.15)', color: '#F59E0B' }}>
                    {checkedIn ? 'Checked-in' : 'Active'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[['PURPOSE', 'Friend'], ['HOST UNIT', 'Unit 4 · C'], ['EXPECTED', 'Oct 20 · 6:30 PM'], ['INVITED BY', 'Ada O.']].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-[#0D172A] px-2 py-1.5">
                      <div className="text-[7px] font-semibold tracking-wider text-white/30">{k}</div>
                      <div className="text-[10px] font-semibold text-white/90 truncate">{v}</div>
                    </div>
                  ))}
                  {checkedIn && (
                    <div className="about-feed-in col-span-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/25 px-2 py-1.5">
                      <div className="text-[7px] font-semibold tracking-wider text-[#10B981]">CHECKED IN</div>
                      <div className="text-[10px] font-semibold text-white/90">Today · 19:02</div>
                    </div>
                  )}
                </div>
                {!checkedIn ? (
                  <div className={`mt-2.5 h-10 rounded-[10px] bg-[#10B981] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 transition-transform duration-150 ${t === 11 ? 'scale-95' : ''}`}>
                    <LogIn size={13} /> Check In Visitor
                  </div>
                ) : (
                  <div className="mt-2.5 h-10 rounded-[10px] border border-white/10 text-white/70 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                    <Check size={13} className="text-[#10B981]" /> Verify Another Visitor
                  </div>
                )}
              </div>
            )}

            {/* this session */}
            <div className="mt-3 rounded-[14px] bg-[#0F1A2E] border border-white/[0.07] px-3 py-2">
              <div className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-1">This session</div>
              {session.map(([name, action, color, time], i) => (
                <div key={name + action} className={`about-feed-in flex items-center gap-2 py-1.5 ${i === 0 ? 'border-b border-white/[0.06]' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                  <span className="text-[10px] font-semibold flex-1 truncate">{name}</span>
                  <span className="text-[9px] font-semibold" style={{ color }}>{action}</span>
                  <span className="text-[9px] text-white/30">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tabs */}
          <div className="h-14 bg-[#0A1020] border-t border-white/[0.07] grid grid-cols-4 flex-shrink-0">
            {[[Shield, 'Gate'], [AlertCircle, 'Alerts'], [List, 'Entry Log'], [UserCircle2, 'Profile']].map(([I, l], i) => (
              <div key={l} className="flex flex-col items-center justify-center gap-0.5">
                <I size={16} className={i === 0 ? 'text-[#F59E0B]' : 'text-white/30'} />
                <span className={`text-[8px] font-semibold ${i === 0 ? 'text-[#F59E0B]' : 'text-white/30'}`}>{l}</span>
              </div>
            ))}
          </div>

          {/* incoming panic alert (native alert box) */}
          {panic && (
            <div className="absolute inset-0 z-30 bg-black/55 flex items-center justify-center px-8 about-feed-in">
              <div className="w-full rounded-2xl bg-[#1C2538]/95 backdrop-blur text-center overflow-hidden border border-white/10">
                <div className="px-4 pt-4 pb-3">
                  <div className="text-[13px] font-bold">🚨 SECURITY ALERT</div>
                  <div className="text-[11px] text-white/70 mt-1">Femi K. has triggered an alert.</div>
                </div>
                <div className="border-t border-white/10 py-2.5 text-[12px] font-semibold text-sky-400">OK</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* floating chips */}
      <div className="hidden sm:block absolute -left-24 top-28 z-20 animate-float">
        <div className="rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl px-3.5 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Works offline</div>
          <div className="text-sm font-semibold text-slate-900">Syncs when back online</div>
        </div>
      </div>
      <div className="hidden sm:block absolute -right-20 bottom-24 z-20 animate-float-delayed">
        <div className={`rounded-2xl shadow-xl px-3.5 py-2.5 transition-colors duration-500 ${panic ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'}`}>
          <div className="text-[10px] uppercase tracking-[0.14em] font-semibold opacity-70">{panic ? 'Siren playing' : 'Panic alerts'}</div>
          <div className="text-sm font-semibold">{panic ? '🔊 Resident needs help' : 'Never missed'}</div>
        </div>
      </div>
    </div>
  );
}
