import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { LessonPlaylistItem } from '@/components/lesson/LessonPlaylistItem';
import { LessonVideoPlayer } from '@/components/lesson/LessonVideoPlayer';
import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { freeVideos } from '@/data/mock/freeVideos';
import { colors, spacing, typography } from '@/constants/theme';
import type { CourseContentItem } from '@/types/course';

function toPlaylistItem(row: (typeof freeVideos)[number]): CourseContentItem {
  return {
    id: row.id,
    title: row.title,
    type: 'video',
    duration: row.duration,
    description: '',
    videoUrl: row.videoUrl,
  };
}

export default function FreeVideosScreen() {
  const items = useMemo(() => freeVideos.map(toPlaylistItem), []);
  const [activeId, setActiveId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.title.toLowerCase().includes(q));
  }, [items, searchQuery]);

  useEffect(() => {
    if (activeId && !filteredItems.some((i) => i.id === activeId)) {
      setActiveId('');
    }
  }, [filteredItems, activeId]);

  const active = useMemo(
    () => items.find((v) => v.id === activeId && v.videoUrl) ?? null,
    [activeId, items],
  );

  if (items.length === 0) {
    return (
      <Screen scrollable>
        <ScreenHeader title="Free Videos" subtitle="Open repair lessons" />
        <Text style={styles.empty}>No videos yet.</Text>
      </Screen>
    );
  }

  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Free Videos"
        subtitle={active ? 'PMRT preview lessons' : 'Tap a video to watch'}
      />
      <View style={styles.searchWrap}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search videos"
        />
      </View>
      {active?.videoUrl ? (
        <>
          <LessonVideoPlayer key={active.id} videoUrl={active.videoUrl} />
          <View style={styles.nowPlaying}>
            <Text style={styles.nowPlayingLabel}>Now playing</Text>
            <Text style={styles.nowPlayingTitle}>{active.title}</Text>
          </View>
        </>
      ) : null}
      {filteredItems.length === 0 ? (
        <Text style={styles.noResults}>No videos match your search.</Text>
      ) : (
        filteredItems.map((item, index) => (
          <LessonPlaylistItem
            key={item.id}
            item={item}
            index={index}
            active={item.id === activeId}
            onPress={() => setActiveId(item.id)}
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  searchWrap: {
    marginBottom: spacing.md,
  },
  empty: {
    color: colors.textMuted,
    fontSize: typography.body,
    paddingHorizontal: spacing.md,
  },
  noResults: {
    color: colors.textMuted,
    fontSize: typography.body,
    marginTop: spacing.sm,
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
});
