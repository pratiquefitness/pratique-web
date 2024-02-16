import { setData, setLoading } from '../slices/aulasColetivas'
import api from '@/services/api'

export const getAulasColetivas = aula_categoria => {
  /*aula_categoria
  

  */

  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .post('/aulas_coletivas', { aula_categoria })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
