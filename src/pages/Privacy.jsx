import { Link } from 'react-router-dom';
import LegalPage, { DocSection } from '../components/LegalPage';
import { Shield, Lock, Ban } from 'lucide-react';

const TOC = [
  'Introduction', 'Information we collect', 'How we use your information',
  'Data isolation and security', 'Data sharing', 'Data retention',
  'Your rights', 'Cookies', "Children's privacy", 'Changes to this policy', 'Contact',
];

export default function Privacy() {
  return (
    <LegalPage
      seo={{ title: 'Privacy Policy', description: 'How AreaConnect collects, uses and protects personal data for residents, estate managers and security staff.', path: '/privacy' }}
      title="Privacy"
      highlight="Policy"
      updated="20 October 2026"
      summary="Your data belongs to you — we are only its custodians. Here is what we collect, why, and the rights you have under the Nigerian Data Protection Act 2023."
      highlights={[
        { icon: Lock,   title: 'Estate-isolated',   desc: 'No estate can ever see another estate’s data.' },
        { icon: Ban,    title: 'Never sold',        desc: 'We don’t sell or rent personal data — ever.' },
        { icon: Shield, title: 'Your rights',       desc: 'Access, correct or delete your data any time.' },
      ]}
      toc={TOC}
      contactLabel="Questions about your data?"
      contactNote="Email us to access, correct or delete your personal data."
    >
      <DocSection num={1} title="Introduction">
        <p>Area Connector Technologies (RC 9607864) (&ldquo;AreaConnect&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use the AreaConnect platform, including the AreaConnect Admin web portal, the AreaMates mobile and web application, and the AreaConnect Guard mobile application (collectively, the &ldquo;Services&rdquo;).</p>
        <p>By using our Services, you agree to the collection and use of information in accordance with this policy.</p>
      </DocSection>

      <DocSection num={2} title="Information we collect">
        <p><strong className="text-slate-800">Account information:</strong> When an estate manager registers or invites a resident, we collect name, email address, phone number, and password (hashed — we never store plaintext passwords).</p>
        <p><strong className="text-slate-800">Estate information:</strong> Estate name, address, unit layout, and any other information you provide when setting up your estate on the platform.</p>
        <p><strong className="text-slate-800">Visitor information:</strong> Names, expected arrival dates, and contact details for visitors pre-registered by residents.</p>
        <p><strong className="text-slate-800">Payment information:</strong> Payment transactions are processed by Paystack. We store payment records (amounts, dates, status) but never store card numbers, bank account details, or PINs.</p>
        <p><strong className="text-slate-800">Safety and location data:</strong> If you use personal safety features, we process your live location while sharing is switched on (for up to one hour) and share it only with your estate&apos;s security staff and manager.</p>
        <p><strong className="text-slate-800">Calls:</strong> For in-app calls we record call metadata (who called whom, when and for how long) for billing and safety. We do not record call audio.</p>
        <p><strong className="text-slate-800">Usage data:</strong> Log data including IP address, device type, browser type, pages visited, and timestamps.</p>
        <p><strong className="text-slate-800">Communications:</strong> Messages sent through the community chat feature, announcements, and support enquiries.</p>
      </DocSection>

      <DocSection num={3} title="How we use your information">
        <p>We use collected information to: provide and operate the Services; send transactional emails (login credentials, visitor passes, payment receipts); send service notifications (security alerts, announcements); process payment collections; provide customer support; improve and develop the Services; comply with legal obligations.</p>
        <p>We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </DocSection>

      <DocSection num={4} title="Data isolation and security">
        <p>Every estate&apos;s data is completely isolated. Residents, managers, and security staff from one estate cannot access data from any other estate on the platform.</p>
        <p>We implement industry-standard security measures: all data is encrypted in transit over HTTPS; passwords are hashed using bcrypt with a cost factor of 12; authentication uses short-lived access tokens (15 minutes), and refresh tokens are verified server-side and revoked on sign-out or password change. Access to data is enforced by role on the server.</p>
      </DocSection>

      <DocSection num={5} title="Data sharing">
        <p>We share data only with:</p>
        <ul className="space-y-2 mt-2">
          {[
            ['Paystack', 'For payment processing (subject to their Privacy Policy)'],
            ['Resend', 'For transactional email delivery'],
            ['Twilio', 'For SMS notifications'],
            ['Railway and MongoDB Atlas', 'For application hosting and database storage'],
            ['Google', 'Gemini powers the in-app AI assistant; Google Analytics measures anonymous website usage; Google Calendar schedules demo calls'],
            ['Legal authorities', 'If required by law, court order, or to protect our rights or the safety of others'],
          ].map(([name, desc]) => (
            <li key={name} className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />
              <span><strong className="text-slate-800">{name}</strong> — {desc}</span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection num={6} title="Data retention">
        <p>We retain your personal data for as long as your account is active or as needed to provide the Services. Estate managers may request deletion of their estate data at any time by contacting us. Payment records are retained for 7 years to comply with Nigerian financial regulations.</p>
      </DocSection>

      <DocSection num={7} title="Your rights">
        <p>Under the Nigerian Data Protection Act 2023, you have the right to:</p>
        <ul className="space-y-2 mt-2">
          {[
            'Access the personal data we hold about you',
            'Correct inaccurate data',
            'Request deletion of your data',
            'Withdraw consent at any time',
            'Lodge a complaint with the Nigerian Data Protection Commission (NDPC)',
          ].map(r => (
            <li key={r} className="flex items-start gap-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-400 flex-shrink-0 mt-1.5" />
              {r}
            </li>
          ))}
        </ul>
        <p className="mt-3">To exercise these rights, contact: <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a></p>
      </DocSection>

      <DocSection num={8} title="Cookies">
        <p>We use an essential cookie to keep you signed in, and Google Analytics on our public website to measure anonymous usage. We do not use advertising cookies. See our <Link to="/cookies" className="text-brand-600 hover:underline font-medium">Cookie Policy</Link> for full details.</p>
      </DocSection>

      <DocSection num={9} title="Children's privacy">
        <p>Our Services are not directed to children under the age of 18. We do not knowingly collect personal data from minors.</p>
      </DocSection>

      <DocSection num={10} title="Changes to this policy">
        <p>We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice in the platform. Continued use of the Services after changes constitutes acceptance.</p>
      </DocSection>

      <DocSection num={11} title="Contact">
        <p>Area Connector Technologies (RC 9607864), Lagos, Nigeria</p>
        <p>Email: <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a></p>
      </DocSection>
    </LegalPage>
  );
}
