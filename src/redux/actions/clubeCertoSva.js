import { setLoading, setSvaClientParameters } from '../slices/clubeCertoSva'
import { setTheme } from '@/redux/actions/login'
import { message } from 'antd'
import axios from 'axios'

export const getClubeCertoSva = login => {
  return async dispatch => {
    dispatch(setLoading(true))

    const cpf = login.cpf

    try {
      const response = await axios.get('https://pratiquetecnologia.com.br/api/app/sva/consulta.php?company=2573', {
        params: { cpf: cpf }
      })

      if (response.data && Object.keys(response.data).length > 0) {
        dispatch(setTheme(login.plano, response.data.primaryColor))
        dispatch(setSvaClientParameters(response.data))
      } else {
        message.error('Erro ao obter dados.')
      }
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error)
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error)
      } else {
        message.error('Erro ao obter dados da API.')
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
}
