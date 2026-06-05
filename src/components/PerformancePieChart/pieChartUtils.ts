import theme from "../../global/global/theme";

export type PieSlice = {
  key: string;
  value: number;
  color: string;
  label: string;
};

export type DesempenhoStatus = "aprovado" | "segundaEpoca" | "reprovado";

/** Alinha com faixas ANAC: ≥70 aprovado, 30–69 2ª época, &lt;30 reprovado */
export function getDesempenhoStatusFromPercent(percent: number): DesempenhoStatus {
  if (percent >= 70) return "aprovado";
  if (percent >= 30) return "segundaEpoca";
  return "reprovado";
}

export function getDesempenhoColor(status: DesempenhoStatus): string {
  switch (status) {
    case "aprovado":
      return theme.colors.anac;
    case "segundaEpoca":
      return theme.colors.primary;
    case "reprovado":
      return theme.colors.attention;
  }
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number,
) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleRad),
    y: cy + radius * Math.sin(angleRad),
  };
}

export function describeDonutSlice(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const startOuter = polarToCartesian(cx, cy, outerRadius, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerRadius, startAngle);
  const startInner = polarToCartesian(cx, cy, innerRadius, startAngle);
  const endInner = polarToCartesian(cx, cy, innerRadius, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

export function buildPieSlices(
  slices: PieSlice[],
): Array<PieSlice & { path: string; percentage: number }> {
  const total = slices.reduce((acc, slice) => acc + slice.value, 0);
  if (total === 0) return [];

  let currentAngle = 0;
  const cx = 50;
  const cy = 50;
  const outerRadius = 45;
  const innerRadius = 30;

  return slices.map((slice) => {
    const percentage = (slice.value / total) * 100;
    const sweep = (slice.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    return {
      ...slice,
      percentage,
      path: describeDonutSlice(
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
      ),
    };
  });
}
