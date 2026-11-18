/**
 * Educational content for the Body Explorer and the service pages.
 * Written as general information. It must never read as a diagnosis or a promise of recovery.
 */

export type RegionId = 'neck' | 'shoulder' | 'back' | 'hip' | 'knee' | 'ankle';

export interface Region {
  id: RegionId;
  label: string;
  slug: string;
  /** Image key in /public/img, or null if no photograph exists yet. */
  image: string | null;
  imageAlt: string;
  title: string;
  metaDescription: string;
  about: string;
  /** Everyday movements people commonly report finding difficult. */
  difficulties: string[];
  /** What a physiotherapy assessment typically looks at. */
  assessment: string[];
  /** Care approaches that may be considered after assessment. */
  care: string[];
  /** Range-of-motion fact used as an editorial caption. General reference values only. */
  romCaption: string;
  /** Common questions, shown on the page and used for FAQ schema. General information only. */
  faqs: { q: string; a: string }[];
}

export const regions: Region[] = [
  {
    id: 'neck',
    label: 'Neck',
    slug: 'neck-pain-physiotherapy-kondhwa',
    image: 'neck',
    imageAlt: 'A man holding the side of his neck, which is highlighted to show where he feels discomfort.',
    title: 'Neck pain physiotherapy in Kondhwa, Pune',
    metaDescription:
      "Assessment-based physiotherapy for neck pain and stiffness at Govind’s Advanced Pain Management & Physiotherapy Centre, Tilekar Nagar, Kondhwa, Pune.",
    about:
      'The cervical spine carries the weight of your head and lets you look, turn and nod hundreds of times a day. Long hours at screens, phones and steering wheels change how it is loaded.',
    difficulties: [
      'Turning your head to check traffic or reverse a car',
      'Looking down at a phone or laptop for long periods',
      'Sleeping comfortably on one side',
      'Carrying a bag on one shoulder',
    ],
    assessment: ['Posture at rest and at work', 'Range of rotation and side-bending', 'Shoulder blade control', 'Nerve-related symptoms into the arm'],
    care: ['Manual therapy', 'Mobility exercises', 'Deep neck flexor strengthening', 'Work-station and posture guidance'],
    romCaption: 'Cervical rotation · ~70–90° each side (typical adult reference)',
    faqs: [
      { q: 'Can physiotherapy help neck pain from desk or phone use?', a: 'Often, yes. Screen-related neck pain usually responds to a mix of hands-on therapy, mobility and strengthening exercises, and changes to how your workstation is set up. Your assessment shows which of these suit you.' },
      { q: 'Is physiotherapy suitable for cervical spondylosis?', a: 'Physiotherapy is commonly used to manage the pain and stiffness linked to cervical spondylosis. Care focuses on gentle mobility, strengthening the deep neck muscles and posture guidance, and we refer you on if your symptoms need further tests.' },
      { q: 'When should neck pain be checked urgently?', a: 'Seek urgent medical care if neck pain follows an accident or fall, or comes with a severe headache, fever, weakness, or numbness spreading into the arms.' },
    ],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    slug: 'shoulder-pain-physiotherapy-kondhwa',
    image: 'shoulder',
    imageAlt: 'An older man holding his right shoulder, which is highlighted to show where he feels discomfort.',
    title: 'Shoulder pain & stiffness physiotherapy in Kondhwa, Pune',
    metaDescription:
      'Physiotherapy for shoulder pain, stiffness and reduced reach. Assessment-based care in Tilekar Nagar, Kondhwa, Pune.',
    about:
      'The shoulder is the most mobile joint in the body. That freedom depends on the rotator cuff and the shoulder blade working together, so a problem in one often shows up as pain or stiffness in the other.',
    difficulties: [
      'Reaching up to a high shelf',
      'Fastening clothing behind your back',
      'Lifting a bucket or shopping bag',
      'Lying on the affected side at night',
    ],
    assessment: ['Active and passive range of motion', 'Rotator cuff strength', 'Shoulder blade movement', 'Neck involvement'],
    care: ['Graded mobility work', 'Rotator cuff and scapular strengthening', 'Manual therapy', 'Activity modification'],
    romCaption: 'Shoulder flexion · ~180° (typical adult reference)',
    faqs: [
      { q: 'Can physiotherapy help a frozen shoulder?', a: 'Physiotherapy is a common part of frozen shoulder care. Gentle mobility work, manual therapy and a home exercise plan aim to ease pain and gradually restore movement. Recovery is often slow, so we review your progress regularly.' },
      { q: 'Why does my shoulder hurt when I lift my arm?', a: 'Pain when lifting the arm is often linked to the rotator cuff or to how the shoulder blade moves. An assessment checks your strength, range and shoulder-blade control to find what is contributing.' },
      { q: 'How long does shoulder rehabilitation take?', a: 'It depends on the cause and how long you have had symptoms. We give you an estimate after your assessment and adjust the plan as you improve.' },
    ],
  },
  {
    id: 'back',
    label: 'Back',
    slug: 'back-pain-sciatica-physiotherapy-kondhwa',
    image: 'back',
    imageAlt: 'A woman in profile with her hand on her lower back, which is highlighted to show where she feels discomfort.',
    title: 'Back pain & sciatica physiotherapy in Kondhwa, Pune',
    metaDescription:
      'Assessment-based physiotherapy for lower back pain and sciatica-type symptoms at Govind\'s Physiotherapy Centre, Kondhwa, Pune.',
    about:
      'Your lower back links your upper body to your hips and legs. Most back pain is influenced by how we sit, bend, lift and move. Symptoms that travel into the leg, often called sciatica, need a careful assessment.',
    difficulties: [
      'Bending to pick something up from the floor',
      'Sitting through a long workday or drive',
      'Getting out of bed in the morning',
      'Standing for long periods while cooking',
    ],
    assessment: ['Movement of the spine in each direction', 'Hip and core control', 'Nerve sensitivity tests', 'Daily sitting and lifting habits'],
    care: ['Manual therapy', 'Progressive core and hip strengthening', 'Graded return to bending and lifting', 'Non-surgical pain management'],
    romCaption: 'Lumbar flexion · assessed in every back evaluation',
    faqs: [
      { q: 'Can physiotherapy help sciatica?', a: 'It may help. Treatment usually combines pain-relief therapy, gentle nerve and spine mobility work and core strengthening, guided by what your assessment shows.' },
      { q: 'Do I need an MRI before physiotherapy for back pain?', a: 'Not usually. Most back pain can be assessed clinically. If you already have X-ray or MRI reports, bring them along, and we will tell you if your symptoms suggest you need further tests or a specialist.' },
      { q: 'Should I rest or keep moving with lower back pain?', a: 'For most everyday back pain, staying gently active tends to help more than long bed rest. Your physiotherapist shows you which movements are safe for you and how to build up.' },
    ],
  },
  {
    id: 'hip',
    label: 'Hip',
    slug: 'hip-pain-physiotherapy-kondhwa',
    image: null,
    imageAlt: '',
    title: 'Hip pain physiotherapy in Kondhwa, Pune',
    metaDescription:
      'Physiotherapy for hip pain, stiffness and walking difficulty. Assessment-based care in Tilekar Nagar, Kondhwa, Pune.',
    about:
      'The hip is a deep ball-and-socket joint that bears your body weight with every step. Stiffness or weakness around it often changes the way you walk, which can affect the back and knee too.',
    difficulties: [
      'Climbing stairs or stepping onto a bus',
      'Putting on socks and shoes',
      'Sitting cross-legged or on the floor',
      'Walking longer distances',
    ],
    assessment: ['Hip range in all directions', 'Glute and hip strength', 'Walking pattern', 'Balance on one leg'],
    care: ['Mobility exercises', 'Hip and glute strengthening', 'Gait retraining', 'Balance work'],
    romCaption: 'Hip flexion · ~120° (typical adult reference)',
    faqs: [
      { q: 'What can cause hip pain?', a: 'Common causes include joint stiffness, arthritis, weak glute muscles and pain referred from the lower back. An assessment helps tell these apart.' },
      { q: 'Can physiotherapy help hip arthritis?', a: 'For many people, physiotherapy is a recommended part of managing hip osteoarthritis. Strengthening, mobility work and walking advice aim to reduce pain and keep you active.' },
      { q: 'Do you help with rehabilitation after hip replacement?', a: 'Yes. Post-surgery rehabilitation, including after hip replacement, is one of our services. Please bring your surgeon’s notes to your first visit.' },
    ],
  },
  {
    id: 'knee',
    label: 'Knee',
    slug: 'knee-pain-physiotherapy-kondhwa',
    image: 'knee',
    imageAlt: 'A man seated on a bench holding his knee, which is highlighted to show where he feels discomfort.',
    title: 'Knee pain physiotherapy in Kondhwa, Pune',
    metaDescription:
      "Assessment-based physiotherapy for knee pain, stiffness and post-injury rehabilitation at Govind’s Advanced Pain Management & Physiotherapy Centre, Kondhwa, Pune.",
    about:
      'The knee is a hinge that depends on the strength of the thigh and hip muscles around it. How well those muscles absorb load affects how the knee feels on stairs, slopes and when squatting.',
    difficulties: [
      'Going down stairs',
      'Squatting or sitting on the floor',
      'Getting up from a low chair',
      'Walking on uneven ground',
    ],
    assessment: ['Bend and straighten range', 'Quadriceps and hip strength', 'Swelling and joint stability', 'Alignment during squats and steps'],
    care: ['Progressive strengthening', 'Mobility work', 'Manual therapy', 'Return-to-activity planning'],
    romCaption: 'Knee flexion · ~135° (typical adult reference)',
    faqs: [
      { q: 'Can physiotherapy help knee osteoarthritis?', a: 'Exercise-based physiotherapy is a recommended first-line treatment for knee osteoarthritis. Strengthening the thigh and hip muscles, mobility work and activity advice aim to reduce pain and make walking and stairs easier.' },
      { q: 'Is physiotherapy needed after knee replacement or ACL surgery?', a: 'Rehabilitation is an important part of recovery after knee replacement or ligament surgery. We follow your surgeon’s guidance and build up your strength, knee bend and walking step by step.' },
      { q: 'Why does my knee hurt on the stairs?', a: 'Pain on stairs is common with kneecap-related pain and arthritis, and is often linked to the strength of the thigh and hip muscles. Your assessment looks at how your knee handles load during steps and squats.' },
    ],
  },
  {
    id: 'ankle',
    label: 'Ankle',
    slug: 'ankle-foot-physiotherapy-kondhwa',
    image: 'ankle',
    imageAlt: 'A woman seated on the floor holding her ankle, which is highlighted to show where she feels discomfort.',
    title: 'Ankle & foot physiotherapy in Kondhwa, Pune',
    metaDescription:
      'Physiotherapy for ankle sprains, stiffness and heel discomfort. Assessment-based care in Tilekar Nagar, Kondhwa, Pune.',
    about:
      'Your ankle and foot are the first contact with the ground. After a sprain, or with long hours of standing, reduced ankle movement and balance can change how the rest of the leg works.',
    difficulties: [
      'The first steps in the morning',
      'Walking on uneven roads',
      'Running or jumping',
      'Balancing on one leg',
    ],
    assessment: ['Ankle range, especially bending upward', 'Calf strength', 'Balance and stability', 'Footwear and walking pattern'],
    care: ['Balance and proprioception training', 'Calf and foot strengthening', 'Mobility work', 'Graded return to sport'],
    romCaption: 'Ankle dorsiflexion · ~20° (typical adult reference)',
    faqs: [
      { q: 'How soon should I start physiotherapy after an ankle sprain?', a: 'Gentle, guided movement usually starts within the first few days, once severe pain and swelling settle. See a doctor first if you cannot put weight on the foot or the pain is severe.' },
      { q: 'Can physiotherapy help heel pain or plantar fasciitis?', a: 'Often, yes. Care usually includes calf and foot stretching and strengthening, load management, footwear advice and, where suitable, pain-relief therapy.' },
      { q: 'Why does my ankle keep giving way?', a: 'Repeated sprains can leave the ankle with reduced balance and weaker supporting muscles. Balance and strengthening exercises aim to rebuild stability and lower the chance of another sprain.' },
    ],
  },
];

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, Region>;
export const regionBySlug = Object.fromEntries(regions.map((r) => [r.slug, r])) as Record<string, Region>;
