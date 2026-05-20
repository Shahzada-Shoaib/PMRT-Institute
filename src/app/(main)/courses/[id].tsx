import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { CourseContentItem } from '@/components/course/CourseContentItem';
import { CourseOverviewSection } from '@/components/course/CourseOverviewSection';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { SegmentedTabs } from '@/components/ui/SegmentedTabs';
import { colors, gradientProps, gradients, spacing, typography } from '@/constants/theme';
import { getCourseById } from '@/services/courseService';
import type { Course } from '@/types/course';

const tabs = ['Overview', 'Content'] as const;
type CourseTab = (typeof tabs)[number];

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<CourseTab>('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    getCourseById(id)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (activeTab !== 'Content') {
      setSearchQuery('');
    }
  }, [activeTab]);

  const videoLessons = useMemo(
    () => course?.content.filter((item) => item.type === 'video') ?? [],
    [course],
  );

  const filteredVideoLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return videoLessons;
    }

    return videoLessons.filter(
      (item) =>
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query),
    );
  }, [searchQuery, videoLessons]);

  if (loading) {
    return (
      <Screen>
        <ScreenHeader title="Course" />
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (!course) {
    return (
      <Screen>
        <ScreenHeader title="Course" />
        <Text style={styles.empty}>Course not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable>
      <ScreenHeader />
      <SegmentedTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      {activeTab === 'Overview' ? (
        <CourseOverviewSection course={course} />
      ) : (
        <View style={styles.contentSection}>
          <View style={styles.contentHeader}>
            <LinearGradient
              colors={gradients.accentBar}
              start={gradientProps.button.start}
              end={gradientProps.button.end}
              style={styles.contentAccent}
            />
            <Text style={styles.contentHeading}>content</Text>
          </View>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search lessons" />
          {filteredVideoLessons.length === 0 ? (
            <Text style={styles.emptySearch}>No lessons match your search.</Text>
          ) : (
            filteredVideoLessons.map((item) => {
              const itemIndex = course.content.findIndex((entry) => entry.id === item.id);
              const linkedGuide = course.content[itemIndex + 1];
              const lessonIndex = videoLessons.findIndex((entry) => entry.id === item.id);

              return (
                <CourseContentItem
                  key={item.id}
                  courseId={course.id}
                  item={item}
                  index={lessonIndex}
                  hasGuide={linkedGuide?.type === 'material'}
                />
              );
            })
          )}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
  contentSection: {
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  contentAccent: {
    width: 4,
    height: 18,
    borderRadius: 999,
  },
  contentHeading: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'lowercase',
  },
  emptySearch: {
    color: colors.textMuted,
    fontSize: typography.body,
    paddingTop: spacing.xs,
  },
});
