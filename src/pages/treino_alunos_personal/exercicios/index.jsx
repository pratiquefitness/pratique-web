import { Modal, Typography } from 'antd'
import Loading from '@/components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import FormTreino from '@/components/Exercicios/TreinoLivre/FormTreino'
import { formatISO } from 'date-fns'
import TreinoLayout from '@/pages/treino_alunos_personal/_Layout'
import { getTreinoLivre, saveTreinoLivre } from '@/redux/actions/exercicios'
import TreinosLivresSalvos from '@/components/Exercicios/TreinoLivre/TreinosLivresSalvos'
import Exercicios from '@/components/Exercicios/TreinoLivre/Exercicios'
import VerTreinoEscolhido from '@/components/Exercicios/TreinoLivre/VerMeuTreino'
import { parseCookies } from 'nookies'
const { Text } = Typography

export default function ExerciciosView() {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.exercicios)
  const { dadosAluno } = useSelector(state => state.conta)
  const { treinoLivre } = useSelector(state => state.exercicios)
  const [nomeTreino, setNomeTreino] = useState('')
  const [openModal, setOpenModal] = useState({
    open: false
  })
  const [selectedExercises, setSelectedExercises] = useState([])
  const [verMeusTreinos, setVerMeusTreinos] = useState(false)
  const [treino, setTreino] = useState({})
  const [disabledButton, setDisabledButton] = useState(true)

  const getObjectFromCookie = (ctx, key) => {
    const cookies = parseCookies(ctx)
    return cookies[key] ? JSON.parse(cookies[key]) : null
  }

  const alunoData = getObjectFromCookie(null, 'alunoPersonal');

  useEffect(() => {
    dispatch(getTreinoLivre(dadosAluno.ID || alunoData.ID))
  }, [])

  useEffect(() => {
    setDisabledButton(nomeTreino.length < 1 || nomeTreino.length > 20)
  }, [nomeTreino])

  const showModal = () => {
    setNomeTreino('')
    setOpenModal(prevState => ({
      open: true
    }))
  }

  const handleCancel = () => {
    setNomeTreino('')
    setOpenModal(prevState => ({
      open: false
    }))
  }

  const handleForm = () => {
    onSaveTreino()
    setOpenModal(prevState => ({
      open: false
    }))
  }

  const onSaveTreino = () => {
    dispatch(
      saveTreinoLivre({
        id_user: dadosAluno.ID,
        nome_treino: nomeTreino,
        data_criacao: formatISO(new Date()),
        exercicios: selectedExercises
      })
    )
  }

  return (
    <TreinoLayout>
      <Loading spinning={loading}>
        {!verMeusTreinos ? (
          <>
            <br />
            <Exercicios
              treinoLivre={treinoLivre}
              showModal={showModal}
              selected={value => {
                setSelectedExercises(value)
              }}
            />
            <br />
            <br />
            <Modal
              open={openModal.open}
              title={'Crie o seu Treino'}
              okButtonProps={{
                disabled: disabledButton,
                style: {
                  backgroundColor: !disabledButton ? 'green' : 'rgba(0, 0, 0, 0.04)',
                  color: !disabledButton ? '#fff' : '#000'
                }
              }}
              okText={'Salvar'}
              onOk={handleForm}
              onCancel={handleCancel}
            >
              <FormTreino
                onSetNomeTreino={value => {
                  setNomeTreino(value)
                }}
                nome={nomeTreino}
                treinoPersonal={true}
                id_user={alunoData?.ID}
              />
            </Modal>
            <TreinosLivresSalvos
              verMeusTreinos={(value, ver) => {
                setTreino(value)
                setVerMeusTreinos(ver)
              }}
              treinoLivre={treinoLivre}
            />
          </>
        ) : (
          <VerTreinoEscolhido
            treino={treino}
            verMeusTreinos={ver => {
              setVerMeusTreinos(ver)
            }}
          />
        )}
      </Loading>
    </TreinoLayout>
  )
}
