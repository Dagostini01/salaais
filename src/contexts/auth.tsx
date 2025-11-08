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
      appleToken?: string;
    }
  | undefined;

type AppleCredentials =
  | {
      authorizationCode: string;
      identityToken: string;
      user: string;
      email?: string;
      name?: string;
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
      setCredentials(appleCredential);
      const userResponse = await loginApple(appleCredential);
      const accessTokenApi = userResponse.access_token ?? "";
      const permission = await getPermissionUser(accessTokenApi);
      const userItem = {
        id: userResponse.id_usuario ?? 0,
        token: userResponse.token ?? "",
        email: userResponse?.email,
        name: userResponse.nome,
        photoUrl: undefined,
        permission,
        accessToken: accessTokenApi,
        appleToken: appleCredential.identityToken ?? userResponse.token,
      };
      setUser(userItem);
      await SecureStore.setItemAsync("userApple", JSON.stringify(userItem));
    } catch (err) {
      console.error("Error signing in with Apple", err);
    } finally {
      setLoading(false);
    }
  };

  const signInWithAppleComplete = async (name?: string, email?: string) => {
    try {
      const userResponse = await loginApple({
        authorizationCode: credentials?.authorizationCode ?? "",
        identityToken: credentials?.identityToken ?? "",
        user: credentials?.user ?? "",
        email,
        name,
      });
      const accessTokenApi = userResponse.access_token ?? "";
      const permission = await getPermissionUser(accessTokenApi);
      const userItem = {
        id: userResponse.id_usuario ?? 0,
        token: userResponse.token ?? "",
        email: userResponse?.email,
        name: userResponse.name,
        photoUrl: undefined,
        permission,
        accessToken: accessTokenApi,
        appleToken: credentials?.identityToken ?? userResponse.token,
      };
      setUser(userItem);
      await SecureStore.setItemAsync("userApple", JSON.stringify(userItem));
    } catch (err) {
      console.error(
        "Error signing in with Apple in completeSignInWithApple",
        err
      );
    }
  };

  const validateAppleToken = async (token: string) => {
    try {
      if (!token) {
        return false;
      }
      const decoded = jwtDecode(token);
      const clientId = process.env.EXPO_PUBLIC_PACKAGE_NAME;
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "iss" in decoded &&
        decoded.iss === "https://appleid.apple.com"
      ) {
        if ("aud" in decoded && decoded.aud === clientId) {
          return true;
        }
        return false;
      }
      if (
        typeof decoded === "object" &&
        decoded !== null &&
        "type" in decoded &&
        decoded.type === "access_token"
      ) {
        if ("exp" in decoded && typeof decoded.exp === "number") {
          const nowInSeconds = Date.now() / 1000;
          return decoded.exp > nowInSeconds;
        }
        return true;
      }
      return false;
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
        await SecureStore.setItemAsync("userGoogle", JSON.stringify(userItem));
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
    } catch (error: unknown) {
      console.error("Erro ao fazer login com Google:", error);

      if ((error as { code?: string }).code === "SIGN_IN_CANCELLED") {
        console.error("Usuário cancelou o login");
        return;
      }
      if ((error as { code?: string }).code === "IN_PROGRESS") {
        console.error("Login já está em progresso");
        return;
      }
      if ((error as { code?: string }).code === "PLAY_SERVICES_NOT_AVAILABLE") {
        console.error("Google Play Services não disponível");
        return;
      }

      throw new Error(
        `Erro ao fazer login com Google: ${
          (error as { message?: string }).message || "Erro desconhecido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const getToken = async () => {
    try {
      setLoading(true);
      const [userAppleStored, userGoogleStored] = await Promise.all([
        SecureStore.getItemAsync("userApple"),
        SecureStore.getItemAsync("userGoogle"),
      ]);

      if (userAppleStored) {
        const userAppleParsed: UserType = JSON.parse(userAppleStored);
        let hasRestored = false;

        if (userAppleParsed?.accessToken) {
          try {
            const permission = await getPermissionUser(
              userAppleParsed.accessToken
            );
            setUser({
              ...userAppleParsed,
              permission,
            });
            hasRestored = true;
          } catch (permissionError) {
            console.warn(
              "Não foi possível validar permissões do usuário Apple armazenado",
              permissionError
            );
          }
        }

        if (!hasRestored) {
          const tokenToValidate =
            userAppleParsed?.appleToken ?? userAppleParsed?.token ?? "";
          const isIdentityValid = await validateAppleToken(tokenToValidate);
          if (isIdentityValid) {
            setUser(userAppleParsed);
            hasRestored = true;
          }
        }

        if (hasRestored) {
          return;
        }
      }

      if (userGoogleStored) {
        const userGoogleParsed: UserType = JSON.parse(userGoogleStored);
        if (userGoogleParsed?.token) {
          const isValid = await validateGoogleToken(userGoogleParsed.token);
          if (isValid) {
            setUser(userGoogleParsed);
          }
        }
      }
    } catch (err) {
      console.error("Erro ao recuperar token do usuário", err);
    } finally {
      setLoading(false);
    }
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
