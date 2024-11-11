import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const {
    user_nicename,
    id,
  } = req.body

  const data = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: BigInt(id)
    },
    data:
      {
        user_nicename,
      }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
