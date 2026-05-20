import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GradientCard } from '@/components/layout/GradientCard';
import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';
import type { CourseContentItem as CourseContentItemType } from '@/types/course';

type CourseContentItemProps = {
  courseId: string;
  item: CourseContentItemType;
  index: number;
  hasGuide?: boolean;
};

export function CourseContentItem({ courseId, item, index, hasGuide = false }: CourseContentItemProps) {
  const isVideo = item.type === 'video';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/(main)/courses/${courseId}/lesson/${item.id}`)}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <GradientCard gradientColors={gradients.listItem} style={styles.card}>
        <View style={styles.badgeRow}>
          <View style={styles.typePills}>
            <View style={[styles.typePill, styles.videoPill]}>
              <Ionicons name="play" size={7} color={colors.primaryDark} />
              <Text style={[styles.typeText, styles.videoText]}>video</Text>
            </View>
            {hasGuide ? (
              <View style={[styles.typePill, styles.materialPill]}>
                <Ionicons name="document-text-outline" size={7} color={colors.primaryDark} />
                <Text style={[styles.typeText, styles.materialText]}>guide</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.mainRow}>
          <LinearGradient
            colors={isVideo ? gradients.accentVideo : gradients.accentMaterial}
            start={gradientProps.button.start}
            end={gradientProps.button.end}
            style={styles.indexBadge}>
            <Text style={styles.indexText}>{String(index + 1).padStart(2, '0')}</Text>
          </LinearGradient>
          <View style={styles.copy}>
            <Text style={styles.title}>{item.title}</Text>
            {isVideo && item.duration ? <Text style={styles.meta}>{item.duration}</Text> : null}
          </View>
        </View>
      </GradientCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.94,
  },
  card: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
    gap: 2,
    minHeight: 68,
  },
  badgeRow: {
    alignItems: 'flex-end',
  },
  typePills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  indexBadge: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    color: colors.textOnPrimary,
    fontSize: typography.label,
    fontWeight: '800',
  },
  copy: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    borderRadius: radius.pill,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderWidth: 1,
  },
  videoPill: {
    backgroundColor: '#E8F6FA',
    borderColor: '#A8D9EA',
  },
  materialPill: {
    backgroundColor: '#ECFEFF',
    borderColor: '#A5F3FC',
  },
  typeText: {
    fontSize: 8,
    fontWeight: '700',
    textTransform: 'lowercase',
  },
  videoText: {
    color: colors.primaryDark,
  },
  materialText: {
    color: colors.primaryDark,
  },
  meta: {
    color: colors.primary,
    fontSize: typography.label,
    fontWeight: '700',
  },
});
