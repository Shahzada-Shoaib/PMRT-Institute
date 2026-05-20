import { Image } from 'expo-image';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/constants/theme';
import { bannerImage } from '@/data/mock/media';

type HomeBannerProps = {
  style?: ViewStyle;
};

export function HomeBanner({ style }: HomeBannerProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: bannerImage }} style={styles.image} contentFit="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 168,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.55)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
