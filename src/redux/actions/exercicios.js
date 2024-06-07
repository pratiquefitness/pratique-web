import { message } from 'antd'
import {setLoading, setTreinoLivre, setListarTreino} from '../slices/exercicios'
import api from '@/services/api'

export const getTreinoLivre = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    return api
      .post('/exercicios', {usuarioId: id})
      .then(res => {
        dispatch(setTreinoLivre(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const saveTreinoLivre = data => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/exercicios/saveTreinoLivre', data)
      .then(() => {
        message.open({
          type: 'success',
          content: 'Treino salvo com sucesso!',
          style: {
            marginTop: '40vh',
          },
        });
        dispatch(getTreinoLivreAluno(login.usuario.ID));
        dispatch(getTreinoLivre(data.id_user));
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const deleteTreinoLivre = (id_ficha, id_user ) => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .post('/exercicios/deleteTreinoLivre', {id: id_ficha})
      .then(() => {
        message.open({
          type: 'success',
          content: 'Treino deletado com sucesso!',
          style: {
            marginTop: '40vh',
          },
        });
        dispatch(getTreinoLivre(id_user))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const updateTreinoLivre = (data ) => {
  return async dispatch => {
    dispatch(setLoading(true))
    return api
      .post('/exercicios/updateTreinoLivre', {data: data})
      .then(() => {
        message.open({
          type: 'success',
          content: 'Treino atualizado com sucesso!',
          style: {
            marginTop: '40vh',
          },
        });
        dispatch(getTreinoLivre(parseInt(data.id_user)))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const getTreinoLivreAluno = (id) => {
  return async (dispatch) => {
    dispatch(setLoading(true))
    return api
      .post('/exercicios/personal', {usuarioId: id})
      .then(res => {
        dispatch(setTreinoLivre(res.data))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
