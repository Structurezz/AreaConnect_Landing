import {
  KeyRound, LogIn, Siren, WifiOff, Ban, List, AlertCircle, Flag, PhoneCall, Eye, ScrollText, Shield,
  Smartphone, Zap, Moon,
} from 'lucide-react';
import ProductPage from '../components/ProductPage';
import GuardPhone from '../components/mockups/GuardPhone';

const FEATURES = [
  { icon: KeyRound,    title: 'Code verification',  desc: 'Type the visitor’s 6-digit code and their pass, host unit and purpose appear instantly.' },
  { icon: LogIn,       title: 'One-tap check-in/out', desc: 'Check visitors in and out with a single tap — every entry is timestamped.' },
  { icon: Ban,         title: 'Blacklist blocking', desc: 'Blacklisted visitors show ACCESS DENIED — no manual checks needed.' },
  { icon: Siren,       title: 'Panic alerts + siren', desc: 'Resident SOS alerts sound a siren on the guard’s phone so they are never missed.' },
  { icon: AlertCircle, title: 'Alert handling',     desc: 'Acknowledge and resolve security, fire and medical alerts from one screen.' },
  { icon: WifiOff,     title: 'Offline mode',       desc: 'Keep verifying during network outages — everything syncs when you’re back online.' },
  { icon: List,        title: 'Entry log',          desc: 'Today’s visitors filtered by pending, inside and exited, with counts.' },
  { icon: Eye,         title: 'Gate watch',         desc: 'Security is alerted when a guest of a blocked person checks in.', isNew: true },
  { icon: PhoneCall,   title: 'Calls',              desc: 'Ring residents and the estate manager straight from the app — free for staff.', isNew: true },
  { icon: Flag,        title: 'Incident escalation', desc: 'Raise an incident to the manager with a description attached.' },
  { icon: ScrollText,  title: 'Audit trail',        desc: 'Every check-in and check-out is logged with the officer on duty.' },
  { icon: Shield,      title: 'Session summary',    desc: 'See every action from the current shift at a glance.' },
];

const STEPS = [
  { title: 'Manager invites you', desc: 'The estate manager creates your guard account.' },
  { title: 'Sign in on your phone', desc: 'Open the Guard app — no training needed.' },
  { title: 'Verify at the gate',  desc: 'Type the visitor’s code, check them in, done.' },
  { title: 'Respond to alerts',   desc: 'Panic alerts ring through with a siren — acknowledge and resolve.' },
];

export default function ProductGuard() {
  return (
    <ProductPage
      id="guard"
      seo={{
        title: 'AreaConnect Guard — Gate Security App for Estates',
        description: '6-digit code verification, one-tap check-in/out, panic alerts with a siren and offline mode. The gate app Nigerian estate security officers can use from day one.',
        path: '/guard',
        keywords: 'security guard app Nigeria, gate management, visitor verification app, estate security officer, panic alert app',
      }}
      title={<>The gate, <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-sky-500 bg-clip-text text-transparent">under control.</span></>}
      subtitle="AreaConnect Guard lets security verify visitors by code, check them in with one tap and respond to panic alerts the moment they happen."
      mockup={<GuardPhone />}
      pill={{ badge: 'New', text: 'Gate watch & staff calls' }}
      facts={[
        { icon: Zap,        value: '6-digit codes', label: 'Verified instantly' },
        { icon: WifiOff,    value: 'Works offline', label: 'Syncs automatically' },
        { icon: Moon,       value: 'Dark mode',     label: 'Built for night shifts' },
        { icon: Smartphone, value: 'Any phone',     label: 'Runs on everyday Androids' },
      ]}
      featuresTitle="Everything the gate needs."
      features={FEATURES}
      workflowTitle="Ready for the next shift in minutes."
      steps={STEPS}
      ctaTitle="Put your gate on AreaConnect."
      ctaSubtitle="The Guard app is included with every plan — invite your whole security team."
    />
  );
}
