import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Photo } from './Photo';
import { reliefAll, reliefLeft, reliefPoses, reliefRight, type ReliefItem } from '../content/relief';

const STEP_MS = 2800;
const PAIN = '#FF4D5E';

/**
 * "We help you with RELIEF from" body map (/app home tab).
 * A real person reacts to each condition: the matching pose fades in, the view
 * leans towards the painful area and a pulsing pain spot marks it. When the
 * section is on screen it steps through every condition; tapping one jumps to it.
 */
export function ReliefMap({ onBook }: { onBook: (concern: string) => void }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(!reduce);
  const [inView, setInView] = useState(false);
  const section = useRef<HTMLElement>(null);
  const item: ReliefItem | undefined = reliefAll[index];
  const pose = item?.pose ?? 'neutral';

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Step through the list while visible.
  useEffect(() => {
    if (!playing || !inView || reduce) return;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % reliefAll.length), index < 0 ? 900 : STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, inView, reduce, index]);

  const pick = (it: ReliefItem) => setIndex(reliefAll.indexOf(it));

  const chip = (it: ReliefItem) => {
    const active = it === item;
    return (
      <li key={it.label}>
        <button
          type="button"
          aria-pressed={active}
          onClick={() => pick(it)}
          className={`font-hero relative flex h-11 w-full items-center gap-2 overflow-hidden rounded-full pl-3 pr-2 text-left text-[12.5px] font-semibold leading-tight transition-colors duration-300 ${
            active ? 'bg-white text-[#0E1E3D] shadow-[0_10px_24px_-12px_rgba(255,77,94,.8)]' : 'border border-white/12 bg-white/[0.06] text-white/85 active:bg-white/10'
          }`}
        >
          <span className="size-2 shrink-0 rounded-full transition-colors" style={{ background: active ? PAIN : 'rgba(143,184,255,.55)' }} aria-hidden="true" />
          <span className="line-clamp-2 min-w-0 flex-1">{it.label}</span>
          {active && playing && inView && !reduce && (
            <span key={index} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] origin-left animate-[relief-progress_linear_forwards] bg-[#FF4D5E]/70" style={{ animationDuration: `${STEP_MS}ms` }} />
          )}
        </button>
      </li>
    );
  };

  return (
    <section ref={section} className="mt-8" aria-labelledby="relief-title">
      <div className="px-5">
        <p className="font-hero text-[15px] font-semibold text-white/70">We help you with</p>
        <h2 id="relief-title" className="flex items-baseline gap-2.5">
          <span className="display bg-gradient-to-r from-[#2DE0CF] to-[#8FB8FF] bg-clip-text pr-1 text-[52px] font-black uppercase leading-[0.95] tracking-[0.01em] text-transparent">Relief</span>
          <span className="font-hero text-[22px] font-extrabold text-white">from</span>
        </h2>
      </div>

      {/* Stage: stays in view while the list scrolls underneath */}
      <div className="sticky top-0 z-10 mt-4 px-4 pb-3 pt-2 [background:linear-gradient(#0B1E4A_88%,transparent)]">
        <div className="relative h-[340px] overflow-hidden rounded-[28px] border border-white/10 [background:radial-gradient(120%_80%_at_70%_30%,#1B3A7A_0%,#0F2557_45%,#0A1A42_100%)]">
          {/* Figure */}
          <div className="absolute bottom-0 right-[-6%] top-[5%] w-[64%]">
            <motion.div
              className="relative h-full w-full"
              animate={{ scale: item && !reduce ? 1.08 : 1 }}
              style={{ transformOrigin: item ? `${item.x * 100}% ${item.y * 100}%` : '50% 50%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span aria-hidden="true" className="absolute inset-x-[18%] bottom-[2%] h-6 rounded-[50%] bg-black/35 blur-md" />
              {(['neutral', ...reliefPoses] as const).map((p) => (
                <Photo
                  key={p}
                  name={`relief-${p}`}
                  widths={[480, 900]}
                  sizes="240px"
                  alt={p === pose ? (item ? `A man showing where ${item.label.toLowerCase()} hurts.` : 'A man standing, ready for assessment.') : ''}
                  className={`absolute inset-0 transition-opacity duration-300 ${p === pose ? 'opacity-100' : 'opacity-0'}`}
                  imgClassName="h-full w-full object-contain"
                />
              ))}
              {item && (
                <span key={index} aria-hidden="true" className="absolute" style={{ left: `${item.x * 100}%`, top: `${item.y * 100}%` }}>
                  <span className="absolute -left-7 -top-7 size-14 rounded-full bg-[radial-gradient(circle,rgba(255,77,94,.55),transparent_70%)]" />
                  <span className="absolute -left-3 -top-3 size-6 rounded-full border-2 border-[#FF4D5E] motion-safe:animate-ping" />
                  <span className="absolute -left-[7px] -top-[7px] size-3.5 rounded-full border-2 border-white bg-[#FF4D5E] shadow-[0_0_14px_rgba(255,77,94,.9)]" />
                </span>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className="relative flex h-full w-[52%] flex-col justify-between p-4" aria-live={playing ? 'off' : 'polite'}>
            <span className="font-hero text-[12px] font-bold tracking-[0.08em] text-[#2DE0CF]">
              {item ? `${String(index + 1).padStart(2, '0')} / ${reliefAll.length}` : `${reliefAll.length} CONDITIONS`}
            </span>
            <motion.div key={index} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <p className="font-hero text-[22px] font-extrabold leading-[1.08] text-white">{item ? item.label : 'Where does it hurt?'}</p>
              <p className="mt-2 text-[12.5px] leading-snug text-white/70">{item ? item.note : 'Tap a condition below to see where it’s felt.'}</p>
              {item && (
                <button type="button" onClick={() => onBook(item.concern)} className="font-hero mt-3.5 inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[12.5px] font-bold text-[#0E1E3D] active:scale-[.98]">
                  Book for this <ArrowRight size={14} aria-hidden="true" />
                </button>
              )}
            </motion.div>
          </div>

          {!reduce && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause the walkthrough' : 'Play through every condition'}
              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-white/15 bg-[#0B1E4A]/60 text-white backdrop-blur"
            >
              {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} className="translate-x-px" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {/* The clinic's list, in two columns like the printed version */}
      <div className="grid grid-cols-2 gap-2 px-4">
        <ul className="space-y-2" aria-label="Conditions, list one">
          {reliefLeft.map(chip)}
        </ul>
        <ul className="space-y-2" aria-label="Conditions, list two">
          {reliefRight.map(chip)}
        </ul>
      </div>
    </section>
  );
}
