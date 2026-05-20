import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';
import type { Course } from '@/types/course';

type CourseDetailHeroProps = {
  course: Course;
};

export function CourseDetailHero({ course }: CourseDetailHeroProps) {
  return (
    <LinearGradient
      colors={gradients.header}
      start={gradientProps.screen.start}
      end={gradientProps.screen.end}
      style={styles.container}>
      <View style={styles.glow} />
      <View style={styles.imageShell}>
        <Image source={{ uri: course.thumbnail }} style={styles.image} contentFit="cover" />
        <LinearGradient
          colors={gradients.accentBar}
          start={gradientProps.button.start}
          end={gradientProps.button.end}
          style={styles.levelBadge}>
          <Text style={styles.levelText}>{course.level}</Text>
        </LinearGradient>
        <LinearGradient
          colors={['transparent', 'rgba(15,23,42,0.35)']}
          start={gradientProps.panel.start}
          end={gradientProps.panel.end}
          style={styles.bottomOverlay}
        />
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.metaLine}>
          {course.level} · {course.lessonCount} lessons · {course.duration}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: '#157A96',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -40,
    right: -20,
    backgroundColor: 'rgba(33, 161, 200, 0.12)',
  },
  imageShell: {
    height: 208,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  levelBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 5,
  },
  levelText: {
    color: colors.textOnPrimary,
    fontSize: typography.label,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 56,
  },
  copy: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  metaLine: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '500',
    lineHeight: 18,
  },
});
