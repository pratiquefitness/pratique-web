// pages/api/getCpfFromWpUsers.js
import { apiPratiqueFunciona } from '@/services'
import cookie from 'cookie'

export default async function handler(req, res) {
  try {
    // Obter o cookie da requisição
    const cookies = cookie.parse(req.headers.cookie || '')
    const email = cookies.userEmail

    if (!email) {
      return res.status(400).json({ error: 'Email não encontrado nos cookies' })
    }

    // Buscar o usuário na tabela wp_users usando o email
    const user = await apiPratiqueFunciona.wp_users.findUnique({
      where: { user_email: email },
      select: { cpf: true }
    })

    if (!user || !user.cpf) {
      console.error(`CPF não encontrado para o usuário com email ${email}`)
      return res.status(404).json({ error: 'CPF não encontrado' })
    }

    // Retornar o CPF encontrado
    res.status(200).json({ cpf: user.cpf })
  } catch (error) {
    console.error('Erro ao buscar o CPF do usuário:', error)
    res.status(500).json({ error: 'Erro ao buscar o CPF do usuário', details: error.message })
  }
}
