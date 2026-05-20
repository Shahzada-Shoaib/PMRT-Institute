import { demoGuideMaterials } from '@/data/mock/media';

/** Demo diagrams & board reference guides */
export const diagramGuides = [
  {
    id: 'dg-1',
    title: 'Charging board — component map',
    format: 'image' as const,
    url: demoGuideMaterials[1].url,
  },
  {
    id: 'dg-2',
    title: 'Bench reference sheet (PDF)',
    format: 'pdf' as const,
    url: demoGuideMaterials[0].url,
  },
  {
    id: 'dg-3',
    title: 'Power & flex routing diagram',
    format: 'image' as const,
    url: demoGuideMaterials[4].url,
  },
  {
    id: 'dg-4',
    title: 'Repair checklist — printable',
    format: 'pdf' as const,
    url: demoGuideMaterials[2].url,
  },
  {
    id: 'dg-5',
    title: 'Board overview — labels',
    format: 'image' as const,
    url: demoGuideMaterials[3].url,
  },
];
