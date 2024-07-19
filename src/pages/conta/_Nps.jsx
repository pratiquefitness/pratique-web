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
import axios from "axios";
import { LikeOutlined } from "@ant-design/icons";

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
    { question: "Nome do Professor que realizou o exame", type: "text", answer: "" },
    { question: "E-mail do Professor", type: "email", answer: "" },
    {
      question: "Na orientação do módulo treino o que o avaliador te apresentou:",
      type: "radio",
      options: [
        "O PowerFlix que tem no seu aplicativo, com treinos do adaptativo até treinos específicos para jogar tênis , corrida , bike etc",
        "O módulo bem estar mental, com Aulas e ioga meditação Guiada que encontra na Home do Aplicativo.",
        "O avaliador me apresentou o treino específico montado para mim e seus exercícios e TAMBÉM me explicou a sessão MONTE SEU TREINO, botão FALE COM PROFESSOR, também me mostrou o Qrcode de TROCA DE TREINO fixado na academia."
      ],
      answer: ""
    },
    {
      question: "Utilidades e Atividades gratuitas e do Aplicativo foi lhe apresento:",
      type: "radio",
      options: [
        "On Demand aulas que o cliente Pratique pode fazer em casa como, Power Bum Bum / Power Dance / Ioga / Meditação Guiada / Abdominal / Powe Jump / ETC.",
        "Botão Fale com Professo Ajuste de treino",
        "Sessão - Monte seu treino.",
        "Fale com SAC",
        "Horário de Funcionamento.",
        "Foi me apresentado tudo."
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

  useEffect(() => {
    if (usuario.user_pass === "202cb962ac59075b964b07152d234b70") {
      setIsModalVisible(true);
    }
  }, [usuario]);

  const onCheckPassword = ({ password }) => {
    dispatch(updateConta({ user_pass: password }))
      .then(() => {
        message.success("Senha alterada com sucesso!");
        setIsModalVisible(false);
      })
      .catch(() => {
        message.error("Erro ao alterar senha.");
      });
  };

  const handleNext = (values) => {
    const newSteps = [...evaluationSteps];
    newSteps[currentStep].answer = values.answer;
    setEvaluationSteps(newSteps);

    if (currentStep < evaluationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      formEvaluation.resetFields();
    } else {
      // Enviar avaliação final para o endpoint API do Next.js
      axios
        .post("/api/nps", {
          user_id: usuario.ID,
          responses: newSteps.map((step) => ({
            question: step.question,
            answer: step.answer,
            type: step.type,
            options: step.options || []
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
              {currentQuestion.options.map((option) => (
                <Radio
                  value={option}
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
                {currentQuestion.options.map((option) => (
                  <Checkbox value={option} key={option} style={{ marginBottom: 8 }}>
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
          <Space direction="vertical" className="w-100" style={{ textAlign: "center" }}>
            <Paragraph style={{ color: "#c70630" }}>
              {evaluationSteps[currentStep].question}
            </Paragraph>
            {renderQuestion()}
            <Button type="primary" htmlType="submit">
              {currentStep < evaluationSteps.length - 1 ? "Próximo" : "Finalizar"}
            </Button>
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
    </>
  );
}
