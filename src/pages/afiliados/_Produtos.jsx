import { Loading } from '@/components'
import { getProdutosAfiliado } from '@/redux/actions/afiliados'
import utils from '@/utils'
import { Button, Input, Modal, Table, Tabs, Typography, message } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { LuCheckCircle2 } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'

export default function Produtos({ employee }) {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [linkID, setLinkID] = useState('')
  const { usuario } = useSelector(state => state.login)
  const { produtos, loading } = useSelector(state => state.afiliados)

  useEffect(() => {
    dispatch(getProdutosAfiliado(employee ? employee : usuario.isAffiliate))
  }, [])

  const handleLinkButtonClick = async record => {
    const id = record.id.split('&')[0]
    const url = `https://pratiqueemcasa.com.br/pratique-em-casa/admin/produto.php?p=${id}`

    try {
      const response = await fetch(url)
      const text = await response.text()
      const employeOrAffiliate = employee ? employee : usuario.isAffiliate

      const linkFinal = `${text}?ref=${employeOrAffiliate}`

      setLinkID(linkFinal)
    } catch (error) {
      console.error('Error fetching or copying link:', error)
    }
  }

  const messageLink = async () => {
    await utils.copyTextToClipboard(linkID)
    message.success('Link copiado!')
  }

  const columns = [
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
      render: (_, record) => (
        <Button type="primary" onClick={() => handleLinkButtonClick(record)}>
          Link
        </Button>
      )
    }
  ]

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
            key: 'suplementacao',
            label: `Suplementação`,
            children: <Table dataSource={produtos.suplementacao} columns={columns} />
          }
        ]}
        style={{ marginBottom: '100px' }}
      />
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
      {'\n\n'}
    </Loading>
  )
}
