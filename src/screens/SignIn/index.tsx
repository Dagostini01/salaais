import React, { useContext } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import LogoSvg from "../../assets/logo-amarelo.svg";
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { AuthContext } from "../../contexts/auth";
import { Alert } from "react-native";

export function SignIn() {
  const { signInWithGoogle } = useContext(AuthContext);

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

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
            title='Entrar com Google'
            svg={GoogleSvg}
            onPress={signInWithGoogle}
          />
          <SignInSocialButton onPress={()=>{}} title='Entrar com Apple' svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
