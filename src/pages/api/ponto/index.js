import { apiPratiqueFunciona } from '@/services'
import { getDistance } from 'geolib'
import apiStrapi from '@/services/apiStrapi'

export default async function handler(req, res) {
  const { id, chave, latitude, longitude } = req.body

  const unidades = await apiStrapi.get('/unidades?populate=*&pagination[pageSize]=100')

  const unidade = unidades.data.data.find(item => item.attributes.chave === chave)

  if (unidade) {
    const distance = getDistance(
      { latitude, longitude },
      { latitude: unidade.attributes.latitude, longitude: unidade.attributes.longitude }
    )
    const distanceInKm = distance / 1000
    if (distanceInKm < 0.5) {
      const data = await apiPratiqueFunciona.ponto.create({
        data: {
          ponto_funcionario: id,
          ponto_hora: new Date(),
          ponto_aparelho: 'teste'
        }
      })
      res.status(200).json({ status: 1, data })
    } else {
      res.status(200).json({ status: 2 })
    }
  } else {
    res.status(200).json({ status: 0 })
  }
}
