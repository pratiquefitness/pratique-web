import Loading from '@/components/Loading'
import { Button, Card, Space } from 'antd'
import { LuMegaphone } from 'react-icons/lu'

const ButtonCI = (
  <Button type="primary" shape="round" size="small" block>
    Ir para C.I
  </Button>
)

export default function CanalEquipeView() {
  return (
    <Loading spinning={false}>
      <Space direction="vertical" size={16} className="w-100">
        <Card title="Nova C.1" extra={ButtonCI}>
          <p>C.I content</p>
        </Card>
        <Card title="Nova C.1" extra={ButtonCI}>
          <p>C.I content</p>
        </Card>
        <Button type="primary" block>
          Ponto Digital
        </Button>
        <Button icon={<LuMegaphone />} block>
          Fale com o Papai
        </Button>
      </Space>
    </Loading>
  )
}
