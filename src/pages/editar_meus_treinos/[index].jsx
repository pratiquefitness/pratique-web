import { Button, Checkbox, Collapse, Divider, Empty, Flex, Form, Input, Modal, Typography } from 'antd'
import Loading from '@/components/Loading'
import {Panel} from "@/components";
import utils from "@/utils";
import {useSelector} from "react-redux";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useEffect, useState, useRef} from "react";
import {useDispatch} from "react-redux";
import {getTreinoLivre, updateTreinoLivre} from "@/redux/actions/exercicios";
import FormTreino from "@/components/Exercicios/TreinoLivre/FormTreino";
import Exercicios from "@/components/Exercicios/TreinoLivre/Exercicios";
import TreinoLayout from "@/pages/treino/_Layout";
const {Title} = Typography;

export default function EditarMeusTreinos() {
  const {loading} = useSelector(state => state.exercicios);
  const {usuario} = useSelector(state => state.login)
  const {treinoLivre} = useSelector(state => state.exercicios);
  const [form] = Form.useForm();
  //const [fields, setFields] = useState([]);
  const [meuTreino, setMeuTreino] = useState({});
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exibirExercicios, setExibirExercicios] = useState(false);
  const [addExtraExercises, setAddExtraExercises] = useState([]);

  //const [meuTreino, setMeuTreino] = useState([]);
  const dispatch = useDispatch();
  const [nomeTreino, setNomeTreino] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const scollToRef = useRef();

  useEffect(() => {
    dispatch(getTreinoLivre(parseInt(usuario.ID)))
  }, []);

  useEffect(() => {
    setDisabledButton((nomeTreino?.length < 1 || nomeTreino?.length > 10));
  }, [nomeTreino]);

  useEffect(() => {
    let treino = treinoLivre.meus_treinos?.length > 0 ? JSON.parse(JSON.stringify(treinoLivre.meus_treinos[0])) : {};
    let nome = treinoLivre.meus_treinos?.length > 0 ? treinoLivre.meus_treinos[0].nome_treino : '';
    let exercicios = treinoLivre.meus_treinos?.length > 0 ? treinoLivre.meus_treinos[0].exercicios : [];
    setMeuTreino(treino);
    setNomeTreino(nome);
    setSelectedExercises(JSON.parse(JSON.stringify(exercicios)))
  }, [treinoLivre]);

  const genExtra = (video) => (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <span style={{color: '#fff'}}> {video.exercicio_nome}</span>
        <Checkbox
          defaultChecked={true}
          value={video.exercicio_id}
          onChange={(e) => addExercises(e, video)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Flex>
    </>
  );

  const addExercises = (e, video) => {
    if(e.target.checked) {
      let cloneObj = JSON.parse(JSON.stringify(meuTreino.exercicios.find(ex => ex.exercicio_id === video.exercicio_id)));
      cloneObj = structuredClone(cloneObj);
      cloneObj['exercicio_carga'] = '';
      setSelectedExercises(prevState => ([...prevState, cloneObj]));
    } else if(!e.target.checked) {
      form.setFieldsValue( { [video.exercicio_id]: '' } );
      let removeExercise = selectedExercises.filter(treino => treino.exercicio_id !== video.exercicio_id);
      setSelectedExercises(removeExercise);
    }
  }

   const setCargaExercicio = (allFields) => {
    allFields.map((field) => {
      if(selectedExercises.length) {
        selectedExercises.find((exercicio) => {
          if(field.name[0] === exercicio.exercicio_id) {
            exercicio.exercicio_carga = field.value;
          }
        });
      }
    });
  }

  const showModal = () => {
    setOpenModal(true);
  };

  const onSaveTreino = () => {
    setExibirExercicios(false);
    dispatch(updateTreinoLivre({
      id_user: usuario.ID,
      id_ficha: meuTreino.id_ficha,
      nome_treino: nomeTreino,
      exercicios: selectedExercises
    }));
  }

  const handleForm = () => {
    onSaveTreino();
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scollToRef.current.scrollIntoView({behavior:"smooth"})
    }, 500);
  }

  return (
    <>
      <TreinoLayout>
        <Loading spinning={loading}>
          {
            typeof meuTreino !== 'undefined' && Object.keys(meuTreino).length > 0 ? (
              <>
                <Divider orientation="center"><Title level={3}>Meu Treino Livre</Title></Divider>
                <Collapse
                  defaultActiveKey={['0']}
                  bordered={true}
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
                            {meuTreino.exercicios.map((video, key) => {
                              return (
                                <Panel
                                  style={{backgroundColor: 'rgb(237, 20, 61)'}}
                                    header={genExtra(video)}
                                    key={key}
                                    >
                                      <Form
                                        layout="vertical"
                                        className="mb-4"
                                        form={form}
                                        onFieldsChange={(_, allFields) => {
                                          setCargaExercicio(_, allFields);
                                        }}
                                      >
                                        <Form.Item
                                          name={video.exercicio_id}
                                          initialValue={video?.exercicio_carga || ''}
                                          label={'Carga'}
                                        >
                                          <Input
                                            disabled={!selectedExercises.find((ex) => ex.exercicio_id === video.exercicio_id)}
                                            placeholder="Anote o peso do seu exercicio..."
                                          />
                                        </Form.Item>
                                      </Form>
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
                        <Divider orientation="center"></Divider>
                        <br/>
                        <Flex justify={'center'} align={'flex-start'} vertical>
                          <Button
                            block
                            style={{background: '#018000', color: 'white'}}
                            onClick={() => {
                              showModal()
                            }}
                          >
                            SALVAR MEU TREINO
                          </Button>
                          <br/>
                          <Button
                            block
                            style={{background: 'blue', color: 'white'}}
                            onClick={() => {
                              setExibirExercicios(true);
                              scrollToBottom();
                            }}
                          >
                            EXIBIR EXERCÍCIOS
                          </Button>
                        </Flex>

                        {
                          exibirExercicios &&
                          <>
                            <br/><br/><br/><br/>
                            <Divider orientation="center"><Title level={3}>Adicionar Exercícios</Title></Divider>
                            <Exercicios
                              checked={meuTreino.exercicios}
                              treinoLivre={treinoLivre}
                              showModal={showModal}
                              selected={(value) => {
                                setAddExtraExercises(value)
                              }}
                              showSaveButton={false}
                            />
                              <br/><br/>
                              <Flex justify={'center'} align={'flex-start'}>
                                <Button
                                  style={{background: '#018000', color: 'white'}}
                                  onClick={() => {
                                    setExibirExercicios(false);
                                    setSelectedExercises(prevState => ([...prevState, ...addExtraExercises]));
                                    setMeuTreino(prevState => ({
                                      ...prevState,
                                      exercicios: [...prevState.exercicios, ...addExtraExercises]
                                    }));
                                    setAddExtraExercises([]);
                                  }}
                                >
                                  ADICIONAR SELECIONADOS AO TREINO
                                </Button>
                              </Flex>
                            </>
                        }
                        <Modal
                          open={openModal}
                          title={'Edite o nome do seu Treino'}
                          okButtonProps={{
                            disabled: disabledButton,
                            style: {
                              backgroundColor: !disabledButton ? 'green' : 'rgba(0, 0, 0, 0.04)',
                              color: !disabledButton ? '#fff' : '#000' }
                          }}
                          okText={'Salvar'}
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
                        <div ref={scollToRef} id={'scroll-bottom'}></div>
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
