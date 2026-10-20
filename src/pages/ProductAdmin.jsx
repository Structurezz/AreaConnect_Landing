import {
  Users, Building2, CreditCard, Megaphone, UserCheck, Bell, Shield, BarChart3, FileText, Wallet,
  PhoneCall, Layers, Globe, Upload, Zap, Lock,
} from 'lucide-react';
import ProductPage from '../components/ProductPage';
import AdminDashboard from '../components/mockups/AdminDashboard';

const FEATURES = [
  { icon: Users,      title: 'Resident management', desc: 'Invite one by one or bulk-import a CSV. Everyone gets a welcome email with their login.' },
  { icon: Building2,  title: 'Units & blocks',      desc: 'Create blocks and units, assign residents and see occupancy at a glance.' },
  { icon: CreditCard, title: 'Dues collection',     desc: 'Levy schedules, automated reminders and Paystack checkout with full reconciliation.' },
  { icon: Wallet,     title: 'Estate wallet',       desc: 'Collected funds land in your estate wallet — withdraw to any Nigerian bank.' },
  { icon: UserCheck,  title: 'Visitor oversight',   desc: 'Live entry logs, who’s inside now, and a blacklist that syncs to every gate.' },
  { icon: Bell,       title: 'Live alerts',         desc: 'Panic alerts appear on your dashboard instantly, and you can broadcast to all residents.' },
  { icon: Shield,     title: 'Guard management',    desc: 'Invite security staff, suspend or reactivate them, and review their activity.', isNew: true },
  { icon: PhoneCall,  title: 'Calls',               desc: 'Call any resident or the gate straight from the dashboard.', isNew: true },
  { icon: Megaphone,  title: 'Announcements',       desc: 'Notices with images, push delivery and read receipts.' },
  { icon: FileText,   title: 'Estate constitution', desc: 'Upload your rules once so residents and the AI assistant can reference them.', isNew: true },
  { icon: BarChart3,  title: 'Analytics',           desc: 'Visitor volume, collection rates and community activity in real time.' },
  { icon: Layers,     title: 'Multi-estate',        desc: 'Manage a whole portfolio from one login on Enterprise.' },
];

const STEPS = [
  { title: 'Create your estate', desc: 'Sign up and add your estate details and units.' },
  { title: 'Import residents',   desc: 'Upload a CSV — accounts and welcome emails go out automatically.' },
  { title: 'Set up dues',        desc: 'Create levy schedules and connect your bank for payouts.' },
  { title: 'Run it live',        desc: 'Watch visitors, payments and alerts from one dashboard.' },
];

export default function ProductAdmin() {
  return (
    <ProductPage
      id="admin"
      seo={{
        title: 'AreaConnect Admin — Estate Manager Dashboard, Payments, Visitors & Analytics',
        description: 'AreaConnect Admin is the command centre for your estate. Manage residents and guards, collect dues via Paystack, watch visitors and alerts live, and broadcast to everyone from one dashboard.',
        path: '/admin',
        keywords: 'estate manager software Nigeria, estate dashboard, service charge collection, visitor log, estate admin portal',
      }}
      title={<>Your estate’s <span className="bg-gradient-to-r from-brand-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">command centre.</span></>}
      subtitle="Residents, units, guards, dues, visitors and alerts — managed from one dashboard in any browser. No app to install."
      mockup={<AdminDashboard />}
      pill={{ badge: 'New', text: 'Guard management & in-app calls' }}
      facts={[
        { icon: Globe,  value: 'Any browser',     label: 'Nothing to install' },
        { icon: Upload, value: 'CSV import',      label: 'Onboard everyone at once' },
        { icon: Zap,    value: 'Paystack',        label: 'Dues straight to your bank' },
        { icon: Lock,   value: 'Fully isolated',  label: 'Your estate’s data only' },
      ]}
      featuresTitle="Every admin task, one dashboard."
      features={FEATURES}
      workflowTitle="Up and running in four steps."
      steps={STEPS}
      ctaTitle="Take control of your estate."
      ctaSubtitle="Start with a 14-day free trial. Admin, AreaMates and Guard included on every plan."
    />
  );
}
