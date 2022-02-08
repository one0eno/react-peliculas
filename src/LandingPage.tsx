import { useEffect, useState } from 'react';
import { peliculaDTO, landingPageDTO } from './peliculas/peliculas.model';
import ListadoPeliculas from './peliculas/ListadoPeliculas';
import { urlPeliculas } from './utils/endpoints';
import axios, { AxiosResponse } from 'axios';
import AlertaContext from './utils/AlertaContext';
import Autorizado from './Auth/Autorizado';

export default function LandingPage() {
  const [peliculas, setPeliculas] = useState<landingPageDTO>();

  const cargarDatos = () => {
    //setPeliculas({ encartelera: peliculaPrueba, proximosestrenos: proximosEstrenos });
    axios.get(`${urlPeliculas}`).then((respuesta: AxiosResponse<landingPageDTO>) => {
      console.log(respuesta.data);
      setPeliculas(respuesta.data);
    });
  };
  useEffect(() => {
    cargarDatos();

    // const tiemOut = setTimeout(() => {

    // }, 1000);

    //return () => clearTimeout(tiemOut);
  }, []);
  return (
    <>
      <Autorizado autorizado={<>Estas autorizado</>} noAutorizado={<>NO Estas autorizado</>} role='admin' />
      <AlertaContext.Provider value={() => cargarDatos()}>
        <h3>Peliculas en cartelera</h3>
        <ListadoPeliculas peliculas={peliculas?.enCartelera}></ListadoPeliculas>
        <h3>Proximos estrenos</h3>
        <ListadoPeliculas peliculas={peliculas?.proximosEstrenos}></ListadoPeliculas>
      </AlertaContext.Provider>
    </>
  );
}
