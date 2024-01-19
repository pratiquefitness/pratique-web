import { format } from "date-fns"; // Importe a biblioteca date-fns para formatar a data
import { apiPratiqueAulas } from "@/services";

export default async function handler(req, res) {
  const { aula_categoria } = req.body;
  
  const data = await apiPratiqueAulas.aulas.findMany({
    where: {
      aula_categoria: String(aula_categoria),
    },
    orderBy: {
      aula_datapublicacao: 'desc', // Ordenando pela data de publicação em ordem decrescente
    },
  });

  // Formatando a data
  const formattedData = data.map(item => ({
    ...item,
    aula_datapublicacao: format(new Date(item.aula_datapublicacao), 'yyyy-MM-dd'),
  }));

  res.status(200).json(formattedData);
}
