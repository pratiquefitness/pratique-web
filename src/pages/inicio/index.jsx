import { Button, Carousel, Col, Modal, Row, Typography, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const contentStyle = {
  margin: 5,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  borderRadius: 10
}

const settings = {
  className: 'center',
  centerMode: true,
  slidesToShow: 1,
  swipeToSlide: true,
  draggable: true,
  autoplay: true,
  autoplaySpeed: 2000,
  style: {
    marginBottom: 20
  }
}

const { Title, Text } = Typography

export default function Inicio() {
  const [horariosModal, setHorariosModal] = useState(false)
  const [aulasColtivasModal, setAulasColetivasModal] = useState(false)
  const [blogModal, setBlogModal] = useState(false)
  const { usuario } = useSelector(state => state.login)
  const { token } = theme.useToken()
  return (
    <>
      <Modal title="Horários" open={horariosModal} footer={null} onCancel={() => setHorariosModal(false)}>
        <iframe src="https://pratiquefitness.com.br/horarios/" frameborder="0" width={'100%'} height={500}></iframe>
      </Modal>
      <Modal title="Blog" open={blogModal} footer={null} onCancel={() => setBlogModal(false)}>
        <iframe src="https://pratiquefitness.com.br/blog/" frameborder="0" width={'100%'} height={600}></iframe>
      </Modal>
      <Modal
        title="Aulas Coletivas"
        open={aulasColtivasModal}
        footer={null}
        onCancel={() => setAulasColetivasModal(false)}
      >
        <Link href="/jump">
          <Button>Jump</Button>
        </Link>
        <Link href="/yoga">
          <Button>Yoga</Button>
        </Link>
      </Modal>

      <Carousel {...settings}>
        <div>
          <h3 style={{ ...contentStyle, background: 'red' }}>1</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: 'green' }}>2</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: 'blue' }}>3</h3>
        </div>
        <div>
          <h3 style={{ ...contentStyle, background: 'gray' }}>4</h3>
        </div>
      </Carousel>
      {usuario.isEmployee && (
        <>
          <Title level={4} className="m-0">
            Area do Colaborador!
          </Title>
          <Text type="secondary">Beneficios e conteúdos para você</Text>
          <Row gutter={6} className="mb-2 mt-2">
            <Col flex="auto">
              <div style={{ height: 150, position: 'relative' }}>
                <Link href="/canal_equipe">
                  <Image src="/images/canal_equipe.png" fill />
                </Link>
              </div>
            </Col>
            <Col flex="auto">
              <div style={{ height: 150, position: 'relative' }}>
                <a href="https://metodologiapowergym.com.br/courses/">
                  <Image src="/images/unipower.png" fill />
                </a>
              </div>
            </Col>
          </Row>
          <Row gutter={6} className="mb-2 mt-2">
            <Col flex="auto">
              <div style={{ height: 150, position: 'relative' }}>
                <a href="https://www.clubecertosaude.com.br/saude/saversaude/">
                  <Image src="/images/saver_saude.png" fill />
                </a>
              </div>
            </Col>
            <Col flex="auto">
              <div style={{ height: 150, position: 'relative' }}>
                <a href="https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique">
                  <Image src="/images/saver_club.png" fill />
                </a>
              </div>
            </Col>
          </Row>
        </>
      )}

      <Title level={4} className="m-0">
        Você, Feliz e Saudável!
      </Title>
      <Text type="secondary">Exercícios e conteúdos para você</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <Link href="/meditacao">
              <Image src="/images/meditacao.png" fill />
            </Link>
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <a onClick={() => setAulasColetivasModal(true)}>
              <Image src="/images/aulas.png" fill />
            </a>
          </div>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <Image src="/images/power.png" fill />
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <a onClick={() => setBlogModal(true)}>
              <Image src="/images/blog.png" fill />
            </a>
          </div>
        </Col>
      </Row>
      <Title level={4} className="m-0 mt-6">
        SAC
      </Title>
      <Text type="secondary">Canais de atendimento da Pratique</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <a href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20em%20Casa%20e%20estou%20com%20d%C3%BAvida">
              <Image src="/images/sac.png" fill />
            </a>
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 150, position: 'relative' }}>
            <a onClick={() => setHorariosModal(true)}>
              <Image src="/images/horarios.png" fill />
            </a>
          </div>
        </Col>
      </Row>
    </>
  )
}
