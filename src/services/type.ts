interface ProvaAleatoriaPayload {
  curso: string;
  blocos: Number[];
  questoes_por_bloco: number;
}

interface ProvaNormalPayload {
  keys: string[];
}

export interface ProvaMateriaPayload {
  questao_por_materia: {
    curso: string;
    materia: string;
    quantidade_questoes: number;
  }[];
}

export interface LoginApplePayload {
  authorizationCode: string;
  identityToken: string;
  user: string;
  email?: string;
  name?: string;
}
