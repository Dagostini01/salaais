import * as Google from "expo-auth-session/providers/google";
import {
  type ReactNode,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type UserType =
  | {
      email: string;
      name: string;
      photoUrl: string;
    }
  | undefined;

type AuthContextType = {
  user: UserType;
  signed: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  getToken: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>(undefined);

  const config = {
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  };
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  const validateToken = async (token: string) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
      );
      if (res.ok) {
        const data = await res.json();
        const condition = Platform.select({
          ios: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
          android: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        });
        if (data && data.aud === condition) {
          return true;
        }
      }
    } catch (err) {
      return false;
    }
  };

  const getUserProfile = useCallback(async (token: string | undefined) => {
    if (!token) return;
    try {
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await res.json();
      setUser({ email: user.email, name: user.name, photoUrl: user.picture });
    } catch (err) {
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToken = useCallback(async () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      if (token != null) {
        Promise.all([
          SecureStore.setItemAsync("userToken", token),
          getUserProfile(token),
        ]);
      }
    }
  }, [getUserProfile, response]);

  // "response" nas dependência para que para verificação do token
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    handleToken();
  }, [response]);

  const signInWithGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Erro ao fazer login com Google: ${error.message}`);
      }
    }
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token != null) {
      const isValid = await validateToken(token);
      if (isValid) return await getUserProfile(token);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: Boolean(user),
        user,
        signInWithGoogle,
        signOut,
        loading,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
