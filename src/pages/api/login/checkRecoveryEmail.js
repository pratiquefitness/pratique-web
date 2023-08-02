import { apiPratiqueFunciona } from '@/services'
import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import utils from '@/utils'

import EmailVerificationCode from '@/emails/VerificationCode'

const smtpOptions = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
}

export const sendEmail = async data => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions
  })
  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    ...data
  })
}

export default async function handler(req, res) {
  const { email } = req.body

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_login: email
    }
  })

  if (usuarioExist.length) {
    const code = utils.getRndInteger(111111, 999999)
    const user = { ID: usuarioExist[0].ID, user_login: usuarioExist[0].user_login }
    await apiPratiqueFunciona.wp_users.update({
      where: {
        ID: BigInt(usuarioExist[0].ID),
        user_login: email
      },
      data: {
        user_activation_key: String(code)
      }
    })

    await sendEmail({
      //to: usuarioExist[0].user_login,
      to: 'henriquezolini@gmail.com',
      subject: 'Seu código de verificação Pratique em Casa',
      html: render(EmailVerificationCode(usuarioExist[0].user_nicename, code))
    })
    res.status(200).json(utils.clearDatabaseResult([user]))
  } else {
    res.status(200).json([])
  }
}
