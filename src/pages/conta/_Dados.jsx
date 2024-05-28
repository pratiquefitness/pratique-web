import { updateConta } from '@/redux/actions/conta';
import { Button, Form, Input, Space } from 'antd'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AvatarUploader from './_AvatarUploader';
import MiniCurriculum from '@/pages/conta/_MiniCurriculum';
const { TextArea } = Input;

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { loading, isPersonal } = useSelector(state => state.conta)

  const onUpdate = values => {
    if (typeof values.user_pass !== 'undefined') {
      dispatch(updateConta(values))
    } else {
      dispatch(
        updateConta({
          user_nicename: values.user_nicename,
          user_email: values.user_email,
          curriculo: values.curriculo,
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
      {
        isPersonal ?
          <div className={'d-flex justify-space-between mb-4'}>
            <Space size={'large'}>
              <AvatarUploader />
              <MiniCurriculum />
            </Space>
          </div>
          :
          <AvatarUploader />
      }

      <Form layout="vertical" form={form} onFinish={onUpdate}>
        <Form.Item label="Meu nome" name="user_nicename">
          <Input />
        </Form.Item>
        {
          isPersonal &&
            <Form.Item label="Mini Currículo" name="curriculo">
              <TextArea />
            </Form.Item>
        }
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
