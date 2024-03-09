import {
  Button, Checkbox,
  Collapse, Divider,
  Empty, Flex, Modal, Typography
} from 'antd'
import Loading from '@/components/Loading'
import {Panel} from "@/components";
import utils from "@/utils";
import {useSelector} from "react-redux";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {useDispatch} from "react-redux";
import {getMeusTreinos, getTreinoLivre, updateTreinoLivre} from "@/redux/actions/exercicios";
import FormTreino from "@/components/Exercicios/TreinoLivre/FormTreino";
import exercicios from "@/components/Exercicios/TreinoLivre/Exercicios";
import TreinoLayout from "@/pages/treino/_Layout";
const {Title} = Typography;

export default function EditarMeusTreinos() {
  const {loading} = useSelector(state => state.exercicios);
  const {usuario} = useSelector(state => state.login)
  const {treinoLivre} = useSelector(state => state.exercicios);
  const [treinoVideo, setTreinoVideo] = useState([]);
  const [listarVideos, setListarVideos] = useState([]);
  const [meuTreino, setMeuTreino] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const [nomeTreino, setNomeTreino] = useState(meuTreino.nome_treino);
  const [openModal, setOpenModal] = useState(meuTreino.nome_treino);
  const [fichaId, setFichaId] = useState(0);

  useEffect(() => {
    dispatch(getTreinoLivre(parseInt(usuario.ID)))
  }, []);

  const genExtra = (video) => (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <span style={{color: '#fff'}}> {video.exercicio_nome}</span>
        <Checkbox
          defaultChecked={checked}
          value={video.exercicio_id}
          onChange={(e) => onChangeCheckbox(e, video)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Flex>
    </>
  );

  const onChangeCheckbox = (e, video) => {
    setChecked(false);
    let selectedVideo = e.target.checked ? [...treinoVideo, String(video.exercicio_id)] : treinoVideo;

    selectedVideo = !e.target.checked ?
      treinoVideo.filter(treino => treino !== String(video.exercicio_id)) :
      [...new Set(selectedVideo)];

    setTreinoVideo(selectedVideo);
  }

  useEffect(() => {
    if(Object.keys(treinoLivre).length) {
      const meuTreino = treinoLivre.meus_treinos.find((treino) => treino.id_ficha === parseInt(router.query.index));
      const meusVideos = meuTreino.videos.split(',');
      const listarVideos = treinoLivre.exercises.filter(lista => meusVideos.includes(String(lista.exercicio_id)));
      setListarVideos(listarVideos);
      setMeuTreino(meuTreino);
      setTreinoVideo(meusVideos);
      setFichaId(meuTreino.id_ficha)
    }
  }, [treinoLivre]);

  const showModal = () => {
    setOpenModal(true);
  };

  const onSaveTreino = () => {
    dispatch(updateTreinoLivre({
      id_user: usuario.ID,
      id_ficha: fichaId,
      nome_treino: nomeTreino,
      videos: treinoVideo.toString()
    }));
  }

  const handleForm = () => {
    onSaveTreino();
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  console.log(meuTreino)
  console.log(listarVideos)
  console.log(treinoVideo)

  return (
    <>
      <TreinoLayout>
        <Loading spinning={loading}>
          {
            typeof meuTreino !== 'undefined' && Object.keys(meuTreino).length > 0 ? (
                <>
                  <Divider orientation="center"><Title level={3}>Meu Treino Livre</Title></Divider>
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
                        <Panel
                          header={
                            <Flex justify={'space-between'} align={'center'}>
                              <span style={{color: '#fff'}}> {meuTreino.nome_treino}</span>
                            </Flex>}
                          key={0}
                        >
                          <Collapse className="collapse-treino">
                            {listarVideos.map((video, key) => {
                              return (
                                <Panel
                                  style={{backgroundColor: 'rgb(237, 20, 61)'}}
                                  header={genExtra(video)}
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
                  <exercicios
                    treinoLivre={treinoLivre}
                    showModal={showModal}
                    selectedVideos={(value) => {
                      setTreinoVideo([...new Set([...treinoVideo, ...value])])
                    }}
                    showSaveButton={false}
                  />
                  <Modal
                    open={openModal}
                    title={'Edite o nome do seu Treino'}
                    okButtonProps={{disabled: (nomeTreino?.length < 1 || nomeTreino?.length > 10)}}
                    onOk={handleForm}
                    onCancel={handleCancel}
                  >
                    <FormTreino
                      onSetNomeTreino={(value) => {
                        setNomeTreino(value)
                      }}
                      nome={nomeTreino}
                    />
                  </Modal>
                  <br/><br/>
                  <Flex justify={'center'} align={'flex-start'}>
                    <Button
                      style={{background: '#018000', color: 'white'}}
                      onClick={() => {
                        showModal()
                      }}
                    >
                      EDITAR TREINO
                    </Button>
                  </Flex>
                  <br/><br/>
                </>
              )
              :
              <Empty className="my-8"/>
          }
        </Loading>
      </TreinoLayout>
    </>
  )
}
