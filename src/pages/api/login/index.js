import { apiPratiqueFunciona, apiPratiquePro } from '@/services'
import jwt from 'jsonwebtoken'
import utils from '@/utils'

export default async function handler(req, res) {
  //const email = 'adelmodesign@gmail.com' // nao afiliado
  // const email = 'bruna.vn.costa@gmail.com' // afiliado

  const { email, senha } = req.body

  let user = {}

  const usuarioExist = await apiPratiqueFunciona.wp_users.findMany({
    where: {
      user_login: email,
      user_pass: utils.encrypt_md5(senha)
    }
  })

  if (usuarioExist.length) {
    user = usuarioExist[0]
    user.token = jwt.sign({ ID: String(user.ID) }, process.env.JWT_SECRET)

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
      user.isAffiliate = 0
    }

    // Definir os emails e os valores correspondentes de cpf_sva
    const emails = [
      'guilhermeam.ornelas@gmail.com',
      'gita@gmail.com',
      'joseantonioben04@gmail.com',
      'bemcria@gmail.com',
      'marketing@lecard.com.br',
      'cristina.souza0887@gmail.com',
      'anaa.roch4@gmail.com',
      'samartins98@gmail.com',
      'lorrainy_cruz@hotmail.com.br',
      'andreiapboldt@gmail.com',
      'slzache@hotmail.com',
      'amandaduartecosta11@gmail.com',
      'elaine.daros.baldam@gmail.com',
      'flaviaronascimento@gmail.com',
      'karlamartins.advocacia@gmail.com',
      'andreotte@gmail.com',
      'Milopesm2@gmail.com',
      'Daiane.martine@outlook.com',
      'Dmaycon328@gmail.com',
      'vargasleao@hotmail.com',
      'ketellemsantoskapiski@gmail.com',
      'maryanesoares21@gmail.com',
      'Thaynaratbabilon@gmail.com',
      'daniellasilva974@gmail.com',
      'kamilla.campores@hotmail.com',
      'juniorvieira.jailton@gmail.com',
      'lais04fo@gmail.com',
      'graziellasouzaramos@gmail.com',
      'lorenag_silva@hotmail.com',
      'vrlessa@gmail.com',
      'dandaracarneiro.silva19@gmail.com',
      'jessicarfonseca98@gmail.com',
      'anavitoria071211@gmail.com',
      'leticiafpcorrea@gmail.com',
      'eta-pv@hotmail.com',
      'karlak89@gmail.com',
      'adri10olive@gmail.com',
      'douglas.rh@outlook.com',
      'maria.crng19@icloud.com',
      'kauacamposnascimento@gmail.com',
      'rodrigorteixeira@hotmail.com',
      'renataschaefer2019@outlook.com',
      'angelicarodriguesmartins@hotmail.com',
      'luisifrutofiel@gemail.com',
      'jessykcoelho@hotmail.com',
      'trabalhoyasmimcarvalho@gmail.com',
      'patriciasiq1999@gmail.com.br',
      'Daianarodriguescoutinho977@gmail.com',
      'thalicia08@gmail.com',
      'Thamiris.96.santana@gmail.com',
      'gilmarlimasilva@gmail.com',
      'Bhrenda.anna2@gmail.com',
      'ferreiracoelho.b@gmail.com',
      'daianadesouza018@gmail.com',
      'esthellam61@gmail.com',
      'fran_lopes15@hotmail.com',
      'limajady21@gmail.com',
      'keltonkms@hotmail.com',
      'lorranyfraga58@gmail.com',
      'polly.macedo22@gmail.com',
      'pereirarizielly@gmail.com',
      'geiradasilvarosiely@gmail.com',
      'samara.rp@hotmail.com',
      'sanlleybraganca@gmail.com',
      'alana.celestino@hotmail.com',
      'estela.as@gmail.com',
      'IWIN.VIX@HOTMAIL.COM',
      'J.SSICA@HOTMAIL.COM',
      'HENRIQUE_FLV@HOTMAIL.COM',
      'ANDRE.BARBOSA.SANCHEL@GMAIL.COM',
      'JESSICA22SOARES@HOTMAIL.COM',
      'andre.sarmento@gmail.com',
      'danielerossetto4@gmail.com',
      'leonaracastiglioni.rodrigues@gmail.com',
      'esthefanyfoliveira@gmail.com',
      'amanda0611silva@gmail.com',
      'alessanderconstantino162@hotmail.com',
      'dlsantos589632147@gmail.com',
      'Pretty_nine@hotmail.com',
      'wandalmazo@hotmail.com',
      'juprado.guimaraes@gmail.com',
      'tsegestao@gmail.com',
      'cassiano.orsi@gmail.com',
      'erlyvieira@gmail.com',
      'lucascorradi.lc@gmail.com',
      'guilherme.vituri.cordeiro@gmail.com',
      'denildacsr@gmail.com.br',
      'crislainecore02@gmail.com',
      'sthefanypv6@gmail.com',
      'borlothjacqueline@gmail.com',
      'mellinaazevedo22@hotmail.com',
      'joelguilherme2@gmail.com',
      'keltonkms@hotmail.com',
      'idalianes@hotmail.com',
      'renzo_zerman@hotmail.com',
      'favorellioliveira@gmail.com',
      'paulafs10@yahoo.com.br'
    ]

    // Verificar se o email do usuário está na lista
    if (emails.indexOf(user.user_email) !== -1) {
      // Atribuir o valor correspondente de companyId
      user.companyId = '2573'
    } else {
      user.companyId = ''
    }

    // funcionario
    const funcionarioExists = await apiPratiqueFunciona.funcionarios.findMany({
      where: {
        email: email
      }
    })

    const professor = user.professor
    const curriculo = user.curriculo
    const cpf = user.cpf
    const estado = user.estado
    const cidade = user.cidade
    const telefone = user.telefone

    user.isEmployee = funcionarioExists.length ? 1 : 0
    user.cargo = funcionarioExists.length ? funcionarioExists[0].cargo : 0
    user.cpf = funcionarioExists.length ? funcionarioExists[0].cpf : 0
    user.idUnid = funcionarioExists.length ? funcionarioExists[0].unidade : 0
    user.curriculo = curriculo
    user.professor = professor
    user.cpf = cpf
    user.cidade = cidade
    user.estado = estado
    user.telefone = telefone

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
      user.telefone = user.telefone ?? null
      user.isAffiliate
      //user.cpf = null
    }
    console.log('Valor de user.plano:', user.plano)

    // Verificação do termo "PERSONAL" no plano
    // if (user.plano?.includes('PERSONAL')) {
    //   user.isAffiliate = 1
    //}
  }

  res.status(200).json(utils.clearDatabaseResult([user]))
}
