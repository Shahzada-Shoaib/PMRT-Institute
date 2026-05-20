import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MenuItem } from '@/constants/menu';
import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';

type MenuTileProps = {
  item: MenuItem;
  onPress: () => void;
};

export function MenuTile({ item, onPress }: MenuTileProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}>
      <LinearGradient
        colors={gradients.tile}
        start={gradientProps.panel.start}
        end={gradientProps.panel.end}
        style={styles.card}>
        <View style={styles.content}>
          <LinearGradient
            colors={item.gradient}
            start={gradientProps.button.start}
            end={gradientProps.button.end}
            style={styles.iconWrap}>
            <Ionicons name={item.icon} size={28} color={colors.textOnPrimary} />
          </LinearGradient>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }],
  },
  card: {
    minHeight: 148,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
    textAlign: 'center',
  },
});
