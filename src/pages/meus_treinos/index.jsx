import {
  Button,
  Col,
  Collapse,
  Row,
  Typography,
  Modal,
  Form,
  Input,
  Space,
  Flex,
  Drawer,
  Divider,
  List,
  Empty
} from 'antd'
import Loading from '@/components/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {setLoading} from '@/redux/slices/exercicios'
import {ExerciseAutocompleteInput, ExerciseChoiceInput} from 'src/components/Exercicios/ExerciseAutocompleteInput'
import {apiPratiquePro} from "@/services";
import {Panel} from "@/components";
import utils from "@/utils";
import {CheckOutlined, ProfileFilled, MinusOutlined, PlusOutlined} from '@ant-design/icons';
const { Text } = Typography;
import {formatISO} from 'date-fns';
import TreinoLayout from "@/pages/treino/_Layout";
import {getMeusTreinos} from "@/redux/actions/exercicios";
import {format} from "date-fns";
import ptBR from 'date-fns/locale/pt-BR';
import {useRouter} from "next/router";

export default function MeusTreinosView() {
  const dispatch = useDispatch();
  const { treinoLivre, loading } = useSelector(state => state.exercicios);
  const router = useRouter();

  console.log(router);


  useEffect(() => {
    dispatch(getMeusTreinos(router.query.id))
  }, []);

  console.log(treinoLivre);

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {typeof treinoLivre.meus_treinos !== 'undefined' && treinoLivre.meus_treinos.length ? (
          <>
            <Collapse className="collapse-treino">
              {!loading
                ? treinoLivre.meus_treinos.map((treino, key) => {
                    return (
                      <Panel header={treino.nome_treino} key={key}>
                        {/*treino.observacao && (
                          <p className="pb-2">
                            <b>Observações:</b> {treino.observacao}
                          </p>
                        )*/}
                        <Collapse className="collapse-treino">
                          {treinoLivre.exercises.map((video, key) => {
                            return (
                              <Panel header={video.exercicio_nome} key={key}>
                                <p>
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
