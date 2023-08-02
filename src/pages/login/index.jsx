import { Button, Checkbox, Col, Form, Input, Modal, Row, Typography, message, theme } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Recovery from './_Recovery'
import { resetModalRecovery, setModalRecovery } from '@/redux/slices/login'

export default function LoginView() {
  const { token } = theme.useToken()
  const { loading, modalRecovery } = useSelector(state => state.login)
  const { signIn } = useContext(AuthContext)
  const dispath = useDispatch()
  const router = useRouter()

  const onFinish = async values => {
    const login = await signIn(values)
    if (!login) {
      message.error('Usuário ou senha invalidos!')
    }
  }

  return (
    <div className="login login-background" style={{ backgroundColor: token.colorBgBase }}>
      <Modal
        title="Recuperar senha"
        open={modalRecovery}
        footer={null}
        onCancel={() => dispath(resetModalRecovery())}
        centered
      >
        <Recovery />
      </Modal>
      <div className="w-100 p-6" style={{ maxWidth: 400 }}>
        <div className="logo">
          <Image
            src="/logo.svg"
            width={220}
            height={58}
            style={{ filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))' }}
          />
        </div>
        <div className="box-login">
          <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
            <Form.Item name="email" rules={[{ required: true, message: 'Preencha seu e-mail...' }]}>
              <Input placeholder="E-mail" />
            </Form.Item>

            <Form.Item name="senha" rules={[{ required: true, message: 'Preencha sua senha...' }]}>
              <Input.Password placeholder="Senha" />
            </Form.Item>

            <Typography.Paragraph className="text-center" style={{ color: 'white', marginTop: -10 }}>
              Senha padrão: 123
            </Typography.Paragraph>

            {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Entrar
              </Button>
            </Form.Item>
          </Form>

          <Typography.Paragraph className="text-center" style={{ color: 'white', marginTop: -10 }}>
            <small>Ao clicar em ENTRAR você concorda com os nossos termos.</small>
          </Typography.Paragraph>
          <Typography.Paragraph className="text-center" style={{ color: 'white' }}></Typography.Paragraph>
          <Button className="mb-4" onClick={() => dispath(setModalRecovery(true))} block>
            Alterar minha senha
          </Button>
        </div>
      </div>
    </div>
  )
}
