import { updateConta, excluirConta } from '@/redux/actions/conta'
import { Button, Form, Input, Upload, message, Typography, Modal } from 'antd'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { FaUpload } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import AvatarUploader from './_AvatarUploader'

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [excluirContaModal, setExcluirContaModal] = useState(false)
  const { usuario } = useSelector(state => state.login)
  const { loading } = useSelector(state => state.conta)
  const { signOut } = useContext(AuthContext)

  const { Title, Text } = Typography

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

  const onDelete = () => {
    dispatch(excluirConta())
    signOut()
  }

  const abreExcluirContaModal = () => {
    setExcluirContaModal(true)
  }

  useEffect(() => {
    form.setFieldsValue({
      user_nicename: usuario.user_nicename,
      user_email: usuario.user_email
    })
  }, [])

  return (
    <>
      <Modal title="Excluir Conta" onCancel={() => setExcluirContaModal(false)} open={excluirContaModal} footer={null}>
        <div className="d-flex flex-column mt-6 gap-4">
          <Text type="primary">Você realmente quer excluir sua conta?</Text>
          <Text type="primary">Você não terá acesso as aulas e outros benefícios do aplicativo da Pratique</Text>
        </div>
        <div className="d-flex justify-center mt-6 gap-4">
          <Button onClick={() => setExcluirContaModal(false)}>Cancelar</Button>
          <Button type="primary" onClick={() => onDelete()}>
            Excluir conta
          </Button>
        </div>
      </Modal>
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
      <div className="d-flex flex-column mt-6 gap-4">
        <Text type="primary">Deseja excluir seus dados?</Text>
        <Button onClick={abreExcluirContaModal}>Excluir conta</Button>
      </div>
    </>
  )
}
