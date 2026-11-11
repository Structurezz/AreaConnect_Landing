import { useEffect, useState } from 'react';
import {
  Signal, BatteryFull, Home as HomeIcon, UserPlus, CreditCard, MessagesSquare, LayoutGrid, Siren,
  QrCode, Wallet, Map as MapIcon, Navigation, Timer, BadgeCheck, Megaphone, BedDouble, ConciergeBell,
  Sparkles, Clock, HardHat, Truck, HeartPulse, Stethoscope, CalendarClock, LogIn, Check, Bell,
} from 'lucide-react';

// What each solution looks like in AreaMates — the member's phone, not the gate.
// `card` is the sector's headline feature; `items` the activity list; banners
// rotate as push notifications.
const MATES = {
  estate: {
    who: 'Michael', place: 'Unit 4 · Block C',
    card: { icon: QrCode, kicker: 'Visitor pass', title: 'Tunde Adeyemi', sub: 'Today, 6:30 PM · Friend', code: '482913' },
    items: [
      { icon: LogIn, color: '#10B981', title: 'Chioma Obi arrived', sub: 'Family · Main gate', when: 'now' },
      { icon: Wallet, color: '#6366F1', title: 'Service charge paid', sub: '₦25,000 · receipt sent', when: '2h' },
      { icon: Megaphone, color: '#EF4444', title: 'Water off tomorrow 10am–2pm', sub: 'Notice from management', when: '3h' },
    ],
    banners: [['Chioma Obi has arrived', 'Checked in at Main Gate'], ['Service charge paid', '₦25,000 · receipt sent'], ['New notice', 'Water supply update']],
    quick: [[UserPlus, 'Invite'], [Wallet, 'Pay'], [MessagesSquare, 'Chat'], [Siren, 'SOS']],
  },
  university: {
    who: 'Ada', place: 'Room 214 · Moremi Hall',
    card: { icon: QrCode, kicker: 'Visitor pass', title: 'Mrs. Nkem Eze', sub: 'Today, 5:00 PM · Parent', code: '736201', chip: [Timer, 'Hostel visiting hours 4–8 PM'] },
    items: [
      { icon: Navigation, color: '#2563EB', title: 'Directions sent', sub: 'Google Maps to Moremi Hall', when: 'now' },
      { icon: Wallet, color: '#6366F1', title: 'Hostel fee paid', sub: '₦85,000 · 2026/27 session', when: '1d' },
      { icon: Megaphone, color: '#EF4444', title: 'Hall meeting at 7 PM', sub: 'From the hall warden', when: '4h' },
    ],
    banners: [['Your visitor is at the North gate', 'Directions to Moremi Hall sent'], ['Hostel fee paid', 'Receipt sent'], ['Hall meeting at 7 PM', 'From the hall warden']],
    quick: [[UserPlus, 'Invite'], [MapIcon, 'Campus map'], [Wallet, 'Fees'], [Siren, 'SOS']],
  },
  school: {
    who: 'Mrs. Adeyemi', place: 'Parent · Tolu, JSS 2B',
    card: { icon: BadgeCheck, kicker: 'Authorised pickup', title: 'Tolu Adeyemi · JSS 2B', sub: 'Collected by: Uncle Femi', code: '205847' },
    items: [
      { icon: Check, color: '#10B981', title: 'Tolu released at the gate', sub: 'Yesterday · to Mrs. Adeyemi', when: '1d' },
      { icon: Wallet, color: '#6366F1', title: 'Second-term fees', sub: '₦180,000 · due 15 Jan', when: '2d' },
      { icon: Megaphone, color: '#F59E0B', title: 'Inter-house sports on Friday', sub: 'From the school office', when: '3h' },
    ],
    banners: [['Pickup pass created', 'Uncle Femi · code 205847'], ['Tolu has been released', 'Main gate · 2:05 PM'], ['School fees reminder', 'Due 15 Jan']],
    quick: [[BadgeCheck, 'Pickup'], [Wallet, 'Fees'], [Bell, 'Notices'], [Siren, 'SOS']],
  },
  hotel: {
    who: 'David', place: 'Room 304 · Floor 3',
    card: { icon: BedDouble, kicker: 'Your stay', title: 'Checked in', sub: 'Check-out Fri, 12:00 PM', chip: [CalendarClock, '3 nights left'] },
    items: [
      { icon: ConciergeBell, color: '#8B5CF6', title: 'Housekeeping on the way', sub: 'Request · fresh towels', when: 'now' },
      { icon: QrCode, color: '#6366F1', title: 'Pass for Sarah Johnson', sub: 'Today, 7:00 PM · code 618390', when: '1h' },
      { icon: Sparkles, color: '#F59E0B', title: 'Breakfast 6:30–10:30 AM', sub: 'From the front desk', when: '9h' },
    ],
    banners: [['Housekeeping is on the way', 'Fresh towels · Room 304'], ['Sarah Johnson has arrived', 'At reception'], ['Late check-out?', 'Ask the front desk']],
    quick: [[UserPlus, 'Invite'], [ConciergeBell, 'Request'], [MessagesSquare, 'Front desk'], [Siren, 'SOS']],
  },
  industrial: {
    who: 'Emeka', place: 'Production · Plant A',
    card: { icon: Clock, kicker: 'On shift', title: '07:00 – 15:00', sub: 'Mon – Fri · Plant A', chip: [Check, 'Verified at the gate'] },
    items: [
      { icon: HardHat, color: '#F97316', title: 'Contractor accepted induction', sub: 'Bolaji · Okon Electricals', when: 'now' },
      { icon: Truck, color: '#0EA5E9', title: 'Delivery expected 2 PM', sub: 'Steel pipes · Dangote Supply', when: '1h' },
      { icon: Megaphone, color: '#EF4444', title: 'Fire drill at 11 AM', sub: 'From the safety officer', when: '2h' },
    ],
    banners: [['Contractor checked in', 'Safety induction accepted'], ['Delivery at the gate', 'Dangote Supply'], ['Fire drill at 11 AM', 'Assemble at Point B']],
    quick: [[UserPlus, 'Invite'], [HardHat, 'Contractor'], [Truck, 'Delivery'], [Siren, 'SOS']],
  },
  hospital: {
    who: 'Ngozi', place: 'Next of kin · Ward 3, Bed 12',
    card: { icon: HeartPulse, kicker: 'Patient visit', title: 'Visiting Mr. Okafor', sub: 'Ward 3 · Bed 12 · code 914026', chip: [Timer, 'Visiting hours 4–7 PM · 1 of 2'] },
    items: [
      { icon: Stethoscope, color: '#F43F5E', title: 'Dr. Bello updated the care team', sub: 'Ward 3', when: '1h' },
      { icon: Wallet, color: '#6366F1', title: 'Bill paid', sub: '₦42,500 · receipt sent', when: '1d' },
      { icon: Navigation, color: '#2563EB', title: 'Directions to Ward 3', sub: 'Google Maps · Block B', when: '2h' },
    ],
    banners: [['Visit approved', 'Ward 3 · from 4 PM'], ['Bill paid', 'Receipt sent'], ['Visiting hours start at 4 PM', 'Ward 3']],
    quick: [[HeartPulse, 'Visit'], [Stethoscope, 'Care team'], [Wallet, 'Bills'], [Siren, 'SOS']],
  },
};

const TABS = [[HomeIcon, 'Home'], [UserPlus, 'Visitors'], [CreditCard, 'Payments'], [MessagesSquare, 'Chat'], [LayoutGrid, 'Menu']];

export default function SectorPhone({ id, accent = '#6366F1' }) {
  const m = MATES[id] || MATES.estate;
  const [n, setN] = useState(0);
  useEffect(() => { const t = setInterval(() => setN((x) => x + 1), 3000); return () => clearInterval(t); }, []);
  const [bTitle, bMeta] = m.banners[n % m.banners.length];
  const C = m.card;
  const ChipIcon = C.chip?.[0];

  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute inset-0 blur-3xl rounded-full opacity-70" style={{ background: `${accent}33` }} />

      <div className="relative z-10 rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-slate-900/30">
        <div className="relative rounded-[2.1rem] bg-[#F8FAFC] overflow-hidden h-[540px] sm:h-[570px] flex flex-col">
          <div className="h-9 bg-white flex items-center justify-between px-6 text-[10px] font-semibold text-slate-900 flex-shrink-0">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>

          {/* push banner */}
          <div className="absolute top-10 left-2.5 right-2.5 z-30 pointer-events-none">
            <div key={n} className="home-banner flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-xl p-2.5">
              <img src="/apps/areamates.png" alt="" className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">AreaMates</span>
                  <span className="text-[9px] text-slate-400">now</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-900 truncate">{bTitle}</div>
                <div className="text-[10px] text-slate-500 truncate">{bMeta}</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden px-3 pt-2.5 pb-2 flex flex-col gap-2.5">
            {/* greeting */}
            <div className="leading-tight">
              <div className="text-[8.5px] font-medium text-slate-400 truncate">Tuesday, 20 October · {m.place}</div>
              <div className="text-[15px] font-semibold text-slate-900 tracking-tight">Good evening, {m.who}</div>
            </div>

            {/* headline feature for this solution */}
            <div className="rounded-2xl p-3 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}CC)` }}>
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="relative flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-white/80"><C.icon size={11} /> {C.kicker}</div>
              <div className="relative mt-1.5 text-[14px] font-semibold leading-tight">{C.title}</div>
              <div className="relative text-[10px] text-white/80">{C.sub}</div>
              {C.code && (
                <div className="relative mt-2 flex items-center justify-between rounded-xl bg-white/15 px-2.5 py-1.5">
                  <span className="font-mono text-[15px] font-bold tracking-[0.2em]">{C.code}</span>
                  <QrCode size={18} />
                </div>
              )}
              {C.chip && (
                <div className="relative mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[9.5px] font-medium">
                  <ChipIcon size={10} /> {C.chip[1]}
                </div>
              )}
            </div>

            {/* quick actions */}
            <div className="grid grid-cols-4 gap-1.5">
              {m.quick.map(([Icon, label]) => (
                <div key={label} className="rounded-xl bg-white border border-slate-100 py-2 flex flex-col items-center gap-1">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: label === 'SOS' ? 'rgba(239,68,68,0.10)' : `${accent}1A`, color: label === 'SOS' ? '#DC2626' : accent }}>
                    <Icon size={13} />
                  </span>
                  <span className="text-[8.5px] font-medium text-slate-600 truncate max-w-full px-1">{label}</span>
                </div>
              ))}
            </div>

            {/* activity */}
            <div className="rounded-2xl bg-white border border-slate-100 overflow-hidden">
              <div className="px-3 pt-2.5 pb-1 text-[10px] font-semibold text-slate-900">Today</div>
              {m.items.map((it, i) => (
                <div key={it.title} className={`flex items-center gap-2.5 px-3 py-2 ${i ? 'border-t border-slate-50' : ''}`}>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${it.color}1A`, color: it.color }}><it.icon size={12} /></span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className="block text-[10.5px] font-semibold text-slate-900 truncate">{it.title}</span>
                    <span className="block text-[9px] text-slate-400 truncate">{it.sub}</span>
                  </span>
                  <span className="text-[8.5px] text-slate-400">{it.when}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tab bar */}
          <div className="h-12 bg-white border-t border-slate-100 flex items-center justify-around flex-shrink-0">
            {TABS.map(([Icon, label], i) => (
              <span key={label} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? accent : '#94A3B8' }}>
                <Icon size={14} /><span className="text-[8px] font-medium">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cycles through every solution (Features page): the same AreaMates phone,
// re-skinned per sector, with a pill naming the sector on screen.
const CYCLE = [
  ['estate', 'Estates', '#10b981'], ['university', 'Universities', '#2563eb'], ['school', 'Schools', '#f59e0b'],
  ['hotel', 'Hotels', '#8b5cf6'], ['industrial', 'Industries', '#f97316'], ['hospital', 'Hospitals', '#f43f5e'],
];
export function SectorPhoneCycle() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % CYCLE.length), 4500); return () => clearInterval(t); }, []);
  const [id, label, accent] = CYCLE[i];
  return (
    <div className="relative">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 rounded-full bg-white border border-slate-200 shadow-md px-1.5 py-1">
        {CYCLE.map(([k, l, a], j) => (
          <button key={k} type="button" onClick={() => setI(j)} aria-label={l}
            className={`rounded-full text-[10px] font-semibold transition-all ${j === i ? 'px-2.5 py-0.5 text-white' : 'w-2 h-2'}`}
            style={{ background: j === i ? a : '#CBD5E1' }}>
            {j === i ? l : ''}
          </button>
        ))}
      </div>
      <SectorPhone key={id} id={id} accent={accent} />
    </div>
  );
}
