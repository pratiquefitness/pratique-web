import { apiPratiqueFunciona, apiPratiquePro, apiPratiqueUser } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  //const email = 'adelmodesign@gmail.com' // nao afiliado
  // const email = 'bruna.vn.costa@gmail.com' // afiliado

  const { email, senha } = req.body

  let user = {}

  const usuarioExist = await apiPratiqueUser.wp_users.findMany({
    where: {
      user_login: email
    }
  })

  if (usuarioExist.length) {
    user = usuarioExist[0]

    // afiliados
    if (user.user_status === 1) {
      const afiliadoExist = await apiPratiquePro.afiliado.findMany({
        where: {
          email: email
        }
      })

      if (afiliadoExist.length) {
        user.isAffiliate = afiliadoExist.length ? afiliadoExist[0].idloja : 0
      }
    } else {
      user.isAffiliate = 0
    }

    // funcionario
    const funcionarioExists = await apiPratiqueFunciona.funcionarios.findMany({
      where: {
        email: email
      }
    })

    user.isEmployee = funcionarioExists.length ? 1 : 0
    user.cargo = funcionarioExists[0].cargo

    // pacto
    const pactoExist = await apiPratiquePro.matriz.findMany({
      where: {
        matriz_email: email
      }
    })

    if (pactoExist.length) {
      user.status = pactoExist[0].matriz_situacao
      user.plano = pactoExist[0].matriz_plano
    } else {
      user.status = null
      user.plano = null
    }
  }

  res.status(200).json(utils.clearDatabaseResult([user]))
}
