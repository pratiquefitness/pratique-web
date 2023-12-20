import { Loading } from '@/components'
import { getDadosAfiliado, getPix, savePix } from '@/redux/actions/afiliados'
import utils from '@/utils'
import { Button, Card, Col, Form, Input, Row, Select, Space, Statistic, message, theme } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { WhatsAppOutlined } from '@ant-design/icons'
import { FaWhatsapp } from 'react-icons/fa'

const tiposPix = [
  { value: 'cpf', label: 'CPF' },
  { value: 'telefone', label: 'Telefone' },
  { value: 'email', label: 'E-mail' },
  { value: 'aleatoria', label: 'Aleatória' }
]

export default function Geral() {
  const [editablePix, setEditablePix] = useState(false)
  const [formPix] = Form.useForm()
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)
  const { geral, loading, pix, pixLoading } = useSelector(state => state.afiliados)
  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getDadosAfiliado())
    dispatch(getPix())
  }, [])

  useEffect(() => {
    formPix.setFieldsValue(pix)
  }, [pix])

  const onSavePix = ({ tipo, chave }) => {
    dispatch(savePix(tipo, chave, setEditablePix))
  }

  const messageLink = () => {
    message.success('Link copiado!')
    utils.copyTextToClipboard(pix?.chave)
  }

  const whatsappLink =
    'https://api.whatsapp.com/send?phone=5531984861766&text=Ol%C3%A1%2C%20sou%20afiliado%20Pratique%20e%20gostaria%20de%20ajuda'

  return (
    <Loading spinning={loading}>
      <Row gutter={[16, 16]} className="mb-4">
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Total de Vendas" an value={geral.totalVendas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas Pagas" value={geral.totalVendaspagas} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorBgContainerDisabled, borderRadius: 5 }}>
            <Statistic title="Vendas a Receber" value={geral.totalReceber} />
          </div>
        </Col>
        <Col span={12}>
          <div className="p-4" style={{ background: token.colorPrimary, borderRadius: 5 }}>
            <Statistic
              title={<span style={{ color: 'white' }}>Valor a Receber</span>}
              valueStyle={{ color: 'white' }}
              value={`R$ ${geral.valorReceber},00`}
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
              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Form.Item
                  name="tipo"
                  label="Tipo de Chave"
                  rules={[{ required: true, message: 'Selecione o tipo de chave' }]}
                >
                  <Select placeholder="Selecione..." options={tiposPix} loading={pixLoading} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Form.Item name="chave" label="Chave PIX" rules={[{ required: true, message: 'Digite a chave' }]}>
                  <Input placeholder="Sua chave PIX" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                <Form.Item
                  label="Confirme a chave PIX"
                  name="rChave"
                  dependencies={['chave']}
                  rules={[
                    {
                      required: true,
                      message: 'Confirme a chave.'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('chave') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('As chaves devem ser iguais.'))
                      }
                    })
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Confirme a chave PIX" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Button type="primary" htmlType="submit" loading={pixLoading} block>
                  Salvar
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
              Tipo da Chave: {tiposPix.find(tipo => tipo.value === pix.tipo)?.label}
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              Chave: {pix?.chave}
              <Button type="primary" style={{ background: '#1677ff' }} size="small" onClick={messageLink}>
                Copiar Chave
              </Button>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Button onClick={() => setEditablePix(true)} block>
                Editar
              </Button>
              <br />
              <p style={{ marginTop: '10px', textAlign: 'center' }}>Precisas de apoio?</p>
              <Col xs={24} className="mb-12">
                <Button
                  icon={<FaWhatsapp fill="#fff" size={30} />}
                  style={{ background: 'green', color: 'white' }}
                  block
                  onClick={() => {
                    window.open(
                      'https://api.whatsapp.com/send?phone=5531984861766&text=Ol%C3%A1%2C%20sou%20afiliado%20Pratique%20e%20gostaria%20de%20ajuda',
                      '_blank'
                    )
                  }}
                >
                  SUPORTE AFILIADO
                </Button>
                <p style={{ marginTop: '10px', textAlign: 'center' }}>(31) 98486-1766</p>
              </Col>
            </Col>{' '}
            <br /> <br /> <br /> <br />
          </Row>
        )}
        <br /> <br /> <br /> <br /> <br /> <br />
      </Card>
    </Loading>
  )
}
