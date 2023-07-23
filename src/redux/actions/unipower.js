import { setData, setLoading } from '../slices/unipower'
import apiUnipower from '@/services/apiUnipower'

export const getCursos = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiUnipower
      .post('/getCourses.php', { email: login.usuario.user_email, id: login.usuario.ID })
      .then(res => {
        dispatch(setData(res.data[0]))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
