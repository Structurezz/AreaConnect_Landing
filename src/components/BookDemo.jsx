import { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Clock, Video, Globe, ArrowLeft, CheckCircle2,
  CalendarPlus, Loader2, CalendarDays,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'https://areaconnectapi-production.up.railway.app/api';
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Slots come back as WAT ("Africa/Lagos", UTC+1, no DST).
const slotDate = (day, hhmm) => new Date(`${day}T${hhmm}:00+01:00`);
const fmtTime = (d, timeZone) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone });
const ymd = (y, m, d) => `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

function Spinner({ className = '' }) {
  return <Loader2 size={18} className={`animate-spin ${className}`} />;
}

export default function BookDemo() {
  const [days, setDays]         = useState(null);   // { 'YYYY-MM-DD': ['09:00', ...] }
  const [loadError, setLoadError] = useState('');
  const [month, setMonth]       = useState(null);   // { y, m }
  const [date, setDate]         = useState(null);
  const [time, setTime]         = useState(null);
  const [step, setStep]         = useState('pick'); // pick | details | done
  const [form, setForm]         = useState({ name: '', email: '', company: '', phone: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState('');
  const [booking, setBooking]   = useState(null);
  const [localTz, setLocalTz]   = useState(null);

  const loadSlots = () => {
    setLoadError('');
    setDays(null);
    fetch(`${API}/demo/slots`)
      .then(r => r.json().then(d => (r.ok ? d : Promise.reject(d))))
      .then(d => {
        setDays(d.days);
        const first = Object.keys(d.days)[0];
        if (first) {
          const [y, m] = first.split('-').map(Number);
          setMonth(prev => prev || { y, m: m - 1 });
          setDate(prev => (prev && d.days[prev] ? prev : first));
        }
      })
      .catch(e => setLoadError(e?.error || 'Could not load availability.'));
  };

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Only show local times when the visitor isn't on WAT already.
    if (new Date().getTimezoneOffset() !== -60) setLocalTz(tz);
    loadSlots();
  }, []);

  const grid = useMemo(() => {
    if (!month) return [];
    const first = new Date(Date.UTC(month.y, month.m, 1));
    const lead = (first.getUTCDay() + 6) % 7; // Monday-first
    const count = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    return [...Array(lead).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];
  }, [month]);

  const dayKeys = days ? Object.keys(days) : [];
  const monthKey = month ? `${month.y}-${String(month.m + 1).padStart(2, '0')}` : '';
  const canPrev = dayKeys.some(k => k < monthKey);
  const canNext = dayKeys.some(k => k.slice(0, 7) > monthKey);
  const shiftMonth = (n) => setMonth(({ y, m }) => {
    const d = new Date(Date.UTC(y, m + n, 1));
    return { y: d.getUTCFullYear(), m: d.getUTCMonth() };
  });

  const selectedLabel = date
    ? new Date(`${date}T12:00:00+01:00`).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Africa/Lagos' })
    : '';

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/demo/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, date, time }),
      });
      const data = await res.json();
      if (res.status === 409) {
        setError(data.error);
        setTime(null);
        setStep('pick');
        loadSlots();
        return;
      }
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setBooking(data);
      setStep('done');
    } catch (err) {
      setError(err.message || 'Could not book the call. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const start = date && time ? slotDate(date, time) : null;
  const end = start ? new Date(start.getTime() + 30 * 60_000) : null;
  const gcalStamp = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const addToCalendarUrl = start && 'https://calendar.google.com/calendar/render?' + new URLSearchParams({
    action: 'TEMPLATE',
    text: 'AreaConnect demo call',
    dates: `${gcalStamp(start)}/${gcalStamp(end)}`,
    details: booking?.meetLink ? `Join with Google Meet: ${booking.meetLink}` : 'AreaConnect product demo',
  });

  return (
    <div className="bg-white border border-slate-200/80 rounded-[1.75rem] shadow-2xl shadow-slate-900/10 overflow-hidden">
      <div className="grid lg:grid-cols-[280px_1fr]">

        {/* ── Left: meeting summary ─────────────────────────────────────── */}
        <aside className="relative bg-slate-900 text-white p-6 sm:p-8 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-56 h-56 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <img src="/team/michael-orizu.jpg" alt="Michael Orizu"
                className="w-12 h-12 rounded-2xl object-cover object-[50%_15%] ring-2 ring-white/10 shadow-lg shadow-brand-500/20" />
              <div>
                <div className="text-sm font-semibold">Michael Orizu</div>
                <div className="text-xs text-slate-400">AreaConnect team</div>
              </div>
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-2">Product demo</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              A live walkthrough of the full platform — resident, security and admin apps — tailored to your estate.
            </p>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-300"><Clock size={16} className="text-brand-400" /> 30 minutes</li>
              <li className="flex items-center gap-3 text-slate-300"><Video size={16} className="text-brand-400" /> Google Meet</li>
              <li className="flex items-center gap-3 text-slate-300"><Globe size={16} className="text-brand-400" /> West Africa Time (WAT)</li>
            </ul>

            {start && step !== 'pick' && (
              <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <CalendarDays size={13} /> Your slot
                </div>
                <div className="text-sm font-bold">{selectedLabel}</div>
                <div className="text-sm text-slate-300">
                  {fmtTime(start, 'Africa/Lagos')} – {fmtTime(end, 'Africa/Lagos')} WAT
                </div>
                {localTz && <div className="text-xs text-slate-500 mt-1">{fmtTime(start, localTz)} your time</div>}
              </div>
            )}
          </div>
        </aside>

        {/* ── Right: steps ──────────────────────────────────────────────── */}
        <div className="p-5 sm:p-8 min-h-[460px]">
          {step === 'pick' && (
            <>
              <h3 className="text-base font-semibold text-slate-900 mb-5">Pick a date & time</h3>

              {error && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-5">{error}</p>
              )}

              {loadError ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                  <p className="text-sm text-slate-500 mb-4">{loadError}</p>
                  <button onClick={loadSlots} className="text-sm font-bold text-brand-600 hover:text-brand-700">Try again</button>
                </div>
              ) : !days ? (
                <div className="flex items-center justify-center py-24 text-slate-400"><Spinner /></div>
              ) : !dayKeys.length ? (
                <p className="text-sm text-slate-500 py-20 text-center">No open slots right now — email michael@areaconnect.pro and we'll find a time.</p>
              ) : (
                <div className="grid md:grid-cols-[1fr_200px] gap-6 md:gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-bold text-slate-900">
                        {new Date(Date.UTC(month.y, month.m, 1)).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })}
                      </div>
                      <div className="flex gap-1">
                        <button type="button" aria-label="Previous month" disabled={!canPrev} onClick={() => shiftMonth(-1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-brand-50 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                          <ChevronLeft size={18} />
                        </button>
                        <button type="button" aria-label="Next month" disabled={!canNext} onClick={() => shiftMonth(1)}
                          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-brand-50 hover:text-brand-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {WEEKDAYS.map(w => (
                        <div key={w} className="text-[11px] font-bold text-slate-400 uppercase tracking-wider py-2">{w}</div>
                      ))}
                      {grid.map((d, i) => {
                        if (!d) return <div key={`e${i}`} />;
                        const key = ymd(month.y, month.m, d);
                        const open = !!days[key];
                        const active = key === date;
                        return (
                          <button
                            key={key}
                            type="button"
                            disabled={!open}
                            onClick={() => { setDate(key); setTime(null); setError(''); }}
                            className={`relative h-10 w-10 sm:h-11 sm:w-11 mx-auto rounded-full text-sm transition-all duration-150 ${
                              active
                                ? 'bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/30'
                                : open
                                  ? 'bg-brand-50 text-brand-700 font-bold hover:bg-brand-100'
                                  : 'text-slate-300 cursor-default'
                            }`}
                          >
                            {d}
                          </button>
                        );
                      })}
                    </div>
                    {localTz && (
                      <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
                        <Globe size={12} /> Times in WAT · your time ({localTz.replace(/_/g, ' ')}) shown below each slot
                      </p>
                    )}
                  </div>

                  {/* Slots */}
                  <div>
                    <div className="text-sm font-bold text-slate-900 mb-3">{selectedLabel}</div>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:max-h-[340px] md:overflow-y-auto md:pr-1">
                      {(days[date] || []).map(t => {
                        const d = slotDate(date, t);
                        const active = t === time;
                        return active ? (
                          <div key={t} className="col-span-2 md:col-span-1 grid grid-cols-2 gap-2">
                            <div className="rounded-xl bg-slate-800 text-white text-sm font-bold flex items-center justify-center py-3">
                              {fmtTime(d, 'Africa/Lagos')}
                            </div>
                            <button type="button" onClick={() => { setStep('details'); setError(''); }}
                              className="rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold py-3 transition-colors">
                              Next
                            </button>
                          </div>
                        ) : (
                          <button key={t} type="button" onClick={() => setTime(t)}
                            className="w-full rounded-xl border border-brand-200 text-brand-700 hover:border-brand-500 hover:bg-brand-50 text-sm font-bold py-3 transition-all">
                            {fmtTime(d, 'Africa/Lagos')}
                            {localTz && <span className="block text-[11px] font-medium text-slate-400">{fmtTime(d, localTz)} your time</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {step === 'details' && (
            <form onSubmit={submit} className="space-y-5 max-w-lg">
              <button type="button" onClick={() => setStep('pick')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-brand-600 transition-colors">
                <ArrowLeft size={15} /> Change time
              </button>
              <h3 className="text-base font-semibold text-slate-900">Your details</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Full name <span className="text-red-400">*</span>
                  </label>
                  <input className="input" required placeholder="Your full name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input type="email" className="input" required placeholder="you@company.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Estate / company</label>
                  <input className="input" placeholder="e.g. Sunrise Estate, Lekki" value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</label>
                  <input type="tel" className="input" placeholder="+234 …" value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Anything we should know?</label>
                <textarea className="input resize-none" rows={3} placeholder="Number of units, what you'd like to see…" value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>

              {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}

              <button type="submit" disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? <><Spinner /> Booking…</> : <><Video size={16} /> Schedule Google Meet</>}
              </button>
              <p className="text-xs text-slate-400 text-center">
                You'll get a calendar invite with the Google Meet link at {form.email || 'your email'}.
              </p>
            </form>
          )}

          {step === 'done' && booking && (
            <div className="flex flex-col items-center justify-center text-center py-10">
              <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle2 size={40} className="text-brand-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">You're booked!</h3>
              <p className="text-slate-500 max-w-sm leading-relaxed mb-1">
                {booking.when} WAT
              </p>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-7">
                {booking.invited
                  ? `A Google Calendar invite with the Meet link is on its way to ${form.email}.`
                  : `We'll email the Google Meet link to ${form.email} shortly.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {booking.meetLink && (
                  <a href={booking.meetLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold px-6 py-3 transition-colors">
                    <Video size={16} /> Google Meet link
                  </a>
                )}
                <a href={addToCalendarUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-900 text-slate-700 hover:text-slate-900 text-sm font-semibold px-6 py-3 rounded-full transition-all">
                  <CalendarPlus size={16} /> Add to calendar
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
