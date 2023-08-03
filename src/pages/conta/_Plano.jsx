import { Button, Card, Col, Row, Space } from 'antd'
import { FaWhatsapp } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Plano() {
  const { usuario } = useSelector(state => state.login)
  return (
    <Space direction="vertical" className="w-100">
      <Card title="Seu plano" size="small">
        <p>{usuario.plano || '-'}</p>
      </Card>
      <Card title="Sua unidade" size="small">
        <p>{usuario.unidade || '-'}</p>
      </Card>
      <a
        href="https://api.whatsapp.com/send?phone=553141411962&text=Ol%C3%A1%20estou%20no%20Aplicativo%20Pratique%20em%20Casa%20e%20gostaria%20de%20falar%20sobre%20meu%20plano."
        target="_blank"
      >
        <Button icon={<FaWhatsapp fill="#25D366" />} block>
          Dúvidas sobre meu plano
        </Button>
      </a>
    </Space>
  )
}
