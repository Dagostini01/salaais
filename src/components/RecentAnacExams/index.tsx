import React from "react";
import type { UltimaProvaAnac } from "../../types/homeDashboard";
import {
  Card,
  ExamDate,
  ExamInfo,
  ExamListScroll,
  ExamMeta,
  ExamRow,
  ResultBadge,
  ResultText,
  ScoreText,
  Title,
} from "./styles";

type Props = {
  exams: UltimaProvaAnac[];
};

function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(isoDate: string) {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

const VISIBLE_EXAMS_COUNT = 3;

export function RecentAnacExams({ exams }: Props) {
  const hasScroll = exams.length > VISIBLE_EXAMS_COUNT;

  return (
    <Card>
      <Title>Últimas provas ANAC realizadas</Title>
      <ExamListScroll
        scrollEnabled={hasScroll}
        $limitedHeight={hasScroll}
      >
        {exams.map((exam, index) => (
          <ExamRow
            key={exam.id}
            style={
              index === exams.length - 1
                ? { borderBottomWidth: 0, marginBottom: 0, paddingBottom: 0 }
                : undefined
            }
          >
            <ExamInfo>
              <ExamDate>{formatDate(exam.realizadaEm)}</ExamDate>
              <ExamMeta>
                {formatTime(exam.realizadaEm)} ·{" "}
                {formatDuration(exam.duracaoMinutos)}
              </ExamMeta>
            </ExamInfo>
            <ResultBadge result={exam.resultado}>
              <ResultText result={exam.resultado}>{exam.resultado}</ResultText>
              <ScoreText>{exam.percentual}%</ScoreText>
            </ResultBadge>
          </ExamRow>
        ))}
      </ExamListScroll>
    </Card>
  );
}
