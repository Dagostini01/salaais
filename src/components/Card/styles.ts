import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.85,
})`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 18px;
  width: 148px;
  height: 148px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
  elevation: 4;
`;

export const IconCircle = styled.View`
  width: 68px;
  height: 68px;
  border-radius: 34px;
  background-color: rgba(251, 212, 52, 0.22);
  align-items: center;
  justify-content: center;
`;

export const CardText = styled.Text`
  font-size: ${Platform.OS === "ios" ? "16px" : "15px"};
  color: ${({ theme }) => theme.colors.title};
  font-weight: 700;
  letter-spacing: 0.2px;
`;
