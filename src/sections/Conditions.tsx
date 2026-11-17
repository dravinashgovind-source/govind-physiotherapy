import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import manifest from '../content/image-manifest.json';
import { conditions, type Callout, type Condition } from '../content/conditions';
import { SectionHeading } from '../components/SectionHeading';

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = '#F26A2E';
const dims = manifest as Record<string, { width: number; height: number }>;

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 1200, h: 700 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

/** Thin orange corner brackets around a label (as in the art direction). */
function Brackets() {
  const c = 'absolute size-2.5 border-[#F26A2E]';
  return (
    <>
      <span className={`${c} -left-2 -top-2 border-l border-t`} />
      <span className={`${c} -right-2 -top-2 border-r border-t`} />
      <span className={`${c} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${c} -bottom-2 -right-2 border-b border-r`} />
    </>
  );
}

function CalloutTag({ c, i, compact }: { c: Callout; i: number; compact: boolean }) {
  const reduce = useReducedMotion();
  const dir = c.side === 'left' ? -1 : 1;
  const len = 96;
  const elbow = 26;
  return (
    <motion.div
      className="absolute"
      style={{ left: `${c.x * 100}%`, top: `${c.y * 100}%` }}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: reduce ? 0 : 0.35 + i * 0.12 }}
    >
      {/* anchor dot */}
      <span className="absolute -translate-x-1/2 -translate-y-1/2">
        {c.pain && <span className="absolute -inset-2 animate-ping rounded-full bg-[#F26A2E]/40 motion-reduce:animate-none" />}
        <span className={`relative block rounded-full ${c.pain ? 'size-3 bg-[#F26A2E] ring-4 ring-[#F26A2E]/20' : 'size-1.5 bg-[#1d1d1f]'}`} />
      </span>
      {/* leader line */}
      {!compact && (<>
      <svg className="pointer-events-none absolute overflow-visible" width="1" height="1" aria-hidden="true">
        <polyline points={`0,0 ${dir * elbow},${c.dy} ${dir * len},${c.dy}`} fill="none" stroke="#1d1d1f" strokeWidth="1" />
        <circle cx={dir * len} cy={c.dy} r="2" fill="#1d1d1f" />
      </svg>
      {/* label */}
      <div
        className="absolute whitespace-nowrap"
        style={{ top: c.dy, [c.side === 'left' ? 'right' : 'left']: len + 14, transform: 'translateY(-50%)' }}
      >
        <div className="relative px-2.5 py-1.5">
          <Brackets />
          <p className="font-hero text-[11px] font-semibold text-[#1d1d1f] md:text-[12.5px]">{c.title}</p>
          <p className="font-hero text-[11px] font-bold md:text-[13px]" style={{ color: ORANGE }}>
            {c.value}
          </p>
        </div>
      </div>
      </>)}
    </motion.div>
  );
}

function Figure({ c, cardH, compact }: { c: Condition; cardH: number; compact: boolean }) {
  const reduce = useReducedMotion();
  const d = dims[c.cut];
  const h = cardH * c.scale * (compact ? 0.62 : 1);
  const w = (h * d.width) / d.height;
  return (
    <motion.div
      className={`absolute left-1/2 z-10 ${compact ? 'bottom-[33%]' : 'bottom-[7%]'}`}
      style={{ width: w, height: h, x: '-50%' }}
      initial={reduce ? false : { opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: -24, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, ease }}
    >
      {/* floor shadow */}
      <div className="absolute -bottom-[3%] left-1/2 h-[6%] w-[120%] -translate-x-1/2 rounded-[50%] bg-[#0E1E3D]/15 blur-xl" aria-hidden="true" />
      <picture>
        <source type="image/avif" srcSet={`/img/${c.cut}-900.avif 1x, /img/${c.cut}-1600.avif 2x`} />
        <img
          src={`/img/${c.cut}-900.webp`}
          srcSet={`/img/${c.cut}-900.webp 1x, /img/${c.cut}-1600.webp 2x`}
          alt={c.imageAlt}
          width={d.width}
          height={d.height}
          className="relative h-full w-full object-contain"
          decoding="async"
        />
      </picture>
      {c.callouts.map((co, i) => (compact && !co.pain ? null : <CalloutTag key={co.title} c={co} i={i} compact={compact} />))}
    </motion.div>
  );
}

function BigWord({ word, cardW, cardH }: { word: string; cardW: number; cardH: number }) {
  const reduce = useReducedMotion();
  const letters = word.toUpperCase().split('');
  // Fit the word across ~86% of the card width (Archivo, narrowest width ≈ 0.5em per glyph).
  const size = Math.min(cardH * 0.5, (cardW * 0.86) / (letters.length * 0.52));
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[17%] flex justify-center" aria-hidden="true">
      <div className="display flex select-none" style={{ fontSize: size, lineHeight: 0.85 }}>
        {letters.map((l, i) => (
          <motion.span
            key={`${word}-${i}`}
            initial={reduce ? false : { opacity: 0, y: '30%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '-20%' }}
            transition={{ duration: 0.6, delay: reduce ? 0 : i * 0.04, ease }}
            className="bg-gradient-to-b from-[#C6D1E1] to-[#DCE3EE] bg-clip-text text-transparent"
          >
            {l}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export function Conditions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardRef, card] = useSize<HTMLDivElement>();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = conditions.length;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)))));

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + (travel * (i + 0.5)) / n, behavior: reduce ? 'auto' : 'smooth' });
  };

  // Phones & tablets: while the card is pinned, each swipe moves exactly one condition.
  const activeRef = useRef(0);
  activeRef.current = active;
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia('(max-width: 1023px)').matches || reduce) return;
    let startY = 0;
    let locked = false;
    let busy = false;
    const pinned = () => {
      const r = track.getBoundingClientRect();
      return r.top <= 2 && r.bottom >= window.innerHeight - 2;
    };
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      locked = pinned();
    };
    const onMove = (e: TouchEvent) => {
      if (!locked) return;
      const dy = startY - e.touches[0].clientY; // > 0: swiping up (scrolling down)
      const i = activeRef.current;
      const canStep = (dy > 0 && i < n - 1) || (dy < 0 && i > 0);
      if (canStep || busy) e.preventDefault();
      else locked = false; // first/last card: let the page scroll on
    };
    const onEnd = (e: TouchEvent) => {
      if (!locked || busy) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 30) return;
      const next = activeRef.current + (dy > 0 ? 1 : -1);
      if (next < 0 || next >= n) return;
      busy = true;
      goTo(next);
      window.setTimeout(() => (busy = false), 650);
    };
    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchmove', onMove, { passive: false });
    track.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      track.removeEventListener('touchstart', onStart);
      track.removeEventListener('touchmove', onMove);
      track.removeEventListener('touchend', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, reduce]);

  const c = conditions[active];
  const compact = card.w < 760;

  return (
    <>
      <section id="conditions" aria-labelledby="conditions-title" className="relative bg-white pt-20 md:pt-28">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <SectionHeading
            id="conditions-title"
            eyebrow="Common conditions we treat"
            light="Where does"
            bold="it hurt?"
            sub="Scroll through the most common problems we see, from neck to ankle, and how physiotherapy can help each one."
          />
        </div>
        {/* Scroll track: the card stays pinned while each condition takes its turn */}
        <div ref={trackRef} className="conditions-track relative" style={{ height: `${n * 85 + 15}vh` }}>
        <div className="sticky top-0 flex h-[100svh] items-center px-3 pb-4 pt-[92px] md:px-6 md:pt-[100px]">

          <div
            ref={cardRef}
            className="relative mx-auto h-full max-h-[780px] w-full max-w-[1320px] overflow-hidden rounded-[28px] border border-[#E4E9F1] shadow-[0_30px_80px_-40px_rgba(14,30,61,.25)] md:rounded-[36px]"
            style={{ background: 'radial-gradient(110% 85% at 50% 80%, #FBFCFE 0%, #F1F4F9 45%, #E6EBF3 100%)' }}
          >
            {/* top bar */}
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 md:px-12 md:pt-9">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                {conditions.map((it, i) => (
                  <span key={it.id} className="h-[3px] rounded-full transition-all duration-500" style={{ width: i === active ? 22 : 16, background: i === active ? ORANGE : 'rgba(14,30,61,.12)' }} />
                ))}
              </div>
              <div className="hidden items-center gap-4 md:flex" aria-hidden="true">
                <span className="font-hero text-[11px] font-bold uppercase leading-tight tracking-[0.12em] text-[#55555B]">
                  Neck to
                  <br />
                  <span style={{ color: ORANGE }}>ankle</span>
                </span>
                <span className="flex items-end gap-[14px]">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="block w-px bg-[#1d1d1f]/60" style={{ height: i === active * 3 + 1 ? 12 : 7 }} />
                  ))}
                </span>
              </div>
              <p className="font-hero flex items-start gap-1.5 text-[11px] font-bold uppercase leading-tight tracking-[0.1em] text-[#55555B] md:text-[12px]">
                <Plus size={16} style={{ color: ORANGE }} aria-hidden="true" />
                <span>
                  Assessment-led
                  <br />
                  <span style={{ color: ORANGE }}>Physiotherapy</span>
                </span>
              </p>
            </div>

            {/* giant word + figure */}
            <AnimatePresence mode="popLayout" initial={false}>
              <BigWord key={`w-${c.id}`} word={c.word} cardW={card.w} cardH={card.h} />
            </AnimatePresence>
            <AnimatePresence mode="popLayout" initial={false}>
              <Figure key={`f-${c.id}`} c={c} cardH={card.h} compact={compact} />
            </AnimatePresence>

            {/* bottom-left copy */}
            <div className="absolute bottom-6 left-6 z-20 max-w-[280px] md:bottom-12 md:left-12 md:max-w-[330px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={c.id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="font-hero text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
                    {String(active + 1).padStart(2, '0')} — {c.title}
                  </p>
                  <h3 className="font-hero mt-2 text-[15px] font-semibold leading-snug text-[#4a4a4f] md:text-[19px]">{c.tagline}</h3>
                  <Link to={`/services/${c.slug}`} className="font-hero group mt-1 inline-flex min-h-11 items-center gap-1.5 text-[14px] font-bold text-[#1d1d1f] md:text-sm">
                    Learn more
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* bottom-right care list */}
            <div className="absolute bottom-12 right-12 z-20 hidden text-right md:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={c.id}
                  aria-label="How we help"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-1.5"
                >
                  {c.care.map((x) => (
                    <li key={x} className="font-hero text-[13px] font-bold uppercase tracking-[0.14em] text-[#55555B]">
                      {x}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* right-edge step indicator */}
            <nav aria-label="Conditions" className="absolute right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 md:right-7">
              {conditions.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={it.title}
                  aria-current={i === active ? 'step' : undefined}
                  className="grid h-9 w-11 place-items-center md:h-6 md:w-4"
                >
                  <span
                    className="block w-2 rounded-full transition-all duration-500"
                    style={{ height: i === active ? 24 : 8, background: i === active ? ORANGE : 'rgba(14,30,61,.16)' }}
                  />
                </button>
              ))}
            </nav>
          </div>
        </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-[1320px] px-3 pb-20 pt-4 md:px-6">
          <div className="flex flex-col items-start gap-5 rounded-[28px] bg-[#F3F6FB] px-7 py-7 sm:flex-row sm:items-center sm:justify-between md:px-12">
            <div>
              <p className="font-hero text-lg font-bold text-[#0E1E3D]">Not sure what’s causing your pain?</p>
              <p className="mt-1 text-[0.95rem] text-[#3B4A63]">A one-to-one assessment is the first step. This information is general and not a diagnosis.</p>
            </div>
            <Link
              to="/#book"
              className="font-nav inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#2463EB] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8]"
            >
              Book Appointment <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
