import { Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import Carrossel from './_Carrossel'

const { Title } = Typography

export default function Inicio() {
  const [exercicioModal, setExercicioModal] = useState(false)
  const [imageModal, setImageModal] = useState('')

  const closeExercicioModal = () => {
    setImageModal('')
    setExercicioModal(false)
  }

  const listaCarouselMembrosInferiores = [
    {
      image: '/images/powerflix/bumbum_na_lua.png',
      isRounded: true,
      alt: 'bumbum_na_lua',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/coxa_sonhos.png',
      isRounded: true,
      alt: 'coxa_sonhos',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/posterior_invejavel.png',
      isRounded: true,
      alt: 'posterior_invejavel',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  const listaCarouselMembrosSuperiores = [
    {
      image: '/images/powerflix/biceps_pedra.png',
      isRounded: true,
      alt: 'biceps_pedra',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/costas_morcego.png',
      isRounded: true,
      alt: 'costas_morcego',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/peitoral_arnold.png',
      isRounded: true,
      alt: 'peitoral_arnold',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]
  const listaCarouselDesportivo = [
    {
      image: '/images/powerflix/footvolley.png',
      isRounded: true,
      alt: 'footvolley',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/beach_tennis.png',
      isRounded: true,
      alt: 'beach_tennis',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/bike_lovers.png',
      isRounded: true,
      alt: 'bike_lovers',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/bolt.png',
      isRounded: true,
      alt: 'bolt',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/wilson.png',
      isRounded: true,
      alt: 'wilson',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/pretemporada.jpeg',
      isRounded: true,
      alt: 'pretemporada',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  const listaCarouselDiversos = [
    {
      image: '/images/powerflix/abdomem_chapado.png',
      isRounded: true,
      alt: 'abdomem_chapado',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/adaptativo.png',
      isRounded: true,
      alt: 'adaptativo',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/pochetinha.png',
      isRounded: true,
      alt: 'pochetinha',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/powerflix/imunidade_total.png',
      isRounded: true,
      alt: 'imunidade_total',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  return (
    <Space direction="vertical" className="w-100 mb-6">
      <Modal
        title="Treino"
        open={exercicioModal}
        onCancel={closeExercicioModal}
        footer={null}
        width={600}
        className="text-center px-2"
        centered
      >
        <img src={`/images/powerflix/${imageModal}_treino.png`} className="rounded w-100" />
      </Modal>

      <div className="text-center mt-2">
        <img src="images/powerflix/powerflix.png" width={'100%'} alt="" style={{ maxWidth: 275 }} />
      </div>

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Membros Inferiores
        </Title>
      </div>
      <Carrossel listaCarousel={listaCarouselMembrosInferiores} />

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Membros Superiores
        </Title>
      </div>
      <Carrossel listaCarousel={listaCarouselMembrosSuperiores} />

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Treinos Diversos
        </Title>
      </div>
      <Carrossel listaCarousel={listaCarouselDiversos} />

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Treino Desportivo
        </Title>
      </div>
      <Carrossel listaCarousel={listaCarouselDesportivo} />
    </Space>
  )
}
