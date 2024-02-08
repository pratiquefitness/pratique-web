import { setData, setLoading } from '../slices/diagnose'
import api from '@/services/api'
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'

export const getDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/diagnose', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setData(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getPerguntasDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    try {
      const response = await fetch('https://pratiquetecnologia.com.br/api/app/diagnose', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição da API: ${response.statusText}`)
      }

      const data = await response.json()
      dispatch(setData(data))
    } catch (error) {
      console.error('Erro na requisição da API:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export const getStatusDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .get('/app/diagnose')
      .then(res => {
        dispatch(setData(res.data))
      })
      .catch(error => {
        console.error('Erro na requisição da API:', error)
        // Aqui você pode despachar uma ação para lidar com o erro, se necessário
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

// export const getPerguntasDiagnose = () => {
//   return async (dispatch, getState) => {
//     const { login } = getState()
//     const apiUrl = `https://pratiquetecnologia.com.br/api/app/diagnose/?email=${login.usuario.user_email}`

//     dispatch(setLoading(true))

//     try {
//       const response = await fetch(apiUrl)

// 	  console.log("response",response);

//       if (!response.ok) {
//         throw new Error(`Erro na requisição: ${response.status}`)
//       }

//       //const data = await response.json()

//       dispatch(setData(data))

//       return
//     } catch (error) {
//       // Lidar com erros
//       console.error('Erro na requisição:', error.message)
//     } finally {
//       dispatch(setLoading(false))
//     }
//   }
// }
