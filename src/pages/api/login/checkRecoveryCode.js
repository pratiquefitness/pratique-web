import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { email, code } = req.body

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_login: email,
      user_activation_key: code
    }
  })

  if (usuarioExist.length) {
    const user = { ID: usuarioExist[0].ID, user_login: usuarioExist[0].user_login }
    res.status(200).json(utils.clearDatabaseResult([user]))
  } else {
    res.status(200).json([])
  }
}
