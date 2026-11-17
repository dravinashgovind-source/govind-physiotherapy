import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

/** Real photographs of the clinic, supplied by the clinic. */
const photos = [
  { name: 'clinic-reception', caption: 'Reception & waiting area', alt: 'Clinic reception with a wooden front desk, waiting bench and framed certificates.', span: 'col-span-2 row-span-2' },
  { name: 'clinic-waiting', caption: 'Consultation wing', alt: 'Corridor with wooden panelling, waiting benches and glass-fronted consultation rooms.', span: 'md:row-span-2' },
  { name: 'clinic-consultation', caption: 'Consultation room', alt: 'Doctor’s consultation desk with a spine model and Dr. Avinash Govind’s name plate.', span: '' },
  { name: 'clinic-treatment', caption: 'Private treatment room', alt: 'Private treatment room with a treatment table and privacy curtain.', span: '' },
  { name: 'clinic-therapy-hall', caption: 'Spacious therapy hall', alt: 'Large therapy hall with curtained treatment bays and bright flooring.', span: 'col-span-2 row-span-2' },
  { name: 'clinic-entrance', caption: 'Our entrance', alt: 'Clinic entrance with an illuminated sign listing Dr. Avinash Govind and Dr. Preeti A. Govind.', span: '' },
  { name: 'clinic-signage', caption: 'Our signage', alt: 'Clinic sign reading Govind’s Advanced Pain Management & Physiotherapy Centre, with plants at the entrance.', span: '' },
  { name: 'clinic-entrance-open', caption: 'Welcome in', alt: 'The clinic’s entrance door open, with the illuminated sign beside it.', span: '' },
  { name: 'clinic-entrance-wide', caption: 'Easy to find', alt: 'Wide view of the clinic entrance lobby and illuminated sign.', span: 'max-md:col-span-2' },
];

function Lightbox({ index, onClose, onNav }: { index: number; onClose: () => void; onNav: (d: 1 | -1) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const p = photos[index];
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Clinic photo: ${p.caption}`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#0B1730]/95 backdrop-blur"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 text-white md:px-8">
        <p className="font-hero text-sm font-semibold">
          {index + 1} / {photos.length} · {p.caption}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close photo" className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 md:px-20" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={p.name} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="max-h-full">
            <Photo name={p.name} widths={[640, 1280]} sizes="90vw" alt={p.alt} imgClassName="max-h-[80vh] w-auto rounded-2xl object-contain" />
          </motion.div>
        </AnimatePresence>
        <button type="button" onClick={() => onNav(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6">
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => onNav(1)} aria-label="Next photo" className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6">
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

export function ClinicTour() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback((d: 1 | -1) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), []);

  return (
    <section id="tour" aria-labelledby="tour-title" className="bg-white py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <SectionHeading
          id="tour-title"
          eyebrow="Clinic tour"
          light="Step inside"
          bold="our clinic."
          sub="A calm, clean and welcoming space in Tilekar Nagar, Kondhwa, with private consultation rooms and a spacious therapy hall."
        />
        <ul className="mt-12 grid auto-rows-[170px] grid-cols-2 gap-3 [grid-auto-flow:dense] md:auto-rows-[220px] md:grid-cols-4 md:gap-4">
          {photos.map((p, i) => (
            <li key={p.name} className={p.span}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block h-full w-full overflow-hidden rounded-[22px] bg-[#E9EEF6] text-left"
                  aria-label={`View photo: ${p.caption}`}
                >
                  <Photo
                    name={p.name}
                    widths={[640, 1280]}
                    sizes={p.span.includes('col-span-2') ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'}
                    alt={p.alt}
                    imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#0B1730]/70 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="font-hero absolute bottom-3 left-3 right-3 text-[13px] font-semibold text-white md:bottom-4 md:left-4 md:text-sm">{p.caption}</span>
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-[#0E1E3D] opacity-0 transition-opacity group-hover:opacity-100">
                    <Expand size={15} aria-hidden="true" />
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onNav={nav} />}</AnimatePresence>
    </section>
  );
}
