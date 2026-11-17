import { ArrowUpRight, BadgeCheck, Quote, Star } from 'lucide-react';
import { GoogleG } from '../components/GoogleG';
import { Reveal } from '../components/Reveal';
import { clinic } from '../config/clinic';
import { googleReviews, type Review } from '../content/media';

const avatarColors = ['#2463EB', '#F26A2E', '#0B9F9A', '#8B5CF6', '#E0A100', '#DB4C77'];

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="flex gap-0.5 text-[#FBBC04]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="fill-current" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  const initials = r.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <figure className="break-inside-avoid md:mb-5 rounded-[24px] border border-[#E6EBF3] bg-white p-6 shadow-[0_14px_34px_-24px_rgba(14,30,61,.35)]">
      <div className="flex items-center justify-between">
        <Stars />
        <GoogleG size={18} />
      </div>
      <blockquote className="mt-4 text-[0.97rem] leading-relaxed text-[#26344F]">“{r.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-[#EEF1F6] pt-4">
        <span className="font-hero grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: avatarColors[i % avatarColors.length] }} aria-hidden="true">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="font-hero flex items-center gap-1 font-bold text-[#0E1E3D]">
            {r.name}
            {r.localGuide && <BadgeCheck size={15} className="text-[#2463EB]" aria-label="Google Local Guide" />}
          </span>
          <span className="block text-xs text-[#3B4A63]/80">
            {r.when} · {r.tag}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  return (
    <section id="patients" aria-labelledby="reviews-title" className="relative overflow-hidden bg-white py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Summary */}
          <Reveal className="min-w-0 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="font-hero flex items-center gap-2.5 text-sm font-semibold tracking-wide text-[#2463EB]">
                <span className="size-1.5 rounded-full bg-[#2463EB]" aria-hidden="true" />
                Google reviews
              </p>
              <h2 id="reviews-title" className="font-hero mt-4 text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.08] tracking-[-0.025em] text-[#0E1E3D]">
                <span className="font-normal">Loved by </span>
                <span className="font-extrabold">our patients.</span>
              </h2>

              <div className="mt-8 rounded-[28px] bg-[#F4F7FC] p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-full bg-white shadow-sm">
                    <GoogleG size={24} />
                  </span>
                  <span className="font-hero font-bold text-[#0E1E3D]">Google Rating</span>
                </div>
                <p className="font-hero mt-5 flex items-end gap-3">
                  <span className="text-6xl font-extrabold leading-none text-[#0E1E3D]">{clinic.google.rating.toFixed(1)}</span>
                  <span className="pb-1">
                    <Stars size={20} />
                  </span>
                </p>
                <p className="mt-3 text-sm text-[#3B4A63]">
                  Our overall rating on Google. Here are a few of the reviews patients have left there.
                </p>
                <div className="mt-6 grid gap-2.5">
                  <a
                    href={clinic.google.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-nav inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2463EB] px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8]"
                  >
                    Read all reviews <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    href={clinic.google.reviewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D5DEEC] bg-white px-6 text-sm font-semibold text-[#0E1E3D] hover:border-[#2463EB]"
                  >
                    Write a review
                  </a>
                </div>
              </div>
              <Quote size={80} className="mt-10 hidden text-[#EEF3FD] lg:block" aria-hidden="true" />
            </div>
          </Reveal>

          {/* Masonry of real reviews */}
          <div className="min-w-0 lg:col-span-8">
            <p className="font-hero mt-4 flex items-center gap-2 text-sm font-semibold text-[#3B4A63] md:hidden" aria-hidden="true">
          Swipe for more reviews <span className="inline-block animate-[nudge_1.6s_ease-in-out_infinite] motion-reduce:animate-none">→</span>
        </p>
            <div className="-mx-4 mt-4 flex snap-x snap-mandatory items-start gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:mx-0 md:mt-0 md:block md:columns-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
            {googleReviews.map((r, i) => (
              <Reveal key={r.name} delay={(i % 4) * 0.05} className="w-[86%] shrink-0 snap-start md:w-auto">
                <ReviewCard r={r} i={i} />
              </Reveal>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
