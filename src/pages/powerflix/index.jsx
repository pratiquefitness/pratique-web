import { Modal, Space, Typography } from 'antd'
import { useState } from 'react'
import Carrossel from './_Carrossel'

const { Title, Text } = Typography

export default function Powerflix() {
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
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'BUMBUM NA LUA',
      href: '/powerflix_treino/bumbum_na_lua',
    },
    {
      image: '/images/powerflix/coxa_sonhos.png',
      isRounded: true,
      alt: 'coxa_sonhos',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'COXA DOS SONHOS',
      href: '/powerflix_treino/coxa_sonhos',
    },
    {
      image: '/images/powerflix/posterior_invejavel.png',
      isRounded: true,
      alt: 'posterior_invejavel',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'POSTERIOR INVEJÁVEL',
      href: '/powerflix_treino/posterior_invejavel',
    }
  ]

  const listaCarouselMembrosSuperiores = [
    {
      image: '/images/powerflix/biceps_pedra.png',
      isRounded: true,
      alt: 'biceps_pedra',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'BÍCEPS DE PEDRA',
      href: '/powerflix_treino/biceps_pedra',
    },
    {
      image: '/images/powerflix/costas_morcego.png',
      isRounded: true,
      alt: 'costas_morcego',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'COSTAS ASAS DE MORCEGO',
      href: '/powerflix_treino/costas_morcego',
    },
    {
      image: '/images/powerflix/peitoral_arnold.png',
      isRounded: true,
      alt: 'peitoral_arnold',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'PEITORAL DO ARNOLD',
      href: '/powerflix_treino/peitoral_arnold',
    }
  ]
  const listaCarouselDesportivo = [
    {
      image: '/images/powerflix/footvolley.png',
      isRounded: true,
      alt: 'footvolley',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'FUTEVÔLEI',
      href: '/powerflix_treino/footvolley',
    },
    {
      image: '/images/powerflix/beach_tennis.png',
      isRounded: true,
      alt: 'beach_tennis',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'BEACH TENNIS',
      href: '/powerflix_treino/beach_tennis',
    },
    {
      image: '/images/powerflix/bike_lovers.png',
      isRounded: true,
      alt: 'bike_lovers',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'BIKE LOVERS',
      href: '/powerflix_treino/bike_lovers',
    },
    {
      image: '/images/powerflix/bolt.png',
      isRounded: true,
      alt: 'bolt',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'TREINO DO BOLT',
      href: '/powerflix_treino/bolt',
    },
    {
      image: '/images/powerflix/wilson.png',
      isRounded: true,
      alt: 'wilson',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'BORA JOGAR VÔLEI WILSON?',
      href: '/powerflix_treino/wilson',
    },
    {
      image: '/images/powerflix/pretemporada.jpeg',
      isRounded: true,
      alt: 'pretemporada',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'PRÉ TEMPORADA',
      href: '/powerflix_treino/pretemporada',
    }
  ]

  const listaCarouselDiversos = [
    {
      image: '/images/powerflix/abdomem_chapado.png',
      isRounded: true,
      alt: 'abdomem_chapado',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'ABDÔMEN CHAPADO',
      href: '/powerflix_treino/abdomem_chapado',
    },
    {
      image: '/images/powerflix/adaptativo.png',
      isRounded: true,
      alt: 'adaptativo',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'TREINO ADAPTATIVO', //TODO: Só tem um
      href: '/powerflix_treino/adaptativo',
    },
    {
      image: '/images/powerflix/pochetinha.png',
      isRounded: true,
      alt: 'pochetinha',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: '',
      href: '',
    },
    {
      image: '/images/powerflix/imunidade_total.png',
      isRounded: true,
      alt: 'imunidade_total',
      setImageModal: setImageModal,
      setExercicioModal: setExercicioModal,
      nomeFichaPre: 'IMUNIDADE TOTAL',
      href: '/powerflix_treino/imunidade_total',
    }
  ]

  return (
    <Space direction="vertical" className="w-100 mb-6">
      {/*<Modal
        title={'Seu Treino'}
        open={exercicioModal}
        onCancel={closeExercicioModal}
        footer={null}
        width={600}
        className="text-center px-2"
        centered
      >
        <img src={`/images/powerflix/${imageModal}_treino.png`} className="rounded w-100" />
      </Modal>*/}

      <div className="text-left mt-8">
        <img src="/powerflixsemtexto.png" className="w-50 md-w-50" />
      </div>
      <Text>Você no controle do seu treino</Text>

      <div className="mt-4 flex flex-column mb-0">
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
