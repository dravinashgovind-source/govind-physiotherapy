/**
 * "We help you with RELIEF from" body map on the /app page.
 * The list is the clinic's own (supplied by the clinic, Nov 2026).
 * Notes are general information, never a diagnosis.
 *
 * `pose` picks the figure image (images/openart/relief/<pose>.png); `x`/`y` are the
 * pain spot as fractions of that image's canvas (1008 × 1792).
 */
export type ReliefPose = 'head' | 'neck' | 'shoulder' | 'arm' | 'ribs' | 'hip' | 'knee' | 'ankle';

export interface ReliefItem {
  label: string;
  pose: ReliefPose;
  x: number;
  y: number;
  note: string;
  /** Concern pre-selected in the booking form. */
  concern: string;
}

export const reliefLeft: ReliefItem[] = [
  { label: 'Arthritis', pose: 'knee', x: 0.365, y: 0.565, note: 'Stiff, painful joints eased with strengthening and mobility work.', concern: 'Knee pain' },
  { label: 'Tension headache', pose: 'head', x: 0.415, y: 0.075, note: 'Tight neck and shoulder muscles that refer pain into the head.', concern: 'Neck pain' },
  { label: 'Jaw pain', pose: 'head', x: 0.535, y: 0.125, note: 'Jaw (TMJ) pain and clicking, helped with jaw and posture work.', concern: 'Other / not sure' },
  { label: 'Repetitive strain injury', pose: 'arm', x: 0.47, y: 0.362, note: 'Overuse pain from typing, phones or repetitive tasks.', concern: 'Other / not sure' },
  { label: 'Whiplash', pose: 'neck', x: 0.455, y: 0.155, note: 'Neck strain after a sudden jolt, such as a road accident.', concern: 'Neck pain' },
  { label: 'Shoulder pain', pose: 'shoulder', x: 0.625, y: 0.19, note: 'Pain reaching up or behind you, often from the rotator cuff.', concern: 'Shoulder pain' },
  { label: 'Tennis elbow', pose: 'arm', x: 0.37, y: 0.338, note: 'Pain on the outer elbow when gripping or lifting.', concern: 'Other / not sure' },
  { label: 'Broken / sprained wrist', pose: 'arm', x: 0.57, y: 0.398, note: 'Restoring movement and grip strength after injury or a cast.', concern: 'Other / not sure' },
  { label: 'Post-operative physio', pose: 'knee', x: 0.365, y: 0.575, note: 'Structured rehab after knee, hip or spine surgery.', concern: 'Post-surgery rehab' },
  { label: 'Frozen shoulder', pose: 'shoulder', x: 0.64, y: 0.2, note: 'A painful, stiff shoulder that slowly loses movement.', concern: 'Shoulder pain' },
  { label: 'Rib pain', pose: 'ribs', x: 0.615, y: 0.33, note: 'Pain around the rib cage, worse when breathing deeply or twisting.', concern: 'Other / not sure' },
];

export const reliefRight: ReliefItem[] = [
  { label: 'Groin strain', pose: 'hip', x: 0.475, y: 0.55, note: 'An inner-thigh muscle strain, common in sport.', concern: 'Sports injury' },
  { label: 'Hip pain', pose: 'hip', x: 0.345, y: 0.41, note: 'Pain or stiffness when walking, climbing stairs or sitting.', concern: 'Other / not sure' },
  { label: 'Jumper’s knee', pose: 'knee', x: 0.37, y: 0.6, note: 'Pain just below the kneecap from jumping and running.', concern: 'Knee pain' },
  { label: 'Osgood–Schlatter', pose: 'knee', x: 0.375, y: 0.62, note: 'A painful bump below the knee in active, growing children.', concern: 'Knee pain' },
  { label: 'Shin splints', pose: 'ankle', x: 0.335, y: 0.55, note: 'Pain along the shin from running or a sudden jump in activity.', concern: 'Sports injury' },
  { label: 'Sprained ankle', pose: 'ankle', x: 0.31, y: 0.63, note: 'Ligament injury from rolling the ankle.', concern: 'Ankle / Heel pain' },
  { label: 'Foot problems', pose: 'ankle', x: 0.305, y: 0.72, note: 'Heel pain, plantar fasciitis and flat feet.', concern: 'Ankle / Heel pain' },
  { label: 'Headaches', pose: 'head', x: 0.5, y: 0.065, note: 'Headaches linked to neck stiffness and posture.', concern: 'Neck pain' },
  { label: 'Neck pain', pose: 'neck', x: 0.505, y: 0.168, note: 'Ache and stiffness from screens, sleep or posture.', concern: 'Neck pain' },
  { label: 'Stiff neck', pose: 'neck', x: 0.47, y: 0.142, note: 'Trouble turning your head, often after sleeping awkwardly.', concern: 'Neck pain' },
  { label: 'Shoulder dislocation', pose: 'shoulder', x: 0.66, y: 0.205, note: 'Rebuilding stability and strength after a dislocation.', concern: 'Shoulder pain' },
];

export const reliefAll = [...reliefLeft, ...reliefRight];
export const reliefPoses: ReliefPose[] = ['head', 'neck', 'shoulder', 'arm', 'ribs', 'hip', 'knee', 'ankle'];
