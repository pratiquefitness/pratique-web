import { getComissoesAfiliado } from '@/redux/actions/afiliados'
import { Table } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Comissao() {
  const dispatch = useDispatch()
  const { comissao, loading } = useSelector(state => state.afiliados)

  useEffect(() => {
    dispatch(getComissoesAfiliado())
  }, [])

  return (
    <Table
      dataSource={comissao}
      columns={[
        {
          title: 'Premiação',
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
