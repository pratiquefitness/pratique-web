import Loading from '@/components/Loading'
import { getMeditacao } from '@/redux/actions/meditacao'
import { Button, Col, Collapse, Row, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Title, Paragraph } = Typography

export default function MeditacaoView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.meditacao)

  useEffect(() => {
    dispatch(getMeditacao())
  }, [])

  return (
    <Loading spinning={loading}>
      <div className="p-1">
        {data.map((meditacao, key) => (
          <Row gutter={[16, 16]} key={key} className="pb-4" align="middle">
            <Col span={8}>
              <img src={meditacao.modalidademeditacao_capa} width={'100%'} />
            </Col>
            <Col span={12}>
              <Title level={3}>{meditacao.modalidademeditacao_nome}</Title>
              <Paragraph>{meditacao.modalidademeditacao_descricao}</Paragraph>
            </Col>
            <Col span={4}>
              <Link href={`/meditacao/${meditacao.modalidademeditacao_id}`}>
                <Button type="primary">Ver</Button>
              </Link>
            </Col>
          </Row>
        ))}
      </div>
    </Loading>
  )
}
