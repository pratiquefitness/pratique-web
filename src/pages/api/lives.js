import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const date = new Date().toISOString().split('T')[0]
  console.log(date)
  const data = await apiPratiqueAulas.lives.findMany({
    where: {
      live_datagravacao: date
    },
    orderBy: {
      live_datagravacao: 'asc'
    }
  })
  res.status(200).json(data)
}
