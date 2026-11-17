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
  },
];

export const regionById = Object.fromEntries(regions.map((r) => [r.id, r])) as Record<RegionId, Region>;
export const regionBySlug = Object.fromEntries(regions.map((r) => [r.slug, r])) as Record<string, Region>;
