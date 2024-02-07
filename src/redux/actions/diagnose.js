import { setData, setLoading } from '../slices/diagnose'
import api from '@/services/api'
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'

export const getDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/diagnose', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPerguntasDiagnose = () => {
  return async (dispatch, getState) => {
    try {
      const { login } = getState()
      dispatch(setLoading(true))
	  const res = await apiPratiqueTecnologia.get('/app/diagnose', { email: login.usuario.user_email })
      dispatch(setData(res.data))
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Erro de Bad Request:', error.response.data)
      } else {
        console.error('Erro ao obter perguntas de diagnose:', error)
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
}
