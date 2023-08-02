import { Alert, Button, Checkbox, Col, Form, Input, Modal, Row, Typography, message, theme } from 'antd'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Recovery from './_Recovery'
import { resetModalRecovery, setModalRecovery, setModalRegister } from '@/redux/slices/login'
import Register from './_Register'

export default function LoginView() {
  const { token } = theme.useToken()
  const { loading, modalRegister, modalRecovery } = useSelector(state => state.login)
  const searchParams = useSearchParams()
  const { signIn } = useContext(AuthContext)
  const dispath = useDispatch()
  const router = useRouter()

  const error = searchParams.get('error')

  const onFinish = async values => {
    const login = await signIn(values)
    if (!login) {
      message.error('Usuário ou senha invalidos!')
      router.push({
        pathname: '/',
        query: { error: 'true' }
      })
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
      <Modal
        title="Cadastre-se"
        open={modalRegister}
        footer={null}
        onCancel={() => dispath(setModalRegister(false))}
        centered
      >
        <Register />
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
            {error && (
              <Alert
                message="Usuário ou senha invalidos!"
                description={
                  <>
                    Esqueceu sua senha? <a onClick={() => dispath(setModalRecovery(true))}>Clique aqui</a>.
                  </>
                }
                type="error"
                showIcon
              />
            )}

            <Typography.Paragraph className="text-center" style={{ color: 'white', marginTop: error ? 10 : -10 }}>
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
          <Row gutter={6}>
            <Col span={12}>
              <Button className="mb-4" type="primary" onClick={() => dispath(setModalRegister(true))} block>
                Cadastre-se
              </Button>
            </Col>
            <Col span={12}>
              <Button className="mb-4" onClick={() => dispath(setModalRecovery(true))} block>
                Esqueci minha senha
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
