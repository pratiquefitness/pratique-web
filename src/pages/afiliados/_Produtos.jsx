import { Loading } from '@/components'
import { Button, Table, Tabs } from 'antd'
import { useSelector } from 'react-redux'

const columns = [
  {
    title: 'Produto',
    dataIndex: 'imagem',
    key: 'produto',
    width: 100,
    render: (_, record) => <img src={record.imagem} width={'100%'} />
  },
  {
    title: 'Desc.',
    dataIndex: 'nome',
    key: 'desc',
    render: (_, record) => (
      <>
        <div>{record.nome}</div>
        <div>{record.preco}</div>
      </>
    )
  },
  {
    title: 'Link',
    dataIndex: 'nomeproduto',
    key: 'link',
    render: () => <Button type="primary">Link</Button>
  }
]

export default function Produtos() {
  const { data, loading } = useSelector(state => state.afiliados)

  const { produtos } = data

  return (
    <Loading spinning={loading}>
      <Tabs
        defaultActiveKey="0"
        items={[
          {
            key: 'bike',
            label: `Bike`,
            children: <Table dataSource={produtos.bike} columns={columns} />
          },
          {
            key: 'suplementacao',
            label: `Suplementação`,
            children: <Table dataSource={produtos.suplementacao} columns={columns} />
          },
          {
            key: 'diversos',
            label: `Diversos`,
            children: <Table dataSource={produtos.diversos} columns={columns} />
          }
        ]}
      />
    </Loading>
  )
}
