import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/constants/theme';

type LessonVideoPlayerProps = {
  videoUrl: string;
};

export function LessonVideoPlayer({ videoUrl }: LessonVideoPlayerProps) {
  const player = useVideoPlayer(videoUrl, (instance) => {
    instance.loop = false;
    instance.play();
  });

  return (
    <View style={styles.shell}>
      <VideoView player={player} style={styles.video} nativeControls contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: colors.border,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
