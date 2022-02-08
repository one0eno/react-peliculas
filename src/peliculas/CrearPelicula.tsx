import FormularioPeliculas from './FormularioPeliculas';
import { generoDTO } from './generos/generos.model';
import { cineDTO } from '../cines/cines.model';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from '../utils/endpoints';
import { peliculasPostGetDTO, peliculasCreacionDTO } from './peliculas.model';
import { Cargando } from '../utils/cargando';
import { convertirPeliculaAFormData } from '../FormDataUtils';
import { useHistory } from 'react-router-dom';
import MostrarErrores from '../utils/MostrarErrores';

export default function CrearPeliculas() {
  const [generosNoSeleccioandos, setGenerosNoSeleccionados] = useState<generoDTO[]>([]);
  const [cicnesNoSeleccioandos, setCinesNoSeleccionados] = useState<cineDTO[]>([]);
  const [cargado, setCargado] = useState(false);
  const history = useHistory();
  const [errores, setErrores] = useState<string[]>([]);

  //const [generosSeleccionados, setGenerosSeleccionados] = useState<generoDTO[]>([]);
  //const [cinesSeleccionados, setCinesSeleccionados] = useState<cineDTO[]>([]);

  useEffect(() => {
    axios.get(`${urlPeliculas}/postget`).then((respuesta: AxiosResponse<peliculasPostGetDTO>) => {
      setGenerosNoSeleccionados(respuesta.data.generos);
      setCinesNoSeleccionados(respuesta.data.cines);
      setCargado(true);
    });
  }, []);

  const crearPelicula = async (pelicula: peliculasCreacionDTO) => {
    try {
      console.log(pelicula);
      const formData = convertirPeliculaAFormData(pelicula);
      await axios({
        method: 'post',
        url: urlPeliculas,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((respuesta: AxiosResponse<number>) => {
        history.push(`/pelicula/${respuesta.data}`);
      });
    } catch (error) {
      setErrores(error.response.data);
      console.error(error);
    }
  };
  return (
    <>
      <h3>Crear peliculas</h3>
      <MostrarErrores errores={errores} />
      {cargado ? (
        <FormularioPeliculas
          actoresSeleccionaos={[]}
          cinesNoSeleccionados={cicnesNoSeleccioandos}
          cinesSeleccionados={[]}
          generosNoSeleccionados={generosNoSeleccioandos}
          generosSeleccionados={[]}
          modelo={{ titulo: '', enCines: false, trailer: '', resumen: '' }}
          onSubmit={async (valores) => {
            await crearPelicula(valores);
          }}
        />
      ) : (
        <Cargando />
      )}
    </>
  );
}
