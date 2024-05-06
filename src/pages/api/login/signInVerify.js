import { apiPratiqueFunciona, apiPratiquePro } from '@/services'
import jwt from 'jsonwebtoken'
import utils from '@/utils'

export default async function handler(req, res) {
  //const email = 'adelmodesign@gmail.com' // nao afiliado
  // const email = 'bruna.vn.costa@gmail.com' // afiliado

  const { token } = req.body

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      // Token inválido
      res.status(200).json([])
      return
    }

    const id = decoded.ID

    let user = {}

    if (isNaN(parseInt(id))) {
      res.status(200).json([])
    } else {
      const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
        where: {
          ID: BigInt(id)
        }
      })

      if (usuarioExist.length) {
        user = usuarioExist[0]

        const email = user.user_email

        // afiliados
        if (user.user_status === 1) {
          const afiliadoExist = await apiPratiquePro.afiliado.findMany({
            where: {
              email: email
            }
          })

          if (afiliadoExist.length) {
            user.isAffiliate = afiliadoExist.length ? afiliadoExist[0].idloja : 0
          }
        } else {
          user.isAffiliate = 0
        }

        // funcionario
        const funcionarioExists = await apiPratiqueFunciona.funcionarios.findMany({
          where: {
            email: email
          }
        })

        user.isEmployee = funcionarioExists.length ? 1 : 0
        user.cargo = funcionarioExists.length ? funcionarioExists[0].cargo : 0
        user.cpf = funcionarioExists.length ? funcionarioExists[0].cpf : 0

        // pacto
        const pactoExist = await apiPratiquePro.matriz.findMany({
          where: {
            matriz_email: email
          }
        })

        if (pactoExist.length) {
          const unidadeExist = await apiPratiquePro.unidade.findMany({
            where: {
              unidade_numero: pactoExist[0].matriz_unidade
            },
            select: {
              unidade_nome: true
            }
          })
          user.status = pactoExist[0].matriz_situacao
          user.plano = pactoExist[0].matriz_plano
          //user.unidade = unidadeExist[0].unidade_nome
           if (unidadeExist.length > 0) {
             user.unidade = unidadeExist[0].unidade_nome
           } else {
             user.unidade = 'Pratique Fitness'
           }

          // Verificar se matriz_tel existe antes de atribuir a user.telefone
          if (pactoExist[0].matriz_tel !== undefined) {
            user.telefone = pactoExist[0].matriz_tel
          } else {
            user.telefone = null
          }

          // Verificar se matriz_cpf existe antes de atribuir a user.cpf
          if (pactoExist[0].matriz_cpf !== undefined) {
            user.cpf = pactoExist[0].matriz_cpf
          } else {
            user.cpf = null
          }
        } else {
          user.status = null
          user.plano = null
          user.unidade = null
          user.telefone = null
          //user.cpf = null
        }
      }

      res.status(200).json(utils.clearDatabaseResult([user]))
    }
  })
}
