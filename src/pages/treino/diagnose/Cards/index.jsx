import { Loading } from "@/components";
import { Input, Form, Select, Button, theme, InputNumber } from "antd";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import FormularioPrincipal from "./Perguntas";
import { setData, setLoading } from "@/redux/slices/diagnose";
import axios from "axios";
import { useRouter } from "next/router";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ManOutlined,
  WomanOutlined
} from "@ant-design/icons";

const iconStyle = {
  backgroundColor: "rgb(0, 167, 201)",
  borderRadius: "50%",
  padding: "4px",
  color: "white",
  fontSize: "24px"
};

export default function Diagnose() {
  const [iniciarPergunta, setIniciarPergunta] = useState(false);
  const [listaPerguntas, setListaPerguntas] = useState([]);
  const [idDiagnose, setIdDiagnose] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.diagnose);
  const { usuario } = useSelector((state) => state.login);
  const [diagnoseData, setDiagnoseData] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPerguntasDiagnose();
  }, []);

  useEffect(() => {
    if (idDiagnose) {
      router.push(`/treino/diagnose/${idDiagnose}`);
    }
  }, [idDiagnose]);

  const getPerguntasDiagnose = async () => {
    try {
      const response = await axios.get("/api/novoDiagnose");
      const data = response.data;
      if (!data) {
        throw new Error("Falha ao obter o token público.");
      }
      dispatch(setLoading(false));
      setListaPerguntas(data);
    } catch (error) {
      console.error("Erro ao resgatar data:", error);
    }
  };

  const setPerguntasDiagnose = async (dadosDiagnose) => {
    console.log("Enviando diagnose:", dadosDiagnose);
    try {
      const response = await axios.post("/api/envioDiagnose", dadosDiagnose, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = response.data.diagnose_id;

      if (!data) {
        throw new Error("Falha ao enviar a diagnose");
      }
      return data;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      throw error;
    }
  };

  const handleIniciarPergunta = () => {
    setIniciarPergunta(true);
  };
  const [formRegister] = Form.useForm();

  const onRegisterPersonalData = (values) => {
    setDiagnoseData([values]);
    formRegister.resetFields();
    handleIniciarPergunta();
  };

  const onRegisterPerguntas = async (values) => {
    if (submitting) return;
    setSubmitting(true);
    try {
      console.log("onRegisterPerguntas chamada");
      const dadosDiagnose = diagnoseData.concat(values);
      const response = await setPerguntasDiagnose(dadosDiagnose);

      if (response) {
        setIdDiagnose(response);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Loading spinning={loading}>
      {!iniciarPergunta ? (
        <div className="d-flex justify-center">
          <div className="p-4 w-95 " style={{ background: "#fff", borderRadius: 15 }}>
            <div className="text-center">
              <h2>Preencha os dados a seguir para criarmos seu treino</h2>
            </div>
            <Form
              form={formRegister}
              onFinish={onRegisterPersonalData}
              layout="vertical"
              className="my-4 d-flex flex-column gap-4 w-100"
              initialValues={{
                diagnoseNomeCompleto: usuario.user_nicename,
                diagnoseEmail: usuario.user_login
              }}
            >
              <div className="d-flex flex-column gap-2">
                <Form.Item
                  label="Nome completo"
                  id="diagnoseNomeCompleto"
                  name="diagnoseNomeCompleto"
                >
                  <Input
                    prefix={<UserOutlined style={iconStyle} />}
                    placeholder={usuario.user_nicename}
                    value={usuario.user_nicename}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="E-mail" id="diagnoseEmail" name="diagnoseEmail">
                  <Input
                    prefix={<MailOutlined style={iconStyle} />}
                    placeholder={usuario.user_login}
                    value={usuario.user_login}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="Digite seu whatsapp" name="diagnoseTelefone">
                  <ReactInputMask mask="(99) 99999-9999">
                    {(inputProps) => (
                      <Input {...inputProps} prefix={<PhoneOutlined style={iconStyle} />} />
                    )}
                  </ReactInputMask>
                </Form.Item>

                <Form.Item
                  label="Qual seu peso atual?"
                  name="diagnosePeso"
                  id="diagnosePeso"
                  rules={[
                    {
                      required: true,
                      message: "Digite seu peso"
                    }
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item
                  name="diagnoseSexo"
                  label="Sexo"
                  rules={[{ required: true, message: "Qual sexo?" }]}
                >
                  <Select placeholder="Sexo?">
                    <Select.Option value="masculino">
                      <ManOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
                      Masculino
                    </Select.Option>
                    <Select.Option value="feminino">
                      <WomanOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
                      Feminino
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Button
                className="mt-8"
                style={{ backgroundColor: "rgb(0, 167, 201)" }}
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                Próximo
              </Button>
            </Form>
          </div>
        </div>
      ) : idDiagnose ? (
        <div className="text-center">
          <h2>Diagnose enviada com sucesso! Redirecionando...</h2>
        </div>
      ) : (
        <FormularioPrincipal
          listaPerguntas={listaPerguntas}
          onRegisterPerguntas={onRegisterPerguntas}
          submitting={submitting}
        />
      )}
    </Loading>
  );
}
