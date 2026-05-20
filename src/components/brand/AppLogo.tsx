import { Image } from 'expo-image';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { pmrtLogo } from '@/constants/assets';

type AppLogoProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function AppLogo({ size = 56, style }: AppLogoProps) {
  return (
    <Image
      source={pmrtLogo}
      accessibilityLabel="PMRT Institute logo"
      style={[styles.logo, { width: size, height: size }, style]}
      contentFit="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'transparent',
  },
});
