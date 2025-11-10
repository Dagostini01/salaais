import { Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ScreenContainer = styled.View<{ paddingTop: number }>`
  flex: 1;
  padding-vertical: ${({ paddingTop }) => paddingTop}px;
  padding-horizontal: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const QuizAnac = styled.View`
  width: 100%;
  margin-bottom: ${RFValue(24)}px;
  padding: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: ${RFValue(12)}px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.08;
  shadow-radius: 4px;
  elevation: 2;
`;

export const Question = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 600;
  line-height: ${RFValue(24)}px;
  letter-spacing: 0.2px;
`;

export const Bloco = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: ${RFValue(12)}px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export const ModalCard = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 16px;
  padding: ${RFValue(24)}px;
  width: 100%;
  max-width: 400px;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 8;
`;

export const ModalText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 700;
  margin-bottom: ${RFValue(24)}px;
  text-align: center;
  line-height: ${RFValue(24)}px;
  letter-spacing: 0.2px;
`;

export const BlockSelectionGrid = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${RFValue(12)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const BlockSelectionButton = styled.TouchableOpacity`
  min-width: ${RFValue(100)}px;
  padding: ${RFValue(12)}px ${RFValue(16)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 4;
`;

export const BlockSelectionButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text_dark};
  font-size: ${RFValue(14)}px;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

export const ModalButtonsContainer = styled.View`
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

export const ModalButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${RFValue(14)}px;
  border-radius: ${RFValue(12)}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ModalButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: ${RFValue(14)}px;
  border-radius: ${RFValue(12)}px;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.attention};
`;

export const ModalButtonTextCancel = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.attention};
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.3px;
`;

export const FixedTimerContainer = styled.View`
  min-width: 50%;
  margin: ${RFValue(12)}px 0px;
  padding: ${RFValue(12)}px ${RFValue(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: ${RFValue(12)}px;
  gap: ${RFValue(10)}px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 3;
`;

export const TimerText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.5px;
  flex-shrink: 0;
`;

export const HeaderQuiz = styled.View`
  flex: 1;
`;

export const FinishButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.attention};
  padding: ${RFValue(16)}px ${RFValue(24)}px;
  border-radius: ${RFValue(12)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${RFValue(24)}px;
  margin-bottom: ${Platform.OS === "android" ? "10px" : "0px"};
  min-height: ${RFValue(52)}px;
  shadow-color: ${({ theme }) => theme.colors.attention};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.3;
  shadow-radius: 6px;
  elevation: 5;
`;

export const FinishButtonText = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const ScrollContainer = {
  paddingBottom: RFValue(20),
};

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LoadingContent = styled.View`
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export const LoadingText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 700;
  margin-top: 16px;
  letter-spacing: 0.5px;
`;

export const LoadingSubtext = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  text-align: center;
  margin-top: 4px;
`;

export const ResultModalContainer = styled(ModalContainer)`
  align-items: center;
  justify-content: center;
  padding-vertical: ${RFValue(20)}px;
`;

export const ResultModalCard = styled(ModalCard)`
  max-width: 90%;
  max-height: 90%;
  padding: ${RFValue(20)}px ${RFValue(20)}px;
`;

export const ResultModalContent = styled.View`
  align-items: center;
  width: 100%;
  gap: ${RFValue(16)}px;
`;

export const ResultModalTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.3px;
`;

export const CircularProgressContainer = styled.View`
  align-items: center;
  padding: ${RFValue(12)}px;
`;

export const CircularProgressText = styled.Text`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.title};
  width: 100%;
  text-align: center;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const ResultActionsContainer = styled.View`
  flex-direction: column;
  gap: ${RFValue(8)}px;
  width: 100%;
`;

export const ResultActionButton = styled.TouchableOpacity<{
  variant?: "danger";
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${RFValue(8)}px;
  padding: ${RFValue(12)}px ${RFValue(18)}px;
  border-radius: ${RFValue(10)}px;
  background-color: ${({ theme, variant }) =>
    variant === "danger" ? theme.colors.attention : theme.colors.primary};
  shadow-color: ${({ theme, variant }) =>
    variant === "danger" ? theme.colors.attention : theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3px;
  elevation: 3;
  min-height: ${RFValue(44)}px;
`;

export const ResultActionButtonText = styled.Text<{ variant?: "danger" }>`
  font-size: ${RFValue(14)}px;
  color: ${({ theme, variant }) =>
    variant === "danger" ? "white" : theme.colors.text_dark};
  font-weight: 700;
  letter-spacing: 0.3px;
`;

export const QuestionContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;
  gap: ${RFValue(4)}px;
`;

export const AnswersContainer = styled.View`
  gap: ${RFValue(10)}px;
`;

export const AnswerButton = styled.TouchableOpacity<{
  backgroundColor: string;
  isReviewMode: boolean;
}>`
  padding: ${RFValue(14)}px ${RFValue(16)}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  opacity: ${({ isReviewMode }) => (isReviewMode ? 0.7 : 1)};
  border-radius: ${RFValue(10)}px;
  min-height: ${RFValue(50)}px;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 1;
`;

export const AnswerText = styled.Text<{ selected: boolean }>`
  font-size: ${RFValue(14)}px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.text_dark : theme.colors.shape};
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
  line-height: ${RFValue(20)}px;
`;

export const JustificationContainer = styled.View`
  margin-top: ${RFValue(16)}px;
  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(8)}px;
  border-left-width: 3px;
  border-left-color: ${({ theme }) => theme.colors.primary};
`;

export const JustificationText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(20)}px;
`;
