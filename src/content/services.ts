/**
 * Physiotherapy services. Images are generated illustrations (images/openart/gen/), not clinic photos.
 * Confirm the list with the clinic and remove anything it does not offer.
 */
export interface Service {
  id: string;
  title: string;
  short: string;
  points: string[];
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    id: 'spine',
    title: 'Back, Neck & Spine Care',
    short: 'Relief for back pain, neck pain, sciatica and slip disc through hands-on therapy and targeted exercise.',
    points: ['Lower back pain & sciatica', 'Cervical spondylosis', 'Posture correction'],
    image: 'svc-spine',
    imageAlt: 'A physiotherapist performing hands-on mobilisation on a patient’s lower back.',
  },
  {
    id: 'postop',
    title: 'Post-Surgery Rehabilitation',
    short: 'Structured rehab after knee or hip replacement, ACL repair, fractures and spine surgery.',
    points: ['Knee & hip replacement', 'Ligament & fracture rehab', 'Return to walking'],
    image: 'svc-postop',
    imageAlt: 'An older woman doing a guided knee exercise after knee replacement with a physiotherapist.',
  },
  {
    id: 'sports',
    title: 'Sports Injury Rehab',
    short: 'Get back to the game safely, from sprains and strains to ligament injuries and overuse pain.',
    points: ['Sprains & muscle tears', 'Ligament injuries', 'Return-to-sport testing'],
    image: 'svc-sports',
    imageAlt: 'A young cricketer doing a balance exercise supported by a physiotherapist.',
  },
  {
    id: 'pain',
    title: 'Advanced Pain Management',
    short: 'Non-surgical pain relief using therapeutic modalities alongside exercise and manual therapy.',
    points: ['Laser & ultrasound therapy', 'Spinal traction', 'Electrotherapy'],
    image: 'svc-pain',
    imageAlt: 'A physiotherapist applying ultrasound therapy to a patient’s shoulder.',
  },
  {
    id: 'senior',
    title: 'Arthritis & Senior Care',
    short: 'Gentle, patient-paced care for osteoarthritis, stiffness, balance and fall prevention.',
    points: ['Knee osteoarthritis', 'Balance & fall prevention', 'Mobility & independence'],
    image: 'svc-senior',
    imageAlt: 'A senior man walking with support from a physiotherapist.',
  },
  {
    id: 'paeds',
    title: 'Paediatric Physiotherapy',
    short: 'Playful, activity-based therapy for children, including knock knees, flat feet and motor delays.',
    points: ['Knock knees & flat feet', 'Developmental delay', 'Activity-based sessions'],
    image: 'svc-paeds',
    imageAlt: 'A young girl walking a balance beam while a physiotherapist holds her hand.',
  },
  {
    id: 'neuro',
    title: 'Neuro Rehabilitation',
    short: 'Rebuild strength, balance and independence after stroke, or with Parkinson’s and nerve conditions.',
    points: ['Stroke rehabilitation', 'Parkinson’s & balance', 'Gait training'],
    image: 'svc-neuro',
    imageAlt: 'A man practising walking between parallel bars with a physiotherapist.',
  },
  {
    id: 'women',
    title: 'Women’s Health',
    short: 'Physiotherapy through pregnancy and after childbirth, including pelvic floor and core recovery.',
    points: ['Prenatal & postnatal care', 'Pelvic floor & core', 'Back pain in pregnancy'],
    image: 'svc-women',
    imageAlt: 'A pregnant woman doing a gentle supported exercise with a physiotherapist.',
  },
];

/** Additional services shown as chips. */
export const moreServices = [
  'Frozen shoulder',
  'Heel pain & plantar fasciitis',
  'Weight management & fitness',
  'Ergonomic assessment',
  'Home exercise programmes',
  'Corporate wellness',
];
