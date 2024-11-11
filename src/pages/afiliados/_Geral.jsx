import { Loading } from "@/components";
import { getDadosAfiliado, getPix, savePix } from "@/redux/actions/afiliados";
import utils from "@/utils";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Statistic,
  message,
  theme
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WhatsAppOutlined } from "@ant-design/icons";
import { FaWhatsapp } from "react-icons/fa";

const tiposPix = [
  { value: "cpf", label: "CPF" },
  { value: "telefone", label: "Telefone" },
  { value: "email", label: "E-mail" },
  { value: "aleatoria", label: "Aleatória" }
];

export default function Geral() {
  const [editablePix, setEditablePix] = useState(false);
  const [formPix] = Form.useForm();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.login);
  const { geral, loading, pix, pixLoading } = useSelector((state) => state.afiliados);
  const { token } = theme.useToken();

  useEffect(() => {
    dispatch(getDadosAfiliado());
    dispatch(getPix());
  }, []);

  useEffect(() => {
    formPix.setFieldsValue(pix);
  }, [pix]);

  const onSavePix = ({ tipo, chave }) => {
    dispatch(savePix(tipo, chave, setEditablePix));
  };

  const messageLink = () => {
    message.success("Link copiado!");
    utils.copyTextToClipboard(pix?.chave);
  };

  const isMobile =
    typeof window !== "undefined" && /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  const openWhatsApp = () => {
    const whatsappUrl =
      "https://api.whatsapp.com/send?phone=553135682676&text=Ol%C3%A1%2C%20estou%20vindo%20do%20bot%C3%A3o%20suporte%20ao%20AFILIADOS%20do%20super%20app%20PRATIQUE";

    if (isMobile) {
      window.location.href = whatsappUrl;
      return;
    }

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Loading spinning={loading}>
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={5}>
          <div
            className="p-2"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="Vendas" an value={geral.totalVendas} />
          </div>
        </Col>{" "}
        <Col span={5}>
          <div
            className="p-2"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="Balcão" value={geral.totalBalcao} />
          </div>
        </Col>
        <Col span={5}>
          <div
            className="p-2"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="Afiliado" value={geral.totalAfiliados} />
          </div>
        </Col>
        <Col span={4}>
          <div
            className="p-2"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="NPS" an value={geral.nps} />
          </div>
        </Col>
        <Col span={5}>
          <div
            className="p-2"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="Tablet" an value={geral.tablet} />
          </div>
        </Col>
        <Col span={12}>
          <div
            className="p-4"
            style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}
          >
            <Statistic title="Vendas a Receber" value={geral.totalReceber} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorPrimary, borderRadius: 5 }}>
            <Statistic
              title={<span style={{ color: "white" }}>Valor a Receber</span>}
              valueStyle={{ color: "white" }}
              value={`R$ ${geral.valorReceber}`}
            />
          </div>
        </Col>
      </Row>
      {/*
      <Row className="mb-2">
        <Col span={24}>
          <a href={`https://app.pratiqueemcasa.com.br/afiliados/loja/${usuario.isAffiliate}`}>
            <Button block>Veja aqui Sua Loja</Button>
          </a>
        </Col>
      </Row>
      */}
      <Card title="Seu Pix">
        {editablePix || pix.length ? (
          <Form form={formPix} layout="vertical" onFinish={onSavePix}>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Form.Item
                  name="tipo"
                  label="Tipo de Chave"
                  rules={[{ required: true, message: "Selecione o tipo de chave" }]}
                >
                  <Select placeholder="Selecione..." options={tiposPix} loading={pixLoading} />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  name="chave"
                  label="Chave PIX"
                  rules={[{ required: true, message: "Digite a chave" }]}
                >
                  <Input placeholder="Sua chave PIX" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item
                  label="Confirme a chave PIX"
                  name="rChave"
                  dependencies={["chave"]}
                  rules={[
                    {
                      required: true,
                      message: "Confirme a chave."
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("chave") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("As chaves devem ser iguais."));
                      }
                    })
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Confirme a chave PIX" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Button type="primary" htmlType="submit" loading={pixLoading} block>
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              Tipo da Chave: {tiposPix.find((tipo) => tipo.value === pix.tipo)?.label}
            </Col>
            <Col xs={24} lg={12} className="d-flex align-center justify-space-between">
              Chave: {pix?.chave}
              <Button
                type="primary"
                style={{ background: "#1677ff" }}
                size="small"
                onClick={messageLink}
              >
                Copiar Chave
              </Button>
            </Col>
            <Col xs={24}>
              <Button onClick={() => setEditablePix(true)} block>
                Editar
              </Button>
              <br />
              <p className="my-2 text-center">Precisa de apoio?</p>
              <Col xs={24} className="mb-12">
                <Button
                  icon={<FaWhatsapp fill="#fff" size={30} />}
                  style={{ background: "green", color: "white" }}
                  block
                  onClick={openWhatsApp}
                >
                  SUPORTE AFILIADO
                </Button>

                <p className="my-2 text-center">(31) 3568-2676</p>
              </Col>
            </Col>
          </Row>
        )}
      </Card>
    </Loading>
  );
}
