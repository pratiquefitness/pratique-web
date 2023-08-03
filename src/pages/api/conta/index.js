import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { user_nicename, user_email, user_pass, id } = req.body

  const data = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: BigInt(id)
    },
    data:
      typeof user_pass !== 'undefined'
        ? {
            user_nicename,
            user_email,
            user_pass: utils.encrypt_md5(user_pass)
          }
        : {
            user_nicename,
            user_email
          }
  })
  res.status(200).json(utils.clearDatabaseResult(data))
}
