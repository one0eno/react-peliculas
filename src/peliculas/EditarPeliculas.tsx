import FormularioPeliculas from './FormularioPeliculas';
import { useState, useEffect } from 'react';
import { peliculasCreacionDTO, peliculaDTO, peliculasPutGetDTO } from './peliculas.model';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from '../utils/endpoints';
import { useParams, useHistory } from 'react-router-dom';
import { Cargando } from '../utils/cargando';
import { convertirPeliculaAFormData } from '../FormDataUtils';
import MostrarErrores from '../utils/MostrarErrores';

export default function EditarPeliculas() {
  const { id }: any = useParams();
  const history = useHistory();
  const [pelicula, setPelicula] = useState<peliculasCreacionDTO>();
  const [peliculaPutGet, setPeliculaPutGet] = useState<peliculasPutGetDTO>();
  const [errores, setErrores] = useState<string[]>([]);

  useEffect(() => {
    axios(`${urlPeliculas}/PutGet/${id}`).then((respuesta: AxiosResponse) => {
      const modelo: peliculasCreacionDTO = {
        titulo: respuesta.data.pelicula.titulo,
        enCines: respuesta.data.pelicula.enCines,
        trailer: respuesta.data.pelicula.trailer,
        posterURL: respuesta.data.pelicula.poster,
        resumen: respuesta.data.pelicula.resumen,
        fechaLanzamiento: respuesta.data.pelicula.fechaLanzamiento,
      };
      console.log(modelo);
      console.log(respuesta.data);
      setPelicula(modelo);
      setPeliculaPutGet(respuesta.data);
    });
  }, []);

  const editar = async (peliculaEditar: peliculasCreacionDTO) => {
    try {
      const formData = convertirPeliculaAFormData(peliculaEditar);
      console.log('formdataes', formData);
      await axios({
        method: 'put',
        url: `${urlPeliculas}/${id}`,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      history.push(`/pelicula/${id}`);
    } catch (error) {
      console.error(error);
      setErrores(error.response.data);
    }
  };
  return (
    <>
      <h3>Editar peliculas</h3>
      <MostrarErrores errores={errores} />
      {pelicula && peliculaPutGet ? (
        <FormularioPeliculas
          actoresSeleccionaos={peliculaPutGet.actores}
          cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
          cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
          generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
          generosSeleccionados={peliculaPutGet.generosSeleccionados}
          modelo={pelicula!}
          onSubmit={(valores) => {
            editar(valores);
          }}
        />
      ) : (
        <Cargando />
      )}
    </>
  );
}
