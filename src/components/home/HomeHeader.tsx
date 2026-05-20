import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { AppLogo } from '@/components/brand/AppLogo';
import { HomeBanner } from '@/components/home/HomeBanner';
import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';

export function HomeHeader() {
  return (
    <LinearGradient
      colors={gradients.header}
      start={gradientProps.screen.start}
      end={gradientProps.screen.end}
      style={styles.container}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <View style={styles.topRow}>
        <View style={styles.copy}>
          <LinearGradient
            colors={gradients.accentBar}
            start={gradientProps.button.start}
            end={gradientProps.button.end}
            style={styles.eyebrow}>
            <Text style={styles.eyebrowText}>Mobile Repair Training</Text>
          </LinearGradient>
          <Text style={styles.title}>PMRT Institute</Text>
          <Text style={styles.tagline}>
            Practical courses for screen, battery, charging, and board repair.
          </Text>
        </View>
        <AppLogo size={44} />
      </View>
      <HomeBanner style={styles.banner} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#157A96',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  glowTop: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -50,
    right: -30,
    backgroundColor: 'rgba(33, 161, 200, 0.16)',
  },
  glowBottom: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    bottom: -40,
    left: -20,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  eyebrowText: {
    color: colors.textOnPrimary,
    fontSize: typography.label,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#BB1F24',
    fontSize: typography.hero,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    color: colors.textMuted,
    fontSize: typography.caption,
    lineHeight: 18,
    maxWidth: 260,
  },
  banner: {
    marginBottom: 0,
  },
});
