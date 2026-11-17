import { useState } from 'react';
import { Accessibility, Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { clinic, telHref, whatsappHref } from '../config/clinic';

function MapEmbed() {
  // Loads Google Maps only on request: faster page and no third-party cookies before the visitor chooses.
  const [show, setShow] = useState(false);
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden md:min-h-[380px] rounded-[28px] bg-[#E9EEF6]">
      {show ? (
        <iframe title="Map showing Govind’s Physiotherapy in Tilekar Nagar, Kondhwa" src={clinic.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4"
          style={{
            backgroundImage:
              'linear-gradient(#dbe3ef 1px, transparent 1px), linear-gradient(90deg, #dbe3ef 1px, transparent 1px), radial-gradient(circle at 50% 50%, #f4f7fc, #e9eef6)',
            backgroundSize: '40px 40px, 40px 40px, 100% 100%',
          }}
        >
          <span className="relative grid size-16 place-items-center rounded-full bg-[#2463EB] text-white shadow-[0_16px_30px_-10px_rgba(36,99,235,.9)] transition-transform group-hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#2463EB]/40 motion-reduce:animate-none" />
            <MapPin size={28} aria-hidden="true" />
          </span>
          <span className="font-hero rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#0E1E3D] shadow-md">Show map</span>
        </button>
      )}
    </div>
  );
}

export function Clinic() {
  const a = clinic.address;
  const rows = [
    { icon: MapPin, title: 'Address', body: `${a.line1}, ${a.line2}, ${a.locality}, ${a.city} ${a.postalCode}` },
    { icon: Clock, title: 'Hours', body: `${clinic.hours.summary}${clinic.hours.confirmed ? '' : ' · please call to confirm days'}` },
    { icon: Phone, title: 'Phone', body: clinic.phone.display, href: telHref },
    ...(clinic.wheelchairAccessible ? [{ icon: Accessibility, title: 'Access', body: 'Wheelchair-accessible entrance' }] : []),
  ];
  return (
    <section id="clinic" aria-labelledby="clinic-title" className="bg-[#F4F7FC] py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <SectionHeading id="clinic-title" eyebrow="Visit us" light="Find us in" bold="Kondhwa, Pune." sub="Near ISKCON NVCC Road, next to Gagan Unnati, Tilekar Nagar." />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="h-full rounded-[28px] bg-white p-7 shadow-[0_20px_44px_-34px_rgba(14,30,61,.5)] md:p-9">
              <ul className="space-y-6">
                {rows.map(({ icon: Icon, title, body, href }) => (
                  <li key={title} className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#2463EB]/10 text-[#1D4FD8]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-hero block text-xs font-bold uppercase tracking-[0.12em] text-[#3B4A63]/70">{title}</span>
                      {href ? (
                        <a href={href} className="font-hero mt-0.5 inline-block py-1.5 text-lg font-bold text-[#0E1E3D] hover:text-[#1D4FD8]">
                          {body}
                        </a>
                      ) : (
                        <span className="mt-0.5 block leading-relaxed text-[#0E1E3D]">{body}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <a href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2463EB] text-sm font-bold text-white hover:bg-[#1D4FD8]">
                  <Navigation size={16} aria-hidden="true" /> Directions
                </a>
                <a href={telHref} className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D5DEEC] text-sm font-bold text-[#0E1E3D] hover:border-[#2463EB]">
                  <Phone size={16} aria-hidden="true" /> Call
                </a>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#D5DEEC] text-sm font-bold text-[#0E1E3D] hover:border-[#25D366]">
                  <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.08}>
            <MapEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
