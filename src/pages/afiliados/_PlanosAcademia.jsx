import { ButtonCopyLink, Loading } from '@/components'
import { getDadosAfiliado, getPlanos, getUnidades } from '@/redux/actions/afiliados'
import utils from '@/utils'
import { Button, Col, Collapse, Input, Modal, Row, Space, Table, Typography, message, theme } from 'antd'
import { useEffect, useState } from 'react'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const { Panel } = Collapse

const messageLink = () => {
  message.success('Link copiado!')
}

const columns = (setLinkID, dados, usuario) => {
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
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            const linkFinal = `https://pratiquefitness.com.br/pagamento/afiliado/?k=${dados.token}|${
              dados.separador
            }&pl=${record.plano}&user=${46}&saver=${dados.saver}&obs=AFILIADO|${dados.token}|${dados.separador}|NULL|${
              usuario.isAffiliate
            }|AFILIADO`
            utils.copyTextToClipboard(linkFinal)
            messageLink()
            setLinkID(linkFinal)
          }}
        >
          Link
        </Button>
      )
    }
  ]
}

export default function PlanosAcademia() {
  const [linkID, setLinkID] = useState('')
  const [dataSearch, setDataSearch] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const { unidades, planos, planosLoading, loading } = useSelector(state => state.afiliados)
  const { usuario } = useSelector(state => state.login)

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

  return (
    <Loading spinning={loading}>
      <Modal title="Link" open={linkID.length} onCancel={() => setLinkID('')} footer={null} width={300} centered>
        {linkID.includes('http') ? (
          <div className="text-center">
            <LuCheckCircle2 style={{ fontSize: 50, color: '#25D366' }} />
            <Typography.Title level={4} className="mb-4">
              Link Gerado!
            </Typography.Title>
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
        <Collapse className="planos_academia" accordion>
          {list.map(unidade => (
            <Panel
              header={unidade.unidade}
              onClick={() => dispatch(getPlanos(unidade.dados.token, unidade.dados.separador))}
              style={{ padding: 0 }}
            >
              <Loading spinning={planosLoading}>
                <Table
                  dataSource={planos}
                  columns={columns(setLinkID, unidade.dados, usuario)}
                  pagination={false}
                  rowKey={'plano'}
                />
              </Loading>
            </Panel>
          ))}
        </Collapse>
      </Space>
    </Loading>
  )
}
