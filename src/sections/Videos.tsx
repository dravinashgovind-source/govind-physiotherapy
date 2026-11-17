import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';

function YouTubeMark() {
  return (
    <svg width="22" height="16" viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="5" fill="#E62117" />
      <path d="M11.5 6v8l7-4z" fill="#fff" />
    </svg>
  );
}
import { Reveal } from '../components/Reveal';
import { videos, youtubeChannel, type Video } from '../content/media';

/** Lightweight YouTube player: shows the thumbnail and only loads YouTube when clicked. */
function Player({ v, large, onPlay, playing }: { v: Video; large?: boolean; playing: boolean; onPlay: () => void }) {
  return (
    <div className={`group relative aspect-video overflow-hidden bg-[#0E1E3D] ${large ? 'rounded-[28px]' : 'rounded-2xl'}`}>
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
          title={v.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={onPlay} className="absolute inset-0 h-full w-full" aria-label={`Play video: ${v.title}`}>
          <img
            src={`https://i.ytimg.com/vi/${v.id}/${large ? 'maxresdefault' : 'hqdefault'}.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-[#0E1E3D]/10 transition-colors group-hover:bg-[#0E1E3D]/25" />
          <span
            className={`absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#E62117] shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-transform group-hover:scale-110 ${large ? 'size-20' : 'size-11'}`}
          >
            <Play size={large ? 30 : 17} className="ml-0.5 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  );
}

function FeaturedVideo({ v }: { v: Video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure>
      <div className="shadow-[0_30px_60px_-34px_rgba(14,30,61,.55)] rounded-[28px]">
        <Player v={v} large playing={playing} onPlay={() => setPlaying(true)} />
      </div>
      <figcaption className="mt-5 flex flex-wrap items-center gap-3">
        <span className="font-hero rounded-full bg-[#2463EB]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#1D4FD8]">{v.topic}</span>
        <span className="font-hero text-xl font-bold text-[#0E1E3D] md:text-2xl">{v.label}</span>
      </figcaption>
    </figure>
  );
}

function VideoRow({ v }: { v: Video }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <figure className="rounded-[22px] bg-white p-3 shadow-[0_14px_34px_-24px_rgba(14,30,61,.4)]">
        <Player v={v} playing onPlay={() => {}} />
        <figcaption className="font-hero px-1 pb-1 pt-3 font-bold text-[#0E1E3D]">{v.label}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="flex items-center gap-4 rounded-[22px] bg-white p-3 shadow-[0_14px_34px_-24px_rgba(14,30,61,.4)] transition-shadow hover:shadow-[0_18px_38px_-22px_rgba(14,30,61,.45)]">
      <div className="w-[46%] shrink-0">
        <Player v={v} playing={false} onPlay={() => setPlaying(true)} />
      </div>
      <figcaption className="min-w-0 pr-2">
        <span className="font-hero text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2463EB]">{v.topic}</span>
        <button type="button" onClick={() => setPlaying(true)} className="font-hero mt-1 block text-left text-[15px] font-bold leading-snug text-[#0E1E3D] hover:text-[#1D4FD8]">
          {v.label}
        </button>
      </figcaption>
    </figure>
  );
}

export function Videos() {
  const [featured, ...rest] = videos;
  return (
    <section id="videos" aria-labelledby="videos-title" className="bg-[#F4F7FC] py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-4 md:px-6">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-hero flex items-center gap-2.5 text-sm font-semibold tracking-wide text-[#2463EB]">
              <span className="size-1.5 rounded-full bg-[#2463EB]" aria-hidden="true" />
              Patient recovery stories
            </p>
            <h2 id="videos-title" className="font-hero mt-4 text-[clamp(2.25rem,3.6vw,3.6rem)] leading-[1.08] tracking-[-0.025em] text-[#0E1E3D]">
              <span className="font-normal">Real patients. </span>
              <span className="font-extrabold">Real recoveries.</span>
            </h2>
            <p className="mt-4 max-w-xl text-[1.05rem] text-[#3B4A63]">Hear it from the people we’ve treated, in their own words, from our YouTube channel.</p>
          </div>
          <a
            href={youtubeChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="font-hero inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 font-semibold text-[#0E1E3D] shadow-[0_8px_24px_-14px_rgba(14,30,61,.35)] transition-shadow hover:shadow-[0_10px_28px_-12px_rgba(14,30,61,.4)] md:self-auto"
          >
            <YouTubeMark /> Visit our channel <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <FeaturedVideo v={featured} />
          </Reveal>
          <div className="flex flex-col gap-4 lg:col-span-4">
            <p className="font-hero hidden text-sm font-semibold text-[#3B4A63] lg:block">More stories</p>
            {rest.map((v, i) => (
              <Reveal key={v.id} delay={0.08 * (i + 1)}>
                <VideoRow v={v} />
              </Reveal>
            ))}
          </div>
        </div>
        <p className="mt-6 text-xs text-[#3B4A63]/70">Individual experiences shared by patients. Recovery varies from person to person.</p>
      </div>
    </section>
  );
}
