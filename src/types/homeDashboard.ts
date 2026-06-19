export type AnacExamResult = "APROVADO" | "REPROVADO" | "2ª ÉPOCA";

export type PerformanceDistribution = {
  aprovado: number;
  reprovado: number;
  segundaEpoca: number;
};

export type MediaDesempenho = {
  mediaPercentual: number;
  distribuicao: PerformanceDistribution;
};

export type UltimaProvaAnac = {
  id: string;
  realizadaEm: string;
  duracaoMinutos: number;
  resultado: AnacExamResult;
  percentual: number;
};

/** Payload esperado pelo backend para o dashboard da Home */
export type HomeDashboardPayload = {
  mediaDesempenho: MediaDesempenho;
  ultimasProvasAnac: UltimaProvaAnac[];
};

export function buildHomeDashboardPayload(
  mediaDesempenho: MediaDesempenho,
  ultimasProvasAnac: UltimaProvaAnac[],
): HomeDashboardPayload {
  return { mediaDesempenho, ultimasProvasAnac };
}

export const EMPTY_HOME_DASHBOARD: HomeDashboardPayload = {
  mediaDesempenho: {
    mediaPercentual: 0,
    distribuicao: {
      aprovado: 0,
      reprovado: 0,
      segundaEpoca: 0,
    },
  },
  ultimasProvasAnac: [],
};

export function hasHomeDashboardData(
  dashboard: HomeDashboardPayload,
): boolean {
  if (dashboard.ultimasProvasAnac.length > 0) {
    return true;
  }

  const { aprovado, reprovado, segundaEpoca } =
    dashboard.mediaDesempenho.distribuicao;

  return aprovado > 0 || reprovado > 0 || segundaEpoca > 0;
}
