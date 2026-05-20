import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradientProps, gradients, spacing, typography } from '@/constants/theme';

type ScreenHeaderProps = {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
};

export function ScreenHeader({ title, subtitle, showBack = true }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
          <LinearGradient
            colors={gradients.headerBadge}
            start={gradientProps.button.start}
            end={gradientProps.button.end}
            style={styles.backGradient}>
            <Ionicons name="arrow-back" size={22} color={colors.primaryDark} />
          </LinearGradient>
        </Pressable>
      ) : null}
      {title ? (
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      ) : (
        <View style={styles.copy} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  backButton: {
    borderRadius: 21,
    overflow: 'hidden',
  },
  backGradient: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 21,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.caption,
  },
});
