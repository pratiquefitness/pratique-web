import { PrismaClient } from '@prisma/client'

let prisma

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default async function handler(req, res) {
  const { unidade } = req.body

  try {
    console.log('Request body:', req.body)

    // Obter o ID da unidade a partir do nome
    const unidadeData = await apiPratiquePro.unidade.findFirst({
      where: {
        unidade_nome: unidade
      },
      select: {
        unidade_id: true
      }
    })

    console.log('Resultado de unidadeData:', unidadeData)

    if (!unidadeData) {
      return res.status(404).json({ error: 'Unidade não encontrada.' })
    }

    const unidadeId = unidadeData.unidade_id

    // Obter os usuários_meta
    const usuariosMeta = await apiPratiquePro.usuarios_meta.findMany({
      where: {
        user_mchave: 'unidade',
        user_mvalor: String(unidadeId)
      },
      select: {
        user_midusuario: true
      }
    })

    console.log('usuariosMeta:', usuariosMeta)

    if (!usuariosMeta || !Array.isArray(usuariosMeta) || usuariosMeta.length === 0) {
      console.error('Nenhum usuariosMeta encontrado.')
      return res.status(404).json({ error: 'Nenhum usuário encontrado para esta unidade.' })
    }

    const usuarioIds = usuariosMeta.map(meta => meta.user_midusuario)

    console.log('usuarioIds:', usuarioIds)

    // Obter os usuários (professores)
    const professores = await apiPratiquePro.usuarios.findMany({
      where: {
        usuarios_id: { in: usuarioIds },
        usuarios_anfitriao: '1'
      },
      select: {
        usuarios_id: true,
        usuarios_nome: true,
        usuarios_email: true
      }
    })

    console.log('professores:', professores)

    if (!professores || !Array.isArray(professores) || professores.length === 0) {
      console.error('Nenhum professor encontrado.')
      return res.status(404).json({ error: 'Nenhum professor encontrado para esta unidade.' })
    }

    // Obter os avatares dos professores
    const professoresEmails = professores.map(p => p.usuarios_email)

    console.log('professoresEmails:', professoresEmails)

    const wpUsers = await apiPratiqueFunciona.wp_users.findMany({
      where: {
        user_email: { in: professoresEmails }
      },
      select: {
        user_email: true,
        avatar_image: true
      }
    })

    console.log('wpUsers:', wpUsers)

    // Combinar as informações de avatar com os professores
    const professoresComAvatar = professores.map(professor => {
      const wpUser = wpUsers.find(u => u.user_email === professor.usuarios_email)
      return {
        ...professor,
        avatar_image: wpUser ? wpUser.avatar_image : null
      }
    })

    res.status(200).json({ professors: professoresComAvatar })
  } catch (error) {
    console.error('Erro no endpoint /api/getProfessors:', error)
    res.status(500).json({ error: 'Erro ao buscar os professores.' })
  }
}
