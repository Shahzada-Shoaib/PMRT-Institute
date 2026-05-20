import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors, gradientProps, gradients, layout, radius, typography } from '@/constants/theme';

type PrimaryButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: 'primary' | 'outline' | 'light';
  style?: StyleProp<ViewStyle>;
};

export function PrimaryButton({
  label,
  variant = 'primary',
  style,
  ...props
}: PrimaryButtonProps) {
  if (variant === 'outline') {
    return (
      <Pressable
        {...props}
        style={({ pressed }) => [
          styles.base,
          styles.outline,
          pressed && styles.pressed,
          style,
        ]}>
        <Text style={styles.outlineLabel}>{label}</Text>
      </Pressable>
    );
  }

  if (variant === 'light') {
    return (
      <Pressable {...props} style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}>
        <LinearGradient
          colors={gradients.googleButton}
          start={gradientProps.panel.start}
          end={gradientProps.panel.end}
          style={styles.light}>
          <Text style={styles.lightLabel}>{label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable {...props} style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}>
      <LinearGradient
        colors={gradients.primaryButton}
        start={gradientProps.button.start}
        end={gradientProps.button.end}
        style={styles.gradient}>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    minHeight: layout.minTouch,
  },
  gradient: {
    minHeight: layout.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    color: colors.textOnPrimary,
    fontSize: typography.body,
    fontWeight: '600',
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  outlineLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '600',
  },
  light: {
    minHeight: layout.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  lightLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
});
