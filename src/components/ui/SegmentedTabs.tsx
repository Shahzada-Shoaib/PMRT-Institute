import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, gradientProps, gradients, radius, spacing, typography } from '@/constants/theme';

type SegmentedTabsProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onChange: (tab: T) => void;
};

export function SegmentedTabs<T extends string>({ tabs, active, onChange }: SegmentedTabsProps<T>) {
  return (
    <LinearGradient
      colors={gradients.card}
      start={gradientProps.panel.start}
      end={gradientProps.panel.end}
      style={styles.container}>
      {tabs.map((tab) => {
        const selected = tab === active;
        return (
          <Pressable
            key={tab}
            accessibilityRole="button"
            onPress={() => onChange(tab)}
            style={styles.tabPressable}>
            {selected ? (
              <LinearGradient
                colors={gradients.tabActive}
                start={gradientProps.button.start}
                end={gradientProps.button.end}
                style={styles.tabActive}>
                <Text style={styles.labelActive}>{tab}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.tab}>
                <Text style={styles.label}>{tab}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: radius.lg,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  tabPressable: {
    flex: 1,
  },
  tab: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  tabActive: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  label: {
    color: colors.textMuted,
    fontSize: typography.caption,
    fontWeight: '700',
    letterSpacing: -0.1,
  },
  labelActive: {
    color: colors.textOnPrimary,
    fontSize: typography.caption,
    fontWeight: '800',
    letterSpacing: -0.1,
  },
});
