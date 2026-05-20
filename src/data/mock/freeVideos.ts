import { demoVideoUrls } from '@/data/mock/media';

/** Demo free lessons — same shape fields `LessonPlaylistItem` needs */
export const freeVideos = [
  {
    id: 'fv-1',
    title: 'Screen replacement — tools & safety',
    duration: '8:24',
    videoUrl: demoVideoUrls[0],
  },
  {
    id: 'fv-2',
    title: 'Charging port faults — quick checks',
    duration: '6:12',
    videoUrl: demoVideoUrls[1],
  },
  {
    id: 'fv-3',
    title: 'Battery swap workflow',
    duration: '10:05',
    videoUrl: demoVideoUrls[2],
  },
  {
    id: 'fv-4',
    title: 'Board-level basics (intro)',
    duration: '5:48',
    videoUrl: demoVideoUrls[3],
  },
] as const;
