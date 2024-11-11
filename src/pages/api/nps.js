import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user_id, user_email, check_only, responses, professor_name, professor_email } =
      req.body;

    try {
      // Verificar se o usuário já fez um NPS nos últimos 30 dias
      const checkResponse = await axios.post(
        "https://pratiquetecnologia.com.br/api/app/nps/consulta.php",
        { user_id, user_email },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const { canSubmit, lastSubmissionDate, daysRemaining } = checkResponse.data;

      if (check_only) {
        return res.status(200).json({ canSubmit, lastSubmissionDate, daysRemaining });
      }

      if (!canSubmit) {
        return res.status(200).json({
          message: "Você já fez uma avaliação nos últimos 30 dias.",
          lastSubmissionDate,
          daysRemaining
        });
      }

      // Se permitido, enviar a nova avaliação
      const response = await axios.post(
        "https://pratiquetecnologia.com.br/api/app/nps/nps.php",
        {
          user_id,
          user_email,
          professor_name,
          professor_email,
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
