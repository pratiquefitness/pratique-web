import Loading from '@/components/Loading'
import { getDiagnose } from '@/redux/actions/diagnose'
import { Table, Tag } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    dataIndex: 'diagnose_data',
    key: 'diagnose_data'
  },
  {
    title: 'Método',
    dataIndex: 'diagnose_produto',
    key: 'diagnose_produto',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: 'Tratamento',
    dataIndex: 'diagnose_subproduto',
    key: 'diagnose_subproduto',
    render: text => <Tag>{text}</Tag>
  },
  {
    title: '',
    dataIndex: 'acoes',
    key: 'acoes',
    render: () => <a>Ver</a>
  }
]

export default function DiagnoseView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.diagnose)

  useEffect(() => {
    dispatch(getDiagnose())
  }, [])

  return (
    <Loading spinning={loading}>
      <Table dataSource={data} columns={columns} pagination={false} />
    </Loading>
  )
}
