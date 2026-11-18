import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import Home from './pages/Home';
import { BookingProvider } from './components/Booking';

const Service = lazy(() => import('./pages/Service'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Corporate = lazy(() => import('./pages/Corporate'));
const AppPage = lazy(() => import('./pages/AppPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Scrolls to #hash targets after navigation, or to the top for new pages. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let tries = 0;
      const attempt = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        else if (tries++ < 20) setTimeout(attempt, 50);
      };
      attempt();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function PageLoading() {
  return (
    <div role="status" aria-live="polite" className="grid min-h-[70vh] place-items-center pt-[100px]">
      <span className="flex flex-col items-center gap-4">
        <span className="size-10 animate-spin rounded-full border-[3px] border-[#2463EB]/20 border-t-[#2463EB] motion-reduce:animate-none" aria-hidden="true" />
        <span className="font-hero text-sm font-semibold text-[#3B4A63]">Loading…</span>
      </span>
    </div>
  );
}

export default function App() {
  // On /app, phones get a full-screen app: hide the website header, footer and quick-contact bar there.
  const { pathname } = useLocation();
  const siteChrome = pathname === '/app' ? 'max-md:hidden' : 'contents';
  return (
    <BookingProvider>
      <ScrollManager />
      <div className={siteChrome}>
        <Nav />
      </div>
      <main id="main">
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<Service />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <div className={siteChrome}>
        <Footer />
        <MobileActionBar />
      </div>
    </BookingProvider>
  );
}
