import { Button, Col, Row, Spin, Statistic, Tabs, Tag, theme } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { LuAirplay, LuClipboardCheck, LuClock, LuUser } from 'react-icons/lu'
import InfoBox from './_InfoBox'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getTreino } from '@/redux/actions/treino'
import utils from '@/utils'
import { FaWhatsapp } from 'react-icons/fa'
import { BsFire } from 'react-icons/bs'
import TreinoLayout from './_Layout'
import { Collapse, Panel } from '@/components'
import YouTubeVideo from 'react-youtube'

export default function MeuTreinoView() {
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.treino)
  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        <Row gutter={8}>
          <Col span={24} className="mb-2">
            <a
              href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20Professor%20,%20estou%20vindo%20da%20pagina%20de%20treino%20do%20Aplicativo"
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
            <InfoBox icon={<BsFire />} title="10 A 12 REPETIÇÒES" />
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
                const playerRef = []
                return (
                  <Panel header={treino.nome} key={key}>
                    <Collapse
                      className="collapse-treino"
                      onChange={actives => {
                        playerRef.map((player, key) => {
                          if (!actives.includes(key)) {
                            player[key].pauseVideo()
                          }
                        })
                      }}
                    >
                      {treino.videos.map((video, key) => (
                        <Panel header={video.exercicio_nome} key={key}>
                          <p>
                            <YouTubeVideo
                              videoId={utils.getIdFromYouTubeUrl(video.exercicio_url)}
                              onReady={e => playerRef.push({ [key]: e.target })}
                              opts={{
                                width: '100%',
                                height: '200px',
                                playerVars: {}
                              }}
                            />
                            {/* <iframe
                              width="100%"
                              height="200px"
                              src={`${utils.convertToEmbedUrl(
                                video.exercicio_url
                              )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen=""
                            ></iframe> */}
                            {video.exercicio_descricao}
                          </p>
                        </Panel>
                      ))}
                    </Collapse>
                  </Panel>
                )
              })
            : null}
        </Collapse>
      </Loading>
    </TreinoLayout>
  )
}
