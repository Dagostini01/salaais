const API_URL = "https://api-ahrf.onrender.com";

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
