/**
 * Every clinic fact used anywhere on the site lives in this file.
 *
 * Source: the clinic's public Google Business Profile (checked 17 Nov 2026).
 * Anything marked `null` is NOT yet verified. The UI hides it until it is
 * filled in, so nothing is invented.
 */

export const clinic = {
  name: "Govind's Advanced Pain Management & Physiotherapy Centre",
  shortName: 'Govind’s Advanced Pain Management & Physiotherapy Centre',
  googleName: "Dr. Avinash Govind's Physiotherapy Clinic, Kondhwa Pune",
  doctor: {
    name: 'Dr. Avinash Govind',
    role: 'Consultant Physiotherapist · Founder',
    /** e.g. ['BPT', 'MPT (Musculoskeletal)']. Leave empty until confirmed by the doctor. */
    qualifications: ['B.P.Th.', 'M.P.Th. (Orthopedics)'] as string[],
    /** e.g. 'MSPTOT/12345'. null until confirmed. */
    registration: null as string | null,
    /** e.g. 12. null until confirmed. */
    yearsExperience: null as number | null,
    /** Path to the real portrait in /public/img (e.g. '/img/dr-avinash-govind'). null until supplied. */
    portrait: 'dr-avinash-govind' as string | null,
  },
  /** Second consultant, as listed on the clinic's entrance sign. */
  coConsultant: {
    name: 'Dr. Preeti A. Govind',
    qualifications: ['B.P.Th.', 'M.P.Th. (Community Physiotherapy)'],
    role: 'Consultant Physiotherapist',
  },

  phone: {
    display: '088818 68518',
    e164: '+918881868518',
  },
  /**
   * WhatsApp number in international format without '+'.
   * Assumed to be the same as the listed phone number. Confirm with the clinic.
   */
  whatsapp: '918881868518',
  email: null as string | null,

  address: {
    line1: 'Office No. 201, 2nd Floor, Krishna Capital',
    line2: 'Near ISKCON NVCC Road, next to Gagan Unnati',
    locality: 'Tilekar Nagar, Kondhwa',
    city: 'Pune',
    region: 'Maharashtra',
    postalCode: '411048',
    country: 'IN',
    plusCode: 'FV2J+22 Pune, Maharashtra',
  },
  mapsUrl: 'https://share.google/QY7WckwKX93IGxSE4',
  mapsEmbed:
    'https://maps.google.com/maps?q=' +
    encodeURIComponent("Dr. Avinash Govind's Physiotherapy Clinic, Krishna Capital, Tilekar Nagar, Kondhwa, Pune 411048") +
    '&z=16&output=embed',

  /**
   * Google lists 8 am – 8 pm. Only Tuesday's hours could be seen publicly,
   * so the site asks visitors to call ahead to confirm the other days.
   */
  hours: { summary: '8 am – 8 pm', confirmed: false },

  google: {
    rating: 5.0,
    /** Number of Google reviews. null until counted from the profile dashboard. */
    reviewCount: null as number | null,
    reviewsUrl: 'https://share.google/QY7WckwKX93IGxSE4',
  },

  /** Statements published by the owner on the Google profile. */
  ownerStatements: {
    approach: 'Assessment-based pain management and rehabilitation',
    focus: ['Back pain', 'Knee pain', 'Sciatica', 'Neck pain', 'Loss of mobility'],
    patientsTreated: '5,000+',
    nonSurgical: true,
  },
  wheelchairAccessible: true,

  /** Absolute production URL, e.g. 'https://www.govindphysio.in'. Needed for canonical tags and the sitemap. */
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? '',
} as const;

export const telHref = `tel:${clinic.phone.e164}`;

export function whatsappHref(message = 'Hello, I would like to book a physiotherapy assessment.') {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const fullAddress = [
  clinic.address.line1,
  clinic.address.line2,
  clinic.address.locality,
  `${clinic.address.city} ${clinic.address.postalCode}`,
].join(', ');
