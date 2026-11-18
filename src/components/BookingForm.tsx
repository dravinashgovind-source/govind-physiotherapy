import { useId, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { whatsappHref } from '../config/clinic';
import { isValidIndianMobile, openWhatsApp } from '../sections/FinalCta';

/** Quick booking form: validates, then opens WhatsApp with a pre-filled message. Used by the site-wide booking popup and the /app page. */
export const concerns = ['Back pain / Sciatica', 'Neck pain', 'Shoulder pain', 'Knee pain', 'Ankle / Heel pain', 'Post-surgery rehab', 'Sports injury', 'Senior care', 'Posture correction', 'Other / not sure'];

export function BookingForm({ preset, formLabel = 'Booking form' }: { preset?: string; formLabel?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState(preset ?? '');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { ok: boolean; href: string }>(null);
  const id = useId();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (name.trim().length < 2) er.name = 'Please enter your name.';
    if (!isValidIndianMobile(phone)) er.phone = 'Enter a valid 10-digit mobile number.';
    if (!concern) er.concern = 'Please choose one.';
    setErrors(er);
    if (Object.keys(er).length) return;
    const msg = ['Hello, I would like to book a physiotherapy appointment.', '', `Name: ${name.trim()}`, `Phone: ${phone.trim()}`, `Need help with: ${concern}`, time && `Preferred time: ${time}`]
      .filter(Boolean)
      .join('\n');
    const href = whatsappHref(msg);
    setDone({ ok: openWhatsApp(href), href });
  };

  const input = 'mt-1.5 w-full rounded-2xl border bg-[#F6F8FC] px-4 py-3 text-[15px] text-[#0E1E3D] placeholder:text-[#9AA6BA] focus:border-[#2463EB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2463EB]/15';
  const err = (k: string) => errors[k] && <p className="mt-1 flex items-center gap-1 text-[13px] text-[#D93B2B]"><AlertCircle size={13} aria-hidden="true" /> {errors[k]}</p>;

  if (done)
    return (
      <div role="status" className="py-4">
        <CheckCircle2 size={40} className={done.ok ? 'text-[#22A06B]' : 'text-[#D93B2B]'} aria-hidden="true" />
        <p className="font-hero mt-4 text-xl font-extrabold text-[#0E1E3D]">{done.ok ? 'Almost done!' : 'WhatsApp didn’t open.'}</p>
        <p className="mt-2 text-[15px] text-[#3B4A63]">{done.ok ? 'Press send in WhatsApp and the clinic will confirm your time.' : 'Tap below to open your message.'}</p>
        <a href={done.href} target="_blank" rel="noopener noreferrer" className="font-hero mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold text-white">
          <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp
        </a>
        <button type="button" onClick={() => setDone(null)} className="font-hero mt-3 w-full py-2 text-sm font-semibold text-[#1D4FD8]">
          Edit details
        </button>
      </div>
    );

  return (
    <form noValidate onSubmit={submit} className="space-y-4" aria-label={formLabel}>
      <div>
        <label htmlFor={`${id}-n`} className="font-hero text-sm font-semibold text-[#0E1E3D]">Full name</label>
        <input id={`${id}-n`} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${input} ${errors.name ? 'border-[#D93B2B]' : 'border-[#E1E7F0]'}`} aria-invalid={!!errors.name || undefined} />
        {err('name')}
      </div>
      <div>
        <label htmlFor={`${id}-p`} className="font-hero text-sm font-semibold text-[#0E1E3D]">Mobile number</label>
        <input id={`${id}-p`} type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" value={phone} onChange={(e) => setPhone(e.target.value)} className={`${input} ${errors.phone ? 'border-[#D93B2B]' : 'border-[#E1E7F0]'}`} aria-invalid={!!errors.phone || undefined} />
        {err('phone')}
      </div>
      <div>
        <label htmlFor={`${id}-c`} className="font-hero text-sm font-semibold text-[#0E1E3D]">What do you need help with?</label>
        <select id={`${id}-c`} value={concern} onChange={(e) => setConcern(e.target.value)} className={`${input} ${errors.concern ? 'border-[#D93B2B]' : 'border-[#E1E7F0]'}`} aria-invalid={!!errors.concern || undefined}>
          <option value="">Select…</option>
          {concerns.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        {err('concern')}
      </div>
      <fieldset>
        <legend className="font-hero text-sm font-semibold text-[#0E1E3D]">Preferred time</legend>
        <div className="mt-1.5 grid grid-cols-3 gap-2">
          {['Morning', 'Afternoon', 'Evening'].map((t) => (
            <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(time === t ? '' : t)} className={`font-hero h-11 rounded-2xl border text-sm font-semibold ${time === t ? 'border-[#2463EB] bg-[#2463EB] text-white' : 'border-[#E1E7F0] bg-[#F6F8FC] text-[#3B4A63]'}`}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>
      <button type="submit" className="font-hero flex w-full items-center justify-center gap-2 rounded-full bg-[#2463EB] py-3.5 font-bold text-white active:bg-[#1D4FD8]">
        <MessageCircle size={18} aria-hidden="true" /> Send via WhatsApp
      </button>
      <p className="text-center text-xs text-[#9AA6BA]">Goes straight to the clinic on WhatsApp. Nothing is stored here.</p>
    </form>
  );
}
