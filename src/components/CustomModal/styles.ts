import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFValue(20)}px;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(10)}px;
`;

export const ModalButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.attention};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
`;

export const ModalButtonTextCancel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;
