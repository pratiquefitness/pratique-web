import {
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
  message
} from "antd";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateConta } from "@/redux/actions/conta";
import { AuthContext } from "@/contexts/AuthContext";
import { LikeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Paragraph, Title } = Typography;

export default function EvaluationForm() {
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);
  const { loading } = useSelector((state) => state.conta);
  const [formCheckPassword] = Form.useForm();
  const [formEvaluation] = Form.useForm();
  const { signOut } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [evaluationSteps, setEvaluationSteps] = useState([
    {
      question: "Nome do Professor que realizou o exame",
      type: "text",
      answer: ""
    },
    {
      question: "E-mail do Professor",
      type: "email",
      answer: ""
    },
    {
      question: "Na página principal (Home) quais funções o avaliador te apresentou?",
      type: "radio",
      options: [
        "Powerflix, Aulas On Demand (online)",
        "Treinos Desportivos, Atividades de Bem-Estar",
        "Fale com a Pratique: SAC e Horário de Funcionamento",
        "Todas as opções anteriores"
      ],
      answer: ""
    },
    {
      question:
        "Na opção da Ficha de Treino marque a alternativa que contém as funções que o avaliador te apresentou:",
      type: "radio",
      options: [
        "Monte Seu Treino",
        "Botão Fale com o Professor",
        "Visualização (videos) e explicação dos exercícios",
        "Todas as opções anteriores"
      ],
      answer: ""
    },
    {
      question: "Como você avaliaria a sua experiência na avaliação física da Pratique?",
      type: "rate",
      answer: 0
    }
  ]);
  const [finished, setFinished] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [npsModalVisible, setNpsModalVisible] = useState(false);
  const [lastSubmissionDate, setLastSubmissionDate] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (usuario.user_pass === "202cb962ac59075b964b07152d234b70") {
      setIsModalVisible(true);
    } else {
      checkNPS(usuario.ID, usuario.user_email);
    }
  }, [usuario]);

  const onCheckPassword = async ({ password }) => {
    try {
      await dispatch(updateConta({ user_pass: password }));
      message.success("Senha alterada com sucesso!");
      setIsModalVisible(false);
      // Verificar o NPS apenas após a verificação da senha
      await checkNPS(usuario.ID, usuario.user_email);
    } catch {
      message.error("Erro ao alterar senha.");
    }
  };

  const checkNPS = async (user_id, user_email) => {
    try {
      const response = await axios.post("/api/nps", {
        user_id,
        user_email,
        check_only: true
      });
      const { canSubmit, lastSubmissionDate, daysRemaining } = response.data;
      setCanSubmit(canSubmit);
      setLastSubmissionDate(lastSubmissionDate);
      setDaysRemaining(daysRemaining);
      if (!canSubmit) {
        setNpsModalVisible(true);
      }
    } catch (error) {
      message.error("Erro ao verificar NPS.");
    }
  };

  const handleNext = (values) => {
    const newSteps = [...evaluationSteps];
    newSteps[currentStep].answer = values.answer;
    setEvaluationSteps(newSteps);

    if (currentStep < evaluationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      formEvaluation.resetFields();
    } else {
      axios
        .post("/api/nps", {
          user_id: usuario.ID,
          user_email: usuario.user_email,
          professor_name: newSteps[0].answer,
          professor_email: newSteps[1].answer,
          responses: newSteps.slice(2).map((step, index) => ({
            question: step.question,
            answer: `${index + 1} - ${step.answer}`
          }))
        })
        .then((response) => {
          message.success("Avaliação enviada com sucesso!");
          setFinished(true);
        })
        .catch((error) => {
          message.error("Erro ao enviar avaliação.");
        });
    }
  };

  const renderQuestion = () => {
    const currentQuestion = evaluationSteps[currentStep];

    switch (currentQuestion.type) {
      case "text":
      case "email":
        return (
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Este campo é obrigatório" }]}
          >
            <Input type={currentQuestion.type} placeholder={currentQuestion.question} />
          </Form.Item>
        );
      case "radio":
        return (
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Este campo é obrigatório" }]}
          >
            <Radio.Group style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {currentQuestion.options.map((option, index) => (
                <Radio
                  value={`${index + 1} - ${option}`}
                  key={option}
                  style={{
                    fontSize: "16px",
                    padding: "8px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)"
                  }}
                >
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        );
      case "checkbox":
        return (
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Este campo é obrigatório" }]}
          >
            <Checkbox.Group>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {currentQuestion.options.map((option, index) => (
                  <Checkbox
                    value={`${index + 1} - ${option}`}
                    key={option}
                    style={{ marginBottom: 8 }}
                  >
                    {option}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          </Form.Item>
        );
      case "rate":
        return (
          <Form.Item
            name="answer"
            rules={[{ required: true, message: "Este campo é obrigatório" }]}
          >
            <Rate />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  const steps = [
    {
      title: "Verificação de Senha",
      content: (
        <Form layout="vertical" form={formCheckPassword} onFinish={onCheckPassword}>
          <Space direction="vertical" className="w-100" style={{ textAlign: "center" }}>
            <Paragraph>Para continuar, você precisa alterar sua senha.</Paragraph>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Digite uma nova senha." }]}
            >
              <Input.Password placeholder="Digite sua nova senha" />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Confirme sua nova senha."
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("As senhas não coincidem."));
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
      )
    },
    {
      title: "Avaliação",
      content: (
        <Form layout="vertical" form={formEvaluation} onFinish={handleNext}>
          <Space direction="vertical" className="w-100" style={{ textAlign: "left" }}>
            <Paragraph
              style={{
                color: "#c70630",
                fontSize: "18px",
                fontWeight: "bold",
                lineHeight: "19px",
                textAlign: "center"
              }}
            >
              {evaluationSteps[currentStep].question}
            </Paragraph>
            {renderQuestion()}
            <div style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit" disabled={!canSubmit}>
                {currentStep < evaluationSteps.length - 1 ? "Próximo" : "Finalizar"}
              </Button>
            </div>
          </Space>
        </Form>
      )
    }
  ];

  if (finished) {
    return (
      <Row justify="center">
        <Col span={24} className="mt-4" style={{ textAlign: "center" }}>
          <Space direction="vertical" className="w-100" style={{ textAlign: "center" }}>
            <Title level={2}>Obrigado por sua contribuição</Title>
            <LikeOutlined style={{ fontSize: "64px", color: "#08c" }} />
          </Space>
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Row justify="center">
        <Col span={24} className="mt-4" style={{ maxWidth: "600px" }}>
          <Steps
            direction="horizontal"
            current={isModalVisible ? 0 : 1}
            items={steps.map((item) => ({ title: item.title }))}
            size="small"
            style={{ marginBottom: "24px" }}
          />
          <div
            className="py-6"
            style={{
              textAlign: "center",
              paddingTop: "0 !important",
              paddingBottom: "24px",
              marginTop: "-30px"
            }}
          >
            {steps[isModalVisible ? 0 : 1].content}
          </div>
        </Col>
      </Row>

      <Modal
        title="Alterar Senha"
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        {steps[0].content}
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
        <Space direction="vertical" className="w-100" style={{ textAlign: "center" }}>
          <ExclamationCircleOutlined style={{ fontSize: "64px", color: "#f5222d" }} />
          <Title level={4}>Você já fez uma avaliação nos últimos 30 dias.</Title>
          <Paragraph>
            Última avaliação:{" "}
            {lastSubmissionDate ? new Date(lastSubmissionDate).toLocaleDateString() : "N/A"} <br />
            Dias restantes para poder fazer outra avaliação: {daysRemaining} dias
          </Paragraph>
        </Space>
      </Modal>
    </>
  );
}
