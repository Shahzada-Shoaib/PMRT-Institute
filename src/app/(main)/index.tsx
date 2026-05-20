import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { HomeHeader } from '@/components/home/HomeHeader';
import { MenuTile } from '@/components/home/MenuTile';
import { Screen } from '@/components/layout/Screen';
import { menuItems } from '@/constants/menu';
import { colors, gradientProps, gradients, spacing, typography } from '@/constants/theme';

export default function MainHomeScreen() {
  return (
    <Screen scrollable contentContainerStyle={styles.content}>
      <HomeHeader />
      <View style={styles.sectionHeader}>
        <LinearGradient
          colors={gradients.accentBar}
          start={gradientProps.button.start}
          end={gradientProps.button.end}
          style={styles.sectionAccent}
        />
        <Text style={styles.sectionTitle}>Explore Training</Text>
      </View>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <MenuTile key={item.id} item={item} onPress={() => router.push(item.route)} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionAccent: {
    width: 4,
    height: 24,
    borderRadius: 999,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
