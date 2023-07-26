import { setData, setLoading } from '../slices/afiliados'
import apiLojaAfiliados from '@/services/apiLojaAfiliados'

export const getDadosAfiliado = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiLojaAfiliados
      .post('getDadosAfiliado.php', { email: login.usuario.user_email, id: login.usuario.ID })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
