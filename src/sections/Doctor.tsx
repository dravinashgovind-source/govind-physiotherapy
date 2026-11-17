import { Link } from 'react-router-dom';
import { ArrowRight, Award, HeartPulse, Star, Stethoscope, Users } from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { clinic } from '../config/clinic';

const highlights = [
  { icon: Users, value: clinic.ownerStatements.patientsTreated, label: 'Patients treated' },
  { icon: Star, value: `${clinic.google.rating.toFixed(1)} ★`, label: 'Rated on Google' },
  { icon: HeartPulse, value: 'Non-surgical', label: 'Pain management' },
];

const principles = [
  { icon: Stethoscope, title: 'Assessment first', text: 'Every plan begins by finding the root cause, not just treating where it hurts.' },
  { icon: Award, title: 'Personal plans', text: 'Treatment and exercises are planned around your body, routine and goals.' },
];

export function Doctor() {
  const d = clinic.doctor;
  return (
    <section id="doctor" aria-labelledby="doctor-title" className="relative overflow-hidden bg-white py-16 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 size-[520px] rounded-full bg-[#EEF3FD] blur-3xl" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
        {/* Photo */}
        <Reveal className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(14,30,61,.45)]">
            <Photo
              name="dr-avinash-govind"
              widths={[800, 1536]}
              sizes="(min-width: 1024px) 46vw, 100vw"
              alt={`${d.name}, physiotherapist, seated at his clinic desk`}
              imgClassName="aspect-[3/2] w-full object-cover"
            />
          </div>
          {/* floating rating card */}
          <a
            href={clinic.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hero absolute -bottom-7 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-18px_rgba(14,30,61,.35)] md:left-10"
          >
            <span className="text-3xl font-extrabold text-[#0E1E3D]">{clinic.google.rating.toFixed(1)}</span>
            <span>
              <span className="flex gap-0.5 text-[#FBBC04]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current" strokeWidth={0} />
                ))}
              </span>
              <span className="mt-0.5 block text-xs font-semibold text-[#3B4A63]">Google patient rating</span>
            </span>
          </a>
        </Reveal>

        {/* Copy */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="font-hero flex items-center gap-2.5 text-sm font-semibold tracking-wide text-[#2463EB]">
              <span className="size-1.5 rounded-full bg-[#2463EB]" aria-hidden="true" />
              Meet your physiotherapist
            </p>
            <h2 id="doctor-title" className="font-hero mt-4 text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.08] tracking-[-0.025em] text-[#0E1E3D]">
              <span className="font-normal">Dr. Avinash </span>
              <span className="font-extrabold">Govind</span>
            </h2>
            <p className="font-hero mt-2 text-lg font-semibold text-[#2463EB]">{d.qualifications.join(', ')} · Consultant Physiotherapist</p>
            <p className="mt-1 text-sm font-medium text-[#3B4A63]">Founder, Govind’s Advanced Pain Management &amp; Physiotherapy Centre</p>
            <p className="mt-6 max-w-xl text-[1.06rem] leading-relaxed text-[#3B4A63]">
              Dr. Avinash Govind leads an assessment-based clinic in Kondhwa, Pune, helping people with back pain, knee pain, sciatica, neck
              pain and loss of mobility move comfortably again. Patients often mention the time he takes to listen, to explain the problem
              clearly, and to guide every exercise personally.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-9 grid grid-cols-3 gap-3">
              {highlights.map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-2xl bg-[#F4F7FC] p-4 md:p-5">
                  <Icon size={20} className="text-[#2463EB]" aria-hidden="true" />
                  <dd className="font-hero mt-3 text-xl font-extrabold text-[#0E1E3D] md:text-2xl">{value}</dd>
                  <dt className="mt-0.5 text-xs font-medium text-[#3B4A63] md:text-sm">{label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-5">
              {principles.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#2463EB]/12 text-[#1D4FD8]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="font-hero block font-bold text-[#0E1E3D]">{title}</span>
                    <span className="block text-[0.95rem] text-[#3B4A63]">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#E6EBF3] p-4">
              <span className="font-hero grid size-12 shrink-0 place-items-center rounded-full bg-[#2463EB]/10 font-bold text-[#1D4FD8]" aria-hidden="true">PG</span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#3B4A63]/70">Also consulting</span>
                <span className="font-hero block font-bold text-[#0E1E3D]">{clinic.coConsultant.name}</span>
                <span className="block text-sm text-[#3B4A63]">{clinic.coConsultant.qualifications.join(', ')} · {clinic.coConsultant.role}</span>
              </span>
            </div>
            <Link
              to="/#book"
              className="font-nav mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-[#2463EB] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8]"
            >
              Consult Dr. Avinash <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
