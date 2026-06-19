import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
  flex: 1.15;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.dark};
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 32px;
  overflow: hidden;
`;

export const HeaderGlow = styled.View`
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 140px;
  background-color: rgba(255, 255, 255, 0.04);
  top: -60px;
  right: -80px;
`;

export const LogoSection = styled.View`
  align-items: center;
  gap: 32px;
`;

export const WelcomeText = styled.View`
  align-items: center;
  gap: 10px;
`;

export const SignInTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${Platform.OS === "ios" ? RFValue(20) : RFValue(18)}px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.2px;
`;

export const SignInSubtitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${Platform.OS === "ios" ? RFValue(14) : RFValue(13)}px;
  text-align: center;
  line-height: ${Platform.OS === "ios" ? RFValue(20) : RFValue(18)}px;
  opacity: 0.75;
  max-width: 280px;
`;

export const AuthSection = styled.View`
  flex: 0.85;
  width: 100%;
  padding-horizontal: 28px;
  padding-top: 28px;
  justify-content: flex-start;
`;

export const AuthHint = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${Platform.OS === "ios" ? RFValue(13) : RFValue(12)}px;
  text-align: center;
  font-weight: 500;
  opacity: 0.65;
  margin-bottom: 20px;
`;

export const ButtonsGroup = styled.View`
  gap: 14px;
`;

export const LoadingContainer = styled.View({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});
