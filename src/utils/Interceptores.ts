import axios from 'axios';
import { obternerToken } from '../Auth/ManejadorJWT';

export function configurarInterceptor() {
  axios.interceptors.request.use(
    function (config) {
      const token = obternerToken();
      if (token) {
        //configuramos en la cabecera autorithation el token
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
}
