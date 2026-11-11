import { Link } from 'react-router-dom';
import {
  Users, CreditCard, Megaphone, UserCheck, Bell, Shield, BarChart3, FileText, Wallet,
  PhoneCall, Layers, Globe, Zap, Lock, MapPin, Shapes, BedDouble, Clock, Truck,
  Network, ClipboardCheck, ArrowUpRight, Check,
} from 'lucide-react';
import ProductPage from '../components/ProductPage';
import AdminDashboard from '../components/mockups/AdminDashboard';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, SpotlightCard } from '../components/ui/Modern';
import { SECTORS, SECTOR_LINKS } from '../lib/sectors';

const FEATURES = [
  { icon: Shapes,     title: 'Site type & modules',  desc: 'Estate, university, school, hotel, industrial site or hospital — the dashboard uses your words and you switch modules on or off for your members.', isNew: true },
  { icon: Users,      title: 'Member management',    desc: 'Residents, students, guests, employees or patients — invite one by one or bulk-import a CSV. Everyone gets a welcome email with their login.' },
  { icon: MapPin,     title: 'Units, places & map',  desc: 'Blocks, halls, rooms, departments or wards, pinned on a real Google Map with your gates — visitor passes include directions.', isNew: true },
  { icon: Network,    title: 'Staff roles & alert routing', desc: 'Give staff roles (warden, nurse, front desk, safety officer…) and assign them to areas — alerts and requests reach the right person and escalate if nobody answers.', isNew: true },
  { icon: BedDouble,  title: 'Stays & room board',   desc: 'Check guests in with dates, watch the live room board, extend or end a stay — access ends automatically at check-out.', isNew: true },
  { icon: Clock,      title: 'Shifts & roll call',   desc: 'Set shift hours for staff, see who is on shift and run a roll call during an emergency.', isNew: true },
  { icon: Truck,      title: 'Gate log',             desc: 'Every delivery, vehicle, contractor and supplier logged in and out — with safety induction acceptance on record.', isNew: true },
  { icon: ClipboardCheck, title: 'Service requests', desc: 'Maintenance, housekeeping and help requests routed to the assigned team and tracked to done.', isNew: true },
  { icon: UserCheck,  title: 'Visitor oversight',    desc: 'Live entry logs, who’s inside now, visiting hours and limits, and a blacklist that syncs to every gate.' },
  { icon: CreditCard, title: 'Dues & fees',          desc: 'Service charge, school or hostel fees: levy schedules, reminders and Paystack checkout with full reconciliation.' },
  { icon: Wallet,     title: 'Site wallet',          desc: 'Collected funds land in your wallet — withdraw to any Nigerian bank.' },
  { icon: Shield,     title: 'Guard management',     desc: 'Invite security staff, suspend or reactivate them, and review their activity.' },
  { icon: Bell,       title: 'Live alerts',          desc: 'Panic alerts appear on your dashboard instantly, and you can broadcast to everyone.' },
  { icon: PhoneCall,  title: 'Calls',                desc: 'Call any member or the gate straight from the dashboard.' },
  { icon: Megaphone,  title: 'Announcements',        desc: 'Notices with images, push delivery and read receipts.' },
  { icon: FileText,   title: 'Rules & handbook',     desc: 'Upload your constitution, handbook or house rules once so members and the AI assistant can reference them.' },
  { icon: BarChart3,  title: 'Analytics',            desc: 'Visitor volume, collection rates and activity in real time.' },
  { icon: Layers,     title: 'Multi-site',           desc: 'Manage estates, campuses or branches from one login on Enterprise.' },
];

const STEPS = [
  { title: 'Create your site',  desc: 'Sign up, pick your site type and add your units, halls, rooms or wards.' },
  { title: 'Import members',    desc: 'Upload a CSV — accounts and welcome emails go out automatically.' },
  { title: 'Set up payments',   desc: 'Create dues or fee schedules and connect your bank for payouts.' },
  { title: 'Run it live',       desc: 'Watch visitors, payments and alerts from one dashboard.' },
];

// Admin view per sector — estates live on the homepage, the rest come from the sector pages.
const ESTATE_ADMIN = {
  who: 'For estate managers',
  desc: 'Residents and units, service charge, visitors, guards and alerts for gated estates and communities.',
  points: ['Residents, units & households', 'Service charge & levies', 'Visitor log & blacklist', 'Dues enforcement'],
};

function SectorAdmins() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="max-w-xl mb-10">
          <Reveal><Eyebrow>Solutions</Eyebrow></Reveal>
          <Reveal delay={60}>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold tracking-tight text-slate-900">One dashboard, shaped to your site.</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-3 text-[15px] text-slate-500 leading-relaxed">Pick your site type and Admin switches on the right tools and speaks your language.</p>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {SECTOR_LINKS.map((l, i) => {
            const a = SECTORS[l.id]?.apps?.admin || (l.id === 'estate' ? ESTATE_ADMIN : null);
            if (!a) return null;
            return (
              <Reveal key={l.id} delay={(i % 3) * 70} className="h-full">
                <Link to={l.to} className="block h-full">
                  <SpotlightCard glow={`${l.accent}22`}
                    className="h-full rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: l.accent }}>
                        <l.icon size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[15px] font-semibold text-slate-900">{l.label}</div>
                        <div className="text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: l.accent }}>{a.who}</div>
                      </div>
                      <ArrowUpRight size={15} className="text-slate-300 group-hover:text-slate-700 transition-colors" />
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed">{a.desc}</p>
                    <ul className="mt-4 space-y-1.5">
                      {a.points.map(p => (
                        <li key={p} className="flex items-center gap-2 text-[13px] text-slate-700">
                          <Check size={13} style={{ color: l.accent }} className="flex-shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ProductAdmin() {
  return (
    <ProductPage
      id="admin"
      seo={{
        title: 'AreaConnector Admin — Dashboard for Estates, Campuses, Hotels, Industrial Sites & Hospitals',
        description: 'AreaConnector Admin is the command centre for your estate, university, school, hotel, industrial site or hospital. Manage members, staff and guards, collect dues and fees via Paystack, watch visitors and alerts live, and broadcast to everyone from one dashboard.',
        path: '/admin',
        keywords: 'estate manager software Nigeria, estate dashboard, university hostel management dashboard, school visitor management, hotel room board, facility management software Nigeria, hospital visitor management, service charge collection, visitor log',
      }}
      title={<>Your site’s <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">command centre.</span></>}
      subtitle="Estates, campuses, hotels, plants and hospitals — members, staff, guards, payments, visitors and alerts managed from one dashboard in any browser. No app to install."
      mockup={<AdminDashboard />}
      pill={{ badge: 'New', text: 'Site types, staff roles & Google Maps' }}
      facts={[
        { icon: Shapes, value: '6 site types',    label: 'Estates to hospitals' },
        { icon: Globe,  value: 'Any browser',     label: 'Nothing to install' },
        { icon: Zap,    value: 'Paystack',        label: 'Dues & fees to your bank' },
        { icon: Lock,   value: 'Fully isolated',  label: 'Your site’s data only' },
      ]}
      featuresTitle="Every admin task, one dashboard."
      features={FEATURES}
      extra={<SectorAdmins />}
      workflowTitle="Up and running in four steps."
      steps={STEPS}
      ctaTitle="Take control of your site."
      ctaSubtitle="Start with a 14-day free trial. Admin, AreaMates and Guard included on every plan."
    />
  );
}
