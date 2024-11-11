// pages/api/deletarUsuario.js
import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    const response = await axios.delete(
      `https:pratiquetecnologia.com.br/api/app/user/user.php?id=${id}`
    );
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Erro durante a exclusão do usuário:", error.response?.data || error.message);
    res.status(500).json({ error: "Erro durante a exclusão do usuário." });
  }
}
