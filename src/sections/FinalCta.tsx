import { useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Clock, Loader2, MessageCircle, Phone, Star } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { clinic, telHref, whatsappHref } from '../config/clinic';

type Fields = { name: string; phone: string; concern: string; time: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; href: string } | { kind: 'blocked'; href: string };

const empty: Fields = { name: '', phone: '', concern: '', time: '', message: '', consent: false };
const concerns = ['Back pain / Sciatica', 'Neck pain', 'Shoulder pain', 'Knee pain', 'Ankle / Heel pain', 'Post-surgery rehab', 'Sports injury', 'Child (paediatric)', 'Other / not sure'];

/** Validates an Indian mobile number, accepting +91 / 0 prefixes and spaces. */
export function isValidIndianMobile(v: string) {
  const digits = v.replace(/[\s-]/g, '').replace(/^(\+91|91|0)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits);
}

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!isValidIndianMobile(f.phone)) e.phone = 'Please enter a valid 10-digit Indian mobile number.';
  if (!f.concern) e.concern = 'Please choose what you need help with.';
  if (f.message.length > 600) e.message = 'Please keep your message under 600 characters.';
  if (!f.consent) e.consent = 'Please confirm we can contact you about your enquiry.';
  return e;
}

/** Opens WhatsApp with a pre-written message. Returns false if a pop-up blocker stopped it. */
export function openWhatsApp(href: string) {
  const win = window.open(href, '_blank');
  if (win) win.opener = null;
  return !!win;
}

const field =
  'mt-2 w-full rounded-2xl border bg-[#F8FAFD] px-4 py-3.5 text-[#0E1E3D] placeholder:text-[#9AA6BA] focus:border-[#2463EB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2463EB]/15';
const label = 'font-hero text-sm font-semibold text-[#0E1E3D]';

function BookingForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const id = useId();

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: 'sending' });
    const msg = [
      'Hello, I would like to book a physiotherapy appointment.',
      '',
      `Name: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Need help with: ${f.concern}`,
      f.time && `Preferred time: ${f.time}`,
      f.message.trim() && `Note: ${f.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    const href = whatsappHref(msg);
    const ok = openWhatsApp(href);
    setTimeout(() => setStatus(ok ? { kind: 'sent', href } : { kind: 'blocked', href }), 500);
  };

  const err = (k: keyof Fields) =>
    errors[k] && (
      <p id={`${id}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#D93B2B]">
        <AlertCircle size={15} aria-hidden="true" /> {errors[k]}
      </p>
    );
  const aria = (k: keyof Fields) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined });
  const border = (k: keyof Fields) => (errors[k] ? 'border-[#D93B2B]' : 'border-[#E1E7F0]');

  if (status.kind === 'sent' || status.kind === 'blocked') {
    const sent = status.kind === 'sent';
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center py-6">
        {sent ? <CheckCircle2 size={44} className="text-[#22A06B]" aria-hidden="true" /> : <AlertCircle size={44} className="text-[#D93B2B]" aria-hidden="true" />}
        <h3 className="font-hero mt-5 text-3xl font-extrabold text-[#0E1E3D]">{sent ? 'Almost done!' : 'WhatsApp didn’t open.'}</h3>
        <p className="mt-3 max-w-md text-[#3B4A63]">
          {sent
            ? 'Your details are written into a WhatsApp message. Just press send in WhatsApp, and our team will reply to confirm your time.'
            : 'Your browser may have blocked the new window. Use the button below to open your message, or call us directly.'}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={status.href} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-bold text-white hover:bg-[#1EBE5A]">
            <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp message
          </a>
          <a href={telHref} className="font-hero inline-flex h-12 items-center gap-2 rounded-full border border-[#D5DEEC] px-6 font-bold text-[#0E1E3D]">
            <Phone size={17} aria-hidden="true" /> Call instead
          </a>
        </div>
        <button type="button" onClick={() => setStatus({ kind: 'idle' })} className="mt-5 text-sm font-semibold text-[#1D4FD8] underline-offset-4 hover:underline">
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Appointment enquiry" className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-name`} className={label}>Full name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your name" value={f.name} onChange={(e) => set('name', e.target.value)} className={`${field} ${border('name')}`} {...aria('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={label}>Mobile number</label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxx xxxxx" value={f.phone} onChange={(e) => set('phone', e.target.value)} className={`${field} ${border('phone')}`} {...aria('phone')} />
        {err('phone')}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-concern`} className={label}>What do you need help with?</label>
        <select id={`${id}-concern`} name="concern" value={f.concern} onChange={(e) => set('concern', e.target.value)} className={`${field} ${border('concern')}`} {...aria('concern')}>
          <option value="">Select…</option>
          {concerns.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {err('concern')}
      </div>
      <fieldset className="sm:col-span-2">
        <legend className={label}>Preferred time</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {['Morning', 'Afternoon', 'Evening'].map((t) => (
            <label
              key={t}
              className={`font-hero cursor-pointer rounded-2xl border py-3 text-center text-sm font-semibold transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-[#2463EB]/25 ${
                f.time === t ? 'border-[#2463EB] bg-[#2463EB] text-white' : 'border-[#E1E7F0] bg-[#F8FAFD] text-[#3B4A63] hover:border-[#2463EB]/50'
              }`}
            >
              <input type="radio" name="time" value={t} checked={f.time === t} onChange={() => set('time', t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={label}>
          Anything else? <span className="font-normal text-[#9AA6BA]">(optional)</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={3} placeholder="E.g. pain for 2 months, worse when sitting" value={f.message} onChange={(e) => set('message', e.target.value)} className={`${field} ${border('message')} resize-y`} {...aria('message')} />
        {err('message')}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-[#3B4A63]">
          <input type="checkbox" name="consent" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 size-4 accent-[#2463EB]" {...aria('consent')} />
          <span>
            I agree to be contacted about this enquiry. See our <Link to="/privacy" className="font-semibold text-[#1D4FD8] underline-offset-4 hover:underline">privacy note</Link>.
          </span>
        </label>
        {err('consent')}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" disabled={status.kind === 'sending'} className="font-nav inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2463EB] text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8] disabled:opacity-70">
          {status.kind === 'sending' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <MessageCircle size={18} aria-hidden="true" />}
          {status.kind === 'sending' ? 'Opening WhatsApp…' : 'Send enquiry via WhatsApp'}
        </button>
        <p className="mt-3 text-center text-xs text-[#9AA6BA]">Your details go straight to the clinic on WhatsApp. Nothing is stored on this website.</p>
      </div>
    </form>
  );
}

export function FinalCta() {
  return (
    <section id="book" aria-labelledby="book-title" className="bg-white pb-24 pt-8 md:pb-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <Reveal>
          <div className="grid overflow-hidden rounded-[36px] bg-[#0E1E3D] shadow-[0_40px_90px_-50px_rgba(14,30,61,.8)] lg:grid-cols-12">
            {/* Left: pitch */}
            <div className="relative overflow-hidden p-8 md:p-12 lg:col-span-5">
              <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-[#2463EB]/30 blur-[90px]" />
              <div className="relative">
                <p className="font-hero inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                  <Star size={14} className="fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" /> {clinic.google.rating.toFixed(1)} rated on Google
                </p>
                <h2 id="book-title" className="font-hero mt-6 text-[clamp(2.2rem,3.6vw,3.4rem)] leading-[1.06] tracking-[-0.025em] text-white">
                  <span className="font-normal">Your next move </span>
                  <span className="font-extrabold">starts here.</span>
                </h2>
                <p className="mt-4 text-[1.05rem] leading-relaxed text-white/70">Tell us what’s bothering you and we’ll get back to you to fix a time for your assessment.</p>
                <ul className="mt-9 space-y-3">
                  <li>
                    <a href={telHref} className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]">
                      <span className="grid size-12 place-items-center rounded-xl bg-[#2463EB] text-white">
                        <Phone size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">Call us</span>
                        <span className="font-hero block text-lg font-bold text-white">{clinic.phone.display}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1]">
                      <span className="grid size-12 place-items-center rounded-xl bg-[#25D366] text-white">
                        <MessageCircle size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/50">WhatsApp</span>
                        <span className="font-hero block text-lg font-bold text-white">Chat with the clinic</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4 p-4 text-white/70">
                    <Clock size={20} aria-hidden="true" /> Open {clinic.hours.summary}
                  </li>
                </ul>
              </div>
            </div>
            {/* Right: form */}
            <div className="m-2 rounded-[30px] bg-white p-7 md:m-3 md:p-10 lg:col-span-7">
              <h3 className="font-hero text-2xl font-extrabold text-[#0E1E3D]">Book an appointment</h3>
              <p className="mt-1 text-[#3B4A63]">Takes less than a minute.</p>
              <div className="mt-7">
                <BookingForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
