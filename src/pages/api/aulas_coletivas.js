import { format, isValid, subMonths } from "date-fns";
import { apiPratiqueAulas } from "@/services";

export default async function handler(req, res) {
  const { aula_categoria } = req.body;

  // Define a condição de filtro para os últimos 6 meses apenas se a categoria for 26
  let filterCondition = { aula_categoria: String(aula_categoria) };

  if (aula_categoria === 26) {
    const sixMonthsAgo = subMonths(new Date(), 3);
    filterCondition = {
      ...filterCondition,
      aula_datapublicacao: {
        gte: sixMonthsAgo // Filtra as aulas publicadas nos últimos 6 meses
      }
    };
  }

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
}
