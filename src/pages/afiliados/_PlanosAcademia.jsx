import { ButtonCopyLink, Loading } from '@/components'
import { getDadosAfiliado, getPlanos, getUnidades } from '@/redux/actions/afiliados'
import { setBrowserURL } from '@/redux/slices/global'
import utils from '@/utils'
import { Button, Col, Collapse, Input, Modal, Row, Space, Table, Typography, message, theme } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const { Panel } = Collapse

const messageLink = () => {
  message.success('Link copiado!')
}

const columns = (setLinkID, dados, usuario, employee) => {
  return [
    {
      title: 'Plano',
      dataIndex: 'nome',
      key: 'nome'
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 100,
      render: (_, record) => {
        // const unidadeSlug = record.unidade ? record.unidade.slug : ''
        const unidadeSlug = record.unidade

        const linkFinal = `https://novo.pratiquefitness.com.br/checkoutpageplano/${unidadeSlug}?pl=${
          record.plano
        }&saver=${record.saver}&obs=AFILIADO|${dados.token}|${dados.separador}|NULL|${
          employee ? employee : usuario.isAffiliate
        }|AFILIADO`

        const showError = ['adelmoooo'].includes(unidadeSlug)

        return employee ? (
          <a href={linkFinal} target="_blank">
            <Button type="primary">Link</Button>
          </a>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              if (showError) {
                message.error('O AFILIADOS PARA ESTA UNIDADE ESTA PAUSADO POR SER UMA UNIDADE NOVA')
              } else {
                utils.copyTextToClipboard(linkFinal)
                messageLink()
                setLinkID(linkFinal)
              }
            }}
          >
            Link
          </Button>
        )
      }
    }
  ]
}

export default function PlanosAcademia({ employee }) {
  const [linkID, setLinkID] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { unidades, planos, planosLoading, loading } = useSelector(state => state.afiliados)
  const { usuario } = useSelector(state => state.login)
  const inputRef = useRef(null)

  const { token } = theme.useToken()

  useEffect(() => {
    dispatch(getUnidades())
  }, [])

  const searchData = e => {
    const value = e.currentTarget.value
    const dataFiltered = utils.fieldSearch(unidades, value, 'unidade')
    setSearch(value)
    setDataSearch(dataFiltered)
  }

  const list = search ? dataSearch : unidades

  const handlePanelChange = key => {
    setActivePanel(activePanel === key ? null : key) // Alternar entre abrir e fechar o painel
  }

  return (
    <Loading spinning={loading}>
      <Modal title="Link" open={linkID.length} onCancel={() => setLinkID('')} footer={null} width={300} centered>
        {linkID.includes('http') ? (
          <div className="text-center">
            <LuCheckCircle2 style={{ fontSize: 50, color: '#25D366' }} />
            <Typography.Title level={4} className="mb-4">
              Link Gerado!
            </Typography.Title>
            <Input
              ref={inputRef}
              value={linkID}
              onClick={() => {
                inputRef.current.focus({
                  cursor: 'all'
                })
              }}
              className="mb-4"
            />
            <Button type="primary" style={{ background: '#1677ff' }} size="small" onClick={messageLink}>
              Copiar Link
            </Button>
          </div>
        ) : (
          <Loading spinning />
        )}
      </Modal>
      <Space direction="vertical" className="w-100">
        <Input placeholder="Pesquisar..." onChange={searchData} />
        <Collapse className="planos_academia" style={{ background: token.colorPrimary }} accordion>
          <Panel header={'MATERIAL DE APOIO'}>
            <div className="p-5">
              <Space direction="vertical" className="w-100">
                <Row>
                  <Col span={12}>Saver Club</Col>
                  <Col span={12} className="text-right">
                    <a
                      onClick={() =>
                        dispatch(setBrowserURL('https://pratiquefitness.my.canva.site/site-saver-club-whatsapp'))
                      }
                      target="_blank"
                    >
                      <Button type="primary" size="small">
                        Link
                      </Button>
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>Conheça os benefícios</Col>
                  <Col span={12} className="text-right">
                    <a href="https://www.youtube.com/watch?v=F6K8ywhzggw" target="_blank">
                      <Button type="primary" size="small">
                        Link
                      </Button>
                    </a>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>Conheça sua assinatura</Col>
                  <Col span={12} className="text-right">
                    <a href="https://www.youtube.com/watch?v=jt3Ueq5rDiM" target="_blank">
                      <Button type="primary" size="small">
                        Link
                      </Button>
                    </a>
                  </Col>
                </Row>
              </Space>
            </div>
          </Panel>
        </Collapse>
        <Collapse className="planos_academia" accordion>
          {list.map((unidade, key) => {
            return (
              <Panel
                key={key++}
                header={unidade.unidade}
                onClick={() =>
                  dispatch(getPlanos(unidade.dados.token, unidade.dados.separador, unidade.unidade, unidade.dados.slug))
                }
                style={{ padding: 0 }}
              >
                <Loading spinning={planosLoading}>
                  <Table
                    dataSource={planos}
                    columns={columns(setLinkID, unidade.dados, usuario, employee)}
                    pagination={false}
                    rowKey={'plano'}
                  />
                </Loading>
              </Panel>
            )
          })}
        </Collapse>
      </Space>
    </Loading>
  )
}
