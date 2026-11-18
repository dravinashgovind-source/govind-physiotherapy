import { createContext, useCallback, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { clinic, telHref } from '../config/clinic';

type OpenBooking = (preset?: string) => void;
const BookingCtx = createContext<OpenBooking>(() => {});

/** Opens the site-wide booking popup, optionally with a concern pre-selected. */
export const useBooking = () => useContext(BookingCtx);

const ease = [0.16, 1, 0.3, 1] as const;

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; preset?: string; n: number }>({ open: false, n: 0 });
  const open = useCallback<OpenBooking>((preset) => setState((s) => ({ open: true, preset, n: s.n + 1 })), []);
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), []);
  return (
    <BookingCtx.Provider value={open}>
      {children}
      <BookingModal open={state.open} preset={state.preset} formKey={state.n} onClose={close} />
    </BookingCtx.Provider>
  );
}

function BookingModal({ open, preset, formKey, onClose }: { open: boolean; preset?: string; formKey: number; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Focus the first field so the visitor can start typing straight away.
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('input')?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>('a[href], button, input, select, textarea')].filter((el) => !el.hasAttribute('disabled'));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[#020817]/55 backdrop-blur-sm md:items-center md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[30px] bg-white px-5 pb-[max(28px,env(safe-area-inset-bottom))] pt-3 shadow-[0_30px_80px_-20px_rgba(2,8,23,.5)] md:max-w-[460px] md:rounded-[30px] md:px-7 md:pb-7 md:pt-6"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.42, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1.5 w-11 rounded-full bg-[#DCE3EE] md:hidden" aria-hidden="true" />
            <div className="mb-5 mt-4 flex items-start justify-between gap-4 md:mt-0">
              <div>
                <h2 id="booking-title" className="font-hero text-xl font-extrabold text-[#0E1E3D] md:text-2xl">
                  Book appointment
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#3B4A63]">
                  <MessageCircle size={14} className="text-[#25D366]" aria-hidden="true" /> Sent to the clinic on WhatsApp
                </p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F4F7FC] text-[#0E1E3D] hover:bg-[#E9EEF7]">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <BookingForm key={formKey} preset={preset} formLabel="Quick booking form" />
            <a href={telHref} className="font-hero mt-4 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-[#1D4FD8]">
              <Phone size={15} aria-hidden="true" /> Prefer to call? {clinic.phone.display}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A "Book" link that opens the booking popup. It is still a real link to the
 * form on the home page, so it works before JavaScript loads and with
 * Ctrl/Cmd-click.
 */
export function BookLink({
  preset,
  onOpen,
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { preset?: string; onOpen?: () => void }) {
  const open = useBooking();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onOpen?.();
    open(preset);
  };
  return (
    <a href="/#book" {...rest} onClick={onClick}>
      {children}
    </a>
  );
}
