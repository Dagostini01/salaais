import { RFPercentage } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const HighlightPayments = styled.ScrollView.attrs({
  horizontal: false,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  margin-top: ${RFPercentage(10)}px;
`;

export const Payments = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const TextPayment = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;
