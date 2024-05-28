import { Tabs } from 'antd';
import Dados from './_Dados';
import Plano from './_Plano';
import AlunosPersonal from './_AlunosPersonal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userIsPersonal } from '@/redux/actions/conta';

export default function Conta() {
  const dispatch = useDispatch();
  const { isPersonal } = useSelector(state => state.conta);

  useEffect(() => {
    dispatch(userIsPersonal());
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
      key: isPersonal ? 'alunos' : '',
      label: isPersonal ? `Alunos` : '',
      children: isPersonal ? <AlunosPersonal /> : ''
    }
  ];

  return <Tabs defaultActiveKey="1" items={items} />
}
