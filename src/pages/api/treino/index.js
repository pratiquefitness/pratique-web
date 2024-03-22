import { objectives } from '@/constants'
import { apiPratiquePro, apiPratiqueFunciona } from '@/services'
import utils from '@/utils'
import { format, parseISO } from 'date-fns'

export default async function handler(req, res) {
  let user = {}

  const { email } = req.body

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_email: email
    }
  });
  
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
      config: [],
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
          id: {
            in: user.fichas.map(f => parseInt(f.treino))
          }
        }
      })
      
      if (configExist.length) {
        configExist.map((c) => {
          const configs = c.valores.replace('{', '').replace('}', '').split(',');
          const obj = {
            objetivo: objectives.find(item => item.key === parseInt(configs[0].replace('o=', ''))),
            nivel: configs[1].replace('n=', ''),
            id_treino: c.id
          };
          user.config = [...user.config, obj]
        });
      }
    }
  }

  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json(utils.clearDatabaseResult(user))
}
