import apiPratiqueTecnologia from "@/services/apiPratiqueTecnologia";
import { setData, setLoading } from "../slices/unipower";
import apiUnipower from "@/services/apiUnipower";

export const getCursos = () => {
  return async (dispatch, getState) => {
    const { login } = getState();

    // Verificar se os valores estão disponíveis no estado global
    //console.log("Estado de login:", login);

    const { user_email, ID } = login.usuario; // Certifique-se de que estas variáveis existem

    if (!user_email || !ID) {
      console.error("Email ou ID ausente");
      return;
    }

    dispatch(setLoading(true));

    return apiPratiqueTecnologia

      .post("app/unipower/index.php", { email: user_email, id: ID })
      .then((res) => {
        if (res.data.error) {
          console.error("Erro da API:", res.data.error);
          return;
        }
        dispatch(setData(res.data));
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
};
