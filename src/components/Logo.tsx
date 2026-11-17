/**
 * Official clinic logo. The emblem is cut from images/logo-original.jpg (scripts/make-logo.mjs).
 * `full` shows the complete lockup image (used in the footer).
 */
export function Logo({ tone = 'dark', full }: { tone?: 'dark' | 'light'; full?: boolean }) {
  if (full) {
    return (
      <picture>
        <source type="image/webp" srcSet="/img/logo-full.webp" />
        <img src="/img/logo-full.png" alt="Govind’s Advanced Pain Management & Physiotherapy Centre, Dr. Avinash Govind" width={616} height={480} className="h-auto w-[230px]" />
      </picture>
    );
  }
  const ink = tone === 'light' ? '#FFFFFF' : '#0B2A5B';
  const sub = tone === 'light' ? 'rgba(255,255,255,.75)' : '#1F4E8C';
  return (
    <span className="flex items-center gap-2.5">
      <picture className="shrink-0">
        <source type="image/webp" srcSet="/img/logo-mark.webp" />
        <img src="/img/logo-mark.png" alt="" width={294} height={256} className="h-11 w-auto md:h-12" />
      </picture>
      <span className="leading-none">
        <span className="font-brand block text-[21px] font-bold tracking-[0.02em] md:text-[23px]" style={{ color: ink }}>
          GOVIND’S
        </span>
        <span className="font-brand mt-1 block text-[8.6px] font-bold uppercase tracking-[0.04em] md:text-[9.4px]" style={{ color: sub }}>
          Advanced Pain Management
          <br />
          &amp; Physiotherapy Centre
        </span>
      </span>
    </span>
  );
}
