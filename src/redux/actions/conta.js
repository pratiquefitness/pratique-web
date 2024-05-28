//import { setToken } from '@/contexts/AuthContext';
import { setLogin } from '../slices/login';
import { setIsPersonal, setLoading, setLoadingAvatar, setLoadingIsPersonal } from '../slices/conta'
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

export const userIsPersonal = avatar_image => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoadingIsPersonal(true));
    return apiPratiqueTecnologia
      .post('/app/personal/index.php', { email: login.usuario.user_email })
      .then(res => {
        dispatch(setIsPersonal(res.data.personal));
      })
      .finally(() => {
        dispatch(setLoadingIsPersonal(false))
      })
  }
}
