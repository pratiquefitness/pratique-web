import { Badge, Col, Modal, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banners from './_Banners'
import { RibbonWithEndDate } from '@/components'
import { addDays } from 'date-fns'
import { setBrowserURL } from '@/redux/slices/global'
import AtividadesOnDemand from './_AtividadesOnDemand'
import BemEstar from './_BemEstar'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CarouselItem from './_CarouselItem'
import Powerflix from '../powerflix'

const { Title, Text } = Typography

export default function Inicio() {
  const dispatch = useDispatch()
  const [horariosModal, setHorariosModal] = useState(false)
  const [saverClubModal, setSaverClubModal] = useState(false)
  const { usuario } = useSelector(state => state.login)
  const { svaClientParameters } = useSelector(state => state.clubeCertoSva)

  const isClient = !usuario.isEmployee
  const isSaverAndClient = (usuario.plano?.includes('SAVER') && !usuario.isEmployee) || false
  //const isSaverAndClient = true
  const isSaverSaudeAndPesonal = (usuario.plano?.includes('PERSONAL') && !usuario.isEmployee) || false

  const isSaverSaudeAndClient = true
  //  const isSaverSaudeAndClient = (usuario.plano?.includes('PERSONAL') && !usuario.isEmployee) || false

  const dispatchSaverSaude = () => {
    dispatch(setBrowserURL('https://www.clubecertosaude.com.br/saude/saversaude/'))
  }

  const dispatchPratiqueMed = () => {
    dispatch(setBrowserURL('https://www.pratiquemed.com.br/login.php'))
  }

  const dispatchSac = () => {
    dispatch(
      setBrowserURL(
        'https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida.',
        '_blank'
      )
    )
  }

  const dispatchTrabalhePratique = () => {
    dispatch(setBrowserURL('https://pratiquefitness.com.br/trabalhe-na-academia-pratique/'))
  }

  const dispatchSobrePratique = () => {
    dispatch(setBrowserURL('https://pratiquefitness.com.br/sobre-a-pratique/'))
  }

  const abreSaverClubModal = () => {
    setSaverClubModal(true)
  }

  const listaCarousel = [
    {
      href: '',
      action: abreSaverClubModal,
      image: '/images/saver_club.png',
      isRounded: true,
      alt: 'unipower_banner'
    },
    {
      href: '',
      action: dispatchSaverSaude,
      image: '/images/saver_saude.png',
      isRounded: true,
      alt: 'unipower_banner'
    },
    {
      href: '/unipower',
      image: '/images/unipower.png',
      isRounded: true,
      alt: 'unipower_banner'
    },
    {
      href: '/canal_equipe',
      image: '/images/canal_equipe.png',
      isRounded: true,
      alt: 'canal_equipe'
    },
    {
      href: 'https://bit.ly/FalarRH',
      image: '/images/rh.png',
      isRounded: true,
      alt: 'RH',
      target: '_blank'
    }
  ]

  const listaCarouselAreaCliente = [
    {
      href: '',
      image: '/images/trabalhe_conosco.png',
      isRounded: true,
      alt: 'trabalhe_conosco',
      action: dispatchTrabalhePratique
    },
    {
      href: '',
      image: '/images/sua_pratique.png',
      isRounded: true,
      alt: 'sua_pratique',
      action: dispatchSobrePratique
    }
  ]

  const novaListaCarouselAreaCliente = [
    ...(isSaverAndClient
      ? [
          {
            href: '',
            image: '/images/saver_club.png',
            isRounded: true,
            alt: 'saver_saude',
            action: abreSaverClubModal
          }
        ]
      : []),

    ...(isSaverSaudeAndClient
      ? [
          {
            href: 'https://www.pratiquemed.com.br/login.php',
            image: '/images/pratique_med.png',
            isRounded: true,
            alt: 'saver_saude',
            target: '_blank'
          }
        ]
      : []),
    ...(isSaverSaudeAndPesonal
      ? [
          {
            action: dispatchSaverSaude,
            image: '/images/saver_saude.png',
            isRounded: true,
            alt: 'saver_saude'
          }
        ]
      : []),
    {
      href: 'https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida.',
      image: '/images/sac.png',
      isRounded: true,
      alt: 'sua_pratique',
      target: '_blank'
    },
    ...listaCarouselAreaCliente
  ]

  return (
    <Space direction="vertical" className="w-100">
      <Modal title="Horários" open={horariosModal} footer={null} onCancel={() => setHorariosModal(false)}>
        <iframe
          src="https://pratiquefitness.com.br/horarios/horariospratique/"
          frameborder="0"
          width={'100%'}
          height={500}
        ></iframe>
      </Modal>

      <Modal
        title="Saver Club"
        open={saverClubModal}
        onCancel={() => setSaverClubModal(false)}
        footer={null}
        width={300}
        centered
      >
        <Space direction="vertical">
          <a
            onClick={() => {
              setSaverClubModal(false)
              dispatch(setBrowserURL('https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique'))
            }}
            target="_blank"
          >
            <img src="/images/clube_certo.png" width={'100%'} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false)
              dispatch(setBrowserURL('https://grupopratique.typeform.com/cadas-desconto'))
            }}
            target="_blank"
          >
            <img src="/images/igreen.png" width={'100%'} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false)
              dispatch(setBrowserURL('https://www.bolsamaisbrasil.com.br/unipower/bolsas'))
            }}
            target="_blank"
          >
            <img src="/images/bolsa_brasil.png" width={'100%'} className="rounded" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5531984400941&text=Ol%C3%A1%2C+Igor+da+RDC+Viagens.+Sou+assinante+do+Saver+Club+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+descontos+da+assinatura+de+viagens"
            target="_blank"
          >
            <img src="/images/rdc.png" width={'100%'} className="rounded" />
          </a>
          <a
            onClick={() => {
              setSaverClubModal(false)
              dispatch(setBrowserURL('https://pratiquefitness.com.br/'))
            }}
            target="_blank"
          >
            <img src="/images/pratique.png" width={'100%'} className="rounded" />
          </a>
        </Space>
      </Modal>

      <div>
        <Title level={3} className="m-0">
          Novidades
        </Title>
        <Text type="secondary">Veja as novidades para 2024</Text>
      </div>
      <Banners />

      {usuario.isEmployee ? (
        <div className="mt-4">
          <div>
            <Title level={3} className="m-0">
              Área do Colaborador!
            </Title>
            <Text type="">Beneficios e conteúdos para você</Text>
          </div>
          <SvaCarousel />
          <Carousel
            arrows={false}
            autoPlay={false}
            centerMode={false}
            className="mt-2"
            containerClass="container"
            draggable
            focusOnSelect={false}
            infinite={false}
            keyBoardControl={false}
            minimumTouchDrag={80}
            partialVisible
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                partialVisibilityGutter: 100
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            slidesToSlide={1}
            swipeable
          >
            {listaCarousel.map(({ href, image, isRounded, action, alt }, index) => (
              <CarouselItem key={index} href={href} action={action} alt={alt} image={image} isRounded={isRounded} />
            ))}
          </Carousel>
        </div>
      ) : null}

      {isClient ? (
        <>
          <div>
            <Title level={3} className="mt-4 mb-0">
              Área do Cliente!
            </Title>
            <Text type="secondary">Beneficios e conteúdos para você</Text>
          </div>
          <SvaCarousel />
          {
            !Object.keys(svaClientParameters).length &&
              <Carousel
                arrows={false}
                autoPlay={false}
                centerMode={false}
                className="mt-2"
                containerClass="container"
                draggable
                focusOnSelect={false}
                infinite={false}
                keyBoardControl={false}
                minimumTouchDrag={80}
                partialVisible
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {max: 3000, min: 1024},
                    items: 3
                  },
                  tablet: {
                    breakpoint: {max: 1024, min: 464},
                    items: 2
                  },
                  mobile: {
                    breakpoint: {max: 464, min: 0},
                    items: 1
                  }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                showDots={false}
                slidesToSlide={1}
                swipeable
              >
                {listaCarouselAreaCliente.map(({href, image, alt, isRounded, action}, index) => (
                  <CarouselItem key={index} href={href} alt={alt} image={image} isRounded={isRounded} action={action}/>
                ))}
              </Carousel>
          }
        </>
      ) : null}

      <div className="mt-4 mb-2">
        <Title level={3} className="m-0 ">
          Atividades On Demand
        </Title>
        <Text>Aulas sempre disponíveis, para você fazer no seu tempo!</Text>
      </div>
      <AtividadesOnDemand />

      <Powerflix />

      {
        !Object.keys(svaClientParameters).length &&
        <>
          <div className="mt-4 mb-2">
            <Title level={3} className="m-0 ">
              Bem-estar físico e emocional
            </Title>
          </div>
          <BemEstar/>
        </>
      }

      <div className="mt-126 flex flex-col mb-0">
        <div className="mt-4 mb-2">
          <Title level={3} className="m-0 ">
            Evolua seu RESULTADO
          </Title>
        </div>
        <Text type="secondary">Exercícios e conteúdos para você</Text>
        <br />
        <br />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:flex">
          <a className="sm:flex-1" href="/exercicios">
            <img src="/images/demonstracao.png" width="100%" />
          </a>
          <a
            className="sm:flex-1"
            onClick={() => dispatch(setBrowserURL('https://pratiquefitness.com.br/pratiquenutri/'))}
          >
            <img src="/images/fale_nutri.png" width="100%" />
          </a>
          <a
            className="sm:flex-1"
            href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%2%C3%BAdvida."
            target="_blank"
          >
            <img src="/images/fale_professor.png" width="100%" />
          </a>
        </div>
      </div>

       {
         !Object.keys(svaClientParameters).length &&
         <>
           <div>
             <Title level={3} className="m-0 mt-6">
               Fale com a Pratique
             </Title>
             <Text type="secondary">Nossos canais de atendimento</Text>
           </div>
           <Row gutter={6} className="mb-2 mt-2">
             <Col span={12}>
               <a
                 href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20estou%20com%20d%C3%BAvida."
                 target="_blank"
               >
                 <img src="/images/sac.png" width="100%"/>
               </a>
             </Col>
             <Col span={12}>
               <a onClick={() => setHorariosModal(true)}>
                 <img src="/images/horarios.png" width="100%" style={{filter: 'sepia(1)'}}/>
               </a>
             </Col>
           </Row>
         </>
       }
    </Space>
  )
}
