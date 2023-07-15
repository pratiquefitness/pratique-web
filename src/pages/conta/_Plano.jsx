import { Card, Space } from 'antd'
import { useSelector } from 'react-redux'

export default function Plano() {
  const { usuario } = useSelector(state => state.login)
  return (
    <Space direction="vertical" className="w-100">
      <Card title="Seu plano" size="small">
        <p>{usuario.plano}</p>
      </Card>
      <Card title="Sua unidade" size="small">
        <p>{usuario.plano}</p>
      </Card>
    </Space>
  )
}
