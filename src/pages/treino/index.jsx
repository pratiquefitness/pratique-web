import { Button, Col, Collapse, Row, Spin, Statistic, Tabs, Tag, theme } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuAirplay } from 'react-icons/lu'
import InfoBox from './_InfoBox'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTreino } from '@/redux/actions/treino'
import utils from '@/utils'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import TreinoLayout from './_Layout'

const { Panel } = Collapse

export default function MeuTreinoView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.treino)
  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        <Row gutter={8}>
          <Col span={24} className="mb-2">
            <a href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20Professor%20,%20estou%20vindo%20da%20pagina%20de%20treino%20do%20Aplicativo">
              <Button icon={<FaWhatsapp />} block>
                Fale com o professor
              </Button>
            </a>
          </Col>
          <Col span={6}>
            <InfoBox icon={<LuAirplay />} title={`${data.objetivo} NÍVEL ${data.nivel}`} />
          </Col>
          <Col span={6}>
            <InfoBox icon={<LuAirplay />} title="3 SÉRIES" />
          </Col>
          <Col span={6}>
            <InfoBox icon={<LuAirplay />} title="10 A 12 REPETIÇÒES" />
          </Col>
          <Col span={6}>
            <InfoBox icon={<LuAirplay />} title="RECUPERAÇÃO 1 MIN" />
          </Col>
        </Row>
        <Tabs
          defaultActiveKey="1"
          items={
            !loading
              ? data.treinos.map((treino, key) => {
                  return {
                    key,
                    label: treino.nome,
                    children: (
                      <Collapse className="collapse-treino">
                        {treino.videos.map((video, key) => (
                          <Panel header={video.exercicio_nome} key={key}>
                            <p>
                              <iframe
                                width="100%"
                                height="200px"
                                src={`${utils.convertToEmbedUrl(
                                  video.exercicio_url
                                )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen=""
                              ></iframe>
                              {video.exercicio_descricao}
                            </p>
                          </Panel>
                        ))}
                      </Collapse>
                    )
                  }
                })
              : []
          }
          size="small"
          tabBarExtraContent={{
            right: (
              <Row gutter={2}>
                <Tag color={token.colorPrimary} style={{ fontSize: 10 }} className="m-0">
                  {`${data.dia_inicio} ${utils.getMonthNames(data.mes_inicio).nameMin.toUpperCase()} ${
                    data.ano_inicio
                  }`}
                </Tag>
                <ArrowRightOutlined />
                <Tag color={token.colorPrimary} style={{ fontSize: 10 }} className="m-0">
                  {`${data.dia_final} ${utils.getMonthNames(data.mes_final).nameMin.toUpperCase()} ${data.ano_final}`}
                </Tag>
              </Row>
            )
          }}
        />
      </Loading>
    </TreinoLayout>
  )
}
