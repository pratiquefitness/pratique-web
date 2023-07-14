import { apiPratiqueAulas } from '@/services'
// import { format, toDate } from 'date-fns'

export default async function handler(req, res) {
  const data = await apiPratiqueAulas.lives.findMany({
    where: {
      live_datapublicacao: {
        lte: new Date()
      }
    },
    orderBy: {
      live_datapublicacao: 'asc'
    }
  })
  res.status(200).json(data)
}
