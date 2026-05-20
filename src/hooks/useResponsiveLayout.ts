import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { typography } from '@/constants/theme';
import {
  getLoginLayout,
  getScreenPadding,
  getTabBarMetrics,
  scaleByHeight,
  scaleByWidth,
} from '@/utils/responsive';

export function useResponsiveLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  return useMemo(() => {
    const login = getLoginLayout(height);
    const tabBar = getTabBarMetrics(insets.bottom);
    const typeScale = clampFontScale(fontScale);

    return {
      width,
      height,
      fontScale: typeScale,
      insets,
      screenPadding: getScreenPadding(width),
      isNarrowWidth: width < 360,
      isWideWidth: width >= 768,
      login,
      tabBar,
      type: {
        hero: scaleByWidth(typography.hero, width),
        title: scaleByWidth(typography.title, width),
        section: scaleByWidth(typography.section, width),
        body: scaleByWidth(typography.body, width),
        caption: scaleByWidth(typography.caption, width),
        label: scaleByWidth(typography.label, width),
      },
      lineHeight: {
        hero: scaleByHeight(34, height),
        title: scaleByHeight(28, height),
        section: scaleByHeight(24, height),
        body: scaleByHeight(22, height),
      },
    };
  }, [fontScale, height, insets, width]);
}

function clampFontScale(fontScale: number) {
  return Math.min(Math.max(fontScale, 1), 1.2);
}
