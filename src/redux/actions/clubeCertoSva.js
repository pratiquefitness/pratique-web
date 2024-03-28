import { setLoading, setSvaClientParameters } from '../slices/clubeCertoSva'
import apiClubeCertoSva from '@/services/apiClubeCertoSva'
import { setTheme } from "@/redux/actions/login";
import { message } from "antd";

export const getClubeCertoSva = (login) => {
  return async dispatch => {
    dispatch(setLoading(true))
    return apiClubeCertoSva
      .get(`/app/sva/consulta.php?company=${login.companyId}`)
      .then(res => {
        if (Object.keys(res.data).length) {
          dispatch(setTheme(login.plano, res.data.primaryColor))
          dispatch(setSvaClientParameters(res.data));
        } else {
          message.error('Erro ao obter dados.')
        }
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
