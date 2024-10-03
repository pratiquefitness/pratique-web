// src/pages/api/check-diagnose.js

import { apiPratiqueDiagnose } from "@/services";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email é obrigatório." });
  }

  try {
    const diagnoseExist = await apiPratiqueDiagnose.windows.findFirst({
      where: {
        diagnose_email: email
      },
      orderBy: {
        diagnose_data: "desc" // Garante que obtenha o diagnóstico mais recente
      }
    });

    if (diagnoseExist) {
      res.status(200).json({
        hasDiagnose: true,
        diagnoseDate: diagnoseExist.diagnose_data // Inclui a data do diagnóstico
      });
    } else {
      res.status(200).json({ hasDiagnose: false });
    }
  } catch (error) {
    console.error("Erro ao verificar diagnose:", error);
    res.status(500).json({ message: "Erro ao verificar diagnose." });
  }
}
