import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { btnPrimary } from '../components/SectionHeading';
import { clinic, telHref } from '../config/clinic';
import { regions } from '../content/regions';
import { useSeo } from '../lib/seo';

export default function NotFound() {
  useSeo('not-found');
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-white pb-20 pt-[120px]">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 size-[560px] rounded-full bg-[#EEF3FD] blur-3xl" />
      <div className="relative mx-auto w-full max-w-[1320px] px-4 text-center md:px-6">
        <p aria-hidden="true" className="font-brand select-none text-[clamp(7rem,22vw,16rem)] font-bold leading-none text-transparent [-webkit-text-stroke:2px_#C9D6EE]">
          404
        </p>
        <h1 className="font-hero -mt-4 text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.08] tracking-[-0.025em] text-[#0E1E3D]">
          <span className="font-normal">This page is </span>
          <span className="font-extrabold">out of range.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[#3B4A63]">We couldn’t find that page. It may have moved, or the link may be incorrect.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className={btnPrimary}>
            Back to home <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a href={telHref} className="font-hero inline-flex h-12 items-center gap-2 rounded-full border border-[#D5DEEC] px-6 font-semibold text-[#0E1E3D] hover:border-[#2463EB]">
            <Phone size={16} aria-hidden="true" /> {clinic.phone.display}
          </a>
        </div>
        <div className="mt-14">
          <p className="font-hero text-sm font-semibold text-[#3B4A63]">Popular pages</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {regions.map((r) => (
              <li key={r.id}>
                <Link to={`/services/${r.slug}`} className="font-hero inline-block rounded-full bg-[#F4F7FC] px-4 py-3 text-sm font-medium text-[#0E1E3D] hover:bg-[#2463EB] hover:text-white">
                  {r.label} pain
                </Link>
              </li>
            ))}
            <li>
              <Link to="/corporate" className="font-hero inline-block rounded-full bg-[#F4F7FC] px-4 py-3 text-sm font-medium text-[#0E1E3D] hover:bg-[#2463EB] hover:text-white">
                Corporate wellness
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
