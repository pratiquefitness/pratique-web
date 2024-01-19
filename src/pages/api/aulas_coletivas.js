import { apiPratiqueAulas } from "@/services";
import { format } from "date-fns"; // Importe a biblioteca date-fns para formatar a data

export default async function handler(req, res) {
  const { aula_categoria } = req.body;
  
  // Formate a data atual no formato 'yyyy-MM-dd'
  const formattedDate = format(new Date(), 'yyyy-MM-dd');

  // Consulta ao banco de dados utilizando Prisma com ordenação pela coluna aula_data
  const data = await apiPratiqueAulas.aulas.findMany({
    where: {
      aula_categoria: String(aula_categoria),
    },
    orderBy: {
      aula_data: 'desc', // Ordena pela coluna aula_data em ordem decrescente (descendente)
    },
  });

  res.status(200).json(data);
}
