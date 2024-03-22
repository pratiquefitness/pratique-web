import {setLoading, setTreino} from '../slices/powerflixTreinos';
import api from '@/services/api';
export const getTreinos = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    return api
      .post('/powerflix_treino', data)
      .then(res => {
        dispatch(setTreino(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
