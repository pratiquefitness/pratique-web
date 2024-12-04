import React, { useState, useEffect } from 'react'
import { Button, Card, Space, Modal, Form, Input, Select, Upload, message } from 'antd'
import { FaWhatsapp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import YoutubePlayer from '../aulas_coletivas/_YoutubePlayerCancela' // Ajuste o caminho se necessário
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'

export default function Plano() {
  const { usuario } = useSelector(state => state.login)
  const [isVideoVisible, setIsVideoVisible] = useState(false)
  const [videoWatched, setVideoWatched] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [isThankYouVisible, setIsThankYouVisible] = useState(false)
  const [form] = Form.useForm()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [videoStartTime, setVideoStartTime] = useState(0)
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)
  const [isCancelConfirmationVisible, setIsCancelConfirmationVisible] = useState(false) // Novo estado

  const videoId = '1sQA3ick4as' // Substitua pelo ID do seu vídeo no YouTube

  // Função chamada quando o vídeo termina
  const onVideoEnd = () => {
    console.log('Vídeo terminou, definindo videoWatched como true.')
    setVideoWatched(true)
    localStorage.removeItem(`video-${videoId}-currentTime`)
  }

  const openVideo = () => {
    const savedTime = localStorage.getItem(`video-${videoId}-currentTime`)
    console.log('Abrindo vídeo, tempo salvo:', savedTime)
    setVideoStartTime(parseFloat(savedTime) || 0)
    setIsVideoVisible(true)
  }

  // Opções para o select "Motivo do cancelamento"
  const motivoOptions = [
    'Insatisfação com o serviço',
    'Mudança de endereço',
    'Questão de saúde',
    'Falta de tempo / Sem uso',
    'Financeiro',
    'Viagem / Férias'
  ]

  // Função para lidar com o envio do formulário
  const onFinish = async values => {
    try {
      // Criar um objeto FormData para enviar os dados incluindo o arquivo
      const formData = new FormData()
      formData.append('cpf_contrato', values.cpf_contrato)
      formData.append('whatsapp', values.whatsapp)
      formData.append('email', values.email)
      formData.append('motivo', values.motivo)
      formData.append('descricao', values.descricao)
      formData.append('tipo', selectedOption) // 'cancelamento' ou 'trancamento'

      if (values.documento && values.documento.file) {
        formData.append('documento', values.documento.file)
      }

      // Enviar os dados para o backend PHP
      await axios.post('https://pratiquetecnologia.com.br/api/app/cancelamento/index.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setIsFormVisible(false)
      setIsThankYouVisible(true)
    } catch (error) {
      message.error('Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.')
    }
  }

  // Data de hoje + 15 dias (usando JavaScript nativo)
  const dataAgendamento = (() => {
    const data = new Date()
    data.setDate(data.getDate() + 15)
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0') // Meses são baseados em zero
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  })()

  useEffect(() => {
    console.log('Estados atuais:', {
      isVideoVisible,
      isPopupVisible,
      isFormVisible,
      isThankYouVisible,
      videoWatched
    })
  }, [isVideoVisible, isPopupVisible, isFormVisible, isThankYouVisible, videoWatched])

  return (
    <Space direction="vertical" className="w-100">
      <Card title="Seu plano" size="small">
        <p>{usuario.plano || '-'}</p>
      </Card>
      <Card title="Sua unidade" size="small">
        <p>{usuario.unidade || '-'}</p>
      </Card>
      <a
        href="https://api.whatsapp.com/send?phone=553141411962&text=Olá estou no Aplicativo Pratique em Casa e gostaria de falar sobre meu plano."
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button icon={<FaWhatsapp fill="#25D366" />} block>
          Dúvidas sobre meu plano
        </Button>
      </a>

      {/* Botão "Cancelar Plano" */}
      <Button type="primary" danger block onClick={() => setIsAccordionOpen(true)}>
        Cancelar Plano
      </Button>

      {/* Conteúdo do Accordion */}
      {isAccordionOpen && (
        <div style={{ marginTop: '16px', textAlign: 'justify' }}>
          <p>
            É uma pena imaginar que deseja parar com os treinos e deixar a família PRATIQUE, mas entendemos que
            imprevistos podem ocorrer.
            <br />
            <br />
            Só orientamos que você faça esse pedido sempre, com pelo menos, 15 dias de antecedência à data de renovação
            mensal. Isso evita que você pague pelos dias remanescentes da sua assinatura e nos permite processar o
            cancelamento de maneira eficiente.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
            <Button type="primary" onClick={openVideo}>
              PROSSEGUIR
            </Button>
          </div>
        </div>
      )}

      {/* Modal do Vídeo */}
      <Modal
        visible={isVideoVisible}
        onCancel={() => {
          setIsVideoVisible(false)
          setIsAccordionOpen(false) // Resetar o accordion ao fechar o modal
        }}
        footer={null}
        width={360}
        centered
        destroyOnClose
      >
        {/* Mensagem exibida ao abrir o vídeo */}
        {!videoWatched && <p className="box-mensagem">É preciso ver o vídeo completo para prosseguir</p>}
        <YoutubePlayer
          id={videoId}
          onClose={() => {
            setIsVideoVisible(false)
            setIsAccordionOpen(false)
          }}
          onEnd={onVideoEnd}
          startTime={videoStartTime}
        />
        {/* Mostrar os botões após o vídeo ter sido assistido */}
        {videoWatched && (
          <>
            {console.log('Renderizando os botões')}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button
                type="primary"
                onClick={() => {
                  setSelectedOption('trancamento')
                  setIsPopupVisible(true)
                  setIsVideoVisible(false)
                  setIsFormVisible(false)
                }}
                style={{ display: 'block', margin: '0 auto 20px auto', width: '250px' }}
              >
                Trancar Indeterminado
              </Button>

              <Button
                type="primary"
                danger
                onClick={() => {
                  // Abrir o modal de confirmação
                  setIsCancelConfirmationVisible(true)
                  // Fechar outros modais se necessário
                  setIsFormVisible(false)
                  setIsVideoVisible(false)
                  setIsPopupVisible(false)
                }}
                style={{ display: 'block', margin: '0 auto', width: '250px' }}
              >
                Cancelamento e perder benefícios
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Popup após clicar em "Trancar Indeterminado" */}
      <Modal
        visible={isPopupVisible}
        onCancel={() => setIsPopupVisible(false)}
        footer={null}
        centered
        destroyOnClose
        bodyStyle={{
          minHeight: '300px', // Altura mínima do Modal
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px' // Padding interno
        }}
      >
        {/* Conteúdo Centralizado */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Perfeito!
            <br />
            Iremos trancar por tempo indeterminado e liberar o seu voucher de
          </p>
          <p style={{ fontSize: '30px', marginBottom: '1px', color: '#bc0e2f' }}>R$ 50,00</p>
        </div>
        {/* Botão com Espaçamento Maior */}
        <Button
          type="primary"
          onClick={() => {
            console.log('Fechando popup e abrindo formulário')
            setIsPopupVisible(false)
            setIsFormVisible(true)
            setIsVideoVisible(false)
            setSelectedOption('trancamento')
          }}
          style={{ marginTop: '30px', width: '200px' }}
        >
          Prosseguir
        </Button>
      </Modal>

      {/* Modal de Confirmação de Cancelamento */}
      <Modal
        visible={isCancelConfirmationVisible}
        onCancel={() => setIsCancelConfirmationVisible(false)}
        footer={null}
        centered
      >
        <p style={{ textAlign: 'center', fontSize: '16px' }}>
          Tem certeza que deseja <strong>PERDER</strong> o voucher de R$50,00 e perder os benefícios adquiridos quando
          quiser retornar?
        </p>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Button
            type="primary"
            onClick={() => {
              // Fechar o modal de confirmação
              setIsCancelConfirmationVisible(false)
              // Prosseguir para o formulário com 'trancamento'
              setSelectedOption('trancamento')
              setIsFormVisible(true)
            }}
            style={{ marginRight: '10px' }}
          >
            Melhor trancar
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              // Fechar o modal de confirmação
              setIsCancelConfirmationVisible(false)
              // Prosseguir para o formulário com 'cancelamento'
              setSelectedOption('cancelamento')
              setIsFormVisible(true)
            }}
          >
            Prosseguir com Cancelamento
          </Button>
        </div>
      </Modal>

      {/* Formulário */}
      <Modal visible={isFormVisible} onCancel={() => setIsFormVisible(false)} footer={null} centered destroyOnClose>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="CPF do Contrato"
            name="cpf_contrato"
            rules={[{ required: true, message: 'Por favor, insira o CPF do contrato' }]}
          >
            <Input placeholder="Digite o CPF do contrato" />
          </Form.Item>
          <Form.Item
            label="WhatsApp"
            name="whatsapp"
            rules={[{ required: true, message: 'Por favor, insira seu WhatsApp' }]}
          >
            <Input placeholder="(00) 00000-0000" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Por favor, insira seu email' }]}>
            <Input placeholder="Digite seu email" />
          </Form.Item>
          <Form.Item
            label="Motivo do cancelamento"
            name="motivo"
            rules={[{ required: true, message: 'Por favor, selecione o motivo' }]}
          >
            <Select placeholder="Selecione o motivo">
              {motivoOptions.map(motivo => (
                <Select.Option key={motivo} value={motivo}>
                  {motivo}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Anexe um documento com foto"
            name="documento"
            valuePropName="file"
            rules={[{ required: true, message: 'Por favor, anexe um documento com foto' }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Clique para enviar</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Descreva para a gente em detalhes o motivo da solicitação"
            name="descricao"
            rules={[{ required: true, message: 'Por favor, descreva o motivo' }]}
          >
            <Input.TextArea rows={4} placeholder="Digite aqui sua descrição" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Tela de Agradecimento */}
      <Modal
        visible={isThankYouVisible}
        onCancel={() => setIsThankYouVisible(false)}
        footer={null}
        centered
        destroyOnClose
      >
        <p>
          Obrigado por sua solicitação, seu {selectedOption === 'cancelamento' ? 'cancelamento' : 'trancamento'} está
          agendado para o dia {dataAgendamento}
        </p>
      </Modal>
    </Space>
  )
}
