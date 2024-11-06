import axios from "axios";

const apiClubeCertoSva = axios.create({
  baseURL: `https://pratiquetecnologia.com.br/api`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export default apiClubeCertoSva;
