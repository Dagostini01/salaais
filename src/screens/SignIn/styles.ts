import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.dark};
  justify-content: flex-end;
  align-items: center;
`;

export const TitleWrapper = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(30)}px;
  text-align: center;
  margin-top: 45px;
`;

export const SignInTitle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  text-align: center;
  margin-top: 80px;
  margin-bottom: 80px;
`;

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;
  justify-content: space-between;
`;

export const LoadingContainer = styled.View({
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});
