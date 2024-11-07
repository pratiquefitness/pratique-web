import { apiPratiquePro } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { peso, video, id } = req.body

  const fichaExist = await apiPratiquePro.fichas.findMany({
    where: {
      id_ficha: parseInt(id)
    }
  })

  if (fichaExist.length) {
    const ficha = fichaExist[0]
    let currentPeso
    try {
      currentPeso = JSON.parse(ficha.peso)
    } catch (error) {
      currentPeso = {}
      // const pesos = ficha.peso.split(',').filter(n => n)
      // pesos.forEach(element => {
      //   const split = element.split('|')
      //   currentPeso = {
      //     ...currentPeso,
      //     [split[1]]: split[0]
      //   }
      // })
    }
    await apiPratiquePro.fichas.update({
      where: {
        id_ficha: id
      },
      data: {
        peso: JSON.stringify({
          ...currentPeso,
          [video]: peso
        })
      }
    })
  }

  res.status(200).json({})
}
