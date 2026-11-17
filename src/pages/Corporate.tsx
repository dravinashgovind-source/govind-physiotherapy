import { useId, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AlertCircle,
  ArrowRight,
  Armchair,
  BarChart3,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  HeartHandshake,
  Laptop,
  MessageCircle,
  Presentation,
  Smile,
  Stethoscope,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { SectionHeading, btnPrimary } from '../components/SectionHeading';
import { clinic, whatsappHref } from '../config/clinic';
import { isValidIndianMobile, openWhatsApp } from '../sections/FinalCta';
import { useSeo } from '../lib/seo';

const ease = [0.16, 1, 0.3, 1] as const;

/** Programme content. Confirm offerings and formats with the clinic. */
const issues = [
  { icon: Laptop, title: 'Desk-bound work', text: 'Long hours at screens lead to neck, shoulder and lower-back pain.' },
  { icon: Armchair, title: 'Poor workstation set-up', text: 'Chair, desk and screen heights that don’t fit the person doing the work.' },
  { icon: TrendingUp, title: 'Lost productivity', text: 'Pain affects focus, energy and attendance long before anyone takes leave.' },
];

const programmes = [
  { icon: Stethoscope, title: 'On-site Physio Camps', text: 'Our physiotherapists visit your office for one-to-one screening and quick advice for every employee.', points: ['Posture & spine screening', 'Individual advice'] },
  { icon: Armchair, title: 'Ergonomic Assessments', text: 'Workstation checks with practical fixes for chairs, desks, screens and laptops, including for work-from-home.', points: ['Desk & chair set-up', 'WFH guidance'] },
  { icon: Presentation, title: 'Wellness Workshops', text: 'Engaging sessions on back care, desk stretches, safe lifting and staying active at work.', points: ['Back & neck care', 'Desk stretch routines'] },
  { icon: HeartHandshake, title: 'Employee Care Plans', text: 'Priority appointments and structured treatment at our Kondhwa clinic for employees who need it.', points: ['Priority booking', 'Clinic treatment'] },
];

const steps = [
  { icon: ClipboardList, title: 'Discuss', text: 'We understand your team, work style and goals.' },
  { icon: CalendarCheck, title: 'Plan', text: 'A programme and schedule that fits your office.' },
  { icon: Users, title: 'Deliver', text: 'Camps, assessments and workshops at your workplace.' },
  { icon: BarChart3, title: 'Review', text: 'Summary of common issues and recommended next steps.' },
];

const benefits = [
  { icon: Smile, title: 'Happier, healthier teams', text: 'Employees feel cared for and learn habits that protect their health.' },
  { icon: TrendingUp, title: 'Better focus at work', text: 'Less day-to-day discomfort means fewer distractions.' },
  { icon: Building2, title: 'A stronger workplace culture', text: 'Show your team that wellbeing is part of how you work.' },
];

type Fields = { company: string; name: string; phone: string; size: string; interest: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

function EnquiryForm() {
  const [f, setF] = useState<Fields>({ company: '', name: '', phone: '', size: '', interest: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<null | { ok: boolean; href: string }>(null);
  const id = useId();
  const set = (k: keyof Fields, v: string) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const er: Errors = {};
    if (f.company.trim().length < 2) er.company = 'Please enter your company name.';
    if (f.name.trim().length < 2) er.name = 'Please enter your name.';
    if (!isValidIndianMobile(f.phone)) er.phone = 'Please enter a valid 10-digit mobile number.';
    if (!f.size) er.size = 'Please choose your team size.';
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const msg = [
      'Hello, we are interested in your Corporate Wellness Programme.',
      '',
      `Company: ${f.company.trim()}`,
      `Contact: ${f.name.trim()}`,
      `Phone: ${f.phone.trim()}`,
      `Team size: ${f.size}`,
      f.interest && `Interested in: ${f.interest}`,
      f.message.trim() && `Note: ${f.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    const href = whatsappHref(msg);
    setDone({ ok: openWhatsApp(href), href });
  };

  const input =
    'mt-2 w-full rounded-2xl border bg-[#F8FAFD] px-4 py-3.5 text-[#0E1E3D] placeholder:text-[#9AA6BA] focus:border-[#2463EB] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#2463EB]/15';
  const lab = 'font-hero text-sm font-semibold text-[#0E1E3D]';
  const b = (k: keyof Fields) => (errors[k] ? 'border-[#D93B2B]' : 'border-[#E1E7F0]');
  const a = (k: keyof Fields) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `${id}-${k}-e` : undefined });
  const er = (k: keyof Fields) =>
    errors[k] && (
      <p id={`${id}-${k}-e`} className="mt-1.5 flex items-center gap-1.5 text-sm text-[#D93B2B]">
        <AlertCircle size={15} aria-hidden="true" /> {errors[k]}
      </p>
    );

  if (done) {
    return (
      <div role="status" className="py-6">
        <CheckCircle2 size={44} className={done.ok ? 'text-[#22A06B]' : 'text-[#D93B2B]'} aria-hidden="true" />
        <h3 className="font-hero mt-5 text-3xl font-extrabold text-[#0E1E3D]">{done.ok ? 'Almost done!' : 'WhatsApp didn’t open.'}</h3>
        <p className="mt-3 max-w-md text-[#3B4A63]">
          {done.ok ? 'Your enquiry is ready in WhatsApp. Press send and our team will get in touch to plan a programme for your company.' : 'Your browser may have blocked the window. Use the button below to send your enquiry.'}
        </p>
        <a href={done.href} target="_blank" rel="noopener noreferrer" className="font-hero mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[#25D366] px-6 font-bold text-white">
          <MessageCircle size={18} aria-hidden="true" /> Open WhatsApp message
        </a>
        <button type="button" onClick={() => setDone(null)} className="mt-5 block text-sm font-semibold text-[#1D4FD8] hover:underline">
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-label="Corporate wellness enquiry" className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-company`} className={lab}>Company name</label>
        <input id={`${id}-company`} name="company" autoComplete="organization" value={f.company} onChange={(e) => set('company', e.target.value)} className={`${input} ${b('company')}`} {...a('company')} />
        {er('company')}
      </div>
      <div>
        <label htmlFor={`${id}-name`} className={lab}>Your name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} className={`${input} ${b('name')}`} {...a('name')} />
        {er('name')}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={lab}>Mobile number</label>
        <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={(e) => set('phone', e.target.value)} className={`${input} ${b('phone')}`} {...a('phone')} />
        {er('phone')}
      </div>
      <div>
        <label htmlFor={`${id}-size`} className={lab}>Team size</label>
        <select id={`${id}-size`} name="size" value={f.size} onChange={(e) => set('size', e.target.value)} className={`${input} ${b('size')}`} {...a('size')}>
          <option value="">Select…</option>
          {['Under 25', '25–100', '100–500', '500+'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {er('size')}
      </div>
      <div>
        <label htmlFor={`${id}-interest`} className={lab}>Interested in</label>
        <select id={`${id}-interest`} name="interest" value={f.interest} onChange={(e) => set('interest', e.target.value)} className={`${input} border-[#E1E7F0]`}>
          <option value="">Not sure yet</option>
          {programmes.map((p) => (
            <option key={p.title}>{p.title}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={lab}>
          Anything else? <span className="font-normal text-[#9AA6BA]">(optional)</span>
        </label>
        <textarea id={`${id}-message`} name="message" rows={3} value={f.message} onChange={(e) => set('message', e.target.value)} className={`${input} border-[#E1E7F0] resize-y`} />
      </div>
      <button type="submit" className="font-nav inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#2463EB] text-sm font-bold uppercase tracking-[0.08em] text-white hover:bg-[#1D4FD8] sm:col-span-2">
        <MessageCircle size={18} aria-hidden="true" /> Send enquiry via WhatsApp
      </button>
    </form>
  );
}

export default function Corporate() {
  const reduce = useReducedMotion();
  useSeo({
    title: "Corporate Wellness & Workplace Physiotherapy in Pune | Govind’s Advanced Pain Management & Physiotherapy Centre",
    description:
      'On-site physiotherapy camps, ergonomic assessments and back-care workshops for companies in Pune, by Govind’s Advanced Pain Management & Physiotherapy Centre, Kondhwa.',
    path: '/corporate',
    image: '/img/corp-hero-1600.webp',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Corporate Wellness Programme',
        serviceType: 'Workplace physiotherapy and ergonomics',
        areaServed: 'Pune',
        provider: { '@type': 'MedicalClinic', name: clinic.name, telephone: clinic.phone.e164 },
      },
    ],
  });
  const rise = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

  return (
    <>
      {/* Hero */}
      <section aria-labelledby="corp-title" className="relative isolate overflow-hidden bg-white">
        <div className="hero-photo relative mt-[88px] h-[50vh] min-h-[300px] xl:absolute xl:inset-y-0 xl:left-[40%] xl:right-0 xl:mt-0 xl:h-auto">
          <Photo name="corp-hero" priority sizes="100vw" alt="A physiotherapist leading office employees in a group stretching session." imgClassName="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent xl:hidden" />
        </div>
        <div className="mx-auto max-w-[1440px] px-4 md:px-10 xl:flex xl:min-h-[100svh] xl:items-center xl:px-16">
          <div className="pb-16 pt-4 xl:max-w-[44%] xl:py-32">
            <motion.p {...rise(0.1)} className="font-hero inline-flex items-center gap-2 rounded-full border border-[#E6EBF3] bg-white/90 px-4 py-2 text-sm font-semibold text-[#1D4FD8] shadow-sm">
              <Building2 size={16} aria-hidden="true" /> Corporate Wellness Programme
            </motion.p>
            <motion.h1 {...rise(0.2)} id="corp-title" className="font-hero mt-6 text-[clamp(2.6rem,4.8vw,5.2rem)] leading-[1.06] tracking-[-0.025em] text-[#0E1E3D]">
              <span className="block font-normal">Healthy Teams.</span>
              <span className="block font-extrabold">Stronger Business.</span>
            </motion.h1>
            <motion.p {...rise(0.32)} className="mt-6 max-w-md text-lg leading-relaxed text-[#3B4A63]">
              Workplace physiotherapy for companies in Pune: on-site camps, ergonomic checks and wellness workshops that keep your people moving
              well.
            </motion.p>
            <motion.div {...rise(0.44)} className="mt-9 flex flex-wrap gap-3">
              <a href="#corp-enquiry" className={btnPrimary}>
                Plan a programme <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#programmes" className="font-hero inline-flex h-12 items-center rounded-full px-5 font-semibold text-[#0E1E3D] hover:text-[#1D4FD8]">
                See what’s included
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section aria-labelledby="corp-why" className="bg-[#F4F7FC] py-24 md:py-28">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <SectionHeading id="corp-why" eyebrow="Why it matters" light="Work shouldn’t" bold="hurt." sub="Many of the back, neck and wrist problems we treat start at a desk. A little prevention at work goes a long way." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {issues.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="h-full rounded-[24px] bg-white p-7 shadow-[0_14px_34px_-26px_rgba(14,30,61,.35)]">
                  <Icon size={26} className="text-[#2463EB]" aria-hidden="true" />
                  <h3 className="font-hero mt-5 text-xl font-bold text-[#0E1E3D]">{title}</h3>
                  <p className="mt-2 text-[#3B4A63]">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" aria-labelledby="corp-prog" className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 md:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="corp-prog" eyebrow="What we offer" light="Flexible programmes," bold="built for your team." sub="Choose one service or combine them into a year-round programme." />
              <Reveal className="mt-10 overflow-hidden rounded-[28px] shadow-[0_30px_60px_-36px_rgba(14,30,61,.55)]">
                <Photo name="corp-desk" alt="A physiotherapist adjusting an employee’s laptop height at his desk." sizes="(min-width:1024px) 40vw, 100vw" imgClassName="aspect-[4/3] w-full object-cover" />
              </Reveal>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {programmes.map(({ icon: Icon, title, text, points }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.06}>
                <div className="h-full rounded-[26px] border border-[#E6EBF3] bg-white p-7 transition-shadow hover:shadow-[0_20px_40px_-28px_rgba(14,30,61,.45)]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-[#2463EB] text-white shadow-[0_10px_22px_-10px_rgba(36,99,235,.9)]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-hero mt-6 text-xl font-bold text-[#0E1E3D]">{title}</h3>
                  <p className="mt-2 text-[0.96rem] leading-relaxed text-[#3B4A63]">{text}</p>
                  <ul className="mt-5 space-y-2">
                    {points.map((p) => (
                      <li key={p} className="font-hero flex items-center gap-2 text-sm font-semibold text-[#0E1E3D]">
                        <CheckCircle2 size={16} className="text-[#2463EB]" aria-hidden="true" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + benefits */}
      <section aria-labelledby="corp-how" className="relative overflow-hidden bg-[#0E1E3D] py-24 md:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[620px] rounded-full bg-[#2463EB]/25 blur-[120px]" />
        <div className="relative mx-auto max-w-[1320px] px-4 md:px-6">
          <SectionHeading dark id="corp-how" eyebrow="How it works" light="Simple to start," bold="easy to run." />
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.05] p-7">
                    <div className="flex items-center justify-between">
                      <Icon size={24} className="text-[#8FB3F7]" aria-hidden="true" />
                      <span className="font-hero text-3xl font-extrabold text-white/15">0{i + 1}</span>
                    </div>
                    <h3 className="font-hero mt-6 text-xl font-bold text-white">{title}</h3>
                    <p className="mt-2 text-white/65">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-16 grid gap-8 border-t border-white/10 pt-12 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <Reveal key={title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="font-hero block font-bold text-white">{title}</span>
                  <span className="mt-1 block text-white/65">{text}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section id="corp-enquiry" aria-labelledby="corp-enq" className="bg-[#F4F7FC] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 md:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="corp-enq" eyebrow="Get in touch" light="Let’s plan your" bold="team’s programme." sub="Tell us a little about your company. We’ll get back to you to discuss dates, formats and pricing." />
            <Reveal className="mt-8 rounded-[24px] bg-white p-6 shadow-sm">
              <p className="font-hero font-bold text-[#0E1E3D]">Prefer to talk?</p>
              <a href={`tel:${clinic.phone.e164}`} className="font-hero mt-1 block text-2xl font-extrabold text-[#1D4FD8]">
                {clinic.phone.display}
              </a>
              <p className="mt-2 text-sm text-[#3B4A63]">{clinic.name}, Tilekar Nagar, Kondhwa, Pune</p>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="rounded-[30px] bg-white p-7 shadow-[0_30px_60px_-40px_rgba(14,30,61,.5)] md:p-10">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
