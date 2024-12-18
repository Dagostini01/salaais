interface ProvaAleatoriaPayload {
  curso: string;
  blocos: Number[];
  questoes_por_bloco: number;
}

interface ProvaMateriaPayload {
  questao_por_materia: {
    curso: string;
    materia: string;
    quantidade_questoes: number;
  }[];
}
