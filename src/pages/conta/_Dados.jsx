import { updateConta } from '@/redux/actions/conta'
import { Button, Form, Input, Upload, message } from 'antd'
import axios from 'axios'
import { useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import AvatarUploader from './_AvatarUploader'

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { loading } = useSelector(state => state.conta)

  const onUpdate = values => {
    if (typeof values.user_pass !== 'undefined') {
      dispatch(updateConta(values))
    } else {
      dispatch(
        updateConta({
          user_nicename: values.user_nicename,
          user_email: values.user_email
        })
      )
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      user_nicename: usuario.user_nicename,
      user_email: usuario.user_email
    })
  }, [])

  return (
    <>
      <AvatarUploader />
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
        <Button type="primary" htmlType="submit" loading={loading} block>
          Atualizar
        </Button>
      </Form>
    </>
  )
}
