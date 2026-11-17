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
    <span className="flex items-center gap-3">
      <picture className="shrink-0">
        <source type="image/webp" srcSet="/img/logo-mark.webp" />
        <img src="/img/logo-mark.png" alt="" width={294} height={256} className="h-11 w-auto md:h-[50px]" />
      </picture>
      <span className="flex flex-col leading-none">
        <span
          className="font-logo text-[22px] font-bold tracking-[0.08em] md:text-[25px]"
          style={tone === 'light' ? { color: ink } : { backgroundImage: 'linear-gradient(180deg, #123A78 0%, #0B2A5B 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        >
          GOVIND’S
        </span>
        <span className="mt-[5px] flex items-center gap-1.5">
          <span className="h-px w-3 bg-gradient-to-r from-[#0B9F9A] to-[#6CB33F]" aria-hidden="true" />
          <span className="font-hero text-[8.5px] font-semibold uppercase leading-[1.35] tracking-[0.16em] md:text-[9px]" style={{ color: sub }}>
            Advanced Pain Management
            <br />
            &amp; Physiotherapy Centre
          </span>
        </span>
      </span>
    </span>
  );
}
