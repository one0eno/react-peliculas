import { useState } from 'react';
import FormularioActores from './FormularioActores';
import { actorCreacionDTO } from './actores.model';
import axios from 'axios';
import { urlActores } from '../utils/endpoints';
import { useHistory } from 'react-router-dom';
import MostrarErrores from '../utils/MostrarErrores';
import { convertirActorAFormData } from '../FormDataUtils';

export const Crearactores = () => {
  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);

  const crear = async (actor: actorCreacionDTO) => {
    try {
      //alert(JSON.stringify(actor));
      const actorFormData = convertirActorAFormData(actor);
      await axios({
        method: 'post',
        url: urlActores,
        data: actorFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      history.push('/actores');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Crear actor</div>
      <MostrarErrores errores={errores} />
      <FormularioActores
        modelo={{ nombre: '', fechaNacimiento: new Date() }}
        onsubmit={async (valores) => await crear(valores)}
      />
    </>
  );
};
