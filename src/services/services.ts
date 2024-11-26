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
