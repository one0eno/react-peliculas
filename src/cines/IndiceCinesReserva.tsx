import { useState, useEffect } from 'react';
import IndiceEntidad from '../utils/IndiceEntiedad';
import { urlCines, urlPeliculas } from '../utils/endpoints';
import Button from '../utils/Button';
import { cineDTO } from './cines.model';
import { peliculaDTO } from '../peliculas/peliculas.model';
import axios, { AxiosResponse } from 'axios';
export default function IndiceCinesReserva() {
  const [cineSeleccionado, setCineSeleccioando] = useState<number>();
  const [peliculas, setPeliculas] = useState<peliculaDTO[]>([]);

  useEffect(() => {
    getPeliculas(cineSeleccionado);
  }, [cineSeleccionado]);

  const getPeliculas = async (cineId?: number) => {
    if (cineId) {
      await axios
        .get(`${urlPeliculas}/GetPeliculaByCineId/${cineId}`)
        .then((response: AxiosResponse<peliculaDTO[]>) => {
          console.log(response.data);
          setPeliculas(response.data);
        });
    }
  };
  return (
    <>
      <h3>Reserva tu pelicula</h3>

      <IndiceEntidad<cineDTO> urlBase={`${urlCines}/cinesReserva`} titulo='Reservas'>
        {(cines, botones) => (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {cines?.map((cine) => {
                return (
                  <tr key={cine.id}>
                    <td>
                      <Button
                        onClick={() => {
                          setCineSeleccioando(cine.id);
                        }}
                      >
                        Seleccionar
                      </Button>{' '}
                    </td>
                    <td>{cine.nombre}</td>
                  </tr>
                );
              })}
            </tbody>
          </>
        )}
      </IndiceEntidad>

      <ul>
        <li>Las Pelis</li>
        {peliculas
          ? peliculas.map((pelicula) => {
              return <li key={pelicula.id}>{pelicula.titulo}</li>;
            })
          : null}
      </ul>
    </>
  );
}
