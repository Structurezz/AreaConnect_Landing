import { useEffect, useState } from 'react';
import {
  Signal, BatteryFull, Bell, Menu, Wifi, QrCode, Camera, Search, ShieldCheck, DoorOpen, User, Home, FileText,
  Calendar, LogIn, ClipboardList, Siren, PhoneCall, Settings as SettingsIcon, Users, LogOut, AlertTriangle,
} from 'lucide-react';

// Miniature of the real AreaConnector Guard app on a phone (security/src:
// layout/AppLayout.jsx mobile bar + pages/Dashboard.jsx "Verify a visitor").
// Plays a gate shift: type the code → Verify → ACCESS ALLOWED → Check in →
// ON SITE → an alert comes in on the red header strip → back to verify.

const CODE = 'K7Q2MX';
const LOOP = 22;

function GuardMark({ size = 30 }) {
  return (
    <span className="flex items-center justify-center flex-shrink-0" style={{ width: size, height: size, borderRadius: size * 0.3, background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)' }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 40 40" fill="none">
        <path d="M20 4L6 12v16l14 8 14-8V12L20 4z" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none" />
        <path d="M20 9L9 15.5v13L20 35l11-6.5v-13L20 9z" fill="rgba(255,255,255,0.2)" />
        <path d="M20 14l-6 3.5v7L20 28l6-3.5v-7L20 14z" fill="rgba(255,255,255,0.7)" />
        <rect x="18" y="18" width="4" height="5" rx="1" fill="white" />
        <circle cx="20" cy="17" r="1.5" fill="white" />
      </svg>
    </span>
  );
}

const TONES = {
  allowed: { grad: 'linear-gradient(135deg,#10B981,#047857)', Icon: ShieldCheck, title: 'ACCESS ALLOWED', sub: 'Valid pass — check the visitor in' },
  inside:  { grad: 'linear-gradient(135deg,#0F766E,#064E3B)', Icon: DoorOpen,    title: 'ON SITE',        sub: 'Checked in at 19:02 — check out on exit' },
};

const Cell = ({ Icon, label, value, sub, accent }) => (
  <div className="rounded-lg p-1.5 min-w-0" style={{ background: accent ? 'rgba(16,185,129,0.07)' : '#F8FAFC', border: `1px solid ${accent ? 'rgba(16,185,129,0.22)' : 'rgba(15,23,42,0.06)'}` }}>
    <div className="flex items-center gap-0.5 text-[6.5px] font-semibold uppercase tracking-wider" style={{ color: accent ? '#059669' : '#94A3B8' }}><Icon size={7} /> {label}</div>
    <div className="text-[9px] font-semibold text-slate-900 truncate mt-0.5">{value}</div>
    {sub && <div className="text-[7.5px] text-slate-400 truncate">{sub}</div>}
  </div>
);

export default function GuardPhone({ chips = true }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => (x + 1) % LOOP), 650);
    return () => clearInterval(id);
  }, []);

  const typed = CODE.slice(0, Math.min(Math.max(t - 1, 0), 6));
  const verifying = t === 8;
  const found = t >= 9 && t < 18;
  const inside = t >= 13 && t < 18;
  const alert = t >= 15 && t < 20;
  const tone = TONES[inside ? 'inside' : 'allowed'];
  const ins = inside ? 4 : 3;

  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-sky-400/25 blur-3xl rounded-full" />

      <div className="relative z-10 rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/40">
        <div className="relative rounded-[2.1rem] bg-[#F8FAFC] overflow-hidden h-[560px] sm:h-[590px] flex flex-col">
          {/* status bar + mobile top bar (dark, as in the app) */}
          <div className="bg-[#07111F] text-white flex-shrink-0">
            <div className="h-8 flex items-center justify-between px-6 text-[10px] font-semibold">
              <span>19:02</span>
              <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black" />
              <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
            </div>
            <div className="flex items-center gap-2 px-3 h-11">
              <GuardMark size={26} />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="text-[10.5px] font-bold">Area<span className="text-blue-400">Connector</span> <span className="text-white/40 font-medium">Guard</span></div>
                <div className="text-[8px] text-white/50 flex items-center gap-1 truncate"><span className="w-1 h-1 rounded-full bg-emerald-400" /> Greenfield Estate</div>
              </div>
              <span className={`relative w-7 h-7 rounded-full flex items-center justify-center ${alert ? 'bg-red-500' : 'bg-white/[0.07]'}`}>
                <Bell size={12} />
                {alert && <span className="absolute -top-1 -right-1 min-w-[13px] h-[13px] rounded-full bg-white text-red-600 text-[7.5px] font-bold flex items-center justify-center">1</span>}
              </span>
              <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white/[0.07]"><Menu size={12} /></span>
            </div>
            {alert && (
              <div className="flex items-center justify-center gap-1 h-6 text-[8.5px] font-bold bg-red-500 text-white about-feed-in">
                <AlertTriangle size={9} /> 1 active alert — tap to respond
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden px-2.5 pt-2.5 space-y-2">
            {/* shift strip */}
            <div className="g-card flex items-center gap-2 px-2.5 py-2 rounded-xl bg-white border border-slate-200/70">
              <GuardMark size={22} />
              <div className="flex-1 min-w-0 leading-tight">
                <div className="text-[9.5px] font-semibold text-slate-900 truncate">On duty · Musa</div>
                <div className="text-[7.5px] text-slate-400 truncate">Shift Evening · since 18:00</div>
              </div>
              <span className="inline-flex items-center gap-0.5 h-4.5 px-1.5 py-0.5 rounded-full text-[7.5px] font-semibold" style={{ background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}><Wifi size={8} /> Online</span>
            </div>

            {!found ? (
              /* Verify a visitor */
              <div className="rounded-xl bg-white border border-slate-200/70 p-2.5">
                <div className="text-[13px] font-semibold text-slate-900">Verify a visitor</div>
                <div className="text-[8.5px] text-slate-500">Scan their QR pass or type the 6-character code</div>
                <div className="relative mt-2 overflow-hidden rounded-xl px-2.5 h-12 flex items-center gap-2 text-white" style={{ background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)' }}>
                  <span className="absolute -right-5 -top-6 w-20 h-20 rounded-full bg-white/10" />
                  <span className="relative w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.28)' }}><QrCode size={16} /></span>
                  <span className="relative flex-1 leading-tight"><span className="block text-[11px] font-semibold">Scan visitor pass</span><span className="block text-[7.5px] text-white/85">Opens the camera · fastest way to verify</span></span>
                  <Camera size={12} className="relative text-white/85" />
                </div>
                <div className="flex items-center gap-2 my-2"><div className="flex-1 h-px bg-slate-200" /><span className="text-[7px] font-semibold uppercase tracking-wider text-slate-400">or type the code</span><div className="flex-1 h-px bg-slate-200" /></div>
                <div className="h-11 rounded-xl flex items-center justify-center font-mono text-[19px] font-semibold tracking-[0.4em] text-slate-900" style={{ background: '#F8FAFC', border: `2px solid ${typed.length ? '#3B82F6' : '#E2E8F0'}`, paddingLeft: '0.4em' }}>
                  {typed || <span className="text-slate-300">ABC123</span>}
                </div>
                <div className="flex justify-center gap-1 mt-1.5">{[...Array(6)].map((_, i) => <div key={i} className="w-4 h-1 rounded-full" style={{ background: i < typed.length ? '#3B82F6' : '#E2E8F0' }} />)}</div>
                <div className={`mt-2 h-9 rounded-xl flex items-center justify-center gap-1 text-[10.5px] font-semibold text-white transition-transform ${verifying ? 'scale-[0.97]' : ''}`} style={{ background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', opacity: typed.length === 6 ? 1 : 0.5 }}>
                  {verifying ? <><span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Verifying…</> : <><Search size={11} /> Verify code</>}
                </div>
              </div>
            ) : (
              /* Result card */
              <div className="rounded-xl bg-white overflow-hidden about-feed-in" style={{ border: `1px solid ${inside ? 'rgba(15,118,110,0.30)' : 'rgba(16,185,129,0.35)'}` }}>
                <div className="relative overflow-hidden px-3 py-2.5 flex items-center gap-2" style={{ background: tone.grad }}>
                  <span className="absolute -right-6 -top-8 w-24 h-24 rounded-full bg-white/10" />
                  <span className="relative w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.30)' }}><tone.Icon size={15} className="text-white" /></span>
                  <div className="relative leading-tight text-white"><div className="text-[12.5px] font-bold tracking-wide">{tone.title}</div><div className="text-[8px] text-white/90">{tone.sub}</div></div>
                </div>
                <div className="p-2.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-700 text-[15px] font-bold flex items-center justify-center">T</span>
                    <div className="leading-tight">
                      <div className="text-[11.5px] font-semibold text-slate-900">Tunde Adeyemi</div>
                      <span className="mt-0.5 inline-flex items-center gap-1 h-4 px-1.5 rounded-full text-[7.5px] font-semibold" style={inside ? { background: '#D1FAE5', color: '#047857' } : { background: '#FEF3C7', color: '#B45309' }}>
                        <span className="w-1 h-1 rounded-full" style={{ background: inside ? '#047857' : '#B45309' }} />{inside ? 'Inside' : 'Expected'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <Cell Icon={User} label="Host" value="Ada Okafor" />
                    <Cell Icon={Home} label="Unit" value="Block C · 4" />
                    <Cell Icon={FileText} label="Purpose" value="Friend" />
                    <Cell Icon={Calendar} label="Time window" value="Today 18:30" sub="until 06:30" />
                    {inside && <Cell Icon={LogIn} label="Checked in" value="19:02" sub="Nov 20" accent />}
                  </div>
                  <div className={`mt-2 h-9 rounded-xl flex items-center justify-center gap-1 text-[10.5px] font-semibold ${inside ? 'bg-white border border-slate-200 text-slate-700' : 'text-white'} ${t === 12 ? 'scale-[0.97]' : ''} transition-transform`}
                    style={inside ? undefined : { background: 'linear-gradient(135deg,#10B981,#047857)' }}>
                    {inside ? <><LogOut size={11} /> Check out visitor</> : <><LogIn size={11} /> Check in visitor</>}
                  </div>
                </div>
              </div>
            )}

            {/* Today at the gate */}
            <div className="rounded-xl bg-white border border-slate-200/70 p-2.5">
              <div className="flex items-center justify-between"><span className="text-[10.5px] font-semibold text-slate-900">Today at the gate</span><span className="text-[7.5px] text-slate-400">Thu, Nov 20</span></div>
              <div className="mt-1.5 grid grid-cols-3 gap-1">
                {[[Users, 'Inside now', inside ? 5 : 4, '#047857', '#D1FAE5'], [LogOut, 'Checked out', 9, '#475569', '#F1F5F9'], [LogIn, 'Your check-ins', ins, '#1D4ED8', '#DBEAFE']].map(([Icon, l, v, c, bg]) => (
                  <div key={l} className="rounded-lg border border-slate-100 p-1.5">
                    <div className="flex items-center justify-between"><span className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: bg, color: c }}><Icon size={9} /></span><span className="text-[12px] font-semibold text-slate-900">{v}</span></div>
                    <div className="text-[7px] text-slate-500 mt-0.5 truncate">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* mobile bottom bar with the raised Scan button (estate: log · alerts · scan · calls · settings) */}
          <div className="h-14 bg-[#07111F] border-t border-white/[0.06] grid grid-cols-5 items-end flex-shrink-0">
            {[[ClipboardList, 'Entry log'], [Siren, 'Alerts'], [QrCode, 'Scan'], [PhoneCall, 'Calls'], [SettingsIcon, 'Settings']].map(([Icon, l]) => (
              l === 'Scan' ? (
                <div key={l} className="flex flex-col items-center gap-0.5 pb-1.5">
                  <span className="-mt-5 w-11 h-11 rounded-xl flex items-center justify-center text-white border-[3px] border-[#07111F]" style={{ background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)' }}><QrCode size={18} /></span>
                  <span className="text-[7.5px] font-semibold text-blue-400">Scan</span>
                </div>
              ) : (
                <div key={l} className="relative flex flex-col items-center justify-center gap-0.5 h-full">
                  <Icon size={14} className="text-white/40" />
                  {l === 'Alerts' && alert && <span className="absolute top-2 right-3 min-w-[12px] h-3 rounded-full bg-red-500 text-white text-[7px] font-bold flex items-center justify-center">1</span>}
                  <span className="text-[7.5px] font-semibold text-white/45 whitespace-nowrap">{l}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* floating chips */}
      {chips && <>
      <div className="hidden sm:block absolute -left-24 top-28 z-20 animate-float">
        <div className="rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl px-3.5 py-2.5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400 font-semibold">Works offline</div>
          <div className="text-sm font-semibold text-slate-900">Syncs when back online</div>
        </div>
      </div>
      <div className="hidden sm:block absolute -right-20 bottom-24 z-20 animate-float-delayed">
        <div className={`rounded-2xl shadow-xl px-3.5 py-2.5 transition-colors duration-500 ${alert ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'}`}>
          <div className="text-[10px] uppercase tracking-[0.14em] font-semibold opacity-70">{alert ? 'Siren playing' : 'Panic alerts'}</div>
          <div className="text-sm font-semibold">{alert ? '🔊 Someone needs help' : 'Never missed'}</div>
        </div>
      </div>
      </>}
    </div>
  );
}
