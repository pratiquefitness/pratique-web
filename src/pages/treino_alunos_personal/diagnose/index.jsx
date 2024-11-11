import Loading from '@/components/Loading'
import { getDiagnose } from '@/redux/actions/diagnose'
import { Button, Table, Tag } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TreinoLayout from '../_Layout'
import Link from 'next/link'
import { format } from 'date-fns';
import { signInVerifyPersonalUser } from '@/redux/actions/conta'
import { parseCookies } from 'nookies'

const columns = [
  {
    title: 'Data',
    dataIndex: 'diagnose_data',
    key: 'diagnose_data',
    render: text => (text ? format(new Date(text), 'dd-MM-yy') : '-')
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

  const getObjectFromCookie = (ctx, key) => {
    const cookies = parseCookies(ctx)
    return cookies[key] ? JSON.parse(cookies[key]) : null
  }

  useEffect(() => {
    const alunoData = getObjectFromCookie(null, 'alunoPersonal');
    if(Object.keys(alunoData).length > 0){
      dispatch(signInVerifyPersonalUser(alunoData?.ID));
      dispatch(getDiagnose(alunoData?.email))
    }
  }, []);

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        <Table dataSource={data} columns={columns} pagination={false} />
      </Loading>
    </TreinoLayout>
  )
}
