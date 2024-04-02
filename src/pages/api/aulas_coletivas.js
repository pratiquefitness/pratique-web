import { format, isValid } from 'date-fns' // Importe a biblioteca date-fns para formatar a data
import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const { aula_categoria } = req.body

  const data = await apiPratiqueAulas.aulas.findMany({
    where: {
      aula_categoria: String(aula_categoria)
    },
    orderBy: {
      aula_datapublicacao: 'desc' // Ordenando pela data de publicação em ordem decrescente
    }
  })

  // Formatando a data
  const formattedData = data.map(item => {
    const date = new Date(item.aula_datapublicacao)
    if (!isValid(date)) {
      // Se a data não for válida, retorne a data original
      return item
    }
    return {
      ...item,
      aula_datapublicacao: format(date, 'yyyy-MM-dd')
    }
  })

  res.status(200).json(formattedData)
}
