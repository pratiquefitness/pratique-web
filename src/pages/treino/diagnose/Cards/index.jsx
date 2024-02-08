import { Loading } from '@/components'
import { Input, Form, Select, Button, theme, InputNumber } from 'antd'
import { useEffect, useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { useDispatch, useSelector } from 'react-redux'
import FormularioPrincipal from './Perguntas'
import { getPerguntasDiagnose } from '@/redux/actions/diagnose'

export default function Diagnose() {
  const { loadingPeso, loadingAnotacoes } = useSelector(state => state.treino)
  const [iniciarPergunta, setIniciarPergunta] = useState(false)
  const { token } = theme.useToken()
  const dispatch = useDispatch()
  const { data, loading } = useSelector(state => state.diagnose)
  const [diagnoseData, setDiagnoseData] = useState([])

  const { themeMode } = useSelector(state => state.global)

  useEffect(() => {
    dispatch(getPerguntasDiagnose())
  }, [])

  const handleIniciarPergunta = () => {
    setIniciarPergunta(!iniciarPergunta)
  }
  const [formRegister] = Form.useForm()

  const onRegisterPersonalData = values => {
    setDiagnoseData([...diagnoseData, values])

    formRegister.resetFields()
    handleIniciarPergunta()
  }

  const onRegisterPerguntas = values => {
    console.log('valores',perguntas)

    //setDiagnoseData([...diagnoseData, values])

    //formRegister.resetFields()
    //handleIniciarPergunta()
  }

  return (
    <Loading spinning={loading}>
      {!iniciarPergunta ? (
        <div className="d-flex justify-center">
          <div className="p-4 w-95 " style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <div className="text-center">
              <h2>Preencha os dados a seguir para criarmos seu treino</h2>
            </div>
            <Form
              form={formRegister}
              onFinish={onRegisterPersonalData}
              layout="vertical"
              className="my-4 d-flex flex-column gap-4 w-100"
            >
              <div className="d-flex flex-column gap-2">
                <Form.Item
                  label="Nome completo"
                  name="diagnoseNomeCompleto"
                  rules={[{ required: true, message: 'Digite seu nome.' }]}
                >
                  <Input placeholder="Digite seu nome" />
                </Form.Item>
                <Form.Item
                  label="E-mail"
                  name="diagnoseEmail"
                  rules={[
                    { required: true, message: 'Digite seu e-mail.' },
                    { type: 'email', message: 'Digite um e-mail válido.' }
                  ]}
                >
                  <Input placeholder="Digite seu e-mail" />
                </Form.Item>
                <Form.Item label="Digite seu whatsapp" name="diagnoseTelefone">
                  <ReactInputMask mask="(99) 99999-9999">{inputProps => <Input {...inputProps} />}</ReactInputMask>
                </Form.Item>
                <Form.Item
                  label="Qual seu peso atual?"
                  name="diagnosePeso"
                  id="diagnosePeso"
                  rules={[
                    {
                      required: true,
                      message: 'Digite seu peso'
                    }
                  ]}
                >
                  <InputNumber />
                </Form.Item>
              </div>
              <div className="d-flex flex-column gap-2">
                <label name="labelSexo" htmlFor="telefone">
                  Sexo
                </label>
                <Select id="sexo" name="sexo" rules={[{ required: true, message: 'Qual sexo?' }]}>
                  <Select.Option value="masculino">Masculino</Select.Option>
                  <Select.Option value="feminino">Feminino</Select.Option>
                </Select>
              </div>
              <Button className="mt-8" type="primary" htmlType="submit" loading={loading}>
                Próximo
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <FormularioPrincipal onRegisterPerguntas={onRegisterPerguntas} />
      )}
    </Loading>
  )
}
