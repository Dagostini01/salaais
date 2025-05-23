import { Platform } from "react-native";
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
  color: ${({ selected, theme }) =>
    selected ? theme.colors.shape : theme.colors.shape};
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
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  margin-bottom: ${RFValue(10)}px;
  width: 35%;
`;

export const ModalButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  width: 100%;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.attention};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  width: 35%;
`;

export const ModalButtonTextCancel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

export const FixedTimerContainer = styled.View`
  width: 40%;
  margin: 8px 0px;
  padding: 8px;
  flex-direction: row; /* Deixa os elementos lado a lado */
  align-items: center; /* Alinha verticalmente */
  justify-content: center;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
`;

export const TimerText = styled.Text`
  flex: 1; /* O texto pode crescer */
  flex-shrink: 1; /* Evita que o texto seja truncado se houver espaço */
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.light};
  font-weight: bold;
  text-align: center; /* Mantém o texto alinhado */
`;

export const HeaderQuiz = styled.View`
  flex: 1;
`;
export const FinishButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.attention};
  padding: ${RFValue(15)}px;
  border-radius: ${RFValue(8)}px;
  align-items: center;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${Platform.OS === "android" ? "10px" : "0px"};
`;

export const FinishButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.background};
  text-align: center;
  font-weight: bold;
  width: 100%;
`;

export const ScrollContainer = {
  paddingBottom: RFValue(20), // Adicione um padding se necessário
};
