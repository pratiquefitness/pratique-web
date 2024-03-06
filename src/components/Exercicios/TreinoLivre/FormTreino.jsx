import {Form, Input, Typography} from "antd";
import {useEffect, useState} from "react";
const {Text} = Typography;

const FormTreino = ({
  onSetNomeTreino = () => {},
  nome
}) => {
  const [form] = Form.useForm();
  const [nomeTreino, setNomeTreino] = useState('');

  useEffect(() => {
    form.validateFields(['nome_treino']);
  }, [nomeTreino]);

  useEffect(() => {
    if (nome === '') {
      setNomeTreino('');
      onSetNomeTreino('');
      form.resetFields(['nome_treino']);
    }
  }, [nome]);

  const onChange = (e) => {
    setNomeTreino(e.target.value);
    onSetNomeTreino(e.target.value);
  }

  return (
    <>
      <Text>Dê um nome a este programa de treino:</Text>
      <Form
        style={{marginTop: '10'}}
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        <br/>
        <Form.Item label="" name="nome_treino" rules={[
          {
            max: 10,
            message: 'Máximo 10 caracteres!',
          },
        ]}>
          <Input onChange={onChange} autoFocus/>
        </Form.Item>
      </Form>
    </>
  )
}

export default FormTreino;
