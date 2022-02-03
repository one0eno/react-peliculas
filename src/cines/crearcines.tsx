import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import MostrarErrores from '../utils/MostrarErrores';
import FormularioCines from './FormularioCines';
import { cineCreacionDTO } from './cines.model';
import { urlCines } from '../utils/endpoints';

export const Crearcines = () => {
  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);

  const crear = async (cine: cineCreacionDTO) => {
    try {
      await axios.post(urlCines, cine);
      history.push('/cines');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Crear Cine</div>
      <MostrarErrores errores={errores} />
      <FormularioCines modelo={{ nombre: '' }} onSubmit={async (valores) => await crear(valores)} />
    </>
  );
};
