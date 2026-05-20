import { demoGuideMaterials, demoVideoUrls } from '@/data/mock/media';
import type { Course } from '@/types/course';

let demoVideoIndex = 0;
let demoGuideIndex = 0;

function nextDemoVideoUrl() {
  const url = demoVideoUrls[demoVideoIndex % demoVideoUrls.length];
  demoVideoIndex += 1;
  return url;
}

function nextDemoGuide() {
  const guide = demoGuideMaterials[demoGuideIndex % demoGuideMaterials.length];
  demoGuideIndex += 1;
  return {
    materialFormat: guide.format,
    materialUrl: guide.url,
  };
}

export const courses: Course[] = [
  {
    id: 'professional-android-repair',
    title: 'Professional Android Repair Program',
    instructor: 'PMRT Faculty',
    description:
      'This course covers the full Android repair workflow from intake to delivery. You will work through disassembly, common display and charging faults, and final quality checks on popular handset brands.',
    thumbnail:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    duration: '8h 30m',
    lessonCount: 5,
    level: 'Beginner',
    objectives: [
      'Open Android devices safely without damaging clips or flex cables',
      'Diagnose display, battery, and charging faults on the bench',
      'Finish each repair with testing, handover, and warranty notes',
    ],
    content: [
      {
        id: 'par-1',
        title: 'Android Repair Bench Setup',
        type: 'video',
        duration: '18 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Tools, ESD protection, lighting, and the order of work for every Android job.',
      },
      {
        id: 'par-2',
        title: 'Android Disassembly Reference Guide',
        type: 'material',
        description: 'Back cover removal, screw maps, and flex cable handling notes.',
        ...nextDemoGuide(),
      },
      {
        id: 'par-3',
        title: 'Display and Touch Fault Diagnosis',
        type: 'video',
        duration: '24 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Separate glass damage from full assembly faults and confirm touch response.',
      },
      {
        id: 'par-4',
        title: 'Charging Port and Battery Service',
        type: 'video',
        duration: '21 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Port cleaning, flex replacement, and safe battery swap practices.',
      },
      {
        id: 'par-5',
        title: 'Pre-Delivery Test Checklist',
        type: 'material',
        description: 'Power, network, sensors, audio, and customer sign-off checklist.',
        ...nextDemoGuide(),
      },
    ],
  },
  {
    id: 'professional-ios-repair',
    title: 'Professional iOS Repair Program',
    instructor: 'PMRT Faculty',
    description:
      'This course teaches iPhone servicing with the correct opening tools and safe handling methods. It covers display and battery work, then the quality checks required after repair.',
    thumbnail:
      'https://images.unsplash.com/photo-1580910051074-2ebbe8941a49?auto=format&fit=crop&w=1200&q=80',
    duration: '7h 45m',
    lessonCount: 5,
    level: 'Intermediate',
    objectives: [
      'Use iPhone opening tools without damaging housings or screws',
      'Replace displays and batteries with correct cable seating and adhesive work',
      'Verify Face ID, True Tone, and charging after assembly',
    ],
    content: [
      {
        id: 'pir-1',
        title: 'iPhone Opening Tools and Safety',
        type: 'video',
        duration: '16 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Tool selection, heat control, and safe separation for iPhone housings.',
      },
      {
        id: 'pir-2',
        title: 'iPhone Screw Map and Opening Guide',
        type: 'material',
        description: 'Fastener layout, bracket notes, and cable routing reminders.',
        ...nextDemoGuide(),
      },
      {
        id: 'pir-3',
        title: 'Display Replacement Walkthrough',
        type: 'video',
        duration: '28 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Screen removal, transfer parts, and boot testing on a common iPhone model.',
      },
      {
        id: 'pir-4',
        title: 'Battery Service and Adhesive Removal',
        type: 'video',
        duration: '22 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Pull-tab technique, adhesive cleanup, and fit checks after battery change.',
      },
      {
        id: 'pir-5',
        title: 'iOS Post-Repair Verification Sheet',
        type: 'material',
        description: 'Touch, camera, speaker, charging, and cosmetic inspection checklist.',
        ...nextDemoGuide(),
      },
    ],
  },
  {
    id: 'complete-mobile-software-training',
    title: 'Complete Mobile Software Training',
    instructor: 'PMRT Faculty',
    description:
      'This course covers flashing, firmware matching, account recovery, and common service software workflows. It is designed for technicians who handle mobile software and diagnostics work on the bench.',
    thumbnail:
      'https://images.unsplash.com/photo-1558449028-b06a8d9635b9?auto=format&fit=crop&w=1200&q=80',
    duration: '6h 15m',
    lessonCount: 5,
    level: 'Intermediate',
    objectives: [
      'Match firmware, model numbers, and service files before starting a job',
      'Use PC tools for backup, restore, and common software repairs',
      'Record customer approvals and complete post-service device checks',
    ],
    content: [
      {
        id: 'cmst-1',
        title: 'Software Repair Workspace Setup',
        type: 'video',
        duration: '15 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'PC preparation, drivers, cables, and safe handling before software jobs.',
      },
      {
        id: 'cmst-2',
        title: 'Firmware and Model Matching Guide',
        type: 'material',
        description: 'Build numbers, region codes, and file selection reference sheet.',
        ...nextDemoGuide(),
      },
      {
        id: 'cmst-3',
        title: 'Flashing and Recovery Workflow',
        type: 'video',
        duration: '26 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Download mode, recovery mode, and verified flash procedure overview.',
      },
      {
        id: 'cmst-4',
        title: 'Account, Pattern, and Service Unlock Basics',
        type: 'video',
        duration: '19 min',
        videoUrl: nextDemoVideoUrl(),
        description: 'Legal intake checks and common software service scenarios on the bench.',
      },
      {
        id: 'cmst-5',
        title: 'Software Job Handover Checklist',
        type: 'material',
        description: 'Customer approval, backup notes, and final device verification list.',
        ...nextDemoGuide(),
      },
    ],
  },
];
