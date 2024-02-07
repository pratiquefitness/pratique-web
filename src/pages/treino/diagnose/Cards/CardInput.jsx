import { Button } from 'antd';
import React, { useState } from 'react';

const EtapaFormulario = ({ pergunta, respostas, regra, onResposta }) => {
  const [resposta, setResposta] = useState(null);

  const handleResposta = (opcao) => {
    setResposta(opcao);
    onResposta(opcao); 
  };

  return (
    <div className="d-flex flex-column items-center gap-4 mt-4">
      <h3>{pergunta}</h3>
      <div className="d-flex justify-center gap-4">
        {respostas.map((opcao, index) => (
          <Button type="primary" key={index} onClick={() => handleResposta(opcao)}>
            {opcao}
          </Button>
        ))}
      </div>
      <div className="d-flex justify-center">
        <Button type="secondary" onClick={() => handleResposta('2')}>
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default EtapaFormulario;
