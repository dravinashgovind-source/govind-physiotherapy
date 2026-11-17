import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Download,
  Footprints,
  Home,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Navigation,
  PersonStanding,
  Phone,
  Share,
  Star,
  Store,
  X,
  Zap,
  CalendarCheck,
  Dumbbell,
} from 'lucide-react';
import { Photo } from '../components/Photo';
import { clinic, telHref, whatsappHref } from '../config/clinic';
import { services } from '../content/services';
import { regionById } from '../content/regions';
import { isValidIndianMobile, openWhatsApp } from '../sections/FinalCta';
import { useSeo } from '../lib/seo';

const NAVY = '#0B1E4A';
const ease = [0.16, 1, 0.3, 1] as const;
type Tab = 'home' | 'services' | 'routine' | 'visit';

/* ------------------------------------------------------------------ booking sheet */

const concerns = ['Back pain / Sciatica', 'Neck pain', 'Shoulder pain', 'Knee pain', 'Ankle / Heel pain', 'Post-surgery rehab', 'Sports injury', 'Senior care', 'Posture correction', 'Other / not sure'];

function BookingSheet({ open, onClose, preset }: { open: boolean; onClose: () => void; preset?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<null | { ok: boolean; href: string }>(null);
  const id = useId();

  useEffect(() => {
    if (open) {
      setConcern(preset ?? '');
      setDone(null);
      setErrors({});
    }
  }, [open, preset]);

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-50 flex items-end bg-[#020817]/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Book an appointment"
            className="max-h-[92%] w-full overflow-y-auto rounded-t-[30px] bg-white px-5 pb-8 pt-3"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1.5 w-11 rounded-full bg-[#DCE3EE]" aria-hidden="true" />
            <div className="mt-4 flex items-center justify-between">
              <h2 className="font-hero text-xl font-extrabold text-[#0E1E3D]">Book appointment</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 place-items-center rounded-full bg-[#F4F7FC] text-[#0E1E3D]">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            {done ? (
              <div role="status" className="py-6">
                <CheckCircle2 size={40} className={done.ok ? 'text-[#22A06B]' : 'text-[#D93B2B]'} aria-hidden="true" />
                <p className="font-hero mt-4 text-xl font-extrabold text-[#0E1E3D]">{done.ok ? 'Almost done!' : 'WhatsApp didn’t open.'}</p>
                <p className="mt-2 text-[15px] text-[#3B4A63]">{done.ok ? 'Press send in WhatsApp and the clinic will confirm your time.' : 'Tap below to open your message.'}</p>
                <a href={done.href} target="_blank" rel="noopener noreferrer" className="font-hero mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold text-white">
                  <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp
                </a>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="mt-5 space-y-4" aria-label="App booking form">
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
                <button type="submit" className="font-hero flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#2463EB] py-3.5 font-bold text-white">
                  <MessageCircle size={18} aria-hidden="true" /> Send via WhatsApp
                </button>
                <p className="text-center text-xs text-[#9AA6BA]">Goes straight to the clinic on WhatsApp. Nothing is stored here.</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ shared bits */

function Glass({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[26px] border border-white/12 bg-white/[0.07] backdrop-blur-md ${className}`}>{children}</div>;
}

function TabTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="px-5 pt-3">
      <p className="font-hero text-[13px] font-semibold text-[#8FB8FF]">{eyebrow}</p>
      <h1 className="font-hero mt-1 text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-white">{title}</h1>
    </div>
  );
}

/* ------------------------------------------------------------------ home */

const quick = [
  { icon: Footprints, label: 'Rehab Programs', service: 'postop' },
  { icon: Zap, label: 'Pain Relief', service: 'pain' },
  { icon: PersonStanding, label: 'Posture Correction', service: 'spine' },
  { icon: Accessibility, label: 'Senior Care', service: 'senior' },
];

const areas = [
  { img: 'app-back', region: 'back' as const },
  { img: 'app-knee', region: 'knee' as const },
  { img: 'app-shoulder', region: 'shoulder' as const },
  { img: 'app-neck', region: 'neck' as const },
];

function HomeTab({ onBook, onService, onTab }: { onBook: () => void; onService: (id: string) => void; onTab: (t: Tab) => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="pb-6">
      {/* Hero */}
      <section className="relative min-h-[440px] overflow-hidden">
        <motion.div className="absolute -right-20 top-0 h-[460px] w-[330px]" initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1, ease }}>
          <Photo name="app-hero" widths={[800, 1600]} priority sizes="330px" alt="A translucent anatomical figure running, with glowing joints." imgClassName="h-full w-full object-cover object-[60%_center]" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${NAVY} 0%, transparent 38%), linear-gradient(0deg, ${NAVY} 0%, transparent 25%)` }} aria-hidden="true" />
        </motion.div>
        <div className="relative px-5 pt-8">
          <motion.h1 className="font-hero text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] [text-shadow:0_2px_18px_rgba(11,30,74,.6)]" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            <span className="block text-white">Move</span>
            <span className="block text-white">Better.</span>
            <span className="block bg-gradient-to-r from-[#9CC2FF] to-[#5FA3FF] bg-clip-text text-transparent">Live Better.</span>
          </motion.h1>
          <motion.p className="mt-4 max-w-[190px] text-[15px] font-medium leading-snug text-white/85" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Personalised physiotherapy for an active, comfortable life.
          </motion.p>
          <motion.button
            type="button"
            onClick={onBook}
            className="font-hero mt-6 flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-5 text-[15px] font-bold text-[#0E1E3D] shadow-[0_12px_30px_-10px_rgba(0,0,0,.5)] active:scale-[.98]"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ease }}
          >
            Book Appointment <ArrowRight size={18} aria-hidden="true" />
          </motion.button>
          <a href={clinic.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="font-hero mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/80">
            <Star size={14} className="fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" /> {clinic.google.rating.toFixed(1)} on Google
          </a>
        </div>
      </section>

      {/* Quick actions + recovery card */}
      <div className="relative -mt-6 px-4">
        <Glass className="p-4">
          <ul className="grid grid-cols-4 gap-1">
            {quick.map(({ icon: Icon, label, service }) => (
              <li key={label}>
                <button type="button" onClick={() => onService(service)} className="flex w-full flex-col items-center gap-2 rounded-2xl py-1 active:bg-white/5">
                  <span className="grid size-[54px] place-items-center rounded-full border border-white/15 bg-gradient-to-b from-white/15 to-white/[0.04] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2)]">
                    <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="font-hero text-center text-[11.5px] font-semibold leading-tight text-white/90">{label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => onTab('services')} className="mt-4 flex w-full items-center overflow-hidden rounded-[20px] bg-gradient-to-r from-[#E8F0FF] to-[#CFE0FF] text-left">
            <span className="flex-1 py-4 pl-4 pr-2">
              <span className="font-hero block text-[17px] font-extrabold leading-tight text-[#0E1E3D]">
                Your Recovery
                <br />
                Our Priority
              </span>
              <span className="mt-1 block text-[12.5px] text-[#3B4A63]">Expert care. Advanced therapy.</span>
            </span>
            <span className="mr-2 grid size-9 shrink-0 place-items-center rounded-full bg-[#0E1E3D] text-white">
              <ChevronRight size={18} aria-hidden="true" />
            </span>
            <Photo name="svc-spine" sizes="140px" alt="" imgClassName="h-[104px] w-[130px] object-cover" />
          </button>
        </Glass>
      </div>

      {/* Where does it hurt */}
      <section className="mt-7" aria-labelledby="app-areas">
        <div className="flex items-end justify-between px-5">
          <h2 id="app-areas" className="font-hero text-lg font-bold text-white">Where does it hurt?</h2>
          <span className="text-[12px] text-white/50">Swipe →</span>
        </div>
        <ul className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {areas.map(({ img, region }) => {
            const r = regionById[region];
            return (
              <li key={region} className="w-[44%] shrink-0 snap-start">
                <Link to={`/services/${r.slug}`} className="group block overflow-hidden rounded-[22px] border border-white/10 bg-[#0E2456]">
                  <Photo name={img} widths={[800]} sizes="200px" alt={`Anatomical illustration of the ${r.label.toLowerCase()} with the painful area glowing.`} imgClassName="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="font-hero flex items-center justify-between px-3.5 py-3 text-[14px] font-bold text-white">
                    {r.label} pain <ChevronRight size={16} className="text-white/60" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Doctor */}
      <div className="mt-7 px-4">
        <button type="button" onClick={() => onTab('visit')} className="flex w-full items-center gap-4 rounded-[24px] border border-white/10 bg-white/[0.06] p-3 text-left">
          <Photo name="dr-avinash-govind" widths={[800]} sizes="90px" alt="" imgClassName="size-[72px] rounded-2xl object-cover object-[50%_30%]" />
          <span className="min-w-0 flex-1">
            <span className="font-hero block font-bold text-white">{clinic.doctor.name}</span>
            <span className="block text-[12.5px] leading-snug text-white/65">{clinic.doctor.qualifications.join(', ')}</span>
            <span className="mt-1 flex items-center gap-1 text-[12px] font-semibold text-[#8FB8FF]">
              <Star size={12} className="fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" /> {clinic.google.rating.toFixed(1)} · {clinic.ownerStatements.patientsTreated} patients
            </span>
          </span>
          <ChevronRight size={18} className="text-white/50" aria-hidden="true" />
        </button>
      </div>

      {/* Hours */}
      <div className="mt-3 grid grid-cols-2 gap-3 px-4">
        <a href={telHref} className="rounded-[22px] bg-[#2463EB] p-4 text-white">
          <Phone size={20} aria-hidden="true" />
          <span className="font-hero mt-3 block text-[15px] font-bold">Call clinic</span>
          <span className="block text-[12px] text-white/75">{clinic.phone.display}</span>
        </a>
        <button type="button" onClick={() => onTab('visit')} className="rounded-[22px] border border-white/10 bg-white/[0.06] p-4 text-left text-white">
          <Clock size={20} className="text-[#8FB8FF]" aria-hidden="true" />
          <span className="font-hero mt-3 block text-[15px] font-bold">{clinic.hours.summary}</span>
          <span className="block text-[12px] text-white/65">Kondhwa, Pune</span>
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ services */

function ServicesTab({ focus, onBook }: { focus: string | null; onBook: (concern: string) => void }) {
  const refs = useRef<Record<string, HTMLLIElement | null>>({});
  useEffect(() => {
    if (focus) refs.current[focus]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [focus]);
  return (
    <div className="pb-6">
      <TabTitle eyebrow="Our services" title="How we can help" />
      <ul className="mt-5 space-y-3 px-4">
        {services.map((s) => (
          <li key={s.id} ref={(el) => { refs.current[s.id] = el; }}>
            <article className={`overflow-hidden rounded-[24px] border bg-white/[0.06] transition-colors ${focus === s.id ? 'border-[#8FB8FF]' : 'border-white/10'}`}>
              <div className="flex gap-3 p-3">
                <Photo name={s.image} widths={[800]} sizes="110px" alt="" imgClassName="size-[92px] shrink-0 rounded-2xl object-cover" />
                <div className="min-w-0 py-0.5">
                  <h2 className="font-hero text-[16px] font-bold leading-tight text-white">{s.title}</h2>
                  <p className="mt-1 line-clamp-3 text-[12.5px] leading-snug text-white/65">{s.short}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
                <span className="truncate text-[12px] text-white/55">{s.points.join(' · ')}</span>
                <button type="button" onClick={() => onBook(s.title)} className="font-hero ml-3 shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-bold text-[#0E1E3D]">
                  Book
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ routine (saved on this device only) */

const routine = [
  { id: 'neck', name: 'Neck rotations', dose: '10 each side', tip: 'Turn slowly to look over each shoulder.' },
  { id: 'shoulder', name: 'Shoulder rolls', dose: '15 backwards', tip: 'Big, slow circles. Relax your jaw.' },
  { id: 'catcow', name: 'Cat–cow stretch', dose: '10 slow reps', tip: 'On hands and knees, gently arch and round the back.' },
  { id: 'bridge', name: 'Glute bridges', dose: '2 × 10', tip: 'Lift hips, squeeze, lower with control.' },
  { id: 'ankle', name: 'Ankle circles', dose: '10 each way', tip: 'Seated, draw circles with each foot.' },
];
const STORE = 'govind-app-routine';
const today = () => new Date().toISOString().slice(0, 10);

type RoutineStore = { day: string; done: string[]; history: string[] };
function loadRoutine(): RoutineStore {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE) ?? 'null') as RoutineStore | null;
    if (raw && raw.day === today()) return raw;
    return { day: today(), done: [], history: raw?.history ?? [] };
  } catch {
    return { day: today(), done: [], history: [] };
  }
}

function RoutineTab() {
  const gid = useId().replace(/:/g, '');
  const [state, setState] = useState<RoutineStore>(loadRoutine);
  const toggle = (id: string) => {
    setState((s) => {
      const done = s.done.includes(id) ? s.done.filter((x) => x !== id) : [...s.done, id];
      const complete = done.length === routine.length;
      const history = complete ? [...new Set([...s.history, s.day])] : s.history.filter((d) => d !== s.day);
      const next = { ...s, done, history };
      try {
        localStorage.setItem(STORE, JSON.stringify(next));
      } catch {
        /* storage unavailable: keep in memory */
      }
      return next;
    });
  };
  const streak = useMemo(() => {
    let n = 0;
    const d = new Date();
    if (!state.history.includes(today())) d.setDate(d.getDate() - 1);
    while (state.history.includes(d.toISOString().slice(0, 10))) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }, [state.history]);
  const pct = state.done.length / routine.length;
  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div className="pb-6">
      <TabTitle eyebrow="Daily routine" title="Keep moving, gently" />
      <div className="mt-5 px-4">
        <Glass className="flex items-center gap-5 p-5">
          <svg width="86" height="86" viewBox="0 0 86 86" role="img" aria-label={`${state.done.length} of ${routine.length} exercises done today`}>
            <circle cx="43" cy="43" r={R} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="8" />
            <circle cx="43" cy="43" r={R} fill="none" stroke={`url(#${gid})`} strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - pct)} transform="rotate(-90 43 43)" style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.16,1,.3,1)' }} />
            <defs>
              <linearGradient id={gid} x1="0" x2="1">
                <stop offset="0" stopColor="#5FA3FF" />
                <stop offset="1" stopColor="#25D3A6" />
              </linearGradient>
            </defs>
            <text x="43" y="49" textAnchor="middle" fill="#fff" style={{ font: '800 20px Manrope, sans-serif' }}>
              {state.done.length}/{routine.length}
            </text>
          </svg>
          <div>
            <p className="font-hero text-[17px] font-bold text-white">{pct === 1 ? 'Done for today!' : 'Today’s routine'}</p>
            <p className="mt-1 text-[13px] text-white/65">About 10 minutes · saved on this phone</p>
            <p className="font-hero mt-2 text-[13px] font-semibold text-[#8FB8FF]">
              {streak > 0 ? `🔥 ${streak}-day streak` : 'Complete all 5 to start a streak'}
            </p>
          </div>
        </Glass>
        <ul className="mt-4 space-y-2.5">
          {routine.map((ex) => {
            const done = state.done.includes(ex.id);
            return (
              <li key={ex.id}>
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={done}
                  onClick={() => toggle(ex.id)}
                  className={`flex w-full items-center gap-4 rounded-[22px] border p-4 text-left transition-colors ${done ? 'border-[#25D3A6]/40 bg-[#25D3A6]/10' : 'border-white/10 bg-white/[0.06]'}`}
                >
                  {done ? <CheckCircle2 size={26} className="shrink-0 text-[#25D3A6]" aria-hidden="true" /> : <Circle size={26} className="shrink-0 text-white/35" aria-hidden="true" />}
                  <span className="min-w-0 flex-1">
                    <span className={`font-hero block text-[15px] font-bold ${done ? 'text-white/60 line-through' : 'text-white'}`}>{ex.name}</span>
                    <span className="block text-[12.5px] text-white/55">{ex.tip}</span>
                  </span>
                  <span className="font-hero shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] font-semibold text-white/80">{ex.dose}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 flex gap-2 rounded-2xl bg-[#FFB547]/10 p-3.5 text-[12.5px] leading-snug text-[#FFD9A0]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          A general mobility routine. If you are being treated, follow the exercises your physiotherapist gave you, and stop if anything increases your pain.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ visit */

function VisitTab({ onBook }: { onBook: () => void }) {
  const a = clinic.address;
  return (
    <div className="pb-6">
      <TabTitle eyebrow="Visit the clinic" title="Tilekar Nagar, Kondhwa" />
      <div className="mt-5 px-4">
        <div className="overflow-hidden rounded-[24px]">
          <Photo name="clinic-reception" widths={[640, 1280]} sizes="380px" alt="The clinic’s reception and waiting area." imgClassName="aspect-[16/10] w-full object-cover" />
        </div>
        <Glass className="mt-3 divide-y divide-white/10">
          <p className="flex gap-3 p-4 text-[14px] leading-snug text-white/85">
            <MapPin size={19} className="mt-0.5 shrink-0 text-[#8FB8FF]" aria-hidden="true" />
            {a.line1}, {a.line2}, {a.locality}, {a.city} {a.postalCode}
          </p>
          <p className="flex gap-3 p-4 text-[14px] text-white/85">
            <Clock size={19} className="shrink-0 text-[#8FB8FF]" aria-hidden="true" /> {clinic.hours.summary}
            {!clinic.hours.confirmed && <span className="text-white/50">· call to confirm</span>}
          </p>
        </Glass>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <a href={telHref} className="font-hero flex flex-col items-center gap-1.5 rounded-[20px] bg-white/[0.08] py-3.5 text-[12.5px] font-bold text-white">
            <Phone size={20} aria-hidden="true" /> Call
          </a>
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-hero flex flex-col items-center gap-1.5 rounded-[20px] bg-white/[0.08] py-3.5 text-[12.5px] font-bold text-white">
            <MessageCircle size={20} className="text-[#25D366]" aria-hidden="true" /> WhatsApp
          </a>
          <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-hero flex flex-col items-center gap-1.5 rounded-[20px] bg-white/[0.08] py-3.5 text-[12.5px] font-bold text-white">
            <Navigation size={20} aria-hidden="true" /> Directions
          </a>
        </div>

        <h2 className="font-hero mt-7 text-lg font-bold text-white">Your physiotherapists</h2>
        <ul className="mt-3 space-y-2.5">
          <li className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.06] p-3">
            <Photo name="dr-avinash-govind" widths={[800]} sizes="80px" alt="" imgClassName="size-14 rounded-2xl object-cover object-[50%_30%]" />
            <span>
              <span className="font-hero block font-bold text-white">{clinic.doctor.name}</span>
              <span className="block text-[12.5px] text-white/65">{clinic.doctor.qualifications.join(', ')}</span>
            </span>
          </li>
          <li className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.06] p-3">
            <span className="font-hero grid size-14 place-items-center rounded-2xl bg-white/10 font-bold text-white" aria-hidden="true">PG</span>
            <span>
              <span className="font-hero block font-bold text-white">{clinic.coConsultant.name}</span>
              <span className="block text-[12.5px] text-white/65">{clinic.coConsultant.qualifications.join(', ')}</span>
            </span>
          </li>
        </ul>
        <button type="button" onClick={onBook} className="font-hero mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white font-bold text-[#0E1E3D]">
          <CalendarCheck size={18} aria-hidden="true" /> Book appointment
        </button>
        <Link to="/" className="font-hero mt-3 flex h-12 items-center justify-center gap-1.5 text-[14px] font-semibold text-white/70">
          Visit full website <ChevronRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ app shell */

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: LayoutGrid },
  { id: 'routine', label: 'Routine', icon: Dumbbell },
  { id: 'visit', label: 'Visit', icon: MapPin },
];

function AppShell({ framed }: { framed?: boolean }) {
  const [tab, setTab] = useState<Tab>(() => {
    const h = typeof window !== 'undefined' ? (window.location.hash.slice(1) as Tab) : 'home';
    return tabs.some((t) => t.id === h) ? h : 'home';
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [sheet, setSheet] = useState<{ open: boolean; preset?: string }>({ open: false });
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const go = (t: Tab) => {
    setTab(t);
    if (t !== 'services') setFocus(null);
    history.replaceState(null, '', t === 'home' ? '/app' : `/app#${t}`);
    scroller.current?.scrollTo({ top: 0 });
  };

  return (
    <div className="relative h-full w-full overflow-hidden text-white" style={{ background: `radial-gradient(120% 60% at 80% 0%, #17336F 0%, ${NAVY} 45%, #081536 100%)` }}>
      {/* App bar */}
      <header className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pb-3 ${framed ? 'pt-12' : 'pt-[max(14px,env(safe-area-inset-top))]'}`} style={{ background: `linear-gradient(${NAVY} 60%, transparent)` }}>
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${clinic.name}, website home`}>
          <span className="grid size-10 place-items-center rounded-xl bg-white">
            <img src="/img/logo-mark-104.png" alt="" width={44} height={38} className="h-7 w-auto" />
          </span>
          <span className="leading-tight">
            <span className="font-hero block text-[14px] font-bold">Dr. Avinash Govind</span>
            <span className="block text-[12px] text-white/70">Physiotherapy</span>
          </span>
        </Link>
        <a href={telHref} aria-label={`Call ${clinic.phone.display}`} className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.08]">
          <Phone size={19} aria-hidden="true" />
        </a>
      </header>

      {/* Scrolling content */}
      <div ref={scroller} className={`absolute inset-0 overflow-y-auto overscroll-contain pb-28 ${framed ? 'pt-[106px]' : 'pt-[calc(72px+env(safe-area-inset-top))]'} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={tab} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
            {tab === 'home' && (
              <HomeTab
                onBook={() => setSheet({ open: true })}
                onTab={go}
                onService={(id) => {
                  go('services');
                  setFocus(id);
                }}
              />
            )}
            {tab === 'services' && <ServicesTab focus={focus} onBook={(c) => setSheet({ open: true, preset: concerns.find((x) => c.toLowerCase().includes(x.split(' ')[0].toLowerCase())) ?? 'Other / not sure' })} />}
            {tab === 'routine' && <RoutineTab />}
            {tab === 'visit' && <VisitTab onBook={() => setSheet({ open: true })} />}
          </motion.main>
        </AnimatePresence>
      </div>

      {/* Tab bar */}
      <nav aria-label="App" className="absolute inset-x-0 bottom-0 z-30 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-6" style={{ background: `linear-gradient(transparent, ${NAVY} 45%)` }}>
        <ul className="grid grid-cols-4 rounded-[26px] border border-white/10 bg-[#0E2456]/90 px-1 py-1.5 shadow-[0_-10px_30px_rgba(0,0,0,.25)] backdrop-blur-xl">
          {tabs.map(({ id, label, icon: Icon }) => {
            const on = tab === id;
            return (
              <li key={id}>
                <button type="button" onClick={() => go(id)} aria-current={on ? 'page' : undefined} className={`font-hero flex w-full flex-col items-center gap-1 rounded-2xl py-2 text-[11.5px] font-semibold transition-colors ${on ? 'text-[#7FB2FF]' : 'text-white/60'}`}>
                  <Icon size={22} strokeWidth={on ? 2.3 : 1.8} aria-hidden="true" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <BookingSheet open={sheet.open} preset={sheet.preset} onClose={() => setSheet({ open: false })} />
    </div>
  );
}

/* ------------------------------------------------------------------ install prompt */

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

function useInstall() {
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const on = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    const done = () => setInstalled(true);
    window.addEventListener('beforeinstallprompt', on);
    window.addEventListener('appinstalled', done);
    if (window.matchMedia('(display-mode: standalone)').matches) setInstalled(true);
    return () => {
      window.removeEventListener('beforeinstallprompt', on);
      window.removeEventListener('appinstalled', done);
    };
  }, []);
  return { canPrompt: !!evt, installed, prompt: () => evt?.prompt() };
}

/* ------------------------------------------------------------------ page */

function useIsPhone() {
  const q = '(max-width: 767px)';
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return m;
}

export default function AppPage() {
  const install = useInstall();
  const phone = useIsPhone();
  useEffect(() => {
    if (!phone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phone]);
  useSeo({
    title: 'Govind’s Physiotherapy App | Book, routines & clinic info',
    description: 'The Govind’s Advanced Pain Management & Physiotherapy Centre app: book appointments on WhatsApp, explore services, follow a daily mobility routine and find the clinic. Add it to your home screen.',
    path: '/app',
    image: '/img/app-hero-1600.webp',
  });

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prev = meta?.content;
    if (meta) meta.content = NAVY;
    return () => {
      if (meta && prev) meta.content = prev;
    };
  }, []);

  return (
    <>
      {/* Phones: the app fills the screen */}
      {phone && (
        <div className="fixed inset-0 z-[70]">
          <AppShell />
        </div>
      )}

      {/* Larger screens: the app inside a phone, with install info */}
      {!phone && (
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F4F7FC] px-6 pb-16 pt-[120px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[640px] rounded-full bg-[#2463EB]/15 blur-[120px]" />
        <div className="relative mx-auto grid w-full max-w-[1180px] items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="font-hero inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1D4FD8] shadow-sm">
              <Store size={16} aria-hidden="true" /> The Govind’s app
            </p>
            <h1 className="font-hero mt-6 text-[clamp(2.6rem,4.4vw,4.4rem)] leading-[1.06] tracking-[-0.025em] text-[#0E1E3D]">
              <span className="block font-normal">Your clinic,</span>
              <span className="block font-extrabold">in your pocket.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#3B4A63]">
              Book appointments in seconds, explore our services, follow a gentle daily routine and find us easily. No app store needed: add it straight to your home screen.
            </p>
            <ul className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              {['Book on WhatsApp', 'Daily mobility routine', 'All our services', 'Call & directions'].map((f) => (
                <li key={f} className="font-hero flex items-center gap-2.5 font-semibold text-[#0E1E3D]">
                  <CheckCircle2 size={19} className="text-[#2463EB]" aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-[24px] bg-white p-6 shadow-[0_20px_44px_-34px_rgba(14,30,61,.5)]">
              {install.installed ? (
                <p className="font-hero flex items-center gap-2 font-bold text-[#22A06B]">
                  <CheckCircle2 size={20} aria-hidden="true" /> The app is installed on this device.
                </p>
              ) : install.canPrompt ? (
                <button type="button" onClick={install.prompt} className="font-nav inline-flex h-12 items-center gap-2 rounded-full bg-[#2463EB] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-white hover:bg-[#1D4FD8]">
                  <Download size={17} aria-hidden="true" /> Install the app
                </button>
              ) : (
                <>
                  <p className="font-hero font-bold text-[#0E1E3D]">How to install on your phone</p>
                  <ol className="mt-3 space-y-2 text-[15px] text-[#3B4A63]">
                    <li>
                      1. Open <span className="font-semibold text-[#0E1E3D]">{typeof window !== 'undefined' ? window.location.host : ''}/app</span> on your phone.
                    </li>
                    <li className="flex flex-wrap items-center gap-1">
                      2. iPhone: tap <Share size={15} className="inline" aria-label="Share" /> then <span className="font-semibold text-[#0E1E3D]">Add to Home Screen</span>.
                    </li>
                    <li>
                      3. Android: tap the menu <span className="font-semibold text-[#0E1E3D]">⋮</span> then <span className="font-semibold text-[#0E1E3D]">Install app</span>.
                    </li>
                  </ol>
                </>
              )}
            </div>
          </div>

          {/* Phone frame */}
          <div className="relative mx-auto">
            <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[#2463EB]/20 blur-3xl" />
            <div className="relative h-[min(800px,calc(100svh-150px))] min-h-[640px] w-[392px] rounded-[58px] bg-[#0B1730] p-[12px] shadow-[0_50px_100px_-40px_rgba(14,30,61,.7),inset_0_0_0_2px_#26365A]">
              <div className="relative h-full w-full overflow-hidden rounded-[46px]">
                <AppShell framed />
                <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
}
