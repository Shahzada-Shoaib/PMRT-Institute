import { BlurView } from 'expo-blur';
import type { PropsWithChildren, RefObject } from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';

type LoginWelcomePanelProps = PropsWithChildren<{
  style?: ViewStyle;
  blurTargetRef?: RefObject<View | null>;
}>;

export function LoginWelcomePanel({ children, style, blurTargetRef }: LoginWelcomePanelProps) {
  const surfaceStyle = [styles.panel, style];

  if (Platform.OS === 'android' && blurTargetRef) {
    return (
      <BlurView
        blurTarget={blurTargetRef}
        blurMethod="dimezisBlurViewSdk31Plus"
        intensity={90}
        tint="extraLight"
        style={surfaceStyle}>
        <View style={styles.tint}>{children}</View>
      </BlurView>
    );
  }

  return (
    <BlurView intensity={68} tint="light" style={surfaceStyle}>
      <View style={styles.tint}>{children}</View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  panel: {
    overflow: 'hidden',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(165, 180, 252, 0.55)',
    backgroundColor: 'rgba(224, 231, 255, 0.78)',
  },
  tint: {
    backgroundColor: 'rgba(238, 242, 255, 0.28)',
  },
});
