import { Tabs } from 'antd'
import Dados from './_Dados'
import Plano from './_Plano'

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
  }
]

export default function Conta() {
  return <Tabs defaultActiveKey="1" items={items} />
}
