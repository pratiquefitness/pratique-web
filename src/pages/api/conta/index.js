import { apiPratiqueFunciona, apiPratiquePro } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { user_nicename, user_email, user_pass, telefone, id } = req.body

  // Atualiza dados no banco apiPratiqueFunciona
  const userData = {
    user_nicename,
    user_email,
    user_pass: typeof user_pass !== 'undefined' ? utils.encrypt_md5(user_pass) : undefined
  }

  const dataFunciona = await apiPratiqueFunciona.wp_users.update({
    where: {
      ID: BigInt(id)
    },
    data: userData
  })

  // Atualiza dados no banco apiPratiquePro com base em matriz_email usando updateMany
  const dataPro = await apiPratiquePro.matriz.updateMany({
    where: {
      matriz_email: user_email
    },
    data: {
      matriz_tel: telefone
    }
  })

  // Verifica o resultado e envia a resposta
  if (dataFunciona && dataPro) {
    res.status(200).json(utils.clearDatabaseResult({ dataFunciona, dataPro }))
  } else {
    res.status(500).json({ error: 'Erro ao atualizar dados.' })
  }
}
