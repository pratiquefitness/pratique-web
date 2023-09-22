import { Badge, Col, Modal, Row, Space, Typography } from 'antd'

import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Banners from './_Banners'
import { RibbonWithEndDate } from '@/components'
import { addDays } from 'date-fns'

const { Title, Text } = Typography

export default function Inicio() {
  const [horariosModal, setHorariosModal] = useState(false)
  const [aulasColtivasModal, setAulasColetivasModal] = useState(false)
  const [saverClubModal, setSaverClubModal] = useState(false)
  const { usuario } = useSelector(state => state.login)

  const isClient = !usuario.isEmployee
  const isSaverAndClient = (usuario.plano?.includes('SAVER CLUB') && !usuario.isEmployee) || false

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
          <a href="https://clubecerto.com.br/hotsite/?utm_cc=acessodireto&ent=saverpratique" target="_blank">
            <img src="/images/clube_certo.png" width={'100%'} className="rounded" />
          </a>
          <a href="https://grupopratique.typeform.com/cadas-desconto" target="_blank">
            <img src="/images/igreen.png" width={'100%'} className="rounded" />
          </a>
          <a href="https://www.bolsamaisbrasil.com.br/unipower/bolsas" target="_blank">
            <img src="/images/bolsa_brasil.png" width={'100%'} className="rounded" />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=5531984400941&text=Ol%C3%A1%2C+Igor+da+RDC+Viagens.+Sou+assinante+do+Saver+Club+e+gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+os+descontos+da+assinatura+de+viagens"
            target="_blank"
          >
            <img src="/images/rdc.png" width={'100%'} className="rounded" />
          </a>
          <a href="https://pratiquefitness.com.br/" target="_blank">
            <img src="/images/pratique.png" width={'100%'} className="rounded" />
          </a>
        </Space>
      </Modal>

      <Banners />

      {usuario.isEmployee ? (
        <>
          <Title level={4} className="m-0">
            Área do Colaborador!
          </Title>
          <Text type="secondary">Beneficios e conteúdos para você</Text>
          <Row gutter={6} className="mb-2 mt-2">
            <Col span={12}>
              <Link href="/canal_equipe">
                <img src="/images/canal_equipe.png" width="100%" />
              </Link>
            </Col>
            <Col span={12}>
              <Link href="/unipower">
                <img src="/images/unipower.png" width="100%" />
              </Link>
            </Col>
          </Row>
          <Row gutter={6} className="mb-2 mt-2">
            <Col span={12}>
              <a href="https://www.clubecertosaude.com.br/saude/saversaude/" target="_blank">
                <img src="/images/saver_saude.png" width="100%" className="rounded" />
              </a>
            </Col>
            <Col span={12}>
              <a onClick={() => setSaverClubModal(true)}>
                <img src="/images/saver_club.png" width="100%" className="rounded" />
              </a>
            </Col>
          </Row>
        </>
      ) : null}

      {isClient ? (
        <>
          <Title level={4} className="m-0">
            Área do Cliente!
          </Title>
          <Text type="secondary">Beneficios e conteúdos para você</Text>
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

      <Title level={4} className="m-0">
        Você, Feliz e Saudável!
      </Title>
      <Text type="secondary">Exercícios e conteúdos para você</Text>
      <Row gutter={[6, 6]} className="mb-2 mt-2">
        <Col span={12}>
          <a href="https://linklist.bio/pratiquenutri" target="_blank">
            <RibbonWithEndDate
              text="Novo"
              color="yellow"
              endDate={addDays(new Date('2023-09-21'), 30)}
              style={{ fontSize: 22, padding: 10 }}
            >
              <img src="/images/nutri.png" width="100%" />
            </RibbonWithEndDate>
          </a>
        </Col>
        <Col span={12}>
          <a href="https://linklist.bio/metodologiapowergym" target="_blank">
            <RibbonWithEndDate
              text="Novo"
              color="yellow"
              endDate={addDays(new Date('2023-09-21'), 30)}
              style={{ fontSize: 22, padding: 10 }}
            >
              <img src="/images/powergym.png" width="100%" />
            </RibbonWithEndDate>
          </a>
        </Col>
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
        <Col span={12}>
          <Link href="/bike">
            <img src="/images/power.png" width="100%" />
          </Link>
        </Col>
        <Col span={12}>
          <a href="https://pratiquefitness.com.br/blog/" target="_blank">
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
