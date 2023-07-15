import Loading from '@/components/Loading'
import { getCis } from '@/redux/actions/cis'
import { Button, Card, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { LuMegaphone } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const ButtonCI = (
  <Button type="primary" shape="round" size="small" block>
    Ir para C.I
  </Button>
)

export default function CanalEquipe() {
  const disptach = useDispatch()
  const { data, loading } = useSelector(state => state.cis)

  useEffect(() => {
    disptach(getCis())
  }, [])

  return (
    <Loading spinning={loading}>
      <Space direction="vertical" size={16} className="w-100">
        {data.length ? (
          data.map(ci => (
            <Card
              title={ci.post_title}
              extra={
                <a href={ci.guid} target="_blank">
                  {ButtonCI}
                </a>
              }
            >
              <p>{ci.post_excerpt ? ci.post_excerpt : 'Sem descrição'}</p>
            </Card>
          ))
        ) : (
          <div className="text-center">
            <Typography.Title level={3}>Nenhuma C.I</Typography.Title>
          </div>
        )}
        <Button type="primary" disabled={!!data.length} block>
          Ponto Digital
        </Button>
        <Button icon={<LuMegaphone />} block>
          Fale com o Papai
        </Button>
      </Space>
    </Loading>
  )
}
