import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { email, chave, tipo } = req.body
  const pixExist = await apiPratiqueFunciona.pix.findMany({
    where: {
      email
    }
  })
  const data = pixExist.length
    ? await apiPratiqueFunciona.pix
        .updateMany({
          where: {
            email
          },
          data: {
            chave,
            tipo
          }
        })
        .then(() => {
          return apiPratiqueFunciona.pix.findMany({
            where: {
              email
            }
          })
        })
    : await apiPratiqueFunciona.pix.create({
        data: {
          email,
          chave,
          tipo
        }
      })

  res.status(200).json(utils.clearDatabaseResult(data))
}
