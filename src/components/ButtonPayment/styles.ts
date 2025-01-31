import { Feather } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const LastTest = styled.TouchableOpacity`
  width: 90%;
  height: ${RFValue(70)}px;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_dark};
  border-radius: 5px;
  margin-top: 10px;
  align-self: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TestAnac = styled.View`
  flex-direction: row;
`;

export const NameTest = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
  margin-left: 10px;
  width: 100%;
`;
