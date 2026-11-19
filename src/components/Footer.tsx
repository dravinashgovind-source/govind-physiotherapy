import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock, Heart, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Logo } from './Logo';
import { GoogleG } from './GoogleG';
import { clinic, fullAddress, telHref, whatsappHref } from '../config/clinic';
import { regions } from '../content/regions';
import { facebookPage, instagramProfile, youtubeChannel } from '../content/media';

const socialPill = 'font-hero inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#0E1E3D] shadow-sm hover:shadow-md';

const quickLinks = [
  { to: '/#services', label: 'Services' },
  { to: '/#conditions', label: 'Conditions' },
  { to: '/#approach', label: 'Our Approach' },
  { to: '/#doctor', label: 'Dr. Avinash Govind' },
  { to: '/corporate', label: 'Corporate Wellness' },
  { to: '/#patients', label: 'Reviews' },
  { to: '/#faq', label: 'FAQ' },
  { to: '/app', label: 'Get the App' },
];

function Heading({ children }: { children: string }) {
  return <h2 className="font-hero text-xs font-bold uppercase tracking-[0.14em] text-[#0E1E3D]/45">{children}</h2>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F4F7FC] pb-20 pt-16 md:pt-20 lg:pb-0">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-4">
            <Logo full />
            <p className="mt-6 max-w-sm leading-relaxed text-[#3B4A63]">
              Assessment-based physiotherapy and non-surgical pain management in Kondhwa, Pune. Helping you move better and live better.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={clinic.google.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-hero inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#0E1E3D] shadow-sm hover:shadow-md"
              >
                <GoogleG size={18} /> {clinic.google.rating.toFixed(1)} ★ on Google
              </a>
              <a
                href={youtubeChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="font-hero inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-[#0E1E3D] shadow-sm hover:shadow-md"
              >
                <svg width="20" height="14" viewBox="0 0 28 20" aria-hidden="true">
                  <rect width="28" height="20" rx="5" fill="#E62117" />
                  <path d="M11.5 6v8l7-4z" fill="#fff" />
                </svg>
                YouTube
              </a>
              <a href={facebookPage} target="_blank" rel="noopener noreferrer" className={socialPill}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path d="M15.12 15.47 15.65 12h-3.32V9.75c0-.95.46-1.87 1.95-1.87h1.51V4.93s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.66V12H5.53v3.47h3.05V24a12.1 12.1 0 0 0 3.75 0v-8.53z" fill="#fff" />
                </svg>
                Facebook
              </a>
              <a href={instagramProfile} target="_blank" rel="noopener noreferrer" className={socialPill}>
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                  <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
                      <stop offset="0" stopColor="#FDF497" />
                      <stop offset=".05" stopColor="#FDF497" />
                      <stop offset=".45" stopColor="#FD5949" />
                      <stop offset=".6" stopColor="#D6249F" />
                      <stop offset=".9" stopColor="#285AEB" />
                    </radialGradient>
                  </defs>
                  <rect width="24" height="24" rx="6.5" fill="url(#ig-grad)" />
                  <rect x="5.5" y="5.5" width="13" height="13" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.8" />
                  <circle cx="16.1" cy="7.9" r="1" fill="#fff" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="lg:col-span-2">
            <Heading>Explore</Heading>
            <ul className="mt-3 md:mt-5 md:space-y-3">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block py-2.5 text-[#0E1E3D] transition-colors hover:text-[#1D4FD8] md:py-0">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Treatments */}
          <nav aria-label="Physiotherapy for" className="lg:col-span-2">
            <Heading>Pain we treat</Heading>
            <ul className="mt-3 md:mt-5 md:space-y-3">
              {regions.map((r) => (
                <li key={r.id}>
                  <Link to={`/services/${r.slug}`} className="inline-block py-2.5 text-[#0E1E3D] transition-colors hover:text-[#1D4FD8] md:py-0">
                    {r.label} pain
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-4">
            <Heading>Visit or call</Heading>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <MapPin size={19} className="mt-0.5 shrink-0 text-[#2463EB]" aria-hidden="true" />
                <address className="not-italic leading-relaxed text-[#0E1E3D]">{fullAddress}</address>
              </li>
              <li className="flex gap-3">
                <Phone size={19} className="mt-0.5 shrink-0 text-[#2463EB]" aria-hidden="true" />
                <a href={telHref} className="font-hero inline-block py-2 font-bold text-[#0E1E3D] hover:text-[#1D4FD8] md:py-0">
                  {clinic.phone.display}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock size={19} className="mt-0.5 shrink-0 text-[#2463EB]" aria-hidden="true" />
                <span className="text-[#0E1E3D]">
                  {clinic.hours.summary}
                  {!clinic.hours.confirmed && <span className="block text-sm text-[#3B4A63]/70">Please call to confirm days</span>}
                </span>
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white hover:bg-[#1EBE5A]">
                <MessageCircle size={17} aria-hidden="true" /> WhatsApp
              </a>
              <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex h-11 items-center gap-2 rounded-full border border-[#D5DEEC] bg-white px-5 text-sm font-bold text-[#0E1E3D] hover:border-[#2463EB]">
                Directions <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#DCE4F2] py-7 text-sm text-[#3B4A63]/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="inline-block py-2 hover:text-[#0E1E3D] md:py-0">Privacy</Link>
            <span>Information on this site is general and not a diagnosis.</span>
            <a href="https://cliniko.in" target="_blank" rel="noopener" className="inline-flex items-center gap-1 py-2 hover:text-[#0E1E3D] md:py-0">
              Made with <Heart size={13} className="fill-[#E5484D] text-[#E5484D]" aria-label="love" /> by <span className="font-semibold text-[#0E1E3D]">cliniko.in</span>
            </a>
          </p>
        </div>
      </div>

      {/* Oversized wordmark */}
      <p aria-hidden="true" className="font-brand pointer-events-none -mb-[0.2em] select-none text-center text-[17vw] font-bold leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_#D5DEEC]">
        GOVIND’S
      </p>
    </footer>
  );
}
