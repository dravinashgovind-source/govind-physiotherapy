import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** Shared section header: eyebrow, light + bold two-weight title, optional subtitle. */
export function SectionHeading({
  eyebrow,
  light,
  bold,
  sub,
  id,
  center,
  dark,
  aside,
}: {
  eyebrow: string;
  light: string;
  bold: string;
  sub?: ReactNode;
  id: string;
  center?: boolean;
  dark?: boolean;
  aside?: ReactNode;
}) {
  return (
    <Reveal className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        <p className={`font-hero flex items-center gap-2.5 text-sm font-semibold tracking-wide ${center ? 'justify-center' : ''} ${dark ? 'text-[#8FB3F7]' : 'text-[#2463EB]'}`}>
          <span className={`size-1.5 rounded-full ${dark ? 'bg-[#8FB3F7]' : 'bg-[#2463EB]'}`} aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 id={id} className={`font-hero mt-4 text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.08] tracking-[-0.025em] ${dark ? 'text-white' : 'text-[#0E1E3D]'}`}>
          <span className="font-normal">{light} </span>
          <span className="font-extrabold">{bold}</span>
        </h2>
        {sub && <p className={`mt-4 text-[1.05rem] leading-relaxed ${dark ? 'text-white/70' : 'text-[#3B4A63]'}`}>{sub}</p>}
      </div>
      {aside}
    </Reveal>
  );
}

export const btnPrimary =
  'font-nav inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2463EB] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8]';
export const btnSecondary =
  'font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D5DEEC] bg-white px-6 text-sm font-semibold text-[#0E1E3D] transition-colors hover:border-[#2463EB]';
