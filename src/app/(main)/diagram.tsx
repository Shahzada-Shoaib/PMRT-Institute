import { StyleSheet, Text, View } from 'react-native';

import { LessonPlaylistItem } from '@/components/lesson/LessonPlaylistItem';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { diagramGuides } from '@/data/mock/diagramGuides';
import { colors, spacing, typography } from '@/constants/theme';
import type { CourseContentItem } from '@/types/course';
import { openGuideMaterial } from '@/utils/openGuideMaterial';

function toGuideItem(row: (typeof diagramGuides)[number]): CourseContentItem {
  return {
    id: row.id,
    title: row.title,
    type: 'material',
    description: '',
    materialUrl: row.url,
    materialFormat: row.format,
  };
}

const guideItems = diagramGuides.map(toGuideItem);

export default function DiagramScreen() {
  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <ScreenHeader title="Diagram" subtitle="Board maps & PDF guides — tap to open" />
      <Text style={styles.heading}>Guides</Text>
      <View style={styles.list}>
        {guideItems.map((item, index) => (
          <LessonPlaylistItem
            key={item.id}
            item={item}
            index={index}
            active={false}
            onPress={() => void openGuideMaterial(item)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  heading: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  list: {
    marginBottom: spacing.md,
  },
});
