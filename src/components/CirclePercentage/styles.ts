import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface CircleProps {
  backgroundColor: string;
}

export const Circle = styled.View<CircleProps>`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  border-radius: ${RFValue(50)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
`;

export const TextInsideCircle = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
  width: 100%;
  text-align: center;
`;
