import type { HomeDashboardPayload } from "../types/homeDashboard";

export const MOCK_HOME_DASHBOARD: HomeDashboardPayload = {
  mediaDesempenho: {
    mediaPercentual: 74,
    distribuicao: {
      aprovado: 48,
      reprovado: 22,
      segundaEpoca: 30,
    },
  },
  ultimasProvasAnac: [
    {
      id: "1",
      realizadaEm: "2026-05-15T14:30:00.000Z",
      duracaoMinutos: 95,
      resultado: "APROVADO",
      percentual: 82,
    },
    {
      id: "2",
      realizadaEm: "2026-05-08T09:15:00.000Z",
      duracaoMinutos: 102,
      resultado: "2ª ÉPOCA",
      percentual: 58,
    },
    {
      id: "3",
      realizadaEm: "2026-04-28T16:45:00.000Z",
      duracaoMinutos: 88,
      resultado: "REPROVADO",
      percentual: 41,
    },
    {
      id: "4",
      realizadaEm: "2026-04-12T11:00:00.000Z",
      duracaoMinutos: 97,
      resultado: "APROVADO",
      percentual: 76,
    },
  ],
};
