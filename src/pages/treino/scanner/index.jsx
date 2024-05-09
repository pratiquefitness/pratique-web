import React, { useEffect, useState } from 'react'
import { Button, Empty, Table, Typography } from 'antd' // Adicionando Typography do primeiro código
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import axios from 'axios'
import { setBrowserURL } from '@/redux/slices/global'

export default function ScannerView() {
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.login)
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.some(objeto => objeto.urlexame && objeto.urlexame.includes('.pdf')) // Alterando para some() para verificar qualquer exame em formato PDF
  const [examsData, setExamsData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)
  const [iframeVisible, setIframeVisible] = useState(false)
  const [pdfLink, setPdfLink] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getTreino())

    const fetchExamsData = async () => {
      try {
        if (usuario) {
          let parametrosConsulta = ''

          if (usuario.cpf) {
            const cpfLimpo = usuario.cpf.replace(/\D/g, '')
            parametrosConsulta += `cpf=${cpfLimpo}`
          }

          if (usuario.telefone) {
            const telefoneLimpo = usuario.telefone.replace(/\D/g, '')
            const telefoneSemParenteses = telefoneLimpo.replace(/[(|)]/g, '')
            if (parametrosConsulta !== '') {
              parametrosConsulta += '&'
            }
            parametrosConsulta += `phone=${telefoneSemParenteses}`
          }

          if (parametrosConsulta === '') {
            return
          }

          const response = await axios.get(`https://pratiquetecnologia.com.br/api/balanca/id.php?${parametrosConsulta}`)

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
          console.error('Telefone do usuário não disponível.')
        }
      } catch (error) {
        console.error('Erro ao buscar dados dos exames:', error)
      }
    }

    fetchExamsData()
  }, [dispatch, usuario])

  const handleImageClick = async record => {
    setSelectedImage(record.bodyImage)
    setSelectedExamId(record.id)
    setLoading(true)
    setIframeVisible(true)
    setPdfLink(record.pdf)
    console.log('Link do exame:', record.pdf) // Adicionando console.log para verificar o link do exame
  }

  const handleIframeLoad = () => {
    setLoading(false)
  }

  useEffect(() => {
    console.log('temExame:', temExame) // Adicionando console.log para verificar o valor de temExame
    if (temExame) {
      console.log('urlexame:', fichas.find(objeto => objeto.urlexame.includes('.pdf')).urlexame)
    }
  }, [temExame, fichas])

  return (
    <TreinoLayout>
      {iframeVisible && (
        <div style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, right: 0, bottom: 0 }}>
          {loading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#f0f0f0' }} />
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
        <Empty className="my-8" />
      )}
      <div style={{ textAlign: 'center', marginTop: '50px' }}> </div>
    </TreinoLayout>
  )
}
