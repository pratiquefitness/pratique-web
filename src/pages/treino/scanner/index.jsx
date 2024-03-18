import React, { useEffect, useState } from 'react'
import { Button, Empty } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import TreinoLayout from '../_Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getTreino } from '@/redux/actions/treino'
import fetchData from '@/redux/actions/balanca' // Importe a função fetchData

export default function ScannerView() {
  const dispatch = useDispatch()
  const { data } = useSelector(state => state.treino)
  const { fichas } = data
  const temExame = fichas && fichas.find(objeto => objeto.urlexame && objeto.urlexame.includes('pdf'))
  const [apiKey, setApiKey] = useState('')
  const [examsData, setExamsData] = useState(null) // Estado para armazenar os dados dos exames

  useEffect(() => {
    dispatch(getTreino())

    // Chamada para a função fetchData
    const fetchDataFromBalanca = async () => {
      try {
        const apiKeyResponse = await fetchData()
        setApiKey(apiKeyResponse)
      } catch (error) {
        console.error('Erro ao chamar a API:', error)
      }
    }

    fetchDataFromBalanca()
  }, [])

  useEffect(() => {
    if (!apiKey) return // Não faz nada se a chave da API não estiver disponível

    const fetchExamsData = async () => {
      try {
        const response = await fetchExams(apiKey) // Função para buscar dados dos exames usando a chave da API
        setExamsData(response)
      } catch (error) {
        console.error('Erro ao buscar dados dos exames:', error)
      }
    }

    fetchExamsData()
  }, [apiKey]) // Executa apenas quando a chave da API mudar

  const fetchExams = async apiKey => {
    const url = 'https://www.anovator.com/OpenAPI!getExams.msg'
    const phone = user.telefone.replace(/\D/g, '') // Remove caracteres não numéricos do número de telefone
    const adelmo = '31997752812'

    const params = {
      apiKey: apiKey,
      //  phone: phone
      phone: phone
    }

    const queryString = new URLSearchParams(params).toString()

    try {
      const response = await fetch(`${url}?${queryString}`)
      if (!response.ok) {
        throw new Error('Failed to fetch exams data')
      }
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(`Error fetching exams data: ${error.message}`)
    }
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
        <Empty className="my-8" />
      )}

      {apiKey && (
        <div>
          {examsData ? <div>{/* Exibir os dados dos exames aqui */}</div> : <div>Carregando dados dos exames...</div>}
        </div>
      )}
    </TreinoLayout>
  )
}
