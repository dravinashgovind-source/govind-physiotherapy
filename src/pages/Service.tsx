import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, ChevronRight, ClipboardCheck, HandHeart, Info, MessageCircle, Phone, Star } from 'lucide-react';
import { regionBySlug, regions } from '../content/regions';
import { googleReviews } from '../content/media';
import { Photo } from '../components/Photo';
import { Reveal } from '../components/Reveal';
import { SectionHeading, btnPrimary } from '../components/SectionHeading';
import { absoluteUrl, localBusinessJsonLd, useSeo } from '../lib/seo';
import { clinic, telHref, whatsappHref } from '../config/clinic';
import NotFound from './NotFound';

const ease = [0.16, 1, 0.3, 1] as const;

/** Photo per area: the studio "pain region" photos; hip has none, so it uses the senior-care image. */
const heroImage: Record<string, { name: string; widths: number[]; alt?: string }> = {
  neck: { name: 'neck', widths: [800, 1600, 2400] },
  shoulder: { name: 'shoulder', widths: [800, 1600, 2400] },
  back: { name: 'back', widths: [800, 1600, 2400] },
  knee: { name: 'knee', widths: [800, 1600, 2400] },
  ankle: { name: 'ankle', widths: [800, 1600, 2400] },
  hip: { name: 'svc-senior', widths: [800, 1600], alt: 'An older man doing a supported sit-to-stand exercise with a physiotherapist.' },
};

/** Real Google reviews that mention this area (matched by the review's tag). */
const reviewTags: Record<string, string[]> = {
  neck: [],
  shoulder: ['Shoulder'],
  back: ['Lower back', 'Back & leg pain'],
  hip: [],
  knee: [],
  ankle: [],
};

export default function Service() {
  const { slug = '' } = useParams();
  const region = regionBySlug[slug];
  const reduce = useReducedMotion();
  const path = `/services/${slug}`;
  const img = region ? heroImage[region.id] : undefined;

  useSeo({
    title: region ? `${region.title} | Govind’s Advanced Pain Management & Physiotherapy Centre` : 'Page not found',
    description: region?.metaDescription ?? '',
    path,
    image: img ? `/img/${img.name}-1600.webp` : undefined,
    noindex: !region,
    jsonLd: region
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'MedicalWebPage',
            name: region.title,
            description: region.metaDescription,
            about: { '@type': 'AnatomicalStructure', name: region.label },
            publisher: localBusinessJsonLd(),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: `${region.label} pain`, item: absoluteUrl(path) },
            ],
          },
        ]
      : [],
  });

  if (!region || !img) return <NotFound />;
  const others = regions.filter((r) => r.id !== region.id);
  const reviews = googleReviews.filter((r) => reviewTags[region.id]?.includes(r.tag));
  const quote = reviews[0] ?? googleReviews.find((r) => r.tag === 'Personalised care')!;
  const rise = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

  return (
    <article>
      {/* Hero */}
      <header className="relative overflow-hidden bg-white pb-16 pt-[110px] md:pb-24 md:pt-[130px]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-10 size-[560px] rounded-full bg-[#EEF3FD] blur-3xl" />
        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-4 md:px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.nav {...rise(0)} aria-label="Breadcrumb" className="font-hero flex items-center gap-1.5 text-sm text-[#3B4A63]">
              <Link to="/" className="inline-block py-2.5 hover:text-[#1D4FD8]">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link to="/#services" className="inline-block py-2.5 hover:text-[#1D4FD8]">Services</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page" className="font-semibold text-[#0E1E3D]">{region.label} pain</span>
            </motion.nav>
            <motion.h1 {...rise(0.1)} className="font-hero mt-6 text-[clamp(2.5rem,4.6vw,4.6rem)] leading-[1.06] tracking-[-0.025em] text-[#0E1E3D]">
              <span className="block font-normal">{region.label} pain?</span>
              <span className="block font-extrabold">Let’s get you moving.</span>
            </motion.h1>
            <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-[#3B4A63]">
              {region.about}
            </motion.p>
            <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/#book" className={btnPrimary}>
                Book assessment <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href={telHref} className="font-hero inline-flex h-12 items-center gap-2 px-4 font-semibold text-[#0E1E3D] hover:text-[#1D4FD8]">
                <Phone size={17} aria-hidden="true" /> {clinic.phone.display}
              </a>
            </motion.div>
            <motion.div {...rise(0.4)} className="font-hero mt-8 flex items-center gap-2 text-sm font-semibold text-[#3B4A63]">
              <span className="flex gap-0.5 text-[#FBBC04]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-current" strokeWidth={0} />
                ))}
              </span>
              {clinic.google.rating.toFixed(1)} on Google · {clinic.ownerStatements.patientsTreated} patients treated
            </motion.div>
          </div>
          <motion.div {...rise(0.15)} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[32px] bg-[#E6EBF3] shadow-[0_40px_80px_-44px_rgba(14,30,61,.5)]">
              <Photo name={img.name} widths={img.widths} priority sizes="(min-width:1024px) 50vw, 100vw" alt={img.alt ?? region.imageAlt} imgClassName="aspect-[3/2] w-full object-cover" />
              <div className="font-hero absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#0E1E3D] shadow-sm backdrop-blur">
                <span className="size-2.5 rounded-full bg-[#F26A2E]" aria-hidden="true" /> {region.romCaption}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Difficulties + assessment */}
      <section aria-labelledby="sv-signs" className="bg-[#F4F7FC] py-16 md:py-28">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <SectionHeading id="sv-signs" eyebrow="Sound familiar?" light="Everyday movements" bold="people find difficult." />
          <div className="mt-12 grid gap-5 lg:grid-cols-12">
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {region.difficulties.map((d, i) => (
                <li key={d}>
                  <Reveal delay={i * 0.05} className="h-full">
                    <div className="flex h-full items-start gap-4 rounded-[24px] bg-white p-6 shadow-[0_14px_34px_-26px_rgba(14,30,61,.35)]">
                      <span className="font-hero grid size-10 shrink-0 place-items-center rounded-xl bg-[#2463EB]/10 font-extrabold text-[#1D4FD8]">0{i + 1}</span>
                      <p className="font-hero pt-1.5 font-semibold text-[#0E1E3D]">{d}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="h-full rounded-[28px] bg-[#0E1E3D] p-8 text-white">
                <ClipboardCheck size={28} className="text-[#8FB3F7]" aria-hidden="true" />
                <h3 className="font-hero mt-5 text-2xl font-extrabold">What your assessment looks at</h3>
                <ul className="mt-6 space-y-3.5">
                  {region.assessment.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-white/85">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#2463EB]">
                        <Check size={13} strokeWidth={3} aria-hidden="true" />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Treatment */}
      <section aria-labelledby="sv-care" className="bg-white py-16 md:py-28">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 md:px-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeading id="sv-care" eyebrow="How we help" light="Your personalised" bold="treatment plan." sub="After the assessment, your plan may include some of the following, chosen for your condition, goals and pace." />
            <ul className="mt-9 grid gap-3 sm:grid-cols-2">
              {region.care.map((c, i) => (
                <li key={c}>
                  <Reveal delay={i * 0.05}>
                    <div className="flex items-center gap-3 rounded-2xl border border-[#E6EBF3] px-5 py-4">
                      <HandHeart size={20} className="shrink-0 text-[#2463EB]" aria-hidden="true" />
                      <span className="font-hero font-semibold text-[#0E1E3D]">{c}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-8 flex gap-3 rounded-2xl bg-[#FFF6EF] p-5 text-sm leading-relaxed text-[#6B4A33]">
              <Info size={18} className="mt-0.5 shrink-0 text-[#F26A2E]" aria-hidden="true" />
              This page is general information, not a diagnosis. If you have severe or worsening symptoms, numbness, loss of bladder or bowel control, or
              pain after a fall or accident, please seek urgent medical care.
            </p>
          </div>

          {/* Review + booking */}
          <div className="space-y-5 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <figure className="rounded-[28px] bg-[#F4F7FC] p-8">
                <span className="flex gap-0.5 text-[#FBBC04]" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={17} className="fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                </span>
                <blockquote className="font-hero mt-4 text-lg font-medium leading-relaxed text-[#0E1E3D]">“{quote.text}”</blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-[#3B4A63]">{quote.name} · Google review</figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="lg:sticky lg:top-28 rounded-[28px] bg-[#0E1E3D] p-8 text-white">
                <p className="font-hero text-sm font-semibold text-[#8FB3F7]">Book an assessment</p>
                <p className="font-hero mt-2 text-2xl font-extrabold">Your next move starts here.</p>
                <p className="mt-2 text-sm text-white/65">
                  {clinic.address.locality}, {clinic.address.city} · {clinic.hours.summary}
                </p>
                <div className="mt-6 grid gap-2.5">
                  <a href={telHref} className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#2463EB] font-bold hover:bg-[#1D4FD8]">
                    <Phone size={17} aria-hidden="true" /> {clinic.phone.display}
                  </a>
                  <a
                    href={whatsappHref(`Hello, I would like to book an assessment for ${region.label.toLowerCase()} pain.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-hero inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] font-bold hover:bg-[#1EBE5A]"
                  >
                    <MessageCircle size={17} aria-hidden="true" /> WhatsApp us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Other areas */}
      <nav aria-labelledby="sv-other" className="bg-[#F4F7FC] py-20 md:py-24">
        <div className="mx-auto max-w-[1320px] px-4 md:px-6">
          <SectionHeading id="sv-other" eyebrow="Other areas we treat" light="Explore" bold="more conditions." />
          <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {others.map((o) => (
              <li key={o.id}>
                <Link
                  to={`/services/${o.slug}`}
                  className="group flex items-center justify-between rounded-2xl bg-white px-5 py-5 shadow-[0_10px_28px_-24px_rgba(14,30,61,.4)] transition-shadow hover:shadow-[0_16px_34px_-22px_rgba(14,30,61,.45)]"
                >
                  <span className="font-hero text-lg font-bold text-[#0E1E3D]">{o.label} pain</span>
                  <ArrowUpRight size={18} className="text-[#2463EB] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </article>
  );
}
