import { Button, Col, Row, Space, Tabs, Typography, theme } from 'antd'
import { Collapse, Panel } from '@/components'
import AulasColetivas from '../aulas_coletivas/_AulasColetivas'
import BannersPowerCycle from './_BannersPowerCycle'

const items = [
  {
    key: '2',
    label: `Aulas`,
    children: <AulasColetivas tema={'netFit_spinning'} />
  },
  {
    key: '1',
    label: `Instruções`,
    children: (
      <>
        <div className="text-center">
          <Typography.Title level={2}>Instruções</Typography.Title>
          <Typography.Paragraph>
            Para uma melhor experiência, assista as aulas em uma tela maior. Sugestão - Smart TV
          </Typography.Paragraph>
          <Typography.Paragraph>Siga o Passo a passo para participar das aulas:</Typography.Paragraph>
        </div>
        <Collapse>
          <Panel header="1º Assista aulas ao vivo no YouTube">
            <Space direction="vertical" className="w-100">
              <p className="text-center">
                Assista nossas aulas no YouTube pela sua TV ou Computador atráves do canal Power Cycle
              </p>
              <Row className="mt-10">
                <Col span={24} className="text-center">
                  <img src="/images/bike/1.png" width={100} alt="" />
                  <p>
                    <a href="https://www.youtube.com/@powercycleoficial3593">
                      <Button type="primary" size="small">
                        Inscreva-se no canal
                      </Button>
                    </a>
                  </p>
                  <p>Se inscreva e ative o sininho🔔</p>
                </Col>
              </Row>
              <img src="/images/bike/horarios.png" width={'100%'} alt="" />
            </Space>
          </Panel>
          <Panel header="2º Acesso ao APP Pratique em Casa">
            <Space direction="vertical">
              <p>Locando a Bike você tem acesso PREMIUM ao App de treino do Pratique Em Casa.</p>
              <div className="text-center">
                <a
                  href="https://play.google.com/store/apps/details?id=com.fortram.pratiqueemcasa&hl=pt_BR&gl=US"
                  target="_blank"
                >
                  <img src="/images/bike/play.png" width={150} alt="" />
                </a>
                <a href="https://apps.apple.com/br/app/pratique-em-casa/id1520321614" target="_blank">
                  <img src="/images/bike/store.png" width={150} alt="" />
                </a>
              </div>
            </Space>
          </Panel>
          <Panel header="3º Regulagem da Bike">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/3WygiR4emL8"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen=""
            ></iframe>
          </Panel>
          <Panel header="4º Participar do Grupo Exclusivo Telegram">
            <Space direction="vertical">
              <p>Temos também um grupo do Telegram com todos professores e a turma do pedal Pratique em casa:</p>
              <p>
                <a href="http://bit.ly/turmapedalpratiqueemcasa" target="_blank">
                  🌐 bit.ly/turmapedalpratiqueemcasa
                </a>
              </p>
            </Space>
          </Panel>
          <Panel header="Quadro de Horários">
            <p>
              <img src="/images/bike/horarios.png" width={'100%'} alt="" />
            </p>
          </Panel>
          <Panel header="Solicitar manutenção">
            <iframe
              src="https://form.typeform.com/to/tANzURg0"
              width="100%"
              height="400"
              frameborder="0"
              allowfullscreen="true"
            ></iframe>
          </Panel>
          <Panel header="Loja Pratique">
            <p className="p-10 text-center">
              <a href="https://lojapratique.com.br/" target="_blank">
                <img src="/images/bike/loja.png" width={200} alt="" />
              </a>
            </p>
          </Panel>
          <Panel header="Whatsapp">
            <p className="p-10 text-center">
              <a
                href="https://api.whatsapp.com/send?1=pt_BR&phone=5531984272283%20&text=Ol%C3%A1,%20estou%20no%20app,%20e%20preciso%20de%20ajuda."
                target="_blank"
              >
                <img src="/images/bike/whats.png" width={150} alt="" />
              </a>
            </p>
          </Panel>
        </Collapse>
      </>
    )
  }
]

export default function Bike() {
  return (
    <>
      <div className="text-center">
        <img src="images/bike/cycle.png" width={'50%'} alt="" style={{ maxWidth: 200 }} />
      </div>
      <div className='mt-4'>
        <BannersPowerCycle />
      </div>
      <Tabs defaultActiveKey="0" items={items} centered size="large" />
    </>
  )
}
