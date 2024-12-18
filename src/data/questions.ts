export async function gerarProvaAleatoria(token: string) {
  const response = await fetch(
    "https://api-ahrf.onrender.com/questao/gerar-prova/aleatoria",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        curso: "cms",
        blocos: [1, 2, 3, 4],
        questoes_por_bloco: 20,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao gerar a prova");
  }

  const data = await response.json();
  return data;
}

interface ProvaMateriaPayload {
  questao_por_materia: {
    curso: string;
    materia: string;
    quantidade_questoes: number;
  }[];
}

export async function gerarProvaPorMateria(
  token: string,
  payload: ProvaMateriaPayload,
) {
  console.log(token);
  try {
    const response = await fetch(
      "https://api-ahrf.onrender.com/questao/gerar-prova/materia",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
        body: JSON.stringify(payload),
      },
    );
    if (!response.ok) {
      throw new Error(`Erro ao gerar prova: ${response.statusText}`);
    }
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao gerar prova por todas as matérias:", error);
    throw new Error("Erro ao gerar prova. Tente novamente mais tarde.");
  }
}
