import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDiagnose } from '@/redux/actions/diagnose'
import { Loading } from '@/components'
import { Alert, Typography } from 'antd'
import { produtos } from '@/constants/diagnose'
import { FaCheck } from 'react-icons/fa'

const getRespostas = diagnose_resposta => {
  if (diagnose_resposta) {
    const respostas = diagnose_resposta.split('|')
    return {
      estima: respostas[0].split(':')[1],
      sono: respostas[1].split(':')[1],
      ansiedade: respostas[2].split(':')[1],
      tempo: respostas[3].split(':')[1],
      stress: respostas[4].split(':')[1],
      indisposto: respostas[5].split(':')[1],
      imunidade: respostas[6].split(':')[1],
      dores: respostas[7].split(':')[1],
      quais: respostas[8].split(':')[1],
      pressao: respostas[9].split(':')[1],
      sangue: respostas[10].split(':')[1],
      importante: respostas[11].split(':')[1],
      academia: respostas[12].split(':')[1],
      vida: respostas[13].split(':')[1]
    }
  }
}

const getTratamento = respostas => {
  return (
    Object.keys(respostas)
      .map((valor, item) => {
        if (valor === 'estima' && respostas[valor] === 'sim') {
          return 'Aumentar sua Auto Estima'
        }
        if (valor === 'sono' && respostas[valor] === 'mal') {
          return 'Melhorar o seu Sono'
        }
        if (valor === 'ansiedade' && respostas[valor] === 'sim') {
          return 'Diminuir sua Ansiedade'
        }
        if (valor === 'stress' && respostas[valor] === 'sim') {
          return 'Diminuir seu Stress'
        }
        if (valor === 'indisposto' && respostas[valor] === 'sim') {
          return 'Acabar com sua Indisposição'
        }
        if (valor === 'imunidade' && respostas[valor] === 'nao') {
          return 'Aumentar sua Imunidade'
        }
        return null
      })
      .filter(n => n)
      .join(', ') + '.'
  )
}

const getSuplementos = respostas => {
  const suplementacao = []
  if (respostas.estima === 'sim') {
    suplementacao.push('estima')
  }
  if (respostas.sono === 'mal') {
    suplementacao.push('sono')
  }
  if (respostas.ansiedade === 'sim') {
    suplementacao.push('ansiedade')
  }
  if (respostas.dores === 'sim') {
    suplementacao.push('dores')
  }
  if (respostas.sangue === 'sim') {
    suplementacao.push('sangue')
  }
  if (respostas.indisposto === 'sim') {
    suplementacao.push('indisposto')
  }
  if (respostas.stress === 'sim') {
    suplementacao.push('stress')
  }
  if (respostas.imunidade === 'sim') {
    suplementacao.push('imunidade')
  }
  return suplementacao
    .map(item => {
      if (item === 'estima') {
        return 'RETENTION<br />DRY BELLY<br />MAXI PRO'
      }
      if (item === 'sono') {
        return 'SLEEP'
      }
      if (item === 'ansiedade') {
        return 'IMMUNITY+<br />SLEEP<br />PROTEIN+<br />DRY BELLY<br />RETENTION'
      }
      if (item === 'dores') {
        return 'RECOVER'
      }
      if (item === 'sangue') {
        return 'RETENTION<br />DRY BELLY<br />PROTEIN+'
      }
      if (item === 'indisposto') {
        return 'DRY BELLY<br />RETENTION'
      }
      if (item === 'stress') {
        return 'SLEEP'
      }
      if (item === 'imunidade') {
        return 'IMMUNITY+'
      }
      if (item === 'pressao') {
        return 'IMMUNITY+<br />SLEEP<br />PROTEIN+<br />DRY BELLY<br />RETENTION<br />IMMUNITY+'
      }
    })
    .filter(n => n)
    .join('<br />')
}

const initDiagnose = data => {
  if (data) {
    const respostas = getRespostas(data.diagnose_resposta)
    return {
      ...data,
      respostas
    }
  }
}

export default function Diagnose({ id }) {
  const [diagnose, setDiagnose] = useState({})
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.diagnose)
  const { usuario } = useSelector(state => state.login)

  useEffect(() => {
    dispatch(getDiagnose())
  }, [])

  useEffect(() => {
    setDiagnose(initDiagnose(data.find(item => item.diagnose_id === id)))
  }, [id, data])

  return (
    <Loading spinning={loading}>
      <div className="text-center">
        <Typography.Title level={3}>SEU MÉTODO</Typography.Title>
        <img
          src={`https://pratiqueemcasa.com.br/pratique-em-casa/diagnose/${diagnose?.diagnose_produto}.webp`}
          style={{ filter: 'invert(100%)' }}
          className="mb-4"
          height={20}
        />{' '}
        {usuario.user_email === 'pratadeu@gmail.com' ||
        usuario.user_email === 'edujobtours@hotmail.com' ||
        usuario.user_email === 'glauberpratique@hotmail.com' ? (
          <img
            src={`/images/webp/banner_home/${
              usuario.user_email === 'adelmo2@gmail.com' ? 'adelmo.jpg' : 'icone-anovator.webp'
            }`}
            className="mb-4"
            height={60}
            margingLeft={40}
          />
        ) : null}
        <Typography.Paragraph>{produtos[diagnose?.diagnose_produto]}</Typography.Paragraph>
        {diagnose?.diagnose_subproduto !== 'nenhum' ? (
          <>
            <Typography.Title level={3}>TRATAMENTO INDICADO</Typography.Title>
            <Typography.Paragraph>{diagnose?.diagnose_subproduto}</Typography.Paragraph>
          </>
        ) : null}
        <Typography.Title level={3}>VOCÊ PRECISA</Typography.Title>
        <Alert
          type="warning"
          style={{ textTransform: 'capitalize' }}
          message={`MELHORAR DORES: ${diagnose?.diagnose_dores}.`}
          className="mb-4"
          showIcon
        />
        <Typography.Paragraph>{getTratamento(diagnose?.respostas || {})}</Typography.Paragraph>
        <Typography.Title level={3}>Suplementos Indicados para Você!</Typography.Title>
        <Typography.Paragraph>
          <div dangerouslySetInnerHTML={{ __html: getSuplementos(diagnose?.respostas || {}) }}></div>
        </Typography.Paragraph>
        <img src="/images/webp/suplementos.webp" width={'100%'} className="mt-4" />
      </div>
    </Loading>
  )
}
