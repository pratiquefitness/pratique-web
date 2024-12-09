// src/pages/afiliados/_Pagamentos.jsx

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPix, getPixPayments } from '@/redux/actions/afiliados'
import { Table, Typography, Spin, Alert, Button } from 'antd'
import utils from '@/utils'

const { Title } = Typography

const Pagamentos = () => {
  const dispatch = useDispatch()
  const { pix, pixLoading, pixPayments, pixPaymentsLoading } = useSelector(state => state.afiliados)

  useEffect(() => {
    dispatch(getPix())
  }, [dispatch])

  useEffect(() => {
    if (pix && pix.chave) {
      console.log('Chave Pix encontrada:', pix.chave) // Log para depuração
      dispatch(getPixPayments(pix.chave))
    }
  }, [pix.chave, dispatch])

  // Função para gerar o recibo
  const gerarRecibo = pagamento => {
    const receiptWindow = window.open('', '_blank')
    console.log(pagamento)

    // Conteúdo HTML do recibo
    const receiptContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Recibo de Pagamento</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          body {
            font-family: 'Roboto', Arial, sans-serif;
            padding: 20px;
            color: #333;
            background-color: #f9f9f9;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 150px;
            margin-bottom: 10px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            color: #2c3e50;
          }
          .header p {
            margin: 0;
            font-size: 16px;
            color: #34495e;
          }
          .details {
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .details p {
            margin: 10px 0;
            font-size: 14px;
          }
          .details strong {
            display: inline-block;
            width: 200px;
            color: #2c3e50;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #777;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
          }
          th, td {
            padding: 10px;
            text-align: left;
            font-size: 14px;
          }
          th {
            background-color: #f2f2f2;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .header, .details, .footer {
              page-break-inside: avoid;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/images/webp/logo-pratique.webp" alt="Logo da Empresa" />
          <h1>Recibo de Pagamento</h1>
                  </div>
        <div class="details">
          <p><strong>ID do Pagamento:</strong> ${pagamento.id}</p>
          <p><strong>Nome:</strong> ${pagamento.nome}</p>
          <p><strong>CPF/CNPJ:</strong> ${pagamento.cpf_cnpj}</p>
          <p><strong>Conta Corrente:</strong> ${pagamento.conta_corrente}</p>      
          <p><strong>Chave Pix:</strong> ${pagamento.chave}</p>         
          <p><strong>Status:</strong> ${pagamento.status}</p>
          <p><strong>Valor:</strong> ${utils.formatCurrency(pagamento.valor)}</p>
          <p><strong>Data e Hora do Movimento:</strong> ${utils.formatDate(pagamento.data_hora_movimento)} ${utils.formatTime(pagamento.data_hora_movimento)}</p>       
        
        </div>
        <div class="footer">
          <p>Obrigado por utilizar nossos serviços!</p>
        </div>
      </body>
      </html>
    `

    // Escrever o conteúdo no novo documento
    receiptWindow.document.open()
    receiptWindow.document.write(receiptContent)
    receiptWindow.document.close()

    // Esperar o conteúdo carregar e então abrir a caixa de diálogo de impressão
    receiptWindow.onload = () => {
      receiptWindow.focus()
      receiptWindow.print()
    }
  }

  const columns = [
    {
      title: 'Data',
      dataIndex: 'data_hora_movimento',
      key: 'data_hora_movimento',
      render: text => <span>{utils.formatDate(text)}</span> // Uso da função formatDate
    },
    {
      title: 'Hora',
      dataIndex: 'data_hora_movimento',
      key: 'hora',
      render: text => <span>{utils.formatTime(text)}</span> // Uso da função formatTime
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: value => <span>{utils.formatCurrency(value)}</span> // Uso da função formatCurrency
    },
    {
      title: 'Conta',
      dataIndex: 'conta_corrente',
      key: 'conta_corrente'
    },
    {
      title: 'Recibo',
      key: 'recibo',
      render: (_, record) => (
        <Button
          style={{
            backgroundColor: '#ed143d', // Cor de fundo azul padrão do Ant Design
            color: '#fff', // Cor do texto branca
            fontSize: '11px',
            border: 'none', // Remove a borda
            padding: '3px', // Ajusta o padding para um botão pequeno
            borderRadius: '4px', // Bordas arredondadas
            cursor: 'pointer' // Cursor de ponteiro
          }}
          type="link"
          onClick={() => gerarRecibo(record)}
        >
          RECIBO
        </Button>
      )
    }
  ]

  return (
    <div>
      <Title level={4}>Pagamentos Recebidos via Pix</Title>
      {pixPaymentsLoading ? (
        <Spin />
      ) : (
        <Table dataSource={pixPayments} columns={columns} pagination={false} rowKey={'id'} />
      )}
    </div>
  )
}

export default Pagamentos
