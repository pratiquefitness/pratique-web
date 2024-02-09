import React, { useEffect, useState } from 'react'
import EtapaFormulario from './CardInput'

import { Loading } from '@/components'
import { Input, Form, Select, Button, theme, InputNumber } from 'antd'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import { getPerguntasDiagnose } from '@/redux/actions/diagnose'

const FormularioPrincipal = ({ onRegisterPerguntas, listaPerguntas }) => {
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [aguardaDiagnose, setAguardaDiagnose] = useState(false)
  const [respostas, setRespostas] = useState([])
  const { token } = theme.useToken()
  const { data, loading } = useSelector(state => state.diagnose)

  const handleResposta = resposta => {
    if (resposta === '2') {
      setEtapaAtual(prevEtapaAtual => prevEtapaAtual - 1)
      return
    }
    const perguntaAtual = listaPerguntas.find(item => item.id === etapaAtual)?.pergunta
    setRespostas([...respostas, { pergunta: perguntaAtual, resposta }])
    const regraAtual = listaPerguntas.find(item => item.id === etapaAtual)?.regra
    const proximaPergunta = regraAtual ? regraAtual.find(item => Object.keys(item)[0] === resposta)?.[resposta] : null
    proximaEtapa(proximaPergunta)
  }

  const proximaEtapa = proximaPergunta => {
    setEtapaAtual(parseInt(proximaPergunta))
  }

  if (etapaAtual > listaPerguntas.length) {
    onRegisterPerguntas(respostas)
  }

  return (
    <Loading spinning={loading}>
      <div className="d-flex justify-center">
        <div className="p-4 w-95 " style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
          <div>
            {!aguardaDiagnose ? (
              etapaAtual <= listaPerguntas.length ? (
                <>
                  <div>
                    <h2>Teste sua Diagnose aqui</h2>
                  </div>
                  <EtapaFormulario
                    pergunta={listaPerguntas.find(pergunta => pergunta.id === etapaAtual)?.pergunta}
                    respostas={listaPerguntas.find(pergunta => pergunta.id === etapaAtual)?.respostas}
                    regra={listaPerguntas.find(pergunta => pergunta.id === etapaAtual)?.regra}
                    onResposta={handleResposta}
                  />
                </>
              ) : (
                <div className="d-flex flex-column gap-4">
                  <h2>Sua Diagnose foi preenchida com sucesso.</h2>

                  <p>Em até 24 horas, voce receberá seu treino de forma customizada aqui.</p>
                </div>
              )
            ) : (
              <div className="d-flex flex-column gap-4">
                <h2>Leia seu treino aqui</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Loading>
  )
}

export default FormularioPrincipal
