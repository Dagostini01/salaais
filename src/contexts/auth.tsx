import * as Apple from "expo-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
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
import { dataUser, loginApple } from "../services/services";
import { PlanType, PermissionType } from "../utils/enums";

type UserType =
  | {
      id: number;
      token: string;
      email: string;
      name: string;
      photoUrl?: string;
      accessToken: string;
      permission: string;
    }
  | undefined;

type AppleCredentials =
  | {
      authorizationCode: string;
      identityToken: string;
      user: string;
    }
  | undefined;

type AuthContextType = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  getPermissionUser: (token: string) => Promise<string>;
  signed: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithAppleComplete: (name?: string, email?: string) => Promise<void>;
  signOut: () => void;
  getToken: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>(undefined);
  const [credentials, setCredentials] = useState<AppleCredentials>(undefined);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: "",
      forceCodeForRefreshToken: true,
    });
  }, []);

  const getPermissionUser = async (token: string) => {
    const { permissoes } = await dataUser(token);
    const validPlans = [
      PlanType.BRONZE,
      PlanType.PRATA,
      PlanType.OURO,
      PlanType.PREMIUM,
    ];
    const { key: permission } = permissoes.find(
      (item: { ativo: boolean; key: string }) =>
        item.ativo === true && validPlans.includes(item.key as PlanType)
    ) || { key: PermissionType.COMUM };
    return permission;
  };

  const signInWithApple = async () => {
    try {
      setLoading(true);
      const credential = await Apple.signInAsync({
        requestedScopes: [
          Apple.AppleAuthenticationScope.FULL_NAME,
          Apple.AppleAuthenticationScope.EMAIL,
        ],
      });
      const appleCredential = {
        authorizationCode: credential.authorizationCode ?? "",
        identityToken: credential.identityToken ?? "",
        email: credential.email ?? "",
        name: credential.fullName?.givenName ?? "",
        user: credential.user ?? "",
      };
      const user = await loginApple(appleCredential);
      const permission = await getPermissionUser(user.token);
      setUser({
        id: user.id_usuario ?? 0,
        token: user.token ?? "",
        email: user?.email,
        name: user.nome,
        photoUrl: undefined,
        permission,
        accessToken: user.token,
      });
      await SecureStore.setItemAsync("userApple", JSON.stringify(user));
    } catch (err) {
      console.error("Error signing in with Apple", err);
    } finally {
      setLoading(false);
    }
  };

  const signInWithAppleComplete = async (name?: string, email?: string) => {
    try {
      const user = await loginApple({
        authorizationCode: credentials?.authorizationCode ?? "",
        identityToken: credentials?.identityToken ?? "",
        user: credentials?.user ?? "",
        email,
        name,
      });
      const permission = await getPermissionUser(user.token);
      setUser({
        id: user.id_usuario ?? 0,
        token: credentials?.user ?? "",
        email: user?.email,
        name: user.name,
        photoUrl: undefined,
        permission,
        accessToken: user.token,
      });
      SecureStore.setItem("userApple", JSON.stringify(user));
    } catch (err) {
      console.error(
        "Error signing in with Apple in completeSignInWithApple",
        err
      );
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
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`
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
      permission: string
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
          id: user.id_usuario ?? 0,
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
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signInWithGoogle = async () => {
    try {
      setLoading(true);

      if (Platform.OS === "android") {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
      }

      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data) {
        const tokens = await GoogleSignin.getTokens();
        const accessToken = tokens.accessToken;

        if (accessToken) {
          const { access_token: backendAccessToken } = await authLogin(
            accessToken
          );
          const permission = await getPermissionUser(backendAccessToken);
          await getUserProfile(accessToken, backendAccessToken, permission);
        }
      }
    } catch (error: any) {
      console.error("Erro ao fazer login com Google:", error);

      if (error.code === "SIGN_IN_CANCELLED") {
        console.error("Usuário cancelou o login");
        return;
      } else if (error.code === "IN_PROGRESS") {
        console.error("Login já está em progresso");
        return;
      } else if (error.code === "PLAY_SERVICES_NOT_AVAILABLE") {
        console.error("Google Play Services não disponível");
        return;
      }

      throw new Error(
        `Erro ao fazer login com Google: ${
          error.message || "Erro desconhecido"
        }`
      );
    } finally {
      setLoading(false);
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
    GoogleSignin.revokeAccess().catch(() => {});
    GoogleSignin.signOut().catch(() => {});

    await SecureStore.deleteItemAsync("userGoogle");
    await SecureStore.deleteItemAsync("userApple");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        setUser,
        getPermissionUser,
        signed: Boolean(user),
        user,
        signInWithGoogle,
        signOut,
        loading,
        getToken,
        signInWithApple,
        signInWithAppleComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
