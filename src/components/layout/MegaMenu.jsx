import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, CheckCircle2, PhoneCall, Siren, ScanLine, Wallet, Bell,
  Heart, MessageCircle, QrCode, Clock, MapPin,
} from 'lucide-react';
import { SECTOR_LINKS, SECTORS } from '../../lib/sectors';

/* ───────────── Product previews — tiny mock screens of each app ───────────── */

function AdminPreview({ accent }) {
  const bars = [42, 58, 50, 66, 61, 78, 72, 90];
  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/[0.06] overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 bg-slate-50/80">
        <span className="w-2 h-2 rounded-full bg-rose-300" /><span className="w-2 h-2 rounded-full bg-amber-300" /><span className="w-2 h-2 rounded-full bg-emerald-300" />
        <span className="ml-2 text-[10px] text-slate-400">manager.area-connector.com</span>
      </div>
      <div className="p-3.5 grid grid-cols-3 gap-2">
        {[['Dues collected', '₦4.2m', '+12%'], ['Residents', '248', '+6'], ['Visitors today', '31', 'live']].map(([l, v, d]) => (
          <div key={l} className="rounded-xl bg-slate-50 px-2.5 py-2">
            <div className="text-[9px] text-slate-400">{l}</div>
            <div className="text-[14px] font-bold text-slate-900 leading-tight">{v}</div>
            <div className="text-[9px] font-semibold" style={{ color: accent }}>{d}</div>
          </div>
        ))}
        <div className="col-span-3 rounded-xl bg-slate-50 px-2.5 pt-2 pb-1.5">
          <div className="text-[9px] text-slate-400 mb-1.5">Service charge · last 8 months</div>
          <div className="flex items-end gap-1.5 h-14">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-md mega-bar" style={{ height: `${h}%`, background: i === bars.length - 1 ? accent : `${accent}55`, animationDelay: `${i * 40}ms` }} />
            ))}
          </div>
        </div>
        <div className="col-span-3 space-y-1">
          {[['Mrs. Bisi Lawal', 'Block C · 14', '₦85,000'], ['Tunde Bakare', 'Block A · 3', '₦85,000']].map(([n, u, a]) => (
            <div key={n} className="flex items-center gap-2 rounded-lg px-1.5 py-1">
              <Wallet size={11} style={{ color: accent }} />
              <span className="text-[10px] font-medium text-slate-700">{n}</span>
              <span className="text-[9px] text-slate-400">{u}</span>
              <span className="ml-auto text-[10px] font-semibold text-slate-900">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatesPreview({ accent }) {
  return (
    <div className="mx-auto w-[210px] rounded-[2rem] bg-slate-900 p-1.5 shadow-xl shadow-slate-900/20">
      <div className="rounded-[1.6rem] bg-white overflow-hidden">
        <div className="px-3.5 pt-3 pb-2 flex items-center justify-between">
          <div>
            <div className="text-[9px] text-slate-400">Good evening</div>
            <div className="text-[12px] font-bold text-slate-900">Adaeze 👋</div>
          </div>
          <Bell size={13} className="text-slate-400" />
        </div>
        <div className="mx-3 rounded-2xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${accent}, #8b5cf6)` }}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] opacity-80">Visitor pass</span>
            <QrCode size={14} />
          </div>
          <div className="mt-1 text-[12px] font-bold">Chidi Okeke</div>
          <div className="text-[9px] opacity-80">Today · 4pm – 8pm</div>
          <div className="mt-2 font-mono text-[15px] font-bold tracking-[0.3em]">482 917</div>
        </div>
        <div className="grid grid-cols-3 gap-1.5 px-3 mt-2.5">
          {[[Wallet, 'Pay dues'], [PhoneCall, 'Call gate'], [Siren, 'SOS']].map(([I, l]) => (
            <div key={l} className="rounded-xl bg-slate-50 py-2 flex flex-col items-center gap-1">
              <I size={12} style={{ color: l === 'SOS' ? '#f43f5e' : accent }} />
              <span className="text-[8.5px] font-medium text-slate-600">{l}</span>
            </div>
          ))}
        </div>
        <div className="mx-3 my-2.5 rounded-xl border border-slate-100 p-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-200" />
            <span className="text-[9px] font-semibold text-slate-800">Lounge · Block C</span>
          </div>
          <div className="mt-1 text-[9px] text-slate-500 leading-snug">Pool party this Saturday — everyone’s welcome!</div>
          <div className="mt-1 flex gap-2 text-[8.5px] text-slate-400">
            <span className="flex items-center gap-0.5"><Heart size={9} className="text-rose-400" /> 24</span>
            <span className="flex items-center gap-0.5"><MessageCircle size={9} /> 8</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuardPreview({ accent }) {
  return (
    <div className="space-y-2">
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/[0.06] p-3.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><ScanLine size={11} style={{ color: accent }} /> Guard app · Main gate</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> On duty</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl px-2.5 py-2 bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={14} /> <span className="text-[11px] font-semibold">Visitor pass · Valid</span>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
          {[['Visitor', 'Chidi Okeke'], ['Visiting', 'Block C · 14'], ['Host', 'Mrs. Bisi Lawal'], ['Expires', '8:00 pm']].map(([k, v]) => (
            <div key={k}>
              <div className="text-[9px] text-slate-400">{k}</div>
              <div className="text-[11px] font-semibold text-slate-800">{v}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: accent }}>Check in</div>
      </div>
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/[0.04] px-3.5 py-2.5">
        <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Gate log</div>
        {[['6:42 pm', 'Delivery · Jumia', 'In'], ['6:15 pm', 'Ifeoma N. · Block A', 'Out']].map(([t, n, s]) => (
          <div key={t} className="flex items-center gap-2 py-0.5 text-[10px]">
            <Clock size={10} className="text-slate-300" />
            <span className="text-slate-400 w-12">{t}</span>
            <span className="text-slate-700 font-medium">{n}</span>
            <span className={`ml-auto font-semibold ${s === 'In' ? 'text-emerald-600' : 'text-slate-400'}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = { '/admin': AdminPreview, '/mates': MatesPreview, '/guard': GuardPreview };

/* ───────────── Sector preview — that sector's own gate card ───────────── */

function SectorPreview({ sector, accent }) {
  const g = sector.gate;
  const Chip = g.chip?.icon;
  return (
    <div className="relative">
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xl shadow-slate-900/[0.06] p-3.5">
        <div className="flex items-center gap-1 text-[10px] text-slate-400"><ScanLine size={11} style={{ color: accent }} /> {g.app}</div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl px-2.5 py-2 bg-emerald-50 text-emerald-700">
          <CheckCircle2 size={14} /> <span className="text-[11px] font-semibold">{g.status}</span>
        </div>
        {g.hours && <div className="mt-1.5 flex items-center gap-1 text-[9.5px] text-slate-500"><Clock size={10} /> {g.hours}</div>}
        <div className="mt-2 space-y-1">
          {g.rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-3">
              <span className="text-[10px] text-slate-400">{k}</span>
              <span className="text-[11px] font-semibold text-slate-800 truncate">{v}</span>
            </div>
          ))}
        </div>
        {g.place && (
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-1.5">
            <MapPin size={11} style={{ color: accent }} />
            <div className="min-w-0">
              <div className="text-[10.5px] font-semibold text-slate-800">{g.place.name}</div>
              <div className="text-[9px] text-slate-400 truncate">{g.place.sub}</div>
            </div>
          </div>
        )}
        <div className="mt-3 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: accent }}>{g.action}</div>
      </div>
      {g.chip && (
        <div className="absolute -bottom-3 -left-5 flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 shadow-lg shadow-slate-900/10 px-2.5 py-1.5 animate-float">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${accent}18` }}><Chip size={12} style={{ color: accent }} /></span>
          <div>
            <div className="text-[10px] font-semibold text-slate-800">{g.chip.title}</div>
            <div className="text-[9px] text-slate-400">{g.chip.text}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ───────────── Shared layout: list on the left, live preview on the right ───────────── */

function ListItem({ item, active, onHover, onClick, sub }) {
  return (
    <Link to={item.to} onMouseEnter={onHover} onFocus={onHover} onClick={onClick}
      className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200 ${active ? 'bg-white shadow-md shadow-slate-900/[0.06]' : 'hover:bg-white/60'}`}>
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all duration-300 ${active ? 'h-6' : 'h-0'}`} style={{ background: item.accent }} />
      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300"
        style={{ background: `${item.accent}${active ? '22' : '14'}`, transform: active ? 'scale(1.08) rotate(-4deg)' : 'none' }}>
        <item.icon size={16} style={{ color: item.accent }} />
      </div>
      <div className="min-w-0 flex-1">
        <div className={`text-[13px] font-semibold ${active ? 'text-slate-900' : 'text-slate-700'}`}>{item.label}</div>
        <div className="text-[11px] text-slate-500 truncate">{sub ?? item.desc}</div>
      </div>
      <ArrowRight size={13} className={`transition-all duration-200 ${active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'}`} style={{ color: item.accent }} />
    </Link>
  );
}

export default function MegaMenu({ menu, products, onNavigate }) {
  const items = menu === 'products' ? products : SECTOR_LINKS;
  const [active, setActive] = useState(items[0].to);
  useEffect(() => { setActive(items[0].to); }, [menu]); // eslint-disable-line react-hooks/exhaustive-deps

  const cur = items.find(i => i.to === active) || items[0];
  const sector = menu === 'solutions' ? SECTORS[cur.id] : null;
  const Preview = PREVIEWS[cur.to];

  return (
    <div key={menu} className="relative rounded-[28px] border border-brand-200/60 shadow-2xl shadow-emerald-900/10 overflow-hidden about-feed-in
      bg-gradient-to-br from-brand-50 via-[#f3faf7] to-indigo-50/70">
      {/* soft grid + glow, tinted by the hovered item */}
      <div className="absolute inset-0 about-grid opacity-70 pointer-events-none" />
      <div className="absolute -top-24 right-10 w-96 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{ background: `${cur.accent}26` }} />

      <div className="relative grid grid-cols-[280px_1fr] gap-2 p-3">
        {/* List */}
        <div className="flex flex-col">
          <div className="px-3 pt-1.5 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700/70">
            {menu === 'products' ? 'Three apps, one platform' : 'Built for every kind of site'}
          </div>
          <div className="space-y-1">
            {items.map(it => (
              <ListItem key={it.to} item={it} active={it.to === cur.to}
                onHover={() => setActive(it.to)} onClick={onNavigate} />
            ))}
          </div>
          <div className="mt-auto pt-3">
            {menu === 'products' ? (
              <Link to="/features#calls" onClick={onNavigate}
                className="group flex items-center gap-3 rounded-2xl bg-white/70 hover:bg-white border border-white px-3 py-2.5 transition-colors">
                <span className="w-8 h-8 rounded-xl bg-brand-500 text-white flex items-center justify-center"><PhoneCall size={14} /></span>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900">New: in-app calls</div>
                  <div className="text-[10.5px] text-slate-500">Call the gate without sharing numbers</div>
                </div>
                <ArrowUpRight size={13} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </Link>
            ) : (
              <Link to="/contact#book-demo" onClick={onNavigate}
                className="group flex items-center gap-3 rounded-2xl bg-white/70 hover:bg-white border border-white px-3 py-2.5 transition-colors">
                <img src="/team/michael-orizu.jpg" alt="" className="w-8 h-8 rounded-xl object-cover object-[50%_15%]" />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-slate-900">Not sure which fits?</div>
                  <div className="text-[10.5px] text-slate-500">Book a 30-min demo</div>
                </div>
                <ArrowUpRight size={13} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </Link>
            )}
          </div>
        </div>

        {/* Preview */}
        <div key={cur.to} className="mega-swap rounded-3xl bg-white/50 border border-white backdrop-blur-sm p-5 grid grid-cols-[1fr_300px] gap-6 items-center">
          <div>
            <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ background: `${cur.accent}18`, color: cur.accent }}>
              {menu === 'products' ? cur.tag : sector?.pill?.replace('AreaConnector for ', 'For ')}
            </span>
            <h3 className="mt-3 text-[22px] font-bold tracking-tight text-slate-900 leading-tight">
              {menu === 'products' ? cur.label : <>{sector.title} <span style={{ color: cur.accent }}>{sector.titleAccent}</span></>}
            </h3>
            <p className="mt-2 text-[12.5px] text-slate-500 leading-relaxed line-clamp-3">
              {menu === 'products' ? cur.blurb : sector.subtitle}
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {(menu === 'products' ? cur.features.map(f => ({ value: f })) : sector.facts).map(f => (
                <li key={f.value} className="flex items-center gap-2 text-[12px] font-medium text-slate-700">
                  <span className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${cur.accent}18` }}>
                    {f.icon ? <f.icon size={11} style={{ color: cur.accent }} /> : <Check size={11} style={{ color: cur.accent }} />}
                  </span>
                  {f.value}
                </li>
              ))}
            </ul>
            <Link to={cur.to} onClick={onNavigate}
              className="group mt-5 inline-flex items-center gap-1.5 rounded-full text-white text-[12px] font-semibold pl-4 pr-1.5 py-1.5 transition-transform hover:-translate-y-0.5"
              style={{ background: cur.accent }}>
              Explore {menu === 'products' ? cur.label.replace('AreaConnector ', '') : cur.label}
              <span className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center group-hover:translate-x-0.5 transition-transform"><ArrowRight size={12} /></span>
            </Link>
          </div>

          <div className="py-2">
            {menu === 'products'
              ? <Preview accent={cur.accent} />
              : <SectorPreview sector={sector} accent={cur.accent} />}
          </div>
        </div>
      </div>
    </div>
  );
}

