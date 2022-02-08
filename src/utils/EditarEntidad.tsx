import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Cargando } from './cargando';

import MostrarErrores from './MostrarErrores';

export default function EditarEntidad<TCreacion, TLectura>(props: EditarEntidadProps<TCreacion, TLectura>) {
  const history = useHistory();

  const { id }: any = useParams();
  const [entidad, setEntidad] = useState<TCreacion>();
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${props.urlBase}/${id}`).then((respuesta: AxiosResponse<TLectura>) => {
      //alert(JSON.stringify(props.transformar(respuesta.data)));

      setEntidad(props.transformar(respuesta.data));
    });
  }, []);

  const editar = async (entidadEditar: TCreacion) => {
    try {
      if (props.transformarFormData) {
        const formData = props.transformarFormData(entidadEditar);

        await axios({
          method: 'put',
          url: `${props.urlBase}/${id}`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await axios.put(`${props.urlBase}/${id}`, entidadEditar);
      }

      history.push(props.urlIndice);
    } catch (error) {
      setErrores(error.response.data);
    }
  };

  return (
    <>
      <h3>Editar {props.nombreEntidad}</h3>
      <MostrarErrores errores={errores} />
      {entidad ? props.children(entidad, editar) : <Cargando />}
    </>
  );
}

interface EditarEntidadProps<TCreacion, TLectura> {
  urlBase: string;
  urlIndice: string;
  nombreEntidad: string;
  children(entidad: TCreacion, editar: (entidad: TCreacion) => void): ReactElement;
  transformar(entidad: TLectura): TCreacion;
  transformarFormData?(modelo: TCreacion): FormData;
}

EditarEntidad.defaultProps = {
  transformar: (entidad: any) => entidad,
};
