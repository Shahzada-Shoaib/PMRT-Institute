import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';
import type { CourseContentItem } from '@/types/course';

type LessonPlaylistItemProps = {
  item: CourseContentItem;
  index: number;
  active: boolean;
  onPress: () => void;
};

export function LessonPlaylistItem({ item, index, active, onPress }: LessonPlaylistItemProps) {
  const isVideo = item.type === 'video';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <View style={[styles.card, active && styles.cardActive]}>
        <LinearGradient
          colors={isVideo ? gradients.accentVideo : gradients.accentMaterial}
          start={gradientProps.button.start}
          end={gradientProps.button.end}
          style={styles.indexBadge}>
          <Text style={styles.indexText}>{String(index + 1).padStart(2, '0')}</Text>
        </LinearGradient>
        <View style={styles.copy}>
          <Text style={[styles.title, active && styles.titleActive]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.meta}>
            {isVideo ? `video${item.duration ? ` · ${item.duration}` : ''}` : 'guide'}
          </Text>
        </View>
        {active ? (
          <Ionicons
            name={
              isVideo
                ? 'play-circle'
                : item.materialFormat === 'pdf'
                  ? 'document-text'
                  : 'image'
            }
            size={20}
            color={colors.primary}
          />
        ) : (
          <Ionicons
            name={isVideo ? 'play-outline' : 'document-text-outline'}
            size={18}
            color={colors.textMuted}
          />
        )}
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardActive: {
    backgroundColor: '#E8F6FA',
    borderColor: '#A8D9EA',
  },
  indexBadge: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
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
    gap: 2,
  },
  title: {
    color: colors.text,
    fontSize: typography.caption,
    fontWeight: '600',
    lineHeight: 18,
  },
  titleActive: {
    color: colors.primaryDark,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '600',
    textTransform: 'lowercase',
  },
});
