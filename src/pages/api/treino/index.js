import { objectives } from '@/constants'
import { apiPratiqueFunciona, apiPratiquePro, apiPratiqueUser } from '@/services'
import utils from '@/utils'
import { getDay, getMonth } from 'date-fns'

export default async function handler(req, res) {
  let user = {}
  const email = 'adelmodesign@gmail.com' // nao afiliado
  // const email = 'bruna.vn.costa@gmail.com' // afiliado
  const usuarioExist = await apiPratiqueUser.wp_users.findMany({
    where: {
      user_email: email
    }
  })

  if (usuarioExist.length) {
    user = usuarioExist[0]

    const fichasExist = await apiPratiquePro.fichas.findMany({
      where: {
        id_user: parseInt(user.ID)
      },
      orderBy: {
        data_comeco: 'desc'
      },
      take: 3
    })

    if (fichasExist.length) {
      user.ficha = fichasExist[0]

      user.treinos = fichasExist.map((ficha, key) => {
        return { nome: `Treino ${String.fromCharCode(65 + key)}`, ...ficha }
      })

      const data_comeco = String(user.ficha.data_comeco).split('-')

      user.ano_inicio = getMonth(data_comeco[0])
      user.mes_inicio = getMonth(data_comeco[1])
      user.dia_inicio = getDay(data_comeco[2])

      const configExist = await apiPratiquePro.ficha_pre.findMany({
        where: {
          id: parseInt(user.ficha.treino)
        }
      })

      if (configExist.length) {
        user.config = configExist[0]
        const configs = user.config.valores.replace('{', '').replace('}', '').split(',')
        user.objetivo = objectives.find(item => item.key === parseInt(configs[0].replace('o=', ''))).name
        user.nivel = configs[1].replace('n=', '')
      }
    }
  }

  res.status(200).json(utils.clearDatabaseResult(usuarioExist))
}
