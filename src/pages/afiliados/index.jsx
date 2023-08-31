import { Tabs } from 'antd'
import Geral from './_Geral'
import Comissao from './_Comissao'
import Produtos from './_Produtos'
import PlanosAcademia from './_PlanosAcademia'

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
  },
  {
    key: 'planos',
    label: `Planos Academia`,
    children: <PlanosAcademia />
  }
]

export default function Afiliados() {
  return <Tabs defaultActiveKey="0" items={items} />
}
