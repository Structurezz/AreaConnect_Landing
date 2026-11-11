import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns during prerender; fall back to useEffect on the server.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
import {
  Signal, BatteryFull, Home, ShieldCheck, Siren, UserPlus, ShoppingBag, MessageSquare, Music, CreditCard,
  Phone, Scale, ClipboardList, Map as MapIcon, Users, Bell, LayoutDashboard, UserCheck, LogIn, LogOut,
  CalendarClock, Megaphone, BedDouble, HeartPulse, Radio, Navigation, Clock, MapPin, ArrowUpRight,
} from 'lucide-react';

// A faithful copy of the real AreaMates home screen
// (residents/src/components/dashboard/MobileDashboard.jsx). Every solution
// uses the same screen; what changes comes from the site type exactly as in
// the app: the words (unit, bills, household), which quick-action tiles show
// (DEFAULT_MODULES per type), the stay / care-team / hall cards, the shift line
// and the SOS line. The phone scrolls through the screen like a recording.

const ALL = { payments: true, marketplace: true, community: true, events: true, neighbours: true, household: true };
const MODULES = {
  estate:     { ...ALL, requests: false, stays: false, shifts: false },
  school:     { ...ALL, marketplace: false, neighbours: false, requests: true, shifts: true },
  university: { ...ALL, household: false, requests: true, shifts: true },
  hotel:      { ...ALL, payments: false, marketplace: false, community: false, neighbours: false, requests: true, stays: true, shifts: true },
  industrial: { ...ALL, payments: false, marketplace: false, household: false, requests: true, shifts: true },
  hospital:   { ...ALL, payments: false, marketplace: false, community: false, events: false, neighbours: false, requests: true, stays: true, shifts: true },
};
const TERMS = {
  estate:     { site: 'Estate',   unit: 'Unit',       dues: 'Estate bills',  household: 'Household' },
  school:     { site: 'Campus',   unit: 'Class',      dues: 'School fees',   household: 'Family' },
  university: { site: 'Campus',   unit: 'Room',       dues: 'Hostel & fees', household: 'Family' },
  hotel:      { site: 'Property', unit: 'Room',       dues: 'Bills',         household: 'Party' },
  industrial: { site: 'Site',     unit: 'Department', dues: 'Charges',       household: 'Team' },
  hospital:   { site: 'Hospital', unit: 'Ward',       dues: 'Bills',         household: 'Next of kin' },
};
const ASSIGN = { hospital: 'Care team', university: 'Adviser & warden', school: 'Class teacher', industrial: 'Supervisor' };

// Same list and rules as MobileDashboard ACTIONS
const ACTIONS = [
  { label: 'Invite',     Icon: UserPlus,      color: '#6366F1' },
  { label: 'Market',     Icon: ShoppingBag,   color: '#F59E0B', module: 'marketplace' },
  { label: 'Chat',       Icon: MessageSquare, color: '#3B82F6' },
  { label: 'Lounge',     Icon: Music,         color: '#EC4899', module: 'community' },
  { label: 'Payments',   Icon: CreditCard,    color: '#10B981', module: 'payments', siteLabel: (t) => t.dues },
  { label: 'Neighbours', Icon: Phone,         color: '#0EA5E9', module: 'neighbours', siteLabel: () => 'Directory' },
  { label: 'Court',      Icon: Scale,         color: '#B45309', module: 'community' },
  { label: 'Requests',   Icon: ClipboardList, color: '#F97316', module: 'requests', nonEstate: true },
  { label: 'Map',        Icon: MapIcon,       color: '#14B8A6', nonEstate: true },
  { label: 'Household',  Icon: Users,         color: '#8B5CF6', module: 'household', nonEstate: true, siteLabel: (t) => t.household },
  { label: 'Alerts',     Icon: Bell,          color: '#DC2626' },
];

// Sample people and places (illustrative), one set per solution
const SAMPLE = {
  estate: {
    site: 'Greenfield Estate', unit: 'Unit 4 · Block C', first: 'Michael',
    guests: [['Tunde Adeyemi', 'Friend', '482913'], ['Chioma Obi', 'Family', '715204'], ['Jumia rider', 'Delivery', '390561']],
    notices: [['Water off tomorrow 10am–2pm', true], ['Estate meeting on Saturday']],
  },
  university: {
    site: 'Greenfield University', unit: 'Room 214 · Moremi Hall', first: 'Ada',
    guests: [['Mrs. Nkem Eze', 'Parent', '736201'], ['Tobi Lawal', 'Study group', '508114'], ['Chowdeck rider', 'Delivery', '219887']],
    notices: [['Hall meeting tonight at 7 PM', true], ['Exam timetable is out']],
    team: { title: 'My adviser & warden', sub: 'Room 214', groups: [['Adviser & warden', HeartPulse, '#DB2777', ['Dr. Okoro', 'Mrs. Bassey']], ['On call now', Radio, '#059669', ['Hall porter desk']]] },
    place: { word: 'hall', name: 'Moremi Hall' },
  },
  school: {
    site: 'Greenfield College', unit: 'JSS 2B', first: 'Funke',
    guests: [['Uncle Femi', 'Pickup · Tolu, JSS 2B', '205847'], ['Mrs. Adeyemi', 'PTA meeting', '661430'], ['Book supplier', 'Delivery', '318072']],
    notices: [['Inter-house sports on Friday', true], ['Second-term fees reminder']],
    team: { title: "Tolu's class teacher", sub: 'Class JSS 2B', groups: [['Class teacher', HeartPulse, '#DB2777', ['Mr. Adebayo']]] },
  },
  hotel: {
    site: 'Greenfield Hotel', unit: 'Room 304', first: 'David',
    guests: [['Sarah Johnson', 'Friend', '618390'], ['Kemi Ade', 'Business meeting', '440921'], ['Glovo rider', 'Delivery', '702553']],
    notices: [['Breakfast 6:30–10:30 AM', false], ['Pool closed for cleaning 2–4 PM']],
    stay: { label: 'Your stay', room: 'Room 304', headline: 'Checks out in 2 days 4h', in: ['Check-in', 'Mon 18 Nov · 14:00'], out: ['Check-out', 'Fri 22 Nov · 12:00'], note: 'Your access ends at check-out. Ask the front desk to extend your stay.' },
  },
  industrial: {
    site: 'Greenfield Plant', unit: 'Production', first: 'Emeka', shift: 'Mon–Fri · 07:00–15:00',
    guests: [['Bolaji · Okon Electricals', 'Contractor', '557310'], ['Dangote Supply', 'Delivery · steel pipes', '873026'], ['Mrs. Ibe', 'Interview', '145590']],
    notices: [['Fire drill at 11 AM — assemble at Point B', true], ['New PPE in stores']],
    team: { title: 'My supervisor', sub: 'Department Production', groups: [['Supervisor', HeartPulse, '#DB2777', ['Mr. Uche']], ['On call now', Radio, '#059669', ['Safety officer']]] },
  },
  hospital: {
    site: 'Greenfield Hospital', unit: 'Ward 3 · Bed 12', first: 'Chidi',
    guests: [['Ngozi Okafor', 'Patient visit', '914026'], ['Emeka Okafor', 'Patient visit', '388215'], ['Pharmacy', 'Delivery', '520734']],
    notices: [['Visiting hours today 4–7 PM', false], ['Ward round at 3 PM']],
    stay: { label: 'Your admission', room: 'Ward 3', headline: 'Admission Mon 18 Nov · 10:20', in: ['Admission', 'Mon 18 Nov · 10:20'], out: ['Discharge', 'Not set yet'] },
    team: { title: 'My care team', sub: 'Ward 3', groups: [['Care team', HeartPulse, '#DB2777', ['Dr. Bello', 'Nurse Amaka']], ['On call now', Radio, '#059669', ['Dr. Yusuf']]] },
  },
};

// Guest story over time: a pass is created, guests arrive, one leaves
const STATES = [['active', 'checked-in', 'checked-out'], ['checked-in', 'checked-in', 'checked-out'], ['checked-in', 'checked-out', 'checked-out']];
const VISIT = {
  'checked-in':  { Icon: LogIn,         color: '#10B981', verb: 'arrived' },
  'checked-out': { Icon: LogOut,        color: '#94A3B8', verb: 'left' },
  active:        { Icon: CalendarClock, color: '#6366F1', verb: 'is expected' },
};
const WHEN = ['now', '2h', '5h'];

export default function SectorPhone({ id }) {
  const type = SAMPLE[id] ? id : 'estate';
  const d = SAMPLE[type], t = TERMS[type], mods = MODULES[type];
  const isEstate = type === 'estate';
  const assign = ASSIGN[type];
  const actions = ACTIONS.filter((a) => (!a.module || mods[a.module]) && (!a.nonEstate || !isEstate))
    .map((a) => (!isEstate && a.siteLabel ? { ...a, label: a.siteLabel(t) } : a));
  const tabs = [[LayoutDashboard, 'Home'], [UserCheck, 'Visitors'], ...(mods.payments ? [[CreditCard, isEstate ? 'Payments' : t.dues]] : []), [MessageSquare, 'Chat'], [Bell, 'Alerts']];

  const [n, setN] = useState(0);
  useEffect(() => { const i = setInterval(() => setN((x) => x + 1), 2600); return () => clearInterval(i); }, []);
  const st = STATES[n % STATES.length];
  const live = st.filter((s) => s !== 'checked-out').length;
  const inside = st.filter((s) => s === 'checked-in').length;
  const feed = [
    ...d.notices.filter((x) => x[1]).map(([title]) => ({ k: title, Icon: Megaphone, color: '#EF4444', title, sub: 'Notice from management', urgent: true, when: '1h' })),
    ...d.guests.map(([name, purpose, code], i) => {
      const m = VISIT[st[i]];
      return { k: name, Icon: m.Icon, color: m.color, title: `${name} ${m.verb}`, sub: `${purpose}${st[i] === 'active' ? ` · code ${code}` : ''}`, when: WHEN[i] };
    }),
    ...d.notices.filter((x) => !x[1]).map(([title]) => ({ k: title, Icon: Megaphone, color: '#F59E0B', title, sub: 'Notice from management', when: '1d' })),
  ];
  const banner = st[0] === 'checked-in' && n % STATES.length === 1
    ? [`${d.guests[0][0]} has arrived`, 'Checked in at the gate']
    : [d.notices[0][0], `${t.site} notice`];

  // Scroll the screen like a recording: measure how far it can travel
  const vp = useRef(null), body = useRef(null);
  const [travel, setTravel] = useState(0);
  useIsoLayoutEffect(() => {
    const measure = () => setTravel(Math.max(0, (body.current?.scrollHeight || 0) - (vp.current?.clientHeight || 0)));
    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    ro?.observe(body.current);
    return () => ro?.disconnect();
  }, [type]);

  const sosSub = !isEstate && assign
    ? `Alerts your ${assign.toLowerCase()} and security with your ${t.unit.toLowerCase()}`
    : `Alerts security and management with your ${t.unit.toLowerCase()}`;

  return (
    <div className="relative mx-auto w-[270px] sm:w-[290px]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/35 to-brand-400/25 blur-3xl rounded-full" />
      <div className="relative z-10 rounded-[2.6rem] bg-slate-900 p-2.5 shadow-2xl shadow-indigo-900/30">
        <div className="relative rounded-[2.1rem] bg-[#F8FAFC] overflow-hidden h-[540px] sm:h-[570px] flex flex-col">
          <div className="h-9 bg-white flex items-center justify-between px-6 text-[10px] font-semibold text-slate-900 flex-shrink-0 relative z-20">
            <span>9:41</span>
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-slate-900" />
            <span className="flex items-center gap-1"><Signal size={10} /><BatteryFull size={12} /></span>
          </div>

          {/* push banner */}
          <div className="absolute top-10 left-2.5 right-2.5 z-30 pointer-events-none">
            <div key={n} className="home-banner flex items-center gap-2.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/70 shadow-xl p-2.5">
              <img src="/apps/areamates.png" alt="" className="w-7 h-7 rounded-lg flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between"><span className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">AreaMates</span><span className="text-[9px] text-slate-400">now</span></div>
                <div className="text-[11px] font-semibold text-slate-900 truncate">{banner[0]}</div>
                <div className="text-[10px] text-slate-500 truncate">{banner[1]}</div>
              </div>
            </div>
          </div>

          <div ref={vp} className="flex-1 overflow-hidden">
            <div ref={body} className="mates-scroll px-3 pt-3 pb-4 space-y-3.5" style={{ '--mates-travel': `-${travel}px` }}>
              {/* Greeting */}
              <header className="flex items-center gap-2">
                <div className="flex-1 min-w-0 leading-tight">
                  <div className="text-[8.5px] font-medium text-slate-400 flex items-center gap-1 truncate">Tuesday, 20 November <span className="text-slate-300">·</span> <Home size={8} /> {d.unit}</div>
                  <div className="text-[15px] font-semibold text-slate-900 tracking-tight truncate">Good evening, {d.first}</div>
                  {d.shift && mods.shifts && <div className="text-[8.5px] text-slate-500 flex items-center gap-1 mt-0.5"><Clock size={8} /> Your shift: <span className="font-semibold text-slate-700">{d.shift}</span></div>}
                </div>
                <div className="relative flex-shrink-0">
                  <span className="absolute -inset-[2px] rounded-full" style={{ background: 'conic-gradient(from 180deg, #818CF8, #6366F1, #EC4899, #818CF8)' }} />
                  <span className="relative w-8 h-8 rounded-full flex items-center justify-center font-semibold text-[11px] text-indigo-700 bg-indigo-50 border-2 border-white">{d.first[0]}</span>
                </div>
              </header>

              {/* Home status */}
              <section className="relative overflow-hidden rounded-[18px] p-3.5 text-white" style={{ background: 'linear-gradient(150deg, #1E1B4B 0%, #312E81 50%, #4F46E5 115%)' }}>
                <div className="absolute -top-14 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(129,140,248,0.45)' }} />
                <div className="relative flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[8.5px] font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/15 truncate max-w-[80%]">
                    <span className="w-1 h-1 rounded-full bg-indigo-200" /> <span className="truncate">Live · {d.site}</span>
                  </span>
                  <ShieldCheck size={11} className="text-white/40" />
                </div>
                <div className="relative mt-3 flex items-center gap-3">
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <svg viewBox="0 0 48 48" className="w-12 h-12 -rotate-90">
                      <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
                      <circle cx="24" cy="24" r="20" fill="none" stroke="#A5B4FC" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(live / 3) * 125.6} 125.6`} style={{ transition: 'stroke-dasharray .6s' }} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[13px] font-bold">{live}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold leading-snug" style={{ color: '#E0E7FF' }}>{inside ? `${inside} of your guests ${inside === 1 ? 'is' : 'are'} inside` : `${live} guests on the way`}</div>
                    <div className="text-[8.5px] text-white/60 mt-0.5">Passes stay live until your guest leaves</div>
                  </div>
                </div>
                <div className="relative mt-3 pt-2.5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  {[['Live passes', live], ['Recent guests', 3], ['Notices', d.notices.length]].map(([l, v]) => (
                    <div key={l}><div className="text-[13px] font-bold">{v}</div><div className="text-[7.5px] text-white/55">{l}</div></div>
                  ))}
                </div>
                <div className="relative mt-3 flex items-center gap-2 rounded-xl px-2.5 py-2 bg-red-500/20 border border-red-400/35">
                  <span className="w-6 h-6 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0"><Siren size={11} className="text-white" /></span>
                  <span className="flex-1 min-w-0 leading-tight">
                    <span className="block text-[10px] font-semibold">Emergency SOS</span>
                    <span className="block text-[7.5px] text-red-100/75 truncate">{sosSub}</span>
                  </span>
                  <span className="text-[7.5px] font-bold tracking-wider bg-red-500 px-1.5 py-0.5 rounded-md">SOS</span>
                </div>
              </section>

              {/* Quick actions — the site's modules decide which tiles show */}
              <section className="grid grid-cols-4 gap-x-1.5 gap-y-2.5">
                {actions.map(({ label, Icon, color }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="w-[42px] h-[42px] rounded-[14px] flex items-center justify-center border" style={{ background: `linear-gradient(145deg, ${color}1A, ${color}08)`, borderColor: `${color}2E` }}>
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}, ${color}D9)` }}><Icon size={12} className="text-white" /></span>
                    </span>
                    <span className="text-[8px] font-medium text-slate-600 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </section>

              {/* Stay / admission (module stays) */}
              {d.stay && mods.stays && (
                <section className="rounded-xl border p-3" style={{ background: 'linear-gradient(140deg, #0EA5E914 0%, #FFFFFF 55%)', borderColor: '#0EA5E92E' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #0EA5E9, #0284C7)' }}><BedDouble size={13} className="text-white" /></span>
                    <div className="min-w-0 leading-tight">
                      <div className="text-[8.5px] font-medium text-slate-500">{d.stay.label} · <span className="font-semibold text-slate-700">{d.stay.room}</span></div>
                      <div className="text-[12px] font-semibold text-slate-900 truncate">{d.stay.headline}</div>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {[d.stay.in, d.stay.out].map(([k, v], i) => (
                      <div key={k} className="rounded-lg bg-white border border-slate-200/70 px-2 py-1.5">
                        <div className="text-[7.5px] text-slate-400 flex items-center gap-0.5">{i ? <LogOut size={8} /> : <LogIn size={8} />} {k}</div>
                        <div className="text-[9px] font-semibold text-slate-800 truncate">{v}</div>
                      </div>
                    ))}
                  </div>
                  {d.stay.note && <p className="mt-1.5 text-[7.5px] text-slate-400">{d.stay.note}</p>}
                </section>
              )}

              {/* Care team / adviser / supervisor (site roles) */}
              {d.team && (
                <section className="rounded-xl bg-white border border-slate-200/70 p-3">
                  <div className="text-[11px] font-semibold text-slate-900">{d.team.title}</div>
                  <div className="text-[8.5px] text-slate-400">{d.team.sub}</div>
                  <div className="mt-2 space-y-1.5">
                    {d.team.groups.map(([g, GIcon, col, people]) => (
                      <div key={g}>
                        <div className="text-[7.5px] font-semibold uppercase tracking-wider flex items-center gap-1" style={{ color: col }}><GIcon size={8} /> {g}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {people.map((p) => (
                            <span key={p} className="inline-flex items-center gap-1 rounded-full bg-slate-50 border border-slate-100 pl-0.5 pr-2 py-0.5 text-[8.5px] font-medium text-slate-700">
                              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold text-white" style={{ background: col }}>{p.replace(/^(Dr\.|Mr\.|Mrs\.|Nurse) /, '')[0]}</span>{p}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Your hall (linked place on the site map) */}
              {d.place && (
                <section className="flex items-center gap-2 rounded-xl bg-white border border-slate-200/70 p-2.5">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center flex-shrink-0"><MapPin size={13} /></span>
                  <span className="flex-1 min-w-0 leading-tight">
                    <span className="block text-[8.5px] font-medium text-slate-500">Your {d.place.word}</span>
                    <span className="block text-[11px] font-semibold text-slate-900 truncate">{d.place.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[8.5px] font-semibold px-2 py-1 rounded-lg text-white bg-teal-600"><Navigation size={9} /> Directions</span>
                </section>
              )}

              {/* Live activity */}
              <section>
                <div className="flex items-end justify-between mb-1.5">
                  <div className="leading-tight">
                    <div className="text-[11px] font-semibold text-slate-900">Live activity</div>
                    <div className="text-[8.5px] text-slate-400">Your guests and {t.site.toLowerCase()} notices</div>
                  </div>
                  <span className="text-[8.5px] font-semibold text-indigo-600 flex items-center gap-0.5">My passes <ArrowUpRight size={9} /></span>
                </div>
                <div className="rounded-[14px] bg-white border border-slate-200/70 p-1">
                  {feed.map((f) => (
                    <div key={f.k + f.title} className="flex items-center gap-2 px-1.5 py-1.5 rounded-xl" style={{ background: f.urgent ? 'rgba(239,68,68,0.06)' : undefined }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}18` }}><f.Icon size={11} style={{ color: f.color }} /></span>
                      <span className="flex-1 min-w-0 leading-tight">
                        <span className={`block text-[9.5px] font-semibold truncate ${f.urgent ? 'text-red-700' : 'text-slate-900'}`}>{f.title}</span>
                        <span className="block text-[8px] text-slate-500 truncate">{f.sub}</span>
                      </span>
                      <span className="text-[7.5px] text-slate-400">{f.when}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Map */}
              <section>
                <div className="text-[11px] font-semibold text-slate-900 mb-1.5">Your {t.site.toLowerCase()}</div>
                <div className="relative h-24 rounded-[14px] overflow-hidden border border-slate-200/70" style={{ background: 'linear-gradient(135deg,#E2E8F0,#F1F5F9)' }}>
                  <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(#CBD5E1 1px, transparent 1px), linear-gradient(90deg, #CBD5E1 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-indigo-600"><MapPin size={20} fill="#6366F1" className="text-white" /></span>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom tabs — the bills tab only where payments are on */}
          <div className="h-12 bg-white border-t border-slate-100 flex items-center justify-around flex-shrink-0">
            {tabs.map(([Icon, label], i) => (
              <span key={label} className="flex flex-col items-center gap-0.5" style={{ color: i === 0 ? '#4F46E5' : '#94A3B8' }}>
                <Icon size={14} /><span className="text-[8px] font-medium">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Cycles through every solution (Features page) with a pill naming the one on screen
const CYCLE = [['estate', 'Estates', '#10b981'], ['university', 'Universities', '#2563eb'], ['school', 'Schools', '#f59e0b'], ['hotel', 'Hotels', '#8b5cf6'], ['industrial', 'Industries', '#f97316'], ['hospital', 'Hospitals', '#f43f5e']];
export function SectorPhoneCycle() {
  const [i, setI] = useState(0);
  useEffect(() => { const x = setInterval(() => setI((v) => (v + 1) % CYCLE.length), 14000); return () => clearInterval(x); }, [i]);
  return (
    <div className="relative">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 rounded-full bg-white border border-slate-200 shadow-md px-1.5 py-1">
        {CYCLE.map(([k, l, a], j) => (
          <button key={k} type="button" onClick={() => setI(j)} aria-label={l}
            className={`rounded-full text-[10px] font-semibold transition-all ${j === i ? 'px-2.5 py-0.5 text-white' : 'w-2 h-2'}`}
            style={{ background: j === i ? a : '#CBD5E1' }}>{j === i ? l : ''}</button>
        ))}
      </div>
      <SectorPhone key={CYCLE[i][0]} id={CYCLE[i][0]} />
    </div>
  );
}
