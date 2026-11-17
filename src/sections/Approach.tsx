import { useRef } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ClipboardCheck, HandHeart, Route, TrendingUp } from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Assess',
    when: 'First visit',
    text: 'We listen to your story, then test movement, strength, posture and the activities that hurt, to find the real cause.',
    tags: ['Detailed history', 'Movement & strength tests'],
  },
  {
    icon: Route,
    title: 'Plan',
    when: 'Same day',
    text: 'You get a clear explanation of what we found and a personal plan built around your goals, routine and pace.',
    tags: ['Clear explanation', 'Personal goals'],
  },
  {
    icon: HandHeart,
    title: 'Treat',
    when: 'Each session',
    text: 'Hands-on therapy, pain-relief modalities and guided exercise, with every exercise taught until you’re confident.',
    tags: ['Manual therapy', 'Guided exercise'],
  },
  {
    icon: TrendingUp,
    title: 'Recover',
    when: 'Ongoing',
    text: 'We re-check and progress your plan, and give you a home programme so you stay strong long after you finish.',
    tags: ['Progress checks', 'Home programme'],
  },
];

export function Approach() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });

  return (
    <section id="approach" aria-labelledby="approach-title" className="bg-[#F4F7FC] py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <SectionHeading
          id="approach-title"
          eyebrow="How we work"
          light="A clear path"
          bold="from pain to progress."
          sub="Four simple steps, the same for every patient. You always know what’s happening and why."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_60px_-36px_rgba(14,30,61,.55)]">
                  <Photo name="approach-assess" alt="A physiotherapist measuring a patient’s knee movement during an assessment." sizes="(min-width:1024px) 40vw, 100vw" imgClassName="aspect-[4/5] w-full object-cover" />
                  <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/90 p-4 backdrop-blur md:inset-x-6 md:bottom-6 md:p-5">
                    <p className="font-hero text-sm font-bold text-[#0E1E3D]">Your first visit includes a full assessment</p>
                    <p className="mt-1 text-[13px] text-[#3B4A63]">Bring any reports or scans, and wear comfortable clothing.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Timeline */}
          <ol ref={listRef} className="relative lg:col-span-7">
            <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-[2px] bg-[#DCE4F2]" />
            <motion.span
              aria-hidden="true"
              className="absolute bottom-6 left-[27px] top-6 w-[2px] origin-top bg-[#2463EB]"
              style={{ scaleY: reduce ? 1 : scrollYProgress }}
            />
            {steps.map(({ icon: Icon, title, when, text, tags }, i) => (
              <li key={title} className="relative pb-8 last:pb-0">
                <Reveal delay={0.05 * i} className="flex gap-5 md:gap-6">
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-[#2463EB] text-white shadow-[0_12px_24px_-12px_rgba(36,99,235,.8)]">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <div className="flex-1 rounded-[24px] bg-white p-6 shadow-[0_14px_34px_-26px_rgba(14,30,61,.35)] md:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-hero text-2xl font-extrabold text-[#0E1E3D]">
                        <span className="mr-2 text-[#2463EB]">0{i + 1}</span>
                        {title}
                      </h3>
                      <span className="font-hero rounded-full bg-[#F4F7FC] px-3 py-1 text-xs font-semibold text-[#3B4A63]">{when}</span>
                    </div>
                    <p className="mt-3 leading-relaxed text-[#3B4A63]">{text}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {tags.map((t) => (
                        <li key={t} className="font-hero rounded-full bg-[#2463EB]/10 px-3 py-1 text-[12.5px] font-semibold text-[#1D4FD8]">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
