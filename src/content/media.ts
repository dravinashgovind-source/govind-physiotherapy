/**
 * Real clinic media and patient words.
 *
 * Reviews are copied verbatim from the clinic's public Google Business Profile
 * (supplied by the clinic, Nov 2026). Only reviews whose full text was available are used.
 * Never edit the wording or add reviews that are not on Google.
 */
export const clinicPhotos: { name: string; alt: string; caption: string }[] = [];

export interface Review {
  name: string;
  when: string;
  text: string;
  tag: string;
  localGuide?: boolean;
}

export const googleReviews: Review[] = [
  {
    name: 'Achyut Hungund',
    when: '6 days ago',
    localGuide: true,
    tag: 'Back & leg pain',
    text: 'My job requires me to stand for long hours throughout the day, due to which I was suffering from severe leg pain and back pain. It was becoming difficult to manage my daily work comfortably. I consulted Dr. Avinash Govind for physiotherapy treatment, and I experienced tremendous improvement. Now I am completely relieved of my pain and can stand and work for longer hours without discomfort.',
  },
  {
    name: 'Amit Kharat',
    when: 'a week ago',
    tag: 'Shoulder',
    text: 'I had severe pain in left shoulder and I was unable to take the hand up. After taking treatment under Dr. Avinash Govind and his team, I am feeling much better and my hand movement is normal. Thank you Dr. Avinash Govind and team.',
  },
  {
    name: 'Vinkesh Shah',
    when: 'a month ago',
    localGuide: true,
    tag: 'Personalised care',
    text: 'Highly recommend Dr. Avinash Govind! He is extremely knowledgeable, polite, and takes time to understand the root cause of the problem. His personalized exercise guidance and physiotherapy treatment provided quick and effective relief. Excellent experience!',
  },
  {
    name: 'Ravina Jadhav',
    when: '6 days ago',
    tag: 'Recovery',
    text: "Highly recommend Govind's Advanced Pain Management and Physiotherapy Centre! Dr. Avinash Govind and Dr. Preeti Govind are truly experts in their field. Their clear guidance, attentive care, and targeted treatment plans made a huge difference in my recovery. Excellent doctors and great clinic environment!",
  },
  {
    name: 'Komal Dixit',
    when: 'a month ago',
    tag: 'Paediatric',
    text: 'I truly appreciate the care, patience and dedication plus activity base approach, which make every session special for my child. I must say thank-you to all the staff members who really take care of my child. Very positive environment.',
  },
  {
    name: 'Sangita Poojary',
    when: '5 months ago',
    tag: 'Lower back',
    text: "I had a very good experience with physiotherapy department. I consultant Dr. Avinash Govind for low back pain and I'm 100% recoverd now. The staff was professional, supportive and explained the exercies clearly. Thank you Dr Avinash Govind Sir and Team for the care and guidance.",
  },
  {
    name: 'Omkar J',
    when: '5 days ago',
    tag: 'Modern clinic',
    text: 'Dr. Avinash Govind is excellent at diagnosing the problem accurately and providing the right treatment. The clinic is equipped with advanced machines and modern technology, and the overall treatment is trust outstanding. Highly recommended!',
  },
  {
    name: 'Antara Pawar',
    when: '5 days ago',
    tag: 'Personal attention',
    text: 'What makes this place special is the personal attention given to every patient. The treatment is thoughtful, well-planned, and genuinely patient-focused.',
  },
  {
    name: 'Insha Pathan',
    when: '5 days ago',
    tag: 'Comfortable sessions',
    text: 'Very happy with the services. The therapist explains everything clearly and ensures that each treatment session is comfortable and effective.',
  },
];

export interface Video {
  id: string;
  title: string;
  /** Short label shown on the card */
  label: string;
  topic: string;
}

/** Patient recovery stories from the clinic's YouTube channel. */
export const youtubeChannel = 'https://www.youtube.com/@dr.avinashgovind-physiothe4603';
export const facebookPage = 'https://www.facebook.com/dr.avinashgovind';
export const instagramProfile = 'https://www.instagram.com/dr.avinashgovind/';

export const videos: Video[] = [
  { id: 'dzYrsgf1NTs', label: 'Post-op comeback in 15 days', topic: 'Post-surgery rehab', title: 'Post-OP Comeback In Just 15 Days | Dr. Avinash Govind' },
  { id: 'qmsMZDlIXrs', label: 'Recovery from 10-year-old osteoarthritis', topic: 'Knee osteoarthritis', title: 'Complete Recovery From 10 Years Old Osteoarthritis | Dr. Avinash Govind' },
  { id: 'frKAFlcKfgM', label: 'Chronic back pain & burning feet', topic: 'Chronic back pain', title: '80% Recovery in 12 Years Old Chronic Back Pain and Burning Sensation in the Feet in Just 15 Days' },
  { id: '5z5ugoBq498', label: '8 kg weight loss in 20 days', topic: 'Weight loss & fitness', title: '8 KG Weight Loss In Just 20 Days' },
];
