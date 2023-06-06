import { Carousel, Col, Row, Typography, theme } from 'antd'
import Image from 'next/image'

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

export default function InicioView() {
  const { token } = theme.useToken()
  return (
    <>
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
      <Title level={4} className="m-0">
        Você, Feliz e Saudável!
      </Title>
      <Text type="secondary">Exercícios e conteúdos para você</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/meditacao.png" fill />
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/aulas.png" fill />
          </div>
        </Col>
      </Row>
      <Row gutter={6}>
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/power.png" fill />
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/blog.png" fill />
          </div>
        </Col>
      </Row>
      <Title level={4} className="m-0 mt-6">
        SAC
      </Title>
      <Text type="secondary">Canais de atendimento da Pratique</Text>
      <Row gutter={6} className="mb-2 mt-2">
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/sac.png" fill />
          </div>
        </Col>
        <Col flex="auto">
          <div style={{ height: 100, position: 'relative' }}>
            <Image src="/images/horarios.png" fill />
          </div>
        </Col>
      </Row>
    </>
  )
}
