import { Button, Checkbox, Form, Input } from 'antd'
import './style.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const onFinish = values => {
    console.log('Success:', values)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="login login-background">
      <div className="logo">
        <Image src="/logo.svg" width={220} height={58} />
      </div>
      <div className="box-login">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="E-mail" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Senha" />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" onClick={() => router.push('/treino')} block>
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
