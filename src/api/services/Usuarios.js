import { api } from "../api";

const _BasePath = "/usuarios";

const login = async (email, password) => {
  try {
    const response = await api.post(_BasePath + "/login", {
      email: email,
      senha: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const progresso = async (email) => {
  try {
    const response = await api.get(_BasePath + "/progresso");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const ultimo = async (email) => {
  try {
    const response = await api.get(_BasePath + "/ultimo", {
      email: "adelmodesign@gmail.com",
      senha: "pratique@1193",
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const salvarExercicio = async (id) => {
  try {
    const response = await api.post(_BasePath + "/salvarexercicio", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const excluirExercicio = async (id) => {
  try {
    const response = await api.post(_BasePath + "/excluirexercicio", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const salvarAvaliacao = async (id) => {
  try {
    const response = await api.post(_BasePath + "/salvaravaliacao", {
      id: id,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const finalizados = async () => {
  try {
    const response = await api.get(_BasePath + "/finalizados");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const historico = async () => {
  try {
    const response = await api.get(_BasePath + "/ficha");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const apiCalls = {
  login,
  progresso,
  ultimo,
  salvarExercicio,
  excluirExercicio,
  salvarAvaliacao,
  finalizados,
  historico,
};

export default apiCalls;
