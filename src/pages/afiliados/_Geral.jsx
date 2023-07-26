import { Loading } from '@/components'
import { getDadosAfiliado } from '@/redux/actions/afiliados'
import { Col, Row, Statistic, theme } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Geral() {
  const dispatch = useDispatch()
  const { geral, loading } = useSelector(state => state.afiliados)
  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getDadosAfiliado())
  }, [])

  return (
    <Loading spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Total de Vendas" an value={geral.totalVendas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas Pagas" value={geral.totalVendaspagas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas a Receber" value={geral.totalReceber} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorPrimary, borderRadius: 5 }}>
            <Statistic
              title={<span style={{ color: 'white' }}>Valor a Receber</span>}
              valueStyle={{ color: 'white' }}
              value={`R$ ${geral.valorReceber},00`}
            />
          </div>
        </Col>
      </Row>
    </Loading>
  )
}
