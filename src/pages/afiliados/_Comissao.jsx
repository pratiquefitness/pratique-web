import { Table } from 'antd'
import { useSelector } from 'react-redux'

export default function Comissao() {
  const { data, loading } = useSelector(state => state.afiliados)
  return (
    <Table
      dataSource={data.comissoes}
      columns={[
        {
          title: 'Comissão',
          dataIndex: 'comissao',
          key: 'comissao'
        },
        {
          title: 'Data',
          dataIndex: 'data',
          key: 'data'
        },
        {
          title: 'Produto',
          dataIndex: 'nomeproduto',
          key: 'produto'
        },
        {
          title: 'Cliente',
          dataIndex: 'cliente',
          key: 'cliente'
        },
        {
          title: 'Pag',
          dataIndex: 'pago',
          key: 'pag'
        }
      ]}
      loading={loading}
    />
  )
}
