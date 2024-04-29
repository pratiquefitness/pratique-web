import {setLoading, setResumo, setUnidades} from '../slices/declaracaoVenda';
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia';
import { message } from 'antd';

export const getUnidades = () => {
  let data = [];
  return async (dispatch) => {
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .get('/app/afiliado/unidades/', {})
      .then(res => {
        if (res.data.length !== 0) {
          res.data.map((v) => {
            data = [...data, {value: v.id, label: v.nome}]
          });
        }
        dispatch(setUnidades(data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const saveDeclaracaoVenda = values => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .post('/app/afiliado/salva/salva.php', values)
      .then(res => {
        message.success('Dados salvos com sucesso!')
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getResumo = (mes, email) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .post('/app/afiliado/validadas/', {mes: mes, email: email})
      .then(res => {
        dispatch(setResumo(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
