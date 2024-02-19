import Loading from '@/components/Loading'
import { getDiagnose, getPerguntasDiagnose } from '@/redux/actions/diagnose'
import { Button, Table, Tag } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TreinoLayout from '../_Layout'
import Link from 'next/link'
import Diagnose from './Cards'

const columns = [
  {
    title: 'Data',
    dataIndex: 'diagnose_data',
    key: 'diagnose_data',
    render: text => (text ? text : '-')
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
    width: 60,
    render: (_, record) => (
      <Link href={`/treino/diagnose/${record.diagnose_id}`}>
        <Button type="primary" size="small">
          Visualizar
        </Button>
      </Link>
    )
  }
]

export default function DiagnoseView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.diagnose)

//   useEffect(() => {
//     //dispatch(getDiagnose())
//   }, [])

  return (
    <TreinoLayout>
      {/* <Loading spinning={loading}>
        <Table dataSource={data} columns={columns} pagination={false} />
      </Loading> */}
      <Diagnose/>
    </TreinoLayout>
  )
}
