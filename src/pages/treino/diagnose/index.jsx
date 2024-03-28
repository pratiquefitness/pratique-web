import Loading from '@/components/Loading'
import { getDiagnose, getPerguntasDiagnose } from '@/redux/actions/diagnose'
import { Button, Table, Tag } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TreinoLayout from '../_Layout'
import Link from 'next/link'
import Diagnose from './Cards'
import { format } from 'date-fns'
import React, { useState } from 'react'

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
  const [showDiagnose, setShowDiagnose] = useState(false)

  useEffect(() => {
    dispatch(getDiagnose())
  }, [])

  const handleNewDiagnose = () => {
    setShowDiagnose(true)
  }

  const closeDiagnose = () => {
    setShowDiagnose(false)
  }

  return (
    <TreinoLayout>
      {showDiagnose ? (
        <Diagnose onClose={closeDiagnose} />
      ) : (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <Button type="primary" size="large" onClick={handleNewDiagnose}>
            Realizar Nova Diagnose
          </Button>
        </div>
      )}
      {!showDiagnose && (
        <Loading spinning={loading}>
          <Table dataSource={data} columns={columns} pagination={false} />
        </Loading>
      )}
    </TreinoLayout>
  )
}
