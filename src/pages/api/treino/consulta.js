import { objectives } from '@/constants'
import { apiPratiquePro, apiPratiqueFunciona } from '@/services'
import utils from '@/utils'
import { format, parseISO } from 'date-fns'

export default async function handler(req, res) {
  let user = {}

  if (!req.body || !req.body.email) {
    return res.status(400).json({ message: 'O parâmetro email é obrigatório na requisição.' })
  }

  const { email } = req.body

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_email: email
    }
  })

  console.log('usuarioExist', usuarioExist)

  if (usuarioExist.length) {
    user = {
      fichas: [],
      ficha: {},
      treinos: [],
      ano_inicio: null,
      mes_inicio: null,
      dia_inicio: null,
      ano_final: null,
      mes_final: null,
      dia_final: null,
      config: null,
      objetivo: null,
      nivel: null,
      ...user,
      ...usuarioExist[0]
    }

    const fichasExist = await apiPratiquePro.fichas.findMany({
      where: {
        id_user: parseInt(user.ID)
      },
      orderBy: {
        data_comeco: 'desc'
      },
      take: 3
    })

    if (fichasExist.length) {
      user.fichas = fichasExist
      user.ficha = fichasExist[0]

      user.treinos = await Promise.all(
        fichasExist.map(async (ficha, key) => {
          const videos = await apiPratiquePro.exercicio.findMany({
            where: {
              exercicio_id: {
                in: ficha.videos
                  .split(',')
                  .filter(n => n)
                  .map(n => parseInt(n))
              }
            }
          })
          return { nome: `Treino ${String.fromCharCode(65 + key)}`, ...ficha, videos }
        })
      )

      const data_comeco = user.ficha.data_comeco
      const data_final = user.ficha.data_final

      user.ano_inicio = format(data_comeco, 'yyyy')
      user.mes_inicio = format(data_comeco, 'MM')
      user.dia_inicio = format(data_comeco, 'dd')

      user.ano_final = format(data_final, 'yyyy')
      user.mes_final = format(data_final, 'MM')
      user.dia_final = format(data_final, 'dd')

      const configExist = await apiPratiquePro.ficha_pre.findMany({
        where: {
          id: parseInt(user.ficha.treino)
        }
      })

      if (configExist.length) {
        user.config = configExist[0]
        const configs = user.config.valores.replace('{', '').replace('}', '').split(',')
        user.objetivo = objectives.find(item => item.key === parseInt(configs[0].replace('o=', ''))).name
        user.nivel = configs[1].replace('n=', '')
      }

      // Verificar se existe treino para o aluno
      if (user.fichas.length > 0) {
        const treinoMaisRecente = user.fichas[0]
        const dataTreinoMaisRecente = format(treinoMaisRecente.data_comeco, 'yyyy-MM-dd')
        res.status(200).json({ dataTreinoMaisRecente })
      } else {
        res.status(200).json({ message: 'Nenhum treino encontrado para o aluno.' })
      }
    } else {
      res.status(200).json({ message: 'Nenhum treino encontrado para o aluno.' })
    }
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }

  res.setHeader('Cache-Control', 'no-store')
}
