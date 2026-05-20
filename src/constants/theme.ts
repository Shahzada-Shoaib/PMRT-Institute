export const colors = {
  background: '#F1F5F9',
  surface: '#FFFFFF',
  text: '#0F172A',
  textMuted: '#64748B',
  textOnPrimary: '#FFFFFF',
  border: '#E2E8F0',
  primary: '#21A1C8',
  primaryDark: '#157A96',
  primaryLight: '#4BB8D8',
  secondary: '#0E9BB5',
  accent: '#38BDF8',
  success: '#10B981',
  danger: '#EF4444',
  overlay: 'rgba(15, 23, 42, 0.45)',
};

export const gradients = {
  splash: ['#0B1220', '#0C4A6E', '#157A96', '#21A1C8'] as const,
  screen: ['#FFFFFF', '#FAFBFC', '#F4F6F8', '#F1F5F9'] as const,
  loginBackdrop: ['#0F172A', '#0C4A6E', '#157A96'] as const,
  loginPanel: ['#FFFFFF', '#FAFBFC', '#F4F6F8'] as const,
  banner: ['#21A1C8', '#4BB8D8', '#0EA5E9'] as const,
  bannerOverlay: ['rgba(33,161,200,0.12)', 'rgba(21,122,150,0.55)', 'rgba(14,90,117,0.92)'] as const,
  primaryButton: ['#4BB8D8', '#21A1C8'] as const,
  secondaryButton: ['#21A1C8', '#157A96'] as const,
  googleButton: ['#FFFFFF', '#F1F5F9'] as const,
  card: ['#FFFFFF', '#FAFBFC'] as const,
  tile: ['#FFFFFF', '#F8FAFC', '#F1F5F9'] as const,
  listItem: ['#FFFFFF', '#F8FAFC'] as const,
  panel: ['#FFFFFF', '#F8FAFC', '#F1F5F9'] as const,
  tabActive: ['#4BB8D8', '#21A1C8'] as const,
  headerBadge: ['#F1F5F9', '#E2E8F0'] as const,
  accentVideo: ['#21A1C8', '#157A96'] as const,
  accentMaterial: ['#38BDF8', '#21A1C8'] as const,
  accentBar: ['#21A1C8', '#0EA5E9'] as const,
  header: ['#FFFFFF', '#FAFBFC', '#F4F7FA'] as const,
  logoBadge: ['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)'] as const,
  menuSky: ['#38BDF8', '#21A1C8'] as const,
  menuTeal: ['#14B8A6', '#21A1C8'] as const,
  menuDeep: ['#4BB8D8', '#157A96'] as const,
  menuBrand: ['#157A96', '#21A1C8'] as const,
};

export const gradientProps = {
  screen: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  panel: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  button: { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  banner: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  hero: 30,
  title: 22,
  section: 18,
  body: 16,
  caption: 13,
  label: 12,
};

export const layout = {
  minTouch: 48,
  screenPadding: 20,
};
