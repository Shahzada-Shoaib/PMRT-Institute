import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppLogo } from '@/components/brand/AppLogo';
import { colors, gradientProps, gradients, spacing, typography } from '@/constants/theme';
import { useAuth } from '@/providers/AuthProvider';

export default function SplashScreenRoute() {
  const { user, guestMode, initializing } = useAuth();

  useEffect(() => {
    if (initializing) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace(user || guestMode ? '/(main)' : '/login');
    }, 2200);

    return () => clearTimeout(timer);
  }, [guestMode, initializing, user]);

  return (
    <LinearGradient
      colors={gradients.splash}
      start={gradientProps.screen.start}
      end={gradientProps.screen.end}
      style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <AppLogo size={72} style={styles.logo} />
          <Text style={styles.title}>PMRT Institute</Text>
          <Text style={styles.subtitle}>Mobile repairing courses, videos, and workshop guides.</Text>
          <ActivityIndicator color={colors.textOnPrimary} style={styles.loader} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  logo: {
    marginBottom: spacing.sm,
  },
  title: {
    color: colors.textOnPrimary,
    fontSize: typography.hero,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: typography.body,
    textAlign: 'center',
    lineHeight: 24,
  },
  loader: {
    marginTop: spacing.lg,
  },
});
