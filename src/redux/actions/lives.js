import { setData, setLoading } from '../slices/lives'
import api from '@/services/api'

export const getLives = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .get('/lives')
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
