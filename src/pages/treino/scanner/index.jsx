import React, { useEffect, useState } from 'react'
import { Button, Empty, Modal, Table } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
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
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)

  useEffect(() => {
    dispatch(getTreino())

    const fetchExamsData = async () => {
      try {
        if (usuario && usuario.telefone) {
          const response = await axios.get(
            `https://pratiquetecnologia.com.br/api/balanca/id.php?phone=${usuario.telefone}`
          )
          // Convertendo as datas para um formato legível
          const examsWithFormattedDate = response.data.map(exam => ({
            ...exam,
            gmtCreate: new Date(exam.gmtCreate).toLocaleString()
          }))
          setExamsData(examsWithFormattedDate)
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
      // Abrir a página embutida na aplicação
      dispatch(setBrowserURL(`https://www.anovator.com/report/index.html?id=${record.id}&child=false&lang=pt_PT`))
    } catch (error) {
      console.error('Erro ao abrir a página:', error)
    }
  }

  const columns = [
    {
      title: 'Data',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: gmtCreate => {
        const date = new Date(gmtCreate)
        return date.toLocaleDateString() // Exibir apenas a data sem a hora
      }
    },
    {
      title: 'Ações',
      key: 'actions',
      render: record => (
        <Button type="primary" onClick={() => handleImageClick(record)}>
          VER EXAME
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
