import axios from 'axios'

const API_URL = 'https://academiapratique.com.br/casuais/balanca/verifica.php'
const IMAGE_URL = 'https://academiapratique.com.br/casuais/balanca/imagem.php'

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Erro ao chamar a API:', error)
    throw new Error('Falha na solicitação.')
  }
}

export const fetchImageKey = async (apiKey, phone) => {
  const params = {
    apiKey: apiKey,
    phone: phone
  }

  const queryString = new URLSearchParams(params).toString()

  try {
    const response = await axios.get(`${API_URL}?${queryString}`)
    const data = response.data

    if (data && data.DATA && data.DATA.length > 0) {
      for (const item of data.DATA) {
        if (item.bodyImage) {
          console.log(item.bodyImage)
          return item.bodyImage
        }
      }
      throw new Error('Nenhuma chave de imagem encontrada nos dados da resposta.')
    } else {
      throw new Error('Nenhum dado encontrado na resposta da API.')
    }
  } catch (error) {
    console.error('Erro ao buscar a chave da imagem:', error)
    throw new Error('Falha ao buscar a chave da imagem.')
  }
}

export const fetchAndDisplayImage = async (apiKey, imageKey) => {
  try {
    const response = await axios.get(IMAGE_URL, {
      params: {
        key: imageKey
      },
      responseType: 'blob'
    })

    const imageUrlObject = URL.createObjectURL(new Blob([response.data]))

    const imageElement = document.createElement('img')
    imageElement.src = imageUrlObject
    document.body.appendChild(imageElement)
  } catch (error) {
    console.error('Erro ao exibir a imagem:', error)
    throw new Error('Falha ao exibir a imagem.')
  }
}

export const generatePDF = async phone => {
  try {
    // Busca a chave de imagem com base no telefone do usuário
    const imageKey = await fetchImageKey(phone)

    // Abre o link do relatório em uma nova janela
    window.open(`https://www.anovator.com/report/index.html?id=${imageKey}&child=false&lang=en_EN`, '_blank')
  } catch (error) {
    console.error('Erro ao gerar o PDF do relatório:', error)
    throw new Error('Falha ao gerar o PDF do relatório.')
  }
}
