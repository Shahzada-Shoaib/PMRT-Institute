import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { GoogleMark } from '@/components/login/GoogleMark';
import { colors, layout, radius } from '@/constants/theme';

type GoogleSignInButtonProps = Omit<PressableProps, 'style'> & {
  label?: string;
};

export function GoogleSignInButton({
  disabled,
  label = 'Continue with Google',
  ...props
}: GoogleSignInButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      {...props}
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}>
      <View style={styles.iconShell}>
        <GoogleMark size={20} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: layout.minTouch,
    borderRadius: radius.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  iconShell: {
    position: 'absolute',
    left: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  pressed: {
    backgroundColor: '#F2F2F2',
  },
  disabled: {
    opacity: 0.6,
  },
});
