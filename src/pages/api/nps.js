import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user_id, responses } = req.body;
      const response = await axios.post(
        "https://pratiquetecnologia.com.br/api/app/nps/nps.php",
        {
          user_id,
          responses
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error sending data to PHP server:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ message: "Erro ao enviar avaliação." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
