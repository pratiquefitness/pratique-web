import { Button, Col, Empty, Form, Input, Row, Space, Spin, Statistic, Tabs, Tag, Typography, theme } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuAirplay, LuClipboardCheck, LuClock, LuUser } from 'react-icons/lu'
import InfoBox from './_InfoBox'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTreino, updateAnotacoes, updatePeso } from '@/redux/actions/treino'
import utils from '@/utils'
import { FaWhatsapp } from 'react-icons/fa'
import { BsFire } from 'react-icons/bs'
import TreinoLayout from './_Layout'
import { Collapse, Panel } from '@/components'

export default function MeuTreinoView() {
  const dispatch = useDispatch()
  const { data, loading, loadingPeso, loadingAnotacoes } = useSelector(state => state.treino)
  const { token } = theme.useToken()

  const onSaveAnotacoes = values => {
    dispatch(updateAnotacoes(values))
  }

  const onSavePeso = values => {
    dispatch(updatePeso(values))
  }

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {typeof data.treinos !== 'undefined' && data.treinos.length ? (
          <>
            <Row gutter={8}>
              <Col span={24} className="mb-2">
                <a
                  href="https://api.whatsapp.com/send?phone=5531992118013&text=Ol%C3%A1%20Professor%20,%20estou%20vindo%20da%20pagina%20de%20treino%20do%20Aplicativo"
                  target="_blank"
                >
                  <Button icon={<FaWhatsapp fill="#25D366" />} style={{ background: '#756483', color: 'white' }} block>
                    Ajuste seu Treino
                  </Button>
                </a>
              </Col>
              <Col span={6}>
                <InfoBox icon={<LuUser />} title={`${data.objetivo} NÍVEL ${data.nivel}`} />
              </Col>
              <Col span={6}>
                <InfoBox icon={<LuClipboardCheck />} title="3 SÉRIES" />
              </Col>
              <Col span={6}>
                <InfoBox icon={<BsFire />} title="10 A 12 REPETIÇÕES" />
              </Col>
              <Col span={6}>
                <InfoBox icon={<LuClock />} title="RECUPERAÇÃO 1 MIN" />
              </Col>
            </Row>
            <div className="text-center pb-4">
              <Tag color={token.colorPrimary} style={{ fontSize: 12 }} className="m-0">
                {`${data.dia_inicio} ${utils.getMonthNames(data.mes_inicio).nameMin.toUpperCase()} ${data.ano_inicio}`}
              </Tag>
              <ArrowRightOutlined />
              <Tag color={token.colorPrimary} style={{ fontSize: 12 }} className="m-0">
                {`${data.dia_final} ${utils.getMonthNames(data.mes_final).nameMin.toUpperCase()} ${data.ano_final}`}
              </Tag>
            </div>
            <Collapse className="collapse-treino">
              {!loading
                ? data.treinos.map((treino, key) => {
                    let currentPeso
                    try {
                      currentPeso = JSON.parse(treino.peso)
                    } catch (error) {
                      currentPeso = {}
                    }
                    return (
                      <Panel header={treino.nome} key={key}>
                        {treino.observacao && (
                          <p className="pb-2">
                            <b>Observações:</b> {treino.observacao}
                          </p>
                        )}

                        <Collapse className="collapse-treino">
                          {treino.videos.map((video, key) => {
                            return (
                              <Panel header={video.exercicio_nome} key={key}>
                                <p>
                                  <Form layout="vertical" onFinish={onSavePeso} className="mb-4">
                                    <Form.Item name="id" initialValue={treino.id_ficha} noStyle />
                                    <Form.Item name="video" initialValue={video.exercicio_id} noStyle />
                                    <Space.Compact size="small" className="w-100">
                                      <Form.Item
                                        name="peso"
                                        initialValue={currentPeso?.[video.exercicio_id] || ''}
                                        noStyle
                                      >
                                        <Input placeholder="Anote o peso do seu exercicio..." />
                                      </Form.Item>
                                      <Button type="primary" loading={loadingPeso} htmlType="submit">
                                        Salvar
                                      </Button>
                                    </Space.Compact>
                                  </Form>
                                  <iframe
                                    width="100%"
                                    height="200px"
                                    src={`${utils.convertToYouTubeEmbedUrl(
                                      video.exercicio_url
                                    )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen=""
                                  ></iframe>
                                  {video.exercicio_descricao}
                                </p>
                              </Panel>
                            )
                          })}
                        </Collapse>
                        <Form layout="vertical" onFinish={onSaveAnotacoes} className="mt-4">
                          <Form.Item name="id" initialValue={treino.id_ficha} noStyle />
                          <Form.Item label="Anotações" name="anotacoes" initialValue={treino.anotacoes}>
                            <Input.TextArea rows={4} placeholder="Suas anotações" />
                          </Form.Item>
                          <Button type="primary" htmlType="submit" loading={loadingAnotacoes} block>
                            Salvar
                          </Button>
                        </Form>
                      </Panel>
                    )
                  })
                : null}
            </Collapse>
          </>
        ) : (
          <Empty className="my-8" />
        )}
      </Loading>
    </TreinoLayout>
  )
}
