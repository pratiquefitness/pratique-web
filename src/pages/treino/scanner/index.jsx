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
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedExamId, setSelectedExamId] = useState(null)

  useEffect(() => {
    dispatch(getTreino())

    const fetchExamsData = async () => {
      try {
        if (usuario && usuario.telefone) {
          const telefoneLimpo = usuario.telefone.replace(/\D/g, '') // \D corresponde a qualquer caractere que não seja um dígito
          const telefoneSemParenteses = telefoneLimpo.replace(/[(|)]/g, '') // Remover parênteses
          const response = await axios.get(
            `https://pratiquetecnologia.com.br/api/balanca/id.php?phone=${telefoneSemParenteses}`
          )

          // Verificar se a resposta é bem-sucedida e os dados foram retornados
          if (response.status === 200 && response.data && response.data.length > 0) {
            // Convertendo as datas para um formato legível
            const examsWithFormattedDate = response.data.map(exam => ({
              ...exam,
              gmtCreate: new Date(exam.gmtCreate).toLocaleString()
            }))
            setExamsData(examsWithFormattedDate)
          } else {
            // Se não há exames disponíveis para o usuário
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

    // Abrir a página embutida na aplicação
    dispatch(setBrowserURL(`https://www.anovator.com/report/index.html?id=${record.id}&child=false&lang=pt_PT`))
  }

  return (
    <TreinoLayout>
      {temExame ? (
        <a href={temExame?.urlexame} target="_blank" rel="noopener noreferrer">
          <Button shape="round" icon={<DownloadOutlined />} size="large" block>
            Baixar Exame
          </Button>
        </a>
      ) : (
        <div style={{ textAlign: 'center' }}></div>
      )}
      {examsData ? (
        <div>
          <Table
            dataSource={examsData}
            columns={[
              {
                title: 'Data',
                dataIndex: 'data_column',
                key: 'gmtCreate',
                render: data_column => {
                  const date = new Date(data_column)
                  return date.toLocaleDateString() // Exibir apenas a data sem a hora
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
          <Modal visible={false} footer={null}>
            {selectedImage && <img src={selectedImage} alt="Imagem do exame" style={{ maxWidth: '100%' }} />}
            {selectedExamId && (
              <Button
                type="primary"
                shape="round"
                icon={<DownloadOutlined />}
                size="large"
                onClick={() =>
                  dispatch(
                    setBrowserURL(
                      `https://www.anovator.com/report/index.html?id=${selectedExamId}&child=false&lang=pt_PT`
                    )
                  )
                }
              >
                Ver PDF
              </Button>
            )}
          </Modal>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}> </div>
      )}{' '}
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        {' '}
        {usuario.user_email === 'pratadeu@gmail.com' || usuario.user_email === 'adelmo2@gmail.com' ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/images/banner_home/anovator.png" height={40} style={{ display: 'block' }} />
          </div>
        ) : null}
      </div>
    </TreinoLayout>
  )
}
