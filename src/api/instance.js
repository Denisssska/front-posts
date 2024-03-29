import axios from "axios";

export const PORT = process.env.REACT_APP_API_URL ;

export const instance = axios.create({
  baseURL: PORT
});
//создаем прослойку для определения наличия токена при любом запросе , для авторизации
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});
export default instance;