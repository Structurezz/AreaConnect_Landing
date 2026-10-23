import { useEffect, useState } from 'react';
import {
  Signal, BatteryFull, QrCode, ClipboardList, Shield, PhoneCall, Camera, Search, Wifi, Sparkles,
  CheckCircle2, LogIn, LogOut, Siren, MapPin, Home, UserRound, Clock,
} from 'lucide-react';

// Miniature of the Guard web app's gate screen (security/src/pages/Dashboard.jsx
// + AppLayout's mobile bottom nav). Loops a guard's flow: type a code →
// valid pass → check in → session log → panic alert.

const CODE = '482913';
const LOOP = 22;
const TABS = [[QrCode, 'Scan'], [ClipboardList, 'Log'], [Shield, 'Alerts'], [PhoneCall, 'Calls']];

export default function GuardWebPhone() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => (x + 1) % LOOP), 600);
    return () => clearInterval(id);
  }, []);

  const typed = CODE.slice(0, Math.min(6, Math.max(0, t - 1)));
  const found = t >= 9;
  const checkedIn = t >= 13;
  const alarm = t >= 16 && t < 21;
  const log = [
    ...(checkedIn ? [['Tunde Adeyemi', 'Check In', '19:04']] : []),
    ['Jumia Rider', 'Check Out', '18:51'],
    ['Chioma Obi', 'Check In', '18:22'],
  ].slice(0, 3);
  const ins = log.filter((l) => l[1] === 'Check In').length;

  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute -inset-4 blur-3xl rounded-full opacity-80" style={{ background: 'radial-gradient(circle, rgba(37,99,235,.35), rgba(245,158,11,.15))' }} />
      <div className="relative rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/25">
        <div className="relative rounded-[2.1rem] overflow-hidden h-[560px] flex flex-col bg-[#F8FAFC]">
          {/* status bar */}
          <div className="h-9 flex items-center justify-between px-6 text-[10px] font-semibold flex-shrink-0 text-slate-900 relative z-10">
            <span>19:04</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>

          {/* panic alert banner */}
          {alarm && (
            <div className="absolute top-10 left-2.5 right-2.5 z-30 about-feed-in">
              <div className="rounded-2xl p-2.5 text-white shadow-xl flex items-center gap-2.5" style={{ background: 'linear-gradient(135deg,#DC2626,#991B1B)' }}>
                <span className="relative w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="absolute inset-0 rounded-xl bg-white/30 animate-ping" />
                  <Siren size={15} className="relative" />
                </span>
                <div className="flex-1 min-w-0 leading-tight">
                  <div className="text-[8px] font-bold uppercase tracking-wider text-red-100">Security threat · siren</div>
                  <div className="text-[11px] font-semibold truncate">Femi K. pressed panic</div>
                  <div className="text-[8.5px] text-red-100/85 flex items-center gap-1"><MapPin size={8} /> Block B · on the map</div>
                </div>
                <span className="text-[8.5px] font-bold bg-white text-red-700 rounded-lg px-2 py-1">View</span>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-hidden px-3 pt-1 space-y-2.5">
            {/* hero */}
            <div className="relative overflow-hidden rounded-[18px] p-3.5 text-white"
              style={{ background: 'radial-gradient(110% 80% at 100% 0%, #60A5FA 0%, transparent 55%), radial-gradient(90% 80% at 0% 100%, #1E40AF 0%, transparent 60%), linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', boxShadow: '0 14px 30px -16px rgba(29,78,216,0.7)' }}>
              <div className="absolute -top-10 -right-8 w-32 h-32 rounded-full blur-2xl bg-blue-200/35" />
              <div className="relative flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[7.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 border border-white/25">
                  <span className="w-1 h-1 rounded-full bg-white animate-pulse" /> On duty
                </span>
                <span className="text-[7.5px] font-semibold px-1.5 py-0.5 rounded-full bg-white/15 border border-white/20">Tue, 19:04</span>
                <span className="inline-flex items-center gap-1 text-[7.5px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border" style={{ background: 'rgba(16,185,129,0.22)', borderColor: 'rgba(167,243,208,0.45)' }}>
                  <Wifi size={8} /> Online
                </span>
              </div>
              <div className="relative mt-2 text-[17px] font-black tracking-tight" style={{ color: '#fff' }}>Hi, Musa</div>
              <div className="relative text-[8.5px] text-white/85 flex items-center gap-1"><Sparkles size={8} className="text-blue-200" /> {ins} in · 1 out this session</div>
            </div>

            {found ? (
              /* visitor result */
              <div className="about-feed-in rounded-[16px] bg-white border overflow-hidden" style={{ borderColor: checkedIn ? '#86EFAC' : '#BFDBFE' }}>
                <div className="p-3 flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[15px] font-black text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>T</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider" style={{ color: checkedIn ? '#059669' : '#2563EB' }}>
                      <CheckCircle2 size={9} /> {checkedIn ? 'Checked in' : 'Valid pass'}
                    </div>
                    <div className="text-[13px] font-black text-slate-900 truncate">Tunde Adeyemi</div>
                    <div className="text-[8.5px] text-slate-500">Friend · code 482913</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5 px-3 pb-2.5">
                  {[[Home, 'Visiting', 'Ada O. · 4C'], [Clock, 'Expected', 'Today, 7:00 PM']].map(([I, l, v]) => (
                    <div key={l} className="rounded-lg bg-slate-50 px-2 py-1.5">
                      <div className="text-[7px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-0.5"><I size={7} /> {l}</div>
                      <div className="text-[9px] font-semibold text-slate-800 truncate">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="px-3 pb-3">
                  <div className="h-9 rounded-xl text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                    style={{ background: checkedIn ? 'linear-gradient(135deg,#3B82F6,#1D4ED8)' : 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 8px 18px -10px rgba(5,150,105,0.9)' }}>
                    {checkedIn ? <><LogOut size={12} /> Check Out Visitor</> : <><LogIn size={12} /> Check In Visitor</>}
                  </div>
                </div>
              </div>
            ) : (
              /* scanner card */
              <div className="rounded-[16px] bg-white border border-slate-200/80 overflow-hidden">
                <div className="p-3 flex items-center gap-2.5" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(37,99,235,0.03))' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)' }}><QrCode size={18} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[7.5px] font-bold uppercase tracking-wider text-blue-700">Scan QR</div>
                    <div className="text-[12px] font-black text-slate-900">Scan Visitor Pass</div>
                    <div className="text-[8px] text-slate-500">Opens the camera · fastest way to verify</div>
                  </div>
                  <Camera size={13} className="text-slate-400" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 border-t border-slate-100">
                  <span className="flex-1 h-px bg-slate-200" /><span className="text-[7px] font-bold uppercase tracking-wider text-slate-400">Or enter manually</span><span className="flex-1 h-px bg-slate-200" />
                </div>
                <div className="px-3 pb-3 space-y-2">
                  <div className="h-10 rounded-xl bg-slate-50 flex items-center justify-center font-mono text-[17px] tracking-[0.35em] text-slate-900"
                    style={{ border: `2px solid ${typed.length === 6 ? '#86EFAC' : '#E2E8F0'}` }}>
                    {typed || <span className="text-slate-300">ABC123</span>}
                    {typed.length < 6 && <span className="w-[2px] h-5 bg-blue-500 animate-pulse ml-0.5" />}
                  </div>
                  <div className="flex justify-center gap-1">
                    {[...Array(6)].map((_, i) => <span key={i} className="w-4 h-1 rounded-full transition-colors" style={{ background: i < typed.length ? '#2563EB' : '#E2E8F0' }} />)}
                  </div>
                  <div className="h-8 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 border" style={{ background: '#F1F5F9', color: '#1D4ED8', borderColor: 'rgba(59,130,246,0.25)' }}>
                    <Search size={11} /> {typed.length === 6 ? 'Verifying…' : 'Verify Code'}
                  </div>
                </div>
              </div>
            )}

            {/* session log */}
            <div className="rounded-[16px] bg-white border border-slate-200/80 overflow-hidden">
              <div className="px-3 py-2 flex items-center justify-between border-b border-slate-100">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1"><Shield size={8} /> This session</span>
                <span className="flex items-center gap-1 text-[7.5px] font-bold">
                  <span className="px-1 py-px rounded bg-emerald-50 text-emerald-600 flex items-center gap-0.5"><LogIn size={7} /> {ins}</span>
                  <span className="px-1 py-px rounded bg-blue-50 text-blue-700 flex items-center gap-0.5"><LogOut size={7} /> 1</span>
                </span>
              </div>
              {log.map(([name, action, time], i) => (
                <div key={name + action} className={`about-feed-in flex items-center gap-2 px-3 py-1.5 ${i ? 'border-t border-slate-50' : ''}`}>
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: action === 'Check In' ? '#10B981' : '#3B82F6' }} />
                  <span className="flex-1 text-[9.5px] font-medium text-slate-900 truncate flex items-center gap-1"><UserRound size={8} className="text-slate-300" /> {name}</span>
                  <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: action === 'Check In' ? '#059669' : '#1D4ED8' }}>{action}</span>
                  <span className="text-[8px] text-slate-400">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* bottom nav (dark, like the real app) */}
          <div className="h-14 grid grid-cols-4 flex-shrink-0" style={{ background: '#060E1A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {TABS.map(([I, l], i) => {
              const on = alarm ? i === 2 : i === 0;
              return (
                <div key={l} className="relative flex flex-col items-center justify-center gap-0.5">
                  <I size={16} style={{ color: on ? '#60A5FA' : 'rgba(255,255,255,0.4)' }} />
                  <span className="text-[8px] font-semibold" style={{ color: on ? '#60A5FA' : 'rgba(255,255,255,0.4)' }}>{l}</span>
                  {l === 'Alerts' && alarm && <span className="absolute top-2.5 right-[34%] w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
