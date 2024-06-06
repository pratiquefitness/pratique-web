import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {

  const { email } = req.body

  const alunos = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_email: {
        contains: email
      },
      personal: null,
      professor: null
    }
  })

  res.status(200).json(utils.clearDatabaseResult(alunos))
}
