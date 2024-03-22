import {Col, Empty, Row, Typography} from 'antd'
import { LuClipboardCheck, LuClock, LuUser } from 'react-icons/lu'
import InfoBox from './_InfoBox'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
import utils from '@/utils'
import { BsFire } from 'react-icons/bs'
import TreinoLayout from './_Layout'
import { Collapse, Panel } from '@/components'
import { useRouter } from 'next/router'
import {getTreinos} from "@/redux/actions/powerflixTreinos";
const {Text} = Typography

export default function MeuTreinoView() {
  const dispatch = useDispatch();
  const { treino, loading, } = useSelector(state => state.powerflixTreinos);
  const router = useRouter();
  const [activeKey, setActiveKey] = useState({
    actived: []
  });
  const [infoBox, setInfoBox] = useState({
    treino: '',
    serie: '',
    repeticoes: '',
    recuperacao: ''
  });
  
  const onChangeCarga = (exercicios) => {
    setInfoBox(prevState => ({
      ...prevState,
      treino: exercicios.nome,
      serie: exercicios.serie,
      repeticao: exercicios.repeticao,
      recuperacao: exercicios.recuperacao,
    }));
  }
  
  const handleClick = (key) => {
    setActiveKey(prevState => ({
      actived: key
    }));
  }
  
  useEffect(() => {
    dispatch(getTreinos(router.query))
  }, []);
  
  const genExtra = (nome, exercicios) => (
    <>
      <Row
        onClick={(event) => {
        onChangeCarga(exercicios)
      }}>
        <Col span={30}>
          <Text>
            <span style={{color: '#fff'}}> {nome} </span>
          </Text>
        </Col>
      </Row>
    </>
  );

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {typeof treino !== 'undefined' && Object.keys(treino).length ? (
          <>
            <Row gutter={8}>
              <Col span={12}>
                <InfoBox
                  icon={<LuUser className="text-xlarge" />}
                  title={!activeKey.actived.length ? '' : infoBox?.treino}
                />
              </Col>
              <Col span={12}>
                <InfoBox
                  icon={<LuClipboardCheck className="text-xlarge" />}
                  title={!activeKey.actived.length ? '' : `${infoBox?.serie} SÉRIES`}
                />
              </Col>
              <Col span={12}>
                <InfoBox
                  icon={<BsFire className="text-xlarge" />}
                  title={!activeKey.actived.length ? '' : `${infoBox?.repeticao} REPETIÇÕES`}
                />
              </Col>
              <Col span={12}>
                <InfoBox
                  icon={<LuClock className="text-xlarge" />}
                  title={!activeKey.actived.length ? '' : `RECUPERAÇÃO ${infoBox?.recuperacao}`}
                />
              </Col>
            </Row>
            <Collapse
              className="collapse-treino"
              accordion
              onChange={handleClick}
              activeKey={activeKey.actived}
            >
              {!loading
                ? treino.treino.map((t, key) => {
                    return (
                      <Panel header={genExtra(t.nome, t)} key={key}>
                        <Collapse className="collapse-treino" accordion>
                          {t.exercicios.map((video, key) => {
                            return (
                              <Panel header={video.exercicio_nome} key={key}>
                                <p>
                                  <iframe
                                    width="100%"
                                    height="200px"
                                    src={`${utils.convertToYouTubeEmbedUrl(
                                      video.exercicio_url
                                    )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullscreen=""
                                  ></iframe>
                                  {utils.utf8Decode(video.exercicio_descricao)}
                                </p>
                              </Panel>
                            )
                          })}
                        </Collapse>
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
