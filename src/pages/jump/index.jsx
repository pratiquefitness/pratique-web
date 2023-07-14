import Loading from '@/components/Loading'
import { getAulasColetivas } from '@/redux/actions/aulasColetivas'
import { getMeditacao } from '@/redux/actions/meditacao'
import { Button, Col, Collapse, Row, Tag, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Title, Paragraph } = Typography

export default function Jump() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.aulasColetivas)

  useEffect(() => {
    dispatch(getAulasColetivas(17))
  }, [])

  return (
    <Loading spinning={loading}>
      <div className="p-1">
        <Row gutter={16}>
          {data.map(
            (aula, key) =>
              aula.aula_capa.length && (
                <Col span={12} key={key}>
                  <Row>
                    <Col span={24}>
                      <Title level={3}>{aula.aula_nome}</Title>
                    </Col>
                    <Col span={24}>
                      <div style={{ width: '100%', height: 250 }}>
                        <Image src={aula.aula_capa} fill={true} />
                        <Tag style={{ position: 'absolute', top: 50, right: 0 }}>
                          {aula.aula_plano === '5' ? 'PREMIUM' : 'GRATUITO'}
                        </Tag>
                      </div>
                    </Col>
                  </Row>
                </Col>
              )
          )}
        </Row>
      </div>
    </Loading>
  )
}
