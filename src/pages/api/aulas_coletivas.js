import { format, isValid, subMonths } from "date-fns";
import { apiPratiqueAulas } from "@/services";

export default async function handler(req, res) {
  const { aula_categoria } = req.body;

  // Define a condição de filtro para os últimos 3 meses apenas se a categoria for 26
  let filterCondition = { aula_categoria: String(aula_categoria) };

  if (aula_categoria === 26) {
    const threeMonthsAgo = subMonths(new Date(), 3); // Ajuste para 3 meses
    filterCondition = {
      ...filterCondition,
      aula_datapublicacao: {
        gte: threeMonthsAgo // Filtra as aulas publicadas nos últimos 3 meses
      }
    };
  }

  try {
    const data = await apiPratiqueAulas.aulas.findMany({
      where: filterCondition,
      orderBy: {
        aula_datapublicacao: "desc" // Ordenando pela data de publicação em ordem decrescente
      }
    });

    // Formatando a data
    const formattedData = data.map((item) => {
      const date = new Date(item.aula_datapublicacao);
      if (!isValid(date)) {
        // Se a data não for válida, retorne a data original
        return item;
      }
      return {
        ...item,
        aula_datapublicacao: format(date, "yyyy-MM-dd")
      };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados." });
  }
}
