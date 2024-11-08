// src/redux/actions/clubeCertoSva.js

import { setLoading, setSvaClientParameters } from "../slices/clubeCertoSva";
import { setThemeConfig } from "@/redux/slices/global";
import { message } from "antd";
import axios from "axios";

export const getClubeCertoSva = (login) => {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(
        "https://pratiquetecnologia.com.br/api/app/sva/consulta.php",
        {
          params: { company: "2573" }
        }
      );

      if (response.data && Object.keys(response.data).length > 0) {
        const { primaryColor, secondaryColor, backgroundColor, itemsColor, themeMode } =
          response.data;

        // Validação de Cores
        const isValidColor = (color) => /^#([0-9A-F]{3}){1,2}$/i.test(color);

        const themeConfig = {
          primaryColor: isValidColor(primaryColor) ? primaryColor : "#1890ff",
          secondaryColor: isValidColor(secondaryColor) ? secondaryColor : "#000000",
          backgroundColor: isValidColor(backgroundColor) ? backgroundColor : "#ffffff",
          itemsColor: isValidColor(itemsColor) ? itemsColor : "#ffffff",
          themeMode: themeMode === "dark" ? "dark" : "light" // Apenas 'light' e 'dark' são válidos
        };

        dispatch(setThemeConfig(themeConfig));
        dispatch(setSvaClientParameters(response.data));
      } else {
        message.error("Erro ao obter dados.");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      if (error.response && error.response.data && error.response.data.error) {
        message.error(error.response.data.error);
      } else {
        message.error("Erro ao obter dados da API.");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
};
