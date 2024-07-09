import { Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import Carrossel from './_Carrossel'
import { useSelector } from 'react-redux'

import { LazyLoadingThreeColumns } from '../../components/LazyLoadingThreeColumns'

const { Title, Text } = Typography

export default function Powerflix() {
  const [exercicioModal, setExercicioModal] = useState(false)
  const [imageModal, setImageModal] = useState('')
  const { loading } = useSelector(state => state.lives)


  const closeExercicioModal = () => {
    setImageModal('')
    setExercicioModal(false)
  }

  const listaCarouselMembrosInferiores = [
    {
      image: '/images/webp/powerflix/bumbum_na_lua.webp',
      isRounded: true,
      alt: 'bumbum_na_lua',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/coxa_sonhos.webp',
      isRounded: true,
      alt: 'coxa_sonhos',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/posterior_invejavel.webp',
      isRounded: true,
      alt: 'posterior_invejavel',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  const listaCarouselMembrosSuperiores = [
    {
      image: '/images/webp/powerflix/biceps_pedra.webp',
      isRounded: true,
      alt: 'biceps_pedra',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/costas_morcego.webp',
      isRounded: true,
      alt: 'costas_morcego',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/peitoral_arnold.webp',
      isRounded: true,
      alt: 'peitoral_arnold',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]
  const listaCarouselDesportivo = [
    {
      image: '/images/webp/powerflix/footvolley.webp',
      isRounded: true,
      alt: 'footvolley',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/beach_tennis.webp',
      isRounded: true,
      alt: 'beach_tennis',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/bike_lovers.webp',
      isRounded: true,
      alt: 'bike_lovers',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/bolt.webp',
      isRounded: true,
      alt: 'bolt',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/wilson.webp',
      isRounded: true,
      alt: 'wilson',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/pretemporada.webp',
      isRounded: true,
      alt: 'pretemporada',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  const listaCarouselDiversos = [
    {
      image: '/images/webp/powerflix/abdomem_chapado.webp',
      isRounded: true,
      alt: 'abdomem_chapado',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/adaptativo.webp',
      isRounded: true,
      alt: 'adaptativo',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/pochetinha.webp',
      isRounded: true,
      alt: 'pochetinha',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    },
    {
      image: '/images/webp/powerflix/imunidade_total.webp',
      isRounded: true,
      alt: 'imunidade_total',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal
    }
  ]

  return (
    <Space direction="vertical" className="w-100 mb-6">
      <Modal
        title={'Seu Treino'}
        open={exercicioModal}
        onCancel={closeExercicioModal}
        footer={null}
        width={600}
        className="text-center px-2"
        centered
      >
        <img src={`/images/webp/powerflix/${imageModal}_treino.webp`} className="rounded w-100" />
      </Modal>

      <div className="text-left mt-8">
        <img src="/powerflixsemtexto.png" className="w-50 md-w-50" />
      </div>
      <Text>Você no controle do seu treino</Text>

      <div className="mt-4 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Membros Inferiores
        </Title>
      </div>

      <LazyLoadingThreeColumns loading={loading}>
        <Carrossel listaCarousel={listaCarouselMembrosInferiores} />
      </LazyLoadingThreeColumns>

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Membros Superiores
        </Title>
      </div>

      <LazyLoadingThreeColumns loading={loading}>
        <Carrossel listaCarousel={listaCarouselMembrosSuperiores} />
      </LazyLoadingThreeColumns>

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Treinos Diversos
        </Title>
      </div>

      <LazyLoadingThreeColumns loading={loading}>
        <Carrossel listaCarousel={listaCarouselDiversos} />
      </LazyLoadingThreeColumns>

      <div className="mt-6 flex flex-column mb-0">
        <Title level={3} className="mb-0">
          Treino Desportivo
        </Title>
      </div>

      <LazyLoadingThreeColumns loading={loading}>
        <Carrossel listaCarousel={listaCarouselDesportivo} />
      </LazyLoadingThreeColumns>
    </Space>
  )
}
