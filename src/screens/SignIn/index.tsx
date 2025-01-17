import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, Platform } from "react-native";
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
  LoadingContainer,
  SignInTitle,
  TitleWrapper,
} from "./styles";

type BottomTabParamList = {
  Principal: undefined;
  CompleteProfile: undefined;
};

type NavigationProps = BottomTabNavigationProp<BottomTabParamList, "Principal">;

export function SignIn() {
  const navigation = useNavigation<NavigationProps>();
  const { signInWithGoogle, signInWithApple, loading } =
    useContext(AuthContext);

  const signApple = async () => {
    const result = await signInWithApple();
    if (result === "goToComplete")
      return navigation.navigate("CompleteProfile");
    if (result === "success") return navigation.navigate("Principal");
  };

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
              onPress={signApple}
              title="Entrar com Apple"
              svg={AppleSvg}
            />
          )}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
