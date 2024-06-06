import { updateConta } from '@/redux/actions/conta'
import { AutoComplete, Button, Form, Input, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarUploader from './_AvatarUploader'
import MiniCurriculum from '@/pages/conta/_MiniCurriculum'

const { TextArea } = Input
import estadosCIdades from '@/constants/estadosCidades'

export default function Dados() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { usuario } = useSelector(state => state.login)
  const { loading, isPersonal } = useSelector(state => state.conta)
  const [estados, setEstados] = useState({
    data: []
  })
  const [cidades, setCidades] = useState({
    data: []
  })
  const [value, setValue] = useState({
    estado: '',
    cidade: '',
  })
  const [estadoEscolhido, setEstadoEscolhido] = useState('')
  const [cidadeEscolhida, setCidadeEscolhida] = useState('')

  const onUpdate = values => {
    if (typeof values.user_pass !== 'undefined') {
      dispatch(updateConta(values))
    } else {
      dispatch(
        updateConta({
          user_nicename: values.user_nicename,
          user_email: values.user_email,
          curriculo: values.curriculo,
          estado: values.estado,
          cidade: values.telefone,
          cpf: values.cpf,
          email: values.email,
          telefone: String(values.telefone)
        })
      )
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      user_nicename: usuario.user_nicename,
      user_email: usuario.user_email,
      curriculo: usuario.curriculo,
      cpf: usuario.cpf,
      estado: usuario.estado,
      cidade: usuario.cidade,
      email: usuario.email,
      telefone: usuario.telefone,
    })
  }, [])

  useEffect(() => {
    if(usuario.estado?.length) {
      onSelectEstado(usuario.estado);
    }
  }, [usuario.estado]);

  useEffect(() => {
    if (estadosCIdades.estados?.length) {
      setEstados(prevState => ({
        ...prevState,
        data: estadosCIdades.estados.reduce((o, option) => {
          return [...o, { value: option.nome }]
        }, [])
      }))
    }
  }, [])

  const onSelectEstado = value => {
    setEstadoEscolhido(value)
    const cidadesJson = estadosCIdades.estados.filter((estado) => estado.nome === value);
    setCidades(prevState => ({
      ...prevState,
      data: cidadesJson[0].cidades.reduce((o, option) => {
        return [...o, { value: option }]
      }, [])
    }));
  }

  const onSelectCidade = value => {
    setCidadeEscolhida(value);
  }

  return (
    <>
      {
        usuario.professor === 1 ?
          usuario.curriculo !== null ?
            <div className={'d-flex justify-space-between mb-4'}>
              <Space size={'large'}>
                <AvatarUploader />
                <MiniCurriculum />
              </Space>
            </div> :
            <AvatarUploader />
          :
          <AvatarUploader />
      }

      <Form layout="vertical" form={form} onFinish={onUpdate}>
        <Form.Item label="Meu nome" name="user_nicename">
          <Input />
        </Form.Item>
        <Form.Item
          label="CPF"
          name="cpf"
          rules={[{ min: 11, message:'Digite um CPF válido', pattern: new RegExp(/^[0-9]+$/) }]}
        >
          <Input
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          label="Telefone Celular com DDD"
          name="telefone"
           rules={[{ min: 11, message:'Digite um telefone válido: 31999999999', pattern: new RegExp(/^[0-9]+$/) }]}
        >
          <Input
            maxLength={11}
          />
        </Form.Item>
        <Form.Item
          label="Estado"
          name="estado"
        >
          <AutoComplete
            id={'estado'}
            value={value.estado}
            options={estados.data}
            style={{
              width: '100%'
            }}
            onSelect={(e) => onSelectEstado(e)}
            onChange={(value) => {
              setCidadeEscolhida('')
              setEstadoEscolhido('')
              setValue(prevState => ({
                ...prevState,
                estado: value,
                cidade: ''
              }))
              form.setFieldsValue({
                cidade: ''
              })
            }}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            placeholder="Selecione um estado"
            allowClear
            onClear={() => {
              setCidadeEscolhida('')
              setEstadoEscolhido('')
              setValue(prevState => ({
                ...prevState,
                estado: '',
                cidade: ''
              }))
              form.setFieldsValue({
                cidade: ''
              })
            }}
          />
        </Form.Item>
        <Form.Item
          label="Cidade"
          name="cidade"
        >
          <AutoComplete
            id={'cidade'}
            value={value.cidade}
            options={cidades.data}
            style={{
              width: '100%'
            }}
            onSelect={(e) => onSelectCidade(e)}
            onChange={(value) => {
              setCidadeEscolhida('')
              setValue(prevState => ({
                ...prevState,
                cidade: value
              }))
            }}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            placeholder="Selecione uma cidade"
            allowClear
            onClear={() => {
              setCidadeEscolhida('');
              setValue(prevState => ({
                ...prevState,
                cidade: ''
              }))
            }}
          />
        </Form.Item>

        {
          usuario.professor === 1 &&
          <Form.Item label="Mini Currículo" name="curriculo">
            <TextArea rows={7} placeholder="No máximo 140 caracteres" maxLength={140} />
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
