import { apiPratiqueFunciona } from '@/services'
import utils from '@/utils'

export default async function handler(req, res) {
  const { id, cpf } = req.body

  try {
    const data = await apiPratiqueFunciona.wp_users.update({
      where: {
        ID: BigInt(id)
      },
      data: {
        cpf
      }
    })

    res.status(200).json(utils.clearDatabaseResult(data))
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o CPF' })
  }
}
