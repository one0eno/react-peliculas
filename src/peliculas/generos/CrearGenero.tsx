import { useHistory } from 'react-router-dom';
import FormularioGeneros from './FormularioGeneros';
import { generaoCreacionDTO } from './generos.model';
import axios from 'axios';
import { urlGeneros } from '../../utils/endpoints';
import MostrarErrores from '../../utils/MostrarErrores';
import { useState } from 'react';

export default function CrearGenero() {
  const history = useHistory();

  const [errores, setErrores] = useState<string[]>([]);

  const crear = async (genero: generaoCreacionDTO) => {
    try {
      await axios.post(urlGeneros, genero);
      history.push('/generos');
    } catch (error) {
      //console.error(error);
      setErrores(error.response.data);
    }
  };

  return (
    <>
      <h3>Crear Genero</h3>
      <MostrarErrores errores={errores} />
      <FormularioGeneros
        modelo={{ nombre: '' }}
        onSubmit={async (valores) => {
          await crear(valores);
        }}
      />
    </>
  );
}
