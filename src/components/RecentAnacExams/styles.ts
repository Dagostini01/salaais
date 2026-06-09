import { Platform } from "react-native";
import styled from "styled-components/native";
import type { AnacExamResult } from "../../types/homeDashboard";

function getResultColors(result: AnacExamResult) {
  switch (result) {
    case "APROVADO":
      return { bg: "anac_light", text: "anac" } as const;
    case "REPROVADO":
      return { bg: "attention_light", text: "attention" } as const;
    case "2ª ÉPOCA":
      return { bg: "secondary_light", text: "secondary" } as const;
  }
}

export const Card = styled.View`
  width: 100%;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 12px;
  shadow-color: ${({ theme }) => theme.colors.dark};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${Platform.OS === "ios" ? "20px" : "18px"};
  font-weight: 700;
  letter-spacing: 0.2px;
  margin-bottom: 16px;
`;

/** Altura visível para ~3 provas (linha + separador + gap) */
const VISIBLE_EXAMS_HEIGHT = 228;

export const ExamListScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  nestedScrollEnabled: true,
})<{ $limitedHeight: boolean }>`
  ${({ $limitedHeight }) =>
    $limitedHeight ? `max-height: ${VISIBLE_EXAMS_HEIGHT}px;` : ""}
`;

export const ExamRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.text_light};
`;

export const ExamInfo = styled.View`
  flex: 1;
  gap: 4px;
  margin-right: 12px;
`;

export const ExamDate = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${Platform.OS === "ios" ? "15px" : "13px"};
  font-weight: 600;
`;

export const ExamMeta = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "13px" : "11px"};
  font-weight: 400;
`;

const RESULT_BADGE_WIDTH = 96;

export const ResultBadge = styled.View<{ result: AnacExamResult }>`
  width: ${RESULT_BADGE_WIDTH}px;
  min-width: ${RESULT_BADGE_WIDTH}px;
  background-color: ${({ theme, result }) => {
    const colors = getResultColors(result);
    return theme.colors[colors.bg];
  }};
  padding-vertical: 6px;
  padding-horizontal: 4px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ResultText = styled.Text<{ result: AnacExamResult }>`
  color: ${({ theme, result }) => {
    const colors = getResultColors(result);
    return theme.colors[colors.text];
  }};
  font-size: ${Platform.OS === "ios" ? "11px" : "10px"};
  font-weight: 700;
  letter-spacing: 0.3px;
  text-align: center;
`;

export const ScoreText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${Platform.OS === "ios" ? "11px" : "10px"};
  font-weight: 600;
  margin-top: 4px;
  text-align: center;
`;
