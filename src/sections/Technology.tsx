import { Activity, Dumbbell, Hand, MoveVertical, Waves, Zap } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

/**
 * Treatments & modalities. Laser, ultrasound, traction and therapeutic exercise are
 * mentioned in the clinic's Google reviews; confirm the rest with the clinic.
 */
const modalities = [
  { icon: Hand, title: 'Manual Therapy', text: 'Skilled hands-on joint mobilisation and soft-tissue release to ease pain and restore movement.' },
  { icon: Dumbbell, title: 'Therapeutic Exercise', text: 'Progressive strengthening and mobility programmes, taught one-to-one and continued at home.' },
  { icon: Zap, title: 'Laser Therapy', text: 'Low-level laser to help settle pain and inflammation in muscles, tendons and joints.' },
  { icon: Waves, title: 'Ultrasound Therapy', text: 'Deep, gentle sound-wave therapy to support soft-tissue healing and comfort.' },
  { icon: MoveVertical, title: 'Spinal Traction', text: 'Controlled cervical and lumbar traction to relieve pressure in the neck and lower back.' },
  { icon: Activity, title: 'Electrotherapy', text: 'IFT and TENS currents that calm pain signals and relax tight, guarded muscles.' },
];

export function Technology() {
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="relative overflow-hidden bg-[#0E1E3D] py-16 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 size-[620px] rounded-full bg-[#2463EB]/25 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-52 -left-40 size-[520px] rounded-full bg-[#0B9F9A]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-4 md:px-6">
        <SectionHeading
          dark
          id="treatments-title"
          eyebrow="Treatments & technology"
          light="Modern tools,"
          bold="expert hands."
          sub="Advanced equipment helps settle pain quickly, while personalised exercise and hands-on care make the results last."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 md:gap-4 lg:grid-cols-3">
          {modalities.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.06} className="group h-full">
                <div className="grid h-full grid-cols-[auto_1fr] gap-x-4 rounded-[20px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur sm:block sm:rounded-[24px] sm:p-7 transition-colors duration-300 hover:border-[#2463EB]/60 hover:bg-white/[0.08]">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#5A8CF2] to-[#1D4FD8] text-white shadow-[0_10px_24px_-10px_rgba(36,99,235,.9)]">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="font-hero self-center text-lg font-bold text-white sm:mt-6 sm:text-xl">{title}</h3>
                  <p className="col-start-2 mt-1 text-[0.92rem] leading-relaxed text-white/65 sm:mt-2 sm:text-[0.95rem]">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
