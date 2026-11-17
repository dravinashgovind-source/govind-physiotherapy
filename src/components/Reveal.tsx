import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts content once as it enters the viewport. */
export function Reveal({ children, delay = 0, className, y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Headline lines that rise from behind a mask, one after another. */
export function MaskLines({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  animateOnMount,
  id,
}: {
  id?: string;
  lines: ReactNode[];
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];
  // The observer watches the heading itself. The moving lines are clipped by their masks, so they would never count as "in view".
  const trigger = animateOnMount ? { animate: 'show' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };
  return (
    <MotionTag className={className} id={id} initial={reduce ? false : 'hidden'} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.06em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '105%' }, show: { y: '0%', transition: { duration: 1, delay: delay + i * 0.09, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Image that is revealed by an expanding clip-path. */
export function ClipReveal({ children, className, from = 'inset(0 0 100% 0)' }: { children: ReactNode; className?: string; from?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: from }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 1.3, ease }}
    >
      {children}
    </motion.div>
  );
}
