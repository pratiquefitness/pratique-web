import { getUnidades, saveDeclaracaoVenda } from '@/redux/actions/declaracaoVenda';
import {Button, Form, Input, DatePicker, ConfigProvider} from 'antd';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {DeclaracaoVendaSelect} from "@/components/DeclaracaoVenda";
import locale from 'antd/locale/pt_BR';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import * as constants from "@/constants/declaracaoVenda";
import {Loading} from "@/components";

export default function DeclaracaoVenda() {
  dayjs.locale('pt-br');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { usuario } = useSelector(state => state.login);
  const { unidades, loading } = useSelector(state => state.declaracaoVenda);
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  
  const onSave = values => {
    dispatch(saveDeclaracaoVenda(values));
    form.setFieldsValue({
      cliente: '',
      link: '',
      tipo: 'Presencial'
    })
  }
  
  const isEmpty = (value) => {
    for (let prop in value) {
      if(value[prop].length === 0) {
        return false;
      }
    }
    return true;
  }
  
  useEffect(() => {
    dispatch(getUnidades());
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      email: usuario.user_email
    })
  }, []);
  
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then((data) => {
        setSubmittable(isEmpty(values))
      })
      .catch((data) => {
        setSubmittable(isEmpty(values))
      });
  }, [form, values]);
  
  const onChangeDate = (date, dateString) => {
    let value = date === null ? '' : dayjs(date.$d).format('YYYY-MM-DD');
    form.setFieldsValue({
      data_declarada: value
    })
  };
  
  const onChange = (tipo , valor) => {
    form.setFieldsValue({
      [tipo]: valor
    })
    if(tipo === 'tipo') {
      form.setFieldsValue({ link: '' });
    }
    
    if(valor.length === 0) setSubmittable(false);
  }

  return (
    <>
      <Loading spinning={loading}>
        <Form
          layout="vertical"
          initialValues={{
            requiredMarkValue: 'default',
          }}
          form={form}
          name="declaracao"
          onFinish={onSave}
        >
          <Form.Item
            label="Data da Venda"
            name="data_declarada"
            initialValue={''}
            rules={[
              {
                required: true,
                message: 'Por favor, insira uma Data válida',
              },
            ]}
          >
            <ConfigProvider locale={locale}>
              <DatePicker
                format={'DD/MM/YYYY'}
                allowClear
                style={{
                  width: '100%',
                }}
                onChange={onChangeDate}
              />
            </ConfigProvider>
          </Form.Item>
          <Form.Item
            label="Consultor"
            name="consultor"
            initialValue={''}
            rules={[
              {
                required: true,
                message: 'Por favor, insira um Cosultor válido',
              },
            ]}
          >
            <DeclaracaoVendaSelect
              id={'consultor_select'}
              placeholder={'Selecione um consultor'}
              optionsData={constants.CONSULTORES}
              selectedChoice={(value) => {
                onChange('consultor', value)
              }}
            />
          </Form.Item>
          <Form.Item
            label="Unidade que foi feita a venda"
            name="unidade"
            initialValue={''}
            rules={[
              {
                message: 'Por favor, insira uma Unidade válida',
                required: true,
              },
            ]}
          >
            <DeclaracaoVendaSelect
              id={'unidade_select'}
              placeholder={'Selecione uma unidade'}
              optionsData={unidades}
              selectedChoice={(value) => {
                onChange('unidade', value)
              }}
            />
          </Form.Item>
          <Form.Item
            onChange={(e) => onChange('cliente', e.target.value)}
            label="Cod do cliente"
            name="cliente"
            initialValue={''}
            rules={[
              {
                required: true,
                message: 'Por favor, insira Código de cliente',
              },
            ]}
          >
            <Input type={"text"} />
          </Form.Item>
          <Form.Item
             label="Tipo de venda"
             name="tipo"
             initialValue={''}
             rules={[
               {
                 required: true,
                 message: 'Por favor, insira um Tipo de venda válido',
               },
             ]}
           >
            <DeclaracaoVendaSelect
              id={'tipo_select'}
              placeholder={'Selecione um tipo'}
              optionsData={constants.TIPOVENDA}
              selectedChoice={(value) => {
                onChange('tipo', value)
              }}
            />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.tipo !== currentValues.tipo}
          >
            {({getFieldValue}) =>
              getFieldValue('tipo') === 'Online' ? (
                <Form.Item
                  onChange={(e) => onChange('link', e.target.value)}
                  label="Link do Chat Guru"
                  name="link"
                  initialValue={''}
                  rules={[
                    {
                      message: 'Por favor, insira um link válido',
                      required: true,
                      pattern: new RegExp(
                        '^(https?:\\/\\/)?' + // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                        '(\\#[-a-z\\d_]*)?$', // fragment locator
                        'i'
                      ),
                    },
                  ]}
                >
                  <Input type={"url"}/>
                </Form.Item>
              ) : null
            }
          </Form.Item>
          <Form.Item
            hidden={true}
            label=""
            name="email"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type={"text"} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block disabled={!submittable}>
            Adicionar
          </Button>
        </Form>
      </Loading>
    </>
  )
}
