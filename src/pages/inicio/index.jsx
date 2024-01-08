import { Badge, Col, Modal, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banners from './_Banners'
import { RibbonWithEndDate } from '@/components'
import { addDays } from 'date-fns'
import { setBrowserURL } from '@/redux/slices/global'
import NewContent from './newContent'
import NewContent2 from './newContent2'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const { Title, Text } = Typography

export default function Inicio() {
  const dispatch = useDispatch()
  const [horariosModal, setHorariosModal] = useState(false)
  const [aulasColtivasModal, setAulasColetivasModal] = useState(false)
  const [saverClubModal, setSaverClubModal] = useState(false)
  const { usuario } = useSelector(state => state.login)

  const isClient = !usuario.isEmployee
  const isSaverAndClient = (usuario.plano?.includes('SAVER') && !usuario.isEmployee) || false

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
        title="Aulas Coletivas"
        open={aulasColtivasModal}
        onCancel={() => setAulasColetivasModal(false)}
        footer={null}
        width={300}
        centered
      >
        <Space direction="vertical">
          <Link href="/aulas_coletivas/jump">
            <img src="/images/jump.png" width={'100%'} alt="" />
          </Link>
          <Link href="/aulas_coletivas/yoga">
            <img src="/images/yoga2.png" width={'100%'} alt="" />
          </Link>
        </Space>
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

      <Banners />

      <div className="mt-4 mb-2">
        <Title level={3} className="m-0 ">
          Novas Atividades
        </Title>
        <Text>Beneficios e conteúdos para você</Text>
      </div>
      <NewContent />

      <div className="mt-4 mb-2">
        <Title level={3} className="m-0 ">
          Fitness
        </Title>
        <Text>lorem ipsum sit amet...</Text>
      </div>
      <NewContent2 />

      {usuario.isEmployee ? (
        <div className="mt-6">
          <div>
            <Title level={4} className="m-0">
              Área do Colaborador!
            </Title>
            <Text type="secondary">Beneficios e conteúdos para você</Text>
          </div>
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
                breakpoint: {
                  max: 3000,
                  min: 1024
                },
                items: 3,
                height: 260,
                partialVisibilityGutter: 40,
                slidesToSlide: 2
              },
              mobile: {
                breakpoint: {
                  max: 575,
                  min: 0
                },
                items: 1,
                partialVisibilityGutter: 80
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464
                },
                items: 2,
                partialVisibilityGutter: 40
              }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            showDots={false}
            slidesToSlide={1}
            swipeable
          >
            <Link href="/canal_equipe">
              <img src="/images/canal_equipe.png" className="w-95 rounded-xl" />
            </Link>
            <Link href="/unipower">
              <img src="/images/unipower.png" className="w-95 rounded-xl" />
            </Link>

            <a onClick={() => dispatch(setBrowserURL('https://www.clubecertosaude.com.br/saude/saversaude/'))}>
              <img src="/images/pratique_med.png" className="w-95 rounded-xl" />
            </a>
            <a onClick={() => setSaverClubModal(true)}>
              <img src="/images/saver_club.png" className="w-95 rounded-xl" />
            </a>
          </Carousel>
        </div>
      ) : null}

      {isClient ? (
        <>
          <div>
            <Title level={4} className="m-0">
              Área do Cliente!
            </Title>
            <Text type="secondary">Beneficios e conteúdos para você</Text>
          </div>
          <Row gutter={[6, 6]} className="mb-2 mt-2">
            {isSaverAndClient ? (
              <Col span={12}>
                <a onClick={() => setSaverClubModal(true)}>
                  <img src="/images/saver_club.png" width="100%" className="rounded" />
                </a>
              </Col>
            ) : null}

            <Col span={12}>
              <a href="https://pratiquefitness.com.br/trabalhe-na-academia-pratique/" target="_blank">
                <img src="/images/trabalhe_conosco.png" width="100%" />
              </a>
            </Col>
            <Col span={12}>
              <a href="https://pratiquefitness.com.br/sobre-a-pratique/" target="_blank">
                <img src="/images/sua_pratique.png" width="100%" />
              </a>
            </Col>
          </Row>
        </>
      ) : null}

      <div className='mt-6 flex flex-column mb-0'>
        <Title level={4} className="mb-0">
          Você, Feliz e Saudável!
        </Title>
        <Text type="secondary">Exercícios e conteúdos para você</Text>
      </div>
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
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            height: 260,
            partialVisibilityGutter: 40,
            slidesToSlide: 2
          },
          mobile: {
            breakpoint: {
              max: 575,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 80
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 40
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        <a onClick={() => dispatch(setBrowserURL('https://linklist.bio/pratiquenutri'))}>
          <RibbonWithEndDate
            text="Novo!"
            color="yellow"
            endDate={addDays(new Date('2023-09-21'), 30)}
            style={{ fontSize: 16, padding: '2px 8px' }}
          >
            <img src="/images/nutri.png" className='rounded-xl w-95' />
          </RibbonWithEndDate>
        </a>

        {/* <a onClick={() => dispatch(setBrowserURL('https://linklist.bio/metodologiapowergym'))}>
          <RibbonWithEndDate
            text="Novo!"
            color="yellow"
            endDate={addDays(new Date('2023-09-21'), 30)}
            style={{ fontSize: 16, padding: '2px 8px' }}
          >
            <img src="/images/powergym.png" className='rounded-xl w-95' />
          </RibbonWithEndDate>
        </a> */}

        <Link href="/meditacao">
          <img src="/images/meditacao.png" className='rounded-xl w-95' />
        </Link>

        {/* <a onClick={() => setAulasColetivasModal(true)}>
          <img src="/images/aulas.png" className='rounded-xl w-95' />
        </a> */}

        <Link href="/bike">
          <img src="/images/power.png" className='rounded-xl w-95' />
        </Link>

        {/* <a onClick={() => dispatch(setBrowserURL('https://pratiquefitness.com.br/blog/'))}>
          <img src="/images/blog.png" className='rounded-xl w-95' />
        </a> */}
      </Carousel>

      <div>
        <Title level={4} className="m-0 mt-6">
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
            <img src="/images/sac.png" width="100%" />
          </a>
        </Col>
        <Col span={12}>
          <a onClick={() => setHorariosModal(true)}>
            <img src="/images/horarios.png" width="100%" style={{ filter: 'sepia(1)' }} />
          </a>
        </Col>
      </Row>
    </Space>
  )
}
