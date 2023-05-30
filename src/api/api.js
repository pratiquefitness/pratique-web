import axios from "axios";
import env from "react-dotenv";

const _BaseURL = env.API_URL;

const api = axios.create({
  baseURL: _BaseURL,
});

export { api };
