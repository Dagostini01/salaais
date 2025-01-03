const API_URL = "https://api-ahrf.onrender.com";

export const paymentSheetParams = async (
  accessToken: string,
  productKey: string,
) => {
  try {
    const response = await fetch(
      `${API_URL}/stripe/criar-intencao-pagamento/${productKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    const { client_secret, ephemeral_key, id_customer } = data;

    return {
      paymentIntent: client_secret,
      ephemeralKey: ephemeral_key,
      customer: id_customer,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao criar pagamento");
  }
};

export const authLogin = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login-android`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Erro ao autenticar");
  }
};

export const dataUser = async (token: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/dados-usuario-por-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error("Erro ao buscar dados do usuário");
  }
};

type ProvaAleatoriaPayload = {
  curso: string;
  blocos: Number[];
  questoes_por_bloco: number;
};

export async function gerarProvaAleatoria(
  token: string,
  payload: ProvaAleatoriaPayload,
) {
  try {
    const response = await fetch(`${API_URL}/questao/gerar-prova/aleatoria`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Erro ao gerar a prova");
    }
    const data = await response.json();
    console.log("DATA", data);
    return data;
  } catch (error: any) {
    throw new Error("Erro ao gerar prova aleatória", error);
  }
}

export async function gerarProvaPorMateria(
  token: string,
  payload: ProvaMateriaPayload,
) {
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
