import { Button, Checkbox, Form, Input, message } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAuthenticated, setThemeMode } from '@/redux/slices/global'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export default function LoginView() {
  const { loading } = useSelector(state => state.login)
  const { signIn } = useContext(AuthContext)
  const dispath = useDispatch()
  const router = useRouter()

  const onFinish = async values => {
    const login = await signIn(values)
    if (!login) {
      message.error('Usuário ou senha invalidos!')
    }
    //dispath(setThemeMode(values.username))
  }

  return (
    <div className="login login-background">
      <div className="logo">
        <Image src="/logo.svg" width={220} height={58} />
      </div>
      <div className="box-login">
        <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} autoComplete="off">
          <Form.Item name="email" rules={[{ required: true, message: 'Preencha seu e-mail...' }]}>
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item name="senha" rules={[{ required: true, message: 'Preencha sua senha...' }]}>
            <Input.Password placeholder="Senha" />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center text-white">
          Ao clicar em ENTRAR
          <br /> você concorda com os nossos termos.
        </p>
      </div>
    </div>
  )
}
