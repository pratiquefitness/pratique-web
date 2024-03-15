import {useEffect, useState} from "react";
import {
  Button,
  Collapse,
  Empty, Flex, Form, Input, Space
} from 'antd'
import Loading from '@/components/Loading'
import {Panel} from "@/components";
import utils from "@/utils";
import {useSelector} from "react-redux";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useDispatch} from "react-redux";
import {updateTreinoLivre} from "@/redux/actions/exercicios";
import { IoArrowUndoSharp } from "react-icons/io5";

const VerTreinoEscolhido = ({
  treino,
  verMeusTreinos = () => {},
}) => {
  const {loading, treinoLivre} = useSelector(state => state.exercicios);
  const {usuario} = useSelector(state => state.login)
  const [form] = Form.useForm();
  const [meuTreino, setMeuTreino] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    let exercicio = treinoLivre.meus_treinos.find(meuTreino => meuTreino.id_ficha === treino.id_ficha)
    let cloneObj = JSON.parse(JSON.stringify(exercicio));
    cloneObj = structuredClone(cloneObj);
    setMeuTreino(cloneObj);
  }, [treinoLivre]);

  const onVerMeusTreinos = () => {
    verMeusTreinos(false);
  }

  const genExtra = (exercicio_nome) => (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <span style={{color: '#fff'}}> {exercicio_nome}</span>
      </Flex>
    </>
  );

  const onSavePeso = (values) => {
    dispatch(updateTreinoLivre({
      id_user: usuario.ID,
      id_ficha: meuTreino.id_ficha,
      nome_treino: meuTreino.nome_treino,
      exercicios: meuTreino.exercicios
    }));
  }

  const setCargaExercicio = (allFields) => {
    allFields.map((field) => {
      if(Object.keys(meuTreino).length) {
        meuTreino.exercicios.find((exercicio) => {
          if(field.name[0] === exercicio.exercicio_id) {
            exercicio.exercicio_carga = field.value;
          }
        });
      }
    });
  }

  return (
    <Loading spinning={loading}>
      {
        typeof meuTreino !== 'undefined' && Object.keys(meuTreino).length > 0 ? (
          <>
            <Collapse
              defaultActiveKey={['0']}
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
                  <Panel header={genExtra(meuTreino.nome_treino)} key={0}>
                    <Collapse className="collapse-treino">
                      {meuTreino.exercicios.map((exercicio, key) => {
                        return (
                          <Panel
                            style={{backgroundColor: 'rgb(237, 20, 61)'}}
                            header={genExtra(exercicio.exercicio_nome)}
                            key={key}
                          >
                            <p>
                              <Form
                                layout="vertical"
                                onFinish={onSavePeso}
                                className="mb-4"
                                form={form}
                                name={exercicio.exercicio_id}
                                onFieldsChange={(_, allFields) => {
                                  setCargaExercicio(_, allFields);
                                }}
                              >
                                <Space.Compact size="small" className="w-100">
                                  <Form.Item name="id_ficha" initialValue={meuTreino.id_ficha} noStyle />
                                  <Form.Item
                                    name={exercicio.exercicio_id}
                                    noStyle
                                    defaultValue={exercicio.exercicio_carga}
                                  >
                                    <Input
                                      value={exercicio.exercicio_carga}
                                      defaultValue={exercicio.exercicio_carga}
                                      placeholder="Anote o peso do seu exercicio..."
                                    />
                                  </Form.Item>
                                  <Button type="primary" loading={loading} htmlType="submit">
                                    Salvar
                                  </Button>
                                </Space.Compact>
                              </Form>
                              <iframe
                                width="100%"
                                height="200px"
                                src={`${utils.convertToYouTubeEmbedUrl(
                                  exercicio.exercicio_url
                                )}?enablejsapi=1?rel=0&amp;modestbranding=1&amp;autohide=1&amp;showinfo=0&amp;controls=0″`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen="">
                              </iframe>
                                {utils.utf8Decode(exercicio.exercicio_descricao)}
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
                icon={<IoArrowUndoSharp />}
                style={{backgroundColor: '#756483', color: '#fff'}}
                onClick={() => {
                  onVerMeusTreinos()
                }}
              >
                TREINOS
              </Button>
            </Flex>
          </>
          )
        :
        <Empty className="my-8"/>
      }
    </Loading>
  )
}

export default VerTreinoEscolhido;
