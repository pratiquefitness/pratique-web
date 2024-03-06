import {
  Button, Checkbox,
  Collapse,
  Empty, Flex
} from 'antd'
import Loading from '@/components/Loading'
import {Panel} from "@/components";
import utils from "@/utils";
import {useSelector} from "react-redux";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useState} from "react";

const EditarMeuTreino = ({
  treino,
  exercises,
  editarTreino = () => {}
}) => {
  const {loading} = useSelector(state => state.exercicios);
  const [treinoVideo, setTreinoVideo] = useState([]);
  const [checkAll, setCheckAll] = useState(true);

const genExtra = (video) => (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <span style={{color: '#fff'}}> {video.exercicio_nome}</span>
        <Checkbox
          checked={checkAll}
          onChange={(e) => onChangeCheckbox(e, video)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Flex>
    </>
  );

  console.log(treinoVideo);

  const onChangeCheckbox = (e, video) => {
    let selectedVideo = e.target.checked ? [...treinoVideo, video.exercicio_id] : treinoVideo;

    selectedVideo = !e.target.checked ?
      treinoVideo.filter(treino => treino !== video.exercicio_id) :
      [...new Set(selectedVideo)];

    setTreinoVideo(selectedVideo);
  }

  const meusVideos = treino.videos.split(',');
  const listaVideos = exercises.filter(lista => meusVideos.includes(String(lista.exercicio_id)));

  return (
    <>
      <Checkbox  onChange={() => {setCheckAll(true)}} checked={true}>
        Check all
      </Checkbox>
      <Loading spinning={loading}>
        {
          typeof treino !== 'undefined' && Object.keys(treino).length > 0 ? (
              <>
                <Collapse
                  className="collapse-treino"
                  style={{backgroundColor: 'rgb(237, 20, 61)'}}
                  expandIcon={({isActive}) => !isActive ?
                    <PlusOutlined style={{color: '#fff'}}/> :
                    <MinusOutlined style={{color: '#fff'}}/>
                  }
                >
                  {
                    !loading
                      ?
                      <Panel header={genExtra(treino.nome_treino)} key={0}>
                        <Collapse className="collapse-treino">
                          {listaVideos.map((video, key) => {
                            return (
                              <Panel
                                style={{backgroundColor: 'rgb(237, 20, 61)'}}
                                header={genExtra(video.exercicio_nome)}
                                key={key}
                              >
                                <p>
                                  <iframe
                                    width="100%"
                                    height="200px"
                                    src={`${utils.convertToYouTubeEmbedUrl(
                                      video.exercicio_url
                                    )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen=""
                                  ></iframe>
                                  {utils.utf8Decode(video.exercicio_descricao)}
                                </p>
                              </Panel>
                            )
                          })}
                        </Collapse>
                      </Panel>
                      :
                      null
                  }
                </Collapse>
                <br/><br/>
                <Flex justify={'center'} align={'flex-start'}>
                  <Button
                    style={{background: '#018000', color: 'white'}}
                    onClick={() => {
                      showModal()
                    }}
                  >
                    SALVAR TREINO
                  </Button>
                </Flex>
                <br/><br/>
                <Flex justify={'center'} align={'flex-start'}>
                  <Button
                    style={{backgroundColor: '#018000', color: '#fff'}}
                    onClick={() => {
                      editarTreino()
                    }}
                  >
                    VOLTAR PARA MEUS TREINOS
                  </Button>
                </Flex>
              </>
            )
            :
            <Empty className="my-8"/>
        }
      </Loading>
    </>
  )
}

export default EditarMeuTreino;
