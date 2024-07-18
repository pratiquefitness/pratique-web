import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Modal,
  Radio,
  Checkbox,
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

const { Paragraph } = Typography;

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
      question: "O avaliador olhou a sua Diagnose e fez comentários com base nos seus resultados?",
      type: "radio",
      options: ["Sim", "Não"],
      answer: ""
    },
    {
      question: "O avaliador mostrou nosso aplicativo e suas funções?",
      type: "radio",
      options: ["Sim", "Não"],
      answer: ""
    },
    {
      question: "Assinale todas as coisas que você se lembra que o avaliador falou para você:",
      type: "checkbox",
      options: [
        "Diagnose",
        "Poweflix",
        "Aulas on demand (online)",
        "Ficha de treino no aplicativo",
        "Videos dos exercícios",
        "Monte seu Treino",
        "Botão Fale com o Professor",
        "Resultado da Avaliação Física"
      ],
      answer: []
    },
    {
      question: "Como você avaliaria a sua experiência na avaliação física da Pratique?",
      type: "rate",
      answer: 0
    }
  ]);

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
      // Enviar avaliação final
      axios
        .post("https://pratiquetecnologia.com.br/api/app/nps", {
          user_id: usuario.ID,
          responses: newSteps
        })
        .then((response) => {
          message.success("Avaliação enviada com sucesso!");
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
            <Radio.Group>
              {currentQuestion.options.map((option) => (
                <Radio value={option} key={option}>
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
            <Checkbox.Group options={currentQuestion.options} />
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
            <Paragraph>{evaluationSteps[currentStep].question}</Paragraph>
            {renderQuestion()}
            <Button type="primary" htmlType="submit">
              {currentStep < evaluationSteps.length - 1 ? "Próximo" : "Finalizar"}
            </Button>
          </Space>
        </Form>
      )
    }
  ];

  return (
    <>
      <Row justify="center">
        <Col span={24} className="mt-4" style={{ maxWidth: "600px" }}>
          <Steps
            current={isModalVisible ? 0 : 1}
            items={steps.map((item) => ({ title: item.title }))}
            size="small"
            style={{ marginBottom: "8px" }}
          />
          <div className="py-6" style={{ textAlign: "center", paddingTop: "0" }}>
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
