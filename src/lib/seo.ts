import { useEffect } from 'react';
import { abs, notFoundSeo, seoFor, type SeoPage } from '../seo/pages';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
}

export const absoluteUrl = abs;

/**
 * Applies a page's SEO tags (from src/seo/pages.ts) when the visitor navigates.
 * The same tags are already in the prerendered HTML, so crawlers don't need JavaScript.
 */
export function useSeo(pathOrPage: string | SeoPage | 'not-found') {
  const page = pathOrPage === 'not-found' ? notFoundSeo : typeof pathOrPage === 'string' ? seoFor(pathOrPage) : pathOrPage;
  useEffect(() => {
    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:image', abs(page.image));
    setMeta('property', 'og:url', abs(page.noindex ? '/' : page.path));
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);
    setMeta('name', 'twitter:image', abs(page.image));
    setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    document.head.querySelectorAll('link[rel="canonical"]').forEach((l) => l.remove());
    if (!page.noindex) {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = abs(page.path);
      document.head.appendChild(link);
    }

    document.head.querySelectorAll('script[data-seo]').forEach((s) => s.remove());
    for (const data of page.jsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = '';
      s.textContent = JSON.stringify(data);
      document.head.appendChild(s);
    }
  }, [page]);
}
