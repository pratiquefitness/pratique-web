import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { personalId, alunoId, vinculo } = req.body

  const data = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: BigInt(alunoId)
    },
    data:
      {
        personal: vinculo ?  null : String(personalId),
      }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
