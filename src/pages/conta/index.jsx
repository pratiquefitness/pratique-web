import { Tabs } from 'antd';
import Dados from './_Dados';
import Plano from './_Plano';
import AlunosPersonal from './_AlunosPersonal';
import TreinosAluno from './_TreinosAluno';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAlunosPersonal } from '@/redux/actions/conta';

export default function Conta() {
  const dispatch = useDispatch();
  const { usuario } = useSelector(state => state.login);

  useEffect(() => {
    dispatch(getAlunosPersonal());
  }, []);

  const items = [
    {
      key: 'dados',
      label: `Dados`,
      children: <Dados />
    },
    {
      key: 'plano',
      label: `Plano`,
      children: <Plano />
    },
    {
      key: usuario.professor === 1 ? 'alunos' : '',
      label: usuario.professor === 1 ? `Alunos` : '',
      children: usuario.professor === 1 ? <AlunosPersonal /> : ''
    },
    {
      key: usuario.professor === 1 ? 'treinoAlunos' : '',
      label: usuario.professor === 1 ? `Criar treinos` : '',
      children: usuario.professor === 1 ? <TreinosAluno /> : ''
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />
}
