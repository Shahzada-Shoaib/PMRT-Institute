import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { Platform } from 'react-native';

type AuthServiceModule = typeof import('@/services/authService.native');

type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
  guestMode: boolean;
  initializing: boolean;
  isSigningIn: boolean;
  signInWithGoogle: () => Promise<void>;
  skipLogin: () => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

let authServicePromise: Promise<AuthServiceModule> | null = null;

function loadAuthService() {
  if (Platform.OS === 'web') {
    authServicePromise ??= import('@/services/authService.web');
  } else {
    authServicePromise ??= import('@/services/authService.native');
  }

  return authServicePromise;
}

function isExpoGoClient() {
  return Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [guestMode, setGuestMode] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    void loadAuthService()
      .then((authService) => {
        if (isExpoGoClient()) {
          setInitializing(false);
          return;
        }

        void authService.configureGoogleSignIn().catch(() => undefined);
        unsubscribe = authService.subscribeToAuthChanges((nextUser) => {
          setUser(nextUser);
          if (nextUser) {
            setGuestMode(false);
          }
          setInitializing(false);
        });
      })
      .catch(() => {
        setInitializing(false);
      });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    if (isExpoGoClient()) {
      throw new Error('Google sign-in needs the PMRT dev build. Run npm run android, not Expo Go.');
    }

    setIsSigningIn(true);
    try {
      const authService = await loadAuthService();
      await authService.signInWithGoogle();
      setGuestMode(false);
    } finally {
      setIsSigningIn(false);
    }
  }, []);

  const skipLogin = useCallback(() => {
    setGuestMode(true);
  }, []);

  const signOut = useCallback(async () => {
    const authService = await loadAuthService();
    try {
      await authService.signOut();
    } finally {
      setGuestMode(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      guestMode,
      initializing,
      isSigningIn,
      signInWithGoogle,
      skipLogin,
      signOut,
    }),
    [guestMode, initializing, isSigningIn, signInWithGoogle, skipLogin, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}
