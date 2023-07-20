import { updateConta } from '@/redux/actions/conta'
import { Button, Form, Input } from 'antd'
import { useEffect } from 'react'
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
        <Input disabled />
      </Form.Item>
      <Form.Item label="Senha" name="user_pass">
        <Input type="password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Atualizar
      </Button>
    </Form>
  )
}
