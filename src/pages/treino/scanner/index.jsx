import React, { useEffect, useState } from 'react'
import { Button, Empty, Modal, Table } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import axios from 'axios'
import { fetchData } from '@/redux/actions/balanca'
import { generatePDF } from '@/redux/actions/balanca'

export default function ScannerView() {
  const { usuario } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.find(objeto => objeto.urlexame && objeto.urlexame.includes('pdf'))
  const [examsData, setExamsData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)

  const handleDownloadPDF = async examId => {
    if (!examId) return // Verifica se há um ID de exame selecionado

    const url = `https://www.anovator.com/report/index.html?id=${examId}&child=false&lang=en_EN`

    try {
      // Abre a página do relatório do exame em uma nova janela
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch PDF report')
      }

      const blob = await response.blob()

      // Cria um URL temporário para o blob
      const blobUrl = URL.createObjectURL(blob)

      // Cria um link para o PDF e simula um clique para iniciar o download
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'report.pdf'
      document.body.appendChild(link)
      link.click()

      // Limpa o URL temporário
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Erro ao baixar o relatório PDF:', error)
    }
  }

  useEffect(() => {
    dispatch(getTreino())

    const fetchExamsData = async () => {
      try {
        if (usuario && usuario.telefone) {
          const response = await axios.get(
            `https://pratiquetecnologia.com.br/api/balanca/id.php?phone=${usuario.telefone}`
          )
          setExamsData(response.data)
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
    setModalVisible(true)

    try {
      // Gera o PDF do relatório ao clicar na imagem, passando o telefone do usuário
      await generatePDF(usuario.telefone)
    } catch (error) {
      console.error('Erro ao gerar o PDF do relatório:', error)
    }
  }
  const columns = [
    {
      title: 'Data',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: gmtCreate => {
        const date = new Date(gmtCreate)
        return date.toLocaleString()
      }
    },
    {
      title: 'Ações',
      key: 'actions',
      render: record => (
        <Button type="primary" onClick={() => handleDownloadPDF(record.id)}>
          Ver Imagem
        </Button>
      )
    }
  ]

  return (
    <TreinoLayout>
      {temExame ? (
        <a href={temExame?.urlexame} target="_blank" rel="noopener noreferrer">
          <Button shape="round" icon={<DownloadOutlined />} size="large" block>
            Baixar Exame
          </Button>
        </a>
      ) : (
        <Empty className="my-8" />
      )}

      {examsData ? (
        <div>
          <Table
            dataSource={examsData}
            columns={columns}
            onRow={(record, rowIndex) => ({
              onClick: () => setSelectedExamId(record.id)
            })}
          />
          <Modal open={modalVisible} onClose={() => setModalVisible(false)} footer={null} destroyOnClose>
            {selectedImage && <img src={selectedImage} alt="Imagem do exame" style={{ maxWidth: '100%' }} />}
          </Modal>
        </div>
      ) : (
        <div>Carregando dados dos exames...</div>
      )}
    </TreinoLayout>
  )
}
