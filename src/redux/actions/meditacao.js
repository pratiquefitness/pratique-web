import { setData, setLoading } from '../slices/meditacao'
import api from '@/services/api'

export const getMeditacao = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .get('/meditacao')
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
