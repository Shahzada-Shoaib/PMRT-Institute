import { router } from 'expo-router';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/providers/AuthProvider';
import { colors, radius, spacing, typography } from '@/constants/theme';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch {
      Alert.alert('Sign out failed', 'Please try again.');
    }
  };

  return (
    <Screen scrollable>
      <ScreenHeader title="Profile" subtitle="Account and settings" />
      <View style={styles.card}>
        {user?.photoURL ? (
          <Image accessibilityIgnoresInvertColors source={{ uri: user.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackLabel}>
              {(user?.displayName ?? user?.email ?? 'P').charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{user?.displayName ?? 'PMRT student'}</Text>
        {user?.email ? <Text style={styles.email}>{user.email}</Text> : null}
      </View>
      <PrimaryButton label="Sign out" onPress={handleSignOut} variant="outline" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  avatar: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  avatarFallback: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 36,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  avatarFallbackLabel: {
    color: colors.primary,
    fontSize: typography.title,
    fontWeight: '700',
  },
  name: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  email: {
    color: colors.textMuted,
    fontSize: typography.body,
    textAlign: 'center',
  },
});
