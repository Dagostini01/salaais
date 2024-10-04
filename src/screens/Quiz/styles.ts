import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: ${RFValue(20)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const QuizAnac = styled.View`
  width: 100%;
  padding: 0 0px;
`;

export const Question = styled.Text`
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${RFValue(5)}px;
`;
export const Bloco = styled.Text`
  font-size: ${RFValue(22)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Answer = styled.TouchableOpacity<{
  correct: boolean;
  selected: boolean;
}>`
  background-color: ${({ selected, correct, theme }) =>
    selected
      ? theme.colors.shape
      : correct
        ? theme.colors.success
        : theme.colors.card};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(10)}px;
  border: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.shape}` : "none"};
`;

export const AnswerText = styled.Text<{ selected: boolean }>`
  font-size: ${RFValue(18)}px;
  color: ${({ selected, theme }) => (selected ? theme.colors.shape : theme.colors.shape)};
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.text};
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

export const FixedTimerContainer = styled.View`
  width: 30%;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.text};
  margin-top: ${getStatusBarHeight() + RFValue(20)}px;
  padding: 10px;
  border-radius: 10px;
`;

export const TimerText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.light};
  font-weight: bold;
`;

export const HeaderQuiz = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const FinishButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.attention};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  align-items: center;
  margin-top: ${RFValue(20)}px;
`;

export const FinishButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
  font-weight: bold;
`;

export const ScrollContainer = {
  paddingBottom: RFValue(20), // Adicione um padding se necessário
};
