import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const data = await apiPratiqueAulas.aulas.findMany()
  res.status(200).json(data)
}
