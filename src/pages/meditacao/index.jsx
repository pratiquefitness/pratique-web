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
            <Col span={10}>
              <img src={meditacao.modalidademeditacao_capa} width={'100%'} />
            </Col>
            <Col span={14}>
              <Title className='mb-2' level={4}>{meditacao.modalidademeditacao_nome}</Title>
              <Paragraph className='mb-2'>{meditacao.modalidademeditacao_descricao}</Paragraph>
              <Link href={`/meditacao/${meditacao.modalidademeditacao_id}`}>
                <Button className='px-5 py-1 h-100 text-capitalize' type='primary'>Ver</Button>
              </Link>
            </Col>
            {/* <Col span={4}>
            </Col> */}
          </Row>
        ))}
      </div>
    </Loading>
  )
}
