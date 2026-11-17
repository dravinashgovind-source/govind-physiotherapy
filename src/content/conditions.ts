/**
 * Section 02: common conditions, ordered head to toe.
 * Educational wording only: describes common patterns, never diagnoses.
 *
 * Callout x/y are fractions of the trimmed cut-out image (0–1), measured from the
 * generated images in images/openart/cutouts/. `side` is where the label sits.
 */
export interface Callout {
  x: number;
  y: number;
  side: 'left' | 'right';
  dy: number;
  title: string;
  value: string;
  pain?: boolean;
}

export interface Condition {
  id: string;
  word: string;
  title: string;
  tagline: string;
  care: string[];
  cut: string;
  /** Height of the figure as a fraction of the card height */
  scale: number;
  imageAlt: string;
  slug: string;
  callouts: Callout[];
}

export const conditions: Condition[] = [
  {
    id: 'neck',
    word: 'Neck',
    title: 'Neck Pain & Stiffness',
    tagline: 'Hours at a screen hold the neck in one position. We find what’s driving the pain, then restore easy movement.',
    care: ['Posture assessment', 'Manual therapy', 'Deep neck strengthening'],
    cut: 'cut-neck',
    scale: 0.8,
    imageAlt: 'A man holding the back of his neck with mild discomfort.',
    slug: 'neck-pain-physiotherapy-kondhwa',
    callouts: [
      { x: 0.5, y: 0.12, side: 'left', dy: -24, title: 'Pain point', value: 'Neck & upper trapezius', pain: true },
      { x: 0.76, y: 0.05, side: 'right', dy: -36, title: 'Normal rotation', value: '70–90° each side' },
      { x: 0.7, y: 0.24, side: 'right', dy: 46, title: 'Common trigger', value: 'Screen & phone posture' },
    ],
  },
  {
    id: 'shoulder',
    word: 'Shoulder',
    title: 'Shoulder Pain & Frozen Shoulder',
    tagline: 'When reaching overhead or sleeping on one side starts to hurt, the shoulder needs movement, not rest alone.',
    care: ['Range-of-motion testing', 'Joint mobilisation', 'Rotator cuff strength'],
    cut: 'cut-shoulder',
    scale: 0.8,
    imageAlt: 'An older man holding his right shoulder with mild discomfort.',
    slug: 'shoulder-pain-physiotherapy-kondhwa',
    callouts: [
      { x: 0.33, y: 0.17, side: 'left', dy: -28, title: 'Pain point', value: 'Front of the shoulder', pain: true },
      { x: 0.9, y: 0.19, side: 'right', dy: -40, title: 'Normal flexion', value: '≈180° overhead reach' },
      { x: 0.92, y: 0.36, side: 'right', dy: 30, title: 'Often linked to', value: 'Rotator cuff & stiffness' },
    ],
  },
  {
    id: 'back',
    word: 'Back',
    title: 'Lower Back Pain & Sciatica',
    tagline: 'Long sitting, lifting the wrong way or a weak core can strain the lower back. Movement is part of the fix.',
    care: ['Spine assessment', 'Pain-relief therapy', 'Core & safe lifting'],
    cut: 'cut-back',
    scale: 0.82,
    imageAlt: 'A woman in side profile holding her lower back with mild discomfort.',
    slug: 'back-pain-sciatica-physiotherapy-kondhwa',
    callouts: [
      { x: 0.9, y: 0.4, side: 'right', dy: -30, title: 'Pain point', value: 'Lumbar spine', pain: true },
      { x: 0.55, y: 0.22, side: 'left', dy: -60, title: 'Common trigger', value: 'Long sitting & lifting' },
      { x: 0.6, y: 0.52, side: 'right', dy: 52, title: 'May travel', value: 'Down the leg (sciatica)' },
    ],
  },
  {
    id: 'knee',
    word: 'Knee',
    title: 'Knee Pain & Arthritis',
    tagline: 'Stairs, squats and long walks all load the knee. Stronger thigh and hip muscles take the pressure off.',
    care: ['Alignment check', 'Quadriceps strength', 'Joint mobility'],
    cut: 'cut-knee',
    scale: 0.76,
    imageAlt: 'A man seated on a stool holding his knee with mild discomfort.',
    slug: 'knee-pain-physiotherapy-kondhwa',
    callouts: [
      { x: 0.31, y: 0.37, side: 'left', dy: -30, title: 'Pain point', value: 'Front of the knee', pain: true },
      { x: 0.6, y: 0.42, side: 'right', dy: -70, title: 'Strength focus', value: 'Quadriceps & hips' },
      { x: 0.86, y: 0.58, side: 'right', dy: 30, title: 'Common trigger', value: 'Stairs, squats & walks' },
    ],
  },
  {
    id: 'ankle',
    word: 'Ankle',
    title: 'Ankle Sprains & Heel Pain',
    tagline: 'A twisted ankle or long hours standing can leave you unsteady. Balance and strength bring back confidence.',
    care: ['Balance testing', 'Calf & foot strength', 'Return to sport'],
    cut: 'cut-ankle',
    scale: 0.5,
    imageAlt: 'A woman seated on the floor holding her ankle with mild discomfort.',
    slug: 'ankle-foot-physiotherapy-kondhwa',
    callouts: [
      { x: 0.47, y: 0.78, side: 'left', dy: 34, title: 'Pain point', value: 'Outer ankle & heel', pain: true },
      { x: 0.66, y: 0.12, side: 'right', dy: -34, title: 'Common trigger', value: 'Twists & long standing' },
      { x: 0.86, y: 0.7, side: 'right', dy: 40, title: 'We check', value: 'Single-leg balance' },
    ],
  },
];
