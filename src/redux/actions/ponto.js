import {message} from 'antd'
import {setData, setLoading} from '../slices/ponto'
import api from '@/services/api';
import apiPratiqueTecnologia from "@/services/apiPratiqueTecnologia";
import {format} from "date-fns";

export const setPonto = (location, outsideRadius) => {
	return async (dispatch, getState) => {
		const {login} = getState()
		dispatch(setLoading(true))
		if (outsideRadius) {
			return apiPratiqueTecnologia
				.post('/app/foraRota/index.php', {
					funcionario: login.usuario.ID,
					unidade: login.usuario.idUnid,
					data: format(new Date(), 'yyyy-MM-dd H:mm:ss'),
					cordenada: {
						lat: location.lat,
						lng: location.lng
					}
				}, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(res => {
					message.error('Erro ao registrar ponto. Fora do raio de 500M.')
					dispatch(getPonto())
				})
				.finally(() => {
					dispatch(setLoading(false))
				});
		} else {
			return api
				.post('/ponto', {id: login.usuario.ID})
				.then(res => {
					message.success('Ponto registrado com sucesso!')
					dispatch(getPonto())
				})
				.finally(() => {
					dispatch(setLoading(false))
				});
		}
	}
}

export const getPonto = () => {
	return async (dispatch, getState) => {
		const {login} = getState()
		dispatch(setLoading(true))
		return api
			.post('/ponto/getPontoDeHoje', {id: login.usuario.ID})
			.then(res => {
				dispatch(setData(res.data))
			})
			.finally(() => {
				dispatch(setLoading(false))
			})
	}
}
