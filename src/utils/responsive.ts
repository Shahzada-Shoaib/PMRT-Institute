const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function scaleByWidth(value: number, width: number) {
  const factor = clamp(width / BASE_WIDTH, 0.88, 1.12);
  return Math.round(value * factor);
}

export function scaleByHeight(value: number, height: number) {
  const factor = clamp(height / BASE_HEIGHT, 0.9, 1.08);
  return Math.round(value * factor);
}

export function getScreenPadding(width: number) {
  if (width < 360) {
    return 16;
  }

  if (width >= 768) {
    return 32;
  }

  return 20;
}

export function getLoginLayout(height: number) {
  const isShortHeight = height < 640;
  const isCompactHeight = height < 700;

  const carouselHeight = clamp(
    height * (isShortHeight ? 0.56 : isCompactHeight ? 0.62 : 0.68),
    280,
    height * 0.74,
  );

  return {
    isShortHeight,
    isCompactHeight,
    carouselHeight,
    panelPaddingTop: isShortHeight ? 8 : 12,
    panelGap: isShortHeight ? 8 : 12,
  };
}

export function getTabBarMetrics(insetsBottom: number) {
  return {
    height: 58 + Math.max(insetsBottom, 8),
    paddingBottom: Math.max(insetsBottom, 8),
    paddingTop: 8,
  };
}
