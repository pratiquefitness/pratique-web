import { apiPratiqueFunciona } from '@/services'
import { endOfDay, startOfDay } from 'date-fns'

export default async function handler(req, res) {
  const { id } = req.body
  const data = await apiPratiqueFunciona.ponto.findMany({
    where: {
      ponto_funcionario: id,
      ponto_hora: {
        gte: startOfDay(new Date()),
        lte: endOfDay(new Date())
      }
    }
  })
  res.status(200).json(data)
}
