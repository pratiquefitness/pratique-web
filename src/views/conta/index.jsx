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
  },
  {
    key: 'pagamentos',
    label: `Pagamentos`,
    children: `Content of Tab Pane 3`
  },
  {
    key: 'colaborador',
    label: `Colaborador`,
    children: `Content of Tab Pane 4`
  }
]

export default function ContaView() {
  return <Tabs defaultActiveKey="1" items={items} />
}
