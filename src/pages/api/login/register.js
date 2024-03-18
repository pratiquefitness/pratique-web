import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { user_email, user_nicename, user_pass, user_phone } = req.body

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_login: user_email
    }
  })

  if (usuarioExist.length) {
    res.status(200).json([0])
  } else {
    try {
      const usuarioRegister = await apiPratiqueFunciona.wp_users.create({
        data: {
          user_nicename,
          user_email,
          user_phone,
          user_login: user_email,
          user_pass: utils.encrypt_md5(user_pass),
          user_registered: new Date(),
          user_status: 1
        }
      })
      res.status(200).json([1])
    } catch (error) {
      res.status(200).json([])
    }
  }
}
