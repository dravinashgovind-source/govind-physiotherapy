import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import { clinic, telHref } from '../config/clinic';
import { BookLink } from './Booking';

const links = [
  { href: '/#services', label: 'Services' },
  { href: '/#conditions', label: 'Conditions' },
  { href: '/#doctor', label: 'Doctor' },
  { href: '/corporate', label: 'Corporate' },
  { href: '/#patients', label: 'Reviews' },
  { href: '/#clinic', label: 'Contact' },
];

/** Floating white "pill" header (art direction: FlexifyMe reference). */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>('a, button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      btnRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#0E1E3D] focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className={`font-nav mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-6 rounded-full bg-white pl-6 pr-3 transition-shadow duration-300 md:h-[68px] md:pl-8 md:pr-4 ${
          scrolled || open ? 'shadow-[0_10px_30px_-12px_rgba(14,30,61,.22)]' : 'shadow-[0_6px_24px_-14px_rgba(14,30,61,.18)]'
        }`}
      >
        <Link to="/" aria-label={`${clinic.name}, home`} className="shrink-0">
          <Logo />
        </Link>

        <div className="flex items-center gap-2 lg:gap-9">
          <ul className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className="text-[15px] text-[#111827] transition-colors hover:text-[#2463EB]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <BookLink
            className="hidden h-12 items-center rounded-full bg-[#2463EB] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#1D4FD8] sm:inline-flex"
          >
            Book Appointment
          </BookLink>
          <a href={telHref} className="hidden items-center gap-1.5 px-2 text-[15px] text-[#2463EB] hover:text-[#1D4FD8] md:inline-flex" aria-label={`Call the clinic on ${clinic.phone.display}`}>
            <Phone size={15} aria-hidden="true" /> Call Us
          </a>

          <button
            ref={btnRef}
            type="button"
            className="grid size-11 place-items-center rounded-full text-[#111827] hover:bg-[#F2F5FB] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="font-nav mx-auto mt-2 max-w-[1320px] rounded-[28px] bg-white p-3 shadow-[0_20px_40px_-16px_rgba(14,30,61,.3)] lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="block rounded-2xl px-4 py-3.5 text-[17px] text-[#111827] hover:bg-[#F2F5FB]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid gap-2 border-t border-[#EEF1F6] p-2 pt-4">
              <BookLink onOpen={() => setOpen(false)} className="flex h-12 items-center justify-center rounded-full bg-[#2463EB] text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                Book Appointment
              </BookLink>
              <a href={telHref} className="flex h-12 items-center justify-center gap-2 rounded-full text-[15px] text-[#2463EB]">
                <Phone size={16} aria-hidden="true" /> Call {clinic.phone.display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
