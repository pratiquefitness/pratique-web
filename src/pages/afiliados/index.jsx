import { Button, Tabs } from 'antd'

const items = [
  {
    key: 'geral',
    label: `Geral`,
    children: `Content of Tab Pane 2`
  },
  {
    key: 'comissao',
    label: `Comissão`,
    children: `Content of Tab Pane 2`
  },
  {
    key: 'pagamentos',
    label: `Pagamentos`,
    children: `Content of Tab Pane 3`
  },
  {
    key: 'produtos',
    label: `Produtos`,
    children: `Content of Tab Pane 4`
  }
]

export default function Afiliados() {
  return (
    // <Tabs defaultActiveKey="1" items={items} />
    <Button block>Acesse o painel antigo</Button>
  )
}
