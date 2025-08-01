const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ProvaAleatoriaPayload = {
  curso: string;
  blocos: Number[];
  questoes_por_bloco: number;
};

type ProvaNormalPayload = {
  keys: string[];
};

export const paymentSheetParams = async (
  accessToken: string,
  productKey: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/stripe/pagamento-mobile/${productKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);

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

export const loginApple = async (payload: LoginApplePayload) => {
  try {
    const response = await fetch(`${API_URL}/auth/login-ios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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

export const deleteUser = async (token: string, id: number) => {
  try {
    const response = await fetch(`${API_URL}/usuario/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao excluir usuário");
    }
  } catch (error: any) {
    throw new Error("Erro ao excluir usuário", error);
  }
};

export async function enviarRevisaoQuestao(
  token: string,
  body: {
    questao_key: string;
    texto: string;
    alternativa_assinalada: string;
    descricao: string;
    acertou_questao: boolean;
    resposta_equipe: string;
  }
) {
  try {
    const response = await fetch(`${API_URL}/questao/revisao`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("Erro API revisão:", err);
      throw new Error("Erro ao enviar revisão");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erro ao enviar revisão:", error.message);
    throw error;
  }
}

export async function gerarProvaAleatoria(
  token: string,
  payload: ProvaAleatoriaPayload
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
    // console.log("DATA:", data);
    return data;
  } catch (error: any) {
    throw new Error("Erro ao gerar prova aleatória", error);
  }
}

export async function gerarProvaPorMateria(
  token: string,
  payload: ProvaMateriaPayload
) {
  try {
    const response = await fetch(`${API_URL}/questao/gerar-prova/materia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
      body: JSON.stringify(payload),
    });
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

export async function gerarProvaNormal(
  token: string,
  payload: ProvaNormalPayload
) {
  try {
    const response = await fetch(`${API_URL}/questao/gerar-prova/normal`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Erro ao gerar a prova normal");
    }
    const data = await response.json();
    // console.log("DATA", data);
    return data;
  } catch (error: any) {
    throw new Error("Erro ao gerar prova normal", error);
  }
}
