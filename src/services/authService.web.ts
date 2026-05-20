import type { FirebaseAuthTypes } from '@react-native-firebase/auth';

export async function configureGoogleSignIn() {
  return;
}

export async function signInWithGoogle() {
  throw new Error('Google sign-in is only available in the Android or iOS app.');
}

export async function signOut() {
  return;
}

export function subscribeToAuthChanges(onChange: (user: FirebaseAuthTypes.User | null) => void) {
  onChange(null);
  return () => undefined;
}
