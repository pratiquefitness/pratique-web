import { api } from "../api";

const _BasePath = "/usuarios";

const salvar = async (params) => {
  try {
    const response = await api.post(
      _BasePath + "/inicio",
      Object.assign({}, params)
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const recommendations = async (params) => {
  try {
    const response = await api.get(_BasePath + "/recomendacao");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const ficha = async (params) => {
  try {
    const response = await api.get(_BasePath + "/ficha");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const acceptRecommendations = async (params) => {
  try {
    const response = await api.post(_BasePath + "/recomendacao");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const chamarInstrutor = async () => {
  try {
    const response = await api.post(_BasePath + "/chamarinstrutor");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const apiCalls = {
  salvar,
  recommendations,
  ficha,
  acceptRecommendations,
  chamarInstrutor,
};

export default apiCalls;
