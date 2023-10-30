import { Loading } from '@/components'
import { getProdutosAfiliado } from '@/redux/actions/afiliados'
import utils from '@/utils'
import { Alert, Button, Input, Modal, Table, Tabs, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

const messageLink = () => {
  message.success('Link copiado!')
}

const columns = (setLinkID, isAffiliate, employee) => {
  return [
    {
      title: 'Produto',
      dataIndex: 'imagem',
      key: 'produto',
      width: 100,
      render: (_, record) => <img src={record.imagem} width={'100%'} />
    },
    {
      title: 'Desc.',
      dataIndex: 'nome',
      key: 'desc',
      render: (_, record) => (
        <>
          <div>{record.nome}</div>
          <p className="mb-2">Preço: {record.preco}</p>
          <span style={{ background: '#ed143d', padding: 8, borderRadius: 20, textAlign: 'center', color: 'white' }}>
            Comissão: {record.comissao}
          </span>
        </>
      )
    },
    {
      title: 'Link',
      dataIndex: 'nomeproduto',
      key: 'link',
      render: (_, record) => {
        return employee ? (
          <Button
            type="primary"
            onClick={async () => {
              const id = record.id.split('&')[0]
              const url = `https://pratiqueemcasa.com.br/pratique-em-casa/admin/produto.php?p=${id}`
              const response = await fetch(url)
              response.text().then(function (text) {
                const linkFinal = `${text}?ref=${employee}`
                window.open(linkFinal, '_blank')
              })
            }}
          >
            Link
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={async () => {
              setLinkID(record.id)
              const id = record.id.split('&')[0]
              const url = `https://pratiqueemcasa.com.br/pratique-em-casa/admin/produto.php?p=${id}`
              const response = await fetch(url)
              response.text().then(function (text) {
                const linkFinal = `${text}?ref=${isAffiliate}`
                utils.copyTextToClipboard(linkFinal)
                messageLink()
                setLinkID(linkFinal)
              })
            }}
          >
            Link
          </Button>
        )
      }
    }
  ]
}

export default function Produtos({ employee }) {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [linkID, setLinkID] = useState('')
  const { usuario } = useSelector(state => state.login)
  const { produtos, loading } = useSelector(state => state.afiliados)

  useEffect(() => {
    dispatch(getProdutosAfiliado(employee ? employee : usuario.isAffiliate))
  }, [])

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
      <Tabs
        defaultActiveKey="0"
        items={[
          {
            key: 'todos',
            label: `Todos`,
            children: (
              <Table
                dataSource={[...(produtos.bike || []), ...(produtos.suplementacao || []), ...(produtos.diversos || [])]}
                columns={columns(setLinkID, usuario.isAffiliate, employee)}
              />
            )
          },
          {
            key: 'bike',
            label: `Bike`,
            children: <Table dataSource={produtos.bike} columns={columns(setLinkID, usuario.isAffiliate, employee)} />
          },
          {
            key: 'suplementacao',
            label: `Suplementação`,
            children: (
              <Table dataSource={produtos.suplementacao} columns={columns(setLinkID, usuario.isAffiliate, employee)} />
            )
          },
          {
            key: 'diversos',
            label: `Diversos`,
            children: (
              <Table dataSource={produtos.diversos} columns={columns(setLinkID, usuario.isAffiliate, employee)} />
            )
          }
        ]}
      />
    </Loading>
  )
}
