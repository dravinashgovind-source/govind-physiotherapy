import { useEffect, useRef, useState, type ReactNode, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Accessibility,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
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
  Activity,
  MoveVertical,
  CalendarCheck,
  Stethoscope,
  Play,
  Pause,
  ArrowUpRight,
  BadgeCheck,
  HandHeart,
} from 'lucide-react';
import { Photo } from '../components/Photo';
import { Logo } from '../components/Logo';
import { ReliefMap } from '../components/ReliefMap';
import { clinic, telHref, whatsappHref } from '../config/clinic';
import { services } from '../content/services';
import { regionById } from '../content/regions';
import { googleReviews, videos, youtubeChannel } from '../content/media';
import { GoogleG } from '../components/GoogleG';
import { BookingForm, concerns } from '../components/BookingForm';
import { useSeo } from '../lib/seo';

const NAVY = '#0B1E4A';
const ease = [0.16, 1, 0.3, 1] as const;
type Tab = 'home' | 'services' | 'appointment' | 'visit';

/* ------------------------------------------------------------------ booking sheet */

function BookingSheet({ open, onClose, preset }: { open: boolean; onClose: () => void; preset?: string }) {
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
            <div className="mb-5 mt-4 flex items-center justify-between">
              <h2 className="font-hero text-xl font-extrabold text-[#0E1E3D]">Book appointment</h2>
              <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 place-items-center rounded-full bg-[#F4F7FC] text-[#0E1E3D]">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <BookingForm key={preset ?? 'none'} preset={preset} formLabel="App booking form" />
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

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // Respect reduced motion and data-saver: show the still frame; the visitor can still press play.
  const autoplay = !reduce && !(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

  useEffect(() => {
    const v = ref.current;
    if (!v || !autoplay) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [autoplay]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ WebkitMaskImage: 'linear-gradient(180deg, #000 62%, transparent 100%)', maskImage: 'linear-gradient(180deg, #000 62%, transparent 100%)' }}
      >
        <video
          ref={ref}
          className="h-full w-full object-cover object-center"
          src="/video/clinic-tour.mp4"
          poster="/video/clinic-tour-poster.webp"
          muted
          loop
          playsInline
          preload={autoplay ? 'auto' : 'none'}
          aria-label="A walkthrough of Govind’s clinic: reception, consultation room, treatment and the therapy hall."
        />
        {/* Shade: top for the app bar, left/bottom for the text, and a seamless fade into the app background */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(11,30,74,.75) 0%, rgba(11,30,74,0) 22%), linear-gradient(0deg, rgba(11,30,74,.9) 0%, rgba(11,30,74,.82) 30%, rgba(11,30,74,.3) 58%, rgba(11,30,74,.05) 78%)',
          }}
        />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause clinic video' : 'Play clinic video'}
        className="absolute right-4 top-[calc(var(--app-top)+10px)] z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-[#0B1E4A]/45 text-white backdrop-blur"
      >
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} className="ml-0.5" aria-hidden="true" />}
      </button>
    </>
  );
}

function HomeTab({ onBook, onService, onTab }: { onBook: (concern?: string) => void; onService: (id: string) => void; onTab: (t: Tab) => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="pb-6">
      {/* Hero: clinic walkthrough video, full-bleed behind the app bar */}
      <section className="relative flex min-h-[600px] flex-col justify-end" style={{ marginTop: 'calc(-1 * var(--app-top))', paddingTop: 'var(--app-top)' }}>
        <HeroVideo />
        <div className="relative px-5 pb-14">
          <motion.p className="font-hero inline-flex items-center gap-1.5 rounded-full bg-white/12 px-3 py-1.5 text-[12px] font-semibold text-white backdrop-blur" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <MapPin size={13} aria-hidden="true" /> Tilekar Nagar, Kondhwa
          </motion.p>
          <motion.h1 className="font-hero mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] [text-shadow:0_2px_20px_rgba(6,16,40,.55)]" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
            <span className="block text-white">Move Better.</span>
            <span className="block bg-gradient-to-r from-[#A9CBFF] to-[#6AAAFF] bg-clip-text text-transparent">Live Better.</span>
          </motion.h1>
          <motion.p className="mt-3 max-w-[290px] text-[15px] font-medium leading-snug text-white/90" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Personalised physiotherapy for an active, comfortable life.
          </motion.p>
          <motion.div className="mt-6 flex items-center gap-4" initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, ease }}>
            <button type="button" onClick={() => onBook()} className="font-hero flex h-12 items-center gap-3 rounded-full bg-white pl-6 pr-5 text-[15px] font-bold text-[#0E1E3D] shadow-[0_12px_30px_-10px_rgba(0,0,0,.5)] active:scale-[.98]">
              Book Appointment <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a href={clinic.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85">
              <Star size={14} className="fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" /> {clinic.google.rating.toFixed(1)} Google
            </a>
          </motion.div>
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
          <button type="button" onClick={() => onTab('services')} className="mt-4 flex w-full items-center gap-3 rounded-[22px] bg-gradient-to-r from-[#EEF4FF] to-[#D6E5FF] p-2 text-left shadow-[0_10px_24px_-14px_rgba(0,0,0,.5)] active:scale-[.99]">
            <span className="min-w-0 flex-1 py-2 pl-3">
              <span className="font-hero block text-[17px] font-extrabold leading-tight text-[#0E1E3D]">
                Your Recovery
                <br />
                Our Priority
              </span>
              <span className="mt-1.5 block text-[12.5px] leading-snug text-[#3B4A63]">Expert care. Advanced therapy.</span>
            </span>
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#0E1E3D] text-white">
              <ChevronRight size={18} aria-hidden="true" />
            </span>
            <span className="block h-[96px] w-[118px] shrink-0 overflow-hidden rounded-[16px]">
              <Photo name="svc-spine" sizes="130px" alt="" imgClassName="h-full w-full object-cover object-[35%_center]" />
            </span>
          </button>
        </Glass>
      </div>

      <Banners onBook={() => onBook()} onTab={onTab} />

      <ReliefMap onBook={onBook} />

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

      <VideosRow />
      <ReviewsRow />

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

/* ------------------------------------------------------------------ campaign banners */

const TEAL = '#2DE0CF';

function useSlider(count: number) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector('li');
    const w = (card?.clientWidth ?? el.clientWidth) + 12;
    setIndex(Math.max(0, Math.min(count - 1, Math.round(el.scrollLeft / w))));
  };
  const go = (i: number) => {
    const el = ref.current;
    const card = el?.querySelectorAll('li')[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 20, behavior: 'smooth' });
  };
  return { ref, index, onScroll, go };
}

function Dots({ count, index, go, label }: { count: number; index: number; go: (i: number) => void; label: string }) {
  return (
    <div className="mt-3 flex justify-center gap-0.5" role="tablist" aria-label={label}>
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} type="button" role="tab" aria-selected={i === index} aria-label={`Slide ${i + 1} of ${count}`} onClick={() => go(i)} className="grid h-8 w-6 place-items-center">
          <span className="block h-1.5 rounded-full transition-all duration-300" style={{ width: i === index ? 20 : 6, background: i === index ? TEAL : 'rgba(255,255,255,.3)' }} />
        </button>
      ))}
    </div>
  );
}

function Pill({ children, onClick, light }: { children: ReactNode; onClick: () => void; light?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`font-hero inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[13px] font-bold shadow-[0_8px_20px_-8px_rgba(45,224,207,.7)] active:scale-[.98] ${light ? 'bg-[#0E1E3D] text-white' : 'text-[#062226]'}`} style={light ? undefined : { background: TEAL }}>
      {children} <ArrowRight size={15} aria-hidden="true" />
    </button>
  );
}

function Banners({ onBook, onTab }: { onBook: () => void; onTab: (t: Tab) => void }) {
  const slider = useSlider(5);
  const card = 'relative h-[372px] overflow-hidden rounded-[28px]';
  const img = 'absolute inset-0 h-full w-full object-cover';
  const display = 'display leading-[0.92] tracking-[0.005em]';
  return (
    <section className="mt-7" aria-labelledby="app-banners">
      <div className="flex items-end justify-between px-5">
        <h2 id="app-banners" className="font-hero text-lg font-bold text-white">Physiotherapy at Govind’s</h2>
        <span className="text-[12px] text-white/50">Swipe →</span>
      </div>
      <ul ref={slider.ref} onScroll={slider.onScroll} className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* 01 Manual therapy (dark, oversized background word) */}
        <li className="w-[88%] shrink-0 snap-start">
          <article className={`${card} bg-[#07121F]`}>
            <Photo name="svc-spine" sizes="360px" alt="A physiotherapist giving hands-on treatment to a patient’s lower back." imgClassName={`${img} object-[48%_center]`} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(7,18,31,.96) 0%, rgba(7,18,31,.78) 44%, rgba(7,18,31,.1) 80%), linear-gradient(0deg, rgba(7,18,31,.92) 0%, transparent 38%)' }} />
            <p aria-hidden="true" className="display absolute -left-2 top-3 select-none text-[104px] leading-none text-white/[0.06]">THERAPY</p>
            <div className="relative flex h-full flex-col p-5">
              <p className="font-hero flex items-center gap-1 self-end text-[11px] font-semibold text-white/75">
                <MapPin size={12} aria-hidden="true" /> Kondhwa, Pune
              </p>
              <h3 className={`${display} mt-6 text-[38px] text-white [text-shadow:0_2px_16px_rgba(7,18,31,.8)]`}>
                Hands-on
                <br />
                care.
                <br />
                <span style={{ color: TEAL }}>Real relief.</span>
              </h3>
              <p className="mt-3 max-w-[210px] text-[13px] leading-snug text-white/80">Manual therapy and joint mobilisation by experienced physiotherapists.</p>
              <div className="mt-auto flex items-end justify-between">
                <Pill onClick={() => onTab('services')}>Our services</Pill>
                <span className="font-hero text-[9px] font-semibold tracking-[0.25em]" style={{ color: TEAL }}>MANUAL THERAPY</span>
              </div>
            </div>
          </article>
        </li>

        {/* 02 Split screen: spine & back pain */}
        <li className="w-[88%] shrink-0 snap-start">
          <article className={`${card}`} style={{ background: NAVY }}>
            <div
              className="absolute -right-16 top-0 h-full w-[80%]"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse 58% 62% at 50% 50%, #000 50%, transparent 86%)', maskImage: 'radial-gradient(ellipse 58% 62% at 50% 50%, #000 50%, transparent 86%)' }}
            >
              <Photo name="app-back" widths={[800]} sizes="320px" alt="An anatomical view of the back with the lower spine glowing to show pain." imgClassName="h-full w-full object-cover" />
            </div>
            <ol className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-3.5" aria-label="How we treat back pain">
              {['Assess', 'Relieve', 'Strengthen', 'Prevent'].map((t, i) => (
                <li key={t} className="font-hero flex items-center gap-2 rounded-full bg-[#0B1E4A]/60 py-0.5 pr-2 text-[11px] font-semibold text-white/90 backdrop-blur">
                  <span className="grid size-4 place-items-center rounded-full border" style={{ borderColor: TEAL }}>
                    {i === 0 && <span className="size-2 rounded-full" style={{ background: TEAL }} />}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="relative flex h-full max-w-[56%] flex-col p-5">
              <h3 className={`${display} mt-8 text-[34px] text-white [text-shadow:0_2px_14px_rgba(11,30,74,.9)]`}>
                Back pain?
                <br />
                <span style={{ color: TEAL }}>Find the cause.</span>
              </h3>
              <p className="mt-3 text-[13px] leading-snug text-white/85 [text-shadow:0_1px_10px_rgba(11,30,74,.95)]">Spine care for back pain, slip disc and sciatica.</p>
              <div className="mt-auto">
                <Pill onClick={onBook}>Book assessment</Pill>
                <p className="mt-3 text-[11px] text-white/55">Spine care · Pain management</p>
              </div>
            </div>
          </article>
        </li>

        {/* 03 Post-surgery rehabilitation (photo-led) */}
        <li className="w-[88%] shrink-0 snap-start">
          <article className={`${card} bg-[#DCE6EE]`}>
            <Photo name="svc-postop" sizes="360px" alt="An older woman doing a guided knee exercise after knee replacement with a physiotherapist." imgClassName={`${img} object-[40%_center]`} />
            <p aria-hidden="true" className="display absolute -right-3 top-2 select-none text-[112px] leading-none text-white/25">REHAB</p>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 28%, rgba(8,24,44,.55) 52%, rgba(8,24,44,.95) 100%)' }} />
            <div className="relative flex h-full flex-col justify-end p-5">
              <p className="font-hero text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>Post-surgery rehab</p>
              <h3 className="font-hero mt-1 text-[24px] font-extrabold uppercase leading-[1.05] text-white">
                After surgery,
                <br />
                <span style={{ color: TEAL }}>back on your feet.</span>
              </h3>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] font-semibold text-white/90">
                {['Knee & hip replacement', 'Fractures', 'Ligament repair'].map((t) => (
                  <li key={t} className="flex items-center gap-1">
                    <CheckCircle2 size={13} style={{ color: TEAL }} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Pill onClick={() => onTab('appointment')}>Start your rehab</Pill>
              </div>
            </div>
          </article>
        </li>

        {/* 04 Advanced pain management (clinical) */}
        <li className="w-[88%] shrink-0 snap-start">
          <article className={`${card} bg-[#081736]`}>
            <Photo name="svc-pain" sizes="360px" alt="A physiotherapist giving ultrasound therapy to a patient’s shoulder." imgClassName={`${img} object-[68%_center]`} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(8,23,54,.97) 0%, rgba(8,23,54,.86) 48%, rgba(8,23,54,.2) 85%), linear-gradient(0deg, rgba(8,23,54,.9) 0%, transparent 40%)' }} />
            <ul className="absolute right-3 top-5 space-y-2.5" aria-label="Pain-relief therapies">
              {[
                { i: Zap, t: 'Laser therapy' },
                { i: Activity, t: 'Ultrasound' },
                { i: MoveVertical, t: 'Traction' },
                { i: HandHeart, t: 'Manual therapy' },
              ].map(({ i: Icon, t }) => (
                <li key={t} className="font-hero flex items-center gap-1.5 rounded-full bg-[#0B1E4A]/75 py-1 pl-1 pr-2.5 text-[10.5px] font-semibold text-white backdrop-blur">
                  <span className="grid size-6 place-items-center rounded-full border border-white/25">
                    <Icon size={12} aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="relative flex h-full max-w-[60%] flex-col p-5">
              <h3 className={`${display} mt-10 text-[34px] text-white`}>
                Advanced
                <br />
                pain
                <br />
                <span style={{ color: TEAL }}>relief.</span>
              </h3>
              <p className="mt-3 text-[13px] leading-snug text-white/80">Non-surgical pain management with modern therapy equipment.</p>
              <div className="mt-auto">
                <Pill onClick={onBook}>Book assessment</Pill>
              </div>
            </div>
          </article>
        </li>

        {/* 05 Minimal & bold: assessment first */}
        <li className="w-[88%] shrink-0 snap-start">
          <article className={`${card} bg-[#EEF2F6]`}>
            <Photo name="approach-assess" sizes="360px" alt="A physiotherapist measuring a patient’s knee movement with a goniometer." imgClassName={`${img} object-[70%_30%]`} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(240,243,246,.95) 0%, rgba(240,243,246,.7) 50%, rgba(240,243,246,0) 82%)' }} />
            <div className="relative flex h-full flex-col p-5">
              <p className="font-hero flex items-center gap-1 self-end text-[11px] font-semibold text-[#0E1E3D]/70">
                <MapPin size={12} aria-hidden="true" /> Kondhwa, Pune
              </p>
              <p className="font-hero mt-8 text-[15px] font-extrabold tracking-[0.5em] text-[#0E1E3D]">ASSESS</p>
              <h3 className="display mt-1 text-[54px] leading-[0.9] text-[#0E1E3D]">First.</h3>
              <p className="font-hero mt-1 text-[15px] font-extrabold tracking-[0.3em]" style={{ color: '#0FB5A5' }}>
                THEN TREAT.
              </p>
              <p className="mt-3 max-w-[200px] text-[13px] leading-snug text-[#3B4A63]">Every plan starts with a one-to-one physiotherapy assessment.</p>
              <div className="mt-auto">
                <Pill onClick={onBook} light>
                  Book an appointment
                </Pill>
              </div>
            </div>
          </article>
        </li>
      </ul>
      <Dots count={5} index={slider.index} go={slider.go} label="Banners" />
    </section>
  );
}

/* ------------------------------------------------------------------ videos & reviews */

function AppVideo({ id, label, topic, title }: { id: string; label: string; topic: string; title: string }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.06]">
      <div className="relative aspect-video bg-black">
        {play ? (
          <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="absolute inset-0" aria-label={`Play video: ${title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#E62117] shadow-lg">
              <Play size={20} className="ml-0.5 fill-current" aria-hidden="true" />
            </span>
          </button>
        )}
      </div>
      <div className="p-3.5">
        <p className="font-hero text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8FB8FF]">{topic}</p>
        <p className="font-hero mt-0.5 text-[14.5px] font-bold leading-snug text-white">{label}</p>
      </div>
    </div>
  );
}

function VideosRow() {
  const slider = useSlider(videos.length);
  return (
    <section className="mt-8" aria-labelledby="app-videos">
      <div className="flex items-end justify-between px-5">
        <h2 id="app-videos" className="font-hero text-lg font-bold text-white">Patient stories</h2>
        <a href={youtubeChannel} target="_blank" rel="noopener noreferrer" className="font-hero flex items-center gap-1 py-2 text-[13px] font-semibold text-[#8FB8FF]">
          YouTube <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <ul ref={slider.ref} onScroll={slider.onScroll} className="mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {videos.map((v) => (
          <li key={v.id} className="w-[80%] shrink-0 snap-start">
            <AppVideo {...v} />
          </li>
        ))}
      </ul>
      <Dots count={videos.length} index={slider.index} go={slider.go} label="Videos" />
    </section>
  );
}

function ReviewsRow() {
  const slider = useSlider(googleReviews.length);
  return (
    <section className="mt-6" aria-labelledby="app-reviews">
      <div className="flex items-center justify-between px-5">
        <h2 id="app-reviews" className="font-hero text-lg font-bold text-white">What patients say</h2>
        <a href={clinic.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="font-hero flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-bold text-[#0E1E3D]">
          <GoogleG size={14} /> {clinic.google.rating.toFixed(1)}
          <Star size={12} className="fill-[#FBBC04] text-[#FBBC04]" aria-hidden="true" />
        </a>
      </div>
      <ul ref={slider.ref} onScroll={slider.onScroll} className="mt-3 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {googleReviews.map((r) => (
          <li key={r.name} className="w-[82%] shrink-0 snap-start">
            <figure className="flex h-full flex-col rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
              <span className="flex gap-0.5 text-[#FBBC04]" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={13} className="fill-current" strokeWidth={0} aria-hidden="true" />
                ))}
              </span>
              <blockquote className="mt-2.5 line-clamp-6 flex-1 text-[13.5px] leading-relaxed text-white/85">“{r.text}”</blockquote>
              <figcaption className="mt-3 flex items-center gap-1.5 border-t border-white/10 pt-3">
                <span className="font-hero text-[13.5px] font-bold text-white">{r.name}</span>
                {r.localGuide && <BadgeCheck size={14} className="text-[#8FB8FF]" aria-label="Google Local Guide" />}
                <span className="ml-auto text-[11px] text-white/50">{r.when}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Dots count={googleReviews.length} index={slider.index} go={slider.go} label="Reviews" />
      <a href={clinic.google.reviewsUrl} target="_blank" rel="noopener noreferrer" className="font-hero mx-5 mt-1 flex h-11 items-center justify-center gap-1.5 rounded-full border border-white/15 text-[13.5px] font-semibold text-white">
        Read all reviews on Google <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </section>
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

/* ------------------------------------------------------------------ appointment */

const firstVisit = [
  { icon: MessageCircle, t: 'Send your request', d: 'Fill the form below. It opens WhatsApp with your details ready.' },
  { icon: Phone, t: 'We confirm a time', d: 'The clinic replies to fix a slot that suits you.' },
  { icon: Stethoscope, t: 'Your assessment', d: 'A one-to-one check of your movement, strength and pain.' },
  { icon: CalendarCheck, t: 'Your plan starts', d: 'Treatment usually begins on the same day.' },
];

function AppointmentTab() {
  return (
    <div className="pb-6">
      <TabTitle eyebrow="Appointment" title="Book your visit" />
      <div className="mt-5 grid grid-cols-2 gap-3 px-4">
        <a href={telHref} className="rounded-[22px] bg-[#2463EB] p-4 text-white">
          <Phone size={20} aria-hidden="true" />
          <span className="font-hero mt-3 block text-[15px] font-bold">Call now</span>
          <span className="block text-[12px] text-white/75">{clinic.phone.display}</span>
        </a>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="rounded-[22px] bg-[#25D366] p-4 text-white">
          <MessageCircle size={20} aria-hidden="true" />
          <span className="font-hero mt-3 block text-[15px] font-bold">WhatsApp</span>
          <span className="block text-[12px] text-white/85">Chat with the clinic</span>
        </a>
      </div>
      <div className="mt-4 px-4">
        <div className="rounded-[26px] bg-white p-5 shadow-[0_20px_40px_-24px_rgba(0,0,0,.6)]">
          <h2 className="font-hero text-lg font-extrabold text-[#0E1E3D]">Request an appointment</h2>
          <p className="mb-5 mt-1 text-[13.5px] text-[#3B4A63]">Takes less than a minute.</p>
          <BookingForm formLabel="Appointment tab booking form" />
        </div>
      </div>
      <section className="mt-7 px-4" aria-labelledby="first-visit">
        <h2 id="first-visit" className="font-hero px-1 text-lg font-bold text-white">What happens next</h2>
        <ol className="mt-3 space-y-2.5">
          {firstVisit.map(({ icon: Icon, t, d }, i) => (
            <li key={t} className="flex gap-3.5 rounded-[22px] border border-white/10 bg-white/[0.06] p-4">
              <span className="font-hero grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#8FB8FF]">
                <Icon size={19} aria-hidden="true" />
              </span>
              <span>
                <span className="font-hero block text-[15px] font-bold text-white">
                  <span className="text-[#8FB8FF]">0{i + 1}</span> {t}
                </span>
                <span className="block text-[12.5px] leading-snug text-white/65">{d}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-2 px-1 text-[13px] text-white/60">
          <Clock size={15} aria-hidden="true" /> Open {clinic.hours.summary} · bring any reports or scans
        </p>
      </section>
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
  { id: 'appointment', label: 'Appointment', icon: CalendarCheck },
  { id: 'visit', label: 'Visit', icon: MapPin },
];

function AppShell({ framed }: { framed?: boolean }) {
  const [tab, setTab] = useState<Tab>('home');
  // Open the tab named in the URL hash (e.g. /app#appointment) after hydration.
  useEffect(() => {
    const h = window.location.hash.slice(1) as Tab;
    if (h !== 'home' && tabs.some((t) => t.id === h)) setTab(h);
  }, []);
  const [focus, setFocus] = useState<string | null>(null);
  const [sheet, setSheet] = useState<{ open: boolean; preset?: string }>({ open: false });
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  const go = (t: Tab) => {
    setTab(t);
    if (t !== 'services') setFocus(null);
    history.replaceState(null, '', t === 'home' ? '/app' : `/app#${t}`);
    scroller.current?.scrollTo({ top: 0 });
    setScrolled(false);
  };

  return (
    <div className="relative h-full w-full overflow-hidden text-white" style={{ background: `radial-gradient(120% 60% at 80% 0%, #17336F 0%, ${NAVY} 45%, #081536 100%)` }}>
      {/* App bar */}
      <header className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-2 px-3 pb-3 ${framed ? 'pt-12' : 'pt-[max(14px,env(safe-area-inset-top))]'}`} style={{ background: scrolled ? 'rgba(11,30,74,.82)' : 'transparent', backdropFilter: scrolled ? 'blur(14px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none', transition: 'background .3s' }}>
        <Link to="/" className="flex h-[54px] items-center rounded-full bg-white pl-3 pr-4 shadow-[0_8px_24px_-12px_rgba(0,0,0,.45)]" aria-label={`${clinic.name}, website home`}>
          <Logo />
        </Link>
        <a href={telHref} aria-label={`Call ${clinic.phone.display}`} className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.08]">
          <Phone size={19} aria-hidden="true" />
        </a>
      </header>

      {/* Scrolling content */}
      <div ref={scroller} style={{ ['--app-top' as string]: framed ? '106px' : 'calc(72px + env(safe-area-inset-top))' }} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)} className={`absolute inset-0 overflow-x-hidden overflow-y-auto overscroll-contain pb-28 ${framed ? 'pt-[106px]' : 'pt-[calc(72px+env(safe-area-inset-top))]'} [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={tab} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0 }} transition={{ duration: 0.25 }}>
            {tab === 'home' && (
              <HomeTab
                onBook={(concern) => setSheet({ open: true, preset: concern })}
                onTab={go}
                onService={(id) => {
                  go('services');
                  setFocus(id);
                }}
              />
            )}
            {tab === 'services' && <ServicesTab focus={focus} onBook={(c) => setSheet({ open: true, preset: concerns.find((x) => c.toLowerCase().includes(x.split(' ')[0].toLowerCase())) ?? 'Other / not sure' })} />}
            {tab === 'appointment' && <AppointmentTab />}
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

const PHONE_QUERY = '(max-width: 767px)';
const subscribePhone = (cb: () => void) => {
  const mq = window.matchMedia(PHONE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

/** Prerendered HTML is the desktop view; phones switch to the full-screen app right after hydration. */
function useIsPhone() {
  return useSyncExternalStore(subscribePhone, () => window.matchMedia(PHONE_QUERY).matches, () => false);
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
  useSeo('/app');

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
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#F4F7FC] px-6 pb-16 pt-[120px] max-md:hidden">
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
              Book appointments in seconds, explore our services, watch real patient stories and find us easily. No app store needed: add it straight to your home screen.
            </p>
            <ul className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              {['Book on WhatsApp', 'Patient videos & reviews', 'All our services', 'Call & directions'].map((f) => (
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
                      1. Open <span className="font-semibold text-[#0E1E3D]">{clinic.siteUrl.replace(/^https?:\/\//, '')}/app</span> on your phone.
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
