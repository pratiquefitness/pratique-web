import React, { useState, useEffect } from 'react'
import { Button, Card, Space, Modal, Form, Input, Select, Upload, message } from 'antd'
import { FaWhatsapp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import YoutubePlayer from '../aulas_coletivas/_YoutubePlayerCancela' // Ajuste o caminho se necessário
import axios from 'axios'
import { UploadOutlined } from '@ant-design/icons'
import InputMask from 'react-input-mask' // Importar o InputMask

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

  const videoId = 'LgNM9s7abYQ' // Substitua pelo ID do seu vídeo no YouTube

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

  const validarWhatsApp = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Por favor, insira seu WhatsApp'))
    }

    // Remover todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '')

    // Verificar se o número tem 10 ou 11 dígitos
    if (numbers.length === 10 || numbers.length === 11) {
      return Promise.resolve()
    }

    return Promise.reject(new Error('Número de WhatsApp inválido'))
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

  // Função para validar o CPF
  const validarCPF = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Por favor, insira o CPF do contrato'))
    }

    // Remover pontos e traço
    const cpf = value.replace(/[^\d]+/g, '')

    // Implementar a lógica de validação do CPF
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return Promise.reject(new Error('CPF inválido'))
    }

    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i)
    }
    resto = (soma * 10) % 11
    resto = resto === 10 || resto === 11 ? 0 : resto

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return Promise.reject(new Error('CPF inválido'))
    }

    soma = 0
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i)
    }
    resto = (soma * 10) % 11
    resto = resto === 10 || resto === 11 ? 0 : resto

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return Promise.reject(new Error('CPF inválido'))
    }

    return Promise.resolve()
  }

  // Função para lidar com o envio do formulário
  const onFinish = async values => {
    try {
      console.log('Valores do formulário:', values)

      const formData = new FormData()
      formData.append('cpf_contrato', values.cpf_contrato)
      formData.append('whatsapp', values.whatsapp)
      formData.append('email', values.email)
      formData.append('motivo', values.motivo)
      formData.append('descricao', values.descricao)
      formData.append('tipo', selectedOption) // 'cancelamento', 'trancamento_indeterminado' ou 'trancamento_90dias'

      // Verificar se o documento está presente
      if (values.documento && values.documento.length > 0) {
        console.log('Arquivo selecionado:', values.documento[0])
        formData.append('documento', values.documento[0].originFileObj)
      } else {
        message.error('Por favor, anexe um documento com foto.')
        return
      }

      // Enviar os dados para o backend PHP
      await axios.post('https://pratiquetecnologia.com.br/api/app/cancelamento/index2.php', formData, {
        // Não defina o Content-Type aqui
      })

      setIsFormVisible(false)
      setIsThankYouVisible(true)
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error.response ? error.response.data : error.message)
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

  const WhatsAppInput = ({ value = '', onChange }) => {
    const numbers = value.replace(/\D/g, '')
    const mask = numbers.length > 10 ? '(99) 99999-9999' : '(99) 9999-9999'

    return (
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        maskChar={null}
        key={mask} // Força a re-montagem quando a máscara muda
      >
        {inputProps => <Input {...inputProps} placeholder="(00) 00000-0000" />}
      </InputMask>
    )
  }

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
        Cancelar / Trancar Plano
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
              {/* Botão para Trancar por 90 dias */}
              <Button
                type="primary"
                onClick={() => {
                  setSelectedOption('trancamento_90dias')
                  setIsFormVisible(true)
                  setIsVideoVisible(false)
                }}
                style={{ display: 'block', margin: '0 auto 10px auto', width: '250px' }}
              >
                Trancar por 90 dias
              </Button>

              {/* Botão para Trancamento Indeterminado */}
              <Button
                type="primary"
                onClick={() => {
                  setSelectedOption('trancamento_indeterminado')
                  setIsPopupVisible(true)
                  setIsVideoVisible(false)
                  setIsFormVisible(false)
                }}
                style={{ display: 'block', margin: '0 auto 10px auto', width: '250px' }}
              >
                Trancar Indeterminado
              </Button>

              {/* Botão para Cancelamento */}
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
            setSelectedOption('trancamento_indeterminado')
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
              // Prosseguir para o formulário com 'trancamento_indeterminado'
              setSelectedOption('trancamento_indeterminado')
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
            rules={[{ required: true, message: 'Por favor, insira o CPF do contrato' }, { validator: validarCPF }]}
          >
            <InputMask mask="999.999.999-99">
              {inputProps => <Input {...inputProps} placeholder="Digite o CPF do contrato" />}
            </InputMask>
          </Form.Item>

          <Form.Item
            label="WhatsApp"
            name="whatsapp"
            rules={[{ required: true, message: 'Por favor, insira seu WhatsApp' }, { validator: validarWhatsApp }]}
          >
            <WhatsAppInput />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Por favor, insira seu email' },
              {
                type: 'email',
                message: 'Email inválido'
              }
            ]}
          >
            <Input placeholder="Digite seu email" />
          </Form.Item>

          <Form.Item
            label="Motivo da solicitação"
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
            valuePropName="fileList"
            getValueFromEvent={e => {
              console.log('Evento de upload:', e)
              return e && e.fileList
            }}
            rules={[{ required: true, message: 'Por favor, anexe um documento com foto' }]}
          >
            <Upload accept="image/*,application/pdf" beforeUpload={() => false} maxCount={1}>
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
          Obrigado por sua solicitação, seu{' '}
          {selectedOption === 'cancelamento'
            ? 'cancelamento'
            : selectedOption === 'trancamento_90dias'
              ? 'trancamento por 90 dias'
              : 'trancamento indeterminado'}{' '}
          está agendado para o dia {dataAgendamento}
        </p>
      </Modal>
    </Space>
  )
}
