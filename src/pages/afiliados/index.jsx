import { Tabs } from 'antd'
import Geral from './_Geral'
import Comissao from './_Comissao'
import Produtos from './_Produtos'
import PlanosAcademia from './_PlanosAcademia'
import JumperFit from './_JumperFit'

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
    key: 'planos',
    label: `Planos`,
    children: <PlanosAcademia />
  },
  {
    key: 'jumperfit',
    label: `Jumper Fit`,
    children: <JumperFit />
  }
]

export default function Afiliados() {
  return <Tabs defaultActiveKey="0" items={items} />
}
