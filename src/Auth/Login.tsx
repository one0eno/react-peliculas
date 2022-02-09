import FormularioAuth from './FormularioAuth';
import { crednecialesUsuario, respuestaAutenticacion } from './Auth.model';
import MostrarErrores from '../utils/MostrarErrores';
import { useState, useContext } from 'react';
import axios from 'axios';
import { urlCuentas } from '../utils/endpoints';
import { guardarTokenLocalStorage, obetenerClaims } from './ManejadorJWT';
import AutenticacionContext from './AutenticacionContext';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [errores, setErrores] = useState<string[]>([]);
  const { actualizar } = useContext(AutenticacionContext);
  const history = useHistory();
  const login = async (model: crednecialesUsuario) => {
    try {
      var resultado = await axios.post<respuestaAutenticacion>(`${urlCuentas}/login`, model);

      console.log(resultado);

      guardarTokenLocalStorage(resultado.data);
      actualizar(obetenerClaims());
      history.push('/');
    } catch (error) {
      setErrores(error.response.data);
    }
  };
  return (
    <>
      <h3>Login</h3>
      <MostrarErrores errores={errores} />
      <FormularioAuth
        modelo={{ email: '', password: '' }}
        onSubmit={async (valores) => {
          await login(valores);
        }}
      ></FormularioAuth>
    </>
  );
}
