import { apiPratiqueDiagnose } from "@/services";

export default async function handler(req, res) {
  const { email } = req.body;

  try {
    const diagnoseExist = await apiPratiqueDiagnose.windows.findFirst({
      where: {
        diagnose_email: email
      }
    });

    res.status(200).json({ hasDiagnose: !!diagnoseExist });
  } catch (error) {
    console.error("Erro ao verificar diagnose:", error);
    res.status(500).json({ message: "Erro ao verificar diagnose." });
  }
}
