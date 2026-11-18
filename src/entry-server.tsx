/**
 * Build-time renderer (not shipped to browsers). scripts/prerender.mjs uses it to
 * write each page's full HTML, so search engines and AI crawlers that don't run
 * JavaScript still read the complete page content.
 */
import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { seoPages, seoFor, notFoundSeo, llmsTxt, SITE } from './seo/pages';

export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
