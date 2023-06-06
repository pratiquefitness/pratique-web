import { Col, Collapse, Row, Statistic, Tabs, Tag, theme } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuAirplay } from 'react-icons/lu'
import InfoBox from '../components/InfoBox'

const { Panel } = Collapse

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

const treinoB = (
  <Collapse className="collapse-treino">
    <Panel header="PULLEY COSTA PRONADA ABERTA - AVA" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="REMADA ARTICULADA PRONADA ABERTA - INT" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="SUPINO BANCO 45 COM BARRA - INT" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
)

const treinoC = (
  <Collapse className="collapse-treino">
    <Panel header="SUPINO RETO COM HALTERES - INT" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="TRICEPS TESTA COM BARRA PRONADA" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="ELEVACAO LATERAL NO CROSS OVER - AVA" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>
)

const items = [
  {
    key: '1',
    label: 'Treino A',
    children: treinoA
  },
  {
    key: '2',
    label: 'Treino B',
    children: treinoB
  },
  {
    key: '3',
    label: 'Treino C',
    children: treinoC
  }
]

export default function MeuTreinoView() {
  const { token } = theme.useToken()
  return (
    <>
      <Row gutter={8}>
        <Col span={6}>
          <InfoBox icon={<LuAirplay />} title="HIPERTROFIA NÍVEL 2" />
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
        items={items}
        size="small"
        tabBarExtraContent={{
          right: (
            <Row gutter={2}>
              <Tag color={token.colorPrimary} className="m-0">
                31 MAI 2023
              </Tag>
              <ArrowRightOutlined />
              <Tag color={token.colorPrimary} className="m-0">
                08 JUN 2023
              </Tag>
            </Row>
          )
        }}
      />
    </>
  )
}
