import { apiPratiqueAulas } from '@/services'
import { format } from 'date-fns'

export default async function handler(req, res) {
  const data = await apiPratiqueAulas.lives.findMany({
    where: {
      live_datagravacao: format(new Date(), 'yyyy-MM-dd')
    },
    orderBy: {
      live_horagravacao: 'asc'
    }
  })
  res.status(200).json(data)
}
