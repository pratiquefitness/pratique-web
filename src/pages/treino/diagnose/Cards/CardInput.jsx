import { Button } from "antd";
import React, { useState, useEffect } from "react";
import {
  SmileOutlined,
  HistoryOutlined,
  MehOutlined,
  LinuxOutlined,
  LikeOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  DiffOutlined,
  HeartOutlined,
  LineChartOutlined
} from "@ant-design/icons";

// Mapeamento de ícones com base no `etapaAtual` (permanece o mesmo)
const iconMap = {
  1: <SmileOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  2: <HistoryOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  3: <MehOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  4: <LinuxOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  5: <LikeOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  6: <ThunderboltOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  7: <RocketOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  8: <TeamOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  9: <MedicineBoxOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  10: <DiffOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />,
  11: <HeartOutlined style={{ fontSize: "64px", color: "#00a7c9" }} />
};

const EtapaFormulario = ({ pergunta, respostas = [], onResposta, etapaAtual }) => {
  const [respostasSelecionadas, setRespostasSelecionadas] = useState([]);

  // Identificamos as perguntas de múltipla escolha com base no `etapaAtual`
  const isMultipleChoice = etapaAtual === 10 || etapaAtual === 11;

  useEffect(() => {
    // Reseta as respostas selecionadas quando o `etapaAtual` muda
    setRespostasSelecionadas([]);
  }, [etapaAtual]);

  const handleToggleOption = (opcao) => {
    setRespostasSelecionadas((prevSelected) => {
      if (prevSelected.includes(opcao)) {
        // Remove a opção se já estiver selecionada
        return prevSelected.filter((item) => item !== opcao);
      } else {
        // Adiciona a opção se não estiver selecionada
        return [...prevSelected, opcao];
      }
    });
  };

  const handleSubmit = () => {
    if (isMultipleChoice) {
      if (respostasSelecionadas.length > 0) {
        onResposta(respostasSelecionadas); // Envia todas as respostas selecionadas
      } else {
        alert("Por favor, selecione pelo menos uma opção.");
      }
    }
  };

  return (
    <div className="d-flex flex-column items-center gap-4 mt-4">
      {/* Exibe o ícone baseado no `etapaAtual` */}
      <div className="text-center">{iconMap[etapaAtual]}</div>
      <h3 className="text-center">{pergunta}</h3>

      <div className="d-flex justify-center flex-wrap gap-4">
        {/* Renderiza botões para múltipla escolha */}
        {isMultipleChoice
          ? respostas.map((opcao, index) => (
              <Button
                key={index}
                type={respostasSelecionadas.includes(opcao) ? "primary" : "default"}
                onClick={() => handleToggleOption(opcao)}
              >
                {opcao}
              </Button>
            ))
          : // Renderiza botões para perguntas de escolha única
            respostas.map((opcao, index) => (
              <Button key={index} type="primary" onClick={() => onResposta(opcao)}>
                {opcao}
              </Button>
            ))}
      </div>

      {isMultipleChoice && (
        <div className="d-flex justify-center mt-4">
          <Button type="primary" onClick={handleSubmit}>
            Confirmar
          </Button>
        </div>
      )}

      <div className="d-flex justify-center mt-2">
        <Button onClick={() => onResposta("2")}>Voltar</Button>
      </div>
    </div>
  );
};

export default EtapaFormulario;
