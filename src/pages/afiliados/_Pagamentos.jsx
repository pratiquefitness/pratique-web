import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPix, getPixPayments } from '@/redux/actions/afiliados'
import { Table, Typography, Spin } from 'antd'
import utils from '@/utils'

const { Title } = Typography

const Pagamentos = () => {
  const dispatch = useDispatch()
  const { pix, pixLoading, pixPayments, pixPaymentsLoading } = useSelector(state => state.afiliados)

  useEffect(() => {
    dispatch(getPix())
  }, [dispatch])

  useEffect(() => {
    if (pix && pix.chave) {
      dispatch(getPixPayments())
    }
  }, [pix, dispatch])

  const columns = [
    {
      title: 'Data',
      dataIndex: 'data_hora_movimento',
      key: 'data_hora_movimento',
      render: text => <span>{utils.formatDate(text)}</span>
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: value => <span>{utils.formatCurrency(value)}</span>
    },
    {
      title: 'Conta',
      dataIndex: 'conta_corrente',
      key: 'conta_corrente'
    }
  ]

  return (
    <div>
      <Title level={4}>Pagamentos Recebidos via Pix</Title>
      {pixPaymentsLoading ? (
        <Spin />
      ) : (
        <Table dataSource={pixPayments} columns={columns} pagination={false} rowKey={'id'} />
      )}
    </div>
  )
}

export default Pagamentos
