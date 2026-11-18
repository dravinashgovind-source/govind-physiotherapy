import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { Photo } from '../components/Photo';
import { clinic, telHref } from '../config/clinic';
import { BookLink } from '../components/Booking';

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: bright, airy clinic photograph, full-bleed, with a light + bold two-weight
 * headline on the left (art direction: the "Healing Hands" reference).
 */
export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-white">
      {/* Photograph */}
      <motion.div
        className="hero-photo relative mt-[88px] h-[54vh] min-h-[320px] md:h-[62vh] xl:absolute xl:inset-y-0 xl:left-[14%] xl:right-0 xl:mt-0 xl:h-auto 2xl:left-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <Photo
          name="hero-care"
          wide
          priority
          sizes="100vw"
          alt="A physiotherapist smiling as he steadies an older patient stepping onto an exercise step with a resistance band, in a bright clinic."
          imgClassName="absolute inset-0 h-full w-full object-cover object-[88%_center] xl:object-right"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent xl:hidden" />
      </motion.div>

      {/* Copy */}
      <div className="wrap relative xl:flex xl:min-h-[100svh] xl:items-center">
        <div className="pb-16 pt-4 xl:max-w-[46%] xl:py-32">
          <motion.a
            href={clinic.google.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hero mb-7 inline-flex items-center gap-3 rounded-full border border-[#E6EBF3] bg-white/90 py-2 pl-2.5 pr-5 shadow-[0_8px_24px_-14px_rgba(14,30,61,.3)] backdrop-blur transition-shadow hover:shadow-[0_10px_28px_-12px_rgba(14,30,61,.35)]"
            aria-label={`Rated ${clinic.google.rating.toFixed(1)} out of 5 on Google. Read our reviews (opens Google)`}
            {...rise(0.15)}
          >
            <span className="grid size-8 place-items-center rounded-full bg-white shadow-sm" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
            </span>
            <span className="text-[15px] font-extrabold text-[#0E1E3D]">{clinic.google.rating.toFixed(1)}</span>
            <span className="flex gap-0.5 text-[#FBBC04]" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="fill-current" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[13.5px] font-semibold text-[#3B4A63]">5-star rated on Google</span>
          </motion.a>

          <h1 id="hero-title" className="font-hero text-[clamp(2.75rem,5.2vw,5.75rem)] leading-[1.06] tracking-[-0.025em] text-[#0E1E3D]">
            <motion.span className="block font-normal" {...rise(0.25)}>
              Healing Hands.
            </motion.span>
            <motion.span className="block font-extrabold" {...rise(0.38)}>
              Better Lives.
            </motion.span>
          </h1>

          <motion.p className="mt-6 max-w-md text-lg leading-relaxed text-[#3B4A63] xl:text-xl" {...rise(0.5)}>
            Assessment-based physiotherapy &amp; pain management in Kondhwa, Pune.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" {...rise(0.62)}>
            <BookLink
              className="font-hero group inline-flex h-[64px] items-center gap-4 rounded-full bg-[#2463EB] px-10 text-lg font-semibold text-white shadow-[0_12px_30px_-12px_rgba(36,99,235,.6)] transition-colors hover:bg-[#1D4FD8]"
            >
              Book Appointment
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </BookLink>
            <a href={telHref} className="inline-flex min-h-12 items-center gap-2 font-medium text-[#0E1E3D]/80 hover:text-[#0E1E3D]">
              <Phone size={17} aria-hidden="true" /> {clinic.phone.display}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
