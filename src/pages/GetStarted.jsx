import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Seo from '../components/Seo';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, HeroBackdrop } from '../components/ui/Modern';
import { SECTOR_LINKS, SECTOR_TERMS, REGISTER } from '../lib/sectors';

// Step 1 of sign-up: pick the site type, then continue to the manager app's
// register page with it preselected (?type=…). A ?plan= from Pricing is
// passed through; ?type= (from a sector page) preselects a card.
export default function GetStarted() {
  const [params] = useSearchParams();
  const valid = (t) => SECTOR_LINKS.some((s) => s.id === t);
  const [picked, setPicked] = useState(valid(params.get('type')) ? params.get('type') : null);
  const sector = SECTOR_LINKS.find((s) => s.id === picked);
  const plan = params.get('plan');
  const href = picked ? `${REGISTER}?type=${picked}${plan ? `&plan=${encodeURIComponent(plan)}` : ''}` : null;

  return (
    <div className="overflow-x-clip">
      <Seo title="Get started — choose your site type" description="Tell us what you run — estate, university, school, hotel, industrial site or hospital — and start your 14-day free trial of AreaConnector." path="/get-started" />

      <section className="relative bg-white pt-28 pb-16 sm:pt-36 sm:pb-24 min-h-[80vh]">
        <HeroBackdrop />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto">
            <Reveal><Eyebrow>Step 1 of 2 · Get started</Eyebrow></Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-[2rem] sm:text-[2.6rem] font-extrabold tracking-[-0.03em] leading-[1.1] text-slate-900">What are you setting up?</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-[15px] text-slate-500 leading-relaxed">Pick your site type. AreaConnector uses your words and switches on the right features — you can change it later.</p>
            </Reveal>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" role="radiogroup" aria-label="Site type">
            {SECTOR_LINKS.map((s, i) => {
              const on = picked === s.id;
              const t = SECTOR_TERMS[s.id];
              return (
                <Reveal key={s.id} delay={150 + i * 50} className="h-full">
                  <button type="button" role="radio" aria-checked={on} onClick={() => setPicked(s.id)}
                    className={`relative w-full h-full text-left rounded-2xl border bg-white p-5 sm:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/5 ${on ? 'shadow-xl shadow-slate-900/5' : 'border-slate-200/80'}`}
                    style={on ? { borderColor: s.accent, boxShadow: `0 0 0 3px ${s.accent}26` } : undefined}>
                    <span className={`absolute top-4 right-4 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${on ? 'text-white' : 'border-slate-200 text-transparent'}`}
                      style={on ? { background: s.accent, borderColor: s.accent } : undefined}>
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center text-white" style={{ background: s.accent }}>
                      <s.icon size={20} />
                    </span>
                    <span className="mt-4 block text-[16px] font-semibold text-slate-900">{s.label}</span>
                    <span className="mt-0.5 block text-[13px] text-slate-500">{s.desc}</span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {[t.members, t.units].map((w) => (
                        <span key={w} className="text-[11px] font-medium rounded-full px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-600 capitalize">{w}</span>
                      ))}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {href ? (
              <a href={href}
                className="group inline-flex items-center justify-center gap-2 rounded-full text-white text-sm font-semibold pl-6 pr-2 py-2 bg-slate-900 hover:bg-slate-800 transition-all">
                Continue with {sector.label}
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-brand-500 group-hover:translate-x-0.5 transition-transform"><ArrowRight size={14} /></span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full text-sm font-semibold pl-6 pr-6 py-3 bg-slate-100 text-slate-400 cursor-not-allowed">Choose a site type to continue</span>
            )}
            <Link to="/contact#book-demo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
              Not sure? Book a demo <ArrowUpRight size={14} />
            </Link>
          </div>
          <p className="mt-4 text-center text-[12px] text-slate-400">Next: create your account · 14-day free trial{plan ? ` · ${plan} plan selected` : ''}</p>
        </div>
      </section>
    </div>
  );
}
