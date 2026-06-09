import React, { useMemo } from "react";
import Svg, { Circle, Path } from "react-native-svg";
import theme from "../../global/global/theme";
import type { MediaDesempenho } from "../../types/homeDashboard";
import {
  buildPieSlices,
  getDesempenhoColor,
  getDesempenhoStatusFromPercent,
} from "./pieChartUtils";
import {
  Card,
  CenterCaption,
  CenterLabel,
  CenterValue,
  ChartWrapper,
  Content,
  Legend,
  LegendDot,
  LegendItem,
  LegendPercent,
  LegendText,
  Title,
} from "./styles";

type Props = {
  data: MediaDesempenho;
};

export function PerformancePieChart({ data }: Props) {
  const mediaColor = useMemo(
    () =>
      getDesempenhoColor(getDesempenhoStatusFromPercent(data.mediaPercentual)),
    [data.mediaPercentual],
  );

  const slices = useMemo(
    () =>
      buildPieSlices([
        {
          key: "aprovado",
          value: data.distribuicao.aprovado,
          color: theme.colors.anac,
          label: "Aprovado",
        },
        {
          key: "reprovado",
          value: data.distribuicao.reprovado,
          color: theme.colors.attention,
          label: "Reprovado",
        },
        {
          key: "segundaEpoca",
          value: data.distribuicao.segundaEpoca,
          color: theme.colors.primary,
          label: "2ª Época",
        },
      ]),
    [data.distribuicao],
  );

  return (
    <Card>
      <Title>Média de desempenho</Title>
      <Content>
        <ChartWrapper>
          <Svg width={132} height={132} viewBox="0 0 100 100">
            {slices.map((slice) => (
              <Path key={slice.key} d={slice.path} fill={slice.color} />
            ))}
            <Circle cx={50} cy={50} r={29} fill={theme.colors.shape} />
          </Svg>
          <CenterLabel>
            <CenterValue $color={mediaColor}>
              {data.mediaPercentual}%
            </CenterValue>
            <CenterCaption>média</CenterCaption>
          </CenterLabel>
        </ChartWrapper>
        <Legend>
          {slices.map((slice) => (
            <LegendItem key={slice.key}>
              <LegendDot color={slice.color} />
              <LegendText>{slice.label}</LegendText>
              <LegendPercent>{slice.percentage.toFixed(0)}%</LegendPercent>
            </LegendItem>
          ))}
        </Legend>
      </Content>
    </Card>
  );
}
