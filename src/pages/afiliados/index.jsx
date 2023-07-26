import { Button, Tabs } from 'antd'
import Geral from './_Geral'
import Comissao from './_Comissao'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getDadosAfiliado } from '@/redux/actions/afiliados'
import Produtos from './_Produtos'

const items = [
  {
    key: 'geral',
    label: `Geral`,
    children: <Geral />
  },
  {
    key: 'comissao',
    label: `Comissão`,
    children: <Comissao />
  },
  {
    key: 'produtos',
    label: `Produtos`,
    children: <Produtos />
  }
]

export default function Afiliados() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDadosAfiliado())
  }, [])
  return <Tabs defaultActiveKey="0" items={items} />
}
