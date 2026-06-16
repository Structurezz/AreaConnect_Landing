import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, QrCode, LogOut } from 'lucide-react';
import { Reveal, PageHero } from '../components/ui/Reveal';

/* ─── Reusable phone shell ────────────────────────────────────────────── */
function PhoneFrame({ children, glowColor = '#6366F1', height = 520, dark = false }) {
  return (
    <div className="relative flex justify-center">
      <div className="absolute -inset-8 rounded-full blur-3xl pointer-events-none"
           style={{ background: glowColor + '20' }} />
      <div className="relative rounded-[2.5rem] shadow-2xl overflow-hidden w-[232px] border"
           style={{ height, background: dark ? '#0F172A' : '#F8FAFC', borderColor: dark ? 'rgba(255,255,255,0.10)' : '#E2E8F0' }}>
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 rounded-full z-20"
             style={{ background: dark ? '#1E293B' : '#E2E8F0' }} />
        <div className="absolute inset-0 flex flex-col overflow-hidden">
          {children}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full"
             style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.10)' }} />
      </div>
    </div>
  );
}

/* ─── 1. Visitor Management mockup ───────────────────────────────────── */
function VisitorMockup() {
  return (
    <div className="relative">
      <PhoneFrame glowColor="#10B981" height={540}>
        {/* Sticky header */}
        <div className="px-4 pt-9 pb-3 border-b" style={{ borderColor: '#E2E8F0', background: '#fff' }}>
          <div className="text-[13px] font-bold" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>Invite a Visitor</div>
        </div>
        <div className="flex-1 overflow-hidden p-3 space-y-3" style={{ background: '#F8FAFC' }}>
          {/* Visitor name */}
          <div className="bg-white rounded-xl border px-3 py-2.5" style={{ borderColor: '#E2E8F0' }}>
            <div className="text-[7px] font-semibold mb-0.5" style={{ color: '#94A3B8' }}>Full Name *</div>
            <div className="text-[10px] font-medium" style={{ color: '#0F172A' }}>Chidi Okafor</div>
          </div>

          {/* Purpose chips */}
          <div>
            <div className="text-[7px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>Purpose of Visit *</div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { label: 'Personal Visit', icon: '👤', sel: true },
                { label: 'Delivery',       icon: '📦', sel: false },
                { label: 'Service Work',   icon: '🔧', sel: false },
                { label: 'Official',       icon: '💼', sel: false },
              ].map(p => (
                <div key={p.label} className="flex flex-col items-center gap-1 py-2 rounded-xl border text-center"
                  style={p.sel
                    ? { background: 'rgba(99,102,241,0.08)', borderColor: '#6366F1', color: '#4F46E5' }
                    : { background: '#F8FAFC', borderColor: '#E2E8F0', color: '#64748B' }}>
                  <span className="text-base">{p.icon}</span>
                  <span className="text-[7px] font-semibold">{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule */}
          <div>
            <div className="text-[7px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#94A3B8' }}>Visit Schedule *</div>
            <div className="grid grid-cols-2 gap-1.5 mb-1.5">
              {[['Date', 'Jun 20, 2025'], ['Time', '3:00 PM']].map(([l, v]) => (
                <div key={l} className="bg-white rounded-xl border p-2" style={{ borderColor: '#E2E8F0' }}>
                  <div className="text-[7px] mb-0.5" style={{ color: '#94A3B8' }}>{l}</div>
                  <div className="text-[9px] font-medium" style={{ color: '#0F172A' }}>{v}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {['1 Day', '3 Days', '1 Week', 'Custom'].map((d, i) => (
                <div key={d} className="flex-1 text-center py-1 rounded-full text-[7px] font-bold border"
                  style={i === 0
                    ? { background: '#6366F1', borderColor: '#6366F1', color: '#fff' }
                    : { background: '#F8FAFC', borderColor: '#E2E8F0', color: '#475569' }}>
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Pass info hint */}
          <div className="flex items-start gap-2 rounded-xl p-2"
            style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.14)' }}>
            <QrCode size={12} style={{ color: '#6366F1', flexShrink: 0, marginTop: 1 }} />
            <p className="text-[7px] leading-snug" style={{ color: '#64748B' }}>
              A QR code and 6-digit pass will be emailed to your visitor automatically.
            </p>
          </div>

          {/* CTA */}
          <div className="w-full py-2.5 rounded-xl text-[9px] font-black text-white text-center"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' }}>
            Send QR Pass
          </div>
        </div>
      </PhoneFrame>

      {/* Floating pass preview */}
      <div className="absolute -right-6 bottom-16 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 w-36 animate-float">
        <div className="text-[8px] font-bold text-center mb-1.5" style={{ color: '#6366F1' }}>VISITOR PASS</div>
        <div className="inline-grid grid-cols-5 gap-0.5 mx-auto mb-1.5">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,2,4,10,12,14,20,22,24].includes(i) ? 'bg-slate-900' : i % 5 === 0 ? 'bg-slate-700' : 'bg-slate-200'}`} />
          ))}
        </div>
        <div className="text-[10px] font-black tracking-[0.25em] text-center" style={{ color: '#4F46E5', fontFamily: '"Courier New", monospace' }}>
          847 291
        </div>
      </div>
    </div>
  );
}

/* ─── 2. Security mockup — two screens ───────────────────────────────── */
function SecurityMockup() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Resident panic alert phone */}
      <PhoneFrame glowColor="#EF4444" height={340}>
        <div className="px-4 pt-9 pb-3 border-b" style={{ borderColor: 'rgba(239,68,68,0.15)', background: '#fff' }}>
          <div className="text-[13px] font-bold" style={{ color: '#0F172A' }}>Alert Security</div>
          <div className="text-[9px] mt-0.5" style={{ color: '#64748B' }}>Send an immediate alert to estate security</div>
        </div>
        <div className="flex-1 p-3 space-y-2.5">
          {/* Alert type buttons */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Security Threat',   emoji: '🛡️', color: '#DC2626', bg: '#FEF2F2', border: 'rgba(220,38,38,0.25)', sel: true  },
              { label: 'Fire Emergency',    emoji: '🔥', color: '#EA580C', bg: '#FFF7ED', border: 'rgba(234,88,12,0.25)',  sel: false },
              { label: 'Medical',           emoji: '❤️', color: '#2563EB', bg: '#EFF6FF', border: 'rgba(37,99,235,0.25)',  sel: false },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center gap-1 py-2.5 rounded-xl border text-center"
                style={{ background: t.bg, borderColor: t.sel ? t.color : t.border, boxShadow: t.sel ? `0 0 0 2px ${t.color}40` : 'none' }}>
                <span className="text-lg">{t.emoji}</span>
                <span className="text-[7px] font-bold" style={{ color: t.color }}>{t.label}</span>
              </div>
            ))}
          </div>
          {/* Panic button */}
          <div className="w-full py-3.5 rounded-xl text-[10px] font-black text-white text-center"
            style={{ background: 'rgba(239,68,68,0.90)', border: '2px solid rgba(255,255,255,0.30)', boxShadow: '0 0 0 4px rgba(239,68,68,0.20)' }}>
            🚨 ALERT SECURITY NOW
          </div>
          {/* Siren note */}
          <div className="flex items-center gap-2 rounded-xl p-2" style={{ background: '#FEF2F2', border: '1px solid rgba(239,68,68,0.15)' }}>
            <span className="text-base">🔊</span>
            <p className="text-[7px] leading-snug" style={{ color: '#B91C1C' }}>
              Police siren alarm plays on all guard devices the instant this is sent.
            </p>
          </div>
        </div>
      </PhoneFrame>

      {/* Guard verification phone */}
      <PhoneFrame glowColor="#3B82F6" height={300} dark>
        <div className="px-4 pt-9 pb-3 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 60%, #1D4ED8 100%)' }}>
          <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5"
            style={{ background: 'rgba(255,255,255,0.20)', border: '1px solid rgba(255,255,255,0.30)' }}>
            <Shield size={16} className="text-white" />
          </div>
          <div className="text-[11px] font-bold text-white mb-0.5">Gate Security</div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[7px] font-semibold"
            style={{ background: 'rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.95)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            Gate 1 · Online
          </div>
        </div>
        <div className="flex-1 p-3 space-y-2">
          {/* Code input */}
          <div className="bg-white rounded-xl border p-2.5" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
            <div className="text-center text-[12px] font-black tracking-[0.4em] mb-1.5"
              style={{ color: '#0F172A', fontFamily: '"Courier New", monospace', letterSpacing: '0.3em' }}>
              AB7C1F
            </div>
            <div className="flex justify-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-1.5 rounded-full" style={{ background: '#3B82F6' }} />
              ))}
            </div>
          </div>
          {/* Verified card */}
          <div className="rounded-xl p-2.5 border"
            style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.20)' }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 size={12} style={{ color: '#10B981' }} />
              <span className="text-[9px] font-bold" style={{ color: '#059669' }}>Verified · Access granted</span>
            </div>
            <div className="text-[11px] font-black text-white">Chidi Okafor</div>
            <div className="text-[8px]" style={{ color: '#94A3B8' }}>Unit 4B · Adaeze O.</div>
            <div className="flex gap-1.5 mt-2">
              <div className="flex-1 rounded-lg p-1.5" style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-[7px]" style={{ color: '#94A3B8' }}>Checked in</div>
                <div className="text-[8px] font-medium text-white">2:28 PM</div>
              </div>
              <button className="flex-1 rounded-lg py-1.5 text-[7px] font-bold flex items-center justify-center gap-1"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#64748B' }}>
                <LogOut size={9} style={{ color: '#3B82F6' }} /> Check Out
              </button>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/* ─── 3. Payments mockup ──────────────────────────────────────────────── */
function PaymentsMockup() {
  return (
    <PhoneFrame glowColor="#6366F1" height={520}>
      {/* Header */}
      <div className="px-4 pt-9 pb-3 border-b" style={{ borderColor: '#E2E8F0', background: '#fff' }}>
        <div className="text-[13px] font-bold" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>Payments</div>
        <div className="text-[9px] mt-0.5" style={{ color: '#94A3B8' }}>View dues, pay, and track history</div>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-2.5" style={{ background: '#F8FAFC' }}>
        {/* 3 stat cards */}
        <div className="flex gap-2">
          {[
            { icon: '💳', label: 'Outstanding', val: '₦45,000', bg: 'rgba(16,185,129,0.10)', bc: 'rgba(16,185,129,0.22)' },
            { icon: '⚠️', label: 'Overdue',     val: '1 item',  bg: '#FEF2F2', bc: 'rgba(239,68,68,0.20)' },
            { icon: '✅', label: 'Paid',        val: '3',       bg: '#ECFDF5', bc: 'rgba(16,185,129,0.22)' },
          ].map(s => (
            <div key={s.label} className="flex-1 rounded-xl p-2 border" style={{ background: s.bg, borderColor: s.bc }}>
              <div className="text-base mb-0.5">{s.icon}</div>
              <div className="text-[9px] font-black" style={{ color: '#0F172A' }}>{s.val}</div>
              <div className="text-[7px]" style={{ color: '#94A3B8' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
          {['Due', 'History'].map((t, i) => (
            <div key={t} className="flex-1 text-center py-1.5 rounded-lg text-[9px] font-semibold"
              style={i === 0
                ? { background: '#FFFFFF', color: '#0F172A', boxShadow: '0 1px 3px rgba(15,23,42,0.08)' }
                : { color: '#94A3B8' }}>
              {t}
            </div>
          ))}
        </div>

        {/* Overdue payment card */}
        <div className="bg-white rounded-xl border p-3" style={{ borderColor: 'rgba(239,68,68,0.25)' }}>
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: '#FEF2F2', border: '1px solid rgba(239,68,68,0.20)' }}>
              <span className="text-sm">💸</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold truncate" style={{ color: '#0F172A' }}>Service Charge</div>
              <div className="text-[8px]" style={{ color: '#94A3B8' }}>Due Jun 30, 2025</div>
              <div className="text-[9px] font-black mt-0.5" style={{ color: '#0F172A' }}>₦45,000</div>
            </div>
            <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
              OVERDUE
            </span>
          </div>
          {/* Pay now button */}
          <div className="mt-2.5 w-full py-2 rounded-xl text-[9px] font-black text-white text-center"
            style={{ background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)' }}>
            Pay Now with Paystack
          </div>
        </div>

        {/* Paid card */}
        <div className="bg-white rounded-xl border p-3" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.22)' }}>
              <span className="text-sm">✅</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold truncate" style={{ color: '#0F172A' }}>Generator Levy</div>
              <div className="text-[8px]" style={{ color: '#94A3B8' }}>Paid May 15, 2025</div>
              <div className="text-[9px] font-black mt-0.5" style={{ color: '#0F172A' }}>₦12,000</div>
            </div>
            <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex-shrink-0">
              PAID
            </span>
          </div>
        </div>

        {/* Paystack note */}
        <div className="flex items-center gap-2 rounded-xl p-2"
          style={{ background: '#EFF6FF', border: '1px solid rgba(99,102,241,0.18)' }}>
          <span className="text-sm">🔒</span>
          <p className="text-[7px] leading-snug" style={{ color: '#475569' }}>
            Payments are processed securely via Paystack. Your card is never stored.
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── 4. Marketplace mockup ───────────────────────────────────────────── */
function MarketplaceMockup() {
  return (
    <PhoneFrame glowColor="#F59E0B" height={540}>
      {/* Header */}
      <div className="px-4 pt-9 pb-3 border-b" style={{ borderColor: '#E2E8F0', background: '#fff' }}>
        <div className="text-[13px] font-bold" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>Marketplace</div>
        <div className="text-[9px] mt-0.5" style={{ color: '#94A3B8' }}>Buy, sell & trade within your estate</div>
      </div>
      <div className="flex-1 overflow-hidden p-3 space-y-2.5" style={{ background: '#F8FAFC' }}>
        {/* Category pills */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
          {[
            { emoji: '🍽️', label: 'Food',     color: '#F59E0B', bg: '#FFFBEB', sel: true  },
            { emoji: '🔧', label: 'Services', color: '#60A5FA', bg: '#EFF6FF', sel: false },
            { emoji: '💡', label: 'Skills',   color: '#A78BFA', bg: '#F5F3FF', sel: false },
            { emoji: '🏷️', label: 'For Sale', color: '#34D399', bg: '#ECFDF5', sel: false },
            { emoji: '🏠', label: 'Rentals',  color: '#F472B6', bg: '#FDF2F8', sel: false },
          ].map(c => (
            <div key={c.label} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[8px] font-bold flex-shrink-0 border"
              style={c.sel
                ? { background: c.color, borderColor: c.color, color: '#fff' }
                : { background: c.bg, borderColor: c.color + '40', color: c.color }}>
              {c.emoji} {c.label}
            </div>
          ))}
        </div>

        {/* Listings 2-up grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { title: 'Jollof Rice (large pot)', price: '₦8,500', seller: 'Amaka E.', emoji: '🍛', tag: 'Food',     tc: '#F59E0B' },
            { title: 'AC repair & servicing',  price: '₦15,000', seller: 'Kelechi T.', emoji: '❄️', tag: 'Services', tc: '#60A5FA' },
            { title: 'iPhone 13 Pro Max',      price: '₦380,000', seller: 'Tunde A.', emoji: '📱', tag: 'For Sale', tc: '#34D399' },
            { title: 'Lesson: JAMB Maths',     price: 'Free',    seller: 'Ngozi I.', emoji: '📚', tag: 'Skills',   tc: '#A78BFA' },
          ].map((l, i) => (
            <div key={i} className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
              {/* Image area */}
              <div className="h-16 flex items-center justify-center text-3xl"
                style={{ background: i % 2 === 0 ? '#FFF7ED' : '#F0F9FF' }}>
                {l.emoji}
              </div>
              <div className="p-2">
                <div className="text-[8px] font-bold mb-0.5 line-clamp-2 leading-snug" style={{ color: '#0F172A' }}>{l.title}</div>
                <div className="text-[9px] font-black" style={{ color: '#059669' }}>{l.price}</div>
                <div className="flex items-center justify-between mt-1.5">
                  <div className="flex items-center gap-1">
                    <div className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] font-bold text-white flex-shrink-0"
                      style={{ background: '#6366F1' }}>
                      {l.seller[0]}
                    </div>
                    <span className="text-[7px] truncate max-w-[40px]" style={{ color: '#94A3B8' }}>{l.seller}</span>
                  </div>
                  <span className="text-[6px] font-bold px-1 py-0.5 rounded-full" style={{ background: l.tc + '20', color: l.tc }}>{l.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post a listing CTA */}
        <div className="w-full py-2 rounded-xl text-[9px] font-bold text-center border-2 border-dashed"
          style={{ borderColor: '#10B981', color: '#059669', background: 'rgba(16,185,129,0.04)' }}>
          + Post a Listing
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── 5. Resident Lounge mockup ───────────────────────────────────────── */
function LoungeMockup() {
  return (
    <PhoneFrame glowColor="#8B5CF6" height={560}>
      {/* Header */}
      <div className="px-4 pt-9 pb-2 border-b" style={{ borderColor: '#E2E8F0', background: '#fff' }}>
        <div className="text-[13px] font-bold" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>Resident Lounge</div>
      </div>

      {/* Friday countdown bar */}
      <div className="px-3 py-2 flex items-center gap-2 border-b"
        style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
        <span className="text-base">🎉</span>
        <div>
          <div className="text-[8px] font-black" style={{ color: '#D97706' }}>Friday Night FunTimes</div>
          <div className="text-[7px]" style={{ color: '#92400E' }}>Starts in 2d 4h 17m · Club House, 7PM</div>
        </div>
      </div>

      {/* Tab pills */}
      <div className="flex gap-1.5 px-3 py-2 overflow-x-auto hide-scrollbar border-b" style={{ borderColor: '#F1F5F9' }}>
        {[
          { emoji: '📰', label: 'Feed',       sel: true  },
          { emoji: '🎉', label: 'Events',     sel: false },
          { emoji: '📅', label: 'Activities', sel: false },
          { emoji: '📊', label: 'Polls',      sel: false },
          { emoji: '🎵', label: 'Music',      sel: false },
        ].map(t => (
          <div key={t.label} className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[8px] font-bold flex-shrink-0"
            style={t.sel
              ? { background: 'rgba(139,92,246,0.12)', color: '#7C3AED' }
              : { color: '#94A3B8' }}>
            {t.emoji} {t.label}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-hidden p-3 space-y-2.5" style={{ background: '#F8FAFC' }}>
        {/* Create post box */}
        <div className="bg-white rounded-xl border p-2.5 flex items-center gap-2" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
            style={{ background: 'rgba(99,102,241,0.85)' }}>A</div>
          <div className="flex-1 text-[9px] rounded-lg px-2.5 py-1.5" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: '#94A3B8' }}>
            Share something with the estate…
          </div>
          <span className="text-base">📷</span>
        </div>

        {/* Post card */}
        <div className="bg-white rounded-xl border p-2.5" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: '#10B981' }}>N</div>
            <div>
              <div className="text-[9px] font-bold" style={{ color: '#0F172A' }}>Ngozi Eze</div>
              <div className="text-[7px]" style={{ color: '#94A3B8' }}>Unit 1D · 12 min ago</div>
            </div>
          </div>
          <p className="text-[9px] mb-2 leading-snug" style={{ color: '#334155' }}>
            Pool is clean and looking beautiful today! Perfect weather for a swim 🏊‍♀️
          </p>
          {/* 2-image grid */}
          <div className="grid grid-cols-2 gap-1 mb-2">
            {['#DBEAFE', '#FEF3C7'].map((bg, i) => (
              <div key={i} className="h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: bg }}>
                {i === 0 ? '🏊' : '☀️'}
              </div>
            ))}
          </div>
          {/* Like / comment row */}
          <div className="flex items-center gap-3 pt-1.5 border-t" style={{ borderColor: '#F1F5F9' }}>
            <button className="flex items-center gap-1 text-[8px] font-semibold" style={{ color: '#6366F1' }}>
              ♥ 14 Likes
            </button>
            <button className="flex items-center gap-1 text-[8px]" style={{ color: '#94A3B8' }}>
              💬 3 Comments
            </button>
          </div>
        </div>

        {/* Music now playing */}
        <div className="bg-white rounded-xl border p-2.5 flex items-center gap-2" style={{ borderColor: 'rgba(139,92,246,0.20)', background: 'rgba(139,92,246,0.04)' }}>
          <span className="text-xl">🎵</span>
          <div className="flex-1 min-w-0">
            <div className="text-[8px] font-bold truncate" style={{ color: '#0F172A' }}>Groove Salad · Ambient Chill 🌿</div>
            <div className="text-[7px]" style={{ color: '#94A3B8' }}>Community DJ · 6 residents listening</div>
          </div>
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#8B5CF6' }}>
            <span className="text-[8px]">▶</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── 6. Community / Chat mockup ──────────────────────────────────────── */
function CommunityMockup() {
  return (
    <PhoneFrame glowColor="#10B981" height={520}>
      {/* Announcement card */}
      <div className="px-4 pt-9 pb-3 border-b" style={{ borderColor: '#E2E8F0', background: '#fff' }}>
        <div className="text-[13px] font-bold" style={{ color: '#0F172A', letterSpacing: '-0.02em' }}>Announcements</div>
        <div className="text-[9px] mt-0.5" style={{ color: '#94A3B8' }}>Estate-wide broadcasts from management</div>
      </div>

      <div className="flex-1 overflow-hidden p-3 space-y-2.5" style={{ background: '#F8FAFC' }}>
        {/* Pinned announcement */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-base">📌</span>
            <span className="text-[8px] font-bold text-amber-700 uppercase tracking-wide">Pinned Notice</span>
          </div>
          <div className="text-[10px] font-bold mb-1" style={{ color: '#0F172A' }}>
            Water maintenance – Saturday 8AM to 2PM
          </div>
          <p className="text-[8px] leading-snug" style={{ color: '#64748B' }}>
            The main water supply will be off while we replace the booster pump. Please store water in advance.
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[7px]" style={{ color: '#94A3B8' }}>Estate Management · 2h ago</span>
            <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">48 seen</span>
          </div>
        </div>

        {/* Regular announcement */}
        <div className="bg-white border rounded-xl p-3" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base">🎉</span>
            <span className="text-[8px] font-bold uppercase tracking-wide" style={{ color: '#6366F1' }}>Event</span>
          </div>
          <div className="text-[10px] font-bold mb-1" style={{ color: '#0F172A' }}>
            Annual Estate Barbecue – Sun 29 June
          </div>
          <p className="text-[8px] leading-snug" style={{ color: '#64748B' }}>
            Join us at the clubhouse at 4PM. RSVP in the Lounge → Events tab.
          </p>
          <div className="text-[7px] mt-1.5" style={{ color: '#94A3B8' }}>Estate Management · Yesterday</div>
        </div>

        {/* Chat section header */}
        <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: '#94A3B8' }}>
          Estate Chat
        </div>

        {/* Chat bubbles */}
        <div className="space-y-2">
          {[
            { name: 'Tunde M.', init: 'T', msg: 'Anyone know a good generator repair technician?', mine: false, color: '#6366F1' },
            { name: 'Amaka E.', init: 'A', msg: 'Yes! Kelechi on Block C is great. I can share his number.', mine: false, color: '#10B981' },
            { name: 'You',      init: 'Y', msg: 'Please send his number, need mine looked at too 🙏', mine: true,  color: '#059669' },
          ].map((m, i) => (
            <div key={i} className={`flex items-end gap-1.5 ${m.mine ? 'flex-row-reverse' : ''}`}>
              {!m.mine && (
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0"
                  style={{ background: m.color }}>{m.init}</div>
              )}
              <div className="max-w-[70%]">
                {!m.mine && <div className="text-[7px] pl-1 mb-0.5" style={{ color: '#94A3B8' }}>{m.name}</div>}
                <div className="rounded-2xl px-2.5 py-1.5 text-[8px] leading-snug"
                  style={m.mine
                    ? { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' }
                    : { background: '#F1F5F9', border: '1px solid #E2E8F0', color: '#0F172A' }}>
                  {m.msg}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-white rounded-xl border px-2.5 py-2" style={{ borderColor: '#E2E8F0' }}>
          <div className="flex-1 text-[8px]" style={{ color: '#CBD5E1' }}>Type a message…</div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
            style={{ background: '#10B981' }}>
            <ArrowRight size={10} />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── 7. Admin dashboard browser mockup ──────────────────────────────── */
function AdminMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-3xl blur-3xl pointer-events-none" style={{ background: 'rgba(16,185,129,0.12)' }} />
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 w-full max-w-[380px] mx-auto">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200" style={{ background: '#fff' }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          </div>
          <div className="flex-1 mx-3">
            <div className="rounded-md px-3 py-1 text-[10px] text-slate-400 text-center font-mono"
              style={{ background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
              app.areaconnect.pro/dashboard
            </div>
          </div>
        </div>

        <div className="flex" style={{ height: 340, background: '#F8FAFC' }}>
          {/* Sidebar */}
          <div className="w-12 flex flex-col items-center py-3 gap-2 flex-shrink-0 border-r" style={{ background: '#fff', borderColor: '#E2E8F0' }}>
            <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-1" style={{ background: '#10B981' }}>
              <span className="text-white text-[7px] font-black">AC</span>
            </div>
            {['🏠', '👥', '🚪', '💳', '🔔', '📊'].map((icon, i) => (
              <div key={i} className="w-7 h-6 rounded-lg flex items-center justify-center text-sm"
                style={{ background: i === 0 ? 'rgba(16,185,129,0.10)' : 'transparent', boxShadow: i === 0 ? 'inset 3px 0 0 #10B981' : 'none' }}>
                {icon}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Emerald hero */}
            <div className="px-3 pt-3 pb-3" style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 60%, #047857 100%)' }}>
              <div className="text-[10px] font-black text-white mb-0.5">Good morning, Adaeze 👋</div>
              <div className="text-[8px] mb-2" style={{ color: 'rgba(255,255,255,0.75)' }}>Sunrise Estate — here's today at a glance</div>
              <div className="flex gap-1">
                {[
                  { l: 'Residents',      v: '142' },
                  { l: 'Visitors Today', v: '23'  },
                  { l: 'Inside Now',     v: '8'   },
                  { l: 'Open Alerts',    v: '2',  alert: true },
                ].map(s => (
                  <div key={s.l} className="flex-1 rounded-lg px-1 py-1 text-center"
                    style={{ background: s.alert ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                    <div className="text-[10px] font-black text-white">{s.v}</div>
                    <div className="text-[7px]" style={{ color: 'rgba(255,255,255,0.72)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 p-3 space-y-2.5 overflow-hidden">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: 'Manage Residents', iconBg: 'rgba(99,102,241,0.10)',  iconColor: '#6366F1' },
                  { label: 'Estate Units',     iconBg: 'rgba(167,139,250,0.10)', iconColor: '#8B5CF6' },
                  { label: 'Post Notice',      iconBg: 'rgba(217,119,6,0.10)',   iconColor: '#D97706' },
                  { label: 'View Alerts',      iconBg: 'rgba(239,68,68,0.10)',   iconColor: '#EF4444' },
                ].map(a => (
                  <div key={a.label} className="flex items-center gap-1.5 p-1.5 rounded-xl border"
                    style={{ background: '#fff', borderColor: 'rgba(15,23,42,0.08)' }}>
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: a.iconBg }}>
                      <div className="w-2 h-2 rounded-sm" style={{ background: a.iconColor }} />
                    </div>
                    <div className="text-[7px] font-semibold" style={{ color: '#0F172A' }}>{a.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Visitors */}
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(15,23,42,0.08)' }}>
                <div className="px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-wider border-b"
                  style={{ color: '#94A3B8', borderColor: 'rgba(15,23,42,0.06)', background: '#fff' }}>
                  Recent Visitors
                </div>
                {[
                  { n: 'Chidi Okafor', u: 'Unit 4B', s: 'checked-in',  sc: '#059669', sb: 'rgba(16,185,129,0.10)',  se: 'rgba(16,185,129,0.18)'  },
                  { n: 'Fatima Bello', u: 'Unit 2A', s: 'active',      sc: '#D97706', sb: 'rgba(245,158,11,0.10)',  se: 'rgba(245,158,11,0.18)'  },
                  { n: 'Emeka Nwosu',  u: 'Unit 7C', s: 'checked-out', sc: '#94A3B8', sb: 'rgba(148,163,184,0.10)', se: 'rgba(148,163,184,0.18)' },
                ].map(v => (
                  <div key={v.n} className="flex items-center gap-1.5 px-2.5 py-1.5 border-b last:border-0 bg-white" style={{ borderColor: 'rgba(15,23,42,0.04)' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold flex-shrink-0"
                      style={{ background: 'rgba(16,185,129,0.10)', color: '#059669', border: '1px solid rgba(16,185,129,0.18)' }}>
                      {v.n[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[8px] font-medium truncate" style={{ color: '#0F172A' }}>{v.n}</div>
                      <div className="text-[7px]" style={{ color: '#94A3B8' }}>{v.u}</div>
                    </div>
                    <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{ background: v.sb, color: v.sc, border: `1px solid ${v.se}` }}>
                      {v.s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Feature categories with mockup references ──────────────────────── */
const SECTIONS = [
  {
    tag:     'Visitor Management',
    title:   'Zero-friction guest access — from invite to gate',
    desc:    'Replace paper log books and phone calls with a seamless digital visitor flow. Residents control their own guests, security verifies in seconds.',
    tagBg:   'bg-brand-500/10 border-brand-500/20 text-brand-400',
    dotColor:'bg-brand-500',
    Mockup:  VisitorMockup,
    features: [
      { title: 'Visitor pre-registration',    desc: 'Residents register guests by name and expected arrival date from the AreaMates app in under 30 seconds. No calls to the gate required.' },
      { title: 'QR code & 6-digit pass',      desc: 'Every visitor automatically receives a branded email with a unique QR code and 6-digit access code — shareable on WhatsApp or SMS.' },
      { title: 'Instant gate verification',   desc: 'Security officers scan the QR or type the code in the Guard app. Verification takes under one second — no calls, no paper.' },
      { title: 'Check-in & check-out log',    desc: 'Every entry and exit is timestamped and synced to the cloud. The manager sees who is on-site in real time from the Admin dashboard.' },
      { title: 'Single-use & time-limited',   desc: 'Passes expire 24 hours after the expected arrival and cannot be reused after check-in, preventing code sharing entirely.' },
      { title: 'Instant revocation',          desc: 'A resident can revoke any visitor pass with one tap — immediately and permanently. Guard apps reflect the change in real time.' },
    ],
  },
  {
    tag:     'Security',
    title:   'Multi-layered security — alarm, gate, and resident panic in one system',
    desc:    'From panic buttons that trigger a real police siren on guard devices to auto-blacklist blocking and offline gate operation — AreaConnect takes security seriously.',
    tagBg:   'bg-red-500/10 border-red-500/20 text-red-400',
    dotColor:'bg-red-500',
    Mockup:  SecurityMockup,
    features: [
      { title: 'Resident panic button',       desc: 'One tap from AreaMates sends an immediate alert to every security officer — with a real police siren sound playing on their Guard app devices. No delay, no middlemen.' },
      { title: 'Three alert categories',      desc: 'Residents choose the emergency type before sending: Security Threat 🛡️, Fire Emergency 🔥, or Medical Emergency ❤️ — the right team gets the right alert.' },
      { title: 'Audio alarm on Guard app',    desc: 'When a resident panic alert fires, a police siren plays through the guard officer\'s phone speaker — alerts are never missed even in a noisy gate environment.' },
      { title: 'Auto blacklist blocking',     desc: 'Once blacklisted, any future code entry attempt by that visitor triggers an instant ACCESS DENIED — automatically, with no manual check required.' },
      { title: 'Offline gate operation',      desc: 'The Guard app caches all visitor data locally. During outages, guards still verify, check in, and check out. Everything syncs when connectivity returns.' },
      { title: 'Manager broadcast alerts',    desc: 'Estate managers push security-level broadcasts to every resident simultaneously — with push notification delivery — for incidents or evacuations.' },
      { title: 'Guard incident escalation',   desc: 'Gate officers raise incidents from the Guard app to the manager and all residents with a free-text description attached.' },
      { title: 'Cryptographic pass security', desc: 'QR codes are cryptographically unique, single-use, and time-bound. 6-digit codes expire automatically — no guessable patterns, no replay attacks.' },
      { title: 'Full audit log',              desc: 'A tamper-evident log of every check-in and check-out with timestamps, visitor names, host units, and officer IDs — exportable at any time.' },
    ],
  },
  {
    tag:     'Payments',
    title:   'Collect dues on autopilot — no chasing required',
    desc:    'Schedule recurring levies, send automated reminders, and reconcile payments in real time. Powered by Paystack.',
    tagBg:   'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    dotColor:'bg-indigo-500',
    Mockup:  PaymentsMockup,
    features: [
      { title: 'Payment schedules',           desc: 'Create monthly, quarterly, or one-off schedules for any levy — service charge, security, generator, water. Set once, AreaConnect handles the rest.' },
      { title: 'Automated reminders',         desc: 'Residents receive push and email reminders before and after deadlines — zero manual follow-up from the estate manager.' },
      { title: 'Paystack integration',        desc: 'Residents pay by card, bank transfer, or USSD within the AreaMates app. Funds settle directly to the estate\'s registered bank account.' },
      { title: 'Manual & waiver recording',   desc: 'Record cash payments manually. Waive individual payments with a reason attached for a complete audit trail.' },
      { title: 'Estate wallet',               desc: 'Collected funds accumulate in a dedicated estate wallet. Withdraw to any registered Nigerian bank account at any time.' },
      { title: 'Reconciliation reports',      desc: 'Instantly see who has paid, who is outstanding, and the full history per resident. Export any report to CSV.' },
    ],
  },
  {
    tag:     'Resident Marketplace',
    title:   'Buy, sell, and trade — within your estate community',
    desc:    'AreaMates ships a full in-estate marketplace. Post listings, browse by category, message sellers directly, and complete deals — all scoped to residents you already share a gate with.',
    tagBg:   'bg-amber-500/10 border-amber-500/20 text-amber-400',
    dotColor:'bg-amber-500',
    Mockup:  MarketplaceMockup,
    features: [
      { title: 'Five categories',             desc: 'Food 🍽️ — meals, groceries, produce. Services 🔧 — plumbing, cleaning, electrical. Skills 💡 — tutoring, design, tech. For Sale 🏷️ — furniture, appliances, electronics. Rentals 🏠 — short-term items or spaces.' },
      { title: 'Photo listings',              desc: 'Sellers upload a photo with every listing. Buyers see exactly what they\'re getting before reaching out.' },
      { title: 'Free & priced listings',      desc: 'List items as free (₦0) or set any price. Zero platform fee — 100% of the agreed price goes between residents.' },
      { title: 'In-app DM with seller',       desc: 'Every listing has a "Message Seller" button that opens a real-time direct message thread — ask questions, negotiate, and arrange delivery inside the app.' },
      { title: 'Like & save listings',        desc: 'Residents heart-save listings to revisit. The heart count is visible to sellers — popular listings rise naturally.' },
      { title: 'Estate-scoped only',          desc: 'Only residents of your estate see, post, or message about listings. No strangers, no spam from outside the community.' },
    ],
  },
  {
    tag:     'Resident Lounge',
    title:   'Your estate\'s social hub — feed, events, polls, and the community DJ booth',
    desc:    'Five fully-featured tabs purpose-built for estate living. Not just chat — a real community layer your residents will actually use every day.',
    tagBg:   'bg-violet-500/10 border-violet-500/20 text-violet-400',
    dotColor:'bg-violet-500',
    Mockup:  LoungeMockup,
    features: [
      { title: 'Social feed with images',     desc: 'Post text updates and up to 4 photos at once. Like posts and comment. Managers moderate; residents manage their own content.' },
      { title: 'Events & RSVP',               desc: 'Browse community events, RSVP with one tap, and get automatic reminders. Friday Night FunTimes events are highlighted in gold with a live countdown timer.' },
      { title: 'Activities calendar',         desc: '12 default estate activities (Morning Jog, Swimming, Yoga, Tennis, Book Club, Friday Night FunTimes, and more). Pin, hide, or add custom activities.' },
      { title: 'Live polls & voting',         desc: 'Vote on estate decisions. Real-time progress bar results. Closed polls are preserved for reference.' },
      { title: 'Community DJ queue',          desc: 'Suggest YouTube tracks by URL and title. Residents upvote favourites to the top. Auto DJ mode plays the most-voted track continuously.' },
      { title: '6 live radio stations',       desc: 'Groove Salad (Chill 🌿), Beat Blender (Dance 🎧), Illinois Lounge (Jazz 🎷), Space Station (Ambient 🚀), Digitalis (Indie 🎸), Party Vibes (Afrobeats 🎉) — auto-plays every Friday from 6PM.' },
    ],
  },
  {
    tag:     'Community',
    title:   'Everything that keeps your estate connected every day',
    desc:    'Announcements, real-time chat, and push notifications — the communication layer that replaces the five overloaded WhatsApp groups.',
    tagBg:   'bg-pink-500/10 border-pink-500/20 text-pink-400',
    dotColor:'bg-pink-500',
    Mockup:  CommunityMockup,
    features: [
      { title: 'Rich announcements',          desc: 'Broadcast notices with images and attachments. Every resident gets a push notification. Acknowledgement tracking gives managers a read-receipt list.' },
      { title: 'Estate group chat',           desc: 'A community thread strictly scoped to your estate — no cross-estate mixing. Residents read and post freely in real time.' },
      { title: 'Direct messages',             desc: 'Residents message each other one-to-one — for marketplace deals, carpool planning, or just saying hello. Real-time WebSocket delivery.' },
      { title: 'Push notifications',          desc: 'Every important event — visitor arrival, payment due, announcement, alert — triggers a push notification. Nothing goes unnoticed.' },
      { title: 'AI community moderator',      desc: 'Nkechi, the built-in AI assistant, monitors the group chat and helps answer common estate questions, keeping conversations constructive.' },
      { title: 'No cross-estate leakage',     desc: 'Every piece of data is scoped to a single estate. Chat, visitors, payments, listings, and alerts from one estate are completely invisible to any other.' },
    ],
  },
  {
    tag:     'Estate Management',
    title:   'Every admin task, one dashboard',
    desc:    'Run your entire estate from a single web app. No spreadsheets, no manual follow-ups, no WhatsApp chaos.',
    tagBg:   'bg-teal-500/10 border-teal-500/20 text-teal-400',
    dotColor:'bg-teal-500',
    Mockup:  AdminMockup,
    features: [
      { title: 'Resident management',         desc: 'Add, invite, suspend, and reactivate residents. Bulk-upload hundreds at once with a CSV file. Assign to units from the same screen.' },
      { title: 'Unit & block management',     desc: 'Create blocks and units, assign residents, track occupancy, and see at a glance which units are vacant, occupied, or over-capacity.' },
      { title: 'Blacklist management',        desc: 'Add visitors to the estate blacklist. The list syncs instantly to every Guard app session across all gates.' },
      { title: 'Live analytics dashboard',    desc: 'Real-time stats for visitor volume, payment collection rates, resident activity, and open alerts — without refreshing.' },
      { title: 'Role-based access control',   desc: 'Separate roles for estate manager, security guard, and resident. Each sees only what they need — no accidental access to restricted data.' },
      { title: 'Multi-estate management',     desc: 'On Enterprise, manage multiple estates from a single login. One dashboard for an entire property portfolio.' },
    ],
  },
];

/* ─── Page ────────────────────────────────────────────────────────────── */
export default function Features() {
  return (
    <div className="pt-16">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <PageHero
        tag="Platform Features"
        title={
          <>
            Everything you need.<br />
            <span className="gradient-text-brand">Nothing you don't.</span>
          </>
        }
        subtitle="AreaConnect ships a complete estate management platform — visitor management, payments, marketplace, the resident lounge, community tools, and security that actually makes noise. All three apps included."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/pricing" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-0.5 text-[15px]">
            View pricing <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:bg-white/8 text-[15px]">
            Request a demo
          </Link>
        </div>
      </PageHero>

      {/* ── SECTIONS ─────────────────────────────────────────────────────── */}
      {SECTIONS.map((sec, si) => {
        const { Mockup } = sec;
        const flip = si % 2 !== 0;
        return (
          <section key={sec.tag} className={si % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>

            {/* Stats interlude after Payments */}
            {si === 3 && (
              <div className="bg-slate-900 py-12 border-y border-white/5">
                <div className="max-w-4xl mx-auto px-6">
                  <Reveal>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
                      {[
                        { number: '40+', label: 'features' },
                        { number: '3',   label: 'apps'     },
                        { number: '1',   label: 'platform' },
                      ].map((s, i) => (
                        <div key={s.label} className="flex items-center gap-4">
                          {i > 0 && <span className="hidden sm:block text-slate-700 text-2xl font-light">·</span>}
                          <div>
                            <span className="text-5xl font-black gradient-text-brand">{s.number}</span>
                            <span className="text-slate-400 text-lg font-semibold ml-2">{s.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            )}

            <div className="py-20 max-w-6xl mx-auto px-6">
              {/* Section header */}
              <Reveal>
                <div className="mb-12">
                  <span className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase mb-5 ${sec.tagBg}`}>
                    {sec.tag}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-slate-900 tracking-tight mb-4 max-w-3xl leading-tight">
                    {sec.title}
                  </h2>
                  <p className="text-sm sm:text-lg text-slate-500 max-w-2xl leading-relaxed">{sec.desc}</p>
                </div>
              </Reveal>

              {/* Split: mockup | features */}
              <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-start ${flip ? 'lg:flex-row-reverse' : ''}`}>

                {/* Mockup column */}
                <Reveal className="w-full lg:w-auto lg:flex-shrink-0" delay={60}>
                  <div className="lg:w-[260px] xl:w-[280px]">
                    <Mockup />
                  </div>
                </Reveal>

                {/* Feature list */}
                <div className="flex-1">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {sec.features.map((f, fi) => (
                      <Reveal key={f.title} delay={fi * 35}>
                        <div className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full">
                          <div className="flex items-start gap-3 mb-2">
                            <div className={`w-6 h-6 rounded-full ${sec.dotColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <CheckCircle2 size={12} className="text-white" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm leading-snug">{f.title}</h3>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed pl-9">{f.desc}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-900" />
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
              Start today
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-5">
              Start using every feature today
            </h2>
            <p className="text-brand-100 text-base sm:text-xl mb-10 leading-relaxed">
              From ₦20,000/month. Visitor management, payments, marketplace,<br className="hidden sm:block" />
              the resident lounge, and security that actually makes noise.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing" className="inline-flex items-center justify-center gap-2 bg-white text-brand-700 font-bold px-8 py-4 rounded-xl hover:bg-brand-50 transition-all duration-200 text-[15px] shadow-xl shadow-black/20 hover:-translate-y-0.5">
                View pricing <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-[15px] hover:bg-white/8">
                Book a demo
              </Link>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-10 text-sm text-brand-200">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> From ₦20,000/month</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> All 3 apps included</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> No setup fees</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-300" /> Cancel anytime</span>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
