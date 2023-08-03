import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { avatar_image, id } = req.body
  const data = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: BigInt(id)
    },
    data: {
      avatar_image
    }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
