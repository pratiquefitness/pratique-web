import React, { useEffect, useState } from "react";
import EtapaFormulario from "./CardInput";
import { Loading } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const FormularioPrincipal = ({ onRegisterPerguntas, listaPerguntas, idDiagnose }) => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [aguardaDiagnose, setAguardaDiagnose] = useState(false);
  const [respostas, setRespostas] = useState([]);
  const { loading } = useSelector((state) => state.diagnose);
  const router = useRouter();

  const handleResposta = (resposta) => {
    if (resposta === "2") {
      setEtapaAtual((prevEtapaAtual) => prevEtapaAtual - 1);
      return;
    }

    const perguntaAtual = listaPerguntas.find((item) => item.id === etapaAtual)?.pergunta;

    // Se for múltipla escolha, resposta será um array
    if (Array.isArray(resposta)) {
      resposta.forEach((respostaIndividual) => {
        setRespostas((prevRespostas) => [
          ...prevRespostas,
          { pergunta: perguntaAtual, resposta: respostaIndividual }
        ]);
      });
    } else {
      setRespostas((prevRespostas) => [...prevRespostas, { pergunta: perguntaAtual, resposta }]);
    }

    const regraAtual = listaPerguntas.find((item) => item.id === etapaAtual)?.regra;
    const proximaPergunta = regraAtual
      ? regraAtual.find(
          (item) => Object.keys(item)[0] === (Array.isArray(resposta) ? resposta[0] : resposta)
        )?.[Array.isArray(resposta) ? resposta[0] : resposta]
      : null;

    proximaEtapa(proximaPergunta);
  };

  const proximaEtapa = (proximaPergunta) => {
    setEtapaAtual(parseInt(proximaPergunta));
  };

  // Primeiro useEffect: Envia as respostas quando todas as perguntas foram respondidas
  useEffect(() => {
    if (etapaAtual > listaPerguntas.length) {
      onRegisterPerguntas(respostas);
      setAguardaDiagnose(true);
    }
  }, [etapaAtual]);

  // Segundo useEffect: Redireciona quando idDiagnose é atualizado
  useEffect(() => {
    if (idDiagnose) {
      console.log("Redirecionando para:", `/treino/diagnose/${idDiagnose}`);
      router.push(`/treino/diagnose/${idDiagnose}`);
    }
  }, [idDiagnose]);

  return (
    <Loading spinning={loading}>
      <div className="d-flex justify-center">
        <div className="p-4 w-95 " style={{ background: "#fff", borderRadius: 5 }}>
          <div>
            {etapaAtual <= listaPerguntas.length ? (
              <EtapaFormulario
                pergunta={listaPerguntas.find((pergunta) => pergunta.id === etapaAtual)?.pergunta}
                respostas={listaPerguntas.find((pergunta) => pergunta.id === etapaAtual)?.respostas}
                regra={listaPerguntas.find((pergunta) => pergunta.id === etapaAtual)?.regra}
                onResposta={handleResposta}
                etapaAtual={etapaAtual}
              />
            ) : (
              <div className="d-flex flex-column gap-4">
                <h2>Sua Diagnose foi preenchida com sucesso.</h2>
                {aguardaDiagnose && <p>Redirecionando para os resultados...</p>}
                {/* Feedback visual */}
              </div>
            )}
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default FormularioPrincipal;

{
  /*


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
*/
}
