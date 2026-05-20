import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppLogo } from '@/components/brand/AppLogo';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing, typography } from '@/constants/theme';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

type TabIconProps = {
  outline: IoniconName;
  filled: IoniconName;
  color: string;
  size: number;
  focused: boolean;
};

function TabIcon({ outline, filled, color, focused }: TabIconProps) {
  return <Ionicons name={focused ? filled : outline} size={26} color={color} />;
}

export default function MainLayout() {
  const { tabBar } = useResponsiveLayout();
  const { user, guestMode, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.loading}>
        <AppLogo size={56} style={styles.loadingLogo} />
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!user && !guestMode) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: tabBar.height,
          paddingTop: tabBar.paddingTop,
          paddingBottom: tabBar.paddingBottom,
        },
        tabBarLabelStyle: {
          fontSize: typography.label,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (props) => <TabIcon outline="home-outline" filled="home" {...props} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: (props) => <TabIcon outline="library-outline" filled="library" {...props} />,
        }}
      />
      <Tabs.Screen
        name="chat-us"
        options={{
          title: 'Chat',
          tabBarIcon: (props) => (
            <TabIcon outline="chatbubbles-outline" filled="chatbubbles" {...props} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (props) => <TabIcon outline="person-outline" filled="person" {...props} />,
        }}
      />
      <Tabs.Screen name="free-videos" options={{ href: null }} />
      <Tabs.Screen name="about-us" options={{ href: null }} />
      <Tabs.Screen name="diagram" options={{ href: null }} />
      <Tabs.Screen name="pay-fee" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.lg,
    backgroundColor: colors.surface,
  },
  loadingLogo: {
    marginBottom: spacing.xs,
  },
});
