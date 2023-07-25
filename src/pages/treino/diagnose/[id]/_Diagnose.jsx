import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDiagnose } from '@/redux/actions/diagnose'

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

const initDiagnose = data => {
  if (data) {
    const respostas = getRespostas(data.diagnose_resposta)
    console.log({
      ...data,
      respostas
    })
  }
}

export default function Diagnose({ id }) {
  const [diagnose, setDiagnose] = useState(0)
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.diagnose)

  useEffect(() => {
    dispatch(getDiagnose())
  }, [])

  useEffect(() => {
    setDiagnose(initDiagnose(data.find(item => item.diagnose_id === id)))
  }, [id, data])

  return <div></div>
}
