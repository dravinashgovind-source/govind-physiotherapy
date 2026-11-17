import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { SectionHeading, btnSecondary } from '../components/SectionHeading';
import { moreServices, services, type Service } from '../content/services';

function ServiceCard({ s, big }: { s: Service; big?: boolean }) {
  return (
    <article className="group relative h-full min-h-[460px] md:min-h-[380px] overflow-hidden rounded-[28px] bg-[#0E1E3D] shadow-[0_24px_50px_-34px_rgba(14,30,61,.6)]">
      <Photo
        name={s.image}
        alt={s.imageAlt}
        sizes={big ? '(min-width: 1280px) 50vw, 100vw' : '(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw'}
        imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/95 via-[#0B1730]/50 via-45% to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 ${big ? 'p-7 md:p-10' : 'p-6'}`}>
        <h3 className={`font-hero font-extrabold leading-tight tracking-[-0.01em] text-white ${big ? 'text-3xl md:text-[2.4rem]' : 'text-[1.4rem]'}`}>{s.title}</h3>
        <p className={`mt-2 text-white/80 ${big ? 'max-w-lg text-[1.05rem]' : 'text-[0.93rem] leading-snug'}`}>{s.short}</p>
        {/* points: always visible on touch / big card, revealed on hover elsewhere */}
        <div
          className={`grid transition-all duration-500 ${
            big ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[1fr] opacity-100 md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100 md:group-focus-within:grid-rows-[1fr] md:group-focus-within:opacity-100'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className={`flex flex-wrap gap-2 ${big ? '' : 'pt-4'}`}>
              {s.points.map((p) => (
                <li key={p} className="font-hero flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[12.5px] font-semibold text-white backdrop-blur">
                  <Check size={13} strokeWidth={3} aria-hidden="true" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Link
        to="/#book"
        aria-label={`Book an appointment for ${s.title}`}
        className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/90 text-[#0E1E3D] opacity-100 shadow-lg transition-all duration-300 hover:bg-[#2463EB] hover:text-white md:-translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:focus:translate-y-0 md:focus:opacity-100"
      >
        <ArrowUpRight size={19} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function Services() {
  const [first, ...rest] = services;
  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <SectionHeading
          id="services-title"
          eyebrow="Our services"
          light="Complete physiotherapy,"
          bold="under one roof."
          sub="From everyday aches to post-surgery recovery, every programme starts with a one-to-one assessment and is built around you."
          aside={
            <Link to="/#book" className={`${btnSecondary} shrink-0 self-start md:self-auto`}>
              Not sure which? Ask us <ArrowRight size={16} aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-14 grid auto-rows-[minmax(380px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Reveal className="md:col-span-2 md:row-span-2">
            <ServiceCard s={first} big />
          </Reveal>
          {rest.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 0.06} className={i === 2 ? 'md:col-span-2 xl:col-span-2' : ''}>
              <ServiceCard s={s} big={i === 2} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap items-center gap-2.5">
          <span className="font-hero mr-2 text-sm font-semibold text-[#3B4A63]">We also help with</span>
          {moreServices.map((m) => (
            <span key={m} className="font-hero rounded-full bg-[#F4F7FC] px-4 py-2 text-sm font-medium text-[#0E1E3D]">
              {m}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
