import {Button, Col, Empty, Form, Input, Row, Space, Tag, theme, Flex } from 'antd'
import Loading from '@/components/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {getTreino, updatePeso} from '@/redux/actions/demontracao'
import { ExerciseAutocompleteInput } from 'src/components/ExerciseAutocompleteInput'

export default function DemonstracaoView() {
  const dispatch = useDispatch()
  const { data, loading, loadingPeso } = useSelector(state => state.demonstracao)
  const [filterExercises, setFilterExercises] = useState([]);

  const onSavePeso = values => {
    dispatch(updatePeso(values))
  }

  const getExercises = (value) => {
    setFilterExercises(data.exercises.filter(exercise => exercise.exercicio_nome === value))
  }

  const hasFilterExercise = (value) => {
    if(!value.length) setFilterExercises([]);
  }

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  console.log(data);

  return (
    <Loading spinning={loading}>
        {typeof data.treinos !== 'undefined' && data.treinos.length ? (
          <>
            <div className="text-center pb-4">
              <ExerciseAutocompleteInput
                options={data.exercises}
                selectedExercise={(value) => {getExercises(value)}}
                hasFilter={(value) => {hasFilterExercise(value)}}
              />
              {/*<ExerciseChoiceInput
                selectedChoice={(value) => {console.log(value)}}
                hasFilterChoice={(value) => {console.log(value)}}
              />
              <Flex wrap="wrap" gap="small">
                <Button type="primary">
                  Limpar Filtros
                </Button>
              </Flex>*/}
            </div>

            {
              /*filterExercises.length ?
                <Collapse className="collapse-treino">
                  {treino.videos.map((video, key) => {
                    return (
                      <Panel header={video.exercicio_nome} key={key}>
                        <p>
                          <Form layout="vertical" onFinish={onSavePeso} className="mb-4">
                            <Form.Item name="id" initialValue={treino.id_ficha} noStyle/>
                            <Form.Item name="video" initialValue={video.exercicio_id} noStyle/>
                            <Space.Compact size="small" className="w-100">
                              <Form.Item
                                name="peso"
                                initialValue={currentPeso?.[video.exercicio_id] || ''}
                                noStyle
                              >
                                <Input placeholder="Anote o peso do seu exercicio..."/>
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
                          {utils.utf8Decode(video.exercicio_descricao)}
                        </p>
                      </Panel>
                    )
                  })}
                </Collapse> :
                 <Empty className="my-8" />
            */}


          </>
        ) : <Empty className="my-8" />
        }

      </Loading>
  )
}
