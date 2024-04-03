import { apiPratiquePro } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { anotacoes, id } = req.body
  const data = await apiPratiquePro.fichas.update({
    where: {
      id_ficha: id
    },
    data: {
      anotacoes
    }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
