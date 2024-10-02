import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 20px;
  margin-right: 16px;
  width: ${RFValue(150)}px;
  height: ${RFValue(140)}px;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image`
  width: ${RFValue(135)}px;
  height: ${RFValue(110)}px;
`;
