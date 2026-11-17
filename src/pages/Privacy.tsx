import { Link } from 'react-router-dom';
import { ChevronRight, FileText, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { clinic, fullAddress, telHref } from '../config/clinic';
import { useSeo } from '../lib/seo';

const blocks = [
  {
    icon: ShieldCheck,
    title: 'Nothing is stored on this website',
    text: 'The appointment and corporate enquiry forms do not save your details. When you press send, your browser opens WhatsApp with a pre-written message to the clinic, and nothing is sent until you press send inside WhatsApp.',
  },
  {
    icon: MessageCircle,
    title: 'How we use your enquiry',
    text: 'Once you send the message, the clinic receives your name, phone number and the details you include. We use them only to reply to your enquiry and arrange your appointment.',
  },
  {
    icon: MapPin,
    title: 'Google Maps & YouTube',
    text: 'The map and the patient videos load from Google and YouTube only when you click on them. Those services, and the Google review and channel links, are covered by Google’s own privacy policy.',
  },
  {
    icon: FileText,
    title: 'Medical records',
    text: 'Please don’t send detailed medical records through the website or WhatsApp. Bring your reports, X-rays or scans to your assessment instead.',
  },
];

export default function Privacy() {
  useSeo({
    title: 'Privacy | Govind’s Advanced Pain Management & Physiotherapy Centre',
    description: `How ${clinic.shortName} handles information you share through this website.`,
    path: '/privacy',
  });
  return (
    <>
      <section className="relative overflow-hidden bg-white pb-14 pt-[120px] md:pt-[140px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[#EEF3FD] blur-3xl" />
        <div className="relative mx-auto max-w-[920px] px-4 md:px-6">
          <nav aria-label="Breadcrumb" className="font-hero flex items-center gap-1.5 text-sm text-[#3B4A63]">
            <Link to="/" className="hover:text-[#1D4FD8]">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" className="font-semibold text-[#0E1E3D]">Privacy</span>
          </nav>
          <h1 className="font-hero mt-6 text-[clamp(2.5rem,4.6vw,4.4rem)] leading-[1.06] tracking-[-0.025em] text-[#0E1E3D]">
            <span className="font-normal">Your privacy, </span>
            <span className="font-extrabold">simply explained.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#3B4A63]">How {clinic.shortName} handles the information you share through this website.</p>
        </div>
      </section>
      <section className="bg-[#F4F7FC] py-16 md:py-20">
        <div className="mx-auto max-w-[920px] space-y-4 px-4 md:px-6">
          {blocks.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-5 rounded-[24px] bg-white p-6 shadow-[0_14px_34px_-26px_rgba(14,30,61,.35)] md:p-8">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#2463EB]/10 text-[#1D4FD8]">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-hero text-xl font-bold text-[#0E1E3D]">{title}</h2>
                <p className="mt-2 leading-relaxed text-[#3B4A63]">{text}</p>
              </div>
            </div>
          ))}
          <div className="rounded-[24px] bg-[#0E1E3D] p-6 text-white md:p-8">
            <h2 className="font-hero text-xl font-bold">Questions about your information?</h2>
            <p className="mt-2 leading-relaxed text-white/75">
              Call us on{' '}
              <a href={telHref} className="font-bold text-white underline-offset-4 hover:underline">
                {clinic.phone.display}
              </a>{' '}
              or visit us at {fullAddress}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
