import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';

export const faqs = [
  {
    q: 'Do I need a doctor’s referral to see a physiotherapist?',
    a: 'No. You can book directly with us. If you have reports, X-rays or MRI scans, please bring them to your first visit so we can review them.',
  },
  {
    q: 'Can physiotherapy help me avoid surgery?',
    a: 'In some cases, physiotherapy can relieve symptoms without surgery. After a careful assessment we’ll explain honestly what physiotherapy can and can’t do for your condition, and refer you on if you need another specialist.',
  },
  {
    q: 'Is physiotherapy good for sciatica?',
    a: 'Yes, it may help reduce pain and improve movement. Treatment usually combines pain-relief therapy, gentle nerve and spine mobility work, and core strengthening.',
  },
  {
    q: 'What happens on my first visit?',
    a: 'We take a detailed history, assess your movement, strength and posture, explain what we find and agree a plan with you. Treatment usually starts on the same day.',
  },
  {
    q: 'How many sessions will I need?',
    a: 'It depends on your condition, how long you’ve had it and your goals. We’ll give you an estimate after the assessment and review progress regularly.',
  },
  {
    q: 'What should I wear?',
    a: 'Loose, comfortable clothing that lets us see and move the area being treated, for example shorts for knee problems or a loose t-shirt for shoulder problems.',
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className={`rounded-[22px] border bg-white transition-colors ${open ? 'border-[#2463EB]/40 shadow-[0_16px_34px_-28px_rgba(14,30,61,.45)]' : 'border-[#E6EBF3]'}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={onToggle} className="font-hero flex w-full items-center justify-between gap-6 px-6 py-5 text-left text-[1.05rem] font-bold text-[#0E1E3D] md:px-7">
          {q}
          <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${open ? 'rotate-45 bg-[#2463EB] text-white' : 'bg-[#F4F7FC] text-[#0E1E3D]'}`}>
            <Plus size={18} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <div id={id} role="region" className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <p className="px-6 pb-6 leading-relaxed text-[#3B4A63] md:px-7">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow="FAQ" light="Questions," bold="answered." sub="Can’t find what you’re looking for? Call or WhatsApp us, we’re happy to help." />
          </div>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <Item q={f.q} a={f.a} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
