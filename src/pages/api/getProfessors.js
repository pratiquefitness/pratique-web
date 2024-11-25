// src/pages/api/getProfessors.js

import { apiPratiqueFunciona, apiPratiquePro } from '@/services'

export default async function handler(req, res) {
  // console.log('--- [getProfessors] Início da requisição ---')
  //  console.log('Método HTTP:', req.method)
  //  console.log('Corpo da Requisição:', req.body)
  // console.log('apiPratiquePro:', apiPratiquePro)
  //  console.log('apiPratiqueFunciona:', apiPratiqueFunciona)

  const { unidade } = req.body

  try {
    if (req.method !== 'POST') {
      //   console.log('Método não permitido:', req.method)
      return res.status(405).json({ error: 'Método não permitido' })
    }

    if (!unidade) {
      //   console.log('Unidade não fornecida.')
      return res.status(400).json({ error: 'Unidade não fornecida.' })
    }

    // Obter o ID da unidade a partir do nome
    //  console.log(`Buscando unidade com nome: ${unidade}`)
    const unidadeData = await apiPratiquePro.unidade.findFirst({
      where: {
        unidade_nome: unidade
      },
      select: {
        unidade_id: true
      }
    })

    //  console.log('Resultado da busca da unidade:', unidadeData)

    if (!unidadeData) {
      //    console.log('Unidade não encontrada:', unidade)
      return res.status(404).json({ error: 'Unidade não encontrada.' })
    }

    const unidadeId = unidadeData.unidade_id
    //  console.log('ID da unidade:', unidadeId)

    // Obter os usuários_meta que têm a chave 'unidade' e o valor igual ao ID da unidade
    // console.log('Buscando usuários_meta com unidade_id:', unidadeId)
    const usuariosMeta = await apiPratiquePro.usuarios_meta.findMany({
      where: {
        user_mchave: 'unidade',
        user_mvalor: String(unidadeId)
      },
      select: {
        user_midusuario: true
      }
    })

    //  console.log('Resultado da busca de usuários_meta:', usuariosMeta)

    if (!usuariosMeta || usuariosMeta.length === 0) {
      //    console.log('Nenhum usuário_meta encontrado para unidade_id:', unidadeId)
      return res.status(404).json({ error: 'Nenhum professor encontrado para esta unidade.' })
    }

    const usuarioIds = usuariosMeta.map(meta => meta.user_midusuario)
    //  console.log('IDs dos usuários:', usuarioIds)

    // Obter os usuários que são 'anfitriões' (usuarios_anfitriao = true) e estão na lista de IDs obtidos
    //  console.log('Buscando usuários com IDs:', usuarioIds, 'e usuarios_anfitriao = 1')
    const professores = await apiPratiquePro.usuarios.findMany({
      where: {
        usuarios_id: { in: usuarioIds },
        usuarios_anfitriao: '1' // Alterado para Boolean
      },
      select: {
        usuarios_id: true,
        usuarios_nome: true,
        usuarios_email: true
      }
    })

    // console.log('Resultado da busca de professores:', professores)

    if (!professores || professores.length === 0) {
      //  console.log('Nenhum professor encontrado para unidade_id:', unidadeId)
      return res.status(404).json({ error: 'Nenhum professor encontrado para esta unidade.' })
    }

    // Obter os avatares dos professores na tabela wp_users
    //   console.log(
    //     'Buscando avatares na tabela wp_users para emails:',
    //   professores.map(p => p.usuarios_email)
    //  )
    const wpUsers = await apiPratiqueFunciona.wp_users.findMany({
      where: {
        user_email: { in: professores.map(p => p.usuarios_email) }
      },
      select: {
        user_email: true,
        avatar_image: true
      }
    })

    //  console.log('Resultado da busca de wp_users:', wpUsers)

    // Combinar as informações de avatar com os professores
    const professoresComAvatar = professores.map(professor => {
      const wpUser = wpUsers.find(u => u.user_email === professor.usuarios_email)
      return {
        ...professor,
        avatar_image: wpUser ? wpUser.avatar_image : null
      }
    })

    // console.log('Professores com avatar:', professoresComAvatar)

    res.status(200).json({ professors: professoresComAvatar })
    //   console.log('--- [getProfessors] Requisição concluída com sucesso ---')
  } catch (error) {
    //   console.error('Erro ao buscar os professores:', error)
    res.status(500).json({ error: 'Erro ao buscar os professores.', details: error.message })
  }
}
