import {Modal} from 'antd'
import Loading from '@/components/Loading'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect, useState} from 'react'
import FormTreino from '@/components/Exercicios/TreinoLivre/FormTreino'
import {formatISO} from 'date-fns';
import TreinoLayout from "@/pages/treino/_Layout";
import {getTreinoLivre, saveTreinoLivre} from "@/redux/actions/exercicios";
import MeuTreinoLista from "@/components/Exercicios/TreinoLivre/MeuTreinoLista";
import Exercicios from "@/components/Exercicios/TreinoLivre/Exercicios";
import VerTreinoEscolhido from "@/components/Exercicios/TreinoLivre/VerMeuTreino";

export default function ExerciciosView() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state => state.exercicios)
  const {usuario} = useSelector(state => state.login)
  const {treinoLivre} = useSelector(state => state.exercicios)
  const [nomeTreino, setNomeTreino] = useState('');
  const [openModal, setOpenModal] = useState({
    open: false
  });
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [verMeusTreinos, setVerMeusTreinos] = useState(false);
  const [treino, setTreino] = useState({});

  useEffect(() => {
    dispatch(getTreinoLivre(usuario.ID))
  }, [])

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
      videos: selectedVideos.toString()
    }));
  }

  console.log(treinoLivre)
  console.log(treino)

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {
          !verMeusTreinos ?
            <>
              <Exercicios
                treinoLivre={treinoLivre}
                showModal={showModal}
                selectedVideos={(value) => {
                  setSelectedVideos(value)
                }}
              />
              <br/><br/>
              <Modal
                open={openModal.open}
                title={'Crie o seu Treino Livre'}
                okButtonProps={{disabled: (nomeTreino.length < 1 || nomeTreino.length > 10)}}
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
              <MeuTreinoLista
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
              exercicios={treinoLivre}
              verMeusTreinos={(ver) => {
                setVerMeusTreinos(ver)
              }}
            />
        }
      </Loading>
    </TreinoLayout>
  )
}
