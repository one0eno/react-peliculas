import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas, urlRating } from '../utils/endpoints';
import { peliculaDTO } from './peliculas.model';
import { Cargando } from '../utils/cargando';
import { imageOverlay } from 'leaflet';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Mapa from '../utils/Mapa';
import { coordenadasDTO } from '../utils/coordenadasDTO';
import Rating from '../utils/Ratin';
import Swal from 'sweetalert2';
import { title } from 'process';
export default function DetallePeliculas() {
  const { id }: any = useParams();

  const [pelicula, setPelicula] = useState<peliculaDTO>();
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    try {
      axios.get(`${urlPeliculas}/${id}`).then((response: AxiosResponse<peliculaDTO>) => {
        if (response.data.fechaLanzamiento) {
          response.data.fechaLanzamiento = new Date(response.data.fechaLanzamiento);
        }

        setPelicula(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const generarURLYoutubeEmbebido = (url: any): string => {
    if (!url) {
      return '';
    }

    var video_id = url.split('v=')[1];

    if (video_id) {
      var posicionAmpersand = video_id.indexOf('&');
      if (posicionAmpersand !== -1) {
        video_id = video_id.substring(0, posicionAmpersand);
      }
      return `https://www.youtube.com/embed/${video_id}`;
    }

    return '';
  };

  const transFormarCoordenadas = (): coordenadasDTO[] => {
    if (pelicula?.cines) {
      const coordenadas = pelicula.cines.map((cine) => {
        return { lat: cine.latitud, lng: cine.longitud, nombre: cine.nombre } as coordenadasDTO;
      });

      return coordenadas;
    }
    return [];
  };

  const onVote = async (voto: number) => {
    try {
      await axios.post(`${urlRating}`, { puntuacion: voto, peliculaId: id });
      Swal.fire({ title: 'Voto', text: 'Gracias por votar', icon: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Detalle Peliculas</h3>
      {pelicula ? (
        <div style={{ display: 'flex' }}>
          <div>
            <h2>
              {pelicula.titulo} {pelicula.fechaLanzamiento?.getFullYear()}
            </h2>
            {pelicula.generos?.map((genero) => {
              return (
                <Link
                  key={genero.id}
                  style={{ marginRight: '5px' }}
                  className='btn btn-primary btn-sm rounded-pill'
                  to={`/peliculas/filtrar?generoId=${genero.id}`}
                >
                  {genero.nombre}
                </Link>
              );
            })}{' '}
            {pelicula.fechaLanzamiento?.toDateString()} - Voto promedio:{pelicula.promedioVoto} - Tu voto:{' '}
            <Rating maximoValor={5} valorSeleccionado={pelicula.votoUsuario!} onChange={onVote} />
            <div style={{ display: 'flex', marginTop: '1rem' }}>
              <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                <img src={pelicula.poster} alt='Poster' style={{ width: '225px', height: '315px' }} />
              </span>
              {pelicula.trailer ? (
                <div>
                  <iframe
                    title='youtube-trailer'
                    width='560'
                    height='315'
                    src={generarURLYoutubeEmbebido(pelicula.trailer)}
                    frameBorder={0}
                    allow='accelerometer; autoplay; encrypted-media; giroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div>No content</div>
              )}
            </div>
            <div>
              {pelicula.resumen ? (
                <div style={{ marginTop: '1rem' }}>
                  <h3>Resumen</h3>
                  <div>
                    <ReactMarkdown>{pelicula.resumen}</ReactMarkdown>
                  </div>
                </div>
              ) : null}
            </div>
            {pelicula.actores && pelicula.actores.length > 0 ? (
              <div style={{ marginTop: '1rem' }}>
                <h3>Actores</h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {pelicula.actores.map((actor) => {
                    return (
                      <div key={actor.id} style={{ marginBottom: '2px' }}>
                        <img alt='foto' src={actor.foto} style={{ width: '50px', verticalAlign: 'middle' }} />
                        <span style={{ display: 'inline-block', width: '200px', marginLeft: '1rem' }}>
                          {actor.nombre}
                        </span>
                        <span style={{ display: 'inline-block', width: '45px' }}>...</span>
                        <span>{actor.personaje}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <div>
              {pelicula.cines && pelicula.cines.length > 0 ? (
                <div style={{ marginTop: '1rem' }}>
                  <div>Cines</div>
                  <div>
                    <Mapa soloLectura={true} coordenadas={transFormarCoordenadas()} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <Cargando />
      )}
    </>
  );
}
