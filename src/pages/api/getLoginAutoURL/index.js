import fetch from "node-fetch";

export default async (req, res) => {
  const { email } = req.query;
  console.log("Requisição recebida em getLoginAutoURL com email:", email);

  if (!email) {
    console.error("Parâmetro de e-mail ausente");
    return res.status(400).json({ error: "Parâmetro de e-mail ausente" });
  }

  try {
    const apiResponse = await fetch(
      `https://plataformaunipower.cademi.com.br/api/v1/usuario/${encodeURIComponent(email)}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.UNIPOWER_API_KEY,
          "Content-Type": "text/plain"
        }
      }
    );

    const data = await apiResponse.json();
    console.log("Resposta da API externa:", data);

    res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error("Erro ao obter a URL login_auto:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
