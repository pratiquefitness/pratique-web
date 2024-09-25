import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDiagnose } from "@/redux/actions/diagnose";
import { Loading } from "@/components";
import { Alert, Typography } from "antd";
import { produtos } from "@/constants/diagnose";
import { FaCheck } from "react-icons/fa";

const getRespostas = (diagnose_resposta) => {
  if (diagnose_resposta) {
    const respostas = diagnose_resposta.split("|");
    return {
      estima: respostas[0].split(":")[1],
      sono: respostas[1].split(":")[1],
      ansiedade: respostas[2].split(":")[1],
      tempo: respostas[3].split(":")[1],
      stress: respostas[4].split(":")[1],
      indisposto: respostas[5].split(":")[1],
      imunidade: respostas[6].split(":")[1],
      dores: respostas[7].split(":")[1],
      quais: respostas[8].split(":")[1],
      pressao: respostas[9].split(":")[1],
      sangue: respostas[10].split(":")[1],
      importante: respostas[11].split(":")[1],
      academia: respostas[12].split(":")[1],
      vida: respostas[13].split(":")[1]
    };
  }
};

const getTratamento = (respostas) => {
  return (
    Object.keys(respostas)
      .map((valor, item) => {
        if (valor === "estima" && respostas[valor] === "sim") {
          return "Aumentar sua Auto Estima";
        }
        if (valor === "sono" && respostas[valor] === "mal") {
          return "Melhorar o seu Sono";
        }
        if (valor === "ansiedade" && respostas[valor] === "sim") {
          return "Diminuir sua Ansiedade";
        }
        if (valor === "stress" && respostas[valor] === "sim") {
          return "Diminuir seu Stress";
        }
        if (valor === "indisposto" && respostas[valor] === "sim") {
          return "Acabar com sua Indisposição";
        }
        if (valor === "imunidade" && respostas[valor] === "nao") {
          return "Aumentar sua Imunidade";
        }
        return null;
      })
      .filter((n) => n)
      .join(", ") + "."
  );
};

const getSuplementos = (respostas) => {
  // Um conjunto para armazenar os suplementos únicos
  const suplementos = new Set();

  // Adiciona os suplementos com base nas respostas
  if (respostas.estima === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.sono === "mal") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.ansiedade === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.dores === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.sangue === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.indisposto === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.stress === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.imunidade === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }
  if (respostas.pressao === "sim") {
    suplementos.add("DRY BELLY");
    suplementos.add("RETENTION");
    suplementos.add("FORCE");
  }

  // Converte o conjunto para uma lista e une os itens com "<br />"
  return Array.from(suplementos).join("<br />");
};

const initDiagnose = (data) => {
  if (data) {
    const respostas = getRespostas(data.diagnose_resposta);
    return {
      ...data,
      respostas
    };
  }
};

export default function Diagnose({ id }) {
  const [diagnose, setDiagnose] = useState({});
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.diagnose);
  const { usuario } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getDiagnose());
  }, []);

  useEffect(() => {
    setDiagnose(initDiagnose(data.find((item) => item.diagnose_id === id)));
  }, [id, data]);

  return (
    <Loading spinning={loading}>
      <div className="text-center">
        <br></br> <h5>Sua Diagnose foi preenchida com sucesso.</h5>
        <p>Em até 24 horas, voce receberá seu treino de forma customizada aqui.</p>
        <br></br>
        <br></br>
        <Typography.Title level={3}>SEU MÉTODO</Typography.Title>
        <img
          src={`https://pratiqueemcasa.com.br/pratique-em-casa/diagnose/${diagnose?.diagnose_produto}.webp`}
          style={{ filter: "invert(100%)" }}
          className="mb-4"
          height={20}
        />{" "}
        <Typography.Paragraph>{produtos[diagnose?.diagnose_produto]}</Typography.Paragraph>
        {diagnose?.diagnose_subproduto !== "nenhum" ? (
          <>
            <Typography.Title level={3}>TRATAMENTO INDICADO</Typography.Title>
            <Typography.Paragraph>{diagnose?.diagnose_subproduto}</Typography.Paragraph>
          </>
        ) : null}
        <Typography.Title level={3}>VOCÊ PRECISA</Typography.Title>
        <Alert
          type="warning"
          style={{ textTransform: "capitalize" }}
          message={`MELHORAR DORES: ${diagnose?.diagnose_dores}.`}
          className="mb-4"
          showIcon
        />
        <Typography.Paragraph>{getTratamento(diagnose?.respostas || {})}</Typography.Paragraph>
        <Typography.Title level={3}>Suplementos Indicados para Você!</Typography.Title>
        <Typography.Paragraph>
          <div
            dangerouslySetInnerHTML={{ __html: getSuplementos(diagnose?.respostas || {}) }}
          ></div>
        </Typography.Paragraph>
        <img src="/images/webp/suplementos.webp" width={"100%"} className="mt-4" />
      </div>
    </Loading>
  );
}
