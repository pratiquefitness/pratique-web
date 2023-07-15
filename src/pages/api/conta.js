import { apiPratiqueUser } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { user_nicename, user_email, user_pass, id } = req.body
  const data = await apiPratiqueUser.wp_users.update({
    where: {
      ID: BigInt(id)
    },
    data: {
      user_nicename,
      user_email,
      user_pass
    }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
