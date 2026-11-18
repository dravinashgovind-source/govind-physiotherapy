/**
 * Single source of truth for every page's SEO: title, description, social image
 * and structured data (schema.org JSON-LD).
 *
 * Used in two places:
 *  - in the browser by useSeo() when the visitor navigates, and
 *  - at build time by scripts/prerender.mjs, which writes the same tags into
 *    each page's static HTML so Google and AI crawlers see them without JavaScript.
 *
 * Only verified clinic facts from src/config/clinic.ts are used. Nothing here
 * should claim anything the clinic has not confirmed.
 */
import { clinic, fullAddress } from '../config/clinic';
import { regions, regionBySlug, type Region } from '../content/regions';
import { services, moreServices } from '../content/services';
import { videos, youtubeChannel } from '../content/media';
import { faqs } from '../content/faqs';

export interface SeoPage {
  path: string;
  title: string;
  description: string;
  image: string;
  jsonLd: object[];
  noindex?: boolean;
  /** Sitemap hints. */
  priority?: number;
  changefreq?: 'weekly' | 'monthly' | 'yearly';
}

export const SITE = clinic.siteUrl;
const BRAND_SHORT = 'Govind’s Physiotherapy';
export const abs = (p: string) => (p.startsWith('http') ? p : SITE + p);

/* ------------------------------------------------------------------ shared graph nodes */

const ID = {
  website: `${SITE}/#website`,
  clinic: `${SITE}/#clinic`,
  avinash: `${SITE}/#dr-avinash-govind`,
  preeti: `${SITE}/#dr-preeti-govind`,
  logo: `${SITE}/#logo`,
};

const credentials = (quals: readonly string[]) =>
  quals.map((q) => ({ '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: q }));

const clinicPhotos = ['clinic-entrance-wide', 'clinic-therapy-hall', 'clinic-treatment', 'clinic-reception', 'clinic-waiting'].map((n) => abs(`/img/${n}-1280.webp`));

/** Treatments listed on the website, as MedicalTherapy entries. */
const therapies = [
  ...services.map((s) => ({ '@type': 'MedicalTherapy', name: s.title, description: s.short })),
  ...regions.map((r) => ({ '@type': 'MedicalTherapy', name: r.title.replace(/ in Kondhwa, Pune$/, ''), url: abs(`/services/${r.slug}`) })),
];

const conditionsTreated = [
  'Back pain',
  'Sciatica',
  'Slip disc',
  'Neck pain',
  'Cervical spondylosis',
  'Frozen shoulder',
  'Shoulder pain',
  'Knee pain',
  'Knee osteoarthritis',
  'Hip pain',
  'Ankle sprain',
  'Heel pain and plantar fasciitis',
  'Sports injuries',
  'Post-surgery rehabilitation',
  'Posture problems',
];

function clinicNode() {
  return {
    '@type': ['MedicalClinic', 'Physiotherapy'],
    '@id': ID.clinic,
    name: clinic.name,
    alternateName: [clinic.shortName, clinic.googleName, 'Govind Physiotherapy', 'Dr. Avinash Govind Physiotherapy Clinic'],
    description:
      'Assessment-based physiotherapy and pain management clinic in Tilekar Nagar, Kondhwa, Pune, led by Dr. Avinash Govind (B.P.Th., M.P.Th. Orthopedics) and Dr. Preeti A. Govind (B.P.Th., M.P.Th. Community Physiotherapy). Non-surgical care for back pain, sciatica, neck pain, knee pain, shoulder pain, sports injuries and post-surgery rehabilitation.',
    slogan: 'Spine Care • Pain Management • Rehabilitation',
    url: `${SITE}/`,
    logo: { '@type': 'ImageObject', '@id': ID.logo, url: abs('/img/logo-full.png'), caption: clinic.name },
    image: clinicPhotos,
    telephone: clinic.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.locality}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: clinic.geo.latitude, longitude: clinic.geo.longitude },
    hasMap: clinic.mapsUrl,
    sameAs: [youtubeChannel, clinic.mapsUrl],
    medicalSpecialty: ['https://schema.org/Physiotherapy', 'https://schema.org/Musculoskeletal'],
    availableService: therapies,
    knowsAbout: conditionsTreated,
    founder: { '@id': ID.avinash },
    employee: [{ '@id': ID.avinash }, { '@id': ID.preeti }],
    isAcceptingNewPatients: true,
    isAccessibleForFree: false,
    currenciesAccepted: 'INR',
    amenityFeature: clinic.wheelchairAccessible ? [{ '@type': 'LocationFeatureSpecification', name: 'Wheelchair accessible entrance', value: true }] : undefined,
    areaServed: [
      { '@type': 'Place', name: 'Kondhwa, Pune' },
      { '@type': 'Place', name: 'Tilekar Nagar, Pune' },
      { '@type': 'City', name: 'Pune' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: clinic.phone.e164,
      contactType: 'appointments',
      areaServed: 'IN',
    },
  };
}

function doctorNodes() {
  return [
    {
      '@type': 'Person',
      '@id': ID.avinash,
      name: clinic.doctor.name,
      honorificPrefix: 'Dr.',
      jobTitle: 'Consultant Physiotherapist',
      description: `${clinic.doctor.name} (PT), ${clinic.doctor.qualifications.join(', ')}, is the founder and consultant physiotherapist at ${clinic.name}, Kondhwa, Pune.`,
      image: abs('/img/dr-avinash-govind-800.webp'),
      hasCredential: credentials(clinic.doctor.qualifications),
      hasOccupation: { '@type': 'Occupation', name: 'Physiotherapist', occupationLocation: { '@type': 'City', name: 'Pune' } },
      knowsAbout: ['Orthopaedic physiotherapy', 'Pain management', 'Spine care', 'Rehabilitation', ...conditionsTreated.slice(0, 8)],
      worksFor: { '@id': ID.clinic },
      sameAs: [youtubeChannel],
    },
    {
      '@type': 'Person',
      '@id': ID.preeti,
      name: clinic.coConsultant.name,
      honorificPrefix: 'Dr.',
      jobTitle: clinic.coConsultant.role,
      hasCredential: credentials(clinic.coConsultant.qualifications),
      worksFor: { '@id': ID.clinic },
    },
  ];
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${SITE}/`,
    name: clinic.shortName,
    alternateName: ['Dr. Avinash Govind Physiotherapy', BRAND_SHORT],
    inLanguage: 'en-IN',
    publisher: { '@id': ID.clinic },
  };
}

function webPage(path: string, name: string, description: string, image: string, type = 'WebPage', extra: object = {}) {
  return {
    '@type': type,
    '@id': `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.clinic },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(image) },
    ...extra,
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

const graph = (...nodes: object[]) => [{ '@context': 'https://schema.org', '@graph': nodes }];

/* ------------------------------------------------------------------ pages */

const HOME_IMAGE = '/img/hero-care-1920.webp';

function home(): SeoPage {
  const title = 'Best Physiotherapy Clinic in Kondhwa, Pune | Dr. Avinash Govind';
  const description =
    'Rated 5.0 on Google: assessment-based physiotherapy & pain management by Dr. Avinash Govind (M.P.Th. Ortho) in Tilekar Nagar, Kondhwa, Pune. Back pain, sciatica, neck, knee, sports & post-surgery rehab.';
  return {
    path: '/',
    title,
    description,
    image: HOME_IMAGE,
    priority: 1,
    changefreq: 'weekly',
    jsonLd: graph(
      websiteNode(),
      clinicNode(),
      ...doctorNodes(),
      webPage('/', title, description, HOME_IMAGE, 'MedicalWebPage', {
        mainEntity: { '@id': ID.clinic },
        specialty: 'https://schema.org/Physiotherapy',
        audience: { '@type': 'Patient' },
      }),
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/#faq`,
        mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE}/#videos`,
        name: 'Patient recovery stories on YouTube',
        itemListElement: videos.map((v, i) => ({ '@type': 'ListItem', position: i + 1, name: v.title, url: `https://www.youtube.com/watch?v=${v.id}` })),
      },
    ),
  };
}

/** Condition-specific intro used in schema and llms.txt. */
const regionCondition: Record<string, string[]> = {
  neck: ['Neck pain', 'Neck stiffness', 'Cervical spondylosis'],
  shoulder: ['Shoulder pain', 'Frozen shoulder', 'Rotator cuff problems'],
  back: ['Lower back pain', 'Sciatica', 'Slip disc'],
  hip: ['Hip pain', 'Hip stiffness'],
  knee: ['Knee pain', 'Knee osteoarthritis'],
  ankle: ['Ankle sprain', 'Heel pain', 'Plantar fasciitis'],
};

const regionImage: Record<string, string> = {
  neck: '/img/neck-1600.webp',
  shoulder: '/img/shoulder-1600.webp',
  back: '/img/back-1600.webp',
  hip: '/img/svc-senior-1600.webp',
  knee: '/img/knee-1600.webp',
  ankle: '/img/ankle-1600.webp',
};

function servicePage(r: Region): SeoPage {
  const path = `/services/${r.slug}`;
  const title = `${r.title} | ${BRAND_SHORT}`;
  const image = regionImage[r.id] ?? HOME_IMAGE;
  return {
    path,
    title,
    description: r.metaDescription,
    image,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: graph(
      webPage(path, title, r.metaDescription, image, 'MedicalWebPage', {
        breadcrumb: { '@id': `${abs(path)}#breadcrumb` },
        specialty: 'https://schema.org/Physiotherapy',
        audience: { '@type': 'Patient' },
        publisher: { '@id': ID.clinic },
        about: (regionCondition[r.id] ?? [r.label]).map((name) => ({
          '@type': 'MedicalCondition',
          name,
          associatedAnatomy: { '@type': 'AnatomicalStructure', name: r.label },
          possibleTreatment: r.care.map((c) => ({ '@type': 'MedicalTherapy', name: c })),
        })),
        mainEntity: {
          '@type': 'MedicalTherapy',
          name: r.title.replace(/ in Kondhwa, Pune$/, ''),
          description: r.about,
          provider: { '@id': ID.clinic },
        },
      }),
      { ...breadcrumbs([{ name: 'Home', path: '/' }, { name: `${r.label} pain physiotherapy`, path }]), '@id': `${abs(path)}#breadcrumb` },
      {
        '@type': 'FAQPage',
        '@id': `${abs(path)}#faq`,
        mainEntity: r.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      { '@type': ['MedicalClinic', 'Physiotherapy'], '@id': ID.clinic, name: clinic.name, url: `${SITE}/`, telephone: clinic.phone.e164, address: clinicNode().address },
    ),
  };
}

function corporate(): SeoPage {
  const path = '/corporate';
  const title = 'Corporate Wellness & Workplace Physiotherapy in Pune | Govind’s';
  const description =
    'On-site physiotherapy camps, ergonomic assessments and back-care workshops for companies in Pune, by Govind’s Advanced Pain Management & Physiotherapy Centre, Kondhwa.';
  const image = '/img/corp-hero-1600.webp';
  return {
    path,
    title,
    description,
    image,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: graph(
      webPage(path, title, description, image, 'WebPage', { breadcrumb: { '@id': `${abs(path)}#breadcrumb` } }),
      { ...breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Corporate wellness', path }]), '@id': `${abs(path)}#breadcrumb` },
      {
        '@type': 'Service',
        name: 'Corporate Wellness Programme',
        serviceType: 'Workplace physiotherapy and ergonomics',
        description,
        areaServed: { '@type': 'City', name: 'Pune' },
        audience: { '@type': 'BusinessAudience', name: 'Companies and employers in Pune' },
        provider: { '@type': ['MedicalClinic', 'Physiotherapy'], '@id': ID.clinic, name: clinic.name, telephone: clinic.phone.e164 },
      },
    ),
  };
}

function appPage(): SeoPage {
  const path = '/app';
  const title = 'Govind’s Physiotherapy App | Book appointments, videos & reviews';
  const description =
    'The Govind’s Advanced Pain Management & Physiotherapy Centre app: book appointments on WhatsApp, explore services, watch patient stories and find the clinic. Add it to your home screen.';
  const image = '/img/app-hero-1600.webp';
  return {
    path,
    title,
    description,
    image,
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: graph(
      webPage(path, title, description, image),
      { ...breadcrumbs([{ name: 'Home', path: '/' }, { name: 'App', path }]) },
      {
        '@type': 'WebApplication',
        name: 'Govind’s Physiotherapy',
        url: abs(path),
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any (installable web app)',
        browserRequirements: 'Requires a modern web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        publisher: { '@id': ID.clinic },
      },
    ),
  };
}

function privacy(): SeoPage {
  const path = '/privacy';
  const title = `Privacy | ${clinic.shortName}`;
  const description = `How ${clinic.shortName} handles information you share through this website.`;
  return {
    path,
    title,
    description,
    image: HOME_IMAGE,
    priority: 0.2,
    changefreq: 'yearly',
    jsonLd: graph(webPage(path, title, description, HOME_IMAGE), breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Privacy', path }])),
  };
}

export const notFoundSeo: SeoPage = {
  path: '/404',
  title: `Page not found | ${clinic.shortName}`,
  description: 'This page could not be found.',
  image: HOME_IMAGE,
  jsonLd: [],
  noindex: true,
};

/** Every indexable page, in sitemap order. */
export const seoPages: SeoPage[] = [home(), ...regions.map(servicePage), corporate(), appPage(), privacy()];

export function seoFor(path: string): SeoPage {
  const clean = path.replace(/\/$/, '') || '/';
  const hit = seoPages.find((p) => p.path === clean);
  if (hit) return hit;
  const m = clean.match(/^\/services\/(.+)$/);
  if (m && regionBySlug[m[1]]) return servicePage(regionBySlug[m[1]]);
  return notFoundSeo;
}

/* ------------------------------------------------------------------ llms.txt (AI search) */

/** Plain-language summary for AI assistants and answer engines (https://llmstxt.org). */
export function llmsTxt() {
  const lines = [
    `# ${clinic.shortName}`,
    '',
    `> Physiotherapy and pain management clinic in Tilekar Nagar, Kondhwa, Pune, India, led by ${clinic.doctor.name} (${clinic.doctor.qualifications.join(', ')}). Rated ${clinic.google.rating.toFixed(1)} out of 5 on Google. Assessment-based, non-surgical care for back pain, sciatica, neck pain, shoulder pain, knee pain, sports injuries and post-surgery rehabilitation.`,
    '',
    '## Key facts',
    '',
    `- Clinic name: ${clinic.shortName} (also listed on Google as "${clinic.googleName}")`,
    `- Address: ${fullAddress}, ${clinic.address.region}, India`,
    `- Phone / WhatsApp: ${clinic.phone.display} (${clinic.phone.e164})`,
    `- Google rating: ${clinic.google.rating.toFixed(1)} / 5`,
    `- Patients treated: ${clinic.ownerStatements.patientsTreated} (clinic’s own figure)`,
    `- Approach: ${clinic.ownerStatements.approach}; non-surgical`,
    `- Wheelchair accessible: ${clinic.wheelchairAccessible ? 'yes' : 'no'}`,
    `- Google Maps: ${clinic.mapsUrl}`,
    `- YouTube (patient recovery stories): ${youtubeChannel}`,
    `- Booking: call or WhatsApp ${clinic.phone.display}, or use the form at ${SITE}/#book. No doctor’s referral is needed.`,
    '',
    '## Physiotherapists',
    '',
    `- ${clinic.doctor.name} (PT): ${clinic.doctor.qualifications.join(', ')}. Founder and Consultant Physiotherapist.`,
    `- ${clinic.coConsultant.name} (PT): ${clinic.coConsultant.qualifications.join(', ')}. ${clinic.coConsultant.role}.`,
    '',
    '## Services',
    '',
    ...services.map((s) => `- ${s.title}: ${s.short}`),
    ...moreServices.map((s) => `- ${s}`),
    '',
    '## Condition pages',
    '',
    ...regions.map((r) => `- [${r.title}](${abs(`/services/${r.slug}`)}): ${r.metaDescription}`),
    '',
    '## Other pages',
    '',
    `- [Home](${SITE}/): overview, services, doctor, clinic tour, patient videos, Google reviews, FAQ and booking`,
    `- [Corporate wellness programme](${abs('/corporate')}): workplace physiotherapy, ergonomic assessments and back-care workshops for companies in Pune`,
    `- [App](${abs('/app')}): installable app to book appointments and watch patient stories`,
    '',
    '## Frequently asked questions',
    '',
    ...faqs.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    ...regions.flatMap((r) => [`## ${r.label} pain: common questions`, '', ...r.faqs.flatMap((f) => [`### ${f.q}`, '', f.a, ''])]),
    '---',
    '',
    'This information is general and is not a diagnosis. For urgent or severe symptoms, seek medical care.',
  ];
  return lines.join('\n');
}
