import {
  QrCode, CreditCard, PhoneCall, Siren, Footprints, MessagesSquare, ShoppingBag, Sparkles, Vote, Megaphone,
  Receipt, Bell, Smartphone, Zap, Lock, ShieldCheck,
} from 'lucide-react';
import ProductPage from '../components/ProductPage';
import AreaMatesPhone from '../components/mockups/AreaMatesPhone';

const FEATURES = [
  { icon: QrCode,         title: 'Visitor passes',        desc: 'Invite a guest in seconds — they get a QR code and 6-digit code to show at the gate.' },
  { icon: Zap,            title: 'Instant passes',        desc: 'Guest already at the gate? Issue a pass on the spot, or approve an early arrival.', isNew: true },
  { icon: CreditCard,     title: 'Pay dues',              desc: 'Service charge and levies by card, transfer or USSD through Paystack.' },
  { icon: Receipt,        title: 'Invoices & receipts',   desc: 'Every payment comes with a downloadable invoice and receipt.', isNew: true },
  { icon: PhoneCall,      title: 'In-app calls',          desc: 'Call the gate, a neighbour or the manager — no phone numbers exposed.', isNew: true },
  { icon: Siren,          title: 'SOS button',            desc: 'One tap alerts every guard on duty, with a siren on their phones.' },
  { icon: Footprints,     title: 'Safety tools',          desc: '“I’m being followed” alarm, live location sharing and silent blocks.', isNew: true },
  { icon: MessagesSquare, title: 'Chat',                  desc: 'Estate group chat and real-time direct messages.' },
  { icon: ShoppingBag,    title: 'Marketplace',           desc: 'Buy and sell with neighbours — escrow keeps every order safe.' },
  { icon: Sparkles,       title: 'Lounge & stories',      desc: 'A social feed, 24-hour stories, events and a shared DJ queue.' },
  { icon: Vote,           title: 'Polls & events',        desc: 'Vote on estate decisions and RSVP in one tap.' },
  { icon: Megaphone,      title: 'Estate notices',        desc: 'Announcements land as push notifications so you never miss one.' },
];

const STEPS = [
  { title: 'Get your invite',  desc: 'Your estate manager adds you — login details arrive by email.' },
  { title: 'Sign in',          desc: 'Open AreaMates on your phone and set your own password.' },
  { title: 'Invite a guest',   desc: 'Create a pass and share it on WhatsApp in seconds.' },
  { title: 'Live connected',   desc: 'Pay dues, call the gate and join the community.' },
];

export default function ProductMates() {
  return (
    <ProductPage
      id="mates"
      seo={{
        title: 'AreaMates — Resident App for Nigerian Estates',
        description: 'Invite visitors, pay service charges, call the gate, raise an SOS and join your estate community — all in one app. AreaMates works on Android and iPhone.',
        path: '/mates',
        keywords: 'resident app Nigeria, estate resident portal, visitor pre-registration, levy payment app, estate community chat',
      }}
      title={<>Your estate, <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">in your pocket.</span></>}
      subtitle="AreaMates is the resident app — visitor passes, payments, calls, safety and your whole community, in one place."
      mockup={<AreaMatesPhone />}
      pill={{ badge: 'New', text: 'In-app calls & safety tools' }}
      facts={[
        { icon: Smartphone,  value: 'Android & iPhone', label: 'Plus the web' },
        { icon: QrCode,      value: 'Seconds',          label: 'To create a visitor pass' },
        { icon: Bell,        value: 'Push alerts',      label: 'Visitors, dues & notices' },
        { icon: ShieldCheck, value: 'Estate-only',      label: 'Only your neighbours' },
      ]}
      featuresTitle="Everything residents need, one app."
      features={FEATURES}
      workflowTitle="From invite to connected in minutes."
      steps={STEPS}
      ctaTitle="Give your residents AreaMates."
      ctaSubtitle="Included free with every AreaConnect plan — no per-resident app fees."
    />
  );
}
