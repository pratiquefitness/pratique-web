import React, { useEffect, useState } from 'react'
import { Button, Empty, Table } from 'antd'
import { DownloadOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import axios from 'axios'
import { setBrowserURL } from '@/redux/slices/global'

export default function ScannerView() {
  const { usuario } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.find(objeto => objeto.urlexame && objeto.urlexame.includes('pdf'))
  const [examsData, setExamsData] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)
  const [iframeVisible, setIframeVisible] = useState(false)
  const [pdfLink, setPdfLink] = useState('')
  const [loading, setLoading] = useState(true) // Adicionado estado para controle do carregamento do iframe

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
    setLoading(true) // Reseta o estado para mostrar o loading enquanto o iframe carrega
    setIframeVisible(true)
    setPdfLink(record.pdf)
  }

  // Função para lidar com o evento de carregamento do iframe
  const handleIframeLoad = () => {
    setLoading(false) // Define o estado como false quando o iframe termina de carregar
  }

  return (
    <TreinoLayout>
      {iframeVisible && (
        <div style={{ position: 'fixed', zIndex: 9999, top: 0, left: 0, right: 0, bottom: 0 }}>
          {loading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#f0f0f0' }} />
          )}{' '}
          {/* Adiciona um fundo de cor enquanto o iframe carrega */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: '9999' }}>
            <Button icon={<ArrowLeftOutlined />} onClick={() => setIframeVisible(false)}>
              Voltar
            </Button>
          </div>
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '9999' }}>
            {pdfLink && (
              <a href={pdfLink} target="_blank" rel="noopener noreferrer">
                <Button type="primary" icon={<DownloadOutlined />}>
                  Ver PDF
                </Button>
              </a>
            )}
          </div>
          <iframe
            title="PDF Viewer"
            src={`https://www.anovator.com/report/index.html?id=${selectedExamId}&child=false&lang=pt_PT`}
            width="100%"
            height="100%"
            onLoad={handleIframeLoad} // Adiciona o evento onLoad ao iframe para controlar o carregamento
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
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {' '}
        {usuario.user_email === 'pratadeu@gmail.com' ||
        usuario.user_email === 'edujobtours@hotmail.com' ||
        usuario.user_email === 'glauberpratique@hotmail.com' ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/banner_home/anovator.png" height={40} style={{ display: 'block' }} />
          </div>
        ) : null}
      </div>
    </TreinoLayout>
  )
}
