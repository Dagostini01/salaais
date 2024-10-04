import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 20px;
  margin-right: 16px;
  width: ${RFValue(150)}px;
  height: ${RFValue(140)}px;
  align-items: center;
  justify-content: center;
`;

export const CardText = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
`;
