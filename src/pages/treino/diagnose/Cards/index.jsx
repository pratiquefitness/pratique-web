import { Loading } from "@/components";
import { Input, Form, Select, Button, theme, InputNumber } from "antd";
import { useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import FormularioPrincipal from "./Perguntas";
import { setData, setLoading } from "@/redux/slices/diagnose";
import axios from "axios";
import { useRouter } from "next/router";

export default function Diagnose() {
  const { loadingPeso, loadingAnotacoes } = useSelector((state) => state.treino);
  const [iniciarPergunta, setIniciarPergunta] = useState(false);
  const [listaPerguntas, setListaPerguntas] = useState(false);
  const [idDiagnose, setIdDiagnose] = useState(null);
  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.diagnose);
  const { usuario } = useSelector((state) => state.login);
  const [diagnoseData, setDiagnoseData] = useState([]);
  const router = useRouter();
  const { themeMode } = useSelector((state) => state.global);

  const getPerguntasDiagnose = async () => {
    try {
      const response = await axios.get("/api/novoDiagnose");
      const data = response.data;
      if (!data) {
        throw new Error("Falha ao obter o token público.");
      }
      dispatch(setLoading(false));
      setListaPerguntas(data);
      return;
    } catch (error) {
      console.error("Erro ao resgatar data:", error);
      throw error;
    }
  };

  const setPerguntasDiagnose = async (jsonDiagnose) => {
    try {
      const response = await axios.post("/api/envioDiagnose", jsonDiagnose);
      console.log("response", response);
      const data = response.data;

      if (!data) {
        throw new Error("Falha ao enviar a diagnose");
      }
      return data;
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      throw error;
    }
  };

  useEffect(() => {
    getPerguntasDiagnose();
  }, []);

  const handleIniciarPergunta = () => {
    setIniciarPergunta(!iniciarPergunta);
  };
  const [formRegister] = Form.useForm();

  const onRegisterPersonalData = (values) => {
    setDiagnoseData([...diagnoseData, values]);

    formRegister.resetFields();
    handleIniciarPergunta();
  };

  const onRegisterPerguntas = async (values) => {
    try {
      const dadosDiagnose = diagnoseData.concat(values);
      const jsonDiagnose = JSON.stringify(dadosDiagnose);
      const response = await setPerguntasDiagnose(jsonDiagnose);

      // Se a resposta da API contiver um idDiagnose, atualize o estado
      if (response) {
        setIdDiagnose(response);
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      // Trate o erro conforme necessário
    }
  };

  return (
    <Loading spinning={loading}>
      {!iniciarPergunta ? (
        <div className="d-flex justify-center">
          <div
            className="p-4 w-95 "
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
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
                    placeholder={usuario.user_nicename}
                    value={usuario.user_nicename}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="E-mail" id="diagnoseEmail" name="diagnoseEmail">
                  <Input placeholder={usuario.user_login} value={usuario.user_login} disabled />
                </Form.Item>
                <Form.Item label="Digite seu whatsapp" name="diagnoseTelefone">
                  <ReactInputMask mask="(99) 99999-9999">
                    {(inputProps) => <Input {...inputProps} />}
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
                    <Select.Option value="masculino">Masculino</Select.Option>
                    <Select.Option value="feminino">Feminino</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Button className="mt-8" type="primary" htmlType="submit" loading={loading}>
                Próximo
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <FormularioPrincipal
          listaPerguntas={listaPerguntas}
          onRegisterPerguntas={onRegisterPerguntas}
          idDiagnose={idDiagnose} // Passe o idDiagnose como propriedade
        />
      )}
    </Loading>
  );
}
