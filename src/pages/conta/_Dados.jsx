import { updateConta } from '@/redux/actions/conta'
import { Button, Card, Col, Form, Input, Row, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)

  const onUpdate = values => {
    dispatch(updateConta(values))
  }

  useEffect(() => {
    form.setFieldsValue(usuario)
  }, [])

  return (
    <Form layout="vertical" form={form} onFinish={onUpdate}>
      <Form.Item label="Meu nome" name="user_nicename">
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="user_email">
        <Input />
      </Form.Item>
      <Form.Item label="Senha" name="user_pass">
        <Input type="password" />
      </Form.Item>
      <Space direction="vertical" size={16} className="w-100">
        <Button type="primary" htmlType="submit" block>
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
