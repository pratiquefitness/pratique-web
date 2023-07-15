import { Button, Carousel, Col, Modal, Row, Typography, theme } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Banners from './_Banners'

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
        <iframe src="http://pratiquefitness.com.br/horarios/" frameborder="0" width={'100%'} height={500}></iframe>
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
        <Link href="/aulas_coletivas/jump">
          <Button>Jump</Button>
        </Link>
        <Link href="/aulas_coletivas/yoga">
          <Button>Yoga</Button>
        </Link>
      </Modal>

      <Banners />

      {usuario.isEmployee && (
        <>
          <Title level={4} className="m-0">
            Area do Colaborador!
          </Title>
          <Text type="secondary">Beneficios e conteúdos para você</Text>
          <Row gutter={6} className="mb-2 mt-2">
            <Col span={12}>
              <Link href="/canal_equipe">
                <img src="/images/canal_equipe.png" width="100%" />
              </Link>
            </Col>
            <Col span={12}>
              <a href="https://metodologiapowergym.com.br/courses/">
                <img src="/images/unipower.png" width="100%" />
              </a>
            </Col>
          </Row>
          <Row gutter={6} className="mb-2 mt-2">
            <Col span={12}>
              <a href="https://www.clubecertosaude.com.br/saude/saversaude/">
                <img src="/images/saver_saude.png" width="100%" />
              </a>
            </Col>
            <Col span={12}>
              <a href="https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique">
                <img src="/images/saver_club.png" width="100%" />
              </a>
            </Col>
          </Row>
        </>
      )}

      <Title level={4} className="m-0">
        Você, Feliz e Saudável!
      </Title>
      <Text type="secondary">Exercícios e conteúdos para você</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col span={12}>
          <Link href="/meditacao">
            <img src="/images/meditacao.png" width="100%" />
          </Link>
        </Col>
        <Col span={12}>
          <a onClick={() => setAulasColetivasModal(true)}>
            <img src="/images/aulas.png" width="100%" />
          </a>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col span={12}>
          <Link href="/bike">
            <img src="/images/power.png" width="100%" />
          </Link>
        </Col>
        <Col span={12}>
          <a onClick={() => setBlogModal(true)}>
            <img src="/images/blog.png" width="100%" />
          </a>
        </Col>
      </Row>
      <Title level={4} className="m-0 mt-6">
        SAC
      </Title>
      <Text type="secondary">Canais de atendimento da Pratique</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col span={12}>
          <a href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20em%20Casa%20e%20estou%20com%20d%C3%BAvida">
            <img src="/images/sac.png" width="100%" />
          </a>
        </Col>
        <Col span={12}>
          <a onClick={() => setHorariosModal(true)}>
            <img src="/images/horarios.png" width="100%" />
          </a>
        </Col>
      </Row>
    </>
  )
}
