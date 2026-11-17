import { useEffect } from 'react';
import { clinic } from '../config/clinic';

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object[];
  noindex?: boolean;
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export function absoluteUrl(path: string) {
  return clinic.siteUrl ? clinic.siteUrl.replace(/\/$/, '') + path : path;
}

export function useSeo({ title, description, path, image = '/img/back-1600.webp', jsonLd = [], noindex }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', absoluteUrl(image));
    setMeta('property', 'og:url', absoluteUrl(path));
    setMeta('name', 'robots', noindex ? 'noindex' : 'index, follow');

    // Canonical needs an absolute URL. It's only written once the production domain is configured.
    document.head.querySelector('link[rel="canonical"]')?.remove();
    if (clinic.siteUrl) {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = absoluteUrl(path);
      document.head.appendChild(link);
    }

    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove());
    for (const data of jsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = '';
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    }
  }, [title, description, path, image, noindex, JSON.stringify(jsonLd)]);
}

/** LocalBusiness data built only from facts verified on the Google Business Profile. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'Physiotherapy'],
    name: clinic.name,
    alternateName: clinic.googleName,
    description: `${clinic.ownerStatements.approach} in Kondhwa, Pune.`,
    telephone: clinic.phone.e164,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${clinic.address.line1}, ${clinic.address.line2}, ${clinic.address.locality}`,
      addressLocality: clinic.address.city,
      addressRegion: clinic.address.region,
      postalCode: clinic.address.postalCode,
      addressCountry: clinic.address.country,
    },
    hasMap: clinic.mapsUrl,
    medicalSpecialty: 'Physiotherapy',
    founder: { '@type': 'Person', name: clinic.doctor.name, jobTitle: 'Physiotherapist' },
    isAccessibleForFree: false,
    ...(clinic.siteUrl ? { url: clinic.siteUrl } : {}),
    areaServed: ['Kondhwa', 'Tilekar Nagar', 'Pune'],
  };
}
