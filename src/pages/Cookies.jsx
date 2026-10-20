import LegalPage, { DocSection } from '../components/LegalPage';
import { KeyRound, BarChart3, Ban } from 'lucide-react';

const TOC = ['What are cookies?', 'Cookies we use', 'Browser storage', 'What we don’t use', 'Managing cookies', 'Changes to this policy', 'Contact'];

const COOKIES = [
  ['refreshToken', 'AreaConnect apps', 'Keeps you signed in to Admin, AreaMates or Guard. HTTP-only, so page scripts can’t read it.', '7 days', 'Essential'],
  ['_ga', 'areaconnect.pro', 'Google Analytics — distinguishes anonymous visitors to our public website. IP addresses are anonymised.', 'Up to 2 years', 'Analytics'],
  ['_ga_<ID>', 'areaconnect.pro', 'Google Analytics — keeps the state of an anonymous website visit.', 'Up to 2 years', 'Analytics'],
];

const STORAGE = [
  ['ac_s', 'Session storage', 'An anonymous id for the current website visit, used for our own page-view counts. Cleared when you close the tab.'],
  ['ac_intro_seen_v2', 'Local storage', 'Remembers that you have already seen the intro video, so it only plays once.'],
];

const TYPE = { Essential: 'bg-brand-50 text-brand-700', Analytics: 'bg-amber-50 text-amber-700' };

export default function Cookies() {
  return (
    <LegalPage
      seo={{ title: 'Cookie Policy', description: 'The cookies and browser storage AreaConnect uses: an essential sign-in cookie in the apps and anonymous analytics on our website.', path: '/cookies' }}
      title="Cookie"
      highlight="Policy"
      updated="20 October 2026"
      summary="We keep cookies to a minimum: one essential cookie to keep you signed in to the apps, and anonymous analytics on our public website. No advertising, ever."
      highlights={[
        { icon: KeyRound,  title: 'One essential cookie', desc: 'Keeps you signed in to the apps.' },
        { icon: BarChart3, title: 'Anonymous analytics',  desc: 'Website only, with IPs anonymised.' },
        { icon: Ban,       title: 'No advertising',       desc: 'No ad, retargeting or social pixels.' },
      ]}
      toc={TOC}
      contactLabel="Questions about cookies?"
      contactNote="Ask us anything about what we store and why."
    >
      <DocSection num={1} title="What are cookies?">
        <p>Cookies are small text files a website stores in your browser. They let a site remember things between pages and visits — such as keeping you signed in.</p>
      </DocSection>

      <DocSection num={2} title="Cookies we use">
        <div className="mt-2 rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] min-w-[560px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-left text-slate-500">
                  <th className="px-4 py-3 font-medium">Cookie</th>
                  <th className="px-4 py-3 font-medium">Set by</th>
                  <th className="px-4 py-3 font-medium">Purpose</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COOKIES.map(([name, by, purpose, duration, type]) => (
                  <tr key={name} className="hover:bg-slate-50/60 transition-colors align-top">
                    <td className="px-4 py-3.5 font-mono text-slate-900 whitespace-nowrap">{name}</td>
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{by}</td>
                    <td className="px-4 py-3.5 text-slate-600">{purpose}</td>
                    <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{duration}</td>
                    <td className="px-4 py-3.5"><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${TYPE[type]}`}>{type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DocSection>

      <DocSection num={3} title="Browser storage">
        <p>Besides cookies, our website keeps two small values in your browser. Neither identifies you.</p>
        <div className="mt-2 grid sm:grid-cols-2 gap-3">
          {STORAGE.map(([name, where, what]) => (
            <div key={name} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[13px] text-slate-900">{name}</span>
                <span className="text-[11px] text-slate-400">{where}</span>
              </div>
              <p className="mt-1.5 text-[13px] text-slate-500 leading-relaxed">{what}</p>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection num={4} title="What we don’t use">
        <ul className="space-y-2">
          {['Advertising or retargeting cookies', 'Social media tracking pixels (Facebook, X, TikTok, etc.)', 'Cookies that follow you across other websites', 'Selling or sharing cookie data with advertisers'].map(r => (
            <li key={r} className="flex items-start gap-2.5">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0" />{r}
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection num={5} title="Managing cookies">
        <p>The <span className="font-mono text-[13px]">refreshToken</span> cookie is essential — if you block it you won’t be able to stay signed in to the apps. Analytics cookies are optional: you can block them in your browser or install Google’s <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-medium">Analytics opt-out add-on</a>.</p>
        <p>To delete cookies, use your browser’s settings:</p>
        <ul className="space-y-1.5">
          {['Chrome: Settings → Privacy and security → Delete browsing data', 'Firefox: Settings → Privacy & Security → Cookies and Site Data', 'Safari: Settings → Privacy → Manage Website Data', 'Edge: Settings → Privacy, search, and services → Clear browsing data'].map(r => (
            <li key={r} className="flex items-start gap-2.5"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0" />{r}</li>
          ))}
        </ul>
      </DocSection>

      <DocSection num={6} title="Changes to this policy">
        <p>We will update this page if the cookies we use change, and revise the date at the top.</p>
      </DocSection>

      <DocSection num={7} title="Contact">
        <p>Questions about cookies? Email <a href="mailto:michael@areaconnect.pro" className="text-brand-600 hover:underline font-medium">michael@areaconnect.pro</a>.</p>
      </DocSection>
    </LegalPage>
  );
}
