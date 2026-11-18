import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { telHref, whatsappHref } from '../config/clinic';
import { BookLink } from './Booking';

/**
 * Phones & tablets: a slim bar fixed to the bottom with Call · WhatsApp · Book.
 * Appears after the first screen and hides while the booking form is on screen.
 */
export function MobileActionBar() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const update = () => {
      const book = document.getElementById('book') ?? document.getElementById('corp-enquiry');
      let bookVisible = false;
      if (book) {
        const r = book.getBoundingClientRect();
        bookVisible = r.top < window.innerHeight * 0.85 && r.bottom > 0;
      }
      setShow(window.scrollY > window.innerHeight * 0.6 && !bookVisible);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const bookCls = 'font-hero flex h-12 items-center justify-center gap-1.5 rounded-full bg-[#2463EB] text-sm font-bold text-white active:bg-[#1D4FD8]';

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          aria-label="Quick contact"
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.35fr] gap-2 rounded-full bg-white/95 p-1.5 shadow-[0_12px_32px_-10px_rgba(14,30,61,.45)] ring-1 ring-[#E6EBF3] backdrop-blur">
            <a href={telHref} className="font-hero flex h-12 items-center justify-center gap-1.5 rounded-full text-sm font-bold text-[#0E1E3D] active:bg-[#F4F7FC]">
              <Phone size={17} aria-hidden="true" /> Call
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-hero flex h-12 items-center justify-center gap-1.5 rounded-full text-sm font-bold text-[#0E1E3D] active:bg-[#F4F7FC]">
              <MessageCircle size={17} className="text-[#25D366]" aria-hidden="true" /> WhatsApp
            </a>
            {pathname === '/corporate' ? (
              <Link to="/corporate#corp-enquiry" className={bookCls}>
                <CalendarCheck size={17} aria-hidden="true" /> Book
              </Link>
            ) : (
              <BookLink className={bookCls}>
                <CalendarCheck size={17} aria-hidden="true" /> Book
              </BookLink>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
