import { Col, Collapse, Row, Spin, Statistic, Tabs, Tag, theme } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuAirplay } from 'react-icons/lu'
import InfoBox from '../components/InfoBox'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTreino } from '@/redux/actions/treino'

const { Panel } = Collapse

function convertToEmbedUrl(url) {
  const videoId = url.split('/').pop()
  return `https://www.youtube.com/embed/${videoId}`
}

const text = (
  <>
    <iframe
      width="100%"
      height="200px"
      src="https://www.youtube.com/embed/tGot7JpGg7M?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen=""
    ></iframe>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.
  </>
)

const treinoA = (
  <Collapse className="collapse-treino">
    <Panel header="LEG PRESS 45 - AVA" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="MESA FLEXORA BILATERAL - INT" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="PANTURRILHA MAQUINA SENTADO (BANCO SOLEO) - INT" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
)

export default function MeuTreinoView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.treino)
  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  return (
    <Loading spinning={loading}>
      <Row gutter={8}>
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
                              src={`${convertToEmbedUrl(
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
                31 MAI 2023
              </Tag>
              <ArrowRightOutlined />
              <Tag color={token.colorPrimary} style={{ fontSize: 10 }} className="m-0">
                08 JUN 2023
              </Tag>
            </Row>
          )
        }}
      />
    </Loading>
  )
}
