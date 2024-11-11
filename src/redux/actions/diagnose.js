import { setData, setLoading } from "../slices/diagnose";
import api from "@/services/api";
import apiPratiqueTecnologia from "@/services/apiPratiqueTecnologia";

export const getDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoading(true));
    return api
      .post("/diagnose", { email: login.usuario.user_email })
      .then((res) => {
        dispatch(setData(res.data));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};

export const getStatusDiagnose = () => {
  return async (dispatch, getState) => {
    const { login } = getState();
    dispatch(setLoading(true));
    return apiPratiqueTecnologia
      .get("/app/diagnose")
      .then((res) => {
        dispatch(setData(res.data));
      })
      .catch((error) => {
        console.error("Erro na requisição da API:", error);
        // Aqui você pode despachar uma ação para lidar com o erro, se necessário
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
