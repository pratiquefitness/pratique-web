import { apiPratiqueFunciona } from '@/services'

export default async function handler(req, res) {
  const { id } = req.body

  const data = await apiPratiqueFunciona.ponto.create({
    data: {
      ponto_funcionario: id,
      ponto_hora: new Date(),
      ponto_aparelho: 'teste'
    }
  })
  res.status(200).json(data)
}
