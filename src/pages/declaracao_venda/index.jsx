import { Tabs } from 'antd'
import DeclaracaoVendaForm from './_DeclaracaoVenda'
import ResumoAprovacao from './_ResumoAprovacao'

const items = [
  {
    key: 'declaracaoVenda',
    label: `Declaracão de Venda`,
    children: <DeclaracaoVendaForm />
  },
  {
    key: 'resumoAprovacao',
    label: `Resumo e Aprovação`,
    children: <ResumoAprovacao />
  }
]

export default function DeclaracaoVenda() {
  return <Tabs defaultActiveKey="1" items={items} />
}
