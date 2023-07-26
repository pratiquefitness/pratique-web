import { Loading } from '@/components'
import { Col, Row, Statistic, theme } from 'antd'
import { useSelector } from 'react-redux'

export default function Geral() {
  const { data, loading } = useSelector(state => state.afiliados)
  const { token } = theme.useToken()
  return (
    <Loading spinning={loading}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Total de Vendas" an value={data.totalVendas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas Pagas" value={data.totalVendaspagas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas a Receber" value={data.totalReceber} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorPrimary, borderRadius: 5 }}>
            <Statistic
              title={<span style={{ color: 'white' }}>Valor a Receber</span>}
              valueStyle={{ color: 'white' }}
              value={`R$ ${data.valorReceber},00`}
            />
          </div>
        </Col>
      </Row>
    </Loading>
  )
}
