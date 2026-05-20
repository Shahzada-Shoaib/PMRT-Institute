import auth, { type FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { getGoogleWebClientId } from '@/utils/firebaseConfig';

let googleSignInConfigured = false;

export async function configureGoogleSignIn() {
  if (googleSignInConfigured) {
    return;
  }

  const webClientId = getGoogleWebClientId();
  if (!webClientId) {
    throw new Error(
      'Google Web client ID is missing. In Firebase enable Authentication → Google, add Android SHA-1 and SHA-256, re-download google-services.json, or set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID from Google Cloud → Credentials (Web OAuth client).',
    );
  }

  GoogleSignin.configure({
    webClientId,
    offlineAccess: false,
  });

  googleSignInConfigured = true;
}

export async function signInWithGoogle() {
  await configureGoogleSignIn();
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const result = await GoogleSignin.signIn();
  if (result.type !== 'success') {
    throw new Error('Google sign-in was cancelled.');
  }

  const idToken = result.data.idToken;
  if (!idToken) {
    throw new Error('Google sign-in did not return an ID token.');
  }

  const credential = auth.GoogleAuthProvider.credential(idToken);
  await auth().signInWithCredential(credential);
}

export async function signOut() {
  await auth().signOut();

  try {
    await GoogleSignin.signOut();
  } catch {
    // Google Sign-In may not be configured yet on first launch.
  }
}

export function subscribeToAuthChanges(onChange: (user: FirebaseAuthTypes.User | null) => void) {
  return auth().onAuthStateChanged(onChange);
}
