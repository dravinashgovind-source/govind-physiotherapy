import { Hero } from '../sections/Hero';
import { Conditions } from '../sections/Conditions';
import { Services } from '../sections/Services';
import { Approach } from '../sections/Approach';
import { Doctor } from '../sections/Doctor';
import { Technology } from '../sections/Technology';
import { ClinicTour } from '../sections/ClinicTour';
import { Videos } from '../sections/Videos';
import { CorporateTeaser } from '../sections/CorporateTeaser';
import { Reviews } from '../sections/Reviews';
import { Clinic } from '../sections/Clinic';
import { Faq, faqs } from '../sections/Faq';
import { FinalCta } from '../sections/FinalCta';
import { localBusinessJsonLd, useSeo } from '../lib/seo';

export default function Home() {
  useSeo({
    title: 'Govind’s Advanced Pain Management & Physiotherapy Centre | Physiotherapy in Kondhwa, Pune',
    description:
      'Assessment-based physiotherapy and pain management with Dr. Avinash Govind in Tilekar Nagar, Kondhwa, Pune. Rated 5.0 on Google. Back, neck, knee, sports, post-surgery and paediatric physiotherapy.',
    path: '/',
    jsonLd: [
      localBusinessJsonLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  });
  return (
    <>
      <Hero />
      <Conditions />
      <Services />
      <Approach />
      <Doctor />
      <Technology />
      <ClinicTour />
      <Videos />
      <CorporateTeaser />
      <Reviews />
      <Clinic />
      <Faq />
      <FinalCta />
    </>
  );
}
