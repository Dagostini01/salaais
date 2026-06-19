import { Platform } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Button = styled(RectButton)`
  border-radius: 14px;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  align-items: center;
  flex-direction: row;
  padding-horizontal: 20px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.12;
  shadow-radius: 6px;
  elevation: 3;
`;

export const SideSlot = styled.View`
  width: 24px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  flex: 1;
  text-align: center;
  font-size: ${Platform.OS === "ios" ? RFValue(15) : RFValue(14)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text_dark};
`;
