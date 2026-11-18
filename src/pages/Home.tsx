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
import { Faq } from '../sections/Faq';
import { FinalCta } from '../sections/FinalCta';
import { useSeo } from '../lib/seo';

export default function Home() {
  useSeo('/');
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
