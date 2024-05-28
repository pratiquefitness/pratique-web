//import { setToken } from '@/contexts/AuthContext';
import { setLogin } from '../slices/login';
import {
  setAlunosPersonal,
  setIsPersonal,
  setLoading,
  setLoadingAlunosPersonal,
  setLoadingAvatar,
  setLoadingIsPersonal,
  setVincularAluno
} from '../slices/conta'
import api from '@/services/api';
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia';
import { message } from 'antd';

export const updateConta = values => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoading(true));
    return api
      .post('/conta', { id: login.usuario.ID, ...values })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }));
        //setToken(res.data);
        message.success('Dados alterados com sucesso!');
      })
      .finally(() => {
        dispatch(setLoading(false));
      })
  }
}

export const uploadAvatar = avatar_image => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoadingAvatar(true));
    return api
      .post('/conta/uploadAvatar', { id: login.usuario.ID, avatar_image })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }));
        //setToken(res.data);
        message.success('Avatar alterado com sucesso!');
      })
      .finally(() => {
        dispatch(setLoadingAvatar(false));
      })
  }
}

export const getAlunosPersonal = avatar_image => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoadingIsPersonal(true));
    return apiPratiqueTecnologia
      .post('/app/personal/index.php', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setIsPersonal(res.data.personal));
        dispatch(setAlunosPersonal(res.data.users));
      })
      .finally(() => {
        dispatch(setLoadingIsPersonal(false))
      })
  }
}

export const buscarAlunosPersonal = (email) => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoadingAlunosPersonal(true));
    return apiPratiqueTecnologia
      .post('/app/personal/alunos/index.php', { id: login.usuario.ID, email: email })
      .then(res => {
        if(res.data?.message !== undefined) {
           message.error(res.data?.message);
        } else {
          if(
            res.data.data[0]?.id_personal === '' ||
            res.data.data[0]?.id_personal === null ||
            res.data.data[0]?.id_personal === login.usuario.ID
          ) {
            dispatch(setVincularAluno(res.data.data[0]));
          }
          if(login.usuario.ID !== res.data.data[0].id_personal) {
            //PALEATIVO
            //message.error('Aluno vinculado a outro personal!');
            dispatch(setVincularAluno(res.data.data[0]));
          }
        }
      })
      .finally(() => {
        dispatch(setLoadingAlunosPersonal(false))
      })
  }
}
