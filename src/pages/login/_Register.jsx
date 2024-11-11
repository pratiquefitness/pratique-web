import { register } from "@/redux/actions/login";
import { Button, Form, Input } from "antd";
import ReactInputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const dispach = useDispatch();
  const { loading } = useSelector((state) => state.login);
  const [formRegister] = Form.useForm();

  const onRegister = (values) => {
    dispach(register(values));
    formRegister.resetFields();
  };

  return (
    <Form layout="vertical" form={formRegister} onFinish={onRegister}>
      <Form.Item
        label="Nome completo"
        name="user_nicename"
        rules={[{ required: true, message: "Digite seu nome." }]}
      >
        <Input placeholder="Digite seu nome" />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="user_email"
        rules={[
          { required: true, message: "Digite seu e-mail." },
          { type: "email", message: "Digite um e-mail válido." }
        ]}
      >
        <Input placeholder="Digite seu e-mail" />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="user_pass"
        rules={[{ required: true, message: "Digite uma senha." }]}
        hasFeedback
      >
        <Input.Password placeholder="Digite sua senha" />
      </Form.Item>
      <Form.Item
        label="Confirme sua nova senha."
        name="ruser_pass"
        dependencies={["user_pass"]}
        rules={[
          {
            required: true,
            message: "Digite uma senha."
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("user_pass") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("As senhas devem ser iguais."));
            }
          })
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Confirme sua senha" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>
        Cadastrar
      </Button>
    </Form>
  );
}
