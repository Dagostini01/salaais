import { createContext, ReactNode, useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";

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
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>();

  const config = {
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  };
  const [_, response, promptAsync] = Google.useAuthRequest(config);

  const getUserProfile = async (token: any) => {
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
    }
  };

  const handleToken = () => {
    if (response?.type === "success") {
      const { authentication } = response;
      const token = authentication?.accessToken;
      getUserProfile(token);
    }
  };

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

  const signOut = () => setUser(undefined);

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
