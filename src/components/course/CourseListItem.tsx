import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';
import type { Course } from '@/types/course';

type CourseListItemProps = {
  course: Course;
  onPress: () => void;
};

export function CourseListItem({ course, onPress }: CourseListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient
        colors={gradients.listItem}
        start={gradientProps.button.start}
        end={gradientProps.button.end}
        style={styles.row}>
        <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} contentFit="cover" />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {course.title}
          </Text>
          <Text style={styles.meta}>
            {course.level} · {course.lessonCount} lessons · {course.duration}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.sm,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.94,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  thumbnail: {
    width: 76,
    height: 76,
    borderRadius: radius.md,
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
  },
  meta: {
    color: colors.primary,
    fontSize: typography.label,
    fontWeight: '600',
    marginTop: 2,
  },
});
