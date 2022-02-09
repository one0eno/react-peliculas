import FormularioAuth from './FormularioAuth';
import { crednecialesUsuario, respuestaAutenticacion } from './Auth.model';
import { urlCuentas } from '../utils/endpoints';
import axios from 'axios';
import { useState, useContext } from 'react';
import MostrarErrores from '../utils/MostrarErrores';
import { guardarTokenLocalStorage, obetenerClaims } from './ManejadorJWT';
import AutenticacionContext from './AutenticacionContext';
import { useHistory } from 'react-router-dom';

export default function Registro() {
  const [errores, setErrores] = useState<string[]>([]);
  const { actualizar } = useContext(AutenticacionContext);
  const history = useHistory();
  const registrar = async (credenciales: crednecialesUsuario) => {
    try {
      const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales);

      guardarTokenLocalStorage(respuesta.data);
      actualizar(obetenerClaims());
      history.push('/');
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
