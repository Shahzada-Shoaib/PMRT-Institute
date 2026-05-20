import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';

import { colors, gradientProps, gradients, radius } from '@/constants/theme';

type GradientCardProps = PropsWithChildren<{
  gradientColors?: readonly [string, string, ...string[]];
  style?: ViewStyle;
  borderRadius?: number;
}>;

export function GradientCard({
  children,
  gradientColors = gradients.card,
  style,
  borderRadius = radius.lg,
}: GradientCardProps) {
  return (
    <LinearGradient
      colors={gradientColors}
      start={gradientProps.panel.start}
      end={gradientProps.panel.end}
      style={[styles.card, { borderRadius }, style]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
});
