import apiPratiqueFitness from '@/services/apiPratiqueFitness'
import {
  setComissao,
  setGeral,
  setLoading,
  setPlanos,
  setPlanosLoading,
  setProdutos,
  setUnidades
} from '../slices/afiliados'
import apiLojaAfiliados from '@/services/apiLojaAfiliados'

export const getDadosAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getDadosAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate
      })
      .then(res => {
        dispatch(setGeral(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getComissoesAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getComisoesAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate
      })
      .then(res => {
        dispatch(setComissao(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getProdutosAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getProdutosAfiliado.php', {
        isAffiliate: login.usuario.isAffiliate
      })
      .then(res => {
        dispatch(setProdutos(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getUnidades = () => {
  return async dispatch => {
    dispatch(setLoading(true))
    return apiPratiqueFitness
      .get('getunidades/index.php')
      .then(res => {
        dispatch(setUnidades(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPlanos = (chave, separador) => {
  return async dispatch => {
    dispatch(setPlanosLoading(true))
    return apiPratiqueFitness
      .get(`getplanos/index.php?unidade=${chave}|${separador}`)
      .then(res => {
        dispatch(setPlanos(res.data))
      })
      .finally(() => {
        dispatch(setPlanosLoading(false))
      })
  }
}
