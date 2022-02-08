import React, { useContext } from 'react';
import { peliculaDTO } from './peliculas.model';
import css from './peliculaindividual.module.css';
import { Link, useHistory } from 'react-router-dom';
import Button from '../utils/Button';
import axios, { AxiosResponse } from 'axios';
import { urlPeliculas } from '../utils/endpoints';
import confirmar from '../utils/Confirmar';
import AlertaContext from '../utils/AlertaContext';
import Autorizado from '../Auth/Autorizado';

export default function PeliculaIndividual(props: peliculaIndividualProps) {
  const history = useHistory();
  const construirLink = () => `/peliculas/${props.pelicula.id}`;
  const alerta = useContext(AlertaContext);

  const borrar = async () => {
    try {
      await axios.delete(`${urlPeliculas}/${props.pelicula.id}`).then((response: AxiosResponse) => {
        alerta();
        //history.push('/peliculas');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={css.div}>
      <a href={construirLink()}>
        <img src={props.pelicula.poster} alt='pelicula' />
      </a>
      <p>
        <a href={construirLink()}>{props.pelicula.titulo}</a>
      </p>
      <Autorizado
        role='admin'
        autorizado={
          <>
            <div>
              <Link
                to={`/peliculas/editar/${props.pelicula.id}`}
                style={{ marginRight: '10px' }}
                className='btn btn-info'
              >
                Editar
              </Link>
              <Button
                className='btn btn-danger'
                onClick={() =>
                  confirmar(async () => {
                    await borrar();
                  })
                }
              >
                Eliminar
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}

interface peliculaIndividualProps {
  pelicula: peliculaDTO;
}
