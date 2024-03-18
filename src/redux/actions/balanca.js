import axios from 'axios' // Importe o axios para fazer solicitações HTTP

// Função para chamar a API e retornar os dados dos exames com base no número de telefone
const fetchExams = async phoneNumber => {
  const url = 'https://www.anovator.com/OpenAPI!getExams.msg'

  // Dados a serem enviados na solicitação
  const data = {
    phone: phoneNumber
  }

  try {
    const response = await axios.post(url, data)
    // Retornar os dados dos exames da resposta
    return response.data
  } catch (error) {
    // Em caso de erro, lançar uma exceção
    throw new Error(`Falha na solicitação. Erro: ${error}`)
  }
}

export default fetchExams
