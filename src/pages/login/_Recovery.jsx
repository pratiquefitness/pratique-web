import { Button, Col, Form, Input, Row, Space, Steps, Typography } from 'antd'
import { changePassword, checkRecoveryCode, checkRecoveryEmail } from '@/redux/actions/login'
import { LoadingOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'

const { Paragraph } = Typography

export default function Recovery() {
  const dispatch = useDispatch()
  const [formCheckEmail] = Form.useForm()
  const [formCheckCode] = Form.useForm()
  const [formChangePassword] = Form.useForm()
  const { loading, modalRecoveryStep } = useSelector(state => state.login)

  const onCheckEmail = ({ email }) => {
    dispatch(checkRecoveryEmail(email))
  }

  const onCheckCode = ({ code }) => {
    dispatch(checkRecoveryCode(code))
  }

  const onChangePassword = ({ password }) => {
    dispatch(changePassword(password))
  }

  const steps = [
    {
      title: 'E-mail',
      icon: null,
      content: (
        <Form layout="vertical" form={formCheckEmail} onFinish={onCheckEmail}>
          <Space direction="vertical" className="w-100">
            <Paragraph>
              Informe o e-mail do seu cadastro, vamos te enviar um código para confirmar que este e-mail realmente é
              seu.
            </Paragraph>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Digite um e-mail.' },
                { type: 'email', message: 'Digite um e-mail válido.' }
              ]}
            >
              <Input placeholder="Digite seu e-mail" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Próximo
            </Button>
          </Space>
        </Form>
      )
    },
    {
      title: 'Código',
      icon: <LoadingOutlined />,
      content: (
        <Form layout="vertical" form={formCheckCode} onFinish={onCheckCode}>
          <Space direction="vertical" className="w-100">
            <Paragraph>Informe o código recebido por e-mail.</Paragraph>
            <Form.Item
              name="code"
              rules={[
                { required: true, message: 'Digite o código.' },
                { min: 6, message: 'O código tem 6 digitos.' }
              ]}
            >
              <Input placeholder="Digite seu código" max={6} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Verificar
            </Button>
          </Space>
        </Form>
      )
    },
    {
      title: 'Alterar',
      icon: null,
      content: (
        <Form layout="vertical" form={formChangePassword} onFinish={onChangePassword}>
          <Space direction="vertical" className="w-100">
            <Paragraph className="m-0">Digite sua nova senha.</Paragraph>
            <Form.Item name="password" rules={[{ required: true, message: 'Digite uma senha.' }]} hasFeedback>
              <Input.Password placeholder="Digite sua senha" />
            </Form.Item>
            <Paragraph className="m-0">Confirme sua nova senha.</Paragraph>
            <Form.Item
              name="rPassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Digite uma senha.'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('As senhas devem ser iguais.'))
                  }
                })
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Confirme sua senha" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Alterar Senha
            </Button>
          </Space>
        </Form>
      )
    }
  ]

  const items = steps.map((item, key) => ({
    key: item.title,
    title: item.title,
    icon: modalRecoveryStep === 1 && key === 1 ? item.icon : null
  }))

  return (
    <Row>
      <Col span={24} className="mt-4">
        <Steps current={modalRecoveryStep} items={items} size="small" responsive={false} />
        <div className="py-6">{steps[modalRecoveryStep].content}</div>
      </Col>
    </Row>
  )
}
