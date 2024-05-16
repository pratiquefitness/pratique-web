import { setData, setLoading, setCoordenada } from '../slices/cis';
import api from '@/services/api';
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia';

export const getCis = () => {
  return async (dispatch, getState) => {
    try {
      const { login } = getState()
      // console.log('Estado atual de login:', login)
      dispatch(setLoading(true))

      const res = await api.post('/cis', {
        email: login.usuario.user_email,
        cargo: login.usuario.cargo
      });

      dispatch(setData(res.data))

      const coordenada = await apiPratiqueTecnologia
        .post('/app/coordenada/consulta.php',
          {unidade: login.usuario.unidade},
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
        )
      dispatch(setCoordenada(coordenada.data));
      // console.log('Resposta da API:', res.data)
    } catch (error) {
      // console.error('Erro ao obter cis:', error)
    } finally {
      // console.log('Finalizando requisição')
      dispatch(setLoading(false))
    }
  }
}

export const getGeolocalizacaoUnidade = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return apiPratiqueTecnologia
      .post('/app/coordenada/consulta.php',
        {unidade: login.usuario.unidade},
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
      )
      .then(res => {
        dispatch(setData(prevState => ({
          ...prevState,
          data: {
            ...prevState.data,
            coordenadaUnidade: res.data
          },
        })))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

