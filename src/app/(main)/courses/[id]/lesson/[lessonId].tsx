import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { LessonPlaylistItem } from '@/components/lesson/LessonPlaylistItem';
import { LessonVideoPlayer } from '@/components/lesson/LessonVideoPlayer';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { colors, spacing, typography } from '@/constants/theme';
import { getCourseById } from '@/services/courseService';
import type { Course, CourseContentItem } from '@/types/course';
import { openGuideMaterial } from '@/utils/openGuideMaterial';

function getDefaultVideo(content: CourseContentItem[]) {
  return content.find((item) => item.type === 'video') ?? null;
}

export default function LessonScreen() {
  const { id, lessonId } = useLocalSearchParams<{ id: string; lessonId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideoId, setActiveVideoId] = useState('');
  const openedGuideIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    getCourseById(id)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!course) {
      return;
    }

    const lesson = lessonId ? course.content.find((item) => item.id === lessonId) : undefined;

    if (lesson?.type === 'video') {
      setActiveVideoId(lesson.id);
      return;
    }

    const defaultVideo = getDefaultVideo(course.content);
    if (defaultVideo) {
      setActiveVideoId(defaultVideo.id);
    }

    if (lesson?.type === 'material' && openedGuideIdRef.current !== lesson.id) {
      openedGuideIdRef.current = lesson.id;
      void openGuideMaterial(lesson);
    }
  }, [course, lessonId]);

  const activeVideo = useMemo<CourseContentItem | null>(() => {
    if (!course) {
      return null;
    }

    return (
      course.content.find((item) => item.id === activeVideoId && item.type === 'video') ??
      getDefaultVideo(course.content)
    );
  }, [activeVideoId, course]);

  const handlePlaylistPress = (item: CourseContentItem) => {
    if (item.type === 'video') {
      setActiveVideoId(item.id);
      return;
    }

    void openGuideMaterial(item);
  };

  if (loading) {
    return (
      <Screen>
        <ScreenHeader title="Lesson" />
        <View style={styles.loader}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (!course || !activeVideo) {
    return (
      <Screen>
        <ScreenHeader title="Lesson" />
        <Text style={styles.empty}>Lesson not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <ScreenHeader title={course.title} subtitle={course.instructor} />
      {activeVideo.videoUrl ? (
        <LessonVideoPlayer key={activeVideo.id} videoUrl={activeVideo.videoUrl} />
      ) : null}
      <View style={styles.nowPlaying}>
        <Text style={styles.nowPlayingLabel}>Now playing</Text>
        <Text style={styles.nowPlayingTitle}>{activeVideo.title}</Text>
      </View>
      <Text style={styles.playlistHeading}>Playlist</Text>
      {course.content.map((item, index) => (
        <LessonPlaylistItem
          key={item.id}
          item={item}
          index={index}
          active={item.type === 'video' && item.id === activeVideo.id}
          onPress={() => handlePlaylistPress(item)}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.body,
  },
  nowPlaying: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: 4,
  },
  nowPlayingLabel: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  nowPlayingTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  playlistHeading: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
});
