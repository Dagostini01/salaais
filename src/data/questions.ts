export async function gerarProvaAleatoria() {
  const response = await fetch(
    "https://api-salaais-projects.vercel.app/questao/gerar-prova/aleatoria",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curso: "cms",
        blocos: [1, 2, 3, 4],
        questoes_por_bloco: 1,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Erro ao gerar a prova");
  }

  const data = await response.json();
  return data;
}
