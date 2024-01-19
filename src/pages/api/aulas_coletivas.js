import { apiPratiqueAulas } from "@/services";
import { format } from "date-fns";

export default async function handler(req, res) {
  try {
    const { aula_categoria } = req.body;

    const data = await apiPratiqueAulas.aulas.findMany({
      where: {
        aula_datagravacao: {
          gte: format(new Date(), "yyyy-MM-dd"),
        },
        aula_categoria: String(aula_categoria),
      },
      orderBy: {
        aula_datagravacao: "desc",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
}
