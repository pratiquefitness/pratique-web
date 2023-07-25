import Loading from '@/components/Loading'
import { getCursos } from '@/redux/actions/unipower'
import { Button, Col, Collapse, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Title, Paragraph } = Typography

export default function Unipower() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.unipower)

  useEffect(() => {
    //dispatch(getCursos())
  }, [])

  return (
    <Loading spinning={loading}>
      <div className="p-1">
        {data.map((curso, key) => (
          <Row gutter={[16, 16]} key={key} className="pb-4" align="middle">
            <Col span={8}>
              <img src={curso.post_image} width={'100%'} />
            </Col>
            <Col span={12}>
              <Title level={3}>{curso.post_title}</Title>
              <Paragraph>{curso.post_content}</Paragraph>
            </Col>
            <Col span={4}>
              <a href={curso.guid}>
                <Button type="primary">Ver</Button>
              </a>
            </Col>
          </Row>
        ))}
      </div>
    </Loading>
  )
}
