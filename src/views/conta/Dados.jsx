import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import { FaTrash } from 'react-icons/fa'

export default function Dados() {
  return (
    <Form>
      <Form.Item label="Meu nome" name="nome">
        <Input />
      </Form.Item>
      <Form.Item label="Senha" name="nome">
        <Input type="password" />
      </Form.Item>
      <Form.Item label="Email" name="nome">
        <Input type="password" />
      </Form.Item>
      <Space direction="vertical" size={16} className="w-100">
        <Button type="primary" block>
          Atualizar
        </Button>
        <Card title="Deletar conta">
          <Typography.Paragraph>
            Exclua sua conta e todos os seus dados de origem. Isso é irreversível.
          </Typography.Paragraph>
          <Button icon={<FaTrash />} block>
            Deletar minha conta
          </Button>
        </Card>
      </Space>
    </Form>
  )
}
