import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const { aula_categoria } = req.body
  const data = await apiPratiqueAulas.aulas.findMany(
    aula_categoria
      ? {
          where: {
            aula_categoria: String(aula_categoria)
          }
        }
      : {}
  )
  res.status(200).json(data)
}
