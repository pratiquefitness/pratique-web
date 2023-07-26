import { Loading } from '@/components'
import utils from '@/utils'
import { Alert, Button, Input, Modal, Table, Tabs } from 'antd'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

const columns = (setLinkID, id) => {
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
          <div>{record.preco}</div>
        </>
      )
    },
    {
      title: 'Link',
      dataIndex: 'nomeproduto',
      key: 'link',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={async () => {
            setLinkID(record.id)
            const id = record.id.split('&')[0]
            const url = `https://pratiqueemcasa.com.br/pratique-em-casa/admin/produto.php?p=${id}`
            const link = await fetch(url)
            const linkFinal = `${link.url}?ref=${id}`
            utils.copyTextToClipboard(linkFinal)
            setLinkID(linkFinal)
          }}
        >
          Link
        </Button>
      )
    }
  ]
}

export default function Produtos() {
  const inputRef = useRef(null)
  const [linkID, setLinkID] = useState('')
  const { usuario } = useSelector(state => state.login)
  const { data, loading } = useSelector(state => state.afiliados)

  const { produtos } = data

  return (
    <Loading spinning={loading}>
      <Modal title="Link" open={linkID.length} onCancel={() => setLinkID('')} footer={null} width={300} centered>
        {linkID.includes('http') ? (
          <>
            <Input
              style={{ border: '1px dashed gray' }}
              className="my-4"
              value={linkID}
              ref={inputRef}
              onClick={() => {
                inputRef.current.focus({
                  cursor: 'all'
                })
              }}
            />
            <Alert message="Link copiado!" showIcon />
          </>
        ) : (
          <Loading spinning />
        )}
      </Modal>
      <Tabs
        defaultActiveKey="0"
        items={[
          {
            key: 'bike',
            label: `Bike`,
            children: <Table dataSource={produtos.bike} columns={columns(setLinkID, usuario.ID)} />
          },
          {
            key: 'suplementacao',
            label: `Suplementação`,
            children: <Table dataSource={produtos.suplementacao} columns={columns(setLinkID, usuario.ID)} />
          },
          {
            key: 'diversos',
            label: `Diversos`,
            children: <Table dataSource={produtos.diversos} columns={columns(setLinkID, usuario.ID)} />
          }
        ]}
      />
    </Loading>
  )
}
