import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const data = await apiPratiqueAulas.lives.findMany({
    where: {
      live_datagravacao: new Date()
    },
    orderBy: {
      live_datagravacao: 'asc'
    }
  })
  res.status(200).json(data)
}
