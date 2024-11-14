import React, { useEffect, useState, useContext } from 'react'
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Modal,
  Radio,
  Steps,
  Typography,
  Rate,
  message,
  Select
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { updateConta } from '@/redux/actions/conta'
import { AuthContext } from '@/contexts/AuthContext'
import { LikeOutlined, ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Paragraph, Title } = Typography
const { Option } = Select

export default function Nps() {
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)
  const { loading } = useSelector(state => state.conta)
  const [formCheckPassword] = Form.useForm()
  const [formEvaluation] = Form.useForm()
  const { signOut } = useContext(AuthContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [finished, setFinished] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const [npsModalVisible, setNpsModalVisible] = useState(false)
  const [lastSubmissionDate, setLastSubmissionDate] = useState(null)
  const [daysRemaining, setDaysRemaining] = useState(0)
  const [passwordChanged, setPasswordChanged] = useState(false)

  // Estados para a unidade e professores
  const [unit, setUnit] = useState(null)
  const [unidades, setUnidades] = useState([]) // Lista de unidades disponíveis
  const [professors, setProfessors] = useState([])
  const [showUnitSelector, setShowUnitSelector] = useState(false)

  // Inicializar evaluationSteps fora do useEffect
  const initialSteps = [
    {
      question: 'Selecione o Professor que realizou o exame',
      type: 'professor_selection',
      answer: ''
    },
    {
      question: 'Na página principal (Home) quais funções o avaliador te apresentou?',
      type: 'radio',
      options: [
        'Powerflix, Aulas On Demand (online)',
        'Treinos Desportivos, Atividades de Bem-Estar',
        'Fale com a Pratique: SAC e Horário de Funcionamento',
        'Todas as opções anteriores'
      ],
      answer: ''
    },
    {
      question: 'Na opção da Ficha de Treino marque a alternativa que contém as funções que o avaliador te apresentou:',
      type: 'radio',
      options: [
        'Monte Seu Treino',
        'Botão Fale com o Professor',
        'Visualização (vídeos) e explicação dos exercícios',
        'Todas as opções anteriores'
      ],
      answer: ''
    },
    {
      question: 'Como você avaliaria a sua experiência na avaliação física da Pratique?',
      type: 'rate',
      answer: 0
    }
  ]

  const [evaluationSteps, setEvaluationSteps] = useState(initialSteps)

  useEffect(() => {
    if (usuario && usuario.unidade) {
      setUnit(usuario.unidade)
    }
  }, [usuario])

  useEffect(() => {
    if (usuario && usuario.user_pass !== '202cb962ac59075b964b07152d234b70') {
      setPasswordChanged(true)
      checkNPS(usuario.ID, usuario.user_email)
    } else if (usuario) {
      setIsModalVisible(true)
    }
  }, [usuario])

  const onCheckPassword = async ({ password }) => {
    if (password === '123' || password === '202cb962ac59075b964b07152d234b70') {
      message.error('Você não pode usar esta senha. Escolha outra senha.')
      return
    }
    try {
      await dispatch(updateConta({ user_pass: password }))
      message.success('Senha alterada com sucesso!')
      setIsModalVisible(false)
      setPasswordChanged(true)
      await checkNPS(usuario.ID, usuario.user_email)
    } catch {
      message.error('Erro ao alterar senha.')
    }
  }

  const checkNPS = async (user_id, user_email) => {
    try {
      const response = await axios.post('/api/nps', {
        user_id,
        user_email,
        check_only: true
      })
      const { canSubmit, lastSubmissionDate, daysRemaining } = response.data
      setCanSubmit(canSubmit)
      setLastSubmissionDate(lastSubmissionDate)
      setDaysRemaining(daysRemaining)
      if (!canSubmit) {
        setNpsModalVisible(true)
      }
    } catch (error) {
      message.error('Erro ao verificar NPS.')
    }
  }

  // Função para buscar a lista de unidades disponíveis
  const fetchUnidades = async () => {
    try {
      const response = await axios.get('/api/getUnidades')
      setUnidades(response.data.unidades)
    } catch (error) {
      message.error('Erro ao carregar as unidades.')
    }
  }

  // Função para buscar os professores da unidade selecionada
  const fetchProfessors = async () => {
    try {
      const response = await axios.post('/api/getProfessors', {
        unidade: unit // unit deve ser o nome da unidade
      })
      setProfessors(response.data.professors)
    } catch (error) {
      message.error('Erro ao carregar os professores.')
    }
  }

  useEffect(() => {
    fetchUnidades()
  }, [])

  useEffect(() => {
    if (unit) {
      fetchProfessors()
    }
  }, [unit])

  const handleNext = values => {
    const newSteps = [...evaluationSteps]
    newSteps[currentStep].answer = values.answer
    setEvaluationSteps(newSteps)

    if (currentStep < evaluationSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      formEvaluation.resetFields()
    } else {
      // Envio dos dados, incluindo as informações do professor selecionado
      axios
        .post('/api/nps', {
          user_id: usuario.ID,
          user_email: usuario.user_email,
          professor_name: newSteps[0].answer.usuarios_nome,
          professor_email: newSteps[0].answer.usuarios_email,
          responses: newSteps.slice(1).map((step, index) => ({
            question: step.question,
            answer: `${index + 1} - ${step.answer}`
          }))
        })
        .then(response => {
          message.success('Avaliação enviada com sucesso!')
          setFinished(true)
        })
        .catch(error => {
          message.error('Erro ao enviar avaliação.')
        })
    }
  }

  const renderQuestion = () => {
    const currentQuestion = evaluationSteps[currentStep]

    switch (currentQuestion.type) {
      case 'professor_selection':
        return (
          <>
            <div className="unit-selector">
              <div className="unit-info">
                <span className="unit-label">Unidade:</span>
                <span className="unit-name">{unit}</span>
              </div>
              <Button type="link" onClick={() => setShowUnitSelector(true)}>
                Trocar de unidade
              </Button>
            </div>

            <Form.Item name="answer" rules={[{ required: true, message: 'Por favor, selecione um professor.' }]}>
              <div className="professor-list">
                {professors.map(professor => (
                  <div
                    className="professor-card"
                    key={professor.usuarios_id}
                    onClick={() => {
                      formEvaluation.setFieldsValue({ answer: professor })
                      formEvaluation.submit()
                    }}
                  >
                    <Avatar
                      size={64}
                      src={professor.avatar_image || '/images/default-avatar.png'}
                      alt={professor.usuarios_nome}
                    />
                    <div className="professor-details">
                      <div className="professor-name">{professor.usuarios_nome}</div>
                      {/* Se houver outras informações, como email */}
                      {/* <div className="professor-email">{professor.usuarios_email}</div> */}
                    </div>
                  </div>
                ))}
              </div>
            </Form.Item>
            <Button
              style={{
                backgroundColor: '#ed143d',
                color: '#fff',
                borderRadius: '10px',
                marginTop: '16px'
              }}
              block
              onClick={() => setShowUnitSelector(true)}
              icon={<QuestionCircleOutlined />} // Ícone adicionado aqui
            >
              Não encontrou o Professor?
            </Button>

            <Modal
              visible={showUnitSelector}
              onCancel={() => setShowUnitSelector(false)}
              onOk={() => {
                setShowUnitSelector(false)
                fetchProfessors()
              }}
            >
              <Select value={unit} onChange={value => setUnit(value)} style={{ width: '100%' }}>
                {unidades.map(unidade => (
                  <Option key={unidade.unidade_id} value={unidade.unidade_nome}>
                    {unidade.unidade_nome}
                  </Option>
                ))}
              </Select>
            </Modal>
          </>
        )
      case 'text':
      case 'email':
        return (
          <Form.Item name="answer" rules={[{ required: true, message: 'Este campo é obrigatório' }]}>
            <Input type={currentQuestion.type} placeholder={currentQuestion.question} />
          </Form.Item>
        )
      case 'radio':
        return (
          <Form.Item name="answer" rules={[{ required: true, message: 'Este campo é obrigatório' }]}>
            <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {currentQuestion.options.map((option, index) => (
                <Radio
                  value={option}
                  key={option}
                  style={{
                    fontSize: '16px',
                    padding: '8px',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        )
      case 'rate':
        return (
          <Form.Item name="answer" rules={[{ required: true, message: 'Este campo é obrigatório' }]}>
            <Rate />
          </Form.Item>
        )
      default:
        return null
    }
  }

  // Verificação antes de renderizar para evitar erros
  if (!usuario || !evaluationSteps[currentStep]) {
    return <div>Carregando...</div>
  }

  if (finished) {
    return (
      <Row justify="center">
        <Col span={24} className="mt-4" style={{ textAlign: 'center' }}>
          <Space direction="vertical" className="w-100" style={{ textAlign: 'center' }}>
            <Title level={2}>Obrigado por sua contribuição</Title>
            <LikeOutlined style={{ fontSize: '64px', color: '#08c' }} />
          </Space>
        </Col>
      </Row>
    )
  }

  return (
    <>
      <Row justify="center">
        <Col span={24} className="mt-4" style={{ maxWidth: '600px' }}>
          <div
            className="py-6"
            style={{
              textAlign: 'center',
              paddingTop: '0 !important',
              paddingBottom: '24px',
              marginTop: '-30px'
            }}
          >
            <Form layout="vertical" form={formEvaluation} onFinish={handleNext}>
              <Space direction="vertical" className="w-100" style={{ textAlign: 'left' }}>
                <Paragraph
                  style={{
                    color: '#c70630',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    lineHeight: '19px',
                    textAlign: 'center'
                  }}
                >
                  {evaluationSteps[currentStep].question}
                </Paragraph>
                {renderQuestion()}
                <div style={{ textAlign: 'center' }}>
                  {evaluationSteps[currentStep].type !== 'professor_selection' && (
                    <Button type="primary" htmlType="submit">
                      {currentStep < evaluationSteps.length - 1 ? 'Próximo' : 'Finalizar'}
                    </Button>
                  )}
                </div>
              </Space>
            </Form>
          </div>
        </Col>
      </Row>

      <Modal title="Alterar Senha" visible={isModalVisible} footer={null} maskClosable={false} closable={false}>
        <Form layout="vertical" form={formCheckPassword} onFinish={onCheckPassword}>
          <Space direction="vertical" className="w-100" style={{ textAlign: 'center' }}>
            <Paragraph>Para continuar, você precisa alterar sua senha.</Paragraph>
            <Form.Item name="password" rules={[{ required: true, message: 'Digite uma nova senha.' }]}>
              <Input.Password placeholder="Digite sua nova senha" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Confirme sua nova senha.'
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('As senhas não coincidem.'))
                  }
                })
              ]}
            >
              <Input.Password placeholder="Confirme sua nova senha" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Alterar Senha
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Avaliação já realizada"
        visible={npsModalVisible}
        footer={[
          <Button key="ok" type="primary" onClick={() => setNpsModalVisible(false)}>
            OK
          </Button>
        ]}
        onCancel={() => setNpsModalVisible(false)}
      >
        <Space direction="vertical" className="w-100" style={{ textAlign: 'center' }}>
          <ExclamationCircleOutlined style={{ fontSize: '64px', color: '#f5222d' }} />
          <Title level={4}>Você já fez uma avaliação nos últimos 30 dias.</Title>
          <Paragraph>
            Última avaliação: {lastSubmissionDate ? new Date(lastSubmissionDate).toLocaleDateString() : 'N/A'} <br />
            Dias restantes para poder fazer outra avaliação: {daysRemaining} dias
          </Paragraph>
        </Space>
      </Modal>
    </>
  )
}
