import { StyleSheet, Text, View } from 'react-native';

import { CourseDetailHero } from '@/components/course/CourseDetailHero';
import { CourseSupportSection } from '@/components/course/CourseSupportSection';
import { colors, radius, spacing, typography } from '@/constants/theme';
import type { Course } from '@/types/course';

type CourseOverviewSectionProps = {
  course: Course;
};

export function CourseOverviewSection({ course }: CourseOverviewSectionProps) {
  return (
    <View style={styles.container}>
      <CourseDetailHero course={course} />
      <View style={styles.block}>
        <Text style={styles.heading}>Course overview</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.body}>{course.description}</Text>
        </View>
      </View>
      <View style={styles.block}>
        <Text style={styles.heading}>Learning outcomes</Text>
        {course.objectives.map((objective) => (
          <View key={objective} style={styles.objectiveRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.objectiveText}>{objective}</Text>
          </View>
        ))}
      </View>
      <CourseSupportSection />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
  block: {
    gap: spacing.sm,
  },
  heading: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  aboutCard: {
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  body: {
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '400',
  },
  objectiveRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  bullet: {
    color: colors.primary,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '700',
  },
  objectiveText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    lineHeight: 24,
    fontWeight: '400',
  },
});
