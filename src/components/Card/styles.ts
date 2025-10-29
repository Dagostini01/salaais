import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 20px;
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const CardText = styled.Text`
  font-size: ${Platform.OS === "ios" ? "24px" : "22px"};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;
