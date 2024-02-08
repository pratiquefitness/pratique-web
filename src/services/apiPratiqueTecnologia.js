import axios from 'axios'

const url = 'https://pratiquetecnologia.com.br'

const apiPratiqueTecnologia = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
  headers: {
	 'Content-Type': 'application/x-www-form-urlencoded',
  }
})

export default apiPratiqueTecnologia
