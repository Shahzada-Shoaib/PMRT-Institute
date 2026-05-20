import { LinearGradient } from 'expo-linear-gradient';
import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, View, type ScrollViewProps, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { gradientProps, gradients } from '@/constants/theme';

type ScreenProps = PropsWithChildren<{
  scrollable?: boolean;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  style?: ViewStyle;
}>;

export function Screen({
  children,
  scrollable = false,
  contentContainerStyle,
  style,
}: ScreenProps) {
  const { screenPadding } = useResponsiveLayout();

  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContent,
        { paddingHorizontal: screenPadding, paddingBottom: screenPadding },
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, { paddingHorizontal: screenPadding }, style]}>{children}</View>
  );

  return (
    <LinearGradient
      colors={gradients.screen}
      start={gradientProps.screen.start}
      end={gradientProps.screen.end}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>{content}</SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
