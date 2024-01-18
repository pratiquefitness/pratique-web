import { apiPratiqueAulas } from "@/services";

export default async function handler(req, res) {
  const { aula_categoria } = req.body;

  try {
    const data = await apiPratiqueAulas.aulas.findMany({
      where: {
        aula_categoria: String(aula_categoria),
      },
      orderBy: {
        aulas_datapublicacao: 'desc', // 'desc' para ordenar da mais nova para a mais velha
      },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os dados das aulas.' });
  }
}
