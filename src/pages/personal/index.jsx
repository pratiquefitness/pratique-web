import { Tabs } from "antd";
import Dados from "./_Dados";
import Plano from "./_Plano";
import FAQ from "./_Faq";
import Alunos from "./_Alunos";
import Personal from "./_Personal";
import AlunosTreino from "./_AlunosTreino";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAlunosPersonal } from "@/redux/actions/conta";
import CriarTreinosAluno from "./_CriarTreinosAluno";

export default function Conta() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(getAlunosPersonal());
  }, [dispatch]);

  const items = [
    {
      key: "alunos",
      label:
        usuario.professor === 1 || usuario.plano?.includes("PERSONAL TRAINER") ? `Meus Alunos` : "",
      children:
        usuario.professor === 1 || usuario.plano?.includes("PERSONAL TRAINER") ? <Alunos /> : ""
    },
    {
      key: "faq",
      label: usuario.professor === 1 || usuario.plano?.includes("PERSONAL TRAINER") ? `FAQ` : "",
      children:
        usuario.professor === 1 || usuario.plano?.includes("PERSONAL TRAINER") ? <FAQ /> : ""
    },
    {
      key: "dados",
      label: `Dados`,
      children: <Dados />
    },
    {
      key: "plano",
      label: `Plano`,
      children: <Plano />
    }

    /* {
      key: 'treinoAlunos',
      label: usuario.professor === 1 || usuario.plano?.includes('PERSONAL TRAINER') ? `Criar treinos` : '',
      children: usuario.professor === 1 || usuario.plano?.includes('PERSONAL TRAINER') ? <CriarTreinosAluno /> : ''
    }*/
  ];

  return <Tabs defaultActiveKey="alunos" items={items} />;
}
