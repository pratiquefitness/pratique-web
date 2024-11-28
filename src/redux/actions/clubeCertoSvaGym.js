import { setLoading, setSvaClientParameters } from '../slices/clubeCertoSvaGym'
import apiClubeCertoSva from '@/services/apiClubeCertoSva'
import { setTheme } from '@/redux/actions/login'
import { message } from 'antd'

export const getClubeCertoSvaGym = login => {
  return async dispatch => {
    dispatch(setLoading(true))
    return apiClubeCertoSva
      .get(`/app/sva/consultaGym.php?company=1111`)
      .then(res => {
        if (Object.keys(res.data).length) {
          dispatch(setTheme(login.plano, res.data.primaryColor))
          dispatch(setSvaClientParameters(res.data))
        } else {
          message.error('Erro ao obter dados.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
