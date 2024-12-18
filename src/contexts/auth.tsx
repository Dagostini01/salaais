import * as Apple from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Platform } from "react-native";
import { authLogin } from "../services/";
import { dataUser } from "../services/services";

type UserType =
  | {
      token: string;
      email: string;
      name: string;
      photoUrl?: string;
      accessToken: string;
      permission: string;
    }
  | undefined;

type AuthContextType = {
  user: UserType;
  signed: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
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

  const signInWithApple = async () => {
    try {
      setLoading(true);
      const credential = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.FULL_NAME,
          Apple.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential?.email && credential.fullName?.givenName) {
        const { access_token: accessToken } = await authLogin(credential.user);
        const { permissoes } = await dataUser(accessToken);
        const { key: permission } = permissoes.map((item: any) =>
          item.ativo === true ? item : null,
        )[0];
        const userItem = {
          accessToken,
          token: credential.user,
          email: credential.email,
          name: credential.fullName.givenName,
          photoUrl: undefined,
          permission,
        };
        setUser(userItem);
        SecureStore.setItem("userApple", JSON.stringify(userItem));
      }
    } catch (err) {
      console.error("Error signing in with Apple", err);
    } finally {
      setLoading(false);
    }
  };

  const validateAppleToken = async (token: string) => {
    try {
      const decoded = jwtDecode(token);
      const clientId = process.env.EXPO_PUBLIC_PACKAGE_NAME;
      if (decoded.iss !== "https://appleid.apple.com") {
        return false;
      }
      if (decoded.aud !== clientId) {
        return false;
      }
      return true;
    } catch (err) {
      console.error("Erro ao decodificar o token", err);
      return false;
    }
  };

  const validateGoogleToken = async (token: string) => {
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
      console.error("Erro ao verificar o token", err);
      return false;
    }
  };

  const getUserProfile = useCallback(
    async (
      token: string | undefined,
      accessToken: string,
      permission: string,
    ) => {
      if (!token) return;
      try {
        const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await res.json();
        const userItem = {
          token,
          accessToken,
          email: user.email,
          name: user.name,
          photoUrl: user.picture,
          permission,
        };
        setUser(userItem);
        SecureStore.setItem("userGoogle", JSON.stringify(userItem));
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleToken = useCallback(async () => {
    if (response?.type === "success") {
      setLoading(true);
      const { authentication } = response;
      const token = authentication?.accessToken;
      if (token != null) {
        const { access_token: accessToken } = await authLogin(token);
        const { permissoes } = await dataUser(accessToken);
        const { key: permission } = permissoes.map((item: any) =>
          item.ativo === true ? item : null,
        )[0];
        await getUserProfile(token, accessToken, permission);
      }
      setLoading(false);
    }
  }, [getUserProfile, response, authLogin]);

  // "response" nas dependência para que para verificação do token
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
    const userGoogle = SecureStore.getItem("userGoogle");
    const userApple = SecureStore.getItem("userApple");

    if (userApple != null) {
      const user = JSON.parse(userApple);
      const isValid = await validateAppleToken(user.token);
      if (isValid) setUser(user);
    }
    if (userGoogle != null) {
      const user = JSON.parse(userGoogle);
      const isValid = await validateGoogleToken(user.token);
      if (isValid) setUser(user);
    }
    setLoading(false);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userGoogle");
    await SecureStore.deleteItemAsync("userApple");
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
        signInWithApple,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
