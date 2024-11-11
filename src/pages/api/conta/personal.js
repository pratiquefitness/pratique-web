import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {

  const { personalId } = req.body

  const personal = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      ID: personalId
    }
  })

  res.status(200).json(utils.clearDatabaseResult(personal))
}
