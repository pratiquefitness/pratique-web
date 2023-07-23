import axios from 'axios'

const apiUnipower = axios.create({
  baseURL: `https://metodologiapowergym.com/api/`
})

export default apiUnipower
