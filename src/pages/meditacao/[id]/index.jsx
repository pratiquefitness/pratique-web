import Loading from '@/components/Loading'
import { getMeditacao } from '@/redux/actions/meditacao'
import { Button, Col, Collapse, Row, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Title, Paragraph } = Typography

export default function MeditacaoView() {
  const [meditacao, setMeditacao] = useState(0)
  const dispatch = useDispatch()
  const router = useRouter()
  const { data, loading } = useSelector(state => state.meditacao)

  const { id } = router.query

  useEffect(() => {
    dispatch(getMeditacao())
  }, [])

  useEffect(() => {
    setMeditacao(data.find(item => item.modalidademeditacao_id))
  }, [router.query.id, data])

  useEffect(() => {
    console.log('med', meditacao)
  }, [meditacao])

  return (
    <Loading spinning={loading && meditacao}>
      <div className="p-1">
        <Title level={2}>{meditacao?.modalidademeditacao_nome}</Title>
        <Collapse>
          {meditacao?.aulas?.map((item, key) => (
            <Collapse.Panel header={item.meditacao_nome} key={key}>
              <Paragraph>{item.meditacao_item}</Paragraph>
              <audio controls>
                <source src={item.meditacao_audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </Loading>
  )
}
