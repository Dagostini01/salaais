import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

export const Input = styled.TextInput`
  height: 50px;
  width: 100%;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.shape};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  padding: 10px;
  font-size: ${Platform.OS === "ios" ? "12px" : "14px"};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.text};
  padding: 10px;
  border-radius: 5px;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.background};
  font-size: ${Platform.OS === "ios" ? "12px" : "14px"};
`;
