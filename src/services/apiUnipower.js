import axios from 'axios'

const apiUnipower = axios.create({
  baseURL: `https://metodologiapowergym.com.br/api/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default apiUnipower
