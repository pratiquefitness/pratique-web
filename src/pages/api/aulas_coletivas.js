import { apiPratiqueAulas } from "@/services";
import { format } from "date-fns";

export default async function handler(req, res) {
  const { aula_categoria } = req.body;
  const data = await apiPratiqueAulas.aulas.findMany({
    where: {
      aula_datagravacao: {
        gte: format(new Date(), "yyyy-MM-dd"),
      },
    },
    aula_categoria: String(aula_categoria),
    orderBy: {
      aula_datagravacao: "desc",
    },
  });
  res.status(200).json(data);
}
