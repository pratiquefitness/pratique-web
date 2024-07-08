//import { setToken } from '@/contexts/AuthContext';
import { setLogin } from '../slices/login'
import {
  setAlunosPersonal,
  setIsPersonal,
  setLoading,
  setLoadingAlunosPersonal,
  setLoadingAvatar,
  setLoadingIsPersonal,
  setVincularAluno,
  setDadosAluno,
  setLoadingPersonal,
  setPersonal,
  setMeuPersonal
} from '../slices/conta'
import api from '@/services/api'
import apiPratiqueTecnologia from '@/services/apiPratiqueTecnologia'
import { message } from 'antd'

export const updateConta = values => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/conta', { id: login.usuario.ID, ...values })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }))
        //setToken(res.data);
        message.success('Dados alterados com sucesso!')
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const uploadAvatar = avatar_image => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingAvatar(true))
    return api
      .post('/conta/uploadAvatar', { id: login.usuario.ID, avatar_image })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }))
        //setToken(res.data);
        message.success('Avatar alterado com sucesso!')
      })
      .finally(() => {
        dispatch(setLoadingAvatar(false))
      })
  }
}

export const getAlunosPersonal = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingIsPersonal(true))
    return apiPratiqueTecnologia
      .post('/app/personal/index.php', { id: login.usuario.ID })
      .then(res => {
        dispatch(setIsPersonal(res.data.personal))
        dispatch(setAlunosPersonal(res.data.users))
      })
      .finally(() => {
        dispatch(setLoadingIsPersonal(false))
      })
  }
}

export const personalAlunoServico = (aluno, vinculo) => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingAlunosPersonal(true))
    return api
      .post('/personal', { personalId: parseInt(login.usuario.ID), alunoId: aluno, vinculo: vinculo })
      .then(res => {
        if (vinculo) {
          message.success('Aluno desvinculado com sucesso!')
        } else {
          message.success('Aluno vinculado com sucesso!')
        }
        dispatch(setVincularAluno({}))
        dispatch(getAlunosPersonal())
      })
      .finally(() => {
        dispatch(setLoadingAlunosPersonal(false))
      })
  }
}

export const signInVerifyPersonalUser = id => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/conta/verifyPersonalUser', { alunoId: id })
      .then(res => {
        dispatch(setDadosAluno(res.data[0]))
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const buscarAlunosSemPersonal = email => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingAlunosPersonal(true))
    return api
      .post('/conta/buscarAlunosSemPersonal', { email: email })
      .then(res => {
        const aluno = res.data
        if (aluno?.message !== undefined) {
          message.error(aluno?.message)
        } else {
          dispatch(setVincularAluno(aluno === undefined ? [] : aluno))
        }
      })
      .finally(() => {
        dispatch(setLoadingAlunosPersonal(false))
      })
  }
}

export const getPersonal = personalId => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingPersonal(true))
    return api
      .post('/conta/personal', { personalId: personalId })
      .then(res => {
        dispatch(setMeuPersonal(res.data))
      })
      .finally(() => {
        dispatch(setLoadingPersonal(false))
      })
  }
}

export const personalDesvincularServico = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoadingPersonal(true))
    return api
      .post('/conta/personalDesvincular', { id: login.usuario.ID })
      .then(res => {
        dispatch(setMeuPersonal([]))
        message.success('Personal desvinculado com sucesso!')
      })
      .finally(() => {
        dispatch(setLoadingPersonal(false))
      })
  }
}

export const updateCpf = cpf => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))

    return api
      .post('/conta/updateCpf', { id: login.usuario.ID, cpf })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, cpf: res.data.cpf }))
        message.success('CPF atualizado com sucesso!')
      })
      .catch(error => {
        message.error('Erro ao atualizar o CPF')
        throw error
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}

export const updateNiceName= values => {
  return async (dispatch, getState) => {
    const { login } = getState()
    dispatch(setLoading(true))
    return api
      .post('/updateNiceName', { id: login.usuario.ID, ...values })
      .then(res => {
        dispatch(setLogin({ ...login.usuario, ...res.data }))
        //setToken(res.data);
        message.success('Dados alterados com sucesso!')
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
  }
}
