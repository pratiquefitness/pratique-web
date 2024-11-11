import { Button, Col, Row, Space, Tabs, Typography, theme } from "antd";
import { Collapse, Panel } from "@/components";
import AulasColetivas from "../aulas_coletivas/_AulasColetivas";
import BannersPowerCycle from "./_BannersPowerCycle";

const { TabPane } = Tabs;

const items = [
  {
    key: "2",
    label: "Aulas",
    children: (
      <div>
        <div className="mt-4">
          <BannersPowerCycle />
        </div>
        <AulasColetivas tema={"netFit_spinning"} />
      </div>
    )
  },
  {
    key: "1",
    label: "Instruções",
    children: (
      <div>
        <div className="text-center">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/UQ4NWXJfDCc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <Typography.Title level={2}>Instruções</Typography.Title>
          <Typography.Paragraph>
            Para uma melhor experiência, assista às aulas em uma tela maior. Sugestão - Smart TV
          </Typography.Paragraph>
          <Typography.Paragraph>
            Siga o Passo a passo para participar das aulas:
          </Typography.Paragraph>
        </div>
        <Collapse>
          <Panel header="1º Assista aulas ao vivo no YouTube">
            <Space direction="vertical" className="w-100">
              <p className="text-center">
                Assista às nossas aulas no YouTube pela sua TV ou Computador através do canal Power
                Cycle
              </p>
              <Row className="mt-10">
                <Col span={24} className="text-center">
                  <img src="/images/webp/bike/1.webp" width={100} alt="" />
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
                  <img src="/images/webp/bike/play.webp" width={150} alt="" />
                </a>
                <a
                  href="https://apps.apple.com/br/app/pratique-em-casa/id1520321614"
                  target="_blank"
                >
                  <img src="/images/webp/bike/store.webp" width={150} alt="" />
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Panel>
          <Panel header="Quadro de Horários">
            <p>
              <img src="/images/webp/bike/horarios.webp" width={"100%"} alt="" />
            </p>
          </Panel>
          <Panel header="Solicitar manutenção">
            <a href="https://api.whatsapp.com/send?phone=5531984272283&text=Ol%C3%A1%2C%20solicito%20manuten%C3%A7%C3%A3o%20da%20bike">
              <br />
              <center>
                <img src="/images/webp/bike/whats.webp" style={{ width: "300px" }} />
              </center>
              <br />
            </a>
          </Panel>

          <Panel header="Whatsapp">
            <a
              href="https://api.whatsapp.com/send?1=pt_BR&phone=5531984272283%20&text=Ol%C3%A1,%20estou%20no%20app,%20e%20preciso%20de%20ajuda."
              target="_blank"
            >
              <img src="/images/webp/bike/whats.webp" style={{ width: "300px" }} />
            </a>
          </Panel>
        </Collapse>
      </div>
    )
  }
];

export default function Bike() {
  return (
    <div>
      <div className="text-center">
        <img src="images/bike/cycle.webp" width={"50%"} alt="" style={{ maxWidth: 200 }} />
      </div>

      <Tabs defaultActiveKey="0" items={items} centered size="large" />
    </div>
  );
}
