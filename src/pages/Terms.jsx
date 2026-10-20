import LegalPage, { DocSection } from '../components/LegalPage';
import { FileText, Database, Scale } from 'lucide-react';

const TOC = [
  'Agreement to terms', 'Account responsibilities', 'Acceptable use',
  'Payment terms', 'Estate data', 'Availability and support',
  'Termination', 'Intellectual property', 'Limitation of liability',
  'Governing law', 'Contact',
];

export default function Terms() {
  return (
    <LegalPage
      seo={{ title: 'Terms of Service', description: 'The terms governing use of the AreaConnect platform by estate managers, residents and security staff.', path: '/terms' }}
      title="Terms of"
      highlight="Service"
      updated="20 October 2026"
      summary="These Terms govern your use of all AreaConnect products — the Admin portal, AreaMates and AreaConnect Guard. By using any of them you agree to these Terms."
      highlights={[
        { icon: Database, title: 'You own your data', desc: 'Estate data stays yours — we only process it to run the service.' },
        { icon: FileText, title: 'Clear billing',     desc: 'Monthly or annual, in Naira, through Paystack.' },
        { icon: Scale,    title: 'Nigerian law',      desc: 'Governed by Nigerian law, courts of Lagos State.' },
      ]}
      toc={TOC}
      contactLabel="Questions about these Terms?"
      contactNote="We’re happy to clarify anything before you sign up."
    >
      <DocSection num={1} title="Agreement to terms">
        <p>By accessing or using any part of the AreaConnect platform — including the AreaConnect Admin portal, AreaMates, and AreaConnect Guard (collectively, the &ldquo;Services&rdquo;) — you agree to be bound by these Terms of Service. If you do not agree, do not use the Services.</p>
      </DocSection>

      <DocSection num={2} title="Account responsibilities">
        <p>You are responsible for maintaining the security of your account credentials. You must notify us immediately at <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a> if you suspect unauthorised access.</p>
        <p>Estate managers are responsible for the accuracy of resident and visitor data they enter. You agree not to register other estates&apos; residents or create fraudulent accounts.</p>
      </DocSection>

      <DocSection num={3} title="Acceptable use">
        <p>You agree not to:</p>
        <ul className="space-y-2 mt-2">
          {[
            'Use the Services for any unlawful purpose',
            'Attempt to gain unauthorised access to any part of the platform',
            'Use the Services to harass, abuse, or harm any person',
            'Scrape, crawl, or extract data from the platform using automated means',
            'Reverse-engineer or attempt to extract source code',
          ].map(r => (
            <li key={r} className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-1.5" />
              {r}
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection num={4} title="Payment terms">
        <p>Paid plans are billed monthly or annually in advance. All payments are processed by Paystack in Nigerian Naira (&#8358;). Prices are exclusive of VAT unless stated otherwise.</p>
        <p>We reserve the right to update pricing with 30 days&apos; notice. Existing customers on annual plans are not affected until their renewal date.</p>
        <p>Refunds are not provided except where required by Nigerian law. If you believe you have been charged in error, contact <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a> within 14 days.</p>
      </DocSection>

      <DocSection num={5} title="Estate data">
        <p>You retain ownership of all data you upload to the Services — resident lists, announcements, visitor records, etc. You grant AreaConnect a limited licence to store and process this data solely to provide the Services.</p>
        <p>We do not access, view, or share your estate&apos;s data except as required to provide the Services or as required by law.</p>
      </DocSection>

      <DocSection num={6} title="Availability and support">
        <p>We target 99.9% monthly uptime for all paid plans. Scheduled maintenance is announced with at least 48 hours&apos; notice.</p>
        <p>Support is provided by email for all plans. Growth and Enterprise plans receive priority response within 2 business hours. Enterprise plans include a dedicated Customer Success Manager.</p>
      </DocSection>

      <DocSection num={7} title="Termination">
        <p>You may terminate your account at any time from the settings panel. We reserve the right to suspend or terminate accounts that violate these Terms, without prior notice for serious violations.</p>
        <p>Upon termination, we will retain your data for 30 days, after which it will be permanently deleted unless required for legal compliance.</p>
      </DocSection>

      <DocSection num={8} title="Intellectual property">
        <p>The AreaConnect name, logo, and all platform software are the exclusive intellectual property of Area Connector Technologies. You may not use our trademarks without prior written consent.</p>
      </DocSection>

      <DocSection num={9} title="Limitation of liability">
        <p>To the maximum extent permitted by Nigerian law, AreaConnect shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Services. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
      </DocSection>

      <DocSection num={10} title="Governing law">
        <p>These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lagos State.</p>
      </DocSection>

      <DocSection num={11} title="Contact">
        <p>Area Connector Technologies (RC 9607864), Lagos, Nigeria</p>
        <p>Email: <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a></p>
      </DocSection>
    </LegalPage>
  );
}
