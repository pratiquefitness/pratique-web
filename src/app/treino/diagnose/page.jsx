'use client'
import { Table, Tag } from 'antd'

const dataSource = [
  {
    key: '1',
    data: '01/01/2023',
    metodo: 'START',
    tratamento: 'CARDIOFIT'
  },
  {
    key: '2',
    data: '05/01/2023',
    metodo: 'RESIST',
    tratamento: 'CARDIOFIT'
  }
]

const columns = [
  {
    title: 'Data',
    dataIndex: 'data',
    key: 'data'
  },
  {
    title: 'Método',
    dataIndex: 'metodo',
    key: 'metodo',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: 'Tratamento',
    dataIndex: 'tratamento',
    key: 'tratamento',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    render: () => <a>Ver</a>
  }
]

export default function Page() {
  return <Table dataSource={dataSource} columns={columns} pagination={false} />
}
