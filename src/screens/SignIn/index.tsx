import React, { useContext } from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo-amarelo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from "../../contexts/auth";
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  TitleWrapper,
} from "./styles";

export function SignIn() {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <Container>
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
          <SignInSocialButton
            onPress={() => {}}
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
