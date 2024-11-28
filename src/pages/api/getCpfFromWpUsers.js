// pages/api/getCpfFromWpUsers.js
import { apiPratiqueFunciona } from '@/services'
import { getSession } from 'next-auth/client' // Ajuste conforme o seu método de autenticação

export default async function handler(req, res) {
  try {
    // Obter a sessão do usuário atual
    const session = await getSession({ req })

    if (!session) {
      return res.status(401).json({ error: 'Usuário não autenticado' })
    }

    // Obter o email do usuário a partir da sessão
    const userEmail = session.user.email

    if (!userEmail) {
      return res.status(400).json({ error: 'Email do usuário não disponível na sessão' })
    }

    // Buscar o usuário na tabela wp_users usando o email
    const user = await apiPratiqueFunciona.wp_users.findUnique({
      where: { user_email: userEmail },
      select: { cpf: true }
    })

    if (!user || !user.cpf) {
      console.error(`CPF não encontrado para o usuário com email ${userEmail}`)
      return res.status(404).json({ error: 'CPF não encontrado' })
    }

    // Retornar o CPF encontrado
    res.status(200).json({ cpf: user.cpf })
  } catch (error) {
    console.error('Erro ao buscar o CPF do usuário:', error)
    res.status(500).json({ error: 'Erro ao buscar o CPF do usuário', details: error.message })
  }
}
