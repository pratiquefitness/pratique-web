import {Modal, Typography} from 'antd'
import Loading from '@/components/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import FormTreino from '@/components/Exercicios/TreinoLivre/FormTreino'
import {formatISO} from 'date-fns';
import TreinoLayout from "@/pages/treino/_Layout";
import {getTreinoLivre, saveTreinoLivre} from "@/redux/actions/exercicios";
import TreinosLivresSalvos from "@/components/Exercicios/TreinoLivre/TreinosLivresSalvos";
import Exercicios from "@/components/Exercicios/TreinoLivre/Exercicios";
import VerTreinoEscolhido from "@/components/Exercicios/TreinoLivre/VerMeuTreino";
const {Text} = Typography;

export default function ExerciciosView() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.exercicios)
  const {usuario} = useSelector(state => state.login)
  const {treinoLivre} = useSelector(state => state.exercicios)
  const [nomeTreino, setNomeTreino] = useState('');
  const [openModal, setOpenModal] = useState({
    open: false
  });
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [verMeusTreinos, setVerMeusTreinos] = useState(false);
  const [treino, setTreino] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    dispatch(getTreinoLivre(usuario.ID))
  }, []);

  useEffect(() => {
    setDisabledButton((nomeTreino.length < 1 || nomeTreino.length > 20));
  }, [nomeTreino]);

  const showModal = () => {
    setNomeTreino('');
    setOpenModal(prevState => ({
      open: true
    }));
  };

  const handleCancel = () => {
    setNomeTreino('');
    setOpenModal(prevState => ({
      open: false
    }));
  };

  const handleForm = () => {
    onSaveTreino();
    setOpenModal(prevState => ({
      open: false
    }));
  };

  const onSaveTreino = () => {
    dispatch(saveTreinoLivre({
      id_user: usuario.ID,
      nome_treino: nomeTreino,
      data_criacao: formatISO(new Date()),
      exercicios: selectedExercises
    }));
  }

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {
          !verMeusTreinos ?
            <>
              <div className="mt-4 text-center">
                <Text>
                  Biblioteca de exercícios com <Text strong>VÍDEOS</Text>
                </Text>
              </div>
              <div className="text-center">
                <Text>
                  demonstrativos. Tenha uma boa pesquisa
                </Text>
              </div>
              <div className="text-center">
                <Text>
                   e monte seu treino! 💪
                </Text>
              </div>
              <br />
              <Exercicios
                treinoLivre={treinoLivre}
                showModal={showModal}
                selected={(value) => {
                  setSelectedExercises(value)
                }}
              />
              <br/><br/>
              <Modal
                open={openModal.open}
                title={'Crie o seu Treino'}
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
                  treinoPersonal={false}
                />
              </Modal>
              <TreinosLivresSalvos
                verMeusTreinos={(value, ver) => {
                  setTreino(value);
                  setVerMeusTreinos(ver)
                }}
                treinoLivre={treinoLivre}
              />
            </>
          :
            <VerTreinoEscolhido
              treino={treino}
              verMeusTreinos={(ver) => {
                setVerMeusTreinos(ver)
              }}
            />
        }
      </Loading>
    </TreinoLayout>
  )
}
