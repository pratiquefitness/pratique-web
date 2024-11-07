import axios from 'axios'

const apiPratiqueFitness = axios.create({
  baseURL: `https://pratiquefitness.com.br/comprar/`,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default apiPratiqueFitness
