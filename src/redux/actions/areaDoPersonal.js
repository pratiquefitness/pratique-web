import { setToken } from '@/contexts/AuthContext'
import { setLogin } from '../slices/login'
import { setBanner, setLoading, setLoadingAvatar } from '../slices/areaDoPersonal'
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'
import { message } from 'antd'
import api from '@/services/api'

export const bannerPersonal = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .post('/app/personal/banner/index.php', {})
      .then(res => {
        dispatch(setBanner(res.data.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}