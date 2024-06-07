import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {

  const { id } = req.body

  const personal = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: id
    },
    data: {
      personal: null,
    }
  })

  res.status(200).json(utils.clearDatabaseResult(personal))
}
