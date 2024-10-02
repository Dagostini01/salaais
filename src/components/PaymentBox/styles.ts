import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const ViewButtonDad = styled.View`
  width: 90%;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 5px;
  margin-top: 10px;
  align-self: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ViewButton = styled.View`
  flex-direction: column;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
  margin-left: 10px;
`;
