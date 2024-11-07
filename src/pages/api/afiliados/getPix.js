import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { email } = req.body
  const data = await apiPratiqueFunciona.pix.findMany({
    where: {
      email
    }
  })
  res.status(200).json(utils.clearDatabaseResult(data.length ? data[0] : {}))
}
