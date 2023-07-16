import { Button, Col, Collapse, Row, Space, Typography } from 'antd'

const text = 'text'

const items = [
  {
    key: '1',
    label: '1º Assista aulas ao vivo no YouTube',
    children: <p>{text}</p>
  },
  {
    key: '2',
    label: '2º Baixe o App de monitoramento',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: '3° Como Configurar o App de Monitoramento',
    children: <p>{text}</p>
  },
  {
    key: '4',
    label: '4º Acesso ao APP Pratique em Casa',
    children: <p>{text}</p>
  },
  {
    key: '5',
    label: '5º Regulagem da Bike',
    children: <p>{text}</p>
  },
  {
    key: '6',
    label: '6º Participar do Grupo Exclusivo Telegram',
    children: <p>{text}</p>
  },
  {
    key: '7',
    label: 'Quadro de Horários',
    children: <p>{text}</p>
  },
  {
    key: '8',
    label: 'Solicitar manutenção',
    children: <p>{text}</p>
  },
  {
    key: '9',
    label: 'Loja Pratique',
    children: <p>{text}</p>
  },
  {
    key: '10',
    label: 'Whatsapp',
    children: <p>{text}</p>
  }
]

export default function Bike() {
  return (
    <>
      <div className="text-center">
        <img src="images/bike/cycle.png" width={'50%'} alt="" />
        <Typography.Title level={2}>Instruções</Typography.Title>
        <Typography.Paragraph>
          Para uma melhor experiência, assista as aulas em uma tela maior. Sugestão - Smart TV
        </Typography.Paragraph>
        <Typography.Paragraph>Siga o Passo a passo para participar das aulas:</Typography.Paragraph>
      </div>
      <Collapse defaultActiveKey={['0']}>
        <Collapse.Panel header="1º Assista aulas ao vivo no YouTube">
          <Space direction="vertical">
            <p>
              Assista nossas aulas no YouTube pela sua TV ou Computador atráves dos canais NetFit Brasil e Pratique Em
              Casa
            </p>
            <Row className="mt-10">
              <Col span={12} className="text-center">
                <img src="/images/bike/1.png" width={100} alt="" />
                <Button type="primary" size="small">
                  Inscreva-se no canal
                </Button>
                <p>Se inscreva e ative o sininho🔔</p>
              </Col>
              <Col span={12} className="text-center">
                <img src="/images/bike/2.png" width={100} alt="" />
                <Button type="primary" size="small">
                  Inscreva-se no canal
                </Button>
                <p>Se inscreva e ative o sininho🔔</p>
              </Col>
            </Row>
            <img src="/images/bike/horarios.png" width={'100%'} alt="" />
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="2º Baixe o App de monitoramento">
          <Space direction="vertical">
            <p>
              Pedale junto com todo Pelotão, se enxergue na Tela, interaja com Professor e todos na Sala NETFIT,
              monitore em Tempo Real RPM, Distancia, Gasto calórico, Frequência. BAIXE:
            </p>
            <div className="text-center">
              <img src="/images/bike/3.png" width={100} alt="" />
            </div>
            <div className="text-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.mo2tion.indoorbike&hl=pt-BR&pli=1"
                target="_blank"
              >
                <img src="/images/bike/play.png" width={150} alt="" />
              </a>
              <a href="https://apps.apple.com/br/app/motosumo/id1069353073" target="_blank">
                <img src="/images/bike/store.png" width={150} alt="" />
              </a>
            </div>
            <p>Conecte-se a sala Momentum</p>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/18vhp_3SVb4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen=""
            ></iframe>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="3° Como Configurar o App de Monitoramento">
          <Space direction="vertical">
            <p>🚲 Locando a Bike você tem acesso PREMIUM ao App de treino do Pratique Em Casa. 📲</p>
            <p>
              👉 Com MAIS DE 2000 Treinos de Spinning de Dança, Yoga, Jump, Abdominal, Queima… Blog com dicas de saúde e
              você pode assistir por temporada, professor e duração de aula (5, 10, 15, 30 minutos).
            </p>
            <div className="text-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.mo2tion.indoorbike&hl=pt-BR&pli=1"
                target="_blank"
              >
                <img src="/images/bike/play.png" width={150} alt="" />
              </a>
              <a href="https://apps.apple.com/br/app/motosumo/id1069353073" target="_blank">
                <img src="/images/bike/store.png" width={150} alt="" />
              </a>
            </div>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="4º Acesso ao APP Pratique em Casa">
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
        </Collapse.Panel>
        <Collapse.Panel header="5º Regulagem da Bike">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/3WygiR4emL8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen=""
          ></iframe>
        </Collapse.Panel>
        <Collapse.Panel header="6º Participar do Grupo Exclusivo Telegram">
          <Space direction="vertical">
            <p>Temos também um grupo do Telegram com todos professores e a turma do pedal Pratique em casa:</p>
            <p>
              <a href="http://bit.ly/turmapedalpratiqueemcasa" target="_blank">
                🌐 bit.ly/turmapedalpratiqueemcasa
              </a>
            </p>
          </Space>
        </Collapse.Panel>
        <Collapse.Panel header="Quadro de Horários">
          <p>
            <img src="/images/bike/horarios.png" width={'100%'} alt="" />
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Solicitar manutenção">
          <iframe
            src="https://form.typeform.com/to/tANzURg0"
            width="100%"
            height="400"
            frameborder="0"
            allowfullscreen="true"
          ></iframe>
        </Collapse.Panel>
        <Collapse.Panel header="Loja Pratique">
          <p className="p-10 text-center">
            <a href="https://lojapratique.com.br/" target="_blank">
              <img src="/images/bike/loja.png" width={200} alt="" />
            </a>
          </p>
        </Collapse.Panel>
        <Collapse.Panel header="Whatsapp">
          <p className="p-10 text-center">
            <a
              href="https://api.whatsapp.com/send?1=pt_BR&phone=5531984272283%20&text=Ol%C3%A1,%20estou%20no%20app,%20e%20preciso%20de%20ajuda."
              target="_blank"
            >
              <img src="/images/bike/whats.png" width={150} alt="" />
            </a>
          </p>
        </Collapse.Panel>
      </Collapse>
    </>
  )
}
