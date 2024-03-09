import {useState} from "react";
import {Button, Checkbox, Flex, Typography, Collapse} from "antd";
import {Panel} from "@/components";
import {ExerciseAutocompleteInput, ExerciseChoiceInput} from '@/components/Exercicios/ExerciseAutocompleteInput';
import utils from "@/utils";
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
const {Text} = Typography;
import CustomCheckbox from "@/components/Exercicios/TreinoLivre/styles";

const exercicios = ({
  treinoLivre,
  showModal = () => {},
  selectedVideos = () => {},
  showSaveButton = true
}) => {

  const [filterExercises, setFilterExercises] = useState([]);
  const [resetAutocomplete, setResetAutocomplete] = useState(false);
  const [resetSelect, setResetSelect] = useState(false);
  const [treinoVideo, setTreinoVideo] = useState([]);

  const onChangeCheckbox = (e, video) => {
    let selectedVideo = e.target.checked ? [...treinoVideo, video.exercicio_id] : treinoVideo;

    selectedVideo = !e.target.checked ?
      treinoVideo.filter(treino => treino !== video.exercicio_id) :
      [...new Set(selectedVideo)];

    setTreinoVideo(selectedVideo);
    selectedVideos(selectedVideo);
  }

  const hasFilterExercise = (value) => {
    if (!value.length) setFilterExercises([]);
  }

  const getExercises = (value) => {
    setFilterExercises(treinoLivre.exercises.filter(exercise => exercise.exercicio_nome === value))
  }

  const eraseSelect = (id) => {
    setFilterExercises([]);
    if ('pesquisa_exercicio' === id) {
      setResetSelect(true);
      setResetAutocomplete(false)
    }
    if ('filtro_grupamento_muscular' === id) {
      setResetSelect(false);
      setResetAutocomplete(true)
    }
  }

  const getGrupamentoMuscular = (value) => {
    setFilterExercises(
      treinoLivre.exercises
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

  const genExtra = (video) => (
    <>
      <Flex justify={'space-between'} align={'center'}>
        <span style={{color: '#fff'}}> {video.exercicio_nome}</span>
        <CustomCheckbox
          style={{backgroundColor: '#018000'}}
          onChange={(e) => onChangeCheckbox(e, video)}
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Flex>
    </>
  );

  return (
    <>
      {
        treinoLivre?.exercises?.length > 0 &&
        <>
          <div className="text-center pb-4">
            <ExerciseChoiceInput
              selectedChoice={(value) => {
                getGrupamentoMuscular(value)
              }}
              focus={(hasFocus) => {
                eraseSelect(hasFocus.target.id)
              }}
              resetInput={resetSelect}
            />
          </div>
          <div className="text-center pb-4">
            <ExerciseAutocompleteInput
              options={treinoLivre.exercises}
              selectedExercise={(value) => {
                getExercises(value)
              }}
              hasFilter={(value) => {
                hasFilterExercise(value)
              }}
              focus={(hasFocus) => {
                eraseSelect(hasFocus.target.id)
              }}
              resetInput={resetAutocomplete}
            />
          </div>
        </>
      }

      {
        filterExercises.length > 0 &&
        <>
          <Collapse
            className="collapse-treino"
            style={{backgroundColor: 'rgb(237, 20, 61)'}}
            expandIcon={({isActive}) => !isActive ?
              <PlusOutlined style={{color: '#fff'}}/> :
              <MinusOutlined style={{color: '#fff'}}/>
            }
          >
            {filterExercises.map((video, key) => {
              return (
                <Panel header={genExtra(video)} key={key}>
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
                  <br/>
                </Panel>
              )
            })}
          </Collapse>
          <br/><br/>
          {
            showSaveButton &&
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
          }
        </>
      }
    </>
  );
}

export default exercicios
