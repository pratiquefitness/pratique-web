import { useRouter } from 'next/router'
import { getAulasColetivas } from '@/redux/actions/aulasColetivas'
import { Card, Col, FloatButton, Row, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import modalidades from '@/constants/modalidades'
import Loading from '@/components/Loading'
import Image from 'next/image'
import { GiCancel } from 'react-icons/gi'
import YoutubePlayer from './_YoutubePlayer'

const { Title, Paragraph } = Typography

export default function AulasColetivas() {
  const [videoID, setVideoID] = useState('')
  const { data, loading } = useSelector(state => state.aulasColetivas)
  const dispatch = useDispatch()
  const router = useRouter()
  const { tema } = router.query

  useEffect(() => {
    dispatch(getAulasColetivas(modalidades[tema] || 14))
  }, [])

  return (
    <Loading spinning={loading}>
      <div className="p-1">
        <Row gutter={16}>
          {data.map(
            (aula, key) =>
              aula.aula_capa.length && (
                <Col span={12} key={key} className="pb-4">
                  <Card
                    title={aula.aula_nome}
                    size="small"
                    onClick={() => setVideoID(aula.aula_linkvideo)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ position: 'relative' }}>
                      <img src={aula.aula_capa} width={'100%'} />
                      <Tag
                        color={aula.aula_plano === '5' ? '#87d068' : '#2db7f5'}
                        style={{ position: 'absolute', top: 30, right: 0 }}
                      >
                        {aula.aula_plano === '5' ? 'PREMIUM' : 'GRATUITO'}
                      </Tag>
                    </div>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </div>
      {videoID && <YoutubePlayer id={videoID} onClose={() => setVideoID('')} />}
    </Loading>
  )
}
