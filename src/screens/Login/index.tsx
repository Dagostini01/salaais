import React, { useContext } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo-amarelo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from "../../contexts/auth";
import theme from "../../global/global/theme";
import {
  AuthHint,
  AuthSection,
  ButtonsGroup,
  Header,
  HeaderGlow,
  LoadingContainer,
  LogoSection,
  ScreenWrapper,
  SignInSubtitle,
  SignInTitle,
  WelcomeText,
} from "./styles";

export function SignIn() {
  const { signInWithGoogle, signInWithApple, loading } =
    useContext(AuthContext);
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScreenWrapper>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </LoadingContainer>
      )}

      <Header style={{ paddingTop: top + 24, paddingBottom: 36 }}>
        <HeaderGlow />
        <LogoSection>
          <LogoSvg width={RFValue(150)} height={RFValue(92)} />
          <WelcomeText>
            <SignInTitle>Bem-vindo ao Sala AIS</SignInTitle>
            <SignInSubtitle>
              Prepare-se para a ANAC com simulados e acompanhamento do seu
              desempenho.
            </SignInSubtitle>
          </WelcomeText>
        </LogoSection>
      </Header>

      <AuthSection style={{ paddingBottom: bottom + 24 }}>
        <AuthHint>Entre com sua conta para continuar</AuthHint>
        <ButtonsGroup>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={signInWithGoogle}
          />
          {Platform.OS === "ios" && (
            <SignInSocialButton
              onPress={signInWithApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </ButtonsGroup>
      </AuthSection>
    </ScreenWrapper>
  );
}
