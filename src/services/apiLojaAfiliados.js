import axios from 'axios'

const apiLojaAfiliados = axios.create({
  baseURL: `https://lojapratique.com.br/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default apiLojaAfiliados
