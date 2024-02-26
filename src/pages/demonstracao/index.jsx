import {Button, Col, Empty, Form, Input, Row, Space, Tag, theme, Flex, Collapse} from 'antd'
import Loading from '@/components/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import {updatePeso, getTreino} from '@/redux/actions/treino'
import {setLoading} from '@/redux/slices/demonstracao'
import {ExerciseAutocompleteInput, ExerciseChoiceInput} from 'src/components/ExerciseAutocompleteInput'
import {apiPratiquePro} from "@/services";
import {Panel} from "@/components";
import utils from "@/utils";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function DemonstracaoView({exercises}) {
  const dispatch = useDispatch()
  const {loading, loadingPeso} = useSelector(state => state.demonstracao)
  const {data} = useSelector(state => state.treino)
  const [filterExercises, setFilterExercises] = useState([]);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);

  useEffect(() => {
    if (exercises.length) {
      dispatch(setLoading(false))
    }
  }, [exercises]);

  useEffect(() => {
    dispatch(getTreino())
  }, [])

  const onSavePeso = values => {
    dispatch(updatePeso(values))
  }

  const hasFilterExercise = (value) => {
    if (!value.length) setFilterExercises([]);
  }

  const getExercises = (value) => {
    setFilterExercises(exercises.filter(exercise => exercise.exercicio_nome === value))
  }

  const eraseSelect = (id) => {
    setFilterExercises([]);
    if('pesquisa_exercicio' === id) {
      setResetSelect(true);
      setResetAutocomplete(false)
    }
    if('filtro_grupamento_muscular' === id) {
      setResetSelect(false);
      setResetAutocomplete(true)
    }
  }

  const getGrupamentoMuscaular = (value) => {
    setFilterExercises(
      exercises
        .filter(exercise => value.includes(exercise.exercicio_grupo))
        .sort((a, b) => {
          const exercicioA = a.exercicio_nome.toUpperCase();
          const exercicioB = b.exercicio_nome.toUpperCase();
          if (exercicioA < exercicioB) {
            return -1;
          }
          if (exercicioA > exercicioB) {
            return 1;
          }
          return 0;
        })
    )
  }

  const genExtra = (text) => (
    <span style={{color: '#fff'}}> {text}</span>
  );

  const getPesoAtribuido = (video, peso) => {
    let currentPeso
    return data.treinos.filter((treino, key) => {
      try {
        currentPeso = JSON.parse(treino.peso)
      } catch (error) {
        currentPeso = {}
      }
      if(Object.keys(currentPeso).length) {
        return (treino.exercicio_id === video.exercicio_id) && (peso === currentPeso)
      }
      return '';
    })
  }

  return (
    <Loading spinning={loading}>
      {
        exercises.length &&
          <>
            <div className="text-center pb-4">
              <ExerciseAutocompleteInput
                options={exercises}
                selectedExercise={(value) => {
                  getExercises(value)
                }}
                hasFilter={(value) => {
                  hasFilterExercise(value)
                }}
                focus={(hasFocus) => { eraseSelect(hasFocus.target.id) }}
                resetInput={resetAutocomplete}
              />
            </div>
            <div className="text-center pb-4">
              <ExerciseChoiceInput
                selectedChoice={(value) => {getGrupamentoMuscaular(value)}}
                focus={(hasFocus) => { eraseSelect(hasFocus.target.id) }}
                resetInput={resetSelect}
              />
            </div>
          </>
      }

      {
        filterExercises.length ?
          <Collapse
            className="collapse-treino"
            style={{backgroundColor: 'rgb(237, 20, 61)'}}
            expandIcon={({ isActive }) => !isActive ?
              <PlusOutlined style={{color: '#fff'}} /> :
              <MinusOutlined style={{color: '#fff'}} />
            }
          >
            {filterExercises.map((video, key) => {
              return (
                <Panel header={genExtra(video.exercicio_nome)} key={key}>
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
          </Collapse> :
          <Empty className="my-8"/>
      }
    </Loading>
  )
}

export const getServerSideProps = async ({req}) => {
  const exercises = await apiPratiquePro.exercicio.findMany();
  return {props: {exercises}}
}
