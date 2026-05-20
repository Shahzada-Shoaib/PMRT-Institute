import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { colors, spacing, typography } from '@/constants/theme';

/** Pakistan: 03224071299 → wa.me expects 923224071299 */
const SUPPORT_WHATSAPP_URL = `https://wa.me/923224071299?text=${encodeURIComponent('Hi, I need help with PMRT courses.')}`;

export default function ChatUsScreen() {
  const didAutoOpen = useRef(false);

  const openWhatsApp = useCallback(async () => {
    try {
      await Linking.openURL(SUPPORT_WHATSAPP_URL);
    } catch {
      Alert.alert('Could not open WhatsApp', 'Install WhatsApp or try again.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (didAutoOpen.current) return;
      didAutoOpen.current = true;
      void openWhatsApp();
    }, [openWhatsApp]),
  );

  return (
    <Screen scrollable>
      <ScreenHeader title="Chat Us" subtitle="Support on WhatsApp" />
      <View style={styles.body}>
        <Text style={styles.copy}>
          WhatsApp should open to PMRT support (0322-4071299). If it didn’t, tap below.
        </Text>
        <PrimaryButton label="Open WhatsApp" onPress={() => void openWhatsApp()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  copy: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
