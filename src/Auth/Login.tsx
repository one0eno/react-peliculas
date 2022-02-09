import FormularioAuth from './FormularioAuth';
import { crednecialesUsuario, respuetaAutenticacion } from './Auth.model';
import MostrarErrores from '../utils/MostrarErrores';
import { useState } from 'react';
import axios from 'axios';
import { urlCuentas } from '../utils/endpoints';

export default function Login() {
  const [errores, setErrores] = useState<string[]>([]);

  const login = async (model: crednecialesUsuario) => {
    try {
      var resultado = await axios.post<respuetaAutenticacion>(`${urlCuentas}/login`, model);

      console.log(resultado);
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
