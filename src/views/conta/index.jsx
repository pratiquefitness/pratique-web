import { Tabs } from 'antd'
import Dados from './Dados'

const items = [
  {
    key: 'dados',
    label: `Dados`,
    children: <Dados />
  },
  {
    key: 'plano',
    label: `Plano`,
    children: `Content of Tab Pane 2`
  }
]

export default function ContaView() {
  return <Tabs defaultActiveKey="1" items={items} />
}
