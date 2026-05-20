import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/constants/theme';

const perks = [
  { id: 'video', label: 'Video lessons', backgroundColor: '#D4EFF7', borderColor: '#7DD3ED' },
  { id: 'guides', label: 'Downloadable guides', backgroundColor: '#CFF4F8', borderColor: '#67E8F9' },
  { id: 'updates', label: 'Course updates', backgroundColor: '#E0F4FA', borderColor: '#4BB8D8' },
] as const;

const SUPPORT_WHATSAPP_URL = `https://wa.me/923224071299?text=${encodeURIComponent('Hi, I need help with PMRT courses.')}`;

export function CourseSupportSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Course includes</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {perks.map((perk) => (
          <View
            key={perk.id}
            style={[styles.chip, { backgroundColor: perk.backgroundColor, borderColor: perk.borderColor }]}>
            <Text style={styles.chipText}>{perk.label}</Text>
          </View>
        ))}
      </ScrollView>
      <Pressable
        accessibilityRole="button"
        onPress={async () => {
          try {
            await Linking.openURL(SUPPORT_WHATSAPP_URL);
          } catch {
            Alert.alert('Could not open WhatsApp', 'Install WhatsApp or try again.');
          }
        }}
        style={({ pressed }) => [styles.supportCard, pressed && styles.pressed]}>
        <Ionicons name="chatbubbles-outline" size={28} color={colors.primaryDark} />
        <View style={styles.supportCopy}>
          <Text style={styles.supportEyebrow}>Need help?</Text>
          <Text style={styles.supportTitle}>Contact PMRT support</Text>
        </View>
        <Ionicons name="arrow-forward" size={18} color={colors.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  heading: {
    color: colors.text,
    fontSize: typography.section,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  chips: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  chipText: {
    color: colors.text,
    fontSize: typography.label,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  pressed: {
    opacity: 0.94,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginTop: spacing.sm,
  },
  supportCopy: {
    flex: 1,
    gap: 2,
  },
  supportEyebrow: {
    color: colors.textMuted,
    fontSize: typography.label,
    fontWeight: '500',
  },
  supportTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
});
