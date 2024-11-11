import axios from 'axios'

const url = 'https://pratiquetecnologia.com.br'

const apiPratiqueTecnologia = axios.create({
  baseURL: `${url}/api`,
})

export default apiPratiqueTecnologia
