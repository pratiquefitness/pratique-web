import { setData, setLoading } from '../slices/diagnose'
import api from '@/services/api'

// export const getDiagnose = () => {
//   return async (dispatch, getState) => {
//     const { login } = getState()
//     dispatch(setLoading(true))
//     return api
//       .post('/diagnose', { email: login.usuario.user_email })
//       .then(res => {
//         dispatch(setData(res.data))
//       })
//       .finally(() => {
//         dispatch(setLoading(false))
//       })
//   }
// }

export const getDiagnose = () => {
  return async (dispatch, getState) => {
    try {
      const { login } = getState()
      dispatch(setLoading(true))
      const response = await api.get('/diagnose', { email: login.usuario.user_email })
      dispatch(setData(response.data))
    } catch (error) {
      console.error('Error during diagnose request:', error)
      return
    } finally {
      dispatch(setLoading(false))
    }
  }
}

//export const verifyDiagnoseData = () => {
//   return async (dispatch, getState) => {
//     try {
//       const { login } = getState()
//       dispatch(setLoading(true))
//       const response = await api.post('/diagnose', { email: login.usuario.user_email })
//       dispatch(setData(response.data))
//     } catch (error) {
//       console.error('Error during diagnose request:', error)
//       return
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
//}

//export const getDiagnoseReport = () => {
//   return async (dispatch, getState) => {
//     try {
//       const { login } = getState()
//       dispatch(setLoading(true))
//       const response = await api.post('/diagnose', { email: login.usuario.user_email })
//       dispatch(setData(response.data))
//     } catch (error) {
//       console.error('Error during diagnose request:', error)
//       return
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
//}
