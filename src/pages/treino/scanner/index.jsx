import React, { useEffect, useState } from 'react'
import { Button, Empty, Table, Typography, Modal, Input, Form } from 'antd'
import { DownloadOutlined, ArrowLeftOutlined, IdcardOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import axios from 'axios'
import { setBrowserURL } from '@/redux/slices/global'
import { updateCpf } from '@/redux/actions/conta'

export default function ScannerView() {
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.some(objeto => objeto.urlexame && objeto.urlexame.includes('.pdf'))
  const [examsData, setExamsData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)
  const [iframeVisible, setIframeVisible] = useState(false)
  const [pdfLink, setPdfLink] = useState('')
  const [loading, setLoading] = useState(true)
  const [cpfModalVisible, setCpfModalVisible] = useState(false)
  const [cpfForm] = Form.useForm()

  useEffect(() => {
    dispatch(getTreino())

    const fetchExamsData = async () => {
      try {
        if (usuario) {
          let cpfLimpo = usuario.cpf ? usuario.cpf.replace(/\D/g, '') : null
          let telefoneLimpo = usuario.telefone ? usuario.telefone.replace(/\D/g, '') : null

          // Se o CPF não estiver disponível, buscar na tabela wp_users
          if (!cpfLimpo) {
            const cpfResponse = await axios.get('/api/getCpfFromWpUsers')
            if (cpfResponse.status === 200 && cpfResponse.data.cpf) {
              cpfLimpo = cpfResponse.data.cpf.replace(/\D/g, '')
            } else {
              console.error('CPF não encontrado na tabela wp_users.')
              // Opcional: Solicitar ao usuário que insira o CPF
              return
            }
          }

          // Se o telefone não estiver disponível, usar um valor padrão
          if (!telefoneLimpo) {
            telefoneLimpo = '0000000000' // Valor padrão ou string vazia
          }

          // Construir os parâmetros da consulta
          const parametrosConsulta = `cpf=${cpfLimpo}&phone=${telefoneLimpo}`

          const timestamp = new Date().getTime()
          const response = await axios.get(
            `https://pratiquetecnologia.com.br/api/balanca/id.php?${parametrosConsulta}&timestamp=${timestamp}`,
            {
              headers: {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Expires: '0'
              }
            }
          )

          if (response.status === 200 && response.data && response.data.length > 0) {
            const examsWithFormattedDate = response.data.map(exam => ({
              ...exam,
              gmtCreate: new Date(exam.gmtCreate).toLocaleString()
            }))
            setExamsData(examsWithFormattedDate)
          } else {
            console.error('Nenhum exame encontrado para este usuário.')
          }
        } else {
          console.error('Usuário não disponível.')
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos exames:', error)
      }
    }

    fetchExamsData()
  }, [dispatch, usuario])

  useEffect(() => {
    if (!usuario.cpf) {
      setCpfModalVisible(true)
    }
  }, [usuario])

  const handleImageClick = async record => {
    setSelectedImage(record.bodyImage)
    setSelectedExamId(record.id)
    setLoading(true)
    setIframeVisible(true)
    setPdfLink(record.pdf)
    //console.log('Link do exame:', record.pdf)
  }

  const handleIframeLoad = () => {
    setLoading(false)
  }

  const handleCpfSubmit = async values => {
    try {
      await dispatch(updateCpf(values.cpf))
      setCpfModalVisible(false)
    } catch (error) {
      console.error('Erro ao atualizar o CPF:', error)
    }
  }

  return (
    <TreinoLayout>
      {iframeVisible && (
        <div style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, right: 0, bottom: 0 }}>
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#f0f0f0'
              }}
            />
          )}
          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '9999' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setIframeVisible(false)}>
              Voltar
            </Button>
          </div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '9999' }}>
            {pdfLink && (
              <a href={pdfLink} target="_blank" rel="noopener noreferrer">
                <Button type="primary">Ver PDF</Button>
              </a>
            )}
          </div>
          <iframe
            title="PDF Viewer"
            src={`https://www.anovator.com/report/index.html?id=${selectedExamId}&child=false&lang=pt_PT`}
            width="100%"
            height="100%"
            onLoad={handleIframeLoad}
          />
        </div>
      )}
      {!iframeVisible && examsData ? (
        <Table
          dataSource={examsData}
          columns={[
            {
              title: 'Data',
              dataIndex: 'data_column',
              key: 'gmtCreate',
              render: data_column => {
                const date = new Date(data_column)
                return date.toLocaleDateString()
              }
            },
            {
              title: 'Ações',
              key: 'actions',
              render: record => (
                <Button type="primary" style={{ height: '20px' }} onClick={() => handleImageClick(record)}>
                  Ver
                </Button>
              )
            }
          ]}
        />
      ) : (
        <Empty />
      )}
      {temExame ? (
        <a
          href={fichas.find(objeto => objeto.urlexame.includes('.pdf')).urlexame}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button shape="round" icon={<DownloadOutlined />} size="large" block>
            Baixar Exame
          </Button>
        </a>
      ) : (
        <Empty />
      )}
      <Modal
        title={
          <div style={{ textAlign: 'center' }}>
            <Typography.Title level={3} style={{ marginBottom: 0 }}>
              Atenção
            </Typography.Title>
          </div>
        }
        visible={cpfModalVisible}
        onCancel={() => setCpfModalVisible(false)}
        footer={null}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <IdcardOutlined style={{ fontSize: '48px', color: '#08c' }} />
          <Typography.Paragraph style={{ color: '#595959', marginTop: '16px' }}>
            Preencha seu CPF para ter acesso ao SUPERBIO! Preencha corretamente pois ele será a chave para você poder
            ver seus exames!
          </Typography.Paragraph>
        </div>
        <Form form={cpfForm} onFinish={handleCpfSubmit}>
          <Form.Item
            name="cpf"
            rules={[
              { required: true, message: 'Por favor, insira seu CPF' },
              { len: 11, message: 'O CPF deve ter 11 dígitos' }
            ]}
          >
            <Input maxLength={11} placeholder="Digite aqui o seu CPF" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </TreinoLayout>
  )
}
