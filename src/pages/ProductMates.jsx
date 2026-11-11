import {
  QrCode, CreditCard, PhoneCall, Siren, Footprints, MessagesSquare, ShoppingBag, Sparkles, Vote, Megaphone,
  Receipt, Bell, Smartphone, Zap, Lock, ShieldCheck,
} from 'lucide-react';
import ProductPage from '../components/ProductPage';
import AreaMatesPhone from '../components/mockups/AreaMatesPhone';

const FEATURES = [
  { icon: QrCode,         title: 'Visitor passes',        desc: 'Invite a guest in seconds — they get a QR code, a 6-digit code and Google Maps directions to your home, hall, room or ward.' },
  { icon: Zap,            title: 'Instant passes',        desc: 'Guest already at the gate? Issue a pass on the spot, or approve an early arrival.', isNew: true },
  { icon: CreditCard,     title: 'Pay bills & fees',      desc: 'Service charge, school or hostel fees and other bills by card, transfer or USSD through Paystack.' },
  { icon: Receipt,        title: 'Invoices & receipts',   desc: 'Every payment comes with a downloadable invoice and receipt.', isNew: true },
  { icon: PhoneCall,      title: 'In-app calls',          desc: 'Call the gate, the front desk, a neighbour or a colleague — no phone numbers exposed.', isNew: true },
  { icon: Siren,          title: 'SOS button',            desc: 'One tap alerts security and the right staff on duty, with a siren on their phones.' },
  { icon: Footprints,     title: 'Safety tools',          desc: '“I’m being followed” alarm, live location sharing and silent blocks.', isNew: true },
  { icon: MessagesSquare, title: 'Chat',                  desc: 'Community group chat and real-time direct messages.' },
  { icon: ShoppingBag,    title: 'Marketplace',           desc: 'Buy and sell with people around you — escrow keeps every order safe.' },
  { icon: Sparkles,       title: 'Lounge & stories',      desc: 'A social feed, 24-hour stories, events and a shared DJ queue.' },
  { icon: Vote,           title: 'Polls & events',        desc: 'Have your say on community decisions and RSVP in one tap.' },
  { icon: Megaphone,      title: 'Notices',               desc: 'Announcements from management land as push notifications so you never miss one.' },
];

const STEPS = [
  { title: 'Get your invite',  desc: 'Your manager, admin office or front desk adds you — login details arrive by email.' },
  { title: 'Sign in',          desc: 'Open AreaMates on your phone and set your own password.' },
  { title: 'Invite a guest',   desc: 'Create a pass and share it on WhatsApp in seconds.' },
  { title: 'Live connected',   desc: 'Pay bills, call the gate and join the community.' },
];

export default function ProductMates() {
  return (
    <ProductPage
      id="mates"
      seo={{
        title: 'AreaMates — The App for Residents, Students, Guests & Staff',
        description: 'Invite visitors, pay bills and fees, call the gate, raise an SOS and join your community — for estates, campuses, hotels, workplaces and hospitals. AreaMates works on Android and iPhone.',
        path: '/mates',
        keywords: 'resident app Nigeria, student hostel app, hotel guest app, employee visitor app, hospital visitor pass app, visitor pre-registration, school fees payment app, community chat',
      }}
      title={<>Your community, <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">in your pocket.</span></>}
      subtitle="For everyone who lives, studies, stays or works there — residents, students, guests, staff and patients. Visitor passes, payments, calls, safety and community in one app."
      mockup={<AreaMatesPhone />}
      pill={{ badge: 'New', text: 'In-app calls & safety tools' }}
      facts={[
        { icon: Smartphone,  value: 'Android & iPhone', label: 'Plus the web' },
        { icon: QrCode,      value: 'Seconds',          label: 'To create a visitor pass' },
        { icon: Bell,        value: 'Push alerts',      label: 'Visitors, bills & notices' },
        { icon: ShieldCheck, value: 'Private',          label: 'Only people on your site' },
      ]}
      featuresTitle="Everything your people need, one app."
      features={FEATURES}
      workflowTitle="From invite to connected in minutes."
      steps={STEPS}
      ctaTitle="Give everyone on site AreaMates."
      ctaSubtitle="Included free with every AreaConnect plan — no per-user app fees."
    />
  );
}
