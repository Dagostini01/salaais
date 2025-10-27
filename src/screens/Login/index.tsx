import React, { useContext } from "react";
import { ActivityIndicator, Platform } from "react-native";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo-amarelo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from "../../contexts/auth";
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  LoadingContainer,
  SignInTitle,
  TitleWrapper,
} from "./styles";

export function SignIn() {
  const { signInWithGoogle, signInWithApple, loading } =
    useContext(AuthContext);

  return (
    <Container>
      {loading && (
        <LoadingContainer>
          <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
      )}
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(160)} height={RFValue(98)} />
        </TitleWrapper>
        <SignInTitle>Faça seu login com uma das contas abaixo</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
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
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
