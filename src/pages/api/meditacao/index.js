import { apiPratiqueAulas } from '@/services'

export default async function handler(req, res) {
  const meditacoes = await apiPratiqueAulas.meditacao_modalidade.findMany()
  const data = await Promise.all(
    meditacoes.map(async item => {
      const aulas = await apiPratiqueAulas.meditacao.findMany({
        where: {
          meditacao_categoria: item.id
        }
      })
      return {
        ...item,
        aulas
      }
    })
  )
  res.status(200).json(data)
}
