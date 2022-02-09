import FormularioAuth from './FormularioAuth';
import { crednecialesUsuario, respuetaAutenticacion } from './Auth.model';
import { urlCuentas } from '../utils/endpoints';
import axios from 'axios';
import { useState } from 'react';
import MostrarErrores from '../utils/MostrarErrores';

export default function Registro() {
  const [errores, setErrores] = useState<string[]>([]);

  const registrar = async (credenciales: crednecialesUsuario) => {
    try {
      const respuesta = await axios.post<respuetaAutenticacion>(`${urlCuentas}/crear`, credenciales);

      console.log(respuesta.data);
    } catch (error) {
      console.error(error);
      setErrores(error.response.data);
    }
  };
  return (
    <>
      <h3>Registro</h3>
      <MostrarErrores errores={errores} />

      <FormularioAuth
        modelo={{ email: '', password: '' }}
        onSubmit={async (valores) => {
          await registrar(valores);
        }}
      />
    </>
  );
}
