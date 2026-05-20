import { BlurTargetView } from 'expo-blur';
import { Redirect, router } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoogleSignInButton } from '@/components/login/GoogleSignInButton';
import { LoginCarousel } from '@/components/login/LoginCarousel';
import { LoginWelcomePanel } from '@/components/login/LoginWelcomePanel';
import { colors, spacing } from '@/constants/theme';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useAuth } from '@/providers/AuthProvider';

export default function LoginScreen() {
  const { login, screenPadding, type, lineHeight, fontScale } = useResponsiveLayout();
  const { user, guestMode, initializing, isSigningIn, signInWithGoogle, skipLogin } = useAuth();
  const blurTargetRef = useRef<View>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.replace('/(main)');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google sign-in failed. Please try again.';
      Alert.alert('Sign in failed', message);
    }
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.surface,
        },
        body: {
          flex: 1,
          backgroundColor: colors.surface,
        },
        carouselSection: {
          flex: 1,
          minHeight: login.carouselHeight,
        },
        skipRow: {
          alignItems: 'flex-end',
          paddingHorizontal: screenPadding,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
        },
        skipLabel: {
          color: colors.textMuted,
          fontSize: type.body,
          fontWeight: '600',
        },
        carouselInner: {
          flex: 1,
        },
        panelWrap: {
          flexShrink: 0,
          marginHorizontal: spacing.sm,
          marginTop: spacing.sm,
          marginBottom: spacing.sm,
          ...Platform.select({
            ios: {
              shadowColor: '#21A1C8',
              shadowOpacity: 0.1,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
            },
            android: {
              elevation: 4,
            },
            default: {},
          }),
        },
        panelScroll: {
          flexGrow: 1,
        },
        panelContent: {
          paddingHorizontal: screenPadding,
          gap: login.panelGap,
          paddingTop: login.panelPaddingTop,
          paddingBottom: login.isShortHeight ? 8 : 12,
        },
        heading: {
          color: colors.text,
          fontSize: type.title,
          fontWeight: '700',
          lineHeight: lineHeight.title,
        },
        copy: {
          color: colors.textMuted,
          fontSize: type.body,
          lineHeight: lineHeight.body,
        },
      }),
    [lineHeight, login, screenPadding, type],
  );

  const handleSkip = () => {
    skipLogin();
    router.replace('/(main)');
  };

  if (!initializing && user) {
    return <Redirect href="/(main)" />;
  }

  if (!initializing && guestMode) {
    return <Redirect href="/(main)" />;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.body}>
        <BlurTargetView ref={blurTargetRef} style={styles.body}>
          <View style={styles.carouselSection}>
            <View style={styles.skipRow}>
              <Pressable accessibilityRole="button" hitSlop={8} onPress={handleSkip}>
                <Text maxFontSizeMultiplier={fontScale} style={styles.skipLabel}>
                  Skip
                </Text>
              </Pressable>
            </View>
            <View style={styles.carouselInner}>
              <LoginCarousel />
            </View>
          </View>
          <SafeAreaView edges={['bottom']} style={styles.panelWrap}>
            <LoginWelcomePanel blurTargetRef={blurTargetRef}>
              <ScrollView
                contentContainerStyle={styles.panelScroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <View style={styles.panelContent}>
                  <Text maxFontSizeMultiplier={fontScale} style={styles.heading}>
                    Welcome back
                  </Text>
                  <Text maxFontSizeMultiplier={fontScale} style={styles.copy}>
                    Sign in with Google to access mobile repairing courses and training material.
                  </Text>
                  <GoogleSignInButton
                    disabled={initializing || isSigningIn}
                    label={isSigningIn ? 'Signing in...' : 'Continue with Google'}
                    onPress={handleGoogleSignIn}
                  />
                </View>
              </ScrollView>
            </LoginWelcomePanel>
          </SafeAreaView>
        </BlurTargetView>
      </SafeAreaView>
    </View>
  );
}
