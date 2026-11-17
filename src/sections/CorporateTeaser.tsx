import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Check } from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { btnPrimary } from '../components/SectionHeading';

const points = ['On-site physiotherapy camps', 'Ergonomic workstation checks', 'Posture & back-care workshops', 'Priority care for employees'];

export function CorporateTeaser() {
  return (
    <section id="corporate" aria-labelledby="corporate-title" className="bg-white py-16 md:py-28">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <Reveal>
          <div className="grid overflow-hidden rounded-[36px] bg-gradient-to-br from-[#EEF3FD] via-[#F4F7FC] to-[#EAF6F5] lg:grid-cols-2">
            <div className="p-8 md:p-14">
              <p className="font-hero inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#1D4FD8] shadow-sm">
                <Building2 size={16} aria-hidden="true" /> For companies & teams
              </p>
              <h2 id="corporate-title" className="font-hero mt-6 text-[clamp(2rem,3.2vw,3.2rem)] leading-[1.1] tracking-[-0.025em] text-[#0E1E3D]">
                <span className="font-normal">Healthier teams, </span>
                <span className="font-extrabold">fewer sick days.</span>
              </h2>
              <p className="mt-4 max-w-lg text-[1.05rem] leading-relaxed text-[#3B4A63]">
                Long hours at desks and on the shop floor show up as back, neck and wrist pain. Our Corporate Wellness Programme brings
                physiotherapy to your workplace.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {points.map((p) => (
                  <li key={p} className="font-hero flex items-center gap-2.5 text-[0.95rem] font-semibold text-[#0E1E3D]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#2463EB] text-white">
                      <Check size={13} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/corporate" className={`${btnPrimary} mt-9`}>
                Explore corporate programme <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="relative min-h-[320px]">
              <Photo name="corp-desk" alt="A physiotherapist adjusting an office employee’s desk posture." sizes="(min-width:1024px) 50vw, 100vw" imgClassName="absolute inset-0 h-full w-full object-cover" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
