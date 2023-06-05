'use client'
import { Col, Collapse, Row } from 'antd'
import InfoBox from './InfoBox'
import { LuAirplay } from 'react-icons/lu'

const { Panel } = Collapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export default function Treino() {
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
      <Collapse>
        <Panel header="Treino A" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="Treino B" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="Treino C" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </>
  )
}
