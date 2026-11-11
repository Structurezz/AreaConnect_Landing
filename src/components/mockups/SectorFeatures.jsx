import {
  Plus, ShieldCheck, ShoppingBag, Search, MapPin, Navigation, Star, BedDouble, GraduationCap, DoorOpen,
  Stethoscope, Library, Wallet, Eye, RefreshCw, CalendarClock, AlertTriangle, ArrowUpRight, FileText, History,
  HelpCircle, Sparkles, UtensilsCrossed, Wrench, ConciergeBell, MessageCircle, Building2, Loader2, Siren,
  CheckCircle2, LifeBuoy, ChevronLeft, UserCheck, HardHat, Truck, Package, Clock, QrCode, ShieldCheck as Shield,
} from 'lucide-react';

// The feature each solution's phone taps into. Each screen copies the real
// AreaMates page it stands for (residents/src/pages/…), at phone scale:
//   estate → Marketplace · university → Campus map · school → Payments
//   hotel → Requests · industrial → Emergency roll-call · hospital → Invite a visitor
// `step` 0 = the page as it opens, 1 = after the second tap.

export const FEATURE = {
  estate:     { tile: 'Market' },
  university: { tile: 'Map' },
  school:     { tile: 'School fees' },
  hotel:      { tile: 'Requests' },
  industrial: { banner: ['🚨 Emergency roll-call', 'Fire alarm — assemble at Point B'] },
  hospital:   { tile: 'Invite' },
};

export const Tap = ({ className = '' }) => (
  <span className={`pointer-events-none absolute inset-0 flex items-center justify-center z-10 ${className}`}>
    <span className="w-9 h-9 rounded-full bg-indigo-500/25 border-2 border-indigo-500/60 home-ring" />
  </span>
);

/* ── Estates: Marketplace (pages/Marketplace.jsx, mobile) ── */
const CATS = [['', 'All', '✨'], ['food', 'Food', '🍲'], ['services', 'Services', '🔧'], ['skills', 'Skills', '💡'], ['items_for_sale', 'For sale', '🏷️'], ['rentals', 'Rentals', '🏠']];
const LISTINGS = [
  ['Jollof rice tray', '₦18,000', 'Mrs. Bisi · Unit 7', '🍲', '#FEF3C7', 'food'],
  ['AC servicing', '₦12,000', 'Kunle · Unit 2', '🔧', '#DBEAFE', 'services'],
  ['Small-chops platter', '₦25,000', 'Ada · Block A', '🍲', '#FEF3C7', 'food'],
  ['Kids’ bicycle', '₦45,000', 'Tayo · Unit 11', '🏷️', '#D1FAE5', 'items_for_sale'],
];
function Market({ step }) {
  const cat = step ? 'food' : '';
  const shown = LISTINGS.filter((l) => !cat || l[5] === cat);
  return (
    <div className="space-y-2.5">
      <header className="flex items-end justify-between">
        <div className="leading-tight"><div className="text-[8.5px] text-slate-400">Buy & sell with neighbours</div><div className="text-[15px] font-semibold text-slate-900">Marketplace</div></div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[9px] font-semibold text-white" style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}><Plus size={10} /> Sell</span>
      </header>
      <section className="relative overflow-hidden rounded-[16px] p-3 text-white" style={{ background: 'linear-gradient(150deg, #1E1B4B 0%, #312E81 50%, #4F46E5 115%)' }}>
        <ShoppingBag size={80} className="absolute -right-3 -bottom-4 text-white/[0.06]" />
        <span className="inline-flex items-center gap-1 text-[7.5px] font-semibold px-1.5 py-0.5 rounded-full bg-white/10 border border-white/15"><ShieldCheck size={8} /> Neighbours only · protected payments</span>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
          {[['For sale', 24], ['To confirm', 0], ['To handle', 1]].map(([l, v]) => <div key={l} className="rounded-lg bg-white/10 py-1"><div className="text-[12px] font-bold">{v}</div><div className="text-[7px] text-white/60">{l}</div></div>)}
        </div>
        <div className="mt-2 flex items-center gap-1 text-[7px] font-semibold">
          {['Pay', 'Held safely', 'Delivered', 'Seller paid'].map((s, i) => <span key={s} className={`px-1.5 py-0.5 rounded-full whitespace-nowrap ${i === 3 ? 'bg-emerald-400 text-emerald-950' : 'bg-white/12 text-white/85'}`}>{s}</span>)}
        </div>
      </section>
      <div className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-2.5 py-1.5 text-[9px] text-slate-400"><Search size={10} /> Search food, services, items…</div>
      <div className="flex gap-1 p-0.5 rounded-xl bg-white border border-slate-200">
        {['Browse', 'Orders', 'Selling', 'Saved'].map((x, i) => <span key={x} className={`flex-1 text-center py-1 rounded-lg text-[8.5px] font-semibold ${i ? 'text-slate-500' : 'text-white'}`} style={i ? undefined : { background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>{x}</span>)}
      </div>
      <div className="flex gap-1 overflow-hidden">
        {CATS.map(([id, label, emoji]) => (
          <span key={label} className={`relative shrink-0 inline-flex items-center gap-0.5 px-2 py-1 rounded-full text-[8.5px] font-semibold border ${cat === id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
            {emoji} {label}{id === 'food' && step === 0 && <Tap />}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {shown.map(([title, price, seller, emoji, tint]) => (
          <div key={title} className="rounded-xl bg-white border border-slate-100 overflow-hidden">
            <div className="h-12 flex items-center justify-center text-[22px]" style={{ background: tint }}>{emoji}</div>
            <div className="px-2 py-1.5 leading-tight"><div className="text-[9px] font-semibold text-slate-900 truncate">{title}</div><div className="text-[9.5px] font-bold text-indigo-600">{price}</div><div className="text-[7.5px] text-slate-400 truncate">{seller}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Universities: Campus map (pages/SiteMap.jsx) ── */
const PLACES = [
  ['Moremi Hall', 'hall', 'Hall / hostel', '#6366F1', BedDouble, 'Female hostel', true],
  ['Faculty of Science', 'faculty', 'Faculty', '#8B5CF6', GraduationCap, 'Lecture theatres A–D'],
  ['North gate', 'gate', 'Gate', '#F97316', DoorOpen, 'Main visitor entrance'],
  ['Health centre', 'clinic', 'Clinic', '#EF4444', Stethoscope, 'Open 24 hours'],
  ['Kenneth Dike Library', 'library', 'Library', '#14B8A6', Library, '8 AM – 10 PM'],
];
function CampusMap({ step }) {
  return (
    <div className="space-y-2">
      <div className="leading-tight"><div className="text-[14px] font-semibold text-slate-900">Campus map</div><div className="text-[8.5px] text-slate-500">Greenfield University · 8 places</div></div>
      <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-[9px] text-slate-400"><Search size={10} /> Search halls, buildings, gates…</div>
      <div className="flex gap-1 overflow-hidden">
        <span className="shrink-0 px-2 py-0.5 rounded-full text-[8px] font-semibold bg-slate-900 text-white">All</span>
        {PLACES.slice(0, 4).map(([, k, label, color, Icon]) => <span key={k} className="shrink-0 inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[8px] font-semibold border border-slate-200 bg-white text-slate-600"><Icon size={8} style={{ color }} />{label}</span>)}
      </div>
      <div className="relative h-28 rounded-xl overflow-hidden border border-slate-200" style={{ background: 'linear-gradient(135deg,#E2E8F0,#F1F5F9)' }}>
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        {PLACES.map(([name, , , color, Icon], i) => (
          <span key={name} className="absolute w-5 h-5 rounded-full flex items-center justify-center text-white shadow" style={{ background: color, left: `${[22, 60, 80, 38, 66][i]}%`, top: `${[30, 22, 70, 62, 52][i]}%` }}><Icon size={9} /></span>
        ))}
      </div>
      <div className="space-y-1">
        {PLACES.slice(0, 4).map(([name, , label, color, Icon, desc, mine]) => (
          <div key={name} className={`flex items-center gap-2 px-2 py-1.5 rounded-xl border ${mine ? 'bg-amber-50/60 border-amber-200' : 'bg-white border-slate-100'}`}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}1A` }}><Icon size={13} style={{ color }} /></span>
            <span className="flex-1 min-w-0 leading-tight">
              <span className="flex items-center gap-1"><span className="text-[10px] font-semibold text-slate-900 truncate">{name}</span>{mine && <span className="inline-flex items-center gap-0.5 text-[7px] font-bold px-1 rounded-full bg-amber-100 text-amber-700"><Star size={6} fill="currentColor" /> Yours</span>}</span>
              <span className="block text-[8px] text-slate-500 truncate"><span style={{ color }} className="font-medium">{label}</span> · {desc}</span>
            </span>
            <span className="relative inline-flex items-center gap-0.5 text-[8px] font-semibold px-1.5 py-1 rounded-lg text-white" style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
              <Navigation size={8} /> Directions{mine && step === 0 && <Tap />}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Schools: Payments (pages/Payments.jsx, phone) ── */
function Payments({ step }) {
  return (
    <div className="space-y-2.5">
      <div className="relative overflow-hidden rounded-2xl p-3.5 text-white" style={{ background: 'linear-gradient(135deg, #312E81 0%, #4F46E5 55%, #818CF8 100%)' }}>
        <div className="absolute -top-10 -right-6 w-28 h-28 rounded-full bg-white/10" />
        <div className="relative flex items-center gap-1.5 text-[9px] text-indigo-100/90"><Wallet size={10} /> Amount due <Eye size={9} className="ml-0.5" /><RefreshCw size={9} className="ml-auto" /></div>
        <div className="relative mt-1 text-[24px] font-black tracking-tight leading-none">₦190,000</div>
        <div className="relative mt-1.5 flex gap-3 text-[8px] text-indigo-50/80"><span>2 bills to pay</span><span className="text-red-200 font-semibold">1 overdue · ₦10,000</span></div>
        <div className="relative mt-2.5 flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-2">
          <span className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center"><CalendarClock size={11} /></span>
          <span className="flex-1 min-w-0 leading-tight"><span className="block text-[9.5px] font-semibold truncate">Second-term tuition</span><span className="block text-[8px] text-indigo-50/75">Due Jan 15 · ₦180,000</span></span>
          <span className="relative text-[8px] font-bold bg-white text-indigo-700 px-2 py-0.5 rounded-full">Pay{step === 0 && <Tap />}</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {[[ArrowUpRight, 'Pay now', true], [FileText, 'My bills'], [History, 'History'], [HelpCircle, 'Help']].map(([Icon, l, p]) => (
          <div key={l} className="flex flex-col items-center gap-1"><span className={`w-9 h-9 rounded-xl flex items-center justify-center ${p ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}><Icon size={13} /></span><span className="text-[8px] font-medium text-slate-600">{l}</span></div>
        ))}
      </div>
      <div className="flex p-0.5 rounded-xl bg-slate-100">
        <span className="flex-1 text-center py-1.5 rounded-lg bg-white text-[9px] font-semibold text-slate-900 shadow-sm">My bills <span className="ml-0.5 text-[7px] font-bold px-1 rounded-full bg-red-500 text-white">2</span></span>
        <span className="flex-1 text-center py-1.5 text-[9px] font-semibold text-slate-500">History</span>
      </div>
      {[['Second-term tuition', 'School levy', '₦180,000', 'Due Jan 15', false], ['PTA contribution', 'PTA contribution', '₦10,000', 'Overdue · Dec 1', true]].map(([title, type, amt, when, over]) => (
        <div key={title} className="flex items-center gap-2 rounded-xl bg-white border border-slate-100 px-2.5 py-2">
          <span className={`w-7 h-7 rounded-lg flex items-center justify-center ${over ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>{over ? <AlertTriangle size={12} /> : <FileText size={12} />}</span>
          <span className="flex-1 min-w-0 leading-tight"><span className="block text-[9.5px] font-semibold text-slate-900 truncate">{title}</span><span className={`block text-[8px] ${over ? 'text-red-600' : 'text-slate-400'}`}>{type} · {when}</span></span>
          <span className="text-[10px] font-bold text-slate-900">{amt}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Hotels: Requests (components/requests/MemberRequests.jsx) ── */
function Requests({ step }) {
  const big = [['room_service', 'Room service', UtensilsCrossed, '#F59E0B', '#EA580C'], ['housekeeping', 'Housekeeping', Sparkles, '#14B8A6', '#0F766E']];
  return (
    <div className="space-y-2.5">
      <header className="leading-tight">
        <div className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Requests</div>
        <div className="text-[16px] font-bold text-slate-900 flex items-center gap-1"><MapPin size={13} className="text-slate-400" /> Room 304</div>
        <div className="text-[8.5px] text-slate-500 mt-0.5">Staff are told straight away.</div>
      </header>
      <div className="grid grid-cols-2 gap-2">
        {big.map(([key, label, Icon, from, to]) => {
          const active = step === 1 && key === 'housekeeping';
          return (
            <div key={key} className="relative overflow-hidden rounded-[18px] p-2.5 min-h-[100px] text-white flex flex-col justify-between" style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 100%)` }}>
              <span className="absolute -right-5 -top-5 w-16 h-16 rounded-full bg-white/10" />
              {active && <span className="absolute inset-0 rounded-[18px] border-2 border-white/60 animate-pulse" />}
              <span className="relative flex items-start justify-between">
                <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center"><Icon size={15} /></span>
                {active && <span className="inline-flex items-center gap-0.5 rounded-full bg-white text-[7px] font-extrabold uppercase px-1.5 py-0.5" style={{ color: to }}><Loader2 size={7} className="animate-spin" /> Calling</span>}
              </span>
              <span className="relative leading-tight">
                <span className="block text-[11px] font-extrabold uppercase">{active ? 'Calling…' : label}</span>
                <span className="block text-[8px] text-white/90 truncate">{active ? 'Sent to housekeeping' : key === 'room_service' ? 'Front desk' : 'Housekeeping team'}</span>
              </span>
              {key === 'housekeeping' && step === 0 && <Tap />}
            </div>
          );
        })}
      </div>
      <div>
        <div className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-1">Something else?</div>
        <div className="flex flex-wrap gap-1">
          {[[Wrench, 'Repairs', '#0EA5E9'], [ConciergeBell, 'Concierge', '#10B981'], [MessageCircle, 'Something else', '#F59E0B'], [Building2, 'Hotel management', '#7C3AED']].map(([Icon, l, c]) => (
            <span key={l} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white border border-slate-200 text-[8.5px] font-semibold text-slate-700"><Icon size={9} style={{ color: c }} /> {l}</span>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white border border-slate-100 p-2.5">
        <div className="text-[9.5px] font-semibold text-slate-900">Your requests</div>
        {step === 1
          ? <div className="mt-1.5 flex items-center gap-2"><span className="w-6 h-6 rounded-lg bg-teal-500 text-white flex items-center justify-center"><Sparkles size={10} /></span><span className="flex-1 leading-tight"><span className="block text-[9px] font-semibold text-slate-900">Housekeeping</span><span className="block text-[8px] text-slate-500">Calling… · just now</span></span></div>
          : <div className="mt-1 text-[8.5px] text-slate-400">Nothing open right now.</div>}
      </div>
    </div>
  );
}

/* ── Industries: emergency roll-call takeover (components/roles/RollcallTakeover.jsx) ── */
function Rollcall({ step }) {
  if (step === 1) {
    return (
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white px-2.5 py-2 text-[9.5px] font-semibold"><ShieldCheck size={11} /> You're marked safe</div>
        <div className="rounded-[16px] p-3 text-white" style={{ background: 'linear-gradient(140deg,#7F1D1D,#DC2626)' }}>
          <div className="flex items-start gap-2"><Siren size={14} className="animate-pulse mt-0.5" /><div className="leading-tight"><div className="text-[13px] font-extrabold">Emergency roll-call</div><div className="text-[9px] text-red-100 font-semibold">Fire alarm — assemble at Point B</div><div className="text-[7.5px] text-white/70">Started 2 minutes ago</div></div></div>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">{[['Safe', 41, 'bg-emerald-500/30'], ['Need help', 1, 'bg-white/20'], ['Missing', 6, 'bg-black/20']].map(([l, v, bg]) => <div key={l} className={`${bg} rounded-lg px-2 py-1.5`}><div className="text-[15px] font-extrabold leading-none">{v}</div><div className="text-[7.5px] text-white/80 mt-0.5">{l}</div></div>)}</div>
          <div className="mt-1.5 text-[7.5px] text-white/70">48 expected</div>
        </div>
        <div className="rounded-xl bg-white border border-slate-100 p-2.5">
          <div className="text-[9.5px] font-semibold text-slate-700">You're marked safe.</div>
          <div className="mt-2 grid grid-cols-2 gap-1.5"><span className="h-8 rounded-lg bg-emerald-500/60 text-white text-[9.5px] font-bold flex items-center justify-center gap-1"><CheckCircle2 size={11} /> I'm safe</span><span className="h-8 rounded-lg bg-red-600 text-white text-[9.5px] font-bold flex items-center justify-center gap-1"><LifeBuoy size={11} /> I need help</span></div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 z-20 flex flex-col text-white px-4 pt-6 pb-4" style={{ background: 'linear-gradient(170deg, #450A0A 0%, #7F1D1D 45%, #B91C1C 100%)' }}>
      <div className="text-center">
        <div className="w-11 h-11 rounded-full bg-white/15 mx-auto flex items-center justify-center animate-pulse"><Siren size={20} /></div>
        <div className="mt-2.5 text-[16px] font-extrabold leading-tight">🚨 Emergency roll-call</div>
        <div className="mt-0.5 text-[11px] font-semibold text-red-100">Fire alarm — assemble at Point B</div>
        <div className="mt-2 text-[9px] text-white/75">Tell us you're OK, or that you need help. Follow staff instructions.</div>
      </div>
      <div className="mt-5 flex-1 flex flex-col gap-3 justify-center">
        <span className="relative w-full min-h-[80px] rounded-[20px] bg-emerald-500 flex flex-col items-center justify-center gap-1 text-[16px] font-extrabold"><CheckCircle2 size={24} /> I'm safe<Tap /></span>
        <span className="w-full min-h-[80px] rounded-[20px] bg-white text-red-700 flex flex-col items-center justify-center gap-1 text-[16px] font-extrabold"><LifeBuoy size={24} /> I need help</span>
      </div>
    </div>
  );
}

/* ── Hospitals: Invite a visitor, patient visit (pages/NewVisitorPage.jsx + InviteForm) ── */
const CATS_H = [['Visitor', UserCheck, '#6366F1', '#EEF2FF'], ['Patient visit', Stethoscope, '#EF4444', '#FEF2F2'], ['Contractor', HardHat, '#F97316', '#FFF7ED'], ['Supplier', Truck, '#8B5CF6', '#F5F3FF'], ['Delivery', Package, '#F59E0B', '#FFFBEB']];
function Invite({ step }) {
  return (
    <div className="-mx-3 -mt-3 bg-white min-h-full">
      <div className="flex items-center gap-1.5 px-2 py-2 border-b border-slate-100">
        <ChevronLeft size={15} className="text-slate-700" />
        <div className="leading-tight"><div className="text-[12px] font-bold text-slate-900">Invite a visitor</div><div className="text-[8px] text-slate-500">They'll get a code to show at the gate</div></div>
      </div>
      <div className="px-3 pt-2.5 space-y-2.5">
        <section>
          <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Pass type</div>
          <div className="flex flex-wrap gap-1">
            {CATS_H.map(([l, Icon, c, bg]) => {
              const on = l === 'Patient visit';
              return <span key={l} className="inline-flex items-center gap-1 px-1.5 py-1 rounded-lg border-2 text-[8.5px] font-semibold" style={on ? { background: bg, borderColor: c, color: c } : { background: '#fff', borderColor: '#E2E8F0', color: '#475569' }}><Icon size={9} style={{ color: c }} /> {l}</span>;
            })}
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-[8.5px] text-slate-500"><Clock size={9} className="text-rose-500" /> Visiting hours 16:00–19:00</div>
        </section>
        <section className="space-y-1.5">
          <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">Who's coming</div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-900">Ngozi Okafor</div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-700">0803 412 7790</div>
        </section>
        <section className="space-y-1.5">
          <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">Patient visit details</div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-900">Chidi Okafor</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-900">Ward 3</div>
          </div>
        </section>
        <section className="space-y-1.5">
          <div className="text-[7.5px] font-bold uppercase tracking-wider text-slate-400">When</div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10.5px] font-semibold text-slate-900">Today · 4:30 PM</div>
        </section>
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[8px] text-slate-500 mb-1.5 flex items-center gap-1 truncate"><Shield size={9} className="text-indigo-500" /> Ngozi Okafor · Patient visit · Today 4:30 PM</div>
          <span className="relative w-full inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] font-bold text-white" style={{ background: 'linear-gradient(135deg,#6366F1,#4F46E5)' }}>
            {step ? <><RefreshCw size={11} className="animate-spin" /> Creating…</> : <><QrCode size={11} /> Create pass</>}{step === 0 && <Tap />}
          </span>
        </div>
      </div>
    </div>
  );
}

const SCREENS = { estate: Market, university: CampusMap, school: Payments, hotel: Requests, industrial: Rollcall, hospital: Invite };
export default function FeatureScreen({ type, step }) {
  const S = SCREENS[type] || Market;
  return <S step={step} />;
}
